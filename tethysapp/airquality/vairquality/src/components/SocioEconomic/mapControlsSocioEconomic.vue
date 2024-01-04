<template>
  <div class="card-box full-height full-width about-div">
    <div class="pannel-title">
      <h6 class="title-heading">Map Controls
      </h6>
    </div>
    <div class="body-container">
      <el-scrollbar height="100%">
        <el-form ref="form" :model="form" label-width="auto" :inline="getIsInlineFormorNot" size="mini"
                 label-position="left">

          <el-form-item label="Socio Economic" class="full-width">
            <el-select v-model="SocioEconomicObject.socioEconomicType" placeholder="Select" @change="updateMapLayer()"
                       class="full-width">
              <el-option
                  v-for="item in data.socioEconomicType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Population" class="full-width">
            <el-select v-model="SocioEconomicObject.PopulationType" placeholder="Select" @change="updateMapLayer()"
                       class="full-width">
              <el-option
                  v-for="item in data.population"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Year" class="full-width" v-if="!SocioEconomicObject.ShowAnimationPanel">
            <el-select v-model="SocioEconomicObject.popYear" placeholder="Select" @change="updateMapLayer()"
                       class="full-width">
              <el-option
                  v-for="item in data.pop_year"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <!--          <el-form-item label="Animation">-->
          <!--            <el-switch v-model="SocioEconomicObject.ShowAnimationPanel" @change="updateMapLayer()"/>-->
          <!--          </el-form-item>-->

          <el-form-item class="submit-btn full-width">
            <!--          <el-button type="primary" class="full-width">Get Emission Plot</el-button>-->
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>
  </div>


</template>

<script>
import {dataSelect} from '../../utils/dataSocioEconomic'
// import eventHub from "../../utils/utils";
import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
// import {GeoServerHost, threddDataSource} from "../../config";
import Style from "ol/style/Style";
import {Icon} from "ol/style";
// import {Image as ImageLayer} from "ol/layer";
// import ImageWMS from "ol/source/ImageWMS";
import LayerSwitcher from "ol-plus/ui/LayerSwitcher";
// import rgbLegend from "../../assets/rgblegend.jpg";
import TimeDimensionTile from "ol-plus/layer/TimeDimensionTile";
import GeoJSON from "ol/format/GeoJSON";
import eventHub from "../../utils/utils";
// import GeoJSON from "ol/format/GeoJSON";
// import {getCenter as ol_extent_getCenter} from "ol/extent";

import {threddDataSource} from '../../config';


