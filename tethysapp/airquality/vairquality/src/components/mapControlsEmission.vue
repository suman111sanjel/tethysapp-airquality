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
          <el-form-item label="Data Period" prop="data_period">
            <el-select v-model="mapControlVariable.data_period" placeholder="Data Period"
                       style="width: 100%">
              <el-option
                  v-for="item in options.data_period"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </el-form-item>

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

        <el-button type="primary" size="mini" style="width: 100%" @click="computeData">compute</el-button>

      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import OLWKT from "ol/format/WKT";
import selectLocation from "./selectLocation";
import {threddDataSource} from "../config"
import TimeDimensionTile from "ol-plus/layer/TimeDimensionTile";
import LayerSwitcher from 'ol-plus/ui/LayerSwitcher';
import {AirPollutionWatchApp} from "../utils/data";
import OlVectorLayer from "ol/layer/Vector";
import OlVectorSource from "ol/source/Vector";
import OlGeoJSON from "ol/format/GeoJSON";
import {getCenter as ol_extent_getCenter} from "ol/extent";
import eventHub from "../utils/utils";

import {defaultParamter} from "../utils/defaultParamter"
import {ElLoading} from 'element-plus';
import rgbLegend from '../assets/rgblegend.jpg';
import usembassyPm2p5 from '../assets/usembassyPm2p5.jpg';
import AODAeroNet from '../assets/AODAeroNet.jpg';

