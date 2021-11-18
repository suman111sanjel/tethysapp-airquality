<template>
  <div class="card-box full-height full-width about-div">
    <div class="pannel-title">
      <h6 class="title-heading">About
      </h6>
      <el-button class="infoButton" type="text" @click="centerDialogVisible = true"><i class="el-icon-info"></i>
      </el-button>
    </div>
    <div class="body-container">
      <p style="text-align:justify;font-size:12px;">
        ICIMOD is developing an integrated information platform linking weather and climate datawith agriculture
        practices in the region. The platform provides data analysis support toprofessionals responsible for developing
        agro-met advisories for government agencies and ...
      </p>
      <el-button type="text" @click="centerDialogVisible = true">View More ..</el-button>
    </div>
    <el-dialog
        title="Air Quality Information System"
        v-model="centerDialogVisible"
        width="75%"
        center>
      <span><div class="contributor" style="text-align: center;">
<!--                    <img src="@/assets/USAIDlogo.png" style="height:50px;">-->
<!--                    <img src="@/assets/NASA_LOGO.png" style="height:50px;">-->
                    <img src="@/assets/ICIMOD_Master_logo_Blue.png" style="height: 50px;position: relative;top: 5px;">
<!--                    <img src="@/assets/Servir_HKH_green.png" style="height: 30px;position: relative;top: -4px;">-->
                </div>
<div>
                            <p style="text-align:justify">
ICIMOD is a regional intergovernmental learning and knowledge-sharing centre serving the eight regional member countries of the Hindu Kush Himalaya (HKH) – Afghanistan, Bangladesh, Bhutan, China, India, Myanmar, Nepal, and Pakistan. Working in partnership with regional and international organizations, ICIMOD aims to influence policy and practices to meet environmental and livelihood challenges emerging in the HKH. ICIMOD provides a platform for researchers, practitioners, and policy makers from the region and around the globe to generate and share knowledge, support evidence-based decision making, and encourage regional cooperation.
                            </p>
                            <p style="text-align:justify">
ICIMOD works through its six regional programmes: 1) Adaptation and Resilience Building, 2) Transboundary Landscapes, 3) River Basins and Cryosphere, 4) Atmosphere, 5) Mountain Environment Regional Information System, and 6) Mountain Knowledge and Action Networks. These regional programmes are supported by four thematic areas – Livelihoods, Ecosystem Services, Water and Air, and Geospatial Solutions – and underpinned by the Knowledge Management and Communication (KMC) Unit. The Regional Atmosphere Programme involves in identifying, testing, and piloting mitigation solutions; building capacity and outreach; fostering regional collaboration and building cross-border networks; and contributing to policy at local, national, regional, and global levels.
                            </p>

<p style="text-align:justify">
The Atmospheric Watch Initiative (AWI) was established in 2013 as part of our regional programme on Atmosphere. Until December 2019, this Initiative was known as the Atmosphere Initiative. AWI’s goal is to promote the adoption of effective measures and policies to reduce air pollution and its impacts within the HKH through improved knowledge and enhanced capacity of our regional partners. Its work includes improving scientific understanding of emissions sources, atmospheric processes and change, and air pollution impacts in the HKH. The initiative is involved in identifying, testing, and piloting mitigation solutions; building capacity and outreach; fostering regional collaboration and building cross-border networks; and contributing to policy at local, national, regional, and global levels.
</p>

  <p style="text-align:justify">
AWI is developing an integrated information platform linking air quality data from various platforms for enhanced decision support in the region. This open source platform provides data analysis support to professionals responsible for air quality management and regulators. Users of this system will be able to compare different pollutants as well as single pollutant observation from different publicly available data repositories (in-situ, satellite, model) giving a wider understanding of the observed situation.
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