<template>
  <div class="card-box full-height full-width about-div">
    <div class="pannel-title">
      <h6 class="title-heading p-10">Information
        <span @click="RefreshInformation()">
                  <i class="fas fa-sync float-right refresh-information"></i>
        </span>
      </h6>
    </div>
    <div class="information-body">
      <el-card shadow="never" class="transition-box" v-if="showStat ===false">
        Please select or draw a feature
      </el-card>
      <div class="informationShow" v-if="showStat ===true">
        <h1 class="heading-layer-info">{{ infoHeading }}</h1>
        <br>
        <el-table class="info-table-el table-div" :data="tableDataStat">
          <el-table-column prop="StatName" label="statName" label-class-name="info-table"></el-table-column>
          <el-table-column prop="StatValue" label="statValue" label-class-name="info-table"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>


import OLWKT from "ol/format/WKT";
import {mapActions, mapState} from "vuex";

export default {
  name: "Statistics",
  data() {
    return {
      showStat: false,
      infoHeading: '',
      tableDataStat:[]
    }
  },
  computed: {
    ...mapState(["SelectedLayerObj", "TimeSeriesLayerCollection"]),
  },
  methods: {
    ...mapActions(["GetLayerStatInfo"]),
    async RefreshInformation() {
      if (this.SelectedLayerObj) {
        if (this.SelectedLayerObj.getFeatures().getLength()) {
          var wktfeaturegeom, geometryType;
          var features = this.SelectedLayerObj.getFeatures();
          features.forEach(function (f) {
            var format = new OLWKT();
            wktfeaturegeom = format.writeGeometry(f.getGeometry(), {
              dataProjection: 'EPSG:4326',
              featureProjection: 'EPSG:3857'
            });
            geometryType = f.getGeometry().getType();
          });
          var selectedLayr = this.TimeSeriesLayerCollection.filter(function (x) {
            var checkLayer = x.getProperties().visible === true;
            return checkLayer;
          });
          if (selectedLayr.length) {
            let layerIndex = null;
            let InterestedLayer = null;
            selectedLayr.forEach(function (cobj, ind) {
              let currentLayerIndex = cobj.getLayer().getProperties().zIndex;
              let currentLayerId = cobj.getLayer().getProperties()
              if (ind == 0) {
                InterestedLayer = currentLayerId;
                layerIndex = currentLayerIndex;
              } else {
                if (currentLayerIndex > layerIndex) {
                  layerIndex = currentLayerIndex;
                  InterestedLayer = currentLayerId;
                }
              }
            });
            let Param = {
              geometryType: geometryType,
              wkt: wktfeaturegeom,
              layerDetail: InterestedLayer.id.split("___")
            };

            let response = await this.GetLayerStatInfo(Param);
            // this.min = response.Minimum;
            // this.max = response.Maximum;
            // this.sum = response.sum;
            this.showStat = true;
            this.infoHeading = InterestedLayer.id.split("___").join(" ");
            this.tableDataStat=response;
            console.log(response);
          } else {
            this.showStat = false;
            this.$notify({
              title: 'Warning',
              message: 'Please Add a layer first',
              type: 'warning'
            });
          }
        } else {
          this.showStat = false;
          this.$notify({
            title: 'Warning',
            message: 'Please select a feature on map.',
            type: 'warning'
          });
        }
      }
    }
  }
};

</script>


<style>
.transition-box {
  margin-bottom: 10px;
  width: 100%;
  border-radius: 4px;
  background-color: rgba(64, 158, 255, 0);
  text-align: center;
  color: #ee0000;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
  border-width: 1px !important;
  border-color: #b51816;
}

.information-body {
  padding: 10px;
}

.float-right {
  float: right;
}

.p-10 {
  padding-right: 10px;
}

.refresh-information {
  cursor: pointer;
}

h1.heading-layer-info {
  text-align: center;
  padding: 10px;
}

.info-table-el .info-table{
  display: none;
}
.table-div{
  width: 100%;
}

</style>

