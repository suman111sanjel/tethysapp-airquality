<template>
  <div class="card-box full-height full-width about-div">
    <div class="pannel-title">
      <h6 class="title-heading">Map Controls
      </h6>
    </div>
    <div class="body-container">
      <el-scrollbar height="100%">
        <el-form
            label-position="left"
            label-width="120px"
            class="demo-ruleForm"
            size="mini"
        >

          <!--          <el-form-item label="Data Period" prop="data_period">-->
          <!--            <el-select v-model="mapControlVariable.data_period" placeholder="Data Period"-->
          <!--                       style="width: 100%">-->
          <!--              <el-option-->
          <!--                  v-for="item in options.data_period"-->
          <!--                  :key="item.value"-->
          <!--                  :label="item.label"-->
          <!--                  :value="item.value"-->
          <!--                  :disabled="item.disabled"-->
          <!--              >-->
          <!--              </el-option>-->
          <!--            </el-select>  -->
          <!--          </el-form-item> -->
          <el-form-item label="Select By" prop="select_by">
            <el-select v-model="mapControlVariable.select_by" placeholder="Select By" style="width: 100%">

              <el-option
                  v-for="item in options.select_by"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
              >
              </el-option>

            </el-select>
          </el-form-item>

        </el-form>

        <el-form
            label-position="top"
            label-width="120px"
            class="demo-ruleForm"
            size="mini"
            v-if="mapControlVariable.select_by ==='Location'"
        >

          <el-form-item v-show="mapControlVariable.data_period !=='Recent'" label="Select Location"
                        prop="Select Location">

            <el-col :span="11" style="width: 100%">
              <el-select v-model="mapControlVariable.location_by" placeholder="Select Location" style="width: 100%">
                <el-option
                    v-for="item in options.location_by"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                >
                </el-option>

              </el-select>
            </el-col>
            <el-col :span="2" style="width: 100%">
              <div class="" style="width: 100%;text-align: center;">
                -
              </div>
            </el-col>
            <el-col :span="11" style="width: 100%">
              <el-select v-show="mapControlVariable.location_by ==='default_locations'"
                         v-model="mapControlVariable.default_location"
                         placeholder="Select Location" style="width: 100%">

                <el-option
                    v-for="item in options.default_location"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                >
                </el-option>
              </el-select>
              <div class="" v-show="mapControlVariable.location_by ==='AOI'">
                <div class="feature-selected" v-show="mapControlVariable.is_AOI_Feature_selected ===true">Feature
                  selected
                </div>
                <div class="no-feature-selected" v-show="mapControlVariable.is_AOI_Feature_selected ===false">No Feature
                  selected
                </div>
              </div>
            </el-col>

          </el-form-item>

          <el-form-item label="Pollutants" prop="Pollutants">
            <div class="pollutant-cascader">
              <el-cascader
                  v-model="mapControlVariable.location_by_pollutant_value1"
                  :options="cascaderData"
                  style="width: 100%"
              ></el-cascader>
            </div>
            <div class="pollutant-cascader">
              <el-cascader
                  v-model="mapControlVariable.location_by_pollutant_value2"
                  :options="cascaderData"
                  style="width: 100%"
              ></el-cascader>
            </div>
            <div class="pollutant-cascader">
              <el-cascader
                  v-model="mapControlVariable.location_by_pollutant_value3"
                  :options="cascaderData"
                  style="width: 100%"
              ></el-cascader>
            </div>

            <div class="pollutant-cascader">
              <el-cascader
                  v-model="mapControlVariable.location_by_pollutant_value4"
                  :options="cascaderData"
                  style="width: 100%"
              ></el-cascader>
            </div>

          </el-form-item>

        </el-form>

        <el-form
            label-position="top"
            label-width="120px"
            class="demo-ruleForm"
            size="mini"

        >
          <el-form-item v-show="mapControlVariable.select_by ==='Parameter'" label="Pollutants" prop="Pollutants">
            <div class="pollutant-cascader">

              <el-cascader
                  v-model="mapControlVariable.parameter_by_pollutant_value"
                  :options="cascaderData"
                  style="width: 100%"
              ></el-cascader>

            </div>
          </el-form-item>

          <el-form-item
              v-show="mapControlVariable.select_by ==='Parameter' && mapControlVariable.is_parameter_by_pollutant_value_stationData===false"
              label="Select Locations" prop="Locations">

            <!--            <el-radio-group v-model="radio4" size="mini" disabled>-->
            <!--              <el-radio label="1" border>Option A</el-radio>-->
            <!--              <el-radio label="2" border>Option B</el-radio>-->
            <!--              -->
            <!--            </el-radio-group>-->

            <el-radio-group v-model="mapControlVariable.radioValue">
              <el-radio :label="1" name="radio1" style="width: 100%">
                <selectLocation :isDisable="mapControlVariable.radioValue=='1'?false:true"

                                :IndexValue="1"
                                :Select_Option_Default_Location="options.default_location">
                </selectLocation>
              </el-radio>
              <el-radio :label="2" name="radio1" style="width: 100%">
                <selectLocation :isDisable="mapControlVariable.radioValue=='2'?false:true"
                                :IndexValue="2"
                                :Select_Option_Default_Location="options.default_location">
                </selectLocation>
              </el-radio>
              <el-radio :label="3" name="radio1" style="width: 100%">
                <selectLocation :isDisable="mapControlVariable.radioValue=='3'?false:true"
                                :IndexValue="3"
                                :Select_Option_Default_Location="options.default_location">
                </selectLocation>
              </el-radio>
              <el-radio :label="4" name="radio1" style="width: 100%">
                <selectLocation :isDisable="mapControlVariable.radioValue=='4'?false:true"
                                :IndexValue="4"
                                :Select_Option_Default_Location="options.default_location">
                </selectLocation>
              </el-radio>
            </el-radio-group>


          </el-form-item>

          <el-form-item
              v-show="mapControlVariable.select_by ==='Parameter' && mapControlVariable.is_parameter_by_pollutant_value_stationData===true"
              label="Select Stations" prop="station">

            <!--            <el-radio-group v-model="radio4" size="mini" disabled>-->
            <!--              <el-radio label="1" border>Option A</el-radio>-->
            <!--              <el-radio label="2" border>Option B</el-radio>-->
            <!--              -->
            <!--            </el-radio-group>-->

            <div class="pollutant-cascader">
              <el-select v-model="mapControlVariable.parameter_by_pollutant_value_stationData_val1"
                         placeholder="Select station"
                         style="width: 100%">

                <el-option
                    v-for="item in options.ObservationStationOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                >
                </el-option>
              </el-select>

            </div>
            <div class="pollutant-cascader">
              <el-select v-model="mapControlVariable.parameter_by_pollutant_value_stationData_val2"
                         placeholder="Select station"
                         style="width: 100%">

                <el-option
                    v-for="item in options.ObservationStationOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </div>
            <div class="pollutant-cascader">
              <el-select v-model="mapControlVariable.parameter_by_pollutant_value_stationData_val3"
                         placeholder="Select station"
                         style="width: 100%">

                <el-option
                    v-for="item in options.ObservationStationOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                >
                </el-option>
              </el-select>

            </div>
            <div class="pollutant-cascader">
              <el-select v-model="mapControlVariable.parameter_by_pollutant_value_stationData_val4"
                         placeholder="Select station"
                         style="width: 100%">

                <el-option
                    v-for="item in options.ObservationStationOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                >
                </el-option>
              </el-select>

            </div>

          </el-form-item>

        </el-form>

        <el-button class="compute-now" type="primary" size="mini" style="width: 100%" @click="computeData">compute
        </el-button>

      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import OLWKT from "ol/format/WKT";
