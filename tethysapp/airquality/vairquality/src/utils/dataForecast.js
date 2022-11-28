import {DefaultMaskWMS, DefaultPlotInfo, TethysAPIAppName} from "../config";
import {getURLParameters} from './helpers';

var myApp = {};
// First need to initilize
var filterCoodrdinate = {};


myApp.forecastDate = new Date();
myApp.forecastDate.setDate(myApp.forecastDate.getDate() - 1);


let forecasteDate = getURLParameters()['date'];
if (forecasteDate) {
    if (forecasteDate.length == 8) {
        let checkInt = parseInt(forecasteDate);
        if (checkInt) {
            // Number with valid
            let YYYY = parseInt(forecasteDate.slice(0, 4));
            let MM_index = parseInt(forecasteDate.slice(4, 6)) - 1;
            let DD = parseInt(forecasteDate.slice(6, 8));
            let dObject = new Date(YYYY, MM_index, DD);
            myApp.forecastDate = dObject;
        }
    }
}

myApp.IndexColors = ['#0C6CE9', '#962422', '#1D5430', '#F76743'];


myApp.APICollection = {
    layerData: {
        Aeronet: '/apps/' + TethysAPIAppName + '/aeronetaodpm/',
        USEmbassyAOD: '/apps/' + TethysAPIAppName + '/usembassypm/',
        getGeoJSONofStations: '/apps/' + TethysAPIAppName + '/getGeoJSONofStations/',
        getGeoJsonForOneSatation: '/apps/' + TethysAPIAppName + '/getGeoJsonForOneSatation/',
        getAllStationsID: '/apps/' + TethysAPIAppName + '/getAllStationsID/',
    },
    api: {
        commonAPI: '/apps/' + TethysAPIAppName + '/getData/',
        RegionGeojson: '/apps/' + TethysAPIAppName + '/geojsonregion/',
        AOIPolygon: '/apps/' + TethysAPIAppName + '/aoipolygon/',
        GetMapImage: '/apps/' + TethysAPIAppName + '/getmapimage/',
        GetImage: '/apps/' + TethysAPIAppName + '/downloadImage/',
        SlicedFromCatalog: '/apps/' + TethysAPIAppName + '/slicedfromcatalog/'
    }
};


myApp.constants = {
    forecast: {
        layerId: {
            GEOS_PM2p5: 'Forecast__GEOS_PM2p5',
            O3_GEOS: 'Forecast__GEOS_O3',
            SO2_GEOS: 'Forecast__GEOS_SO2',
            NO2_GEOS: 'Forecast__GEOS_NO2',
            CO_GEOS: 'Forecast__GEOS_CO',
            WRF_Chem_PM: 'Forecast__WRF_Chem_PM',
            WRF_Chem_O3: 'Forecast__WRF_Chem_O3',
            WRF_Chem_SO2: 'Forecast__WRF_Chem_SO2',
            WRF_Chem_NO2: 'Forecast__WRF_Chem_NO2',
            WRF_Chem_CO: 'Forecast__WRF_Chem_CO',
        }
    }
};

myApp.IndexColors = ['#0C6CE9', '#962422', '#1D5430', '#F76743'];
myApp.AllBindedLayersList = [];
myApp.OnlyOnce = true;

myApp.getLayer = function (id) {
    // console.log(id)
    var layer;
    for (let i = 0; i < myApp.AllBindedLayersList.length; i++) {
        // console.log(myApp.AllBindedLayersList[i].getProperties().id);
        if (id == myApp.AllBindedLayersList[i].getProperties().id) { ///popDensityLayer.getProperties().id
            layer = myApp.AllBindedLayersList[i].getLayer();
            break;
        }
    }
    return layer;
};


myApp.formatDate = function (date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
};


myApp.DefaultSations = {
    aeronetAOD: [9, 14, 9, 14],
    pm2p5Embassy: [6, 7, 6, 7],
    o3Embassy: [6, 7, 6, 7]
}

