<template>
  <div class="card-box full-height full-width about-div">
    <div class="pannel-title">
      <h6 class="title-heading">Map Controls
      </h6>
    </div>


    <div class="body-container">
      <el-scrollbar height="100%">
        <el-form
            ref="ruleForm"
            :model="ruleForm"
            label-position="left"
            label-width="120px"
            class="demo-ruleForm"
            size="mini"
        >
          <el-form-item label="Data Period" prop="data_period">
            <el-select @change="changeDataPeriod()" v-model="ruleForm.data_period" placeholder="Data Period"
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
            <el-select v-model="ruleForm.select_by" placeholder="Select By" style="width: 100%">
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
          <el-form-item v-if="ruleForm.select_by ==='Parameter'" label="Pollutants" prop="Pollutants">
            <div class="pollutant-cascader">
              <pollutantCascader :cascaderData="cascaderData" :index="0"></pollutantCascader>
            </div>
          </el-form-item>


        </el-form>
        <el-form
            ref="ruleForm"
            :model="ruleForm"
            label-position="top"
            label-width="120px"
            class="demo-ruleForm"
            size="mini"
            v-if="ruleForm.select_by ==='Location'"
        >
          <el-form-item label="Select Location" prop="Select Location">


            <el-col :span="11" style="width: 100%">
              <el-select v-model="ruleForm.location_by" placeholder="Select Location" style="width: 100%">
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
              <el-select v-if="ruleForm.location_by ==='default_locations'" v-model="ruleForm.default_location"
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
              <div class="" v-if="ruleForm.location_by ==='AOI'">
                <div class="feature-selected" v-if="ruleForm.is_AOI_Feature_selected ===true">Feature selected</div>
                <div class="no-feature-selected" v-if="ruleForm.is_AOI_Feature_selected ===false">No Feature selected
                </div>
              </div>

            </el-col>

          </el-form-item>
          <el-form-item label="Pollutants" prop="Pollutants">
            <div class="pollutant-cascader">
              <pollutantCascader :cascaderData="cascaderData" :index="0"></pollutantCascader>
            </div>
            <div class="pollutant-cascader">
              <pollutantCascader :cascaderData="cascaderData" :index="1"></pollutantCascader>
            </div>
            <div class="pollutant-cascader">
              <pollutantCascader :cascaderData="cascaderData" :index="2"></pollutantCascader>
            </div>
            <div class="pollutant-cascader">
              <pollutantCascader :cascaderData="cascaderData" :index="3"></pollutantCascader>
            </div>
          </el-form-item>
        </el-form>


        <el-form
            ref="ruleForm"
            :model="ruleForm"
            label-position="top"
            label-width="120px"
            class="demo-ruleForm"
            size="mini"
            v-if="ruleForm.select_by ==='Parameter'"

        >
          <el-form-item label="Select Locations" prop="Locations">
            <!--            <el-radio-group v-model="radio4" size="mini" disabled>-->
            <!--              <el-radio label="1" border>Option A</el-radio>-->
            <!--              <el-radio label="2" border>Option B</el-radio>-->
            <!--              -->
            <!--            </el-radio-group>-->
            <el-radio v-model="ruleForm.radioValue" label="1" name="radio1" style="width: 100%">
              <selectLocation :isDisable="ruleForm.radioValue=='1'?false:true" :radioValue="ruleForm.radioValue"
                              :IndexValue="1">
              </selectLocation>
            </el-radio>
            <el-radio v-model="ruleForm.radioValue" label="2" name="radio1" style="width: 100%">
              <selectLocation :isDisable="ruleForm.radioValue=='2'?false:true" :radioValue="ruleForm.radioValue"
                              :IndexValue="2">
              </selectLocation>
            </el-radio>
            <el-radio v-model="ruleForm.radioValue" label="3" name="radio1" style="width: 100%">
              <selectLocation :isDisable="ruleForm.radioValue=='3'?false:true" :radioValue="ruleForm.radioValue"
                              :IndexValue="3">
              </selectLocation>
            </el-radio>
            <el-radio v-model="ruleForm.radioValue" label="4" name="radio1" style="width: 100%">
              <selectLocation :isDisable="ruleForm.radioValue=='4'?false:true" :radioValue="ruleForm.radioValue"
                              :IndexValue="4">
              </selectLocation>
            </el-radio>


          </el-form-item>
        </el-form>
        <el-button type="primary" size="mini" style="width: 100%">compute</el-button>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import OLWKT from "ol/format/WKT";
import pollutantCascader from "./pollutantCascader";
import selectLocation from "./selectLocation";
import {threddDataSource} from "../config"
import TimeDimensionTile from "ol-plus/layer/TimeDimensionTile";
import LayerSwitcher from 'ol-plus/ui/LayerSwitcher';
import {AirPollutionWatchApp} from "../utils/data";
import OlVectorLayer from "ol/layer/Vector";
import OlVectorSource from "ol/source/Vector";
import OlGeoJSON from "ol/format/GeoJSON"

