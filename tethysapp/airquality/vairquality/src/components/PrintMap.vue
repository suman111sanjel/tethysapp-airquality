<template>
  <div class="">
    <el-dialog
        v-model="PrintMapComponentData.PrintMapDialogVisible"
        title="Print Map"
        width="95%"
        :before-close="handleClose"
        :append-to-body="true"
        :top="'3vh'"
    >
      <el-row>
        <el-col :span="8" class="printing-control">

          <el-form
              ref="MapPrintValidateForm"
              :model="MapPrintValidateForm"
              label-width="100px"
              class="demo-ruleForm"
              size="mini"
              label-position="top"
          >

            <el-form-item
                label="Map Title"
                prop="title"
                :rules="[
        { required: true, message: 'Map title is required' },
        { type: 'string', message: 'Map title must be string' },
      ]"
            >
              <el-input
                  v-model.number="MapPrintValidateForm.title"
                  type="age"
                  autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item
                label="Output File Name"
                prop="fileName"
                :rules="[
        { required: true, message: 'Map title is required' },
        { type: 'string', message: 'Output File Name must be string' },
      ]"
            >
              <el-input
                  v-model.number="MapPrintValidateForm.fileName"
                  type="fileName"
                  autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-collapse v-model="AccordionActiveName" accordion>
                <el-collapse-item name="1">

                  <template #title>
                    <el-checkbox v-model="CheckSelectAll" label="Select legend all items"
                                 class="selectAllLegend"></el-checkbox>
                  </template>
                  <mapLagend
                      v-for="item in legendInfos"
                      :key="item.id"
                      :item="item"
                  />

                </el-collapse-item>
              </el-collapse>
            </el-form-item>
            <el-form-item>

              <el-button @click="Cancel">Cancel</el-button>

              <el-button type="primary" @click="submitForm('MapPrintValidateForm')"
              >Submit
              </el-button
              >
            </el-form-item>


          </el-form>


        </el-col>
        <el-col :span="16">
          <div class="map-print-controls">
            <div class="muted-text">Adjust the map extent as per your requirement.</div>
            <div class="grid-content bg-purple-light" id="map-control-printing">
            </div>

          </div>
        </el-col>
      </el-row>

    </el-dialog>
  </div>

</template>

<script>
import {mapState} from "vuex";
import jsPDF from "jspdf/dist/jspdf.min";