myApp.cascaderObj = [
    {
        label: 'PM',
        value: 1,
        children: [
            {
                label: 'Model-PM2.5 (GEOS)',
                layerId: myApp.constants.forecast.layerId.GEOS_PM2p5,
                value: 13,
                stationData: false,
                layerProperties: {
                    catalog: 'catalog/HKHAirQualityWatch/Forecast/PM/GEOS-PM2p5/catalog.xml',
                    initilize: false,
                    useSLD: false,
                    isTimeDimensionLayer: true,
                    VisibleDivBind: false,
                    threddLayerProp: {
                        id: myApp.constants.forecast.layerId.GEOS_PM2p5,
                        title: 'GEOS PM2.5',
                        visible: false,
                        opacity: 0.6,
                        ThreddsDataServerVersion: 5,
                        serverType: 'TDS',
                        timeSeries: false,
                        alignTimeSlider: 'right',
                        timeSliderSize: 'small',
                        showlegend: false,
                        showControlPanel: true,
                        source: {
                            url: [],
                            params: {
                                'LAYERS': 'PM2p5',
                                'STYLES': 'default-scalar/x-Rainbow',
                                'COLORSCALERANGE': "0,100",
                                'transparent': true
                            }
                        },
                        unit: 'µg/m<sup>3<sup>',
                        mask: DefaultMaskWMS,
                        CropOrMask: 'crop',
                        changeWMSProxy: true,
                        filterCoodrdinate: filterCoodrdinate,
                        aoi: true,
                        zIndex: 20,
                        api: {
                            createGIF: myApp.APICollection.api.CreateGIFImage,
                            GetImage: myApp.APICollection.api.GetImage
                        },
                        plotInfo: function () {
                            return Object.assign(DefaultPlotInfo, {
                                title: 'GEOS $PM_{2.5}$(µg/$m^{3}$)',
                                TimeZone: ' UTC'
                            })
                        },
                        chartDetail: {
                            title: 'GEOS', unit: 'µg/m<sup>3</sup>', SeriesName: "value",
                            Product: 'PM<sub>2.5</sub>',
                            Source: 'GEOS'
                        },
                    }
                }
            },
            {
                label: 'Model-PM2.5 (WRF-Chem)',
                layerId: myApp.constants.forecast.layerId.WRF_Chem_PM,
                value: 14,
                stationData: false,
                layerProperties: {
                    catalog: 'catalog/HKHAirQualityWatch/Forecast/WRF_Chem/d1_HKH/catalog.xml',
                    initilize: false,
                    useSLD: false,
                    isTimeDimensionLayer: true,
                    VisibleDivBind: false,
                    threddLayerProp: {
                        id: myApp.constants.forecast.layerId.WRF_Chem_PM,
                        title: 'WRF-Chem PM2.5',
                        visible: false,
                        opacity: 0.6,
                        ThreddsDataServerVersion: 5,
                        serverType: 'TDS',
                        timeSeries: false,
                        alignTimeSlider: 'right',
                        timeSliderSize: 'small',
                        showlegend: false,
                        showControlPanel: true,
                        source: {
                            url: [],
                            params: {
                                'LAYERS': 'PM25_SFC',
                                'STYLES': 'default-scalar/x-Rainbow',
                                'COLORSCALERANGE': "0,100",
                                'transparent': true
                            }
                        },
                        unit: 'µg/m<sup>3<sup>',
                        mask: DefaultMaskWMS,
                        CropOrMask: 'crop',
                        changeWMSProxy: true,
                        filterCoodrdinate: filterCoodrdinate,
                        aoi: true,
                        zIndex: 20,
                        api: {
                            createGIF: myApp.APICollection.api.CreateGIFImage,
                            GetImage: myApp.APICollection.api.GetImage
                        },
                        plotInfo: function () {
                            return Object.assign(DefaultPlotInfo, {
                                title: 'WRF-Chem $PM_{2.5}$(µg/$m^{3}$)',
                                TimeZone: ' UTC'
                            })
                        },
                        chartDetail: {
                            title: 'WRF-Chem',
                            unit: 'µg/m<sup>3</sup>',
                            SeriesName: "value",
                            Product: 'PM<sub>2.5</sub>',
                            Source: 'WRF-Chem'
                        },
                    }
                }
            }
        ]
    }, {
        label: 'O3',
        value: 2,
        children: [
            {
                label: 'Model-O3 (GEOS)',
                layerId: myApp.constants.forecast.layerId.O3_GEOS,
                value: 22,
                stationData: false,
                layerProperties: {
                    catalog: 'catalog/HKHAirQualityWatch/Forecast/O3/GEOS-O3/catalog.xml',
                    initilize: false,
                    useSLD: false,
                    isTimeDimensionLayer: true,
                    VisibleDivBind: false,
                    threddLayerProp: {
                        id: myApp.constants.forecast.layerId.O3_GEOS,
                        title: 'GEOS O3',
                        visible: false,
                        opacity: 0.6,
                        ThreddsDataServerVersion: 5,
                        serverType: 'TDS',
                        timeSeries: false,
                        alignTimeSlider: 'right',
                        timeSliderSize: 'small',
                        showlegend: false,
                        showControlPanel: true,
                        source: {
                            url: [],
                            params: {
                                'LAYERS': 'O3',
                                'STYLES': 'default-scalar/x-Rainbow',
                                'COLORSCALERANGE': "0,80",
                                'transparent': true
                            }
                        },
                        unit: '',
                        mask: DefaultMaskWMS,
                        CropOrMask: 'crop',
                        changeWMSProxy: true,
                        filterCoodrdinate: filterCoodrdinate,
                        aoi: true,
                        zIndex: 23,
                        api: {
                            createGIF: myApp.APICollection.api.CreateGIFImage,
                            GetImage: myApp.APICollection.api.GetImage,
                            TimeZone: ' UTC'
                        },
                        plotInfo: function () {
                            return Object.assign(DefaultPlotInfo, {title: 'GEOS $O_{3}$(ppb)'})
                        },
                        chartDetail: {
                            title: 'GEOS', unit: "ppb", SeriesName: "value",
                            Product: 'O<sub>3</sub>',
                            Source: 'GEOS'
                        },
                    }
                },
            }, {
                label: 'Model-O3 (WRF-Chem)',
                layerId: myApp.constants.forecast.layerId.WRF_Chem_O3,
                value: 23,
                stationData: false,
                layerProperties: {
                    catalog: 'catalog/HKHAirQualityWatch/Forecast/WRF_Chem/d1_HKH/catalog.xml',
                    initilize: false,
                    useSLD: false,
                    isTimeDimensionLayer: true,
                    VisibleDivBind: false,
                    threddLayerProp: {
                        id: myApp.constants.forecast.layerId.WRF_Chem_O3,
                        title: 'WRF-Chem O3',
                        visible: false,
                        opacity: 0.6,
                        ThreddsDataServerVersion: 5,
                        serverType: 'TDS',
                        timeSeries: false,
                        alignTimeSlider: 'right',
                        timeSliderSize: 'small',
                        showlegend: false,
                        showControlPanel: true,
                        source: {
                            url: [],
                            params: {
                                'LAYERS': 'O3_TOTCOL',
                                'STYLES': 'default-scalar/x-Rainbow',
                                'COLORSCALERANGE': "0,80",
                                'transparent': true
                            }
                        },
                        unit: '',
                        mask: DefaultMaskWMS,
                        CropOrMask: 'crop',
                        changeWMSProxy: true,
                        filterCoodrdinate: filterCoodrdinate,
                        aoi: true,
                        zIndex: 23,
                        api: {
                            createGIF: myApp.APICollection.api.CreateGIFImage,
                            GetImage: myApp.APICollection.api.GetImage,
                            TimeZone: ' UTC'
                        },
                        plotInfo: function () {
                            return Object.assign(DefaultPlotInfo, {title: 'GEOS Dobson Units'})
                        },
                        chartDetail: {
                            title: 'WRF-Chem', unit: "Dobson Units", SeriesName: "value",
                            Product: 'O<sub>3</sub>',
                            Source: 'WRF-Chem'
                        },
                    }
                },
            }
        ]
    },
    {
        label: 'SO2',
        value: 3,
        children: [
            {
                label: 'Model-SO2 (GEOS)',
                layerId: myApp.constants.forecast.layerId.SO2_GEOS,
                value: 32,
                stationData: false,
                layerProperties: {
                    catalog: 'catalog/HKHAirQualityWatch/Forecast/SO2/GEOS-SO2/catalog.xml',
                    initilize: false,
                    useSLD: false,
                    isTimeDimensionLayer: true,
                    VisibleDivBind: false,
                    threddLayerProp: {
                        id: myApp.constants.forecast.layerId.SO2_GEOS,
                        title: 'GEOS SO2',
                        visible: false,
                        opacity: 0.6,
                        ThreddsDataServerVersion: 5,
                        serverType: 'TDS',
                        timeSeries: false,
                        alignTimeSlider: 'right',
                        timeSliderSize: 'small',
                        showlegend: false,
                        showControlPanel: true,
                        source: {
                            url: [],
                            params: {
                                'LAYERS': 'SO2',
                                'STYLES': 'default-scalar/x-Rainbow',
                                'COLORSCALERANGE': "0,10",
                                'transparent': true
                            }
                        },
                        unit: '',
                        mask: DefaultMaskWMS,
                        CropOrMask: 'crop',
                        changeWMSProxy: true,
                        filterCoodrdinate: filterCoodrdinate,
                        aoi: true,
                        zIndex: 24,
                        api: {
                            createGIF: myApp.APICollection.api.CreateGIFImage,
                            GetImage: myApp.APICollection.api.GetImage,
                            TimeZone: ' UTC'
                        },
                        plotInfo: function () {
                            return Object.assign(DefaultPlotInfo, {title: 'TROPOMI $SO_{2}$($10^{17}$ molecules/$cm^{2}$)'})
                        },
                        chartDetail: {
                            title: 'GEOS', unit: "ppb", SeriesName: "value",
                            Product: 'SO<sub>2</sub>',
                            Source: 'GEOS'
                        },
                    }
                }
            },
            {
                label: 'Model-SO2 (WRF-Chem)',
                layerId: myApp.constants.forecast.layerId.WRF_Chem_SO2,
                value: 32,
                stationData: false,
                layerProperties: {
                    catalog: 'catalog/HKHAirQualityWatch/Forecast/WRF_Chem/d1_HKH/catalog.xml',
                    initilize: false,
                    useSLD: false,
                    isTimeDimensionLayer: true,
                    VisibleDivBind: false,
                    threddLayerProp: {
                        id: myApp.constants.forecast.layerId.WRF_Chem_SO2,
                        title: 'WRF-Chem SO2',
                        visible: false,
                        opacity: 0.6,
                        ThreddsDataServerVersion: 5,
                        serverType: 'TDS',
                        timeSeries: false,
                        alignTimeSlider: 'right',
                        timeSliderSize: 'small',
                        showlegend: false,
                        showControlPanel: true,
                        source: {
                            url: [],
                            params: {
                                'LAYERS': 'SO2_SFC',
                                'STYLES': 'default-scalar/x-Rainbow',
                                'COLORSCALERANGE': "0,10",
                                'transparent': true
                            }
                        },
                        unit: '',
                        mask: DefaultMaskWMS,
                        CropOrMask: 'crop',
                        changeWMSProxy: true,
                        filterCoodrdinate: filterCoodrdinate,
                        aoi: true,
                        zIndex: 24,
                        api: {
                            createGIF: myApp.APICollection.api.CreateGIFImage,
                            GetImage: myApp.APICollection.api.GetImage,
                            TimeZone: ' UTC'
                        },
                        plotInfo: function () {
                            return Object.assign(DefaultPlotInfo, {title: 'TROPOMI $SO_{2}$($10^{17}$ molecules/$cm^{2}$)'})
                        },
                        chartDetail: {
                            title: 'WRF-Chem', unit: " ppbv", SeriesName: "value",
                            Product: 'SO<sub>2</sub>',
                            Source: 'WRF-Chem'
                        },
                    }
                }
            }
        ]
    },
    {
        label: 'NO2',
        value: 4,
        children: [
            {
                label: 'Model-NO2 (GEOS)',
                layerId: myApp.constants.forecast.layerId.NO2_GEOS,
                value: 42,
                stationData: false,
                layerProperties: {
                    catalog: 'catalog/HKHAirQualityWatch/Forecast/NO2/GEOS-NO2/catalog.xml',
                    initilize: false,
                    useSLD: false,
                    isTimeDimensionLayer: true,
                    VisibleDivBind: false,
                    threddLayerProp: {
                        id: myApp.constants.forecast.layerId.NO2_GEOS,
                        title: 'GEOS NO2',
                        visible: false,
                        opacity: 0.6,
                        ThreddsDataServerVersion: 5,
                        serverType: 'TDS',
                        timeSeries: false,
                        alignTimeSlider: 'right',
                        timeSliderSize: 'small',
                        showlegend: false,
                        showControlPanel: true,
                        source: {
                            url: [],
                            params: {
                                'LAYERS': 'NO2',
                                'STYLES': 'default-scalar/x-Rainbow',
                                'COLORSCALERANGE': "0,10",
                                'transparent': true
                            }
                        },
                        unit: '',
                        mask: DefaultMaskWMS,
                        CropOrMask: 'crop',
                        changeWMSProxy: true,
                        filterCoodrdinate: filterCoodrdinate,
                        aoi: true,
                        zIndex: 22,
                        api: {
                            createGIF: myApp.APICollection.api.CreateGIFImage,
                            GetImage: myApp.APICollection.api.GetImage,
                            TimeZone: ' UTC'
                        },
                        plotInfo: function () {
                            return Object.assign(DefaultPlotInfo, {title: 'TROPOMI $NO_{2}$($10^{15}$ molecules/$cm^{2}$)'})
                        },
                        chartDetail: {
                            title: 'GEOS', unit: "ppb", SeriesName: "value",
                            Product: 'NO<sub>2</sub>',
                            Source: 'GEOS'
                        },
                    }
                },
            },
            {
                label: 'Model-NO2 (WRF-Chem)',
                layerId: myApp.constants.forecast.layerId.WRF_Chem_NO2,
                value: 43,
                stationData: false,
                layerProperties: {
                    catalog: 'catalog/HKHAirQualityWatch/Forecast/WRF_Chem/d1_HKH/catalog.xml',
                    initilize: false,
                    useSLD: false,
                    isTimeDimensionLayer: true,
                    VisibleDivBind: false,
                    threddLayerProp: {
                        id: myApp.constants.forecast.layerId.WRF_Chem_NO2,
                        title: 'WRF-Chem NO2',
                        visible: false,
                        opacity: 0.6,
                        ThreddsDataServerVersion: 5,
                        serverType: 'TDS',
                        timeSeries: false,
                        alignTimeSlider: 'right',
                        timeSliderSize: 'small',
                        showlegend: false,
                        showControlPanel: true,
                        source: {
                            url: [],
                            params: {
                                'LAYERS': 'NO2_SFC',
                                'STYLES': 'default-scalar/x-Rainbow',
                                'COLORSCALERANGE': "0,10",
                                'transparent': true
                            }
                        },
                        unit: '',
                        mask: DefaultMaskWMS,
                        CropOrMask: 'crop',
                        changeWMSProxy: true,
                        filterCoodrdinate: filterCoodrdinate,
                        aoi: true,
                        zIndex: 22,
                        api: {
                            createGIF: myApp.APICollection.api.CreateGIFImage,
                            GetImage: myApp.APICollection.api.GetImage,
                            TimeZone: ' UTC'
                        },
                        plotInfo: function () {
                            return Object.assign(DefaultPlotInfo, {title: 'TROPOMI $NO_{2}$($10^{15}$ molecules/$cm^{2}$)'})
                        },
                        chartDetail: {
                            title: 'WRF-Chem', unit: "ppbv", SeriesName: "value",
                            Product: 'NO<sub>2</sub>',
                            Source: 'WRF-Chem'
                        },
                    }
                },
            }
        ]
    },
    {
        label: 'CO',
        value: 5,
        children: [
            {
                label: 'Model-CO (GEOS)',
                layerId: myApp.constants.forecast.layerId.CO_GEOS,
                value: 52,
                stationData: false,
                layerProperties: {
                    catalog: 'catalog/HKHAirQualityWatch/Forecast/CO/GEOS-CO/catalog.xml',
                    initilize: false,
                    useSLD: false,
                    isTimeDimensionLayer: true,
                    VisibleDivBind: false,
                    threddLayerProp: {
                        id: myApp.constants.forecast.layerId.CO_GEOS,
                        title: 'GEOS CO',
                        visible: false,
                        opacity: 0.6,
                        ThreddsDataServerVersion: 5,
                        serverType: 'TDS',
                        timeSeries: false,
                        alignTimeSlider: 'right',
                        timeSliderSize: 'small',
                        showlegend: false,
                        showControlPanel: true,
                        source: {
                            url: [],
                            params: {
                                'LAYERS': 'CO',
                                'STYLES': 'default-scalar/x-Rainbow',
                                'COLORSCALERANGE': "0,500",
                                'transparent': true
                            }
                        },
                        unit: '',
                        mask: DefaultMaskWMS,
                        CropOrMask: 'crop',
                        changeWMSProxy: true,
                        filterCoodrdinate: filterCoodrdinate,
                        aoi: true,
                        zIndex: 21,
                        api: {
                            createGIF: myApp.APICollection.api.CreateGIFImage,
                            GetImage: myApp.APICollection.api.GetImage,
                            TimeZone: ' UTC'
                        },
                        plotInfo: function () {
                            return Object.assign(DefaultPlotInfo, {title: 'GEOS CO(ppb)'})
                        },
                        chartDetail: {
                            title: 'GEOS', unit: "ppb", SeriesName: "value",
                            Product: 'CO',
                            Source: 'GEOS'
                        },

                    }
                },
            },
            {
                label: 'Model-CO (WRF-Chem)',
                layerId: myApp.constants.forecast.layerId.WRF_Chem_CO,
                value: 53,
                stationData: false,
                layerProperties: {
                    catalog: 'catalog/HKHAirQualityWatch/Forecast/WRF_Chem/d1_HKH/catalog.xml',
                    initilize: false,
                    useSLD: false,
                    isTimeDimensionLayer: true,
                    VisibleDivBind: false,
                    threddLayerProp: {
                        id: myApp.constants.forecast.layerId.WRF_Chem_CO,
                        title: 'WRF-Chem CO',
                        visible: false,
                        opacity: 0.6,
                        ThreddsDataServerVersion: 5,
                        serverType: 'TDS',
                        timeSeries: false,
                        alignTimeSlider: 'right',
                        timeSliderSize: 'small',
                        showlegend: false,
                        showControlPanel: true,
                        source: {
                            url: [],
                            params: {
                                'LAYERS': 'CO_SFC',
                                'STYLES': 'default-scalar/x-Rainbow',
                                'COLORSCALERANGE': "0,500",
                                'transparent': true
                            }
                        },
                        unit: '',
                        mask: DefaultMaskWMS,
                        CropOrMask: 'crop',
                        changeWMSProxy: true,
                        filterCoodrdinate: filterCoodrdinate,
                        aoi: true,
                        zIndex: 21,
                        api: {
                            createGIF: myApp.APICollection.api.CreateGIFImage,
                            GetImage: myApp.APICollection.api.GetImage,
                            TimeZone: ' UTC'
                        },
                        plotInfo: function () {
                            return Object.assign(DefaultPlotInfo, {title: 'WRF-Chem CO(ppb)'});
                        },
                        chartDetail: {
                            title: 'WRF-Chem', unit: "ppbv", SeriesName: "value",
                            Product: 'CO',
                            Source: 'WRF-Chem'
                        },
                    }
                },
            }
        ]
    }];

