import Style from "ol/style/Style";
import RegularShape from "ol/style/RegularShape";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Text from "ol/style/Text";
import {DefaultMaskWMS, DefaultPlotInfo, TethysAPIAppName} from "../config";
import {Action} from "../store/actionType";
import {getURLParameters} from './helpers';

var myApp = {};
// First need to initilize
var filterCoodrdinate = {};


myApp.endDate = new Date();
myApp.endDate.setDate(myApp.endDate.getDate() - 1);

myApp.startDate = new Date();
myApp.startDate.setDate(myApp.endDate.getDate() - 7);

// myApp.startDate = new Date();
// myApp.startDate.setDate(myApp.endDate.getDate() - 1);


let archiveDate = getURLParameters()['date'];
if (archiveDate) {
    if (archiveDate.length == 8) {
        let checkInt = parseInt(archiveDate);
        if (checkInt) {
            // Number with valid
            let YYYY = parseInt(archiveDate.slice(0, 4));
            let MM_index = parseInt(archiveDate.slice(4, 6)) - 1;
            let DD = parseInt(archiveDate.slice(6, 8));
            let dObject = new Date(YYYY, MM_index, DD);
            myApp.endDate = dObject;
            let bd = getURLParameters()['bd'];
            let copiedDate = new Date(myApp.endDate);
            if (bd) {
                //    do something
                let checkInt = parseInt(bd);
                if (checkInt) {
                    if (checkInt <= 20) {
                        myApp.startDate.setDate(myApp.endDate.getDate() - checkInt);
                    } else {
                        myApp.startDate = copiedDate.setDate(copiedDate.getDate() - 7);
                    }
                } else {
                    myApp.startDate = copiedDate.setDate(copiedDate.getDate() - 7);

                }
            } else {
                // myApp.startDate.setDate(myApp.endDate.getDate() - 7);
                myApp.startDate = copiedDate.setDate(copiedDate.getDate() - 7);
            }

        }
    }
}


// myApp.startDateArchive = new Date();
// myApp.startDateArchive.setDate(myApp.startDateArchive.getDate() - 1);
// myApp.endDateArchive = new Date();


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
    archive: {
        layerId: {
            TerraModisTrueColor: 'Archive__TerraModisTrueColor',
            VIIRS_SNPPTrueColor: 'Recent__VIIRS_SNPP-TrueColor1km',
            GEOS_PM2p5: 'Archive__GEOS_PM2p5',
            TerraModisAOD: 'Archive__TerraModisAOD',
            PM_AeronetAOD: 'Archive__aeronet',
            PM_usembassy: 'Archive__usembassy',
            O3_usembassy: 'Archive__usembassy_O3',
            O3_TROPOMI: 'Archive__TROPOMI_O3',
            O3_GEOS: 'Archive__GEOS_O3',
            SO2_TROPOMI: 'Archive__TROPOMI_SO2',
            SO2_GEOS: 'Archive__GEOS_SO2',
            NO2_TROPOMI: 'Archive__TROPOMI_NO2',
            NO2_GEOS: 'Archive__GEOS_NO2',
            CO_TROPOMI: 'Archive__TROPOMI_CO',
            CO_TROPOMI_SERVIR: 'Archive__TROPOMI_CO_SERVIR',
            CO_GEOS: 'Archive__GEOS_CO',
            NO2_AST: 'Archive__AST_NO2',
            SO2_AST: 'Archive__AST_SO2',
            Nep_Gov_PM1: 'Nep_Gov_PM1',
            Nep_Gov_PM10: 'Nep_Gov_PM10',
            Nep_Gov_PM2p5: 'Nep_Gov_PM2p5',
            Nep_Gov_tsp: 'Nep_Gov_tsp',
        }
    },
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

