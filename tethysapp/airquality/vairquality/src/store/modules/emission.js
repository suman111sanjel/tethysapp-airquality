import {createStore} from "vuex";
import {getCascaderOptions, GETCountryGeojson, GETLayerInfoStat, PostChartDataProcess} from "../api/emission";

export default createStore({
    state() {
        return {
            CascaderInventriesComparison: [],
            CascaderSectorContribution: [],
            CascaderSectorShare: [],
            CascaderTimeSeries: [],
            selectInteractionObj: null,
            TimeSeriesLayerCollection: [],
            vectorLayerSource:null,
            mapObject:null,
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
        }, setSelectInteractionObj(state, payload) {
            state.selectInteractionObj = payload;
        },setVectorLayerSource(state, payload) {
            state.vectorLayerSource = payload;
        },setmapObject(state, payload) {
            state.mapObject = payload;
        },
        appendTimeSeriesLayerCollection(state, payload) {
            state.TimeSeriesLayerCollection.push(payload);
        }
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
        async PostChartDataProcess(context, param) {
            let data = await PostChartDataProcess(param);
            return data;
        },
        async GetLayerStatInfo(context,param) {
            let data = await GETLayerInfoStat(param);
            return data;
        },
        async GETCountryGeojson() {
            let data = await GETCountryGeojson();
            return data;
        },
    },
    getters: {},
    modules: {},
});