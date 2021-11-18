<template>
  <div class="outer-div-of-tab full-height">
    <el-row class="first-row">
      <el-col :span="6" class="full-height full-width padding-left-5 padding-bottom-5 padding-top-10 padding-right-5">
        <mapControlsOutlook></mapControlsOutlook>
      </el-col>
      <el-col :span="12" class="full-height full-width padding-left-5 padding-bottom-5 padding-top-10 padding-right-5">
        <mapComponentOutlook></mapComponentOutlook>
      </el-col>
      <el-col :span="6" class="full-height full-width padding-left-5 padding-bottom-5 padding-top-10 padding-right-5">
        <about></about>
      </el-col>
    </el-row>
    <el-row class="second-row">
      <el-col :span="6"
              class="full-height full-width padding-left-5 padding-bottom-10 padding-top-5 padding-right-5">
        <chartComponent></chartComponent>
      </el-col>
      <el-col :span="6"
              class="full-height full-width padding-left-5 padding-bottom-10 padding-top-5 padding-right-5">
        <chartComponent></chartComponent>
      </el-col>
      <el-col :span="6"
              class="full-height full-width padding-left-5 padding-bottom-10 padding-top-5 padding-right-5">
        <chartComponent></chartComponent>
      </el-col>
      <el-col :span="6"
              class="full-height full-width padding-left-5 padding-bottom-10 padding-top-5 padding-right-5">
        <chartComponent></chartComponent>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import about from "./about";
import chartComponent from "./chartComponent";
import mapComponentOutlook from "./mapComponentOutlook";
import mapControlsOutlook from "./mapControlsOutlook";

export default {
  name: "outlookTabBody",
  components: {
    about,
    chartComponent,
    mapControlsOutlook,
    mapComponentOutlook,
  },
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
.outer-div-of-tab{
  padding-left: 5px;
  padding-right: 5px;
}
</style>