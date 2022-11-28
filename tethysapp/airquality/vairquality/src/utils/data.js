import Style from "ol/style/Style";
import RegularShape from "ol/style/RegularShape";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Text from "ol/style/Text";
import {TethysAppName, DefaultMaskWMS, DefaultPlotInfo, TethysAPIAppName} from "../config";


var myApp = {};
// First need to initilize
var filterCoodrdinate = {};


myApp.startDate = new Date();
myApp.startDate.setDate(myApp.startDate.getDate() - 1);
myApp.endDate = new Date();

myApp.startDateArchive = new Date();
myApp.startDateArchive.setDate(myApp.startDateArchive.getDate() - 1);
myApp.endDateArchive = new Date();

myApp.forecastDate = new Date();
myApp.forecastDate.setDate(myApp.forecastDate.getDate() - 1);

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
    recent: {
        layerId: {
            TerraModisTrueColor: 'Recent__TerraModisTrueColor',
            PM_AeronetAOD: 'Recent__aeronet',
            PM_usembassy: 'Recent__usembassy',
            GEOS_PM2p5: 'Recent__GEOS_PM2p5',
            TerraModisAOD: 'Recent__TerraModisAOD',
            O3_GEOS: 'Recent__GEOS_O3',
            O3_usembassy: 'Recent__usembassy_O3',
            SO2_GEOS: 'Recent__GEOS_SO2',
            NO2_GEOS: 'Recent__GEOS_NO2',
            CO_GEOS: 'Recent__GEOS_CO',
        }
    },
    archive: {
        layerId: {
            TerraModisTrueColor: 'Archive__TerraModisTrueColor',
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
            CO_GEOS: 'Archive__GEOS_CO',
        }
    },
    forecast: {
        layerId: {
            GEOS_PM2p5: 'Forecast__GEOS_PM2p5',
            O3_GEOS: 'Forecast__GEOS_O3',
            SO2_GEOS: 'Forecast__GEOS_SO2',
            NO2_GEOS: 'Forecast__GEOS_NO2',
            CO_GEOS: 'Forecast__GEOS_CO'
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

myApp.LayerCollectionObjet = {
    Recent: {
        data: [
            {
                catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/TerraMODIS-TrueColor1km/catalog.xml',
                useSLD: true,
                isTimeDimensionLayer: true,
                SLD: `<?xml version="1.0" encoding="ISO-8859-1"?>
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
`,
                getStartDate: function () {
                    return myApp.formatDate(myApp.startDate)
                },
                getEndDate: function () {
                    return myApp.formatDate(myApp.startDate)
                },
                VisibleDivBind: false,
                threddLayerProp: {
                    id: myApp.constants.recent.layerId.TerraModisTrueColor,
                    title: 'TerraModis-TrueColor (' + myApp.formatDate(myApp.startDate) + ')',
                    visible: true,
                    opacity: 0.5,
                    legendPath: '/static/' + TethysAppName + '/images/rgbLegend.png',
                    ThreddsDataServerVersion: 5,
                    serverType: 'TDS',
                    timeSeries: false,
                    alignTimeSlider: 'left',
                    timeSliderSize: 'small',
                    showlegend: false,
                    showControlPanel: false,
                    zIndex: 10,
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
            },
        ]
    },
    Archive: {
        data: [
            {
                catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/TerraMODIS-TrueColor1km/catalog.xml',
                useSLD: true,
                isTimeDimensionLayer: true,
                SLD: `<?xml version="1.0" encoding="ISO-8859-1"?>
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
`,
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
                    visible: true,
                    opacity: 0.5,
                    legendPath: '/static/' + TethysAppName + '/images/rgbLegend.png',
                    ThreddsDataServerVersion: 5,
                    serverType: 'TDS',
                    timeSeries: false,
                    alignTimeSlider: 'left',
                    timeSliderSize: 'small',
                    showlegend: false,
                    showControlPanel: true,
                    zIndex: 10,
                    filterCoodrdinate: filterCoodrdinate,
                    RGBComposite: true,
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
            }, {
                catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/PM/GEOS-PM2p5/catalog.xml',
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
                    alignTimeSlider: 'left',
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
                    }, chartDetail: {title: 'GEOS', unit: 'PM<sub>2.5</sub>(µg/m<sup>3</sup>)', SeriesName: "value"},
                }
            }, {
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
                    alignTimeSlider: 'left',
                    timeSliderSize: 'small',
                    showlegend: false,
                    showControlPanel: true,
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
                    }, chartDetail: {title: 'TerraModis-AOD', unit: "AOD", SeriesName: "value"},
                }
            }


            , {
                catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/O3/TROPOMI-O3/catalog.xml',
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
                    id: myApp.constants.archive.layerId.O3_TROPOMI,
                    title: 'TROPOMI O3',
                    visible: false,
                    opacity: 0.6,
                    ThreddsDataServerVersion: 5,
                    serverType: 'TDS',
                    timeSeries: false,
                    alignTimeSlider: 'left',
                    timeSliderSize: 'small',
                    showlegend: false,
                    showControlPanel: true,
                    source: {
                        url: [],
                        params: {
                            'LAYERS': 'O3',
                            'STYLES': 'default-scalar/x-Rainbow',
                            'COLORSCALERANGE': '0,1',
                            'transparent': true
                        }
                    },
                    unit: '',
                    mask: DefaultMaskWMS,
                    CropOrMask: 'crop',
                    changeWMSProxy: true,
                    filterCoodrdinate: filterCoodrdinate,
                    aoi: true,
                    zIndex: 13,
                    api: {
                        createGIF: myApp.APICollection.api.CreateGIFImage,
                        GetImage: myApp.APICollection.api.GetImage,
                        TimeZone: ' UTC'
                    },
                    plotInfo: function () {
                        return Object.assign(DefaultPlotInfo, {
                            title: 'TROPOMI $O_{3}$($10^{19}$ molecules/$cm^{2}$)',
                            TimeZone: ' UTC'
                        })
                    }, chartDetail: {
                        title: 'TROPOMI',
                        unit: "O<sub>3</sub> (10<sup>19</sup> molecules/cm<sup>2</sup>)",
                        SeriesName: "value"
                    },
                }
            }, {
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
                    alignTimeSlider: 'left',
                    timeSliderSize: 'small',
                    showlegend: false,
                    showControlPanel: true,
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
                    }, chartDetail: {title: 'GEOS', unit: " O<sub>3</sub> (ppb)", SeriesName: "value"},
                }
            },
            {
                catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/SO2/TROPOMI-SO2/catalog.xml',
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
                    id: myApp.constants.archive.layerId.SO2_TROPOMI,
                    title: 'TROPOMI SO2',
                    visible: false,
                    opacity: 0.6,
                    ThreddsDataServerVersion: 5,
                    serverType: 'TDS',
                    timeSeries: false,
                    alignTimeSlider: 'left',
                    timeSliderSize: 'small',
                    showlegend: false,
                    showControlPanel: true,
                    source: {
                        url: [],
                        params: {
                            'LAYERS': 'SO2',
                            'STYLES': 'default-scalar/x-Rainbow',
                            'COLORSCALERANGE': '0,1',
                            'transparent': true
                        }
                    },
                    unit: 'molecules / sq.cm',
                    mask: DefaultMaskWMS,
                    CropOrMask: 'crop',
                    changeWMSProxy: true,
                    filterCoodrdinate: filterCoodrdinate,
                    aoi: true,
                    zIndex: 15,
                    api: {
                        createGIF: myApp.APICollection.api.CreateGIFImage,
                        GetImage: myApp.APICollection.api.GetImage,
                        TimeZone: ' UTC'
                    },
                    plotInfo: function () {
                        return Object.assign(DefaultPlotInfo, {
                            title: 'TROPOMI $SO_{2}$($10^{17}$ molecules/$cm^{2}$)',
                            TimeZone: ' UTC'
                        })
                    }, chartDetail: {
                        title: 'TROPOMI',
                        unit: "SO<sub>2</sub> (10<sup>17</sup> molecules/cm<sup>2</sup>)",
                        SeriesName: "value"
                    },
                }
            }, {
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
                    alignTimeSlider: 'left',
                    timeSliderSize: 'small',
                    showlegend: false,
                    showControlPanel: true,
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
                    }, chartDetail: {title: 'GEOS', unit: "SO<sub>2</sub> (ppb)", SeriesName: "value"},
                }
            },
            {
                catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/NO2/TROPOMI-NO2/catalog.xml',
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
                    id: myApp.constants.archive.layerId.NO2_TROPOMI,
                    title: 'TROPOMI NO2',
                    visible: false,
                    opacity: 0.6,
                    ThreddsDataServerVersion: 5,
                    serverType: 'TDS',
                    timeSeries: false,
                    alignTimeSlider: 'left',
                    timeSliderSize: 'small',
                    showlegend: false,
                    showControlPanel: true,
                    source: {
                        url: [],
                        params: {
                            'LAYERS': 'NO2',
                            'STYLES': 'default-scalar/x-Rainbow',
                            'COLORSCALERANGE': '0,10',
                            'transparent': true
                        }
                    },
                    unit: 'molecules / sq.cm',
                    mask: DefaultMaskWMS,
                    CropOrMask: 'crop',
                    changeWMSProxy: true,
                    filterCoodrdinate: filterCoodrdinate,
                    aoi: true,
                    zIndex: 17,
                    api: {
                        createGIF: myApp.APICollection.api.CreateGIFImage,
                        GetImage: myApp.APICollection.api.GetImage,
                        TimeZone: ' UTC'
                    },
                    plotInfo: function () {
                        return Object.assign(DefaultPlotInfo, {
                            title: 'TROPOMI $NO_{2}$($10^{15}$ molecules/$cm^{2}$)',
                            TimeZone: ' UTC'
                        })
                    },
                    chartDetail: {
                        title: 'TROPOMI',
                        unit: "NO<sub>2</sub> (10<sup>15</sup> molecules/cm<sup>2</sup>)",
                        SeriesName: "value"
                    },
                }
            }, {
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
                    title: 'GEOS NO2',
                    visible: false,
                    opacity: 0.6,
                    ThreddsDataServerVersion: 5,
                    serverType: 'TDS',
                    timeSeries: false,
                    alignTimeSlider: 'left',
                    timeSliderSize: 'small',
                    showlegend: false,
                    showControlPanel: true,
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
                    }, chartDetail: {title: 'GEOS', unit: "NO<sub>2</sub> (ppb)", SeriesName: "value"},
                }
            },

            {
                catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/CO/TROPOMI-CO/catalog.xml',
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
                    id: myApp.constants.archive.layerId.CO_TROPOMI,
                    title: 'TROPOMI CO',
                    visible: false,
                    opacity: 0.6,
                    ThreddsDataServerVersion: 5,
                    serverType: 'TDS',
                    timeSeries: false,
                    alignTimeSlider: 'left',
                    timeSliderSize: 'small',
                    showlegend: false,
                    showControlPanel: true,
                    source: {
                        url: [],
                        params: {
                            'LAYERS': 'CO',
                            'STYLES': 'default-scalar/x-Rainbow',
                            'COLORSCALERANGE': '1,4',
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
                        title: 'TROPOMI',
                        unit: "CO (10<sup>18</sup> molecules/cm<sup>2</sup>)",
                        SeriesName: "value"
                    },
                }
            }, {
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
                    alignTimeSlider: 'left',
                    timeSliderSize: 'small',
                    showlegend: false,
                    showControlPanel: true,
                    source: {
                        url: [],
                        params: {
                            'LAYERS': 'CO',
                            'STYLES': 'default-scalar/x-Rainbow',
                            'COLORSCALERANGE': '0,500',
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
                    }, chartDetail: {title: 'GEOS', unit: "CO (ppb)", SeriesName: "value"},
                }
            },]
    },
    Forecast: {
        data: [
            {
                catalog: 'catalog/HKHAirQualityWatch/Forecast/PM/GEOS-PM2p5/catalog.xml',
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
                    alignTimeSlider: 'left',
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
                        return Object.assign(DefaultPlotInfo, {title: 'GEOS $PM_{2.5}$(µg/$m^{3}$)', TimeZone: ' UTC'})
                    },
                    chartDetail: {title: 'GEOS', unit: 'PM<sub>2.5</sub>(µg/m<sup>3</sup>)', SeriesName: "value"},
                }
            }, {
                catalog: 'catalog/HKHAirQualityWatch/Forecast/CO/GEOS-CO/catalog.xml',
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
                    alignTimeSlider: 'left',
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
                    chartDetail: {title: 'GEOS', unit: "CO (ppb)", SeriesName: "value"},

                }
            }, {
                catalog: 'catalog/HKHAirQualityWatch/Forecast/NO2/GEOS-NO2/catalog.xml',
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
                    alignTimeSlider: 'left',
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
                    chartDetail: {title: 'GEOS', unit: "NO<sub>2</sub> (ppb)", SeriesName: "value"},
                }
            }, {
                catalog: 'catalog/HKHAirQualityWatch/Forecast/O3/GEOS-O3/catalog.xml',
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
                    alignTimeSlider: 'left',
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
                    chartDetail: {title: 'GEOS', unit: " O<sub>3</sub> (ppb)", SeriesName: "value"},
                }
            }, {
                catalog: 'catalog/HKHAirQualityWatch/Forecast/SO2/GEOS-SO2/catalog.xml',
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
                    alignTimeSlider: 'left',
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
                    chartDetail: {title: 'GEOS', unit: "SO<sub>2</sub> (ppb)", SeriesName: "value"},
                }
            }
        ]
    }
};

