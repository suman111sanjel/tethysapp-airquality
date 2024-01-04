<template>
  <div class="card-box full-height full-width about-div" ref="outerViz">
    <div v-if="visualizationIn =='chart'" class="chart-div" :id="'chart'+IndexValue" ref="ChartDiv">
      <div class="flex-center-vertically">
        <!--        Please select a layer and draw a feature to view the chart-->
        <el-skeleton :rows="5" animated/>
      </div>
    </div>

    <div v-if="visualizationIn =='2Dimage'" class="position-relative  full-width full-height" ref="Image2D">
      <div class="download-map-Image" @click="downloadImage()">
        <i class="fas fa-download"></i>
      </div>
      <div class="vertically-center">
        <img class="generated-image" :width="imageInfo.width" :src="imageInfo.url">
      </div>
    </div>
  </div>
</template>

<script>

import eventHub from "../../utils/utils"

import Highcharts from 'highcharts';
// Alternatively, this is how to load Highstock. Highmaps is similar.
// import Highcharts from 'highcharts/highstock';

// Load the exporting module.
import Exporting from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data';
import NOdata from 'highcharts/modules/no-data-to-display'
import MoreHighcharts from 'highcharts/highcharts-more';

// Initialize exporting module.
Exporting(Highcharts);
NOdata(Highcharts);
MoreHighcharts(Highcharts);
ExportData(Highcharts);

// window.Highcharts = Highcharts;
import {AirPollutionWatchApp} from "../../utils/dataArchive";
import {mapActions, mapState, mapGetters} from 'vuex';