import eventHub from "../utils/utils";
import mapLagend from "./mapLagend";
import {Action} from "../store/actionType";
export default {
  name: "PrintMap",
  data() {
    return {
      MapPrintValidateForm: {
        title: '',
        fileName: ''
      },
      AccordionActiveName: '',
      CheckSelectAll: false,
      PROXY_PREFIX: Action.Base+'/apps/airquality/WMSProxy/',
      legendInfos: [],
      LegendUIList: []
    };
  },
  components: {mapLagend},
  watch: {
    CheckSelectAll(newVal) {

      this.legendInfos.forEach(function (obj1) {
        obj1.visible = newVal
      });


    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
            if (valid) {
              console.log("test");

              const layout = this.getMapPDFLayout();
              const title = this.MapPrintValidateForm.title;
              const outputfilename = this.MapPrintValidateForm.fileName;

              const mapSize = this.mapObject.getSize();
              const mapResolution = this.mapObject.getView().getResolution();
              this.mapObject.once("rendercomplete", () => {
                // setting up the canvas
                const canvas = document.createElement("canvas");
                canvas.width = layout.mapFrameSizePxl[0];
                canvas.height = layout.mapFrameSizePxl[1];
                const context = canvas.getContext("2d");

                // sort the legend by height
                let legendInfos1 = this.legendInfos.filter(function (curObje) {
                  return curObje.visible === true;
                }).sort((item1, item2) => item1.imgHeight - item2.imgHeight);

                this.copyOLMapTo(context);
                console.log(legendInfos1)

                legendInfos1.length && this.addLegendsTo(context, {
                  legendInfos: legendInfos1,
                  pos: layout.legendBoxPxl.pos,
                  columnWidth: layout.legendBoxPxl.columnWidth,
                  height: layout.legendBoxPxl.height
                });

                this.drawPolygon(context, "black", layout.northArrowCoordsPxl)
                this.drawScaleBar(context, {x: canvas.width, y: canvas.height})
                context.strokeStyle = "black";
                context.strokeRect(0, 0, canvas.width, canvas.height) // map frame border

                this.createMapPDF(title, outputfilename, canvas, layout)
                // reset original map size
                this.mapObject.setSize(mapSize);
                this.mapObject.getView().setResolution(mapResolution);
                }
              );
              // set map size to print frame size
              const frameSize = layout.mapFrameSizePxl;
              this.mapObject.setSize(frameSize);
              const scaling = Math.min(frameSize[0] / mapSize[0], frameSize[1] / mapSize[1]);
              this.mapObject.getView().setResolution(mapResolution / scaling);

            } else {

              console.log('error submit!!')

              return false
            }
          }
      )
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
    ,
    Cancel() {
      this.PrintMapComponentData.PrintMapDialogVisible = false;
      this.backToNormal();
    }
    ,
    handleClose(done) {
      done();
      this.backToNormal();
    }
    ,
    backToNormal() {
      let target = document.querySelector('#map-container2');
      this.mapObject.setTarget(target);
      this.deproxifyWMSLayers();

    },
    getMapPDFLayout() {
      const DPI = 120; // pdf's dpi
      const mmToPixel = dim_mm => dim_mm * DPI / 25.4; // 1 inch = 25.4 mm
      // all measurements are in mm if not suffixed by pxl
      const margin = 10;
      const topMargin = 15;
      const pageWidth = 297;
      const pageHeight = 210;
      const mapWidth = pageWidth - 2 * margin; // 272
      const mapHeight = pageHeight - topMargin - margin; // 180
      const mapHeightPxl = mmToPixel(mapHeight);
      // legend positions are relative to mapframe
      let legendHeightPercent = 0.42;
      let legendHeightPxl = mapHeightPxl * legendHeightPercent;
      let legendPosPxl = {
        x: mmToPixel(2),
        y: mapHeightPxl * (1 - legendHeightPercent) - mmToPixel(2)
      }
      // northArrow Coords: also relative to mapFrame
      const arrowBaseWidth = 9;
      const arrowHeight = 12;
      const arrowTop = 6;
      const arrowCenterX = mapWidth - (6 + arrowBaseWidth / 2);
      const northArrowCoords = [
        [arrowCenterX, arrowTop], // top coordinate
        [arrowCenterX + arrowBaseWidth / 2, arrowTop + arrowHeight], // rightCoordinate
        [arrowCenterX, arrowTop + 2 * arrowHeight / 3], // middleCoordinate
        [arrowCenterX - arrowBaseWidth / 2, arrowTop + arrowHeight], // leftCoordinate
      ];
      return {
        format: "a4",
        pageDim: [pageWidth, pageHeight],
        margin,
        topMargin,
        mapFrameSize: [mapWidth, mapHeight],
        mapFrameSizePxl: [mmToPixel(mapWidth), mapHeightPxl],
        northArrowCoordsPxl: northArrowCoords.map(pt => pt.map(mmToPixel)),
        legendBoxPxl: {
          pos: legendPosPxl,
          height: legendHeightPxl,
          columnWidth: 230
        },
      };
    }
    ,

    copyOLMapTo(context) {
      context.fillStyle = "white";
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      document.querySelectorAll(".ol-layer canvas").forEach(mapCanvas => {
        if (mapCanvas.width > 0) {
          const opacity = mapCanvas.parentNode.style.opacity;
          context.globalAlpha = opacity === "" ? 1 : Number(opacity);
          // get the map's transform parameters from the style's transform matrix
          const matrix = (mapCanvas.style.transform).match(/^matrix\((.*)\)$/)[1].split(",").map(Number);
          // apply the transform to the exporting temp canvas's context
          context.setTransform(...matrix);
          context.drawImage(mapCanvas, 0, 0);
        }
      });
      context.setTransform(1, 0, 0, 1, 0, 0);
    }
    ,

    addLegendsTo(context, {legendInfos, pos, columnWidth, height: maxHeight}) {
      // debugger;
      const margin = 10;
      let offsetX = margin;
      let offsetY = margin;
      const labelHeight = 22;
      const [legendBoxWidth, legendBoxHeight] = this.getLegendBoxDimension(margin, labelHeight, columnWidth, legendInfos, maxHeight);
      // re-adjust pos y according to legend Box Height
      pos.y += maxHeight - legendBoxHeight;
      // write legend title
      context.textBaseline = "bottom";
      context.fillStyle = "black";
      context.font = "bold 25px Times"
      context.fillText("Legends", pos.x + margin, pos.y - margin);
      // create white canvas on legendbox
      context.fillStyle = "white";
      context.fillRect(pos.x, pos.y, legendBoxWidth, legendBoxHeight);
      // configure text style
      context.fillStyle = "black";
      context.font = "100 18px Times";
      legendInfos.forEach(legend => {
        const itemHeight = legend.imgHeight + labelHeight + margin;
        if (offsetY + itemHeight > maxHeight) {
          offsetX += margin + columnWidth;
          offsetY = margin;
        }
        const left = pos.x + offsetX;
        const top = pos.y + offsetY;
        const img = document.createElement("img");
        // img.crossOrigin = "anonymous";
        // img.setAttribute("src", '/static/AFWatershed/images/Afghanistan_logo.png');
        img.setAttribute("src", legend.legendPath);
        context.fillText(legend.title, left, top + labelHeight);
        context.drawImage(img, left, top + labelHeight, legend.imgWidth, legend.imgHeight);
        // update to offsetY
        offsetY += itemHeight;
      });
      context.lineWidth = 1;
      context.closePath();
      context.strokeRect(pos.x, pos.y, legendBoxWidth, legendBoxHeight);
    }
    ,

    getLegendBoxDimension(margin, labelHeight, columnWidth, legendInfos, maxBoxHeight) {
      let bottomMostLegendItemY = 0;
      const lastLegendItemPos = legendInfos.reduce((prevSize, legend) => {
        const itemHeight = legend.imgHeight + labelHeight + margin;
        if (prevSize.y + itemHeight > maxBoxHeight) {
          prevSize.x += margin + columnWidth;
          prevSize.y = margin;
        }
        prevSize.y += itemHeight;
        if (bottomMostLegendItemY < prevSize.y) bottomMostLegendItemY = prevSize.y;
        return prevSize;
      }, {x: margin, y: margin});
      const width = lastLegendItemPos.x + columnWidth + margin;
      const height = bottomMostLegendItemY;
      return [width, height];
    }
    ,

    drawPolygon(context, color, coords) {
      context.lineWidth = 2;
      context.fillStyle = color;
      context.beginPath();
      context.moveTo(...coords[0]);
      for (let i = 1; i < coords.length; i++) {
        context.lineTo(...coords[i]);
      }
      context.closePath();
      context.fill();
    }
    ,

    drawScaleBar(context, rightBottomPos) {
      const {width, text} = this.getScaleBarInfo();
      const height = 30;
      const margin = 8;
      const rightOffset = 15;
      const bottomOffset = 15;
      const pos = {
        x: rightBottomPos.x - (width + margin * 2) - rightOffset,
        y: rightBottomPos.y - (height + margin * 2) - bottomOffset
      };
      // draw background
      context.globalAlpha = 0.75;
      context.fillStyle = "grey";
      context.fillRect(pos.x, pos.y, width + margin * 2, height + margin * 2)
      context.globalAlpha = 1;
      context.lineWidth = 1.5;
      context.closePath()
      context.strokeStyle = "white";
      // draw the scale line shape
      const x = pos.x + margin;
      const y = pos.y + margin;
      context.beginPath()
      context.moveTo(x, y);
      context.lineTo(x, y + height)
      context.lineTo(x + width, y + height)
      context.lineTo(x + width, y);
      context.stroke()
      // write length text below the legend box
      context.textBaseline = "bottom";
      context.textAlign = "center"
      context.fillStyle = "white";
      context.font = "15px Times";
      context.fillText(text, x + width / 2, y + height - margin);
    }
    ,

    createMapPDF(title, filename, mapCanvas, {margin, topMargin, mapFrameSize, pageDim, format}) {
      const pdf = new jsPDF("landscape", undefined, format);
      pdf.setFont("Times").setFontType("bold").setFontSize(15);
      pdf.text(title, parseInt(pageDim[0] / 2), 9, null, null, "center");
      try {
        pdf.addImage(mapCanvas.toDataURL("image/png"), "JPEG", margin, topMargin, mapFrameSize[0], mapFrameSize[1]);
        pdf.save(`${filename}.pdf`);
      } catch (error) {
        // showErrorToast("Error Occurred! Please try it again.");
        console.log(error);
      }
    }
    ,

    getScaleBarInfo() {
      const scaleLine = document.querySelector(".ol-scale-line-inner");

      return {width: scaleLine.clientWidth, text: scaleLine.innerText};
    }
    ,

    proxifyWMSLayers() {
      this.TimeSeriesLayerCollection.forEach((layerobj) => {
        let properties = layerobj.getProperties();
        if (properties.changeWMSProxy) {
          let layer = layerobj.getLayer();
          if (properties.ThreddsDataServerVersion) {
            layer.AllLayersList.forEach((timeDimensionLayer) => {
              const source = timeDimensionLayer.getSource();
              const currUrl = source.getUrls()[0];
              currUrl.includes(this.PROXY_PREFIX) || source.setUrls([this.PROXY_PREFIX + currUrl]);
            });
          }
        }
      });
    }
    ,

    deproxifyWMSLayers() {
      console.log('--------deproxy');
      this.TimeSeriesLayerCollection.forEach((layerobj) => {
        let properties = layerobj.getProperties();
        if (properties.changeWMSProxy) {
          let layer = layerobj.getLayer();
          if (properties.ThreddsDataServerVersion) {
            layer.AllLayersList.forEach((timeDimensionLayer) => {
              const source = timeDimensionLayer.getSource();
              source.setUrls([source.getUrls()[0].replace(this.PROXY_PREFIX, "")]);
            });
          }
        }
      });
    }
    ,
  },
  computed: {
    ...
        mapState(["PrintMapComponentData", "TimeSeriesLayerCollection", "mapObject"]),
  }
  ,
  mounted() {
    console.log("---------------------------------mounted----------------------------------");
  }
  ,
  beforeCreate() {
    eventHub.$on("OpenDialogOfPrintAndProxyfy", () => {
      let target = document.querySelector('#map-control-printing');
      this.mapObject.setTarget(target);
      console.log('this looks ok');
      this.mapObject.updateSize();
      this.CheckSelectAll = false;

      this.legendInfos = [];
      this.LegendUIList = [];
      this.proxifyWMSLayers();
      this.TimeSeriesLayerCollection.filter((obj) => {
        let Properties = obj.getProperties();
        if (Properties.visible === true) {
          let prop = obj.getProperties();
          let objj = {
            id: prop.id,
            visible: false,
            title: prop.title,
            legendPath: prop.legendPath
          }
          this.legendInfos.push(objj);
        }
        return true;
      });

    });
  },
  deactivated() {
    console.log("---------------------------------deactivated----------------------------------");
  }
}
</script>


<style scoped>

#map-control-printing {
  height: 700px;
  width: 100%;
  border: 1px solid grey;
  border-radius: 4px;
}

.muted-text {
  font-size: 80%;
  font-weight: 400;
  text-align: center;
}

.printing-control {
  padding-right: 20px;
}

</style>