myApp.formatDate = function (date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
};

myApp.makeRequest = function (method, url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
};


myApp.getForecastWMSList = async function (url) {
    let result = await myApp.makeRequest("GET", url);
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(result, "text/xml");
    let wmsList = [];
    let interestedDate = myApp.formatDate(myApp.forecastDate).replace(/-/g, '');
    let DimensionTag = xmlDoc.getElementsByTagName("catalogRef");
    let DateHavingCatalog = null;
    for (let kk of DimensionTag) {
        if (interestedDate == kk.getAttribute('xlink:title')) {
            DateHavingCatalog = url.replace('catalog.xml', kk.getAttribute('xlink:href'));
            break;
        }
    }
    if (DateHavingCatalog) {
        let result1 = await this.makeRequest("GET", DateHavingCatalog);
        let parser1 = new DOMParser();
        let xmlDoc1 = parser1.parseFromString(result1, "text/xml");
        let dataset = xmlDoc1.getElementsByTagName("dataset");
        for (let jj of dataset) {
            let name = jj.getAttribute('name');
            if (name.slice(-3) == '.nc') {
                wmsList.push(DateHavingCatalog.replace('/catalog/', '/wms/').replace('catalog.xml', name));
            }
        }
    }
    return wmsList.sort()
};

myApp.datetimePointChartObj = function (title, subTitle, SeriesData, SeriesName, YaxisLabel, XaxisLabel, plotColor, DataPeriod) {

    let data = {
        chart: {
            marginLeft: 65,
            /* marginRight: 0, */
            /* spacingLeft: 0, */
            /* spacingRight: 0 */
            backgroundColor: 'transparent',
            plotBorderColor: '#afafaf',
            plotBorderWidth: 1,
        },
        title: {
            text: title,
            fontSize: '10px',
            useHTML: true
        },
        subtitle: {
            text: subTitle,
            fontSize: '8px'
        },
        series: [{
            name: SeriesName,
            data: SeriesData,
            lineWidth: 0,
            marker: {
                enabled: true,
                symbol: 'diamond',
                radius: 2
            },
        }],
        xAxis: {
            type: 'datetime',
            title: {
                text: XaxisLabel,
                align: 'high',
            },
            tickLength: 0,
            lineColor: 0,
            lineWidth: 0
        },
        yAxis: {
            title: {
                text: `<span style="display:inline-block; -webkit-transform: rotate(270deg); -moz-transform: rotate(270deg); -ms-transform: rotate(270deg); -o-transform: rotate(270deg); filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);">${YaxisLabel}</span>`,
                useHTML: true,
                rotation: 0,
                // align: 'high',
                offset: 0,
                x: -50
            },
            tickLength: 0,
            lineColor: 0,
            lineWidth: 0,
            gridLineWidth: 0
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            series: {
                color: plotColor,
                marker: {
                    enabled: false,
                    radius: 4
                }
            }
        },
        lang: {
            noData: DataPeriod + 'data not available for this station.'
        },
        exporting: {
            buttons: {
                contextButton: {
                    menuItems: ["printChart",
                        "separator",
                        "downloadPNG",
                        "downloadJPEG",
                        "downloadPDF",
                        "downloadSVG",
                        "separator",
                        "downloadCSV",
                        "downloadXLS",
                        //"viewData",
                        "openInCloud"]
                }
            },
            // chartOptions: {
            //     title: {
            //         text: title,
            //         fontSize: '10px',
            //         useHTML: true
            //     }, yAxis: {
            //         title: {
            //             text: `<span style="display:inline-block; -webkit-transform: rotate(90deg); -moz-transform: rotate(90deg); -ms-transform: rotate(90deg); -o-transform: rotate(90deg); filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);">${YaxisLabel}</span>`,
            //             useHTML: true,
            //             rotation: 250
            //         }
            //     },
            // },
            allowHTML: true,
            // fallbackToExportServer: false,
            // libURL: 'http://localhost:8000/static/airqualitywatch/js/Highcharts/lib/'
        }
    };

    return data;
};

