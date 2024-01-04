import {createStore} from "vuex";
import {
    getCascaderOptions,
    GETCountryGeojson,
    GETLayerInfoStat,
    PostChartDataProcessSocioEconomic, PostPopulationSummary
} from "../api/SocioEconomic";
import {CreateGIFMapImage, PostSlicedFromCatalog} from "../api/airquality";

export default createStore({
    state() {
        return {
            SocioEconomicObject: {
                socioEconomicType: 'Demographic',
                PopulationType: 'TotalPopulation',
                popYear: '2020',
                ShowAnimationPanel: false,
            },
            mapObject: null,
            TimeSeriesLayerCollection: [],
            WorkingVectorLayer: null,
            // selectInteraction: null,
            selectInteractionObj: null,
            vectorLayerSource: null,
            mapControlVariable: {
                //for printing Legend Object
                LegendObject: null,
                LegendItemList: [],
            },
            PrintMapComponentData: {
                PrintMapDialogVisible: false
            }
        };
    },
    mutations: {
        setCascaderInventriesComparison(state, payload) {
            state.CascaderInventriesComparison = payload;
        }, setCascaderSectorContribution(state, payload) {
            state.CascaderSectorContribution = payload;
        }, setCascaderSectorShare(state, payload) {
            state.CascaderSectorShare = payload;
        }, setCascaderTimeSeries(state, payload) {
            state.CascaderTimeSeries = payload;
        }, setSelectedLayerObj(state, payload) {
            state.SelectedLayerObj = payload;
        },
        // setSelectInteraction(state, payload) {
        //     state.selectInteraction = payload;
        // },
        setMapObject(state, payload) {
            state.mapObject = payload;
        }, setWorkingVectorLayer(state, payload) {
            state.WorkingVectorLayer = payload;
        }, appendTimeSeriesLayerCollection(state, payload) {
            state.TimeSeriesLayerCollection.push(payload);
        }, setVectorLayerSource(state, payload) {
            state.vectorLayerSource = payload;
        }, setSelectInteractionObj(state, payload) {
            state.selectInteractionObj = payload;
        },
        removeLegend(state, payload) {
            // state.mapControlVariable.LegendObject.getItems().dispatchEvent('remove',payload);
            // state.mapControlVariable.LegendObject.getItems().dispatchEvent({type:'remove',target:payload});

            // state.mapControlVariable.LegendObject.removeItem(payload);
            state.mapControlVariable.LegendObject.getItems().remove(payload);
            state.mapControlVariable.LegendObject.getItems().clear();
            state.mapControlVariable.LegendObject.refresh();


            let index = false;
            state.mapControlVariable.LegendItemList.forEach(function (it, idx) {
                if (it.id == payload.id) {
                    index = idx;
                }
            });
            if (index !== false) {
                state.mapControlVariable.LegendItemList.splice(index, 1);
            }

            state.mapControlVariable.LegendObject.getItems().clear();
            state.mapControlVariable.LegendItemList.forEach((it) => {
                state.mapControlVariable.LegendObject.addItem(it);
            });
            state.mapControlVariable.LegendObject.refresh();

        },
        addLegend(state, payload) {
            // state.mapControlVariable.LegendObject.getItems().dispatchEvent({type:'add',target:payload});
            state.mapControlVariable.LegendItemList.push(payload);
            state.mapControlVariable.LegendObject.addItem(payload);
            state.mapControlVariable.LegendObject.refresh();

        },
    },
    actions: {
        async getCascaderOptions(context) {
            let data = await getCascaderOptions();
            context.commit("setCascaderInventriesComparison", data.InventriesComparison);
            context.commit("setCascaderSectorContribution", data.SectorContribution);
            context.commit("setCascaderSectorShare", data.SectorShare);
            context.commit("setCascaderTimeSeries", data.TimeSeries);
            return data
        },
        async PostChartDataProcessSocioEconomic(context, param) {
            let data = await PostChartDataProcessSocioEconomic(param);
            return data;
        }, async PostPopulationSummary(context, param) {
            let data = await PostPopulationSummary(param);
            return data;
        },
        async GetLayerStatInfo(context, param) {
            let data = await GETLayerInfoStat(param);
            return data;
        },
        async GETCountryGeojson() {
            let data = await GETCountryGeojson();
            return data;
        },
        async PostSlicedFromCatalog(context, param) {
            let data = await PostSlicedFromCatalog(param);
            return data;
        },
        async PostCreateGIFMapImage(context, param) {
            let data = await CreateGIFMapImage(param);
            return data;
        },
    },
    getters: {
        getBindedLayer: (state) => (id) => {
            var layer;
            for (let i = 0; i < state.TimeSeriesLayerCollection.length; i++) {
                if (id == state.TimeSeriesLayerCollection[i].getProperties().id) { ///popDensityLayer.getProperties().id
                    layer = state.TimeSeriesLayerCollection[i];
                } else {
                    state.TimeSeriesLayerCollection[i].setVisibleDivBind(false);
                }
            }
            return layer;
        },
    },
    modules: {},
});