export default {
  name: "chartComponent",
  props: {
    IndexValue: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      AirPollutionWatchApp: AirPollutionWatchApp,
      visualizationIn: 'chart',
      imageInfo: {
        url: '',
        downloadFileName: '',
        width: ''
      }
    }
  },
  methods: {
    ...mapActions(["PostGetStationData", "PostGet2DImage", "TimeSeriesRasterQuery"]),
    async renderVisualization() {
      if (this.mapControlVariable.data_period == "Recent") {
        if (this.mapControlVariable.select_by == "Parameter") {

          let kk = this.getCascaderInfoObject(this.mapControlVariable.parameter_by_pollutant_value[1]);
          if (kk.stationData) {
            this.ObservationDatavisualization(kk, this.mapControlVariable["parameter_by_pollutant_value_stationData_val" + this.IndexValue]);
          } else {
            console.log("");
            // let Extent = [];
            // this.mapControlVariable["parameter_by_location__" + this.IndexValue].featureExtent.forEach(function (ext1) {
            //   Extent.push(parseFloat(ext1.toFixed(6)))
            // });
            // console.log(Extent);
            // let layer = await this.getBindedLayer(kk.layerId);
            // layer.setVisibleDivBind(true);
            // // let NewMapObj = myApp.CreateMapObject(WorkingIndex);
            // let layerPropertiesObject = await this.getLayer(kk.layerId).getCurrentLayer().getProperties();
            // let layerSourceParam = layerPropertiesObject.source.getParams();
            // // let layerUrl = layerPropertiesObject.source.getUrls()[0].split('wms')[1];
            // let plotProp = layerPropertiesObject.plotInfo();
            // plotProp.wmsList = layerPropertiesObject.wmsList;
            // plotProp.LAYER = layerSourceParam.LAYERS;
            // plotProp.TIME = layerSourceParam.TIME;
            // plotProp.COLORSCALERANGE = layerSourceParam.COLORSCALERANGE;
            // plotProp.BBOX = Extent;
            // let date = new Date(layerSourceParam.TIME);
            // let dateTimeFormat = new Intl.DateTimeFormat('en', {year: 'numeric', month: 'short', day: '2-digit'});
            // let [{value: month}, , {value: day}, , {value: year}] = dateTimeFormat.formatToParts(date)
            // let completeDateLabel = `${day} ${month} ${year}`;
            // plotProp.labelName = completeDateLabel + layerPropertiesObject.plotInfo().LabelTitleTime;
            // this.visualizationIn = '2Dimage';
            // let w = this.$refs.outerViz.clientWidth;
            // let h = this.$refs.outerViz.clientHeight;
            // let width = w / 96;
            // let height = h / 96;
            // plotProp.width = width.toFixed(3);
            // plotProp.height = height.toFixed(3);
            // plotProp.rid = 0;
            // let ParseJson = await this.PostGet2DImage(plotProp);
            // this.imageInfo.url = ParseJson.image;
            // this.imageInfo.downloadFileName = plotProp.title + '.png';
            // this.imageInfo.width = w;
          }
        } else {
          //by location
          let kk = this.getCascaderInfoObject(this.mapControlVariable["location_by_pollutant_value" + this.IndexValue][1]);
          if (kk.stationData) {
            this.ObservationDatavisualization(kk, this.mapControlVariable["location_by_pollutant_value" + this.IndexValue][2]);
          }
        }
      } else if (this.mapControlVariable.data_period == "Archive") {

        if (this.mapControlVariable.select_by == "Parameter") {
          let kk = this.getCascaderInfoObject(this.mapControlVariable.parameter_by_pollutant_value[1]);
          if (kk.stationData) {
            this.ObservationDatavisualization(kk, this.mapControlVariable["parameter_by_pollutant_value_stationData_val" + this.IndexValue]);
          } else {
            this.TimeSeriesPlot(kk, this.mapControlVariable["parameter_by_location__" + this.IndexValue].wktValue, this.mapControlVariable["parameter_by_location__" + this.IndexValue].geometryType,this.mapControlVariable["parameter_by_location__" + this.IndexValue].default_level_value);
          }
        } else {
          //by location
          let kk = this.getCascaderInfoObject(this.mapControlVariable["location_by_pollutant_value" + this.IndexValue][1]);
          if (kk.stationData) {
            this.ObservationDatavisualization(kk, this.mapControlVariable["location_by_pollutant_value" + this.IndexValue][2]);
          } else {
            if (this.mapControlVariable.location_by_wktValue) {
              this.TimeSeriesPlot(kk, this.mapControlVariable.location_by_wktValue, this.mapControlVariable.location_by_geometryType,this.mapControlVariable.location_by_default_level_value);
            } else {
              this.$notify({
                title: 'Warning',
                message: 'Please select a location on map for time series visualization of ' + kk.label,
                type: 'warning'
              });
            }
          }
        }
      } else {
        if (this.mapControlVariable.select_by == "Parameter") {
          let kk = this.getCascaderInfoObject(this.mapControlVariable.parameter_by_pollutant_value[1]);
          this.TimeSeriesPlot(kk, this.mapControlVariable["parameter_by_location__" + this.IndexValue].wktValue, this.mapControlVariable["parameter_by_location__" + this.IndexValue].geometryType,this.mapControlVariable["parameter_by_location__" + this.IndexValue].default_level_value);
        } else {
          //by location
          let kk = this.getCascaderInfoObject(this.mapControlVariable["location_by_pollutant_value" + this.IndexValue][1]);
          this.TimeSeriesPlot(kk, this.mapControlVariable.location_by_wktValue, this.mapControlVariable.location_by_geometryType,this.mapControlVariable.location_by_default_level_value);
        }
      }

      // else if (this.mapControlVariable.data_period == "Archive") {
      //
      // } else if (this.mapControlVariable.data_period == "Forecast") {
      //
      // }

    },
    getCascaderInfoObject(stationObjectValue) {
      let interestedObje = {};
      this.AirPollutionWatchApp.cascaderObj.filter((obj1) => {
        return obj1.children.filter((obj2) => {
          if (obj2.value == stationObjectValue) {
            interestedObje = obj2;
          }
          return obj2.value == stationObjectValue
        }).length > 0 ? true : false;
      });
      return interestedObje;
    },
    async ObservationDatavisualization(kk, stationId) {
      let layer = this.getBindedLayer(kk.layerId);
      layer.setVisibleDivBind(true);
      let param = {
        stId: stationId,
        ModelClass: kk.ModelClass,
        ModelClassDataList: kk.ModelClassDataList,
        typeName: kk.typeName,
        StartDate: this.AirPollutionWatchApp.formatDate(AirPollutionWatchApp.startDate),
        EndDate: this.AirPollutionWatchApp.formatDate(AirPollutionWatchApp.endDate)
      };
      let parsedData = await this.PostGetStationData(param);
      this.visualizationIn = 'chart'
      var stationObject = kk.childrenData.filter((stdata) => {
        return stdata.value == stationId
      })[0]

      let stationName = stationObject.folder_name;

      let title;
      if (this.mapControlVariable.data_period == "Recent") {
        title = kk.chart.title(stationName, this.AirPollutionWatchApp.formatDate(AirPollutionWatchApp.startDate));
      } else {
        title = kk.chart.title(stationName, this.AirPollutionWatchApp.formatDate(AirPollutionWatchApp.startDate), this.AirPollutionWatchApp.formatDate(AirPollutionWatchApp.endDate));
      }
      // debugger;
      let XaxisLabel = kk.chart.XaxisLabel();
      let plotType = kk.chart.plotType;
      let highchartsObj = null;
      if (plotType === 'point') {
        highchartsObj = this.AirPollutionWatchApp.datetimePointChartObj(title, kk.chart.subTitle, parsedData.SeriesData, kk.chart.SeriesName, kk.chart.YaxisLabel, XaxisLabel, this.AirPollutionWatchApp.IndexColors[this.IndexValue - 1], this.mapControlVariable.data_period + " ")
      } else {
        highchartsObj = this.AirPollutionWatchApp.datetimeChartObj(title, kk.chart.subTitle, parsedData.SeriesData, kk.chart.SeriesName, kk.chart.YaxisLabel, XaxisLabel, this.AirPollutionWatchApp.IndexColors[this.IndexValue - 1], this.mapControlVariable.data_period + " ")
      }
      Highcharts.chart('chart' + this.IndexValue, highchartsObj);

    },
    downloadImage() {
      this.AirPollutionWatchApp.forceDownload(this.imageInfo.url, this.imageInfo.downloadFileName);
    },
    async TimeSeriesPlot(kk, WKT, WKTType,default_level_value) {

      let layerBind = this.getBindedLayer(kk.layerId);
      let layer = layerBind.getLayer();

      let SourceParam = null;
      let SourceURL = null;
      let layerProperties = null;

      if (layer.getProperties().ThreddsDataServerVersion) {
        layerProperties = layer.getProperties();
        SourceParam = layer.getCurrentLayer().getProperties().source.getParams();
        SourceURL = [];
        layerProperties.source.url.forEach(function (val) {
          SourceURL.push(val.split('/wms/')[1]);
        });

      } else {
        layerProperties = layer.getProperties();
        SourceParam = layer.source.getParams();
        SourceURL = layer.source.getUrls()[0].split('wms')[1];
      }
      let param = {
        DATADIR: SourceURL,
        LAYER: SourceParam.LAYERS,
        wkt: WKT,
        type: WKTType
      };

      let parsedData = await this.TimeSeriesRasterQuery(param);
      if (parsedData.status === 200) {
        let title =  layerProperties.chartDetail.Product + " ("+layerProperties.chartDetail.Source+")";
        let subTitle;
        if (default_level_value) {
          subTitle = default_level_value;
        } else {
          subTitle = parsedData.geom;
        }
        let YaxisLabel = layerProperties.chartDetail.unit;
        let SeriesName = layerProperties.chartDetail.SeriesName;
        let highchartsObj = this.AirPollutionWatchApp.datetimeChartObj(title, subTitle, parsedData.SeriesData, SeriesName, YaxisLabel, parsedData.XaxisLabel, this.AirPollutionWatchApp.IndexColors[this.IndexValue - 1])
        Highcharts.chart('chart' + this.IndexValue, highchartsObj);
      }
    }
  },
  computed: {
    ...mapState(["mapControlVariable", "TimeSeriesLayerCollection"]),
    ...mapGetters(["getBindedLayer", "getLayer"]),
  },
  created() {
    eventHub.$on("getVisualization", () => {
      this.renderVisualization();
    });
  },
  async mounted() {

    // Generate the chart
//     Highcharts.chart('chart', {
//       credits: {
//         enabled: false
//       },
//       title: {
//         align: "center",
//         text: "Select Indices to Display Chart",
//       },
//       series: [{
//         data: [],
//       }],
//       chart: {
//         backgroundColor: 'rgba(255,255,255,0)',
//         style: {
//           "fontFamily": "Lato,\"Lucida Grande\", \"Lucida Sans Unicode\", Verdana, Arial, Helvetica, sans-serif",
//           "fontSize": "12px"
//         },
//
//         animation: true,
//         zoomType: 'x',
// //        borderColor: '#000000',
// //        borderWidth: 2,
//         type: 'area',
//       },
//       noData: {
//         style: {
//           fontWeight: 'bold',
//           fontSize: '15px',
//           color: '#303030'
//         }
//       },
//     });
    eventHub.$on('UpdateChart', (HcObject) => {
      this.updateChart(HcObject);
    });
  },
};
</script>

<style scoped>

.chart-option .el-row {
  margin-left: 5px !important;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-right: 8px !important;
}

.chart-option {
  border-bottom: solid 1px #e2e2e2;
}

.chart-div {
  height: 100%;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.center-content-parent {
  position: relative;
}

.center-content-child {
  width: 100%;
  height: 100%;
  padding: 20px;

  position: absolute;
  top: 50%;
  left: 50%;

  margin: -70px 0 0 -170px;
}

.flex-center-vertically {
  padding: 20px;
  justify-content: center;
  display: flex;
  text-align: center;
  flex-direction: column;
  height: 100%;
}

.plotSelection {
  display: block;
}

.sync-chart .el-button {
  width: 100%;
}

.position-relative {
  position: relative !important;
}

.download-map-Image {
  z-index: 1000;
  position: absolute;
  right: 10px;
  top: 10px;
  color: #afacac;
  cursor: pointer;
}

.vertically-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