myApp.datetimeChartObj = function (title, subTitle, SeriesData, SeriesName, YaxisLabel, XaxisLabel, plotColor, DataPeriod,forecastDate) {
    let data = {
        chart: {
            marginLeft: 65,
            /* marginRight: 0, */
            /* spacingLeft: 0, */
            /* spacingRight: 0 */
            backgroundColor: 'transparent',
            plotBorderColor: '#afafaf',
            plotBorderWidth: 1,
        },
        title: {
            text: title,
            fontSize: '10px',
            useHTML: true
        },
        subtitle: {
            text: subTitle,
            fontSize: '8px'
        },
        series: [{
            name: SeriesName,
            data: SeriesData,
            marker: {
                enabled: false,
                symbol: 'diamond',
                radius: 3
            },
        }],
        xAxis: {
            type: 'datetime',
            title: {
                text: XaxisLabel,
                align: 'high',
            },
            tickLength: 0,
            lineColor: 0,
            lineWidth: 0
        },
        lang: {
            noData: 'data not available for '+forecastDate
        },
        yAxis: {
            title: {
                text: `<span style="display:inline-block; -webkit-transform: rotate(270deg); -moz-transform: rotate(270deg); -ms-transform: rotate(270deg); -o-transform: rotate(270deg); filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);">${YaxisLabel}</span>`,
                useHTML: true,
                rotation: 0,
                // align: 'high',
                offset: 0,
                x: -50
            },
            tickLength: 0,
            lineColor: 0,
            lineWidth: 0,
            gridLineWidth: 0
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            series: {
                color: plotColor
            }
        },
        exporting: {
            buttons: {
                contextButton: {
                    menuItems: ["printChart",
                        "separator",
                        "downloadPNG",
                        "downloadJPEG",
                        "downloadPDF",
                        "downloadSVG",
                        "separator",
                        "downloadCSV",
                        "downloadXLS",
                        //"viewData",
                        "openInCloud"]
                }
            },
            // chartOptions: {
            //     title: {
            //         text: title,
            //         fontSize: '10px',
            //         useHTML: true
            //     }, yAxis: {
            //         title: {
            //             text: `<span style="display:inline-block; -webkit-transform: rotate(90deg); -moz-transform: rotate(90deg); -ms-transform: rotate(90deg); -o-transform: rotate(90deg); filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);">${YaxisLabel}</span>`,
            //             useHTML: true,
            //             rotation: 250
            //         }
            //     },
            // },
            allowHTML: true,
            // fallbackToExportServer: false,
            // libURL: 'http://localhost:8000/static/airqualitywatch/js/Highcharts/lib/'
        }
    };
    return data
};

