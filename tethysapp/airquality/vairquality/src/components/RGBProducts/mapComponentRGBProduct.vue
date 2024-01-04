<template>
  <div className="card-box full-height full-width about-div">
    <div id="map-container2" ref="LayerSelectorDropdown">
    </div>
    <!--    <div id="layerSwitcherDiv" class="ol-unselectable ol-control" @click="LayerSwitcherClick()">-->
    <!--      <button>-->
    <!--        <img src="@/assets/layers.svg" style="height: 20px;width: 20px;">-->
    <!--      </button>-->
    <!--    </div>-->

    <!--    <el-drawer-->
    <!--        title="Layers"-->
    <!--        v-model="drawer"-->
    <!--        custom-class="drawerCustomCSS"-->
    <!--        :append-to-body="drawerAppendToBody"-->
    <!--        :modal="false"-->
    <!--        :modal-class="'drawerForLayersList'"-->
    <!--    >-->
    <!--      <span>-->
    <!--        <div class="layerCollection"></div>-->
    <!--          </span>-->
    <!--    </el-drawer>-->
    <PrintMap></PrintMap>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
// import Control from "ol/control/Control"
// import OSM from "ol/source/OSM";
import XYZ from 'ol/source/XYZ';
// import {Image as ImageLayer, Tile as TileLayer} from 'ol/layer';
import {Tile as TileLayer} from 'ol/layer';
// import TileWMS from "ol/source/TileWMS";
// import ImageWMS from 'ol/source/ImageWMS';
import View from "ol/View";
// import {dataSelect} from "../utils/data";
// import eventHub from "../utils/utils";
// import TimeDimensionTile from "ol-plus/layer/TimeDimensionTile";
// import EDALSLD from 'ol-plus/sld/EDALSLD';
// import {ThreddsServer} from '../config';
// import LayerSwitcher from 'ol-plus/ui/LayerSwitcher';
// import {lineString, lineDistance, area as turfArea,polygon as turfPolygon, length as turfLength} from '@turf/turf';
// import {getArea, getLength,} from 'ol/sphere';
// import LineString from 'ol/geom/LineString';
// import LayerSwitcher from 'ol-plus/ui/LayerSwitcher';

// import {MajorBasinExtent, BasinExtent, mbasin, dataSelect, WMSSLD, legendImage} from "../utils/data";
// import TimeDimensionTile from "ol-plus/layer/TimeDimensionTile";
// import {ThreddsServer} from "../utils/config";


// import 'ol-ext/control/Search.css';
import SearchNominatim from 'ol-ext/control/SearchNominatim';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import Text from "ol/style/Text";
import {Icon} from 'ol/style';
import {toSize} from 'ol/size';
import ImageIcon from '../../assets/markers_default.png';
import {getCenter as ol_extent_getCenter} from 'ol/extent';
import GeoJSON from "ol/format/GeoJSON";
// import Legend from "ol-ext/legend/Legend";
import Legend from "../../utils/customLegend"
import LegendControl from "ol-ext/control/Legend";
import CanvasScaleLine from "ol-ext/control/CanvasScaleLine";
import PrintDialog from "ol-ext/control/PrintDialog";

// import OLPolygon from 'ol/geom/Polygon';
// import OlSelect from 'ol/interaction/Select';
// import OlDraw from 'ol/interaction/Draw';
// import OlExtTextButton from 'ol-ext/control/TextButton';
// import Bar from 'ol-ext/control/Bar';
import OlExtButton from 'ol-ext/control/Button';
// import OlExtToggle from 'ol-ext/control/Toggle';
// import 'ol-ext/control/Bar.css'
import CircleStyle from "ol/style/Circle";
// import ScaleLine from "ol/control/ScaleLine";
import CanvasTitle from "ol-ext/control/CanvasTitle";
import {defaults} from "ol/control";

import {saveAs} from 'file-saver';
import {jsPDF} from "jspdf";

import {mapActions, mapMutations, mapState} from 'vuex';

