<template>

  <li>
    <span class="data gutter-lt">
      <i class="data-icon">
        <img class="svg-dynamic" src="/static/gaushala/img/infographics/population.svg">
      </i>
      <span  class="data-item">
        <span class="title7">कुल जनसंख्या</span>
        <small class="font-sm">8123</small>
      </span>
    </span>
  </li>

</template>

<script>

export default {
  name: "InfoGraphics",
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
  height: 280px
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

.informaticsSection {
  height: calc(100% - 352px);
}
</style>