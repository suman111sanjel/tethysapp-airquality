import {DefaultMaskWMS, TethysAPIAppName} from "../config";
import {Action} from "../store/actionType";
import {getURLParameters} from './helpers';

var myApp = {};
// First need to initilize
var filterCoodrdinate = {};


myApp.endDate = new Date();
myApp.endDate.setDate(myApp.endDate.getDate() - 1);

myApp.startDate = new Date();
myApp.startDate.setDate(myApp.endDate.getDate() - 9);

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
    RGBProducts: {
        layerId: {
            TerraModisTrueColor: 'RGBProducts__TerraModisTrueColor',
            dlcRGB: 'dlcRGB__gk2a_ami',
            dustRGB: 'dustRGB__gk2a_ami',
            fireRGB: 'fireRGB__gk2a_ami',
            ntmicroRGB: 'ntmicroRGB__gk2a_ami',
            truecolorRGB: 'truecolorRGB__gk2a_ami',
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
    ends_with: '.nc',
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
        id: myApp.constants.RGBProducts.layerId.TerraModisTrueColor,
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

myApp.AMIRGBProduct = [
    {
        catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/RGBAMI/dlcRGB/catalog.xml',
        useSLD: true,
        ends_with: '.ncml',
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
            id: myApp.constants.RGBProducts.layerId.dlcRGB,
            title: 'GK2A AMI Day Land Cloud RGB',
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
            animationPlot: {title_text: 'GK2A AMI Day Land Cloud RGB', bbox: [60, 15, 100, 38], resolution: 400},
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
    {
        catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/RGBAMI/dustRGB/catalog.xml',
        useSLD: true,
        ends_with: '.ncml',
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
            id: myApp.constants.RGBProducts.layerId.dustRGB,
            title: 'GK2A AMI Dust RGB',
            visible: true,
            opacity: 0.5,
            legendPath: Action.Base + '/' + Action.legendAMIDustRGB,
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
            animationPlot: {title_text: 'GK2A AMI Dust RGB', bbox: [60, 15, 100, 38], resolution: 400},
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
    {
        catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/RGBAMI/fireRGB/catalog.xml',
        useSLD: true,
        ends_with: '.ncml',
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
            id: myApp.constants.RGBProducts.layerId.fireRGB,
            title: 'GK2A AMI Natural Color Fire RGB',
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
            animationPlot: {title_text: 'GK2A AMI Natural Color Fire RGB', bbox: [60, 15, 100, 38], resolution: 400},
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
    {
        catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/RGBAMI/ntmicroRGB/catalog.xml',
        useSLD: true,
        ends_with: '.ncml',
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
            id: myApp.constants.RGBProducts.layerId.ntmicroRGB,
            title: 'GK2A AMI Nighttime Microphysics RGB',
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
            animationPlot: {title_text: 'GK2A AMI Nighttime Microphysics RGB', bbox: [60, 15, 100, 38], resolution: 400},
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
    {
        catalog: 'catalog/HKHAirQualityWatch/RecentAndArchive/RGBAMI/truecolorRGB/catalog.xml',
        useSLD: true,
        ends_with: '.ncml',
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
            id: myApp.constants.RGBProducts.layerId.truecolorRGB,
            title: 'GK2A AMI Truecolor RGB',
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
            animationPlot: {title_text: 'GK2A AMI Truecolor RGB', bbox: [60, 15, 100, 38], resolution: 400},
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
    },]


myApp.DefaultSations = {
    aeronetAOD: [2, 5, 3, 6],
    pm2p5Embassy: [6, 7, 6, 7],
    o3Embassy: [6, 7, 6, 7],
    NepalStation: [57, 11, 15, 71]
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