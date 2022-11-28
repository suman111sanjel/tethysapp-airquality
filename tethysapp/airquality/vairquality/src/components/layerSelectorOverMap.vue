<template>
    <div id="layer-selector-dropdown" ref="LayerSelectorDropdown">
      <el-select v-model="Inventory" placeholder="Select Inventory" class="full-width" size="mini">
        <el-option
            v-for="item in getInventory"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>
</template>

<script>

import {dataSelect} from "../utils/data";
export default {
  name: "layerSelectorOverMap",
    methods: {
    // changeLayerSectorDropdown() {
    //   this.$refs.LayerSelectorDropdown;
    //   let olOverlaycontainerStopevent=document.querySelector('ol-overlaycontainer-stopevent');
    //   olOverlaycontainerStopevent.append(this.$refs.LayerSelectorDropdown);
    // }
  },
  computed: {
    getInventory() {
      return dataSelect.Inventory;
    },
  },
}
</script>

<style scoped>

</style>