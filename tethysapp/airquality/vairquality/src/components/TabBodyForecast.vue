<template>
  <div class="full-height">
    <el-row class="first-row">
      <el-col :span="6" class="full-height full-width padding-left-10 padding-bottom-5 padding-top-10 padding-right-5">
        <mapControlsForecast></mapControlsForecast>
      </el-col>
      <el-col :span="12" class="full-height full-width padding-left-5 padding-bottom-5 padding-top-10 padding-right-5">
        <mapComponentForecast></mapComponentForecast>
      </el-col>
      <el-col :span="6" class="full-height full-width padding-left-5 padding-bottom-5 padding-top-10 padding-right-10">
        <LayerSwitcherControl></LayerSwitcherControl>
      </el-col>
    </el-row>
    <el-row class="second-row padding-left-5 padding-right-5">
      <el-col :span="6"
              class="full-height full-width padding-left-5 padding-bottom-10 padding-top-5 padding-right-5">
        <chartComponentForecast :IndexValue="1"></chartComponentForecast>
      </el-col>
      <el-col :span="6"
              class="full-height full-width padding-left-5 padding-bottom-10 padding-top-5 padding-right-5">
        <chartComponentForecast :IndexValue="2"></chartComponentForecast>
      </el-col>
      <el-col :span="6"
              class="full-height full-width padding-left-5 padding-bottom-10 padding-top-5 padding-right-5">
        <chartComponentForecast :IndexValue="3"></chartComponentForecast>
      </el-col>
      <el-col :span="6"
              class="full-height full-width padding-left-5 padding-bottom-10 padding-top-5 padding-right-5">
        <chartComponentForecast :IndexValue="4"></chartComponentForecast>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import LayerSwitcherControl from './LayerSwitcherControl';

// import about from "./about";
import chartComponentForecast from "./chartComponentForecast";
import mapControlsForecast from "./mapControlsForecast";
import mapComponentForecast from "./mapComponentForecast";
// import {mapActions} from "vuex";

export default {
  name: "emissionTabBody",
  components: {
    LayerSwitcherControl,
    chartComponentForecast,
    mapControlsForecast,
    mapComponentForecast,
  },
  methods: {
    // ...mapActions(["getCascaderOptions"]),
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

.second-row div {
  /*height: calc(100% - 12.5px);*/
}
</style>
