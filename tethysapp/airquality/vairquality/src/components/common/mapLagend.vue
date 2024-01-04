<template>
  <div class="layer-legend-item">
    <el-checkbox v-model="itemVisible.visible" :label="item.title"></el-checkbox>
    <br>
    <img class="legend-image"
         :src="item.legendPath">
  </div>

</template>
<script>


export default {
  name: "mapLagend",
  data() {
    return {
      checked1: true,
    };
  },
  props: {
    item: {
      type: Object,
      required: true
    },
  },
  methods: {
    calculateHeightWidth() {
      //    height calculation
      const img = new Image();
      img.src = this.item.legendPath;
      let that = this.item
      img.onload = function () {
        that.imgWidth = this.width;
        that.imgHeight = this.height;
      }
    }
  },
  computed: {
    itemVisible() {
      return this.item;
    }

  },
  mounted() {
    this.calculateHeightWidth();
  },
  beforeCreate() {

  },

}
</script>


<style scoped>
.layer-legend-item {
  border: 0.5px solid rgb(173, 173, 173);
  box-shadow: 0 0 2px rgba(34, 34, 34, 0.397);
  border-radius: 2px;
  margin: 2px 8px;
  padding: 2px 6px;
  min-width: 240px;
}

</style>