import selectLocation from "./selectLocation";
import {threddDataSource, GeoServerHost} from "../config"
import TimeDimensionTile from "ol-plus/layer/TimeDimensionTile";
import LayerSwitcher from 'ol-plus/ui/LayerSwitcher';
import {AirPollutionWatchApp} from "../utils/dataArchive";
import OlGeoJSON from "ol/format/GeoJSON";
import {getCenter as ol_extent_getCenter} from "ol/extent";
import eventHub from "../utils/utils";

// import {defaultParamter} from "../utils/defaultParamter"
// import {ElLoading} from 'element-plus';
import rgbLegend from '../assets/rgblegend.jpg';
import {Action} from "../store/actionType";
import {Image as ImageLayer} from "ol/layer";
import ImageWMS from "ol/source/ImageWMS";
import Style from "ol/style/Style";
import {Icon} from "ol/style";


export default {
  name: "mapControlsArchive",
  data() {
    return {
      maskCoordinate: null,
      data__layer__initilize__Recent: false,
      data__layer__initilize__Archive: false,
      data__layer__initilize__Forecast: false,
      AirPollutionWatchApp: AirPollutionWatchApp,
      options: {
        data_period: [
          {
            value: 'Recent',
            label: 'Recent',
          },
          {
            value: 'Archive',
            label: 'Archive',
          },
          {
            value: 'Forecast',
            label: 'Forecast',
          }
        ], select_by: [
          {
            value: 'Location',
            label: 'Location',
          },
          {
            value: 'Parameter',
            label: 'Parameter',
          }
        ], location_by: [
          {
            value: 'default_locations',
            label: 'Major Cities',
          },
          {
            value: 'AOI',
            label: 'Select on map',
          }
        ],
        default_location: [],
        ObservationStationOptions: []
      },
      PROXY_PREFIX: Action.Base + '/apps/airqualitynp/WMSProxy/',
    }
  },
  watch: {
    SelectDefaultLocation(newVal, oldVal) {
      if (newVal) {
        // add it to vectorLayer
        let selNewValObj = this.options.default_location.filter(function (x) {
          return newVal == x.value
        })[0];

        let Feature = (new OlGeoJSON()).readFeature(selNewValObj.geoJSON.features[0]);
        Feature.set("SelectBy", "Location");
        Feature.set("LocationBy", "default_location");
        this.WorkingVectorLayer.getSource().addFeature(Feature);

        var view = this.mapObject.getView();
        var resolution = view.getResolutionForExtent(Feature.getGeometry().getExtent(), this.mapObject.getSize());
        var zoom = view.getZoomForResolution(resolution);
        var center = ol_extent_getCenter(Feature.getGeometry().getExtent());
        // redraw before zoom
        setTimeout(function () {
          view.animate({
            center: center,
            zoom: Math.min(zoom, 11)
          });
        }, 100);

        var format = new OLWKT();
        var wktfeaturegeom = format.writeGeometry(Feature.getGeometry(), {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        });
        var geometryType = Feature.getGeometry().getType();

        // let featureExtent = (new OLWKT()).readFeature(wktfeaturegeom);

        // let featureForExtent = (new OlGeoJSON()).readFeature(selNewValObj.geoJSON.features[0]);
        // featureExtent = featureExtent.getGeometry().getExtent();

        this.mapControlVariable.location_by_wktValue = wktfeaturegeom;
        this.mapControlVariable.location_by_geometryType = geometryType;
        this.mapControlVariable.location_by_default_level_value = selNewValObj.label;

      } else {
        this.mapControlVariable.location_by_wktValue = '';
        this.mapControlVariable.location_by_geometryType = '';
        this.mapControlVariable.location_by_default_level_value = '';
      }

      if (oldVal) {
        // remove it from vector layer
        this.WorkingVectorLayer.getSource().getFeatures().forEach((f) => {
          if (f.get("SelectBy") == "Location" && f.get("LocationBy") == "default_location" && f.get("id") == oldVal) {
            this.WorkingVectorLayer.getSource().removeFeature(f);
          }
        });
      }
    },
    SelectLocationBy() {
      this.mapControlVariable.default_location = '';
    },
    async SelectByOption() {

      if (this.mapControlVariable.select_by == "Location") {
        this.WorkingVectorLayer.getSource().getFeatures().forEach((f) => {
          if (f.get("SelectBy") == "Parameter" && f.get("LocationBy") == "default_location") {
            this.WorkingVectorLayer.getSource().removeFeature(f);
          }
        });

        // this.mapControlVariable.parameter_by_pollutant_value = '';

        //remove the layers which are on select by parameter
        this.SetLayerOfSelectByParameterLayer(false);

        let kk = this.getStationInfoObject(11);
        await this.AddLayerToLayerList(kk);

        let jj = this.getStationInfoObject(12);
        await this.AddLayerToLayerList(jj);

        this.mapControlVariable.location_by = 'default_locations';
        this.mapControlVariable.default_location = 1;

        this.mapControlVariable.location_by_pollutant_value1 = [1, 11, 2];
        this.mapControlVariable.location_by_pollutant_value2 = [1, 11, 5];
        this.mapControlVariable.location_by_pollutant_value3 = [1, 12, 6];
        this.mapControlVariable.location_by_pollutant_value4 = [1, 12, 7];

      } else {

        //clear Location
        this.mapControlVariable.location_by_pollutant_value1 = [];
        this.mapControlVariable.location_by_pollutant_value2 = [];
        this.mapControlVariable.location_by_pollutant_value3 = [];
        this.mapControlVariable.location_by_pollutant_value4 = [];

        this.mapControlVariable.parameter_by_pollutant_value = [1, 12];

        // no single default location on parameter
        this.mapControlVariable.default_location = '';

        this.SetLayerOfSelectByParameterLayer(true);
      }

      this.ObservationStationOption();

    },
    async SelectByParameterPollutant(newPollutant, oldPollutant) {

      // set Layer off of old pollutant
      if (oldPollutant) {
        if (oldPollutant.length) {
          let kk = this.getStationInfoObject(oldPollutant[1]);
          if (Object.keys(kk).length != 0) {
            let layer = this.getBindedLayer(kk.layerId);
            layer.setVisibleDivBind(false);
          }
        }
      }

      // Get layer Object
      let kk = this.getStationInfoObject(newPollutant[1]);

      if (this.mapControlVariable.parameter_by_pollutant_value.length) {
        await this.AddLayerToLayerList(kk);
        let layer = this.getBindedLayer(kk.layerId);
        layer.setVisibleDivBind(true);
        //

        // stations data
        if (kk.stationData) {
          this.mapControlVariable.is_parameter_by_pollutant_value_stationData = true;
          this.options.ObservationStationOptions = kk.childrenData;

          this.mapControlVariable.parameter_by_pollutant_value_stationData_val1 = kk.defaultStation[0];
          this.mapControlVariable.parameter_by_pollutant_value_stationData_val2 = kk.defaultStation[1];
          this.mapControlVariable.parameter_by_pollutant_value_stationData_val3 = kk.defaultStation[2];
          this.mapControlVariable.parameter_by_pollutant_value_stationData_val4 = kk.defaultStation[3];

        } else {
          // Data other than station
          this.mapControlVariable.is_parameter_by_pollutant_value_stationData = false;
          this.options.ObservationStationOptions = [];

          // set here default location
          this.mapControlVariable.parameter_by_location__1.location_by = 'default_locations';
          this.mapControlVariable.parameter_by_location__2.location_by = 'default_locations';
          this.mapControlVariable.parameter_by_location__3.location_by = 'default_locations';
          this.mapControlVariable.parameter_by_location__4.location_by = 'default_locations';

          this.mapControlVariable.parameter_by_location__1.default_location = 1;
          this.mapControlVariable.parameter_by_location__2.default_location = 2;
          this.mapControlVariable.parameter_by_location__3.default_location = 3;
          this.mapControlVariable.parameter_by_location__4.default_location = 4;

        }
      }
    },
    location_by_pollutant_value1(newVal, oldVal) {
      this.onChangePollutantsOnSelectByLocation(newVal, oldVal);
    },
    location_by_pollutant_value2(newVal, oldVal) {
      this.onChangePollutantsOnSelectByLocation(newVal, oldVal);
    },
    location_by_pollutant_value3(newVal, oldVal) {
      this.onChangePollutantsOnSelectByLocation(newVal, oldVal);
    },
    location_by_pollutant_value4(newVal, oldVal) {
      this.onChangePollutantsOnSelectByLocation(newVal, oldVal);
    },
  },
  components: {selectLocation},
  methods: {
    ...mapActions(["getCityData", "PostSlicedFromCatalog", "getGeoJsonForOneSatation", "getDefaultGroundObservation"]),
    ...mapMutations(["appendTimeSeriesLayerCollection", "addLegend", "removeLegend"]),
    featureSelectorDeleteUpdate() {
      var wktfeaturegeom, geometryType;
      if (this.selectInteraction) {
        if (this.SelectByOption == 'Location') {
          if (this.selectInteraction.getFeatures().getLength()) {

            var features = this.selectInteraction.getFeatures();
            features.forEach(function (f) {
              var format = new OLWKT();
              wktfeaturegeom = format.writeGeometry(f.getGeometry(), {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
              });
              geometryType = f.getGeometry().getType();
            });
            // let Param = {
            //   geometryType: geometryType,
            //   wkt: wktfeaturegeom,
            // };
            if (this.mapControlVariable.location_by == 'AOI') {
              this.mapControlVariable.is_AOI_Feature_selected = true;
              this.mapControlVariable.location_by_wktValue = wktfeaturegeom;
              this.mapControlVariable.location_by_geometryType = geometryType;
            } else {
              this.$notify({
                title: 'Warning',
                message: "To select this feature you need to select 'Select on map' from drop down menu",
                type: 'warning'
              });
              this.selectInteraction.getFeatures().clear();
              this.mapControlVariable.is_AOI_Feature_selected = false;
              this.mapControlVariable.location_by_wktValue = '';
              this.mapControlVariable.location_by_geometryType = '';
            }
          } else {
            if (this.mapControlVariable.location_by == 'AOI') {
              this.mapControlVariable.is_AOI_Feature_selected = false;
              this.mapControlVariable.location_by_wktValue = '';
              this.mapControlVariable.location_by_geometryType = '';
            }
          }
        }
      }
    },
    CatalogSlicingParam(url, startDate, endDate) {
      let param = {
        url: url,
        data_ext: '.nc',
        startDate: startDate,
        endDate: endDate,
      }
      return param
    },
    async addRasterLayerToMap(kk) {
      let slicingParam, responseData, resPonseParsed, wmsList = [], isTrue;
      let catalogURl = threddDataSource + kk.catalog;
      slicingParam = this.CatalogSlicingParam(catalogURl, kk.getStartDate(), kk.getEndDate());
      responseData = await this.PostSlicedFromCatalog(slicingParam);
      resPonseParsed = responseData;
      isTrue = resPonseParsed.data.length;
      if (isTrue) {
        resPonseParsed.data.forEach(function (fileName) {
          let url = catalogURl.replace("/catalog/", "/wms/").replace("catalog.xml", fileName);
          wmsList.push(url)
        });
      }

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
            title: kk.threddLayerProp.title,
            typeGeom: 'Point',
            style: new Style({
              image: new Icon({
                src: kk.threddLayerProp.legendPath,
                crossOrigin: 'anonymous', // Enable print
              })
            }),
            size: [60, 30]
          };

          let timedimensionTilePara = kk.threddLayerProp;
          timedimensionTilePara.source.params.SLD_BODY = SLD;
          timedimensionTilePara.source.url = wmsList;
          timedimensionTilePara.legendPath = rgbLegend;
          timedimensionTilePara.wmsList = wmsList;
          timedimensionTilePara.changeWMSProxy = true;
          // timedimensionTilePara.showAnimationButton = true;
          // timedimensionTilePara.animationGIFFunction = this.downloadAnimation;
          timedimensionTilePara.OLEXTLegendObject = OLEXTLegendObject;
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
            l5.setVisibleDivBind(kk.VisibleDivBind);
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
    },

    computeData() {
      if (this.mapControlVariable.select_by == "Parameter") {
        if (this.mapControlVariable.parameter_by_pollutant_value.length) {
          let kk = this.getStationInfoObject(this.mapControlVariable.parameter_by_pollutant_value[1]);
          if (kk.stationData) {
            if (this.mapControlVariable.parameter_by_pollutant_value_stationData_val1 && this.mapControlVariable.parameter_by_pollutant_value_stationData_val2 && this.mapControlVariable.parameter_by_pollutant_value_stationData_val3 && this.mapControlVariable.parameter_by_pollutant_value_stationData_val4) {
              eventHub.$emit('getVisualization');
            } else {
              this.$notify({
                title: 'Warning',
                message: 'Please select station on all dropdown menu.',
                type: 'warning'
              });
            }
          } else {
            if (this.mapControlVariable.parameter_by_location__1.wktValue && this.mapControlVariable.parameter_by_location__2.wktValue && this.mapControlVariable.parameter_by_location__3.wktValue && this.mapControlVariable.parameter_by_location__4.wktValue) {
              eventHub.$emit('getVisualization');
            } else {
              this.$notify({
                title: 'Warning',
                message: 'Please select locations on all dropdown menu.',
                type: 'warning'
              });
            }
          }
        } else {
          this.$notify({
            title: 'Warning',
            message: 'Please Select a pollutant',
            type: 'warning'
          });
        }
      } else {
        if (this.location_by_pollutant_value1.length > 0 && this.location_by_pollutant_value2.length > 0 && this.location_by_pollutant_value3.length > 0 && this.location_by_pollutant_value4.length > 0) {
          eventHub.$emit('getVisualization');
        } else {
          this.$notify({
            title: 'Warning',
            message: 'Please select pollutants on all dropdown menu.',
            type: 'warning'
          });
        }
      }
    },
    ObservationStationOption() {
      if (this.mapControlVariable.select_by == "Parameter") {
        this.AirPollutionWatchApp.cascaderObj.forEach((obj1) => {
          obj1.children.forEach((obj2) => {
            if (obj2.children) {
              delete obj2.children;
            }
          });
        });
      } else {
        this.AirPollutionWatchApp.cascaderObj.forEach((obj1) => {
          obj1.children.forEach((obj2) => {
            if (obj2.childrenData) {
              obj2.children = obj2.childrenData;
            }
          });
        });
      }
    },
    getStationInfoObject(stationObjectValue) {
      let interestedObje = {};
      this.AirPollutionWatchApp.cascaderObj.filter((obj1) => {
        return obj1.children.filter((obj2) => {
          if (obj2.value == stationObjectValue) {
            interestedObje = obj2;
          }
          return obj2.value == stationObjectValue
        }).length > 0 ? true : false;
      });
      return interestedObje;
    },
    SetLayerOfSelectByParameterLayer(IsViz) {
      if (this.mapControlVariable.parameter_by_pollutant_value.length) {
        let kk = this.getStationInfoObject(this.mapControlVariable.parameter_by_pollutant_value[1]);
        let layer = this.getBindedLayer(kk.layerId);
        if (IsViz) {
          layer.setVisibleDivBind(IsViz);
        } else {
          layer.setVisibleDivBind(IsViz);
        }
      }
    },
    setLayerVisible(layerId, IsViz) {
      let layer = this.getBindedLayer(layerId);
      if (IsViz) {
        layer.setVisible(IsViz);
      } else {
        layer.setVisibleDivBind(IsViz);
      }
    },
    async onChangePollutantsOnSelectByLocation(newVal, oldVal) {

      if (newVal.length) {
        let kk = this.getStationInfoObject(newVal[1]);
        if (Object.keys(kk).length != 0) {
          await this.AddLayerToLayerList(kk);
          let layer = this.getBindedLayer(kk.layerId);
          layer.setVisibleDivBind(true);
        }
      }
      if (oldVal.length) {
        let count = 0;
        if (this.location_by_pollutant_value1.length) {
          if (this.location_by_pollutant_value1[1] == oldVal[1]) {
            count = count + 1
          }
        }
        if (this.location_by_pollutant_value2.length) {
          if (this.location_by_pollutant_value2[1] == oldVal[1]) {
            count = count + 1
          }
        }
        if (this.location_by_pollutant_value3.length) {
          if (this.location_by_pollutant_value3[1] == oldVal[1]) {
            count = count + 1
          }
        }
        if (this.location_by_pollutant_value4.length) {
          if (this.location_by_pollutant_value4[1] == oldVal[1]) {
            count = count + 1
          }
        }
        if (count === 0) {
          let kk = this.getStationInfoObject(oldVal[1]);
          if (Object.keys(kk).length != 0) {
            let layer = this.getBindedLayer(kk.layerId);
            layer.setVisibleDivBind(false);
          }
        }
      }
      console.log(newVal);
      console.log(oldVal);
    },
    async AddLayerToLayerList(kk) {

      if (kk.layerProperties.initilize == false) {
        kk.layerProperties.initilize = true;
        if (kk.stationData == true) {
          let GeoServerWMSURL = GeoServerHost + '/geoserver/AirQuality/wms';

          let WMSURLWithRequestParameter = GeoServerWMSURL + '?request=GetLegendGraphic&version=1.1.1&format=image/png&width=20&height=20&layer='
          let lyr = kk.layerProperties.layer;
          let le = {
            id: kk.layerProperties.id,
            title: kk.layerProperties.title,
            typeGeom: 'Point',
            style: new Style({
              image: new Icon({
                src: WMSURLWithRequestParameter + lyr,
                crossOrigin: 'anonymous' // Enable print
              })
            }),
             size: [60, 30]
          };
          let layerObj = new ImageLayer({
            id: kk.layerProperties.id,
            title: kk.layerProperties.title,
            visible: kk.layerProperties.visible,
            legendPath: WMSURLWithRequestParameter + lyr,
            zIndex: kk.layerProperties.zIndex,
            OLEXTLegendObject: le,
            opacity: kk.layerProperties.opacity,
            source: new ImageWMS({
              url: GeoServerWMSURL,
              crossOrigin: 'anonymous',
              params: {'LAYERS': lyr},
              serverType: 'geoserver',
            }),
          });
          let AddRemoveLegendFunction = function () {
            if (this.getProperties().visible) {
              that.addLegend(this.getProperties().OLEXTLegendObject);
            } else {
              that.removeLegend(this.getProperties().OLEXTLegendObject);
            }
          };
          let that = this;
          layerObj.on('change:visible', AddRemoveLegendFunction);

          this.mapObject.addLayer(layerObj);
          let l5 = new LayerSwitcher(".layerCollection", layerObj, false, false);
          this.appendTimeSeriesLayerCollection(l5);
          l5.setVisibleDivBind(kk.layerProperties.visible);
          let sd = this.AirPollutionWatchApp.formatDate(this.AirPollutionWatchApp.startDate);
          let ed = this.AirPollutionWatchApp.formatDate(this.AirPollutionWatchApp.endDate);
          let regionOrCountry = 0;
          let Param = '?ModelClass=' + kk.ModelClass + "&ModelClassDataList=" + kk.ModelClassDataList + '&typeName=' + kk.typeName + '&StartDate=' + sd + '&EndDate=' + ed + '&rid=' + regionOrCountry
          let dataResponse = await this.getGeoJsonForOneSatation(Param);
          kk.childrenData = dataResponse.data;
        } else {
          console.log("before-----");
          await this.addRasterLayerToMap(kk.layerProperties);
          // await this.addRasterLayerToMap(kk.layerProperties);
          console.log("after-----");
        }
      }
    },
    InitilizeStationDataOnLoad() {
      this.AirPollutionWatchApp.cascaderObj.forEach((obj1) => {
        obj1.children.forEach((obj2) => {
          if (obj2.stationData) {
            this.AddLayerToLayerList(obj2);
          }
        });
      });
    },
  },
  computed: {
    ...mapState(["selectInteraction", "mapObject", "TimeSeriesLayerCollection", "WorkingVectorLayer", "mapControlVariable"]),
    ...mapGetters(["getBindedLayer", "getLayer"]),
    cascaderData() {
      return this.AirPollutionWatchApp.cascaderObj;
    },
    SelectDefaultLocation() {
      return this.mapControlVariable.default_location;
    },
    SelectLocationBy() {
      return this.mapControlVariable.location_by;
    },
    SelectByOption() {
      return this.mapControlVariable.select_by;
    },
    SelectDataPeriod() {
      return this.mapControlVariable.data_period;
    },
    SelectByParameterPollutant() {
      return this.mapControlVariable.parameter_by_pollutant_value;
    },
    location_by_pollutant_value1() {
      return this.mapControlVariable.location_by_pollutant_value1;
    },
    location_by_pollutant_value2() {
      return this.mapControlVariable.location_by_pollutant_value2;
    },
    location_by_pollutant_value3() {
      return this.mapControlVariable.location_by_pollutant_value3;
    },
    location_by_pollutant_value4() {
      return this.mapControlVariable.location_by_pollutant_value4;
    },
  },
  async mounted() {

    setTimeout(() => {
      this.mapControlVariable.parameter_by_pollutant_value = [1, 12];
    }, 500);
    this.addRasterLayerToMap(this.AirPollutionWatchApp.TrueColorImage);

    setTimeout(() => {
      this.selectInteraction.on('select', () => {
        this.featureSelectorDeleteUpdate();
      });
    }, 2000);
    // this.addLayersToMap();
    //
    // console.log("all complete");
    //
    // this.mapControlVariable.select_by = 'Parameter';
    // this.mapControlVariable.parameter_by_pollutant_value = [1, 13];

    setTimeout(() => {
      this.computeData();
      this.InitilizeStationDataOnLoad();
    }, 3000);

  },
  async created() {
    let sdt = this.AirPollutionWatchApp.formatDate(this.AirPollutionWatchApp.startDate);
    let edt = this.AirPollutionWatchApp.formatDate(this.AirPollutionWatchApp.endDate);

    let defalultSt = await this.getDefaultGroundObservation({
      typeName: 'pm',
      startDate: sdt,
      endDate: edt,
    });

    this.AirPollutionWatchApp.cascaderObj.forEach((obj1) => {
      obj1.children.forEach((obj2) => {
        if (obj2.ModelClass == 'UsEmbassyPm') {
          obj2.defaultStation = defalultSt.defaultStation
        }
      })
    });


    let defaultLocation = await this.getCityData();
    this.options.default_location = defaultLocation.data;
  },
  deactivated() {

  }

}
</script>

<style scoped>
.feature-selected {
  color: #67C23A;
  border: 1px solid #67C23A5C;
  border-radius: 5px;
  padding: 0px 5px;
  text-align: center;
}

.no-feature-selected {
  color: #E6A23C;
  border: 1px solid #e6a23c5c;
  border-radius: 5px;
  padding: 0px 5px;
  text-align: center;
}

.pollutant-cascader:not(:last-child) {
  padding-bottom: 10px;
}

.body-container {
  height: calc(100% - 50px);
}

button.el-button.el-button--primary.el-button--mini.compute-now, button.el-button.el-button--primary.el-button--mini.compute-now:focus, button.el-button.el-button--primary.el-button--mini.compute-now:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

</style>