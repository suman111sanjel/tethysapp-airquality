<template>
  <div class="card-box full-height full-width about-div">
    <!--    <div class="body-container full-height" >-->
    <!--    </div>-->
    <div class="chart-option">
      <el-row :gutter="5">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-select v-model="PlotOptionValue" placeholder="Select plot type" size="mini" class="plotSelection"
                       @change="ChangePlotOption()">
              <el-option
                  v-for="item in PlotOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-cascader
                v-if="PlotOptionValue ==='InventriesComparison'"
                v-model="CascaderValue"
                :options="CascaderInventriesComparison"
                :props="{ expandTrigger: 'hover' }"
                size="mini"
                class="full-width"
            ></el-cascader>
            <el-cascader
                v-if="PlotOptionValue ==='SectorContribution'"
                v-model="CascaderValue"
                :options="CascaderSectorContribution"
                :props="{ expandTrigger: 'hover' }"
                size="mini"
                class="full-width"
            ></el-cascader>
            <el-cascader
                v-if="PlotOptionValue ==='SectorShare'"
                v-model="CascaderValue"
                :options="CascaderSectorShare"
                :props="{ expandTrigger: 'hover' }"
                size="mini"
                class="full-width"
            ></el-cascader>
            <el-cascader
                v-if="PlotOptionValue ==='Timeseries'"
                v-model="CascaderValue"
                :options="CascaderTimeSeries"
                :props="{ expandTrigger: 'hover' }"
                size="mini"
                class="full-width"
            ></el-cascader>

          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple sync-chart">
            <el-button size="mini" @click="RefreshChart()"><i class="fas fa-sync"></i></el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="chart-div" id="chart" ref="ChartDiv">
      <!--      <div class="center-content-parent">-->
      <!--        <div class="center-content-child">-->
      <!--          Please select a layer and draw a feature to view the chart-->
      <!--        </div>-->
      <!--      </div>      -->
      <!--      -->
      <div class="flex-center-vertically">
        Please select a layer and draw a feature to view the chart
      </div>
    </div>
  </div>
</template>

<script>

import eventHub from "../utils/utils"

import Highcharts from 'highcharts';
// Alternatively, this is how to load Highstock. Highmaps is similar.
// import Highcharts from 'highcharts/highstock';

// Load the exporting module.
import Exporting from 'highcharts/modules/exporting';
import NOdata from 'highcharts/modules/no-data-to-display'
import MoreHighcharts from 'highcharts/highcharts-more';

// Initialize exporting module.
Exporting(Highcharts);
NOdata(Highcharts);
MoreHighcharts(Highcharts);
// window.Highcharts = Highcharts;

import {mapState, mapActions} from 'vuex';

import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/fontawesome';

import OLWKT from 'ol/format/WKT'

