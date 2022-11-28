import {DefaultMaskWMS, TethysAPIAppName} from "../config";
// import {Icon} from "ol/style";
import {Action} from "../store/actionType";
import {getURLParameters} from "./helpers";


var myApp = {};
// First need to initilize


myApp.startDate = new Date();
myApp.startDate.setDate(myApp.startDate.getDate() - 1);
myApp.endDate = new Date();


let recentDate = getURLParameters()['date'];
if (recentDate) {
    if (recentDate.length == 8) {
        let checkInt = parseInt(recentDate);
        if (checkInt) {
            // Number with valid
            let YYYY = parseInt(recentDate.slice(0, 4));
            let MM_index = parseInt(recentDate.slice(4, 6)) - 1;
            let DD = parseInt(recentDate.slice(6, 8));
            let dObject = new Date(YYYY, MM_index, DD);
            myApp.startDate = dObject;
            myApp.endDate = new Date(YYYY, MM_index, DD);
            myApp.endDate.setDate(myApp.endDate.getDate() + 1);
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
            Nep_Gov_PM1:'Nep_Gov_PM1',
            Nep_Gov_PM10:'Nep_Gov_PM10',
            Nep_Gov_PM2p5:'Nep_Gov_PM2p5',
            Nep_Gov_tsp:'Nep_Gov_tsp',
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




myApp.formatDateWithHHMM = function (date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour =''+d.getHours(),
    minute = ''+d.getMinutes()

    if (month.length < 2)
        month = '0' + month;

    if (day.length < 2)
        day = '0' + day;

    if (hour.length<2)
        hour='0'+hour

    if(minute.length<2)
        minute='0'+minute

    return [year, month, day,hour,minute].join('-');
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
myApp.TrueColorImage = {
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
    VisibleDivBind: true,
    threddLayerProp: {
        id: myApp.constants.recent.layerId.TerraModisTrueColor,
        title: 'TerraModis-TrueColor (' + myApp.formatDate(myApp.startDate) + ')',
        visible: true,
        opacity: 0.5,
        legendPath: Action.Base + '/' + Action.trueColorLegendImage,
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
};

myApp.DefaultSations = {
    aeronetAOD: [2, 5, 3, 6],
    pm2p5Embassy: [6, 7, 6, 7],
    o3Embassy: [6, 7, 6, 7],
    NepalStation: [57,11,15,71]
};

myApp.cascaderObj = [
    {
        label: 'PM',
        value: 1,
        children: [
            {
                label: 'Surface Observation-AOD (AERONET)',
                value: 11,
                layerId: myApp.constants.recent.layerId.PM_AeronetAOD,
                stationData: true,
                ModelClass: 'AeronetAod',
                ModelClassDataList: 'AeronetDataList',
                typeName: 'aod',
                defaultStation: myApp.DefaultSations.aeronetAOD,
                chart: {
                    title: function (stationName) {
                        return stationName + ' (' + 'Last 24 hours' + ')';
                    },
                    subTitle: 'AERONET level 1.5 data measured at 500nm',
                    SeriesName: 'SeriesName',
                    YaxisLabel: 'AOD (500nm)',
                    XaxisLabel: function () {
                        return 'Time (UTC)'
                    },
                    plotType: 'point'
                },
                layerProperties: {
                    initilize: false,
                    id: myApp.constants.recent.layerId.PM_AeronetAOD,
                    title: 'Surface Observation-AOD (AERONET)',
                    visible: false,
                    opacity: 1,
                    zIndex: 5,
                    layer: 'AirQuality:aeronet_aod',
                },
            },
            {
                label: 'Ground Observation-PM2.5 (AirNow)',
                layerId: myApp.constants.recent.layerId.PM_usembassy,
                value: 12,
                stationData: true,
                ModelClass: 'UsEmbassyPm',
                ModelClassDataList: 'UsEmbassyDataList',
                typeName: 'pm',
                defaultStation: myApp.DefaultSations.pm2p5Embassy,
                chart: {
                    title: function (stationName) {
                        return stationName + ' (' + 'Last 24 hours' + ')';
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
                    id: myApp.constants.recent.layerId.PM_usembassy,
                    title: 'Ground Observation-PM2.5',
                    visible: false,
                    opacity: 1,
                    zIndex: 6,
                    layer: 'AirQuality:us_embassy_pm2p5',
                },
            },
        ]
    },
    // {
    //     label: 'O3',
    //     value: 2,
    //     children: [
    //         {
    //             label: 'Surface Observation-O3',
    //             layerId: myApp.constants.recent.layerId.O3_usembassy,
    //             value: 23,
    //             stationData: true,
    //             ModelClass: 'UsEmbassyPm',
    //             ModelClassDataList: 'UsEmbassyDataList',
    //             typeName: 'O3',
    //             defaultStation: myApp.DefaultSations.o3Embassy,
    //             chart: {
    //                 title: function (stationName) {
    //                     return stationName + ' (' + sd + ')';
    //                 },
    //                 subTitle: 'source: AirNow',
    //                 SeriesName: 'O3',
    //                 YaxisLabel: 'O<sub>3</sub>(ppb)',
    //                 XaxisLabel: function () {
    //                     return 'Time (UTC)'
    //                 }
    //             },
    //             layerProperties: {
    //                 initilize: false,
    //                 id: myApp.constants.recent.layerId.O3_usembassy,
    //                 title: 'Surface Observation-O3',
    //                 visible: false,
    //                 opacity: 1,
    //                 zIndex: 7,
    //                 layer: 'AirQuality:us_embassy_o3',
    //             },
    //         },
    //     ]
    // }
    ];


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


export var AirPollutionWatchApp = myApp;
