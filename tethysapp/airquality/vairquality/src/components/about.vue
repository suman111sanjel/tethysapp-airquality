<template>
  <div class="card-box full-height full-width about-div">
    <div class="pannel-title">
      <h6 class="title-heading">About
      </h6>
      <el-button class="infoButton" type="text" @click="centerDialogVisible = true"><i class="el-icon-info"></i>
      </el-button>
    </div>
    <div class="body-container">
      <el-scrollbar height="100%">
        <p style="text-align:justify;font-size:12px;">
          The application is dashboard for air quality monitoring of Nepal.
          The system consists of different pollutant data like PM2.5, AOD, O3, SO2, NO2, CO for different openly
          available data source.
        </p>

        <el-button type="text" @click="centerDialogVisible = true">View More ..</el-button>
      </el-scrollbar>
    </div>

    <el-dialog
        title="Air Quality Information System"
        v-model="centerDialogVisible"
        width="75%"
        center>
      <span>
        <div class="contributor" style="text-align: center;">
<!--                    <img src="@/assets/USAIDlogo.png" style="height:50px;">-->
          <!--                    <img src="@/assets/NASA_LOGO.png" style="height:50px;">-->
          <!--                    <img src="@/assets/ICIMOD_Master_logo_Blue.png" style="height: 50px;position: relative;top: 5px;">-->
          <!--                    <img src="@/assets/Servir_HKH_green.png" style="height: 30px;position: relative;top: -4px;">-->
                </div>
<div>

        <p style="text-align:justify;font-size:12px;">
          The application is dashboard for air quality monitoring of Nepal.
          The system consists of different pollutant data like PM2.5, AOD, O3, SO2, NO2, CO for different openly available data source.
        </p>
      <p style="text-align:justify;font-size:12px;">
          This application is supported by two initiative SERVIR-HKH and Atmospheric Watch Initiative (AWI) of ICIMOD.
        </p>
                        </div>
      </span>
      <template #footer>
      <span class="dialog-footer">
        <el-button class="cancel-dialog" @click="centerDialogVisible = false">Cancel</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      centerDialogVisible: false
    };
  }
}
</script>

<style scoped>
.body-container {
  height: calc(100% - 54px);
}

.title-heading {
  height: 30px;
  display: inline-block;
}

.infoButton {
  height: 30px;
  min-height: 30px;
  padding: 8px 20px;
  float: right;
  color: #d2dbe3;
}

.panel-title {
  display: inline-block;
  width: 100%;
}

p {
  font-family: "Open Sans", "Segoe UI", sans-serif, Verdana, Helvetica;
  font-size: 1em;
}

.cancel-dialog {
}


</style>