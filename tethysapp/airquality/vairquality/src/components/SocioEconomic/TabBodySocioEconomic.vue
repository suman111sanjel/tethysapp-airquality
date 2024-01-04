<template>
  <el-row class="full-height">
    <el-col :span="6" class="full-height">
      <el-row class="first-row">
        <el-col :span="24"
                class="full-height full-width padding-left-10 padding-bottom-5 padding-top-10 padding-right-5">
          <mapControlsSocioEconomic></mapControlsSocioEconomic>
        </el-col>
      </el-row>
      <el-row class="second-row">
        <el-col :span="24"
                class="full-height full-width padding-left-10 padding-bottom-10 padding-top-5 padding-right-5">
          <chartComponentSocioEconomic :IndexValue="1"></chartComponentSocioEconomic>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="12" class="full-height">
      <el-row class="first-row">
        <el-col :span="24"
                class="full-height full-width padding-left-5 padding-bottom-5 padding-top-10 padding-right-5">
          <mapComponentSocioEconomic></mapComponentSocioEconomic>
        </el-col>
      </el-row>
      <el-row class="second-row">
        <el-col :span="12"
                class="full-height full-width padding-left-5 padding-bottom-10 padding-top-5 padding-right-5">
          <chartComponentSocioEconomic :IndexValue="2" ></chartComponentSocioEconomic>
        </el-col>
        <el-col :span="12"
                class="full-height full-width padding-left-5 padding-bottom-10 padding-top-5 padding-right-5">
          <chartComponentSocioEconomic :IndexValue="3" ></chartComponentSocioEconomic>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="6" class="full-height">
      <el-row class="first-row">
        <el-col :span="24"
                class="full-height full-width padding-left-5 padding-bottom-5 padding-top-10 padding-right-10">

<!--          <SocioEconomicStatistics></SocioEconomicStatistics>-->

        <LayerSwitcherControl></LayerSwitcherControl>

        </el-col>

      </el-row>
      <el-row class="second-row">
        <el-col :span="24"
                class="full-height full-width padding-left-5 padding-bottom-10 padding-top-5 padding-right-10">
          <chartComponentSocioEconomic :IndexValue="4"></chartComponentSocioEconomic>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>

// import about from "./about";
import chartComponentSocioEconomic from "./chartComponentSocioEconomic";
import mapControlsSocioEconomic from "./mapControlsSocioEconomic";
import mapComponentSocioEconomic from "./mapComponentSocioEconomic";
// import SocioEconomicStatistics from "./SocioEconomicStatistics";
import LayerSwitcherControl from "./LayerSwitcherControl"
import {mapActions} from "vuex";

export default {
  name: "TabBodySocioEconomic",
  components: {
    // about,
    chartComponentSocioEconomic,
    mapControlsSocioEconomic,
    mapComponentSocioEconomic,
    LayerSwitcherControl,
  },
  methods: {
    ...mapActions(["getCascaderOptions"]),
  },
  async mounted() {
    // let data = await this.getCascaderOptions();
    // console.log(data);
  }
}
</script>

<style scoped>

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.full-height {
  height: 100%;
}
</style>