export default {
  name: "mapControlsEmission",
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
    }
  },
  watch: {
    async SelectDataPeriod() {
      if (this.mapControlVariable.data_period == "Recent") {
        this.AirPollutionWatchApp.startDate = new Date();
        this.AirPollutionWatchApp.startDate.setDate(this.AirPollutionWatchApp.startDate.getDate() - 1);
        this.AirPollutionWatchApp.endDate = new Date();

      } else if (this.mapControlVariable.data_period == "Archive") {

        this.AirPollutionWatchApp.startDate = new Date();
        this.AirPollutionWatchApp.startDate.setDate(this.AirPollutionWatchApp.startDate.getDate() - 8);
        this.AirPollutionWatchApp.endDate = new Date();
        this.AirPollutionWatchApp.endDate.setDate(this.AirPollutionWatchApp.endDate.getDate() - 1);

      } else {
        this.AirPollutionWatchApp.forecastDate = new Date();
        this.AirPollutionWatchApp.forecastDate.setDate(this.AirPollutionWatchApp.forecastDate.getDate() - 1);

      }
      await this.addLayersToMap();
      console.log("-----------------kkkk-------------------------");
      if (this.mapControlVariable.data_period == "Recent") {
        //  set defaults
        this.mapControlVariable.select_by = "Parameter";
        let recentPollutant = [1, 12];
        this.mapControlVariable.parameter_by_pollutant_value = recentPollutant;
        let kk = this.getStationInfoObject(recentPollutant[1]);
        this.mapControlVariable.parameter_by_pollutant_value_stationData_val1 = kk.defaultStation[0];
        this.mapControlVariable.parameter_by_pollutant_value_stationData_val2 = kk.defaultStation[1];
        this.mapControlVariable.parameter_by_pollutant_value_stationData_val3 = kk.defaultStation[2];
        this.mapControlVariable.parameter_by_pollutant_value_stationData_val4 = kk.defaultStation[3];
        // this.setLayerVisible(kk.layerId, true);

      } else if (this.mapControlVariable.data_period == "Archive") {
        //  set defaults
        this.mapControlVariable.select_by = "Parameter";
        let recentPollutant = [1, 12]
        this.mapControlVariable.parameter_by_pollutant_value = recentPollutant;
        let kk = this.getStationInfoObject(recentPollutant[1]);
        this.mapControlVariable.parameter_by_pollutant_value_stationData_val1 = kk.defaultStation[0];
        this.mapControlVariable.parameter_by_pollutant_value_stationData_val2 = kk.defaultStation[1];
        this.mapControlVariable.parameter_by_pollutant_value_stationData_val3 = kk.defaultStation[2];
        this.mapControlVariable.parameter_by_pollutant_value_stationData_val4 = kk.defaultStation[3];
        // this.setLayerVisible(kk.layerId, true);
      } else {
        //  set defaults
        this.mapControlVariable.select_by = "Parameter";
        let recentPollutant = [1, 13];
        this.mapControlVariable.parameter_by_pollutant_value = recentPollutant;
        // let kk = this.getStationInfoObject(recentPollutant[1]);
        // this.setLayerVisible(kk.layerId, true);

      }


    },
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

      } else {
        this.mapControlVariable.location_by_wktValue = '';
        this.mapControlVariable.location_by_geometryType = '';
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
    SelectByOption() {

      if (this.mapControlVariable.select_by == "Location") {
        this.WorkingVectorLayer.getSource().getFeatures().forEach((f) => {
          if (f.get("SelectBy") == "Parameter" && f.get("LocationBy") == "default_location") {
            this.WorkingVectorLayer.getSource().removeFeature(f);
          }
        });

        // this.mapControlVariable.parameter_by_pollutant_value = '';

        //remove the layers which are on select by parameter
        this.SetLayerOfSelectByParameterLayer(false);

        if (this.mapControlVariable.data_period == "Recent") {
          this.mapControlVariable.location_by_pollutant_value1 = [1, 12, 6];
          this.mapControlVariable.location_by_pollutant_value2 = [1, 12, 4];
          this.mapControlVariable.location_by_pollutant_value3 = [1, 12, 2];
          this.mapControlVariable.location_by_pollutant_value4 = [1, 12, 8];
        } else if (this.mapControlVariable.data_period == "Archive") {


          this.mapControlVariable.location_by = 'default_locations';
          this.mapControlVariable.default_location = 1;
          this.mapControlVariable.location_by_pollutant_value1 = [1, 12, 6];
          this.mapControlVariable.location_by_pollutant_value2 = [1, 12, 4];
          this.mapControlVariable.location_by_pollutant_value3 = [1, 12, 2];
          this.mapControlVariable.location_by_pollutant_value4 = [1, 12, 8];
        } else {
          this.mapControlVariable.location_by = 'default_locations';
          this.mapControlVariable.default_location = 1;
          this.mapControlVariable.location_by_pollutant_value1 = [1, 13];
          this.mapControlVariable.location_by_pollutant_value2 = [2, 22];
          this.mapControlVariable.location_by_pollutant_value3 = [3, 32];
          this.mapControlVariable.location_by_pollutant_value4 = [4, 42];
        }
      } else {

        if (this.mapControlVariable.data_period == "Recent") {
          this.mapControlVariable.parameter_by_pollutant_value = [1, 12];
        } else if (this.mapControlVariable.data_period == "Archive") {
          this.mapControlVariable.parameter_by_pollutant_value = [1, 12];
        } else {
          this.mapControlVariable.parameter_by_pollutant_value = [1, 13];
        }

        // no single default location on parameter
        this.mapControlVariable.default_location = '';

        this.SetLayerOfSelectByParameterLayer(true);
      }

      this.ObservationStationOption();

    },
    async SelectByParameterPollutant(newPollutant, oldPollutant) {

      if (oldPollutant) {
        if (oldPollutant.length) {
          let kk = this.getStationInfoObject(oldPollutant[1]);
          if (Object.keys(kk).length != 0) {
            let layer = this.getBindedLayer(kk.layerId);
            layer.setVisibleDivBind(false);
          }
        }
      }
      let kk = this.getStationInfoObject(newPollutant[1]);
      if (this.mapControlVariable.parameter_by_pollutant_value.length) {
        let layer = this.getBindedLayer(kk.layerId);
        console.log("newPollutant");
        console.log(newPollutant);
        layer.setVisibleDivBind(true);
        if (kk.stationData) {
          this.mapControlVariable.is_parameter_by_pollutant_value_stationData = true;
          this.options.ObservationStationOptions = kk.childrenData;
        } else {
          this.mapControlVariable.is_parameter_by_pollutant_value_stationData = false;
          this.options.ObservationStationOptions = [];
        }
      }
      if (kk.stationData) {
        this.mapControlVariable.parameter_by_pollutant_value_stationData_val1 = kk.defaultStation[0];
        this.mapControlVariable.parameter_by_pollutant_value_stationData_val2 = kk.defaultStation[1];
        this.mapControlVariable.parameter_by_pollutant_value_stationData_val3 = kk.defaultStation[2];
        this.mapControlVariable.parameter_by_pollutant_value_stationData_val4 = kk.defaultStation[3];
      } else {
        //  forecast
        this.mapControlVariable.is_parameter_by_pollutant_value_stationData = false;
        this.mapControlVariable.parameter_by_location__1.location_by = 'default_locations';
        this.mapControlVariable.parameter_by_location__2.location_by = 'default_locations';
        this.mapControlVariable.parameter_by_location__3.location_by = 'default_locations';
        this.mapControlVariable.parameter_by_location__4.location_by = 'default_locations';

        this.mapControlVariable.parameter_by_location__1.default_location = 1;
        this.mapControlVariable.parameter_by_location__2.default_location = 2;
        this.mapControlVariable.parameter_by_location__3.default_location = 3;
        this.mapControlVariable.parameter_by_location__4.default_location = 4;

        eventHub.$emit('SelectByParameterDefaultLocation');
      }


    },
    location_by_pollutant_value1(newVal, oldVal) {
      this.onChangePollutantsOnSelectByLocation(newVal, oldVal);
    }, location_by_pollutant_value2(newVal, oldVal) {
      this.onChangePollutantsOnSelectByLocation(newVal, oldVal);
    }, location_by_pollutant_value3(newVal, oldVal) {
      this.onChangePollutantsOnSelectByLocation(newVal, oldVal);
    }, location_by_pollutant_value4(newVal, oldVal) {
      this.onChangePollutantsOnSelectByLocation(newVal, oldVal);
    },
  },
  components: {selectLocation},
  methods: {
    ...mapActions(["getCityData", "PostSlicedFromCatalog", "getGeoJsonForOneSatation"]),
    ...mapMutations(["appendTimeSeriesLayerCollection"]),
    changeDataPeriod() {


    },
    featureSelectorDeleteUpdate() {
      var wktfeaturegeom, geometryType;
      if (this.selectInteraction) {
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
          let Param = {
            geometryType: geometryType,
            wkt: wktfeaturegeom,
          };
          console.log(Param);
          if (this.mapControlVariable.location_by == 'AOI') {
            this.mapControlVariable.is_AOI_Feature_selected = true;
            this.parameter_by_location.wktValue = wktfeaturegeom;
            this.parameter_by_location.geometryType = geometryType;
          }

        } else {
          if (this.mapControlVariable.location_by == 'AOI') {
            this.mapControlVariable.is_AOI_Feature_selected = false;
            this.parameter_by_location.wktValue = '';
            this.parameter_by_location.geometryType = '';
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
    async addRasterLayerToMap(kk, resolve) {
      let slicingParam, responseData, resPonseParsed, wmsList = [], isTrue;
      let catalogURl = threddDataSource + kk.catalog;
      if (this.mapControlVariable.data_period != "Forecast") {
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
      } else {
        wmsList = await this.AirPollutionWatchApp.getForecastWMSList(catalogURl);
        isTrue = wmsList.length;
        console.log(isTrue)
      }
      if (isTrue) {
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
            let timedimensionTilePara = kk.threddLayerProp;
            timedimensionTilePara.source.params.SLD_BODY = SLD;
            timedimensionTilePara.source.url = wmsList;
            timedimensionTilePara.legendPath = rgbLegend;
            timedimensionTilePara.wmsList = wmsList;
            timedimensionTilePara.changeWMSProxy = true;
            // timedimensionTilePara.showAnimationButton = true;
            // timedimensionTilePara.animationGIFFunction = this.downloadAnimation;
            Newlayer = new TimeDimensionTile(timedimensionTilePara);
            await Newlayer.init().then((val) => {
              this.mapObject.addThreddsLayer(val);
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
              resolve();
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
            Newlayer = new TimeDimensionTile(timedimensionTilePara);
            await Newlayer.init().then((val) => {
              this.mapObject.addThreddsLayer(val);
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
              resolve();
            });
          }
        }
        kk.isDataThere = true;
      } else {
        kk.isDataThere = false;
      }
    },

    async addVectorLayerToMap(obj1, obj2, resolve) {
      let sd = this.AirPollutionWatchApp.formatDate(this.AirPollutionWatchApp.startDate);
      let ed = this.AirPollutionWatchApp.formatDate(this.AirPollutionWatchApp.endDate);
      let regionOrCountry = 0;
      let Param = '?ModelClass=' + obj2.ModelClass + "&ModelClassDataList=" + obj2.ModelClassDataList + '&typeName=' + obj2.typeName + '&StartDate=' + sd + '&EndDate=' + ed + '&rid=' + regionOrCountry
      let GeoJSON = await this.getGeoJsonForOneSatation(Param);
      let GeoJSONParse = GeoJSON;
      obj2.childrenData = [];
      GeoJSONParse.features.forEach(function (objFeature) {
        let stationOnCascaderObject = {
          label: objFeature.properties.name,
          value: objFeature.properties.id, folder_name: objFeature.properties.folder_name
        };
        obj2.childrenData.push(stationOnCascaderObject);
      });
      if (GeoJSONParse.features.length) {
        obj2.isDatathere = true;
        let legendPathImage = obj2.value == 11 ? AODAeroNet : usembassyPm2p5;
        var VectorLayer = new OlVectorLayer({
          id: obj2.layerId,
          title: obj2.label,
          visible: false,
          legendPath: legendPathImage,
          selId: [],
          source: new OlVectorSource({
            features: (new OlGeoJSON()).readFeatures(GeoJSONParse),
          }),
          style: obj2.styleFunction,
          zIndex: 22
        });
        this.mapObject.addLayer(VectorLayer);
        let l3 = new LayerSwitcher(".layerCollection", VectorLayer, false);
        l3.setVisibleDivBind(false);
        this.appendTimeSeriesLayerCollection(l3);
      } else {
        obj2.isDatathere = false;
      }
      resolve();
    },
    ClearWMSWithNoDataAndVectorDatawithNodata() {
      // for clearing wms with no data on data base
      this.AirPollutionWatchApp.LayerCollectionObjet[this.mapControlVariable.data_period].data.forEach((value) => {
        let id = value.threddLayerProp.id;
        let isDatathere = value.isDataThere;
        this.AirPollutionWatchApp.cascaderObject[this.mapControlVariable.data_period].data.reduce(function (total, currentValue) {
          let dd = currentValue.children.filter(function (currentValue1) {
            if (currentValue1.layerId === id) {
              if (isDatathere === false) {
                return false
              } else {
                return true
              }
            } else {
              return true
            }
          });
          currentValue.children = dd;
        }, 0)
        this.AirPollutionWatchApp.cascaderObject[this.mapControlVariable.data_period].data.reduce(function (total, currentValue, currentIndex, arr) {
          if (!currentValue.children.length) {
            arr.splice(currentIndex, 1);
          }
        }, 0);
      });

      // for clearing vector data with no data
      this.AirPollutionWatchApp.cascaderObject[this.mapControlVariable.data_period].data.reduce(function (total, currentValue, currentIndex, arr) {
        let dd = currentValue.children.filter(function (currentValue1) {
          if (currentValue1.stationData === true && currentValue1.isDatathere === false) {
            return false
          } else {
            return true
          }
        });
        currentValue.children = dd;
        if (!currentValue.children.length) {
          arr.splice(currentIndex, 1);
        }
      }, 0);

    },
    enableTrueColorMap() {
      this.TimeSeriesLayerCollection.forEach((val) => {
        let id = val.getProperties().id;
        if (id.split("__")[0].toUpperCase() == this.mapControlVariable.data_period.toUpperCase()) {
          if (id == this.mapControlVariable.data_period + "__TerraModisTrueColor") {
            val.setVisibleDivBind(true);
          } else {
            val.setVisibleDivBind(false);
          }
        } else {
          val.setVisibleDivBind(false);
        }
      });
    },
    async addLayersToMap() {
      var that = this;
      let aa = "data__layer__initilize__" + that.mapControlVariable.data_period;

      if (that[aa] == false) {
        const loading = ElLoading.service({
          lock: true,
          text: 'Loading ' + that.mapControlVariable.data_period + " data.....",
          background: 'rgba(0, 0, 0, 0.7)',
        });
        var PromiseListRasterData = [];
        for (let kk of this.AirPollutionWatchApp.LayerCollectionObjet[this.mapControlVariable.data_period].data) {
          let al1 = new Promise((resolve) => {
            setTimeout(this.addRasterLayerToMap, 1, kk, resolve);
          });
          PromiseListRasterData.push(al1);
        }
        // var PromiseListVectorData = [];
        for (let obj1 of this.AirPollutionWatchApp.cascaderObject[this.mapControlVariable.data_period].data) {
          for (let obj2 of obj1.children) {
            if (obj2.stationData == true) {
              let al2 = new Promise((resolve) => {
                setTimeout(this.addVectorLayerToMap, 1, obj1, obj2, resolve);
              });
              // PromiseListVectorData.push(al2);
              PromiseListRasterData.push(al2);
            }
          }
        }
        console.log("------------------Before promise-----------------");
        await Promise.all(PromiseListRasterData).then(() => {
          this.enableTrueColorMap();
          this.ClearWMSWithNoDataAndVectorDatawithNodata();
          that[aa] = true;
          this.ObservationStationOption();
          console.log("------------------Inside promise-----------------");
          loading.close();
        });
      } else {
        this.enableTrueColorMap();
      }
    },
    computeData() {
      if (this.mapControlVariable.data_period === "Recent") {
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
      } else if (this.mapControlVariable.data_period === "Archive") {

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

      } else {

        if (this.mapControlVariable.select_by == "Parameter") {
          if (this.mapControlVariable.parameter_by_pollutant_value.length) {
            if (this.mapControlVariable.parameter_by_location__1.wktValue && this.mapControlVariable.parameter_by_location__2.wktValue && this.mapControlVariable.parameter_by_location__3.wktValue && this.mapControlVariable.parameter_by_location__4.wktValue) {
              eventHub.$emit('getVisualization');
            } else {
              this.$notify({
                title: 'Warning',
                message: 'Please select locations on all dropdown menu.',
                type: 'warning'
              });
            }

          } else {
            this.$notify({
              title: 'Warning',
              message: 'Please Select a pollutant',
              type: 'warning'
            });
          }
        } else {
          if (this.location_by_pollutant_value1.length > 0 && this.location_by_pollutant_value2.length > 0 && this.location_by_pollutant_value3.length > 0 && this.location_by_pollutant_value4.length > 0 && this.mapControlVariable.location_by_wktValue) {
            eventHub.$emit('getVisualization');
          } else {


            this.$notify({
              title: 'Warning',
              message: 'Please select pollutants on all dropdown menu.',
              type: 'warning'
            });
          }
        }

      }


    },
    ObservationStationOption() {
      if (this.mapControlVariable.select_by == "Parameter") {
        this.AirPollutionWatchApp.cascaderObject[this.mapControlVariable.data_period].data.forEach((obj1) => {
          obj1.children.forEach((obj2) => {
            if (obj2.children) {
              delete obj2.children;
            }
          });
        });
      } else {
        this.AirPollutionWatchApp.cascaderObject[this.mapControlVariable.data_period].data.forEach((obj1) => {
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
      this.AirPollutionWatchApp.cascaderObject[this.mapControlVariable.data_period].data.filter((obj1) => {
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
    onChangePollutantsOnSelectByLocation(newVal, oldVal) {
      if (newVal.length) {
        let kk = this.getStationInfoObject(newVal[1]);
        if (Object.keys(kk).length != 0) {
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
      console.log(newVal)
      console.log(oldVal)
    },
  },
  computed: {
    ...mapState(["selectInteraction", "mapObject", "TimeSeriesLayerCollection", "WorkingVectorLayer", "mapControlVariable"]),
    ...mapGetters(["getBindedLayer", "getLayer"]),
    cascaderData() {
      return this.AirPollutionWatchApp.cascaderObject[this.mapControlVariable.data_period].data;
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
    let defaultLocation = await this.getCityData();
    this.options.default_location = defaultLocation.data;

    this.selectInteraction.on('select', () => {
      this.featureSelectorDeleteUpdate();
    });
    await this.addLayersToMap();

    console.log("all complete");

    this.mapControlVariable.select_by = defaultParamter[this.mapControlVariable.data_period].select_by;
    this.mapControlVariable.parameter_by_pollutant_value = defaultParamter[this.mapControlVariable.data_period].parameter_by_pollutant_value;
    setTimeout(() => {
      //   this.mapControlVariable.parameter_by_pollutant_value_stationData_val1 = defaultParamter[this.mapControlVariable.data_period].parameter_by_pollutant_value_stationData_val1;
      //   this.mapControlVariable.parameter_by_pollutant_value_stationData_val2 = defaultParamter[this.mapControlVariable.data_period].parameter_by_pollutant_value_stationData_val2;
      //   this.mapControlVariable.parameter_by_pollutant_value_stationData_val3 = defaultParamter[this.mapControlVariable.data_period].parameter_by_pollutant_value_stationData_val3;
      //   this.mapControlVariable.parameter_by_pollutant_value_stationData_val4 = defaultParamter[this.mapControlVariable.data_period].parameter_by_pollutant_value_stationData_val4;
      this.computeData();
    }, 100);
  },
  created() {
    if (this.mapControlVariable.data_period === 'Recent') {
      console.log("Recent");
    } else if (this.dataPeriod === 'Archive') {
      console.log("Archive");
    } else {
      console.log("Forecast");
    }
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
</style>