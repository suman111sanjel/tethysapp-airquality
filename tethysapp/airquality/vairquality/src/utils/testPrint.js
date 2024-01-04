// The map
import {DefaultMaskWMS, DefaultPlotInfo} from "../config";

var map = new ol.Map({
  target: 'map',
  view: new ol.View ({
    zoom: 5,
    center: [266812, 5960201]
  }),
  controls: ol.control.defaults({ "attribution": false }),
  layers: [
    new ol.layer.Tile({ title:'Waterolor', visible: false, source: new ol.source.Stamen({ layer: 'watercolor' }) }),
    new ol.layer.Tile({ title:'Labels', visible: false, source: new ol.source.Stamen({ layer: 'toner-labels' }) }),
    new ol.layer.Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' })
  ]
});
map.addControl(new ol.control.LayerSwitcher());
map.addControl(new ol.control.CanvasAttribution({ canvas: true }));
// Add a title control
map.addControl(new ol.control.CanvasTitle({
  title: 'my title',
  visible: false,
  style: new ol.style.Style({ text: new ol.style.Text({ font: '20px "Lucida Grande",Verdana,Geneva,Lucida,Arial,Helvetica,sans-serif'}) })
}));

// Legend
var legend = new ol.legend.Legend({
  title: 'Legend',
  margin: 5,
  items: [{
    title: 'Church',
    typeGeom: 'Point',
    style: new ol.style.Style({
      image: new ol.style.Icon({
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Eglise_icone_2.svg/30px-Eglise_icone_2.svg.png',
      crossOrigin: 'anonymous' // Enable print
    })})
  }, {
    title: 'Photo',
    typeGeom: 'Point',
    style: new ol.style.Style({
      image: new ol.style.Icon({
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Icone_appareil_photo.svg/30px-Icone_appareil_photo.svg.png',
      crossOrigin: 'anonymous' // Enable print
    })})
  }, {
    title: 'Line', typeGeom: 'LineString', style: ol.style.Style.defaultStyle()
  }, {
    title: 'Polygon', typeGeom: 'Polygon', style: ol.style.Style.defaultStyle()
  }]

});

// Add a legend to the print
var legendCtrl = new ol.control.Legend({ legend: legend });
map.addControl(legendCtrl);

// Add a ScaleLine control
map.addControl(new ol.control.CanvasScaleLine());

// Print control
var printControl = new ol.control.PrintDialog();
printControl.setSize('A4');
map.addControl(printControl);

/* On print > save image file */
printControl.on(['print', 'error'], function(e) {
  // Print success
  if (e.image) {
    if (e.pdf) {
      // Export pdf using the print info
      var pdf = new jsPDF({
        orientation: e.print.orientation,
        unit: e.print.unit,
        format: e.print.size
      });
      pdf.addImage(e.image, 'JPEG', e.print.position[0], e.print.position[0], e.print.imageWidth, e.print.imageHeight);
      pdf.save(e.print.legend ? 'legend.pdf' : 'map.pdf');
    } else  {
      // Save image as file
      e.canvas.toBlob(function(blob) {
        var name = (e.print.legend ? 'legend.' : 'map.')+e.imageType.replace('image/','');
        saveAs(blob, name);
      }, e.imageType, e.quality);
    }
  } else {
    console.warn('No canvas to export');
  }
});





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
                label: 'Model-PM2.5 (GEOS)',
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
                            Source: 'GEOS'
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
                label: 'Model-O3 (GEOS)',
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
            {
                label: 'Satellite-SO2 (TROPOMI-GEE)',
                layerId: myApp.constants.archive.layerId.SO2_TROPOMI,
                value: 31,
                stationData: false,
                layerProperties: {
                    initilize: false,
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
                        title: 'TROPOMI SO2 (TROPOMI-GEE)',
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
                            unit: "10<sup>17</sup> molecules/cm<sup>2</sup>",
                            SeriesName: "value",
                            Product: 'SO<sub>2</sub>',
                            Source: 'TROPOMI-GEE'
                        },
                    }
                }
            },
            {
                label: 'Model-SO2 (GEOS)',
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
            {
                label: 'Satellite-NO2 (TROPOMI-GEE)',
                layerId: myApp.constants.archive.layerId.NO2_TROPOMI,
                value: 41,
                stationData: false,
                layerProperties: {
                    initilize: false,
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
                        title: 'TROPOMI NO2 (GEE)',
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
                            unit: "10<sup>15</sup> molecules/cm<sup>2</sup>",
                            SeriesName: "value",
                            Product: 'NO<sub>2</sub>',
                            Source: 'TROPOMI-GEE'
                        },
                    }
                }
            },
            {
                label: 'Model-NO2 (GEOS)',
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
            {
                label: 'Satellite-CO (TROPOMI-GEE)',
                layerId: myApp.constants.archive.layerId.CO_TROPOMI,
                value: 51,
                stationData: false,
                layerProperties: {
                    initilize: false,
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
                        title: 'TROPOMI CO (GEE)',
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
                            title: 'TROPOMI-GEE',
                            unit: "10<sup>18</sup> molecules/cm<sup>2</sup>",
                            SeriesName: "value",
                            Product: 'CO',
                            Source: 'TROPOMI-GEE'
                        },
                    }
                }
            },
            {
                label: 'Model-CO (GEOS)',
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

