<template>
  <div class="card-box full-height full-width layer-collection-div1">
    <div class="pannel-title">
      <h6 class="title-heading">Layer Control
      </h6>
    </div>
    <div class="body-container">
      <el-scrollbar height="100%" always>
        <div class="layerCollection"></div>
        <div class="pannel-title summaryPop">
          <h6 class="title-heading">
            <div class="">
              Population Summary
              <el-link class="refreshButton"  @click="RefereshSummary()" :disabled="isLoading"><i class="fas fa-sync refreshIcon"></i>
              </el-link>
            </div>
          </h6>
        </div>

        <div class="informaticsSection" v-loading="isLoading">
          <ul class="list-style1" id="InfoGraphicsD">
            <li>
          <span class="data gutter-lt">
            <i class="data-icon">
              <img class="svg-dynamic" src="@/assets/InfographicsIcon/population.svg">
            </i>
            <span class="data-item">
              <span class="title7">Total Population</span>
              <small class="font-sm">{{ TotalPop }}</small>
            </span>
          </span>
            </li>
            <li>
          <span class="data gutter-lt">
            <i class="data-icon">
              <img class="svg-dynamic" src="@/assets/InfographicsIcon/male.svg">
            </i>
            <span class="data-item">
              <span class="title7">Male</span>
              <small class="font-sm">{{ Male }}</small>
            </span>
          </span>
            </li>

            <li>
          <span class="data gutter-lt">
            <i class="data-icon">
              <img class="svg-dynamic" src="@/assets/InfographicsIcon/female.svg">
            </i>
            <span class="data-item">
              <span class="title7">Female</span>
              <small class="font-sm">{{ Female }}</small>
            </span>
          </span>
            </li>

            <li>
          <span class="data gutter-lt">
            <i class="data-icon">
              <img class="svg-dynamic" src="@/assets/InfographicsIcon/child.svg">
            </i>
            <span class="data-item">
              <span class="title7">Child (0 - 14)</span>
              <small class="font-sm">{{ Child }}</small>
            </span>
          </span>
            </li>

            <li>
          <span class="data gutter-lt">
            <i class="data-icon">
              <img class="svg-dynamic" src="@/assets/InfographicsIcon/male.svg">
            </i>
            <span class="data-item">
              <span class="title7">Adult (15 - 59)</span>
              <small class="font-sm">{{ Adult }}</small>
            </span>
          </span>
            </li>


            <li>
          <span class="data gutter-lt">
            <i class="data-icon">
              <img class="svg-dynamic" src="@/assets/InfographicsIcon/old.svg">
            </i>
            <span class="data-item">
              <span class="title7">Old (60 +) </span>
              <small class="font-sm">{{ Old }}</small>
            </span>
          </span>
            </li>


          </ul>
        </div>

      </el-scrollbar>
    </div>


  </div>
</template>

<script>

import {mapActions, mapState} from "vuex";
import OLWKT from "ol/format/WKT";

export default {
  name: "LayerSwitcherControl",
  data() {
    return {TotalPop: '', Male: '', Female: '', Child: '', Adult: '', Old: '', isLoading: true,}
  },
  methods: {
    ...mapActions(["PostPopulationSummary"]),
    async RefereshSummary() {
      this.isLoading = true;
      console.log(this.SocioEconomicObject.popYear);
      var wktfeaturegeom, geometryType;
      var features = this.selectInteractionObj.getFeatures();

      features.forEach(function (f) {
        var format = new OLWKT();
        wktfeaturegeom = format.writeGeometry(f.getGeometry(), {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        });
        geometryType = f.getGeometry().getType();
      });
      let Param = {
        year: this.SocioEconomicObject.popYear,
        geometryType: geometryType,
        wkt: wktfeaturegeom,
      }
      let response = await this.PostPopulationSummary(Param);
      console.log(response);
      this.TotalPop = response.totalPop;
      this.Male = response.totalMale;
      this.Female = response.totalFemale;
      this.Child = response.child;
      this.Adult = response.Adult;
      this.Old = response.Old;

      this.isLoading = false;

    }
  },
  computed: {
    ...mapState(["SocioEconomicObject", "selectInteractionObj"]),
  },
  mounted() {
    // eslint-disable-next-line no-undef


    setTimeout(() => {

      this.RefereshSummary();
    }, 500);

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

.layer-collection-div1 .body-container {
  padding: 0px;
}


.summaryPop {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  height: 30px;
}


.summaryPop .title-heading {
  padding: 5px 6px;
  text-align: center;
}

/*.informaticsSection {*/
/*  height: calc(100% - 352px);*/
/*}*/


.list-style1 {
  padding: 0px 10px 10px 10px;
}

.list-style1 li:not(:last-child) {
  border-bottom: 1px solid rgba(138, 154, 164, .2);
}

.list-style1 li {
  padding: 4px 8px;
  border-top-right-radius: 10px;
}

.list-style1 li .data {
  font-size: 20px;
  display: flex;
  align-items: center;
}

.data {
  color: #373737;
  fill: #373737;
}

.list-style1 li .data .data-icon {
  fill: #000;
  padding: 0;
  width: 20px;
  top: 2px;
  margin-right: 0;
  background-color: transparent;
}

.data .data-icon {
  float: left;
  opacity: .6;
}

.list-style1 li .data .data-item {
  width: 85%;
  padding-left: 10px;
}

.data .data-item {
  float: left;
}

.title7 {
  font-weight: 400;
  font-size: 14px;
}

.list-style1 li .data .data-item small {
  color: #8a9aa4;
}

.data .data-item small {
  font-size: 11px;
}

.data .data-item small {
  display: block;
  line-height: 1.1;
  font-weight: 600;
}

ul#InfoGraphicsD {
  margin-top: 5px;
}

#InfoGraphicsD img {
  max-width: 100%;
  vertical-align: middle;
}


.data .data-item small {
  font-size: 14px;
}

.layerCollection {
  min-height: 217px;
}

.refreshButton{
  color: white;
}





/*.aboutContent .el-collapse-item__content, .aboutContent .el-collapse-item__header, .aboutContent {*/
/*  font-family: Arial, Helvetica, sans-serif;*/
/*  color: rgb(96, 98, 102) !important;*/
/*  font-size: 14px;*/
/*  line-height: 1.7692307692;*/
/*  text-align: justify;*/
/*  word-break: normal;*/
/*}*/

/*.aboutContent .el-collapse-item__header {*/
/*  font-weight: bold;*/
/*  line-height: 1.2;*/
/*  font-size: 16.38px;*/
/*}*/


.informaticsSection{
    /*font-family: Arial, Helvetica, sans-serif;*/



}

</style>