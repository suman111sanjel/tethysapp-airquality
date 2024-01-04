<template>
  <div class="card-box full-height full-width about-div">
    <div id="map-container2" ref="LayerSelectorDropdown">
    </div>
    <div id="layerSwitcherDiv" class="ol-unselectable ol-control" @click="LayerSwitcherClick()">
      <button>
        <img src="@/assets/layers.svg" style="height: 20px;width: 20px;padding-top: 2px;">
      </button>
    </div>

    <el-drawer
        title="Layers"
        v-model="drawer"
        :custom-class="'drawerCustomCSS'"
        :append-to-body="drawerAppendToBody"
        :modal="false"
    >
      <span>
        <div class="layerCollection"></div>
          </span>
    </el-drawer>

  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import Control from "ol/control/Control";
// import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
// import TileWMS from "ol/source/TileWMS";
import View from "ol/View";
import {dataSelect, getLayerPropObj} from "../../utils/dataEmission";
import eventHub from "../../utils/utils";
import TimeDimensionTile from "ol-plus/layer/TimeDimensionTile";
import EDALSLD from 'ol-plus/sld/EDALSLD';
import {GeoServerHost, threddDataSource} from '../../config';
import LayerSwitcher from 'ol-plus/ui/LayerSwitcher';
// import {lineString, lineDistance, area as turfArea,polygon as turfPolygon, length as turfLength} from '@turf/turf';
import {getArea, getLength,} from 'ol/sphere';
import LineString from 'ol/geom/LineString';


// import {MajorBasinExtent, BasinExtent, mbasin, dataSelect, WMSSLD, legendImage} from "../utils/data";
// import TimeDimensionTile from "ol-plus/layer/TimeDimensionTile";
// import {ThreddsServer} from "../utils/config";

import 'ol-ext/control/Search.css';
import SearchNominatim from 'ol-ext/control/SearchNominatim';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import {Icon} from 'ol/style';
import {toSize} from 'ol/size';
import ImageIcon from '../../assets/markers_default.png';
import {getCenter as ol_extent_getCenter} from 'ol/extent';
import GeoJSON from "ol/format/GeoJSON";


import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/fontawesome';


import OLPolygon from 'ol/geom/Polygon'
import OlSelect from 'ol/interaction/Select'
import OlDraw from 'ol/interaction/Draw'
import OlExtTextButton from 'ol-ext/control/TextButton'
import Bar from 'ol-ext/control/Bar'
import OlExtButton from 'ol-ext/control/Button'
import OlExtToggle from 'ol-ext/control/Toggle';
import 'ol-ext/control/Bar.css'
import CircleStyle from "ol/style/Circle";
import {mapMutations, mapState} from 'vuex';
import XYZ from "ol/source/XYZ";
import {Image as ImageLayer} from "ol/layer";
import ImageWMS from "ol/source/ImageWMS";
import CanvasTitle from "ol-ext/control/CanvasTitle";
import Text from "ol/style/Text";
import LegendControl from "ol-ext/control/Legend";
import CanvasScaleLine from "ol-ext/control/CanvasScaleLine";
import PrintDialog from "ol-ext/control/PrintDialog";
import {jsPDF} from "jspdf";
import {saveAs} from "file-saver";