export default {
  name: "mapControlsEmission",
  data() {
    return {
      ruleForm: {
        data_period: 'Recent',
        select_by: 'Location',
        location_by: 'default_locations',
        location_by_pollutant_value1: [],
        default_location: '',
        is_AOI_Feature_selected: false,
        radioValue: "1"
      },
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
        default_location: []
      },
    }
  },
  /*  watch: {
      data_period() {
      }
    },*/

  components: {pollutantCascader, selectLocation},
  methods: {
    ...mapActions(["getCityData", "PostSlicedFromCatalog", "getGeoJsonForOneSatation"]),
    ...mapMutations(["appendTimeSeriesLayerCollection"]),
    changeDataPeriod() {
      if (this.ruleForm.data_period == "Recent") {

        this.AirPollutionWatchApp.startDate = new Date();
        this.AirPollutionWatchApp.startDate.setDate(this.AirPollutionWatchApp.startDate.getDate() - 1);
        this.AirPollutionWatchApp.endDate = new Date();

      } else if (this.ruleForm.data_period == "Archive") {
        this.AirPollutionWatchApp.startDate = new Date();
        this.AirPollutionWatchApp.startDate.setDate(this.AirPollutionWatchApp.startDate.getDate() - 8);
        this.AirPollutionWatchApp.endDate = new Date();
        this.AirPollutionWatchApp.endDate.setDate(this.AirPollutionWatchApp.endDate.getDate() - 1);
      } else {
        this.AirPollutionWatchApp.forecastDate = new Date();
        this.AirPollutionWatchApp.forecastDate.setDate(this.AirPollutionWatchApp.forecastDate.getDate() - 1);
      }
      this.addLayersToMap();
    },
    featureSelectorDeleteUpdate() {
      if (this.selectInteraction) {
        if (this.selectInteraction.getFeatures().getLength()) {
          var wktfeaturegeom, geometryType;
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
          console.log(Param)
          this.ruleForm.is_AOI_Feature_selected = true;
        } else {
          this.ruleForm.is_AOI_Feature_selected = false;
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
      if (this.ruleForm.data_period != "Forecast") {
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
            let timedimensionTilePara = kk.threddLayerProp;
            timedimensionTilePara.source.params.SLD_BODY = SLD;
            timedimensionTilePara.source.url = wmsList;
            timedimensionTilePara.legendPath = legendWMS;
            timedimensionTilePara.wmsList = wmsList;

            Newlayer = new TimeDimensionTile(timedimensionTilePara);
            await Newlayer.init().then((val) => {
              this.mapObject.addThreddsLayer(val);
              let l5 = new LayerSwitcher(".layerCollection", Newlayer, true);
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
            }, (error) => console.error(error));
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
              resolve();
              // myApp.AllBindedLayersList.push(l5);
            }, (error) => console.error(error));
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
      if (GeoJSONParse.features.length) {
        obj2.isDatathere = true;
        var VectorLayer = new OlVectorLayer({
          id: obj2.layerId,
          title: obj2.label,
          visible: false,
          legendPath: '#',
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
      this.AirPollutionWatchApp.LayerCollectionObjet[this.ruleForm.data_period].data.forEach((value) => {
        let id = value.threddLayerProp.id;
        let isDatathere = value.isDataThere;
        this.AirPollutionWatchApp.cascaderObject[this.ruleForm.data_period].data.reduce(function (total, currentValue) {
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
        this.AirPollutionWatchApp.cascaderObject[this.ruleForm.data_period].data.reduce(function (total, currentValue, currentIndex, arr) {
          if (!currentValue.children.length) {
            arr.splice(currentIndex, 1);
          }
        }, 0);
      });

      // for clearing vector data with no data
      this.AirPollutionWatchApp.cascaderObject[this.ruleForm.data_period].data.reduce(function (total, currentValue, currentIndex, arr) {
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
        if (id.split("__")[0].toUpperCase() == this.ruleForm.data_period.toUpperCase()) {
          if (id == this.ruleForm.data_period + "__TerraModisTrueColor") {
            val.setVisibleDivBind(true);
          } else {
            val.setVisibleDivBind(false);
          }
        } else {
          val.setVisibleDivBind(false);
        }
      });
    },
    addLayersToMap() {
      var that = this;
      let aa = "data__layer__initilize__" + that.ruleForm.data_period;
      if (that[aa] == false) {
        var PromiseListRasterData = [];
        for (let kk of this.AirPollutionWatchApp.LayerCollectionObjet[this.ruleForm.data_period].data) {
          let al1 = new Promise((resolve) => {
            setTimeout(this.addRasterLayerToMap, 1, kk, resolve);
          });
          PromiseListRasterData.push(al1);
        }
        var PromiseListVectorData = [];
        for (let obj1 of this.AirPollutionWatchApp.cascaderObject[this.ruleForm.data_period].data) {
          for (let obj2 of obj1.children) {
            if (obj2.stationData == true) {
              let al2 = new Promise((resolve) => {
                setTimeout(this.addVectorLayerToMap, 1, obj1, obj2, resolve);
              });
              PromiseListVectorData.push(al2);
            }
          }
        }
        Promise.all([...PromiseListRasterData, ...PromiseListVectorData]).then(() => {
          this.enableTrueColorMap();
          this.ClearWMSWithNoDataAndVectorDatawithNodata();
          that[aa] = true;
          console.log(that[aa]);
          console.log("------------------inside promise-----------------");
        });
      } else {
        this.enableTrueColorMap();
      }
    }
  },
  computed: {
    ...mapState(["selectInteraction", "mapObject", "TimeSeriesLayerCollection"]),
    cascaderData() {
      return this.AirPollutionWatchApp.cascaderObject[this.ruleForm.data_period].data;
    }
  },
  async mounted() {

    let defaultLocation = await this.getCityData();
    this.options.default_location = defaultLocation.data;
    this.selectInteraction.on('select', () => {
      this.featureSelectorDeleteUpdate();
    });
    this.addLayersToMap();
  },
  created() {

    if (this.ruleForm.data_period === 'Recent') {
      console.log("Recent");

    } else if (this.dataPeriod === 'Archive') {
      console.log("Archive");
    } else {
      console.log("Forecast");
    }
  },

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