export default {
  name: "mapControlsSocioEconomic",
  data() {
    return {
      form: {},
      isInlineForm: true,
      data: dataSelect
    }
  }, methods: {
    ...mapActions(["GETCountryGeojson"]),
    ...mapMutations(["appendTimeSeriesLayerCollection", "addLegend", "removeLegend"]),
    async onSubmit() {

    },

    getInLineData() {
      return this.isInlineForm
    },

    updateMapLayer() {
      let TDSHOST = threddDataSource + 'wms/HKHPopulation/'
      if (this.SocioEconomicObject.socioEconomicType == 'Demographic') {

        let layerIdAnimation = this.SocioEconomicObject.ShowAnimationPanel == true ? '-Animation' : '-noAnimation';
        let layerId = 'Demographic' + layerIdAnimation;
        let WMS = '';
        let year = this.SocioEconomicObject.popYear;
        let layerVariableName = '';
        let title = '';

        if (this.SocioEconomicObject.PopulationType == 'TotalPopulation') {
          layerId = layerId + '-TotalPopulation-' + year;
          WMS = this.SocioEconomicObject.ShowAnimationPanel == true ? 'PopulationCount.ncml' : ('PopulationCount/population_count_HKH_' + year + '.nc');
          layerVariableName = 'PopulationCout';
          title = 'Total Population';
        } else if (this.SocioEconomicObject.PopulationType == "PopulationDensity") {
          layerId = layerId + '-PopulationDensity-' + year;
          WMS = this.SocioEconomicObject.ShowAnimationPanel == true ? 'PopulationDensity.ncml' : ('PopulationDensity/population_density_HKH_' + year + '.nc');
          layerVariableName = 'PopulationDensity';
          title = 'Population Density';
        } else if (this.SocioEconomicObject.PopulationType == "Child") {
          layerId = layerId + '-Child-' + year;
          WMS = this.SocioEconomicObject.ShowAnimationPanel == true ? 'AgeAndSexStructure.ncml' : ('AgeAndSexStructure/AgeAndSexStructure_' + year + '.nc');
          layerVariableName = 'AllChild'
          title = 'Child';
        } else if (this.SocioEconomicObject.PopulationType == "Adult") {
          layerId = layerId + '-Adult-' + year;
          WMS = this.SocioEconomicObject.ShowAnimationPanel == true ? 'AgeAndSexStructure.ncml' : ('AgeAndSexStructure/AgeAndSexStructure_' + year + '.nc');
          layerVariableName = 'AllAdult';
          title = 'Adult';
        } else if (this.SocioEconomicObject.PopulationType == "Old") {
          layerId = layerId + '-Old-' + year;
          WMS = this.SocioEconomicObject.ShowAnimationPanel == true ? 'AgeAndSexStructure.ncml' : ('AgeAndSexStructure/AgeAndSexStructure_' + year + '.nc');
          layerVariableName = 'AllOld';
          title = 'Old';
        }
        let year_str = this.SocioEconomicObject.ShowAnimationPanel == true ? '' : ' (' + year + ')';
        let paramObj = {
          layerId: layerId,
          WMS: TDSHOST + WMS,
          layerVariableName: layerVariableName,
          title: title + year_str,
          showAnimationPannel: this.SocioEconomicObject.ShowAnimationPanel
        };
        console.log(paramObj);
        let layer = this.getBindedLayer(layerId);
        if (layer) {
          layer.setVisibleDivBind(true);
        } else {
          this.addLayerPopulation(paramObj);
        }
      }
      // this.AddLayerToLayerList()
    },
    async addLayerPopulation(paramObj) {

      // let SLDAll='   <?xml version="1.0" encoding="ISO-8859-1"?>   <StyledLayerDescriptor version="1.1.0" xsi:schemaLocation="http://www.opengis.net/sldStyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:se="http://www.opengis.net/se" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">   <NamedLayer>   <se:Name>PopulationCout</se:Name>   <UserStyle>   <se:Name>Thesholded colour scheme</se:Name>   <se:CoverageStyle>   <se:Rule>   <se:RasterSymbolizer>   <se:Opacity>1.0</se:Opacity>   <se:ColorMap>   <se:Categorize fallbackValue="#00000000">   <se:LookupValue>Rasterdata</se:LookupValue>   <se:Value>#FFFACD</se:Value>   <se:Threshold>10</se:Threshold>   <se:Value>#BDFCC9</se:Value>   <se:Threshold>100</se:Threshold>   <se:Value>#00F5FF</se:Value>   <se:Threshold>200</se:Threshold>   <se:Value>#B3EE3A</se:Value>   <se:Threshold>500</se:Threshold>   <se:Value>#66CD00</se:Value>   <se:Threshold>700</se:Threshold>   <se:Value>#CD9B1D</se:Value>   <se:Threshold>1000</se:Threshold>   <se:Value>#FF8000</se:Value>   <se:Threshold>1200</se:Threshold>   <se:Value>#008000</se:Value>   <se:Threshold>1500</se:Threshold>   <se:Value>#EEEE00</se:Value>   <se:Threshold>1800</se:Threshold>   <se:Value>#CDCD00</se:Value>   <se:Threshold>2000</se:Threshold>   <se:Value>#A0522D</se:Value> </se:Categorize> </se:ColorMap> </se:RasterSymbolizer> </se:Rule> </se:CoverageStyle> </UserStyle> </NamedLayer> </StyledLayerDescriptor>'
      // let SLDAll='      <?xml version="1.0" encoding="ISO-8859-1"?>   <StyledLayerDescriptor version="1.1.0" xsi:schemaLocation="http://www.opengis.net/sldStyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:se="http://www.opengis.net/se" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">   <NamedLayer>   <se:Name>PopulationCout</se:Name>   <UserStyle>   <se:Name>Thesholded colour scheme</se:Name>   <se:CoverageStyle>   <se:Rule>   <se:RasterSymbolizer>   <se:Opacity>1.0</se:Opacity>   <se:ColorMap>   <se:Categorize fallbackValue="#00000000">   <se:LookupValue>Rasterdata</se:LookupValue>   <se:Value>#FFF8DC</se:Value>   <se:Threshold>10</se:Threshold>   <se:Value>#FFD39B</se:Value>   <se:Threshold>100</se:Threshold>   <se:Value>#E9967A</se:Value>   <se:Threshold>200</se:Threshold>   <se:Value>#FFD700</se:Value>   <se:Threshold>500</se:Threshold>   <se:Value>#DAA520</se:Value>   <se:Threshold>700</se:Threshold>   <se:Value>#4876FF</se:Value>   <se:Threshold>1000</se:Threshold>   <se:Value>#000080</se:Value>   <se:Threshold>1200</se:Threshold>   <se:Value>#FF4500</se:Value>   <se:Threshold>1500</se:Threshold>   <se:Value>#CD2626</se:Value>   <se:Threshold>1800</se:Threshold>   <se:Value>#B22222</se:Value>   <se:Threshold>2000</se:Threshold>   <se:Value>#8B1A1A</se:Value> </se:Categorize> </se:ColorMap> </se:RasterSymbolizer> </se:Rule> </se:CoverageStyle> </UserStyle> </NamedLayer> </StyledLayerDescriptor>'
      // let SLDAll = '<?xml version="1.0" encoding="ISO-8859-1"?><StyledLayerDescriptor version="1.1.0" xsi:schemaLocation="http://www.opengis.net/sldStyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:se="http://www.opengis.net/se" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">   <NamedLayer>   <se:Name>' + paramObj.layerVariableName + '</se:Name>   <UserStyle>   <se:Name>Thesholded colour scheme</se:Name>   <se:CoverageStyle>   <se:Rule>   <se:RasterSymbolizer>   <se:Opacity>1.0</se:Opacity>   <se:ColorMap>   <se:Categorize fallbackValue="#00000000">   <se:LookupValue>Rasterdata</se:LookupValue>   <se:Value>#FFF8DC</se:Value>   <se:Threshold>10</se:Threshold>   <se:Value>#FFD39B</se:Value>   <se:Threshold>100</se:Threshold>   <se:Value>#E9967A</se:Value>   <se:Threshold>200</se:Threshold>   <se:Value>#FFD700</se:Value>   <se:Threshold>500</se:Threshold>   <se:Value>#DAA520</se:Value>   <se:Threshold>700</se:Threshold>   <se:Value>#4876FF</se:Value>   <se:Threshold>1000</se:Threshold>   <se:Value>#000080</se:Value>   <se:Threshold>1200</se:Threshold>   <se:Value>#FF4500</se:Value>   <se:Threshold>1500</se:Threshold>   <se:Value>#CD2626</se:Value>   <se:Threshold>1800</se:Threshold>   <se:Value>#B22222</se:Value>   <se:Threshold>2000</se:Threshold>   <se:Value>#8B1A1A</se:Value> </se:Categorize> </se:ColorMap> </se:RasterSymbolizer> </se:Rule> </se:CoverageStyle> </UserStyle> </NamedLayer> </StyledLayerDescriptor>'
      let SLDAll = '  <?xml version="1.0" encoding="ISO-8859-1"?><StyledLayerDescriptor version="1.1.0" xsi:schemaLocation="http://www.opengis.net/sldStyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:se="http://www.opengis.net/se" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">   <NamedLayer>   <se:Name>' + paramObj.layerVariableName + '</se:Name>   <UserStyle>   <se:Name>Thesholded colour scheme</se:Name>   <se:CoverageStyle>   <se:Rule>   <se:RasterSymbolizer>   <se:Opacity>1.0</se:Opacity>   <se:ColorMap>   <se:Categorize fallbackValue="#00000000">   <se:LookupValue>Rasterdata</se:LookupValue>   <se:Value>#A4D3EE</se:Value>   <se:Threshold>50</se:Threshold>   <se:Value>#8470FF</se:Value>   <se:Threshold>100</se:Threshold>   <se:Value>#4169E1</se:Value>   <se:Threshold>200</se:Threshold>   <se:Value>#0000CD</se:Value>   <se:Threshold>500</se:Threshold>   <se:Value>#33A1C9</se:Value>   <se:Threshold>700</se:Threshold>   <se:Value>#CAFF70</se:Value>   <se:Threshold>1000</se:Threshold>   <se:Value>#7FFF00</se:Value>   <se:Threshold>1200</se:Threshold>   <se:Value>#FFFF00</se:Value>   <se:Threshold>1500</se:Threshold>   <se:Value>#FF8000</se:Value>   <se:Threshold>1800</se:Threshold>   <se:Value>#CD2626</se:Value>   <se:Threshold>2000</se:Threshold>   <se:Value>#FF3030</se:Value> </se:Categorize> </se:ColorMap> </se:RasterSymbolizer> </se:Rule> </se:CoverageStyle> </UserStyle> </NamedLayer></StyledLayerDescriptor>'

      let LegendParameter = paramObj.WMS + '?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&WIDTH=10&HEIGHT=230&SLD_BODY=' + encodeURIComponent(SLDAll).toString();


      let OLEXTLegendObject = {
        id: paramObj.layerId,
        title: paramObj.title,
        typeGeom: 'Point',
        style: new Style({
          image: new Icon({
            src: LegendParameter,
            crossOrigin: 'anonymous', // Enable print
          })
        }),
        size: [60, 250]
      };


      let aa = {
        id: paramObj.layerId,
        title: paramObj.title,
        visible: true,
        opacity: 0.6,
        ThreddsDataServerVersion: 5,
        serverType: 'TDS',
        timeSeries: false,
        alignTimeSlider: 'right',
        timeSliderSize: 'small',
        showlegend: false,
        showControlPanel: paramObj.showAnimationPannel,
        legendPath: LegendParameter,
        zIndex: 10,
        OLEXTLegendObject: OLEXTLegendObject,
        source: {
          url: paramObj.WMS,
          params: {
            'LAYERS': paramObj.layerVariableName,
            'STYLES': 'default-scalar/x-Rainbow',
            // 'COLORSCALERANGE': '0,80',
            'SLD_BODY': SLDAll,
            'transparent': true
          }
        },
      };
      let Newlayer = new TimeDimensionTile(aa);
      let that = this;
      let AddRemoveLegendFunction = function () {
        if (this.getProperties().visible) {
          that.addLegend(this.getProperties().OLEXTLegendObject);
        } else {
          that.removeLegend(this.getProperties().OLEXTLegendObject);
        }
      };

      Newlayer.on('change:visible', AddRemoveLegendFunction);
      await Newlayer.init().then(() => {

        this.mapObject.addThreddsLayer(Newlayer);
        // myApp.map.addThreddsLayer(val);
        let l5 = new LayerSwitcher(".layerCollection", Newlayer, true);
        l5.setVisibleDivBind(true);
        // let properties = Newlayer.getProperties()
        this.appendTimeSeriesLayerCollection(l5);
      });
    },
    async setDefaultMap() {
      // Javasctipt API Stack
      setTimeout(() => {
        this.updateMapLayer();
      }, 0);

      let geoJson = await this.GETCountryGeojson();
      console.log("geoJson");
      console.log(geoJson);
      // this.vectorLayerSource.
      var format = new GeoJSON();
      var f = format.readFeature(geoJson.features[0], {
        dataProjection: "EPSG:4326",
        featureProjection: this.mapObject.getView().getProjection()
      });
      this.vectorLayerSource.addFeature(f);
      this.selectInteractionObj.getFeatures().push(f);
      this.selectInteractionObj.dispatchEvent({type: 'select'});
      // Zoom to map centre*****
      // var view = this.mapObject.getView();
      // var resolution = view.getResolutionForExtent(f.getGeometry().getExtent(), this.mapObject.getSize());
      // var zoom = view.getZoomForResolution(resolution);
      // var center = ol_extent_getCenter(f.getGeometry().getExtent());
      // // redraw before zoom
      // setTimeout(function () {
      //   view.animate({
      //     center: center,
      //     zoom: Math.min(zoom, 16)
      //   });
      // }, 100);

      // Zoom to map centre*****


      setTimeout(() => {
        eventHub.$emit('setDefaultCascaterForChart', 1, 'Population Time Series');
        console.log(50);
      }, 0);


      setTimeout(() => {
        eventHub.$emit('setDefaultCascaterForChart', 2, 'Population Pyramid', 2020);
        console.log(100);
      }, 50);


      setTimeout(() => {
        eventHub.$emit('setDefaultCascaterForChart', 3, 'Age Groups', 2020);
        console.log(150);

      }, 100);


      setTimeout(() => {
        eventHub.$emit('setDefaultCascaterForChart', 4, 'Population Distribution');
        console.log(200);
      }, 150);
    },
  },
  computed: {
    ...mapState(["SocioEconomicObject", "vectorLayerSource", "mapObject", "selectInteractionObj",]),
    ...mapGetters(["getBindedLayer",]),
    getIsInlineFormorNot() {
      return this.getInLineData();
    },
  },
  created() {
  },

  mounted() {
    // Generate the chart
    // eslint-disable-next-line no-undef

    this.setDefaultMap();
  },
}
</script>

<style scoped>
.body-container {
  height: calc(100% - 50px);
}
</style>