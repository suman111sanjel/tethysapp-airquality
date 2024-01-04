<template>
  <div class="card-box full-height full-width about-div">
    <div class="pannel-title">
      <h6 class="title-heading">Map Controls
      </h6>
    </div>
    <div class="body-container">
      <el-scrollbar height="100%">
        <el-form ref="form" :model="form" label-width="auto" :inline="getIsInlineFormorNot" size="mini"
                 label-position="left">
          <!--        <el-form-item label="Region">-->
          <!--          <el-select v-model="form.region" placeholder="Select region" class="full-width">-->
          <!--            <el-option-->
          <!--                v-for="item in data.region"-->
          <!--                :key="item.value"-->
          <!--                :label="item.label"-->
          <!--                :value="item.value">-->
          <!--            </el-option>-->
          <!--          </el-select>-->
          <!--        </el-form-item>-->

          <el-form-item label="Inventory" class="full-width">
            <el-select v-model="form.inventory" placeholder="Select" @change="updateMapLayer()" class="full-width">
              <el-option
                  v-for="item in data.Inventory"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Pollutants" class="full-width">
            <el-select v-model="form.pollutants" placeholder="Select" @change="updateMapLayer()" class="full-width">
              <el-option
                  v-for="item in data.pollutants"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Sectors" class="full-width">
            <el-select v-model="form.sectors" placeholder="Select" @change="updateMapLayer()" class="full-width">
              <el-option
                  v-for="item in data.sectors"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="year" class="full-width">
            <el-select v-model="form.year" placeholder="Select" @change="updateMapLayer()" class="full-width">
              <el-option
                  v-for="item in data.year"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="submit-btn full-width">
            <!--          <el-button type="primary" class="full-width">Get Emission Plot</el-button>-->
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import {dataSelect} from '../../utils/dataEmission'
import eventHub from "../../utils/utils";
import {mapActions, mapState} from 'vuex';
import GeoJSON from "ol/format/GeoJSON";
// import {getCenter as ol_extent_getCenter} from "ol/extent";

export default {
  name: "mapControlsEmission",
  data() {
    return {
      form: {
        region: '',
        pollutants: '',
        periodicity: '',
        year: '',
        sectors: '',
        inventory: ''
      },
      isInlineForm: true,
      data: dataSelect
    }
  }, methods: {
    ...mapActions(["GETCountryGeojson"]),
    async onSubmit() {

    },

    getInLineData() {
      return this.isInlineForm
    },

    updateMapLayer() {
      this.$store.state.pollutants = this.form.pollutants;
      this.$store.state.sectors = this.form.sectors;
      this.$store.state.year = this.form.year;
      this.$store.state.inventory = this.form.inventory;
      eventHub.$emit("InventoryChange");
    },
    async setDefaultMap() {


      this.form.pollutants = 'PM2p5';
      this.form.sectors = 'Total';
      this.form.year = '2015';
      this.form.inventory = 'REAS';

      // Javasctipt API Stack
      setTimeout(() => {
        this.updateMapLayer();
      }, 0);
      let geoJson = await this.GETCountryGeojson();
      console.log("geoJson");
      console.log(geoJson);
      // this.vectorLayerSource.
      var format = new GeoJSON();
      var f = format.readFeature(geoJson.features[0], {
        dataProjection: "EPSG:4326",
        featureProjection: this.mapObject.getView().getProjection()
      });
      this.vectorLayerSource.addFeature(f);
      this.selectInteractionObj.getFeatures().push(f);
      this.selectInteractionObj.dispatchEvent({type: 'select'});
      // Zoom to map centre*****
      // var view = this.mapObject.getView();
      // var resolution = view.getResolutionForExtent(f.getGeometry().getExtent(), this.mapObject.getSize());
      // var zoom = view.getZoomForResolution(resolution);
      // var center = ol_extent_getCenter(f.getGeometry().getExtent());
      // // redraw before zoom
      // setTimeout(function () {
      //   view.animate({
      //     center: center,
      //     zoom: Math.min(zoom, 16)
      //   });
      // }, 100);

      // Zoom to map centre*****


      eventHub.$emit('setDefaultVisualizationChart', 1, 'SectorShare', ["REAS", "PM2p5", "2015"]);
      eventHub.$emit('setDefaultVisualizationChart', 2, 'SectorContribution', ["REAS", "PM2p5", "2015"]);
      eventHub.$emit('setDefaultVisualizationChart', 3, 'Timeseries', ["REAS", "PM2p5", "Total"]);
      eventHub.$emit('setDefaultVisualizationChart', 4, 'InventriesComparison', ["PM2p5", "Total", "2015"]);

      setTimeout(() => {
        eventHub.$emit('setDefaultEmissionStatistics');
      }, 1000)
    },
  },
  computed: {
    ...mapState(["vectorLayerSource", "mapObject", "selectInteractionObj"]),
    getIsInlineFormorNot() {
      return this.getInLineData();
    },
  },
  created() {
    this.form.region = this.$store.state.region;
    this.form.pollutants = this.$store.state.pollutants;
    this.form.sectors = this.$store.state.sectors;
    this.form.year = this.$store.state.year;
  },

  mounted() {
    // Generate the chart
    // eslint-disable-next-line no-undef

    this.setDefaultMap();
  },
}
</script>

<style scoped>
.body-container {
  height: calc(100% - 50px);
}
</style>