myApp.DefaultSations = {
    aeronetAOD: [9, 14, 9, 14],
    pm2p5Embassy: [6, 7, 6, 7],
    o3Embassy: [6, 7, 6, 7]
}

myApp.cascaderObject = {
    Recent: {
        data: [
            {
                label: 'PM',
                value: 1,
                children: [
                    {
                        label: 'Surface Observation-AOD (AERONET)',
                        value: 11,
                        layerId: myApp.constants.recent.layerId.PM_AeronetAOD,
                        otherval: "test",
                        stationData: true,
                        styleFunction: myApp.AeronetAODStyleFun,
                        NotificationWhenAdded: "Please Select AERONET AOD Station on map",
                        ModelClass: 'AeronetAod',
                        ModelClassDataList: 'AeronetDataList',
                        typeName: 'aod',
                        defaultStation: myApp.DefaultSations.aeronetAOD,
                        chart: {
                            title: function (stationName, sd) {
                                return 'AERONET AOD at ' + stationName + ' (' + sd + ')';
                            },
                            subTitle: 'AERONET level 1.5 data measured at 500nm',
                            SeriesName: 'SeriesName',
                            YaxisLabel: 'AOD (500nm)',
                            XaxisLabel: function () {
                                return 'Time (UTC)'
                            },
                            plotType: 'point'
                        }
                    },
                    {
                        label: 'Ground Observation-PM2.5',
                        layerId: myApp.constants.recent.layerId.PM_usembassy,
                        value: 12,
                        stationData: true,
                        styleFunction: myApp.USEmbassyPM25StyleFun,
                        NotificationWhenAdded: "Please Select US Embassy 2.5 Station on map",
                        ModelClass: 'UsEmbassyPm',
                        ModelClassDataList: 'UsEmbassyDataList',
                        typeName: 'pm',
                        defaultStation: myApp.DefaultSations.pm2p5Embassy,
                        chart: {
                            title: function (stationName, sd) {
                                return stationName + ' (' + sd + ')'
                            },
                            subTitle: 'source: AirNow',
                            SeriesName: 'PM2.5',
                            YaxisLabel: 'PM<sub>2.5</sub>(μg/m<sup>3</sup>)',
                            XaxisLabel: function () {
                                return 'Time (UTC)'
                            }
                        }
                    },
                ]
            }, {
                label: 'O3',
                value: 2,
                children: [
                    {
                        label: 'Surface Observation-O3',
                        layerId: myApp.constants.recent.layerId.O3_usembassy,
                        value: 23,
                        stationData: true,
                        styleFunction: myApp.USEmbassyO3StyleFun,
                        NotificationWhenAdded: "Please Select US Embassy O3 Station on map",
                        ModelClass: 'UsEmbassyPm',
                        ModelClassDataList: 'UsEmbassyDataList',
                        typeName: 'O3',
                        defaultStation: myApp.DefaultSations.o3Embassy,
                        chart: {
                            title: function (stationName, sd) {
                                return stationName + ' (' + sd + ')'
                            },
                            subTitle: 'source: AirNow',
                            SeriesName: 'O3',
                            YaxisLabel: 'O<sub>3</sub>(ppb)',
                            XaxisLabel: function () {
                                return 'Time (UTC)'
                            }
                        }
                    },
                ]
            }]
    },
    Archive: {
        data: [
            {
                label: 'PM',
                value: 1,
                children: [
                    {
                        label: 'Surface Observation-AOD (AERONET)',
                        value: 11,
                        layerId: myApp.constants.archive.layerId.PM_AeronetAOD,
                        stationData: true,
                        styleFunction: myApp.AeronetAODStyleFun,
                        NotificationWhenAdded: "Please Select AERONET AOD Station on map",
                        ModelClass: 'AeronetAod',
                        ModelClassDataList: 'AeronetDataList',
                        typeName: 'aod',
                        defaultStation: myApp.DefaultSations.aeronetAOD,
                        chart: {
                            title: function (stationName, sd, ed) {
                                return `${stationName} (${sd} - ${ed})`
                            },
                            subTitle: 'AERONET level 1.5 data measured at 500nm',
                            SeriesName: 'SeriesName',
                            YaxisLabel: 'AOD',
                            XaxisLabel: function () {
                                return 'Time (UTC)'
                            },
                            plotType: 'point'
                        }
                    },
                    {
                        label: 'Ground Observation-PM2.5',
                        layerId: myApp.constants.archive.layerId.PM_usembassy,
                        value: 12,
                        stationData: true,
                        styleFunction: myApp.USEmbassyPM25StyleFun,
                        NotificationWhenAdded: "Please Select US Embassy 2.5 Station on map",
                        ModelClass: 'UsEmbassyPm',
                        ModelClassDataList: 'UsEmbassyDataList',
                        typeName: 'pm',
                        defaultStation: myApp.DefaultSations.pm2p5Embassy,
                        chart: {
                            title: function (stationName, sd, ed) {
                                return `${stationName} (${sd} - ${ed})`
                            },
                            subTitle: 'source: AirNow',
                            SeriesName: 'PM2.5',
                            YaxisLabel: 'PM<sub>2.5</sub>(μg/m<sup>3</sup>)',
                            XaxisLabel: function () {
                                return 'Time (UTC)'
                            }
                        }
                    },
                    {
                        label: 'Model-PM2.5 (GEOS)',
                        layerId: myApp.constants.archive.layerId.GEOS_PM2p5,
                        value: 13,
                    },
                    {
                        label: 'Satellite-AOD (Terra-MODIS)',
                        layerId: myApp.constants.archive.layerId.TerraModisAOD,
                        value: 14,
                    }
                ]
            }, {
                label: 'O3',
                value: 2,
                children: [
                    // {
                    //     label: 'Satellite-O3 (TROPOMI)',
                    //     layerId: myApp.constants.archive.layerId.O3_TROPOMI,
                    //     value: 21,
                    // },
                    {
                        label: 'Model-O3 (GEOS)',
                        layerId: myApp.constants.archive.layerId.O3_GEOS,
                        value: 22,
                    }, {
                        label: 'Surface Observation-O3',
                        layerId: myApp.constants.archive.layerId.O3_usembassy,
                        value: 23,
                        stationData: true,
                        styleFunction: myApp.USEmbassyO3StyleFun,
                        NotificationWhenAdded: "Please Select US Embassy O3 Station on map",
                        ModelClass: 'UsEmbassyPm',
                        ModelClassDataList: 'UsEmbassyDataList',
                        typeName: 'O3',
                        defaultStation: myApp.DefaultSations.o3Embassy,
                        chart: {
                            title: function (stationName, sd, ed) {
                                return `${stationName} (${sd} - ${ed})`
                            },
                            subTitle: 'source: AirNow',
                            SeriesName: 'O3',
                            YaxisLabel: 'O<sub>3</sub>(ppb)',
                            XaxisLabel: function () {
                                return 'Time (UTC)'
                            }
                        }
                    },
                ]
            },
            {
                label: 'SO2',
                value: 3,
                children: [
                    {
                        label: 'Satellite-SO2 (TROPOMI)',
                        layerId: myApp.constants.archive.layerId.SO2_TROPOMI,
                        value: 31,
                    },
                    {
                        label: 'Model-SO2 (GEOS)',
                        layerId: myApp.constants.archive.layerId.SO2_GEOS,
                        value: 32,
                    }
                ]
            },
            {
                label: 'NO2',
                value: 4,
                children: [
                    {
                        label: 'Satellite-NO2 (TROPOMI)',
                        layerId: myApp.constants.archive.layerId.NO2_TROPOMI,
                        value: 41,
                    },
                    {
                        label: 'Model-NO2 (GEOS)',
                        layerId: myApp.constants.archive.layerId.NO2_GEOS,
                        value: 42,
                    }
                ]
            },
            {
                label: 'CO',
                value: 5,
                children: [
                    {
                        label: 'Satellite-CO (TROPOMI)',
                        layerId: myApp.constants.archive.layerId.CO_TROPOMI,
                        value: 51,
                    },
                    {
                        label: 'Model-CO (GEOS)',
                        layerId: myApp.constants.archive.layerId.CO_GEOS,
                        value: 52,
                    }
                ]
            }]
    },
    Forecast: {
        data: [
            {
                label: 'PM',
                value: 1,
                children: [
                    {
                        label: 'Model-PM2.5 (GEOS)',
                        layerId: myApp.constants.forecast.layerId.GEOS_PM2p5,
                        value: 13,
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
                    }
                ]
            }]
    }
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