myApp.forceDownload = function (url, fileName) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(this.response);
        var tag = document.createElement('a');
        tag.href = imageUrl;
        tag.download = fileName;
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
    }
    xhr.send();
}

// myApp.datetimeChartObj = function (title, subTitle, SeriesData, SeriesName, YaxisLabel, XaxisLabel, plotColor) {
//     let data = {
//             chart: {
//                 marginLeft: 65,
//                 /* marginRight: 0, */
//                 /* spacingLeft: 0, */
//                 /* spacingRight: 0 */
//                 backgroundColor: 'transparent',
//                 plotBorderColor: '#afafaf',
//                 plotBorderWidth: 1,
//             },
//             title: {
//                 text: title,
//                 fontSize: '10px',
//                 useHTML: true
//             },
//             subtitle: {
//                 text: subTitle,
//                 fontSize: '8px'
//             },
//             series: [{
//                 name: SeriesName,
//                 data: SeriesData,
//                 // marker: {
//                 //     enabled: true,
//                 //     symbol: 'diamond',
//                 //     radius: 3
//                 // },
//             }],
//             xAxis: {
//                 type: 'datetime',
//                 title: {
//                     text: XaxisLabel,
//                     align: 'high',
//                 },
//                 tickLength: 0,
//                 lineColor: 0,
//                 lineWidth: 0
//             },
//             yAxis: {
//                 title: {
//                     text: `<span style="display:inline-block; -webkit-transform: rotate(270deg); -moz-transform: rotate(270deg); -ms-transform: rotate(270deg); -o-transform: rotate(270deg); filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);">${YaxisLabel}</span>`,
//                     useHTML: true,
//                     rotation: 0,
//                     // align: 'high',
//                     offset: 0,
//                     x: -50
//                 },
//                 tickLength: 0,
//                 lineColor: 0,
//                 lineWidth: 0,
//                 gridLineWidth: 0
//             },
//             legend: {
//                 enabled: false
//             },
//             credits: {
//                 enabled: false
//             },
//             plotOptions: {
//                 series: {
//                     color: plotColor
//                 }
//             },
//             exporting: {
//                 buttons: {
//                     contextButton: {
//                         menuItems: ["printChart",
//                             "separator",
//                             "downloadPNG",
//                             "downloadJPEG",
//                             "downloadPDF",
//                             "downloadSVG",
//                             "separator",
//                             "downloadCSV",
//                             "downloadXLS",
//                             //"viewData",
//                             "openInCloud"]
//                     }
//                 },
//                 // chartOptions: {
//                 //     title: {
//                 //         text: title,
//                 //         fontSize: '10px',
//                 //         useHTML: true
//                 //     }, yAxis: {
//                 //         title: {
//                 //             text: `<span style="display:inline-block; -webkit-transform: rotate(90deg); -moz-transform: rotate(90deg); -ms-transform: rotate(90deg); -o-transform: rotate(90deg); filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);">${YaxisLabel}</span>`,
//                 //             useHTML: true,
//                 //             rotation: 250
//                 //         }
//                 //     },
//                 // },
//                 allowHTML: true,
//                 // fallbackToExportServer: false,
//                 // libURL: 'http://localhost:8000/static/airqualitywatch/js/Highcharts/lib/'
//             }
//         }
//     ;
//     console.log(JSON.stringify(data));
//     return data
// };

export var AirPollutionWatchApp = myApp;