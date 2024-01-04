<template>
  <el-row class="full-height">
    <el-col :span="24" class="full-height">
      <el-row class="full-height">
        <el-col :span="4"
                class="full-height full-width padding-left-10 padding-bottom-10 padding-top-10 padding-right-5">
          <LayerSwitcherControl></LayerSwitcherControl>
        </el-col>
        <el-col :span="20"
                class="full-height full-width padding-left-5 padding-bottom-10 padding-top-10 padding-right-10">
          <mapComponentRGBProduct></mapComponentRGBProduct>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>

// import about from "./about";
import mapComponentRGBProduct from "./mapComponentRGBProduct";
// import SocioEconomicStatistics from "./SocioEconomicStatistics";
import LayerSwitcherControl from '../common/LayerSwitcherControl';
import {mapActions} from "vuex";

export default {
  name: "TabBodySocioEconomic",
  components: {
    // about,
    mapComponentRGBProduct,
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