import PrintMap from "../common/PrintMap";
import {AirPollutionWatchApp} from "../../utils/dataRGBProducts";
import {threddDataSource} from "../../config";
import rgbLegend from "../../assets/rgblegend.jpg";
import legendAMIDustRGB from "../../assets/legendAMIDustRGB.png"
import {Action} from "../../store/actionType";
import TimeDimensionTile from "ol-plus/layer/TimeDimensionTile";
import LayerSwitcher from "ol-plus/ui/LayerSwitcher";

// import {GeoServerHost} from "../config";
// import ol_legend_Item from 'ol-ext/legend/Item';
// import ol_legend_Legend from "ol-ext/legend/Legend";

// ol_legend_Legend.prototype.removeItem = function (item) {
//   let index = false;
//   this._items.array_.forEach(function (it, idx) {
//     if (it.getProperties().id == item.id) {
//       index = idx;
//     }
//   });
//   console.log("index");
//   console.log(index);
//   if (index !== false) {
//     this._items.array_.splice(index, 1);
//   }
// };
export default {
  name: "mapComponentRGBProduct",
  components: {PrintMap},
  data() {
    return {
      // drawerAppendToBody: true,
      mapObj: '',
      HighLightedLayer: '',
      view: '',
      mapObject: '',
      MajorBasin: '',
      AllLayers: '',
      selectedFilesOnAYear: [],
      // drawer: true,
      AirPollutionWatchApp: AirPollutionWatchApp,
    }
  },
  created() {
    this.mapControlVariable.LegendObject = new Legend({
      title: 'Legend',
      margin: 3,
      // items: legendItems,
      // size:[40, 25]
      size: [60, 30]
    });
  },
  methods: {
    ...mapActions(["PostSlicedFromCatalog", "PostCreateGIFMapImage",]),
    ...mapMutations(["setSelectedLayerObj", "appendTimeSeriesLayerCollection", "setSelectInteraction", "setMapObject", "setWorkingVectorLayer"]),
    ...mapMutations(["appendTimeSeriesLayerCollection", "addLegend", "removeLegend"]),
    mapInitilization() {

      // let osm = new TileLayer({
      //   source: new OSM({attributions: [],}),
      //   // visible:false
      // });

      let esri_world_topomap = new TileLayer({
        visible: true,
        zIndex: 1,
        source: new XYZ({
          attributions: [],
          url:
              'https://server.arcgisonline.com/ArcGIS/rest/services/' +
              'World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
          crossOrigin: "Anonymous"
        }),
      });

      let view = new View({
        center: [9388155.512006583, 3291367.8109067543],
        zoom: 4,
        extent: [6702855.884774126, 1769255.1930753174, 12194542.852403797, 4812621.833531793]
      });

      // let ScaleControl = new ScaleLine({
      //   units: 'metric'
      // });
      //
      var map = new Map({
        layers: [],
        // target: this.$refs['map-root'],
        renderer: 'canvas',
        target: 'map-container2',
        controls: defaults({
          attribution: false
        }).extend([]),
        view: view,
      });

      // map.addLayer(osm);
      map.addLayer(esri_world_topomap);
      this.mapObject = map;
      window.mapObject = map;
      this.view = view;

      // this.mapObject.addControl(
      //     new Control({
      //       element: document.getElementById('layerSwitcherDiv')
      //     })
      // );
      map.getView().fit([6702855.884774126, 1769255.1930753174, 12194542.852403797, 4812621.833531793], map.getView());
      this.setMapObject(this.mapObject);
    },
    legendObjectCollection() {
      let legendObjectEnabled = [];
      this.TimeSeriesLayerCollection.forEach(function (layerObj) {
        let Properties = layerObj.getProperties();
        console.log(Properties.legendPath);
        let lObj = {
          title: Properties.title,
          // typeGeom: 'Point',
          style: new Style({
            image: new Icon({
              src: Properties.legendPath,
              crossOrigin: 'anonymous' // Enable print
            })
          })
        };
        legendObjectEnabled.push(lObj)
      });
      return legendObjectEnabled;
    },
    addGeoCodingAndInteractionBar() {
      var map = this.mapObject;

// Set the control grid reference
      var search = new SearchNominatim({
        polygon: true,
        reverse: false,
        position: true,	// Search, with priority to geo position,
        // maxHistory: -1,
        className: 'OSMBasedGeocodingEmissionPage',
      });

// search.set('copy', false)

      var GeoCodingAndDrawLayer = new VectorLayer({
        source: new VectorSource(),
        zIndex: 999
      });

      this.setWorkingVectorLayer(GeoCodingAndDrawLayer);

      map.addLayer(GeoCodingAndDrawLayer);

      map.addControl(search);


      function removePreviousSearchFeature() {
        var features = GeoCodingAndDrawLayer.getSource().getFeatures();
        features.forEach(function (f) {
          if (f.getProperties().osm_id) {
            GeoCodingAndDrawLayer.getSource().removeFeature(f);
          }
        });
        // console.log(features);
      }

      function UpDateVectorLayerStyle() {
        GeoCodingAndDrawLayer.getSource().forEachFeature(function (feature) {
          let StyleObj = null;
          if (feature.getProperties().osm_id) {
            StyleObj = [
              new Style({
                stroke: new Stroke({
                  color: [0, 0, 0, 0],
                  opacity: 1,
                  width: 3
                }),
                fill: new Fill({
                  color: '#e5e5ff00'
                })
                // Commented to only see the lines
                //,fill: new ol.style.Stroke ({
                //  color: [155, 155, 155, 0.4]
                //})
              }),
              // Dash white lines (second style, on the top)
              new Style({
                image: new Icon({
                  anchor: [0.5, 46],
                  anchorXUnits: 'fraction',
                  anchorYUnits: 'pixels',
                  src: ImageIcon,
                  size: toSize([40, 45]),
                  // offset:[20,20]
                }),
                stroke: new Stroke({
                  color: [0, 0, 255, 1.0],
                  opacity: 1,
                  width: 3,
                  lineDash: [4, 8, 4, 8]
                }),
                fill: new Fill({
                  color: '#e5e5ff40'
                })
              })
            ];

          } else {
            StyleObj = new Style({
              image: new CircleStyle({
                radius: 5,
                stroke: new Stroke({
                  color: [255, 0, 0, 1],
                  opacity: 1,
                  width: 2
                }),
                fill: new Fill({
                  color: '#e5e5ff50'
                }),
              }),
              stroke: new Stroke({
                color: [255, 0, 0, 1],
                opacity: 1,
                width: 2
              }),
              fill: new Fill({
                color: '#e5e5ff50'
              })
              // Commented to only see the lines
              //,fill: new ol.style.Stroke ({
              //  color: [155, 155, 155, 0.4]
              //})
            });

          }
          feature.setStyle(StyleObj);

        });
      }


// Select feature when click on the reference index
      search.on('select', function (e) {
        // console.log(e);
        // GeoCodingAndDrawLayer.getSource().clear();
        removePreviousSearchFeature();
        // Check if we get a geojson to describe the search
        if (e.search.geojson) {
          var format = new GeoJSON();
          var f = format.readFeature(e.search.geojson, {
            dataProjection: "EPSG:4326",
            featureProjection: map.getView().getProjection()
          });
          delete e.search.geojson;
          f.setProperties(e.search);
          GeoCodingAndDrawLayer.getSource().addFeature(f);
          var view = map.getView();
          var resolution = view.getResolutionForExtent(f.getGeometry().getExtent(), map.getSize());
          var zoom = view.getZoomForResolution(resolution);
          var center = ol_extent_getCenter(f.getGeometry().getExtent());
          // redraw before zoom
          setTimeout(function () {
            view.animate({
              center: center,
              zoom: Math.min(zoom, 16)
            });
          }, 100);
        } else {
          map.getView().animate({
            center: e.coordinate,
            zoom: Math.max(map.getView().getZoom(), 16)
          });
        }
        UpDateVectorLayerStyle();
      });


//
//       // this is for selection and create new feature
//       // Main control bar
//       var mainbar = new Bar();
//       mainbar.setPosition('top-left');
//
//       map.addControl(mainbar);
//
// // Edit control bar
//       var editbar = new Bar({
//         toggleOne: true,	// one control active at the same time
//         group: false			// group controls together
//       });
//       mainbar.addControl(editbar);
//
// // Add selection tool:
// //  1- a toggle control with a select interaction
// //  2- an option bar to delete / get information on the selected feature
//       var sbar = new Bar();
//       sbar.addControl(new OlExtButton({
//         html: '<i class="fa fa-times"></i>',
//         title: "Delete",
//         handleClick: function () {
//           var features = selectCtrl.getInteraction().getFeatures();
//           if (!features.getLength()) info("Select an object first...");
//           else info(features.getLength() + " object(s) deleted.");
//
//           features.forEach(function (f) {
//             console.log(f);
//             GeoCodingAndDrawLayer.getSource().removeFeature(f);
//           });
//           selectCtrl.getInteraction().getFeatures().clear();
//           selectCtrl.getInteraction().dispatchEvent({type: 'select'});
//         }
//       }));
//
//
//       var selectCtrl = new OlExtToggle({
//         html: '<i class="fa fa-hand-pointer"></i>',
//         title: "Select",
//         interaction: new OlSelect({
//           hitTolerance: 2,
//           style: new Style({
//             image: new CircleStyle({
//               radius: 5,
//               stroke: new Stroke({
//                 color: [255, 0, 0, 1],
//                 opacity: 1,
//                 width: 2
//               }),
//               fill: new Fill({
//                 color: '#e5e5ff50'
//               }),
//             }),
//             stroke: new Stroke({
//               color: [255, 0, 0, 1],
//               opacity: 1,
//               width: 2
//             }),
//             fill: new Fill({
//               color: '#e5e5ff50'
//             })
//             // Commented to only see the lines
//             //,fill: new ol.style.Stroke ({
//             //  color: [155, 155, 155, 0.4]
//             //})
//           }),
//           layers: [GeoCodingAndDrawLayer]
//         }),
//         bar: sbar,
//         autoActivate: true,
//         active: true
//       });
//       this.setSelectInteraction(selectCtrl.getInteraction());
//
//       editbar.addControl(selectCtrl);
//       this.setSelectedLayerObj(selectCtrl.getInteraction());
// // Add editing tools
//       var pedit = new OlExtToggle({
//         html: '<i class="fa fa-map-marker-alt" ></i>',
//         title: 'Point',
//         interaction: new OlDraw({
//           type: 'Point',
//           source: GeoCodingAndDrawLayer.getSource()
//         })
//       });
//       editbar.addControl(pedit);
//       var fedit = new OlExtToggle({
//         html: '<i class="fa fa-draw-polygon" ></i>',
//         title: 'Polygon',
//         interaction: new OlDraw({
//           type: 'Polygon',
//           source: GeoCodingAndDrawLayer.getSource(),
//           // Count inserted points
//           geometryFunction: function (coordinates, geometry) {
//             this.nbpts = coordinates[0].length;
//             if (geometry) geometry.setCoordinates([coordinates[0].concat([coordinates[0][0]])]);
//             else geometry = new OLPolygon(coordinates);
//             return geometry;
//           }
//         }),
//         // Options bar ssociated with the control
//         bar: new Bar({
//           controls: [new OlExtTextButton({
//             html: 'undo',//'<i class="fa fa-mail-reply"></i>',
//             title: "undo last point",
//             handleClick: function () {
//               if (fedit.getInteraction().nbpts > 1) fedit.getInteraction().removeLastPoint();
//             }
//           }),
//             new OlExtTextButton({
//               html: 'finish',
//               title: "finish",
//               handleClick: function () {
//                 // Prevent null objects on finishDrawing
//                 if (fedit.getInteraction().nbpts > 3) fedit.getInteraction().finishDrawing();
//               }
//             })
//           ]
//         })
//       });
//       editbar.addControl(fedit);
//
//
//       // fedit.getInteraction().on('drawend', function (e) {
//       //
//       //   console.log(e.feature);
//       //   console.log(e.feature);
//       //
//       //   // GeoCodingAndDrawLayer.getSource().removeFeature(e.feature);
//       //
//       //
//       // });
//
//       fedit.getInteraction().on('drawstart', function () {
//         GeoCodingAndDrawLayer.getSource().once('addfeature', handleAddFeature);
//       });
//
//       function handleAddFeature(evt) {
//         let coordi = evt.feature.getGeometry().getCoordinates();
//
//         const area = getArea(evt.feature.getGeometry());
//         // Sq.Km
//         let outputArea = Math.round((area / 1000000) * 100) / 100;
//         console.log(outputArea);
//
//         let li = new LineString(coordi);
//         const length = getLength(li);
//         // In Km
//         let outputLength = Math.round((length / 1000) * 100) / 100;
//         console.log(outputLength);
//         // GeoCodingAndDrawLayer.getSource().removeFeature(evt.feature);
//       }
//
// // Show info
//       function info(i) {
//         console.log(i);
//         // document.querySelector("#info").innerHTML(i || "");
//       }
//
//
//
//       console.log("second");
//       eventHub.$emit('runFeatureInteractionCode');
    },
    addPrintMapFunctionality() {
      // Add a custom push button with onToggle function
      // let that = this;
      var PrintButton = new OlExtButton({
        html: '<i class="fas fa-print"></i>',
        className: "PrintMap",
        title: "Print map",
        handleClick: () => {
          // that.PrintMapComponentData.PrintMapDialogVisible = true;
          // setTimeout(() => {
          //   eventHub.$emit('OpenDialogOfPrintAndProxyfy');
          // }, 500);
        }
      });

      this.mapObject.addControl(PrintButton);
    },
    olExtLegentItem(title, id, legend) {
      return {
        id: id,
        title: title,
        typeGeom: 'Point',
        style: new Style({
          image: new Icon({
            src: legend,
            crossOrigin: 'anonymous' // Enable print
          })
        })
      };
    },
    LayerSwitcherClick() {
      this.drawer = true;
    },
    handleClose(done, e) {
      console.log(e);

    },
    olextPrintFunction() {
      // Add a title control
      this.mapObject.addControl(new CanvasTitle({
        title: 'my title',
        visible: false,
        style: new Style({text: new Text({font: '20px "Lucida Grande",Verdana,Geneva,Lucida,Arial,Helvetica,sans-serif'})})
      }));
      // let legendItems=[];
      // Add a legend to the print
      var legendCtrl = new LegendControl({legend: this.mapControlVariable.LegendObject});
      this.mapObject.addControl(legendCtrl);

      // Add a ScaleLine control
      this.mapObject.addControl(new CanvasScaleLine());

      // Print control
      var printControl = new PrintDialog({lang: 'en'});
      printControl.setSize('A4');
      printControl.setOrientation('landscape');
      this.mapObject.addControl(printControl);

      /* On print > save image file */
      printControl.on(['print', 'error'], (e) => {
        // let LegendImageArray = this.legendObjectCollection();
        // LegendImageArray.forEach(function (ii) {
        //   console.log(ii);
        //   legendd.addItem(ii);
        // });
        // // legendItems = LegendImageArray;
        // console.log(LegendImageArray);

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
          } else {
            // Save image as file
            e.canvas.toBlob(function (blob) {
              var name = (e.print.legend ? 'legend.' : 'map.') + e.imageType.replace('image/', '');
              saveAs(blob, name);
            }, e.imageType, e.quality);
          }
        } else {
          console.warn('No canvas to export');
        }
      });
    },

    CatalogSlicingParam(url, startDate, endDate, ends_with) {
      let param = {
        url: url,
        data_ext: ends_with,
        startDate: startDate,
        endDate: endDate,
      }
      return param
    },

    async addRasterLayerToMap(kk) {
      let slicingParam, responseData, resPonseParsed, wmsList = [], isTrue;
      let catalogURl = threddDataSource + kk.catalog;
      slicingParam = this.CatalogSlicingParam(catalogURl, kk.getStartDate(), kk.getEndDate(), kk.ends_with);
      responseData = await this.PostSlicedFromCatalog(slicingParam);
      resPonseParsed = responseData;
      isTrue = resPonseParsed.data.length;
      kk.hasData = isTrue

      if (isTrue) {
        resPonseParsed.data.forEach(function (fileName) {
          let url = catalogURl.replace("/catalog/", "/wms/").replace("catalog.xml", fileName);
          wmsList.push(url)
        });
        var Newlayer;
        if (kk.isTimeDimensionLayer) {
          if (kk.useSLD) {
            let SLD = kk.SLD.replace(/(\r\n|\n|\r)/gm, "");
            let LegendParameter = '?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&SLD_BODY=';
            let legendWMS = '';
            if (!kk.legendPath) {
              if (Array.isArray(wmsList)) {
                legendWMS = wmsList[0] + LegendParameter + encodeURIComponent(SLD).toString();
              } else {
                legendWMS = wmsList + LegendParameter + encodeURIComponent(SLD).toString();
              }
            } else {
              legendWMS = kk.legendPath
            }
            console.log(legendWMS);

            let OLEXTLegendObject = {
              id: kk.threddLayerProp.id,
              title:  kk.threddLayerProp.id.includes("dust")?"                                         "+kk.threddLayerProp.title:kk.threddLayerProp.title,
              typeGeom: 'Point',
              style: new Style({
                image: new Icon({
                  // src: kk.threddLayerProp.legendPath,
                  src: kk.threddLayerProp.id.includes("dust")?legendAMIDustRGB:rgbLegend ,
                  crossOrigin: 'anonymous', // Enable print
                })
              }),
              size: kk.threddLayerProp.id.includes("dust")?[250, 195]:[60, 35]
            };

            let timedimensionTilePara = kk.threddLayerProp;
            timedimensionTilePara.source.params.SLD_BODY = SLD;
            timedimensionTilePara.source.url = wmsList;
            timedimensionTilePara.legendPath = kk.threddLayerProp.id.includes("dust")?legendAMIDustRGB:rgbLegend ;
            // timedimensionTilePara.legendPath = kk.threddLayerProp.legendPath;
            timedimensionTilePara.wmsList = wmsList;
            timedimensionTilePara.changeWMSProxy = true;
            // timedimensionTilePara.showAnimationButton = true;
            // timedimensionTilePara.animationGIFFunction = this.downloadAnimation;
            timedimensionTilePara.OLEXTLegendObject = OLEXTLegendObject;

            console.log("...--------><><><....");
            console.log(timedimensionTilePara);

            timedimensionTilePara.animationDownloadFunction = async (obj) => {
              let isProcessing = obj.getIsProcessing();


              if (!isProcessing) {
                console.log("test");
                console.log(isProcessing);
                obj.setIsProcessing(true);
                let fps = obj.fpsInput.value;
                let propList = [];
                let prop = obj.getProperties();
                obj.AllDateAndTimeList.forEach((abcT) => {
                  let currentFormat = obj.aTime.getAttribute("format");
                  let timeButtom_text = undefined;

                  if (currentFormat === 'ISO') {
                    timeButtom_text = abcT.dateisoFormatForLevel;
                  } else {
                    timeButtom_text = abcT.localDateTime;
                  }
                  propList.push({
                    ...prop.animationPlot,
                    wms_url: abcT.WMSURL.replace('https', 'http'),
                    wms_layer: prop.source.params.LAYERS,
                    wms_time: abcT.dateisoFormat,
                    wms_style: prop.source.params.STYLES,
                    wms_NUMCOLORBANDS: prop.source.NUMCOLORBANDS,
                    ColorScale: prop.source.COLORSCALERANGE,
                    bottom_text: timeButtom_text,
                    RGB: prop.RGBComposite
                  })
                });

                let collectProp = {layersDetail: propList, fps: fps}
                let response = await this.PostCreateGIFMapImage(collectProp);
                let DownLoadURL = Action.Base + '/' + Action.GetAnimationImage + "?ImageName=" + response.Image + "&gif=1";
                this.AirPollutionWatchApp.forceDownload(DownLoadURL, prop.title + '.gif');
                obj.setIsProcessing(false);

              } else {

                this.$notify({
                  title: 'Warning',
                  message: 'Please wait for few second animation is being gererated by the system',
                  type: 'warning'
                });

              }
            };
            Newlayer = new TimeDimensionTile(timedimensionTilePara);

            let AddRemoveLegendFunction = function () {
              if (this.getProperties().visible) {
                that.addLegend(this.getProperties().OLEXTLegendObject);
              } else {
                that.removeLegend(this.getProperties().OLEXTLegendObject);
              }
            };

            let that = this;
            Newlayer.on('change:visible', AddRemoveLegendFunction);

            await Newlayer.init().then(() => {
              this.mapObject.addThreddsLayer(Newlayer);
              let l5 = new LayerSwitcher(".layerCollection", Newlayer, true, 'withOpacityChange');
              // l5.setVisibleDivBind(kk.VisibleDivBind);
              // l5.setVisible(false);
              // l5.setVisible(true);
              l5.setVisible(kk.threddLayerProp.visible);
              let properties = Newlayer.getProperties()
              if (properties.mask) {
                console.log(properties)
                if (properties.CropOrMask == 'crop') {
                  Newlayer.setCrop(this.maskCoordinate);
                } else {
                  Newlayer.setMask(this.maskCoordinate);
                }
              }
              this.appendTimeSeriesLayerCollection(l5);
              // myApp.AllBindedLayersList.push(l5);
            });
          } else {
            let timedimensionTilePara = kk.threddLayerProp;
            let LegendParameter = '?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=' + timedimensionTilePara.source.params.LAYERS + '&COLORSCALERANGE=' + timedimensionTilePara.source.params.COLORSCALERANGE + '&STYLES=' + timedimensionTilePara.source.params.STYLES;
            let legendWMS = '';
            if (!kk.legendPath) {
              if (Array.isArray(wmsList)) {
                legendWMS = wmsList[0] + LegendParameter;
              } else {
                legendWMS = wmsList + LegendParameter;
              }
            } else {
              legendWMS = kk.legendPath
            }
            timedimensionTilePara.source.url = wmsList;
            timedimensionTilePara.legendPath = legendWMS;
            timedimensionTilePara.wmsList = wmsList;
            timedimensionTilePara.changeWMSProxy = true;
            // timedimensionTilePara.showAnimationButton = true;
            // timedimensionTilePara.animationGIFFunction = this.downloadAnimation;
            let le = {
              id: timedimensionTilePara.id,
              title: timedimensionTilePara.title,
              // typeGeom: 'MultiPolygon',
              typeGeom: 'Point',
              style: new Style({
                image: new Icon({
                  src: legendWMS,
                  crossOrigin: 'anonymous', // Enable print
                  // scale:[0.9,0.15]
                })
              }),
              size: [60, 250]
              // margin:3,
              // className:'biglegend'
            };

            timedimensionTilePara.OLEXTLegendObject = le;

            timedimensionTilePara.animationDownloadFunction = async (obj) => {
              let isProcessing = obj.getIsProcessing();


              if (!isProcessing) {
                console.log("test");
                console.log(isProcessing);
                obj.setIsProcessing(true);
                let fps = obj.fpsInput.value;
                let propList = [];
                let prop = obj.getProperties();
                console.log(prop);
                obj.AllDateAndTimeList.forEach((abcT) => {
                  let currentFormat = obj.aTime.getAttribute("format");
                  let timeButtom_text = undefined;

                  if (currentFormat === 'ISO') {
                    timeButtom_text = abcT.dateisoFormatForLevel;
                  } else {
                    timeButtom_text = abcT.localDateTime;
                  }
                  propList.push({
                    ...prop.animationPlot,
                    wms_url: abcT.WMSURL.replace('https', 'http'),
                    wms_layer: prop.source.params.LAYERS,
                    wms_time: abcT.dateisoFormat,
                    wms_style: prop.source.params.STYLES,
                    wms_NUMCOLORBANDS: prop.source.params.NUMCOLORBANDS,
                    ColorScale: prop.source.params.COLORSCALERANGE,
                    bottom_text: timeButtom_text,
                    RGB: prop.RGBComposite
                  })
                });

                let collectProp = {layersDetail: propList, fps: fps}
                let response = await this.PostCreateGIFMapImage(collectProp);
                let DownLoadURL = Action.Base + '/' + Action.GetAnimationImage + "?ImageName=" + response.Image + "&gif=1";
                this.AirPollutionWatchApp.forceDownload(DownLoadURL, prop.title + '.gif');
                obj.setIsProcessing(false);

              } else {

                this.$notify({
                  title: 'Warning',
                  message: 'Please wait for few second animation is being gererated by the system',
                  type: 'warning'
                });

              }
            };

            Newlayer = new TimeDimensionTile(timedimensionTilePara);
            let AddRemoveLegendFunction = function () {
              if (this.getProperties().visible) {
                that.addLegend(this.getProperties().OLEXTLegendObject);
              } else {
                that.removeLegend(this.getProperties().OLEXTLegendObject);
              }
            };

            let that = this;
            Newlayer.on('change:visible', AddRemoveLegendFunction);
            await Newlayer.init().then(() => {
              this.mapObject.addThreddsLayer(Newlayer);
              // myApp.map.addThreddsLayer(val);
              let l5 = new LayerSwitcher(".layerCollection", Newlayer, true);
              l5.setVisibleDivBind(kk.VisibleDivBind);
              l5.setVisible(false);
              l5.setVisible(kk.threddLayerProp.visible);
              let properties = Newlayer.getProperties()
              if (properties.mask) {
                if (properties.CropOrMask == 'crop') {
                  Newlayer.setCrop(this.maskCoordinate);
                } else {
                  Newlayer.setMask(this.maskCoordinate);
                }
              }
              this.appendTimeSeriesLayerCollection(l5);
              // myApp.AllBindedLayersList.push(l5);
            });

          }
        }
      }

    },

  },
  computed: {
    ...mapState(["TimeSeriesLayerCollection", "PrintMapComponentData", "mapControlVariable"]),
    // getInventory() {
    //   return dataSelect.Inventory;
    // },
  },

  beforeMount() {
  },
  mounted() {
    console.log(this.mapControlVariable);
    this.mapInitilization();
    // this.addGeoCoding();
    this.addGeoCodingAndInteractionBar();
    // this.addPrintMapFunctionality();

    this.olextPrintFunction();

    this.addRasterLayerToMap(this.AirPollutionWatchApp.TrueColorImage);
    this.addRasterLayerToMap(this.AirPollutionWatchApp.AMIRGBProduct[0]);
    this.addRasterLayerToMap(this.AirPollutionWatchApp.AMIRGBProduct[1]);
    this.addRasterLayerToMap(this.AirPollutionWatchApp.AMIRGBProduct[2]);
    this.addRasterLayerToMap(this.AirPollutionWatchApp.AMIRGBProduct[3]);
    this.addRasterLayerToMap(this.AirPollutionWatchApp.AMIRGBProduct[4]);
  },
}
</script>

