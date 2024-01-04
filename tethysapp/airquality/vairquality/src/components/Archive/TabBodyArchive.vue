<template>
  <el-row class="airquality">
    <el-col :span="6" class="full-height">
      <el-row class="first-row">
        <el-col :span="24"
                class="full-height full-width padding-left-10 padding-bottom-5 padding-top-10 padding-right-5">
          <mapControlsArchive></mapControlsArchive>
        </el-col>
      </el-row>
      <el-row class="second-row">
        <el-col :span="24"
                class="full-height full-width padding-left-10 padding-bottom-10 padding-top-5 padding-right-5">
            <chartComponentArchive  :IndexValue="1"></chartComponentArchive>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="12" class="full-height">
      <el-row class="first-row">
        <el-col :span="24"
                class="full-height full-width padding-left-5 padding-bottom-5 padding-top-10 padding-right-5">
          <mapComponentArchive></mapComponentArchive>
        </el-col>
      </el-row>
      <el-row class="second-row">
        <el-col :span="12"
                class="full-height full-width padding-left-5 padding-bottom-10 padding-top-5 padding-right-5">
          <chartComponentArchive  :IndexValue="2"></chartComponentArchive>
        </el-col>
        <el-col :span="12"
                class="full-height full-width padding-left-5 padding-bottom-10 padding-top-5 padding-right-5">
          <chartComponentArchive  :IndexValue="3"></chartComponentArchive>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="6" class="full-height">
      <el-row class="first-row">
        <el-col :span="24"
                class="full-height full-width padding-left-5 padding-bottom-5 padding-top-10 padding-right-10">
                    <LayerSwitcherControl></LayerSwitcherControl>
        </el-col>
      </el-row>
      <el-row class="second-row">
        <el-col :span="24"
                class="full-height full-width padding-left-5 padding-bottom-10 padding-top-5 padding-right-10">
          <chartComponentArchive  :IndexValue="4"></chartComponentArchive>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import LayerSwitcherControl from '../common/LayerSwitcherControl';

// import about from "./about";
import chartComponentArchive from "./chartComponentArchive";
import mapControlsArchive from "./mapControlsArchive";
import mapComponentArchive from "./mapComponentArchive";

// import {mapActions} from "vuex";

export default {
  name: "emissionTabBody",
  components: {
    LayerSwitcherControl,
    chartComponentArchive,
    mapControlsArchive,
    mapComponentArchive,
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
.second-row div{
  /*height: calc(100% - 12.5px);*/
}
</style>
