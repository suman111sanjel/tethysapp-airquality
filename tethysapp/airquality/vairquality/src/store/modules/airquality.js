import {createStore} from "vuex";
import {getCityData, PostSlicedFromCatalog,getGeoJsonForOneSatation} from "../api/airquality";

export default createStore({
    state() {
        return {
            CascaderInventriesComparison: [],
            CascaderSectorContribution: [],
            CascaderSectorShare: [],
            CascaderTimeSeries: [],
            SelectedLayerObj: null,


            selectInteraction: null,
            mapObject: null,
            TimeSeriesLayerCollection: [],

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
        }, setSelectInteraction(state, payload) {
            state.selectInteraction = payload;
        }, setMapObject(state, payload) {
            state.mapObject = payload;
        },
        appendTimeSeriesLayerCollection(state, payload) {
            state.TimeSeriesLayerCollection.push(payload);
        }
    },
    actions: {
        // async getCascaderOptions(context) {
        //     let data = await getCascaderOptions();
        //     context.commit("setCascaderInventriesComparison", data.InventriesComparison)
        //     context.commit("setCascaderSectorContribution", data.SectorContribution)
        //     context.commit("setCascaderSectorShare", data.SectorShare)
        //     context.commit("setCascaderTimeSeries", data.TimeSeries)
        //     return data
        // },
        // async PostChartDataProcess(context, param) {
        //     let data = await PostChartDataProcess(param);
        //     return data;
        // },
        // async GetLayerStatInfo(context, param) {
        //     let data = await GETLayerInfoStat(param);
        //     return data;
        // },
        async getCityData(context, param) {
            let data = await getCityData(param);
            return data;
        },
        async getGeoJsonForOneSatation(context, stringParam) {
            let data = await getGeoJsonForOneSatation(stringParam);
            return data;
        },
        async PostSlicedFromCatalog(context, param) {
            let data = await PostSlicedFromCatalog(param);
            return data;
        },
    },
    getters: {},
    modules: {},
});