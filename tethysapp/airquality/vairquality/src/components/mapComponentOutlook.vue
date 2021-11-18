<template>
  <div class="card-box full-height full-width about-div">
    <div id="map-container2">
    </div>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";

export default {
  name: "mapComponentOutlook",
  data() {
    return {
      mapObj: '',
      HighLightedLayer: '',
      view: '',
      mapObject: '',
      MajorBasin: '',
      AllLayers: '',
      initialLayerStartInterval: '',
      TimeSeriesLayerCollection: []
    }
  },
  methods: {
    mapInitilization() {
      let osm = new TileLayer({
        source: new OSM({attributions: [],}),
      });
      let view = new View({
        center: [9388155.512006583, 3291367.8109067543],
        zoom: 4
      });
      var map = new Map({
        layers: [],
        // target: this.$refs['map-root'],
        target: 'map-container2',
        view: view,
      });
      map.addLayer(osm);

      this.mapObject = map;
      this.view = view;
    },
  },
  created() {
  },
  mounted() {
    this.mapInitilization();
  },
}
</script>

<style>
#map-container2 {
  height: 100%;
  width: 100%;
  border-radius: 5px;
}

#map-container2 .ol-viewport {
  border-radius: 5px;
}
</style>