myApp.AeronetAODStyleFun = function (feature, resolution) {
    let name = feature.get('name');

    if (resolution > 2445.98490512564) {
        name = ''
    }
    let AeronetStyle = null;
    AeronetStyle = new Style({
        image: new RegularShape({
            fill: new Fill({color: '#D5212E'}),
            stroke: new Stroke({color: 'black', width: 1}),
            points: 3,
            radius: 10,
            rotation: 0,
            angle: 0
        }),
        text: new Text({
            font: "normal 12px Arial",
            text: name,
            fill: new Fill({color: '#aa3300'}),
            stroke: new Stroke({color: '#ffffff', width: 3}),
            offsetX: 0,
            offsetY: 15,
        })
    });
    return AeronetStyle;
};
myApp.USEmbassyPM25StyleFun = function (feature, resolution) {
    let name = feature.get('name');

    if (resolution > 2445.98490512564) {
        name = ''
    }
    let USEmbassyAODStyle = null;
    USEmbassyAODStyle = new Style({
        image: new RegularShape({
            fill: new Fill({color: '#CBCB59'}),
            stroke: new Stroke({color: 'black', width: 1}),
            points: 4,
            radius: 10,
            angle: Math.PI / 4
        }),
        text: new Text({
            font: "normal 12px Arial",
            text: name,
            fill: new Fill({color: '#aa3300'}),
            stroke: new Stroke({color: '#ffffff', width: 3}),
            offsetX: 0,
            offsetY: 15,
        })
    });
    return USEmbassyAODStyle;
};
myApp.USEmbassyO3StyleFun = function (feature, resolution) {
    let name = feature.get('name');
    if (resolution > 2445.98490512564) {
        name = ''
    }
    let USEmbassyAODStyle = null;
    USEmbassyAODStyle = new Style({
        image: new RegularShape({
            fill: new Fill({color: '#CBCB59'}),
            stroke: new Stroke({color: 'black', width: 1}),
            points: 4,
            radius: 10,
            angle: Math.PI / 4
        }),
        text: new Text({
            font: "normal 12px Arial",
            text: name,
            fill: new Fill({color: '#aa3300'}),
            stroke: new Stroke({color: '#ffffff', width: 3}),
            offsetX: 0,
            offsetY: 15,
        })
    });
    return USEmbassyAODStyle;
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
let SLDRGB = `<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.1.0" xsi:schemaLocation="http://www.opengis.net/sldStyledLayerDescriptor.xsd"
                       xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
                       xmlns:se="http://www.opengis.net/se" xmlns:xlink="http://www.w3.org/1999/xlink"
                       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:resc="http://www.resc.reading.ac.uk">
    <NamedLayer>
     <se:Name>red</se:Name>
        <UserStyle>
            <se:Name>Thesholded colour scheme</se:Name>
            <se:CoverageStyle>
                <se:Rule>
                    <resc:RasterRGBSymbolizer>
                        <se:Opacity>1.0</se:Opacity>
                        <se:ColorMap>
                            <resc:RedBand>
                                <resc:BandName>red</resc:BandName>
                                <resc:Range>
                                    <resc:Minimum>0</resc:Minimum>
                                    <resc:Maximum>255</resc:Maximum>
                                </resc:Range>
                            </resc:RedBand>
                            <resc:GreenBand>
                                <resc:BandName>green</resc:BandName>
                                <resc:Range>
                                    <resc:Minimum>0</resc:Minimum>
                                    <resc:Maximum>255</resc:Maximum>
                                </resc:Range>
                            </resc:GreenBand>
                            <resc:BlueBand>
                                <resc:BandName>blue</resc:BandName>
                                <resc:Range>
                                    <resc:Minimum>1</resc:Minimum>
                                    <resc:Maximum>255</resc:Maximum>
                                    <resc:Spacing>linear</resc:Spacing>
                                </resc:Range>
                            </resc:BlueBand>
                        </se:ColorMap>
                    </resc:RasterRGBSymbolizer>
                </se:Rule>
            </se:CoverageStyle>
        </UserStyle>
    </NamedLayer>
</StyledLayerDescriptor>
`;

myApp.TrueColorImage = {
    catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/TerraMODIS-TrueColor1km/catalog.xml',
    useSLD: true,
    isTimeDimensionLayer: true,
    SLD: SLDRGB,
    getStartDate: function () {
        return myApp.formatDate(myApp.startDate)
    },
    getEndDate: function () {
        return myApp.formatDate(myApp.endDate)
    },
    VisibleDivBind: true,
    threddLayerProp: {
        id: myApp.constants.archive.layerId.TerraModisTrueColor,
        title: 'TerraModis-TrueColor',
        visible: false,
        opacity: 0.5,
        legendPath: Action.Base + '/' + Action.trueColorLegendImage,
        ThreddsDataServerVersion: 5,
        serverType: 'TDS',
        timeSeries: false,
        alignTimeSlider: 'right',
        timeSliderSize: 'small',
        showlegend: false,
        showControlPanel: true,
        zIndex: 10,
        filterCoodrdinate: filterCoodrdinate,
        RGBComposite: true,
        showAnimationButton: true,
        animationPlot: {title_text: 'TERRA/MODIS Color Image', bbox: [60, 15, 100, 38], resolution: 400},
        source: {
            url: [],
            params: {
                'LAYERS': 'red',
                'transparent': true
            }
        },
        mask: DefaultMaskWMS,
        CropOrMask: 'crop',
        changeWMSProxy: true,
    }
};


// myApp.TrueColorImage = {
//     catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/VIIRS_SNPP-TrueColor1km/catalog.xml',
//     useSLD: true,
//     isTimeDimensionLayer: true,
//     SLD: SLDRGB,
//     getStartDate: function () {
//         return myApp.formatDate(myApp.startDate)
//     },
//     getEndDate: function () {
//         return myApp.formatDate(myApp.endDate)
//     },
//     VisibleDivBind: true,
//     threddLayerProp: {
//         id: myApp.constants.archive.layerId.VIIRS_SNPPTrueColor,
//         title: 'VIIRS SNPP TrueColor',
//         visible: false,
//         opacity: 0.5,
//         legendPath: Action.Base + '/' + Action.trueColorLegendImage,
//         ThreddsDataServerVersion: 5,
//         serverType: 'TDS',
//         timeSeries: false,
//         alignTimeSlider: 'right',
//         timeSliderSize: 'small',
//         showlegend: false,
//         showControlPanel: true,
//         zIndex: 10,
//         filterCoodrdinate: filterCoodrdinate,
//         RGBComposite: true,
//         showAnimationButton: true,
//         animationPlot: {title_text: 'VIIRS True Color Image', bbox: [60, 15, 100, 38], resolution: 400},
//         source: {
//             url: [],
//             params: {
//                 'LAYERS': 'red',
//                 'transparent': true
//             }
//         },
//         mask: DefaultMaskWMS,
//         CropOrMask: 'crop',
//         changeWMSProxy: true,
//     }
// };

myApp.DefaultSations = {
    aeronetAOD: [2, 5, 3, 6],
    pm2p5Embassy: [6, 7, 6, 7],
    o3Embassy: [6, 7, 6, 7],
    NepalStation: [57, 11, 15, 71]
};

myApp.cascaderObj = [
    {
        label: 'PM',
        value: 1,
        children: [
            {
                label: 'Surface Observation-AOD (AERONET)',
                value: 11,
                layerId: myApp.constants.archive.layerId.PM_AeronetAOD,
                stationData: true,
                ModelClass: 'AeronetAod',
                ModelClassDataList: 'AeronetDataList',
                typeName: 'aod',
                defaultStation: myApp.DefaultSations.aeronetAOD,
                chart: {
                    title: function (stationName, sd, ed) {
                        return `${stationName} (${sd} - ${ed})`;
                    },
                    subTitle: 'AERONET level 1.5 data measured at 500nm',
                    SeriesName: 'SeriesName',
                    YaxisLabel: 'AOD',
                    XaxisLabel: function () {
                        return 'Time (UTC)';
                    },
                    plotType: 'point'
                },
                layerProperties: {
                    initilize: false,
                    id: myApp.constants.archive.layerId.PM_AeronetAOD,
                    title: 'Surface Observation-AOD (AERONET)',
                    visible: false,
                    opacity: 1,
                    zIndex: 5,
                    layer: 'AirQuality:aeronet_aod',
                },
            },
            {
                label: 'Ground Observation-PM2.5 (AirNow)',
                layerId: myApp.constants.archive.layerId.PM_usembassy,
                value: 12,
                stationData: true,
                ModelClass: 'UsEmbassyPm',
                ModelClassDataList: 'UsEmbassyDataList',
                typeName: 'pm',
                defaultStation: myApp.DefaultSations.pm2p5Embassy,
                chart: {
                    title: function (stationName, sd, ed) {
                        return `${stationName} (${sd} - ${ed})`;
                    },
                    subTitle: 'source: AirNow',
                    SeriesName: 'PM2.5',
                    YaxisLabel: 'PM<sub>2.5</sub>(μg/m<sup>3</sup>)',
                    XaxisLabel: function () {
                        return 'Time (UTC)';
                    }
                },
                layerProperties: {
                    initilize: false,
                    id: myApp.constants.archive.layerId.PM_usembassy,
                    title: 'Ground Observation-PM2.5 (AirNow)',
                    visible: false,
                    opacity: 1,
                    zIndex: 6,
                    layer: 'AirQuality:us_embassy_pm2p5',

                },
            },
            {
                label: 'Reanalysis-PM2.5 (GEOS)',
                layerId: myApp.constants.archive.layerId.GEOS_PM2p5,
                value: 13,
                stationData: false,
                layerProperties: {
                    catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/PM/GEOS-PM2p5/catalog.xml',
                    initilize: false,
                    useSLD: false,
                    isTimeDimensionLayer: true,
                    getStartDate: function () {
                        return myApp.formatDate(myApp.startDate)
                    },
                    getEndDate: function () {
                        return myApp.formatDate(myApp.endDate)
                    },
                    VisibleDivBind: false,
                    threddLayerProp: {
                        id: myApp.constants.archive.layerId.GEOS_PM2p5,
                        title: 'GEOS PM2.5',
                        visible: false,
                        opacity: 0.5,
                        ThreddsDataServerVersion: 5,
                        serverType: 'TDS',
                        timeSeries: false,
                        alignTimeSlider: 'right',
                        timeSliderSize: 'small',
                        showlegend: false,
                        showControlPanel: true,
                        showAnimationButton: true,
                        animationPlot: {
                            title_text: "GEOS Reanalysis PM$\\mathregular{_{2.5} (µg/m^{3})}$",
                            bbox: [60, 15, 100, 38],
                            resolution: 400,
                            positionLegend: [0.85, 0.105, 0.0865, 0.78]
                        },
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
                        zIndex: 11,
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
                            Source: 'GEOS',

                        },
                    }
                }
            },
            {
                label: 'Satellite-AOD (Terra-MODIS)',
                layerId: myApp.constants.archive.layerId.TerraModisAOD,
                value: 14,
                stationData: false,
                layerProperties: {
                    initilize: false,
                    catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/PM/TerraModis-AOD/catalog.xml',
                    useSLD: false,
                    isTimeDimensionLayer: true,
                    getStartDate: function () {
                        return myApp.formatDate(myApp.startDate)
                    },
                    getEndDate: function () {
                        return myApp.formatDate(myApp.endDate)
                    },
                    VisibleDivBind: false,
                    threddLayerProp: {
                        id: myApp.constants.archive.layerId.TerraModisAOD,
                        title: 'TerraModis-AOD',
                        visible: false,
                        opacity: 0.6,
                        ThreddsDataServerVersion: 5,
                        serverType: 'TDS',
                        timeSeries: false,
                        alignTimeSlider: 'right',
                        timeSliderSize: 'small',
                        showlegend: false,
                        showControlPanel: true,
                        showAnimationButton: true,
                        animationPlot: {
                            title_text: 'Satellite-AOD (Terra-MODIS)',
                            bbox: [60, 15, 100, 38],
                            resolution: 400,
                            positionLegend: [0.85, 0.105, 0.0755, 0.78]
                        },
                        source: {
                            url: [],
                            params: {
                                'LAYERS': 'aod_550',
                                'STYLES': 'default-scalar/x-Rainbow',
                                'COLORSCALERANGE': '0.01,1',
                                'transparent': true
                            }
                        },
                        unit: '',
                        mask: DefaultMaskWMS,
                        CropOrMask: 'crop',
                        changeWMSProxy: true,
                        filterCoodrdinate: filterCoodrdinate,
                        aoi: true,
                        zIndex: 12,
                        api: {
                            createGIF: myApp.APICollection.api.CreateGIFImage,
                            GetImage: myApp.APICollection.api.GetImage,
                            TimeZone: ' UTC'
                        },
                        plotInfo: function () {
                            return Object.assign(DefaultPlotInfo, {
                                title: 'TerraModis-AOD',
                                TimeZone: ' UTC'
                            })
                        }, chartDetail: {
                            title: 'TerraModis-AOD', unit: "AOD", SeriesName: "value",
                            Product: 'AOD',
                            Source: 'Terra MODIS'
                        },
                    }
                }
            },

        ]
    },
    {
        label: 'O3',
        value: 2,
        children: [
            // {
            //     label: 'Satellite-O3 (TROPOMI)',
            //     layerId: myApp.constants.archive.layerId.O3_TROPOMI,
            //     value: 21,
            // },
            {
                label: 'Reanalysis-O3 (GEOS)',
                layerId: myApp.constants.archive.layerId.O3_GEOS,
                value: 22,
                stationData: false,
                layerProperties: {
                    initilize: false,
                    catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/O3/GEOS-O3/catalog.xml',
                    useSLD: false,
                    isTimeDimensionLayer: true,
                    getStartDate: function () {
                        return myApp.formatDate(myApp.startDate)
                    },
                    getEndDate: function () {
                        return myApp.formatDate(myApp.endDate)
                    },
                    VisibleDivBind: false,
                    threddLayerProp: {
                        id: myApp.constants.archive.layerId.O3_GEOS,
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
                        showAnimationButton: true,
                        animationPlot: {
                            title_text: "GEOS Reanalysis O$\\mathregular{_{3} (ppb)}$",
                            bbox: [60, 15, 100, 38],
                            resolution: 400,
                            positionLegend: [0.85, 0.105, 0.0755, 0.78]
                        },
                        source: {
                            url: [],
                            params: {
                                'LAYERS': 'O3',
                                'STYLES': 'default-scalar/x-Rainbow',
                                'COLORSCALERANGE': '0,80',
                                'transparent': true
                            }
                        },
                        unit: 'ppb',
                        mask: DefaultMaskWMS,
                        CropOrMask: 'crop',
                        changeWMSProxy: true,
                        filterCoodrdinate: filterCoodrdinate,
                        aoi: true,
                        zIndex: 14,
                        api: {
                            createGIF: myApp.APICollection.api.CreateGIFImage,
                            GetImage: myApp.APICollection.api.GetImage,
                            TimeZone: ' UTC'
                        },
                        plotInfo: function () {
                            return Object.assign(DefaultPlotInfo, {title: 'GEOS $O_{3}$(ppb)', TimeZone: ' UTC'})
                        }, chartDetail: {
                            title: 'GEOS', unit: "ppb", SeriesName: "value",
                            Product: 'O<sub>3</sub>',
                            Source: 'GEOS'
                        },
                    }
                }
            },
            // {
            //     label: 'Surface Observation-O3',
            //     layerId: myApp.constants.archive.layerId.O3_usembassy,
            //     value: 23,
            //     stationData: true,
            //     ModelClass: 'UsEmbassyPm',
            //     ModelClassDataList: 'UsEmbassyDataList',
            //     typeName: 'O3',
            //     defaultStation: myApp.DefaultSations.o3Embassy,
            //     chart: {
            //         title: function (stationName, sd, ed) {
            //             return `${stationName} (${sd} - ${ed})`
            //         },
            //         subTitle: 'source: AirNow',
            //         SeriesName: 'O3',
            //         YaxisLabel: 'O<sub>3</sub>(ppb)',
            //         XaxisLabel: function () {
            //             return 'Time (UTC)'
            //         }
            //     },
            //     layerProperties: {
            //         initilize: false,
            //         id: myApp.constants.archive.layerId.O3_usembassy,
            //         title: 'Surface Observation-O3',
            //         visible: true,
            //         opacity: 1,
            //         zIndex: 7,
            //         layer: 'AirQuality:us_embassy_o3',
            //     },
            // },
        ]
    },
    {
        label: 'SO2',
        value: 3,
        children: [
            // {
            //     label: 'Satellite-SO2 (TROPOMI-GEE)',
            //     layerId: myApp.constants.archive.layerId.SO2_TROPOMI,
            //     value: 31,
            //     stationData: false,
            //     layerProperties: {
            //         initilize: false,
            //         catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/SO2/TROPOMI-SO2/catalog.xml',
            //         useSLD: false,
            //         isTimeDimensionLayer: true,
            //         getStartDate: function () {
            //             return myApp.formatDate(myApp.startDate)
            //         },
            //         getEndDate: function () {
            //             return myApp.formatDate(myApp.endDate)
            //         },
            //         VisibleDivBind: false,
            //         threddLayerProp: {
            //             id: myApp.constants.archive.layerId.SO2_TROPOMI,
            //             title: 'TROPOMI SO2 (TROPOMI-GEE)',
            //             visible: false,
            //             opacity: 0.6,
            //             ThreddsDataServerVersion: 5,
            //             serverType: 'TDS',
            //             timeSeries: false,
            //             alignTimeSlider: 'right',
            //             timeSliderSize: 'small',
            //             showlegend: false,
            //             showControlPanel: true,
            //             source: {
            //                 url: [],
            //                 params: {
            //                     'LAYERS': 'SO2',
            //                     'STYLES': 'default-scalar/x-Rainbow',
            //                     'COLORSCALERANGE': '0,1',
            //                     'transparent': true
            //                 }
            //             },
            //             unit: 'molecules / sq.cm',
            //             mask: DefaultMaskWMS,
            //             CropOrMask: 'crop',
            //             changeWMSProxy: true,
            //             filterCoodrdinate: filterCoodrdinate,
            //             aoi: true,
            //             zIndex: 15,
            //             api: {
            //                 createGIF: myApp.APICollection.api.CreateGIFImage,
            //                 GetImage: myApp.APICollection.api.GetImage,
            //                 TimeZone: ' UTC'
            //             },
            //             plotInfo: function () {
            //                 return Object.assign(DefaultPlotInfo, {
            //                     title: 'TROPOMI $SO_{2}$($10^{17}$ molecules/$cm^{2}$)',
            //                     TimeZone: ' UTC'
            //                 })
            //             }, chartDetail: {
            //                 title: 'TROPOMI',
            //                 unit: "10<sup>17</sup> molecules/cm<sup>2</sup>",
            //                 SeriesName: "value",
            //                 Product: 'SO<sub>2</sub>',
            //                 Source: 'TROPOMI-GEE'
            //             },
            //         }
            //     }
            // },
            {
                label: 'Reanalysis-SO2 (GEOS)',
                layerId: myApp.constants.archive.layerId.SO2_GEOS,
                value: 32,
                stationData: false,
                layerProperties: {
                    initilize: false,
                    catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/SO2/GEOS-SO2/catalog.xml',
                    useSLD: false,
                    isTimeDimensionLayer: true,
                    getStartDate: function () {
                        return myApp.formatDate(myApp.startDate)
                    },
                    getEndDate: function () {
                        return myApp.formatDate(myApp.endDate)
                    },
                    VisibleDivBind: false,
                    threddLayerProp: {
                        id: myApp.constants.archive.layerId.SO2_GEOS,
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
                        showAnimationButton: true,
                        animationPlot: {
                            title_text:"GEOS Reanalysis SO$\\mathregular{_{2} (ppb)}$",
                            bbox: [60, 15, 100, 38],
                            resolution: 400,
                            positionLegend: [0.85, 0.105, 0.0755, 0.78]
                        },
                        source: {
                            url: [],
                            params: {
                                'LAYERS': 'SO2',
                                'STYLES': 'default-scalar/x-Rainbow',
                                'COLORSCALERANGE': '0,10',
                                'transparent': true
                            }
                        },
                        unit: 'ppb',
                        mask: DefaultMaskWMS,
                        CropOrMask: 'crop',
                        changeWMSProxy: true,
                        filterCoodrdinate: filterCoodrdinate,
                        aoi: true,
                        zIndex: 16,
                        api: {
                            createGIF: myApp.APICollection.api.CreateGIFImage,
                            GetImage: myApp.APICollection.api.GetImage,
                            TimeZone: ' UTC'
                        },
                        plotInfo: function () {
                            return Object.assign(DefaultPlotInfo, {title: 'GEOS $SO_{2}$(ppb)', TimeZone: ' UTC'})
                        }, chartDetail: {
                            title: 'GEOS', unit: "ppb", SeriesName: "value",
                            Product: 'SO<sub>2</sub>',
                            Source: 'GEOS'
                        },
                    }
                }
            },
            {
                label: 'Satellite-SO2 (TROPOMI-SERVIR AST)',
                layerId: myApp.constants.archive.layerId.SO2_AST,
                value: 33,
                stationData: false,
                layerProperties: {
                    initilize: false,
                    catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/SO2/AST-HKH-SO2/catalog.xml',
                    useSLD: false,
                    isTimeDimensionLayer: true,
                    getStartDate: function () {
                        return myApp.formatDate(myApp.startDate)
                    },
                    getEndDate: function () {
                        return myApp.formatDate(myApp.endDate)
                    },
                    VisibleDivBind: false,
                    threddLayerProp: {
                        id: myApp.constants.archive.layerId.SO2_AST,
                        title: 'TROPOMI SO2 (SERVIR AST)',
                        visible: false,
                        opacity: 0.6,
                        ThreddsDataServerVersion: 5,
                        serverType: 'TDS',
                        timeSeries: false,
                        alignTimeSlider: 'right',
                        timeSliderSize: 'small',
                        showlegend: false,
                        showControlPanel: true,
                        showAnimationButton: true,
                        animationPlot: {
                            title_text: 'TROPOMI SO2',
                            bbox: [60, 15, 100, 38],
                            resolution: 400,
                            positionLegend: [0.85, 0.105, 0.0755, 0.78]
                        },
                        source: {
                            url: [],
                            params: {
                                'LAYERS': 'SO2',
                                'STYLES': 'default-scalar/x-Rainbow',
                                'COLORSCALERANGE': '0,10',
                                'transparent': true
                            }
                        },
                        unit: 'ppb',
                        mask: DefaultMaskWMS,
                        CropOrMask: 'crop',
                        changeWMSProxy: true,
                        filterCoodrdinate: filterCoodrdinate,
                        aoi: true,
                        zIndex: 16,
                        api: {
                            createGIF: myApp.APICollection.api.CreateGIFImage,
                            GetImage: myApp.APICollection.api.GetImage,
                            TimeZone: ' UTC'
                        },
                        plotInfo: function () {
                            return Object.assign(DefaultPlotInfo, {title: 'GEOS $SO_{2}$(ppb)', TimeZone: ' UTC'})
                        },
                        chartDetail: {
                            title: 'AST TROPOMI',
                            unit: "molecules/cm<sup>2</sup>",
                            SeriesName: "value",
                            Product: 'SO<sub>2</sub>',
                            Source: 'TROPOMI-SERVIR AST'
                        },
                    }
                }
            },
        ]
    },
    {
        label: 'NO2',
        value: 4,
        children: [
            // {
            //     label: 'Satellite-NO2 (TROPOMI-GEE)',
            //     layerId: myApp.constants.archive.layerId.NO2_TROPOMI,
            //     value: 41,
            //     stationData: false,
            //     layerProperties: {
            //         initilize: false,
            //         catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/NO2/TROPOMI-NO2/catalog.xml',
            //         useSLD: false,
            //         isTimeDimensionLayer: true,
            //         getStartDate: function () {
            //             return myApp.formatDate(myApp.startDate)
            //         },
            //         getEndDate: function () {
            //             return myApp.formatDate(myApp.endDate)
            //         },
            //         VisibleDivBind: false,
            //         threddLayerProp: {
            //             id: myApp.constants.archive.layerId.NO2_TROPOMI,
            //             title: 'TROPOMI NO2 (GEE)',
            //             visible: false,
            //             opacity: 0.6,
            //             ThreddsDataServerVersion: 5,
            //             serverType: 'TDS',
            //             timeSeries: false,
            //             alignTimeSlider: 'right',
            //             timeSliderSize: 'small',
            //             showlegend: false,
            //             showControlPanel: true,
            //             source: {
            //                 url: [],
            //                 params: {
            //                     'LAYERS': 'NO2',
            //                     'STYLES': 'default-scalar/x-Rainbow',
            //                     'COLORSCALERANGE': '0,10',
            //                     'transparent': true
            //                 }
            //             },
            //             unit: 'molecules / sq.cm',
            //             mask: DefaultMaskWMS,
            //             CropOrMask: 'crop',
            //             changeWMSProxy: true,
            //             filterCoodrdinate: filterCoodrdinate,
            //             aoi: true,
            //             zIndex: 17,
            //             api: {
            //                 createGIF: myApp.APICollection.api.CreateGIFImage,
            //                 GetImage: myApp.APICollection.api.GetImage,
            //                 TimeZone: ' UTC'
            //             },
            //             plotInfo: function () {
            //                 return Object.assign(DefaultPlotInfo, {
            //                     title: 'TROPOMI $NO_{2}$($10^{15}$ molecules/$cm^{2}$)',
            //                     TimeZone: ' UTC'
            //                 })
            //             },
            //             chartDetail: {
            //                 title: 'TROPOMI',
            //                 unit: "10<sup>15</sup> molecules/cm<sup>2</sup>",
            //                 SeriesName: "value",
            //                 Product: 'NO<sub>2</sub>',
            //                 Source: 'TROPOMI-GEE'
            //             },
            //         }
            //     }
            // },
            {
                label: 'Reanalysis-NO2 (GEOS)',
                layerId: myApp.constants.archive.layerId.NO2_GEOS,
                value: 42,
                stationData: false,
                layerProperties: {
                    initilize: false,
                    catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/NO2/GEOS-NO2/catalog.xml',
                    useSLD: false,
                    isTimeDimensionLayer: true,
                    getStartDate: function () {
                        return myApp.formatDate(myApp.startDate);
                    },
                    getEndDate: function () {
                        return myApp.formatDate(myApp.endDate);
                    },
                    VisibleDivBind: false,
                    threddLayerProp: {
                        id: myApp.constants.archive.layerId.NO2_GEOS,
                        title: 'GEOS NO2 (GEE)',
                        visible: false,
                        opacity: 0.6,
                        ThreddsDataServerVersion: 5,
                        serverType: 'TDS',
                        timeSeries: false,
                        alignTimeSlider: 'right',
                        timeSliderSize: 'small',
                        showlegend: false,
                        showControlPanel: true,
                        showAnimationButton: true,
                        animationPlot: {
                            title_text:  "GEOS Reanalysis NO$\\mathregular{_{2} (ppb)}$",
                            bbox: [60, 15, 100, 38],
                            resolution: 400,
                            positionLegend: [0.85, 0.105, 0.0755, 0.78]
                        },
                        source: {
                            url: [],
                            params: {
                                'LAYERS': 'NO2',
                                'STYLES': 'default-scalar/x-Rainbow',
                                'COLORSCALERANGE': '0,10',
                                'transparent': true
                            }
                        },
                        unit: 'ppb',
                        mask: DefaultMaskWMS,
                        CropOrMask: 'crop',
                        changeWMSProxy: true,
                        filterCoodrdinate: filterCoodrdinate,
                        aoi: true,
                        zIndex: 18,
                        api: {
                            createGIF: myApp.APICollection.api.CreateGIFImage,
                            GetImage: myApp.APICollection.api.GetImage,
                            TimeZone: ' UTC'
                        },
                        plotInfo: function () {
                            return Object.assign(DefaultPlotInfo, {title: 'GEOS $NO_{2}$(ppb)', TimeZone: ' UTC'})
                        }, chartDetail: {
                            title: 'GEOS', unit: "ppb", SeriesName: "value",
                            Product: 'NO<sub>2</sub>',
                            Source: 'GEOS'
                        },
                    }
                }
            }, {
                label: 'Satellite-NO2 (TROPOMI-SERVIR AST)',
                layerId: myApp.constants.archive.layerId.NO2_AST,
                value: 43,
                stationData: false,
                layerProperties: {
                    initilize: false,
                    catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/NO2/AST-HKH-NO2/catalog.xml',
                    useSLD: false,
                    isTimeDimensionLayer: true,
                    getStartDate: function () {
                        return myApp.formatDate(myApp.startDate);
                    },
                    getEndDate: function () {
                        return myApp.formatDate(myApp.endDate);
                    },
                    VisibleDivBind: false,
                    threddLayerProp: {
                        id: myApp.constants.archive.layerId.NO2_AST,
                        title: 'TROPOMI NO2 (SERVIR AST)',
                        visible: false,
                        opacity: 0.6,
                        ThreddsDataServerVersion: 5,
                        serverType: 'TDS',
                        timeSeries: false,
                        alignTimeSlider: 'right',
                        timeSliderSize: 'small',
                        showlegend: false,
                        showControlPanel: true,
                        showAnimationButton: true,
                        animationPlot: {
                            title_text: 'TROPOMI NO2',
                            bbox: [60, 15, 100, 38],
                            resolution: 400,
                            positionLegend: [0.85, 0.105, 0.0755, 0.78]
                        },
                        source: {
                            url: [],
                            params: {
                                'LAYERS': 'NO2',
                                'STYLES': 'default-scalar/x-Rainbow',
                                'COLORSCALERANGE': '0,10',
                                'transparent': true
                            }
                        },
                        unit: 'ppb',
                        mask: DefaultMaskWMS,
                        CropOrMask: 'crop',
                        changeWMSProxy: true,
                        filterCoodrdinate: filterCoodrdinate,
                        aoi: true,
                        zIndex: 18,
                        api: {
                            createGIF: myApp.APICollection.api.CreateGIFImage,
                            GetImage: myApp.APICollection.api.GetImage,
                            TimeZone: ' UTC'
                        },
                        plotInfo: function () {
                            return Object.assign(DefaultPlotInfo, {title: 'GEOS $NO_{2}$(ppb)', TimeZone: ' UTC'})
                        },
                        chartDetail: {
                            title: 'AST TROPOMI ',
                            unit: "molecules/cm <sup>2</sup>",
                            SeriesName: "value",
                            Product: 'NO<sub>2</sub>',
                            Source: 'TROPOMI-SERVIR AST'
                        },
                    }
                }
            }
        ],
    },
    {
        label: 'CO',
        value: 5,
        children: [
            // {
            //     label: 'Satellite-CO (TROPOMI-GEE)',
            //     layerId: myApp.constants.archive.layerId.CO_TROPOMI,
            //     value: 51,
            //     stationData: false,
            //     layerProperties: {
            //         initilize: false,
            //         catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/CO/TROPOMI-CO/catalog.xml',
            //         useSLD: false,
            //         isTimeDimensionLayer: true,
            //         getStartDate: function () {
            //             return myApp.formatDate(myApp.startDate);
            //         },
            //         getEndDate: function () {
            //             return myApp.formatDate(myApp.endDate);
            //         },
            //         VisibleDivBind: false,
            //         threddLayerProp: {
            //             id: myApp.constants.archive.layerId.CO_TROPOMI,
            //             title: 'TROPOMI CO (GEE)',
            //             visible: false,
            //             opacity: 0.6,
            //             ThreddsDataServerVersion: 5,
            //             serverType: 'TDS',
            //             timeSeries: false,
            //             alignTimeSlider: 'right',
            //             timeSliderSize: 'small',
            //             showlegend: false,
            //             showControlPanel: true,
            //             source: {
            //                 url: [],
            //                 params: {
            //                     'LAYERS': 'CO',
            //                     'STYLES': 'default-scalar/x-Rainbow',
            //                     'COLORSCALERANGE': '1,4',
            //                     'transparent': true
            //                 }
            //             },
            //             unit: 'molecules / sq.cm',
            //             mask: DefaultMaskWMS,
            //             CropOrMask: 'crop',
            //             changeWMSProxy: true,
            //             filterCoodrdinate: filterCoodrdinate,
            //             aoi: true,
            //             zIndex: 19,
            //             api: {
            //                 createGIF: myApp.APICollection.api.CreateGIFImage,
            //                 GetImage: myApp.APICollection.api.GetImage,
            //                 TimeZone: ' UTC'
            //             },
            //             plotInfo: function () {
            //                 return Object.assign(DefaultPlotInfo, {
            //                     title: 'TROPOMI CO($10^{18}$ molecules/$cm^{2}$)',
            //                     TimeZone: ' UTC'
            //                 })
            //             }, chartDetail: {
            //                 title: 'TROPOMI-GEE',
            //                 unit: "10<sup>18</sup> molecules/cm<sup>2</sup>",
            //                 SeriesName: "value",
            //                 Product: 'CO',
            //                 Source: 'TROPOMI-GEE'
            //             },
            //         }
            //     }
            // },
            {
                label: 'Reanalysis-CO (GEOS)',
                layerId: myApp.constants.archive.layerId.CO_GEOS,
                value: 52,
                stationData: false,
                layerProperties: {
                    initilize: false,
                    catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/CO/GEOS-CO/catalog.xml',
                    useSLD: false,
                    isTimeDimensionLayer: true,
                    getStartDate: function () {
                        return myApp.formatDate(myApp.startDate);
                    },
                    getEndDate: function () {
                        return myApp.formatDate(myApp.endDate);
                    },
                    VisibleDivBind: false,
                    threddLayerProp: {
                        id: myApp.constants.archive.layerId.CO_GEOS,
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
                        showAnimationButton: true,
                        animationPlot: {
                            title_text: "GEOS Reanalysis CO (ppb)",
                            bbox: [60, 15, 100, 38],
                            resolution: 400,
                            positionLegend: [0.85, 0.105, 0.0975, 0.78]
                        },
                        source: {
                            url: [],
                            params: {
                                'LAYERS': 'CO',
                                'STYLES': 'default-scalar/x-Rainbow',
                                'COLORSCALERANGE': '0,1000',
                                'transparent': true
                            }
                        },
                        unit: 'ppb',
                        mask: DefaultMaskWMS,
                        CropOrMask: 'crop',
                        changeWMSProxy: true,
                        filterCoodrdinate: filterCoodrdinate,
                        aoi: true,
                        zIndex: 20,
                        api: {
                            createGIF: myApp.APICollection.api.CreateGIFImage,
                            GetImage: myApp.APICollection.api.GetImage,
                            TimeZone: ' UTC'
                        },
                        plotInfo: function () {
                            return Object.assign(DefaultPlotInfo, {title: 'GEOS CO(ppb)'})
                        }, chartDetail: {
                            title: 'GEOS',
                            unit: "ppb",
                            SeriesName: "value",
                            Product: 'CO',
                            Source: 'GEOS'
                        },
                    }
                }
            },
            {
                label: 'Satellite-CO (TROPOMI-SERVIR AST)',
                layerId: myApp.constants.archive.layerId.CO_TROPOMI_SERVIR,
                value: 53,
                stationData: false,
                layerProperties: {
                    initilize: false,
                    catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/CO/AST-HKH-CO/catalog.xml',
                    useSLD: false,
                    isTimeDimensionLayer: true,
                    getStartDate: function () {
                        return myApp.formatDate(myApp.startDate);
                    },
                    getEndDate: function () {
                        return myApp.formatDate(myApp.endDate);
                    },
                    VisibleDivBind: false,
                    threddLayerProp: {
                        id: myApp.constants.archive.layerId.CO_TROPOMI_SERVIR,
                        title: 'TROPOMI CO (SERVIR AST)',
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
                                'LAYERS': 'vertical_column',
                                'STYLES': 'default-scalar/x-Rainbow',
                                'COLORSCALERANGE': '1,5',
                                'transparent': true
                            }
                        },
                        unit: 'molecules / sq.cm',
                        mask: DefaultMaskWMS,
                        CropOrMask: 'crop',
                        changeWMSProxy: true,
                        filterCoodrdinate: filterCoodrdinate,
                        aoi: true,
                        zIndex: 19,
                        api: {
                            createGIF: myApp.APICollection.api.CreateGIFImage,
                            GetImage: myApp.APICollection.api.GetImage,
                            TimeZone: ' UTC'
                        },
                        plotInfo: function () {
                            return Object.assign(DefaultPlotInfo, {
                                title: 'TROPOMI CO($10^{18}$ molecules/$cm^{2}$)',
                                TimeZone: ' UTC'
                            })
                        }, chartDetail: {
                            title: 'TROPOMI-SERVIR AST',
                            unit: "10<sup>18</sup> molecules/cm<sup>2</sup>",
                            SeriesName: "value",
                            Product: 'CO',
                            Source: 'TROPOMI-SERVIR AST'
                        },
                    }
                }
            },
        ]
    }
];


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
                    color: plotColor
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
        }
    ;
    return data
};


myApp.datetimeChartObj = function (title, subTitle, SeriesData, SeriesName, YaxisLabel, XaxisLabel, plotColor, DataPeriod) {
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
            // marker: {
            //     enabled: true,
            //     symbol: 'diamond',
            //     radius: 3
            // },
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
            noData: DataPeriod + 'data not available for this station.'
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