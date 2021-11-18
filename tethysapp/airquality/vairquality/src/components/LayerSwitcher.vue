<template>
  <div class="card-box full-height full-width about-div">
    <div class="pannel-title">
      <h6 class="title-heading">Layers
      </h6>
    </div>
    <div class="body-container">
      <el-checkbox v-model="SaldasLayer" @change="layerSwitcherSLDAS()">SALDAS Layer</el-checkbox>
      <br>
      <el-checkbox v-model="MajorBasin" @change="layerSwitcher()">Major Basin</el-checkbox>
    </div>
  </div>
</template>

<script>

export default {
  name: "LayerSwitcher",
  data() {
    return {
      SaldasLayer: true,
      MajorBasin: true
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.body-container {
  height: calc(100% - 54px);
}
</style>