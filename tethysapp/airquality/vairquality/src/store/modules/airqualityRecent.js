import {createStore} from "vuex";
import {
    getCityData,
    PostSlicedFromCatalog,
    getGeoJsonForOneSatation,
    PostGetStationData,
    PostGet2DImage, TimeSeriesRasterQuery, getDefaultGroundObservation
} from "../api/airquality";

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
            WorkingVectorLayer: null,
            mapControlVariable: {
                //for printing Legend Object
                LegendObject: null,
                LegendItemList: [],

                data_period: 'Recent',
                select_by: 'Parameter',

                // Location parameter
                location_by: 'default_locations',
                default_location: '',
                is_AOI_Feature_selected: false,
                location_by_wktValue: '',
                location_by_geometryType: '',
                location_by_default_level_value: '',

                location_by_pollutant_value1: [],
                location_by_pollutant_value2: [],
                location_by_pollutant_value3: [],
                location_by_pollutant_value4: [],

                //parameter parameter
                radioValue: 1,
                parameter_by_pollutant_value: '',
                is_parameter_by_pollutant_value_stationData: true,

                parameter_by_pollutant_value_stationData_val1: '',
                parameter_by_pollutant_value_stationData_val2: '',
                parameter_by_pollutant_value_stationData_val3: '',
                parameter_by_pollutant_value_stationData_val4: '',

                parameter_by_location__1: {
                    location_by: 'default_locations',
                    default_location: '',
                    is_AOI_Feature_selected: false,
                    wktValue: '',
                    geometryType: '',
                    featureExtent: '',
                    default_level_value: '',
                },
                parameter_by_location__2: {
                    location_by: 'default_locations',
                    default_location: '',
                    is_AOI_Feature_selected: false,
                    wktValue: '',
                    geometryType: '',
                    featureExtent: '',
                    default_level_value: '',
                },
                parameter_by_location__3: {
                    location_by: 'default_locations',
                    default_location: '',
                    is_AOI_Feature_selected: false,
                    wktValue: '',
                    geometryType: '',
                    featureExtent: '',
                    default_level_value: '',
                },
                parameter_by_location__4: {
                    location_by: 'default_locations',
                    default_location: '',
                    is_AOI_Feature_selected: false,
                    wktValue: '',
                    geometryType: '',
                    featureExtent: '',
                    default_level_value: '',
                },
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
        }, setSelectInteraction(state, payload) {
            state.selectInteraction = payload;
        }, setMapObject(state, payload) {
            state.mapObject = payload;
        }, setWorkingVectorLayer(state, payload) {
            state.WorkingVectorLayer = payload;
        },
        appendTimeSeriesLayerCollection(state, payload) {
            state.TimeSeriesLayerCollection.push(payload);
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
        }

    },
    actions: {
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
        async PostGetStationData(context, param) {
            let data = await PostGetStationData(param);
            return data;
        },
        async TimeSeriesRasterQuery(context, param) {
            let data = await TimeSeriesRasterQuery(param);
            return data;
        },
        async PostGet2DImage(context, param) {
            let data = await PostGet2DImage(param);
            return data;
        },
        async getDefaultGroundObservation(context, param) {
            let data = await getDefaultGroundObservation(param);
            return data;
        },
    },
    getters: {
        getLayer: (state) => (id) => {
            var layer;
            for (let i = 0; i < state.TimeSeriesLayerCollection.length; i++) {
                // console.log(TimeSeriesLayerCollection[i].getProperties().id);
                if (id == state.TimeSeriesLayerCollection[i].getProperties().id) { ///popDensityLayer.getProperties().id
                    layer = state.TimeSeriesLayerCollection[i].getLayer();
                    break;
                }
            }
            return layer;
        }, getBindedLayer: (state) => (id) => {
            var layer;
            for (let i = 0; i < state.TimeSeriesLayerCollection.length; i++) {
                if (id == state.TimeSeriesLayerCollection[i].getProperties().id) { ///popDensityLayer.getProperties().id
                    layer = state.TimeSeriesLayerCollection[i];
                    break;
                }
            }
            return layer;
        }
    },
    modules: {},
});