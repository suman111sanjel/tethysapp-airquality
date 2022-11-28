<template>
  <el-row style="width: 100%">
    <el-col :span="11" style="width: 100%">
      <el-select :disabled="isDisable" v-model="parameter_by_location.location_by" placeholder="Select Location"
                 style="width: 100%">
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
      <el-select :disabled="isDisable" v-show="parameter_by_location.location_by ==='default_locations'"
                 v-model="parameter_by_location.default_location"
                 placeholder="Select Location" style="width: 100%" ref="defaultLocation">
        <el-option
            v-for="item in Select_Option_Default_Location"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
      </el-select>

      <div class="" v-show="parameter_by_location.location_by ==='AOI'">
        <div class="feature-selected" v-show="parameter_by_location.is_AOI_Feature_selected ===true">Feature selected
        </div>
        <div class="no-feature-selected" v-show="parameter_by_location.is_AOI_Feature_selected ===false">No Feature
          selected
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>

import {mapActions, mapState} from "vuex";
import OLWKT from "ol/format/WKT";
import OlGeoJSON from "ol/format/GeoJSON";
import eventHub from "../utils/utils";

export default {
  name: 'selectLocation',
  props: {
    isDisable: {
      type: Boolean,
      required: true
    }, IndexValue: {
      type: Number,
      required: true
    }, Select_Option_Default_Location: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      options: {
        location_by: [
          {
            value: 'default_locations',
            label: 'Major Cities',
          },
          {
            value: 'AOI',
            label: 'Select on map',
          }
        ],
      }
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions(["getCityData"]),
    featureSelectorDeleteUpdate() {

      var wktfeaturegeom, geometryType, featureExtent;


      if (this.selectInteraction) {
        if (this.SelectByOption == 'Parameter') {
          if (this.parameter_by_location.location_by == "AOI") {
            if (this.selectInteraction.getFeatures().getLength()) {
              var features = this.selectInteraction.getFeatures();
              features.forEach((f) => {
                var format = new OLWKT();
                wktfeaturegeom = format.writeGeometry(f.getGeometry(), {
                  dataProjection: 'EPSG:4326',
                  featureProjection: 'EPSG:3857'
                });
                geometryType = f.getGeometry().getType();

                featureExtent = (new OLWKT()).readFeature(wktfeaturegeom);
                featureExtent = featureExtent.getGeometry().getExtent();
                f.set("SelectBy", "Parameter");
                f.set("LocationBy", "AOI");
                f.set("IndexValue", this.radioValue);
              });
            }

            let countSelectedFeature = 0;
            this.WorkingVectorLayer.getSource().getFeatures().forEach((f) => {
              if (f.get("SelectBy") == "Parameter" && f.get("LocationBy") == "AOI" && f.get("IndexValue") == this.IndexValue) {
                countSelectedFeature += 1;
              }
            });
            console.log(countSelectedFeature + " | " + this.radioValue + " | " + this.IndexValue);
            if (this.IndexValue == this.radioValue) {
              if (countSelectedFeature) {
                this.parameter_by_location.is_AOI_Feature_selected = true;
                this.parameter_by_location.wktValue = wktfeaturegeom;
                this.parameter_by_location.geometryType = geometryType;
                this.parameter_by_location.featureExtent = featureExtent;
              } else {
                this.parameter_by_location.is_AOI_Feature_selected = false;
                this.parameter_by_location.wktValue = '';
                this.parameter_by_location.geometryType = '';
                this.parameter_by_location.featureExtent = '';
              }
            }
          } else {
            if (this.radioValue == this.IndexValue) {
              this.selectInteraction.getFeatures().clear();
              this.$notify({
                title: 'Warning',
                message: "To select this feature you need to select 'Select on map' from drop down menu",
                type: 'warning'
              });
            }
          }
        }
      }
    }
  },
  watch: {
    SelectDefaultLocation(newVal, oldVal) {

      if (newVal) {
        // add it to vectorLayer
        let selNewValObj = this.Select_Option_Default_Location.filter(function (x) {
          return newVal == x.value
        })[0];

        let Feature = (new OlGeoJSON()).readFeature(selNewValObj.geoJSON.features[0]);
        Feature.set("SelectBy", "Parameter");
        Feature.set("LocationBy", "default_location");
        Feature.set("IndexValue", this.IndexValue);
        this.WorkingVectorLayer.getSource().addFeature(Feature);

        var format = new OLWKT();
        var wktfeaturegeom = format.writeGeometry(Feature.getGeometry(), {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        });
        var geometryType = Feature.getGeometry().getType();

        let featureExtent = (new OLWKT()).readFeature(wktfeaturegeom);

        // let featureForExtent = (new OlGeoJSON()).readFeature(selNewValObj.geoJSON.features[0]);
        featureExtent = featureExtent.getGeometry().getExtent();
        this.parameter_by_location.wktValue = wktfeaturegeom;
        this.parameter_by_location.geometryType = geometryType;
        this.parameter_by_location.featureExtent = [featureExtent[0] - 5, featureExtent[1] - 3, featureExtent[2] + 5, featureExtent[3] + 3];
        this.parameter_by_location.default_level_value = selNewValObj.label;
      } else {
        this.parameter_by_location.wktValue = '';
        this.parameter_by_location.geometryType = '';
        this.parameter_by_location.featureExtent = '';
        this.parameter_by_location.default_level_value = '';
      }
      if (oldVal) {
        // remove it from vector layer
        this.WorkingVectorLayer.getSource().getFeatures().forEach((f) => {
          if (f.get("SelectBy") == "Parameter" && f.get("LocationBy") == "default_location" && f.get("id") == oldVal && f.get("IndexValue") == this.IndexValue) {
            this.WorkingVectorLayer.getSource().removeFeature(f);
          }
        });
      }
    },
    SelectLocationBy() {
      this.parameter_by_location.default_location = '';
    }
  },
  computed: {
    ...mapState(["selectInteraction", "mapObject", "WorkingVectorLayer", "mapControlVariable"]),
    SelectDefaultLocation() {
      return this.parameter_by_location.default_location
    }, SelectLocationBy() {
      return this.parameter_by_location.location_by
    },
    parameter_by_location() {
      return this.mapControlVariable["parameter_by_location__" + this.IndexValue.toString()];
    }, radioValue() {
      return this.mapControlVariable.radioValue;
    }, SelectByOption() {
      return this.mapControlVariable.select_by;
    }
  },
  beforeCreate() {
    eventHub.$once("runFeatureInteractionCode", () => {

      this.selectInteraction.on('select', () => {
        this.featureSelectorDeleteUpdate();
      });
    });

    eventHub.$on("SelectByParameterDefaultLocation", () => {
      console.log("okok")
      var elem = this.$refs.defaultLocation.$el // Element to fire on
      // debugger;
      elem.dispatchEvent(new Event("change")); // Fire event
    });

  }
};
</script>

<style lang="scss">
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
</style>