<style>
#map-container2 {
  height: 100%;
  width: 100%;
  border-radius: 5px;
}

#map-container2 .ol-viewport {
  border-radius: 5px;
}

#layerSwitcherDiv {
  right: 0.5em;
  top: 0.5em;
  position: absolute;
}

#layerSwitcherDiv button {
  line-height: unset;
  border-radius: 1px;
}


.drawerForLayersList {
  position: initial !important;
}

/* OSM Based Geocoding*/
.ol-search ul li {
  border-bottom: 1px solid lightgray;

  padding: 10px 5px 10px 5px !important;
  flex: 1;
  max-width: 608px;
  white-space: normal !important;
  overflow: unset;
  flex-grow: 1;
  text-overflow: ellipsis;
}

.ol-search ul li:last-child {
  border-bottom: none;
  border-radius: 0px;
}

.ol-search ul {
  list-style: none;
  cursor: pointer;
  padding: 0px 5px 0px 5px !important;
  margin: 0;
  display: flex;
  flex-direction: column;
  clear: both;
  cursor: pointer;
  max-width: 618px;
  overflow-x: hidden;
  z-index: 1;
  background: #fff;
  font-size: 13px;
}

.ol-search {
  z-index: 999;
}

.ol-search {
  top: 4.1em;
  left: 0.5em;
  /*width: 500px;*/
}

.ol-search input {
  width: 600px;
}


.ol-control.ol-bar {
  left: 3.2em;
  top: 6em;
}

.ol-control.ol-bar.ol-top.ol-left, .ol-control.ol-bar.ol-top.ol-right {
  top: 6.5em;
  transform: none;
}

.PrintMap.ol-button.ol-unselectable.ol-control {
  top: 12em;
  left: 0.5em;
}

.LayerDiv {
  margin-top: 10px;
}

.withOpacityChange {
  margin-bottom: 18px;
}

.ol-scale-line {
  right: 0;
  left: auto;
  bottom: 2em;
}
</style>