<template>
  <div class="card-box full-height full-width layer-collection-div1">
    <div class="pannel-title">
      <h6 class="title-heading">Layer Control
      </h6>
    </div>
    <div class="body-container">
      <el-scrollbar height="100%">
        <div class="layerCollection"></div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>

export default {
  name: "LayerSwitcherControl",
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

.layer-collection-div1 .body-container{
    padding: 0px;
}



</style>