export default {
  name: "chartComponentEmission",
  props: {
    IndexValue: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      value1: '',
      PlotOptions: [{
        value: 'SectorShare',
        label: 'Sector share (%)'
      }, {
        value: 'SectorContribution',
        label: 'Sector contribution'
      }, {
        value: 'InventriesComparison',
        label: 'Inventory comparison'
      }, {
        value: 'Timeseries',
        label: 'Time series'
      }],
      PlotOptionValue: 'SectorShare',
      CascaderValue: [],
    }
  },
  methods: {
    ...mapActions(["PostChartDataProcess"]),
    updateChart(HcObject) {
      Highcharts.chart('chart', HcObject);
    },
    ChangePlotOption() {
      this.CascaderValue = [];
    },
    getHCObject(response, ArgParam) {
      if (this.PlotOptionValue == 'SectorShare') {
        let SectorShare = {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          credits: {
            enabled: false
          },
          title: {
            text: ArgParam.cascaderValue[0] + ' - ' + ArgParam.cascaderValue[1] + ' (' + ArgParam.cascaderValue[2] + ')'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          accessibility: {
            point: {
              valueSuffix: '%'
            }
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                connectorColor: 'silver'
              },
              showInLegend: true
            }
          },
          series: [{
            name: 'Sector',
            colorByPoint: true,
            data: response.data
          }]
        }
        return SectorShare;
      } else if (this.PlotOptionValue == 'SectorContribution') {
        let SectorContribution = {
          chart: {
            type: 'column'
          },
          title: {
            text: ArgParam.cascaderValue[0] + ' - ' + ArgParam.cascaderValue[1] + ' (' + ArgParam.cascaderValue[2] + ')'
          },
          subtitle: {
            text: ''
          },
          accessibility: {
            announceNewData: {
              enabled: true
            }
          },
          credits: {
            enabled: false
          },
          xAxis: {
            type: 'category'
          },
          yAxis: {
            title: {
              text: 'Emission (kt)'
            }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            series: {
              borderWidth: 0,
              dataLabels: {
                enabled: false,
                format: '{point.y:.1f}%'
              }
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> kt<br/>'
          },
          series: [
            {
              name: "Sector",
              colorByPoint: true,
              data: response.data
            }
          ]
        };
        return SectorContribution
      } else if (this.PlotOptionValue == 'InventriesComparison') {
        let InventriesComparison = {
          chart: {
            type: 'column'
          },
          title: {
            text: ArgParam.cascaderValue[0] + ' - ' + ArgParam.cascaderValue[1] + ' (' + ArgParam.cascaderValue[2] + ')'
          },
          subtitle: {
            text: ''
          },
          accessibility: {
            announceNewData: {
              enabled: true
            }
          },
          credits: {
            enabled: false
          },
          xAxis: {
            type: 'category'
          },
          yAxis: {
            title: {
              text: 'Emission (kt)'
            }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            series: {
              borderWidth: 0,
              dataLabels: {
                enabled: false,
                format: '{point.y:.1f}%'
              }
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> kt<br/>'
          },
          series: [
            {
              name: "Sector",
              colorByPoint: true,
              data: response.data
            }
          ]
        };
        return InventriesComparison;
      } else if (this.PlotOptionValue == 'Timeseries') {
        let TickPositioner__yyyy_func = function (data) {
          let PositionList = [];
          data.forEach(function (val) {
            PositionList.push(val[0])
          })
          let TickPositionerFunction = function () {
            return PositionList;
          }
          return TickPositionerFunction
        };

        let TickPositioner__yyyy = TickPositioner__yyyy_func(response.data);

        let DateFormatter__dd_func = function () {
          return Highcharts.dateFormat('%Y', this.value);
        };

        let Timeseries = {
          chart: {
            type: 'spline',
            zoomType: 'x'
          },
          title: {
            text: response.title
          },
          subtitle: {
            text: ''
          },
          xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
              month: '%e. %b',
              year: '%b'
            },
            title: {
              text: 'Date'
            },
            tickPositioner: TickPositioner__yyyy,
            labels: {
              formatter: DateFormatter__dd_func
            }
          },
          yAxis: {
            title: {
              text: 'Emission (kt)'
            },
          },
          legend: {
            enabled: false
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            series: {
              label: {
                enabled: false
              },
              marker: {
                enabled: true
              }
            }
          },
          series: [{
            name: "Pollutant",
            data: response.data
          }],
        };
        return Timeseries
      }
    },
    async RefreshChart() {
      // debugger;
      if (this.selectInteractionObj) {

        if (this.selectInteractionObj.getFeatures().getLength()) {
          var wktfeaturegeom, geometryType;
          var features = this.selectInteractionObj.getFeatures();

          features.forEach(function (f) {
            var format = new OLWKT();
            wktfeaturegeom = format.writeGeometry(f.getGeometry(), {
              dataProjection: 'EPSG:4326',
              featureProjection: 'EPSG:3857'
            });
            geometryType = f.getGeometry().getType();
          });

          if (this.CascaderValue.length) {
            let Param = {
              cascaderValue: this.CascaderValue,
              geometryType: geometryType,
              wkt: wktfeaturegeom,
              plotType: this.PlotOptionValue
            };
            console.log(Param);
            let response = await this.PostChartDataProcess(Param);
            if (response.code == 200) {
              let hcObject = this.getHCObject(response, Param);
              this.HCObject = Highcharts.chart(this.$refs.ChartDiv, hcObject);
            } else {
              this.$notify({
                title: 'Error',
                message: 'Please select a valid polygon or point',
                type: 'error'
              });
              if (this.HCObject) {
                this.HCObject.destroy();
              }
            }
          } else {
            this.$notify({
              title: 'Warning',
              message: 'Please select plot parameters',
              type: 'warning'
            });
          }
        } else {
          this.$notify({
            title: 'Warning',
            message: 'Please select a feature on map.',
            type: 'warning'
          });
        }

      }
    }
  },

  computed: {
    ...mapState(["CascaderInventriesComparison", "CascaderSectorContribution", "CascaderSectorShare", "CascaderTimeSeries", "selectInteractionObj"]),
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

  beforeCreate() {
    eventHub.$on('setDefaultCascaterForChart', (indexVal, pltOpt, casVal) => {
      if (this.IndexValue == indexVal) {
        this.PlotOptionValue = pltOpt;
        setTimeout(() => {
          this.CascaderValue = casVal;
          this.RefreshChart();
        },500);
      }
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
  height: calc(100% - 40px);
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
</style>
