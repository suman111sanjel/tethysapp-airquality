<template>
  <div class="card-box full-height full-width about-div">
    <!--    <div class="body-container full-height" >-->
    <!--    </div>-->
    <div class="chart-option">
      <el-row :gutter="5">
        <el-col :span="14">
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
        <el-col v-if="PlotOptionValue=='Age Groups' || PlotOptionValue=='Population Pyramid'" :span="7">
          <div class="grid-content bg-purple">
            <el-select v-model="CurrentYear" placeholder="Select plot type" size="mini" class="plotSelection"
            >
              <el-option
                  v-for="item in dataOptions.pop_year"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple sync-chart">
            <el-button size="mini" @click="RefreshChart()" :disabled="isLoading"><i class="fas fa-sync"></i></el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="chart-div" id="chart" ref="ChartDiv" v-loading="isLoading">


    </div>
    <!--    -->
    <!--    <div class="chart-div" v-loading="isLoading">-->

    <!--    </div>-->

  </div>
</template>

<script>

import eventHub from "../../utils/utils"

import Highcharts from 'highcharts';
// Alternatively, this is how to load Highstock. Highmaps is similar.
// import Highcharts from 'highcharts/highstock';

// Load the exporting module.
import Exporting from 'highcharts/modules/exporting';
import NOdata from 'highcharts/modules/no-data-to-display'
import MoreHighcharts from 'highcharts/highcharts-more';
import coloraxis from 'highcharts/modules/coloraxis'

// Initialize exporting module.
Exporting(Highcharts);
NOdata(Highcharts);
MoreHighcharts(Highcharts);
coloraxis(Highcharts);


// window.Highcharts = Highcharts;

import {mapState, mapActions} from 'vuex';

import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/fontawesome';

import OLWKT from 'ol/format/WKT'
import {dataSelect} from "../../utils/dataSocioEconomic";

export default {
  name: "chartComponentSocioEconomic",
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
        value: 'Population Time Series',
        label: 'Population Time Series'
      }, {
        value: 'Population Pyramid',
        label: 'Population Pyramid'
      }, {
        value: 'Age Groups',
        label: 'Age Groups'
      }, {
        value: 'Population Distribution',
        label: 'Population Distribution'
      }],
      PlotOptionValue: 'Population Time Series',
      CascaderValue: [],
      CurrentYear: '',
      dataOptions: dataSelect,
      isLoading: true,
    }
  },
  methods: {
    ...mapActions(["PostChartDataProcessSocioEconomic"]),
    updateChart(HcObject) {
      Highcharts.chart('chart', HcObject);
    },
    ChangePlotOption() {
      this.CascaderValue = [];
    },
    getHCObject(response) {
      if (response.plotType == 'Population Pyramid') {
        let SectorShare = {
          chart: {
            type: 'bar'
          },
          title: {
            text: 'Population Pyramid ' + response.Year
          },
          subtitle: {
            text: ''
          },
          xAxis: [{
            categories: response['categories'],
            reversed: false,
            labels: {
              step: 1
            },
            title: {
              text: 'Age',
              // align: 'high'
            },
          }, { // mirror axis on right side
            opposite: true,
            reversed: false,
            categories: response['categories'],
            linkedTo: 0,
            labels: {
              step: 1
            },
            title: {
              text: 'Age',
              // align: 'high'
            },
          }],
          yAxis: [{
            title: {
              text: null
            },
            labels: {
              formatter: function () {
                return Math.abs(this.value) > 1000 ? (Highcharts.numberFormat(Math.abs(this.value) / 1000, 0) + 'k') : Highcharts.numberFormat(Math.abs(this.value), 0);
              }
            },
            reversed: true,
            width: '50%'
          }, {
            title: {
              text: null
            },
            labels: {
              formatter: function () {
                return Math.abs(this.value) > 1000 ? (Highcharts.numberFormat(Math.abs(this.value) / 1000, 0) + 'k') : Highcharts.numberFormat(Math.abs(this.value), 0);
              }
            },
            left: '50%',
            offset: 0,
            showFirstLabel: false,
            width: '50%'
          }],
          tooltip: {
            valueSuffix: ''
          },
          credits: {
            enabled: false
          },

          series: [{
            name: 'Male',
            data: response['male'],
            color: '#00688B'
          }, {
            name: 'Female',
            colorAxis: 1,
            data: response['female'],
            yAxis: 1,
            color: '#FF34B3'
          }]
        };
        console.log(JSON.stringify(SectorShare));
        return SectorShare;
      } else if (response.plotType == 'Population Time Series') {
        let TickPositioner__yyyy_func = function (data) {
          let PositionList = [];
          data.forEach(function (val, index) {
            if (index % 4 == 0) {
              PositionList.push(val[0])
            }
          })
          let TickPositionerFunction = function () {
            return PositionList;
          }
          return TickPositionerFunction
        };

        let TickPositioner__yyyy = TickPositioner__yyyy_func(response.populationDensity);

        let DateFormatter__dd_func = function () {
          return Highcharts.dateFormat('%Y', this.value);
        };

        let Timeseries = {
          chart: {
            type: 'spline',
            zoomType: 'x'
          },
          title: {
            text: 'Population Density Time Series'
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
              formatter: DateFormatter__dd_func,
            }
          },
          yAxis: {
            title: {
              text: 'People per Km<sup>2</sup>',
              useHTML:true
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
            data: response.populationDensity,
            color: '#7cb5ec'
          }],
        };
        return Timeseries
      } else if (response.plotType == 'Age Groups') {
        let AgeGroup = {
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
            text: 'Age Group'
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
              borderRadius: 5,
              dataLabels: {
                enabled: true,
                format: '<!--<b>{point.name}</b>--><br>{point.percentage:.1f} %',
                distance: -50,
                filter: {
                  property: 'percentage',
                  operator: '>',
                  value: 4
                }
              },
              showInLegend: true
            }
          },
          series: [{
            name: 'Age Groups',
            colorByPoint: true,
            data: response.PieChartData,
          }]
        }
        return AgeGroup;
      } else if (response.plotType == 'Population Distribution') {
        let PopulationDistribution = {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Population Distribution'
          },
          xAxis: {
            categories: response.categories
          },
          yAxis: {
            title: {
              text: 'Count'
            }
          },
          credits: {
            enabled: false
          },
          plotOptions: {},
          series: [{
            name: 'Total Population',
            data: response.data,
            color: '#7cb5ec'
          }]
        }
        return PopulationDistribution;

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

          let Param = {
            year: this.CurrentYear,
            geometryType: geometryType,
            wkt: wktfeaturegeom,
            plotType: this.PlotOptionValue
          };
          this.isLoading = true;
          let response = await this.PostChartDataProcessSocioEconomic(Param);
          if (response.code == 200) {
            console.log({response: response, param: Param});
            let hcObject = this.getHCObject(response, Param);
            this.HCObject = Highcharts.chart(this.$refs.ChartDiv, hcObject);
            this.isLoading = false;

          } else {
            this.$notify({
              title: 'Error',
              message: 'Please select a valid polygon or point',
              type: 'error'
            });
            if (this.HCObject) {
              this.HCObject.destroy();
            }
            this.isLoading = false;
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
//     Generate the chart
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
        if (casVal) {
          this.CurrentYear = casVal;
        }
        setTimeout(() => {
          this.RefreshChart();
        }, 500);
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


.grid-content.bg-purple.sync-chart button {
  padding-left: 12px;
}


</style>