export default {
  name: "mapComponentEmission",
  components: {},
  data() {
    return {
      drawerAppendToBody: true,
      mapObj: '',
      HighLightedLayer: '',
      view: '',
      mapObject: '',
      MajorBasin: '',
      AllLayers: '',
      selectedFilesOnAYear: [],
      drawer: true,
    }
  },
  methods: {
    ...mapMutations(["setSelectInteractionObj", "appendTimeSeriesLayerCollection", "setVectorLayerSource", "setmapObject"]),
    mapInitilization() {
      // let osm = new TileLayer({
      //   source: new OSM({attributions: [],}),
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
      var map = new Map({
        layers: [],
        // target: this.$refs['map-root'],
        target: 'map-container2',
        view: view,
      });

      // map.addLayer(osm);
      map.addLayer(esri_world_topomap);
      this.mapObject = map;
      //setmapObject to store
      this.setmapObject(map);
      window.mapObject = map;
      this.view = view;
      this.mapObject.addControl(
          new Control({
            element: document.getElementById('layerSwitcherDiv')
          })
      );
      map.getView().fit([6702855.884774126, 1769255.1930753174, 12194542.852403797, 4812621.833531793], map.getView());
    },
    changeInventory() {
      this.addTimeDimensionLayer();
    },
    async addTimeDimensionLayer() {
      console.log(this.$store.state);
      var mapObject = this.mapObject;
      var layerId = this.$store.state.inventory + '___' + this.$store.state.pollutants + '___' + this.$store.state.sectors + '___' + this.$store.state.year;
      var selectedLayr = this.TimeSeriesLayerCollection.filter(function (x) {
        var checkLayer = x.getProperties().id === layerId;
        if (!checkLayer) {
          x.setVisibleDivBind(false);
        }
        return checkLayer;
      });
      if (selectedLayr.length) {
        if (selectedLayr.length === 1) {
          selectedLayr[0].setVisibleDivBind(true);
        } else {
          console.log("there are multiple layer added!!!!");
        }
      } else {
        let ll = getLayerPropObj(this.$store.state.inventory, this.$store.state.pollutants, this.$store.state.sectors);
        let title = [ll.title[0], ll.title[2], this.$store.state.year, ll.title[1]].join(' ') + ' (kt)';
        ll.title = [ll.title[0], ll.title[2], this.$store.state.year].join(' ') + "</br> " + ll.title[1] + ' (kt)';
        let EdalSldObj = new EDALSLD(ll);
        let WMSList = `${threddDataSource}wms/HKHEmissions/${this.$store.state.inventory}/${this.$store.state.pollutants}/${this.$store.state.inventory}_${this.$store.state.pollutants}_${this.$store.state.year}.nc`;
        let legendUrl = WMSList + `?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&LAYERS=${this.$store.state.sectors}&SLD_BODY=${encodeURIComponent(EdalSldObj.getEDALSLD())}`;

        var mm = new TimeDimensionTile({
          id: layerId,
          title: title,
          visible: true,
          opacity: 0.7,
          legendPath: legendUrl,
          showlegend: true,
          showControlPanel: false,
          ThreddsDataServerVersion: "5",
          zIndex: 500,
          timeSliderSize: "small",
          alignTimeSlider: "right",
          customLegendElement: EdalSldObj.getLegendHTMLElement(),
          source: {
            url: WMSList,
            params: {
              'VERSION': '1.1.1',
              'LAYERS': ll.parameterName,
              'SLD_BODY': EdalSldObj.getEDALSLD(),
            }
          }
        });
        await mm.init().then(
            () => {
              mapObject.addThreddsLayer(mm);
              let lk = new LayerSwitcher(".layerCollection", mm, true, true, 'withOpacSlider');
              mm.setVisible(true);

              this.appendTimeSeriesLayerCollection(lk);
            },
            (error) => {
              console.error(error);
            });
      }
    },
    addGeoCodingAndInteractionBar() {
      var map = this.mapObject;

// Set the control grid reference
      var search = new SearchNominatim({
        polygon: true,
        reverse: false,
        position: true,	// Search, with priority to geo position,
        maxHistory: -1,
        className: 'OSMBasedGeocodingEmissionPageNew',
      });

// search.set('copy', false)

      var GeoCodingAndDrawLayer = new VectorLayer({
        source: new VectorSource(),
        zIndex: 999
      });
      map.addLayer(GeoCodingAndDrawLayer);

      map.addControl(search);

      // This sets on store
      this.setVectorLayerSource(GeoCodingAndDrawLayer.getSource());

// Select feature when click on the reference index
      search.on('select', function (e) {	// console.log(e);
        // GeoCodingAndDrawLayer.getSource().clear();
        removePreviousSearchFeature();
        // Check if we get a geojson to describe the search
        if (e.search.geojson) {
          var format = new GeoJSON();
          console.log('e.search.geojson')
          console.log(e.search.geojson)
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

// Main control bar
      var mainbar = new Bar();
      mainbar.setPosition('top-left');
      map.addControl(mainbar);
// Edit control bar
      var editbar = new Bar({
        toggleOne: true,	// one control active at the same time
        group: false			// group controls together
      });
      mainbar.addControl(editbar);

// Add selection tool:
//  1- a toggle control with a select interaction
//  2- an option bar to delete / get information on the selected feature
      var sbar = new Bar();
      sbar.addControl(new OlExtButton({
        html: '<i class="fa fa-times"></i>',
        title: "Delete",
        handleClick: function () {
          var features = selectCtrl.getInteraction().getFeatures();
          if (!features.getLength()) info("Select an object first...");
          else info(features.getLength() + " object(s) deleted.");

          features.forEach(function (f) {
            console.log(f);
            GeoCodingAndDrawLayer.getSource().removeFeature(f);
          });
          selectCtrl.getInteraction().getFeatures().clear();
        }
      }));


      var selectCtrl = new OlExtToggle({
        html: '<i class="fa fa-hand-pointer"></i>',
        title: "Select",
        interaction: new OlSelect({
          hitTolerance: 2,
          style: new Style({
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
          })
        }),
        bar: sbar,
        autoActivate: true,
        active: true
      });

      editbar.addControl(selectCtrl);
      this.setSelectInteractionObj(selectCtrl.getInteraction());
// Add editing tools
      var pedit = new OlExtToggle({
        html: '<i class="fa fa-map-marker-alt" ></i>',
        title: 'Point',
        interaction: new OlDraw({
          type: 'Point',
          source: GeoCodingAndDrawLayer.getSource()
        })
      });
      editbar.addControl(pedit);


      var fedit = new OlExtToggle({
        html: '<i class="fa fa-draw-polygon" ></i>',
        title: 'Polygon',
        interaction: new OlDraw({
          type: 'Polygon',
          source: GeoCodingAndDrawLayer.getSource(),
          // Count inserted points
          geometryFunction: function (coordinates, geometry) {
            this.nbpts = coordinates[0].length;
            if (geometry) geometry.setCoordinates([coordinates[0].concat([coordinates[0][0]])]);
            else geometry = new OLPolygon(coordinates);
            return geometry;
          }
        }),
        // Options bar ssociated with the control
        bar: new Bar({
          controls: [new OlExtTextButton({
            html: 'undo',//'<i class="fa fa-mail-reply"></i>',
            title: "undo last point",
            handleClick: function () {
              if (fedit.getInteraction().nbpts > 1) fedit.getInteraction().removeLastPoint();
            }
          }),
            new OlExtTextButton({
              html: 'finish',
              title: "finish",
              handleClick: function () {
                // Prevent null objects on finishDrawing
                if (fedit.getInteraction().nbpts > 3) fedit.getInteraction().finishDrawing();
              }
            })
          ]
        })
      });
      editbar.addControl(fedit);


      // fedit.getInteraction().on('drawend', function (e) {
      //
      //   console.log(e.feature);
      //   console.log(e.feature);
      //
      //   // GeoCodingAndDrawLayer.getSource().removeFeature(e.feature);
      //
      //
      // });

      fedit.getInteraction().on('drawstart', function () {
        GeoCodingAndDrawLayer.getSource().once('addfeature', handleAddFeature);
      });

      function handleAddFeature(evt) {
        let coordi = evt.feature.getGeometry().getCoordinates();

        const area = getArea(evt.feature.getGeometry());
        // Sq.Km
        let outputArea = Math.round((area / 1000000) * 100) / 100;
        console.log(outputArea);

        let li = new LineString(coordi);
        const length = getLength(li);
        // In Km
        let outputLength = Math.round((length / 1000) * 100) / 100;
        console.log(outputLength);
        // GeoCodingAndDrawLayer.getSource().removeFeature(evt.feature);
      }

// Show info
      function info(i) {
        console.log(i);
        // document.querySelector("#info").innerHTML(i || "");
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

      function removePreviousSearchFeature() {
        var features = GeoCodingAndDrawLayer.getSource().getFeatures();
        features.forEach(function (f) {
          if (f.getProperties().osm_id) {
            GeoCodingAndDrawLayer.getSource().removeFeature(f);
          }
        });
        // console.log(features);
      }
    },
    LayerSwitcherClick() {
      this.drawer = true;
    },
    handleClose(done, e) {
      console.log(e);

      // this.$confirm('You still have unsaved data, proceed?')
      //     .then(()=> {
      //       done();
      //     })
      //     .catch(()=> {
      //     });

    },
    addAdminLayers() {

      let GeoServerWMSURL = GeoServerHost + '/geoserver/AirQuality/wms';
      let WMSURLWithRequestParameter = GeoServerWMSURL + '?request=GetLegendGraphic&version=1.1.1&format=image/png&width=20&height=20&layer='

      // let le1 = this.olExtLegentItem('Country Outline', 'Province', WMSURLWithRequestParameter + 'AirQuality:nepal_provincial_boundary')

      let countryBoundary = new ImageLayer({
        id: 'Country_Outline',
        title: 'Country Outline',
        visible: false,
        legendPath: WMSURLWithRequestParameter + 'AirQuality:nepal_country_boundry',
        zIndex: 6,
        // OLEXTLegendObject: le1,
        source: new ImageWMS({
          url: GeoServerWMSURL,
          crossOrigin: 'anonymous',
          params: {'LAYERS': 'AirQuality:nepal_country_boundry'},
          serverType: 'geoserver',
        }),
      });
      // let le2 = this.olExtLegentItem('Province', 'Province', WMSURLWithRequestParameter + 'AirQuality:nepal_provincial_boundary')

      let provinceBoundary = new ImageLayer({
        id: 'Province',
        title: 'Province',
        visible: false,
        legendPath: WMSURLWithRequestParameter + 'AirQuality:nepal_provincial_boundary',
        zIndex: 5,
        // OLEXTLegendObject: le2,
        source: new ImageWMS({
          url: GeoServerWMSURL,
          crossOrigin: 'anonymous',
          params: {'LAYERS': 'AirQuality:nepal_provincial_boundary'},
          serverType: 'geoserver',
        }),
      });
      // let le3 = this.olExtLegentItem('District', 'District', WMSURLWithRequestParameter + 'AirQuality:nepal_district_boundary')

      let DistrictBoundary = new ImageLayer({
        id: 'District',
        title: 'District',
        visible: false,
        legendPath: WMSURLWithRequestParameter + 'AirQuality:nepal_district_boundary',
        zIndex: 4,
        // OLEXTLegendObject: le3,
        source: new ImageWMS({
          url: GeoServerWMSURL,
          crossOrigin: 'anonymous',
          params: {'LAYERS': 'AirQuality:nepal_district_boundary'},
          serverType: 'geoserver',
        }),
      });
      // let le4 = this.olExtLegentItem('Palika', 'Palika', WMSURLWithRequestParameter + 'AirQuality:nepal_palika_boundary')

      let PalikaBoundary = new ImageLayer({
        id: 'Palika',
        title: 'Palika',
        visible: false,
        legendPath: WMSURLWithRequestParameter + 'AirQuality:nepal_palika_boundary',
        zIndex: 3,
        // OLEXTLegendObject: le4,
        source: new ImageWMS({
          url: GeoServerWMSURL,
          crossOrigin: 'anonymous',
          params: {'LAYERS': 'AirQuality:nepal_palika_boundary'},
          serverType: 'geoserver',
        }),
      });

      // let that = this;
      // countryBoundary.on('change:visible', AddRemoveLegendFunction);
      // provinceBoundary.on('change:visible', AddRemoveLegendFunction);
      // DistrictBoundary.on('change:visible', AddRemoveLegendFunction);
      // PalikaBoundary.on('change:visible', AddRemoveLegendFunction);
      this.mapObject.addLayer(countryBoundary);
      this.mapObject.addLayer(provinceBoundary);
      this.mapObject.addLayer(DistrictBoundary);
      this.mapObject.addLayer(PalikaBoundary);
      let l1 = new LayerSwitcher(".layerCollection", countryBoundary, true, true,);
      let l2 = new LayerSwitcher(".layerCollection", provinceBoundary, true, true,);
      let l3 = new LayerSwitcher(".layerCollection", DistrictBoundary, true, true,);
      let l4 = new LayerSwitcher(".layerCollection", PalikaBoundary, true, true,);

      l1.setVisible(true);
      l2.setVisible(true);
      l3.setVisible(true);
      l4.setVisible(true);

      // this.appendTimeSeriesLayerCollection(l1);
      // this.appendTimeSeriesLayerCollection(l2);
      // this.appendTimeSeriesLayerCollection(l3);
      // this.appendTimeSeriesLayerCollection(l4);

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
  },
  computed: {
    ...mapState(["TimeSeriesLayerCollection"]),
    getInventory() {
      return dataSelect.Inventory;
    },
  },
  created() {
    // this.Inventory = this.$store.state.inventory;
    this.drawer = true;
  },
  beforeMount() {

  },
  mounted() {
    this.mapInitilization();
    // this.addGeoCoding();
    this.addGeoCodingAndInteractionBar();
    // this.olextPrintFunction();

    eventHub.$on('InventoryChange', () => {
      this.changeInventory();
    });
    this.drawer = false;
    // setTimeout(() => {
    //   this.addAdminLayers();
    // }, 2000);

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

/*.el-overlay {*/
/*  position: fixed;*/
/*  top: 0;*/
/*  right: 0;*/
/*  bottom: 0;*/
/*  left: 0;*/
/*  z-index: 2000;*/
/*  height: 100%;*/
/*  background-color: rgba(0, 0, 0, 0);*/
/*}*/


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

</style>