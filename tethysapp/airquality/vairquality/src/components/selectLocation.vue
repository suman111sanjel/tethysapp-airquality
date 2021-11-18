<template>
  <el-row style="width: 100%">
    <el-col :span="11" style="width: 100%">
      <el-select :disabled="isDisable" v-model="ruleForm.location_by" placeholder="Select Location"
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
      <el-select :disabled="isDisable" v-if="ruleForm.location_by ==='default_locations'"
                 v-model="ruleForm.default_location"
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
        <div class="no-feature-selected" v-if="ruleForm.is_AOI_Feature_selected ===false">No Feature selected</div>

      </div>

    </el-col>
  </el-row>
</template>

<script>
import {mapActions, mapState} from "vuex";
import OLWKT from "ol/format/WKT";

export default {
  name: 'selectLocation',
  props: {
    isDisable: {
      type: Boolean,
      required: true
    },radioValue: {
      type: String,
      required: true
    },IndexValue: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      ruleForm: {
        location_by: 'default_locations',
        location_by_pollutant_value1: [],
        default_location: '',
        is_AOI_Feature_selected: false,
        radiovalue:''
      },
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
        default_location: []
      }
    }
  },
  async mounted() {
    let defaultLocation = await this.getCityData();
    this.options.default_location = defaultLocation.data;
    this.selectInteraction.on('select', () => {
      this.featureSelectorDeleteUpdate();
    });
  },
  methods: {
    ...mapActions(["getCityData"]),
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
    }
  },
  computed: {
    ...mapState(["selectInteraction"]),
  },
  created() {

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