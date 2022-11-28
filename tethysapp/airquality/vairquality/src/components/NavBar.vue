<template>
  <nav class="navbar navbar-light template-nabar full-height">
    <div class="nav-logo-image flexBox">
      <div class="">
        <img class="logo-image-style" src="@/assets/logo-icimod.png" alt="">
      </div>
      <div class="clearfix hack logo" style="text-align:left; margin-left: 71px;">
        <p style="margin-top: 0px;">


        </p>

      </div>
    </div>
    <a class="navbar-brand flexBox" href=""> Air Quality Watch - HKH</a>
    <div class="col-md-5 flexBox infoIconAbout">
      <el-button type="primary" @click="centerDialogVisible = true">
        <font-awesome-icon icon="info-circle"/>
      </el-button>
    </div>
    <el-dialog
        title="Air Quality Information System"
        v-model="centerDialogVisible"
        width="75%"
        center>
      <div class="about-body">

        <h3 class="headingPara">About</h3>

        <p class="aboutDetPara">
          ICIMOD is a regional intergovernmental learning and knowledge-sharing centre serving the eight regional member
          countries of the Hindu Kush Himalaya (HKH) – Afghanistan, Bangladesh, Bhutan, China, India, Myanmar, Nepal,
          and Pakistan. Working in partnership with regional and international organizations, ICIMOD aims to influence
          policy and practices to meet environmental and livelihood challenges emerging in the HKH. ICIMOD provides a
          platform for researchers, practitioners, and policy makers from the region and around the globe to generate
          and share knowledge, support evidence-based decision making, and encourage regional cooperation.
        </p>
        <p class="aboutDetPara">
          ICIMOD works through its six regional programmes: 1) Adaptation and Resilience Building, 2) Transboundary
          Landscapes, 3) River Basins and Cryosphere, 4) Atmosphere, 5) Mountain Environment Regional Information
          System, and 6) Mountain Knowledge and Action Networks. These regional programmes are supported by four
          thematic areas – Livelihoods, Ecosystem Services, Water and Air, and Geospatial Solutions – and underpinned by
          the Knowledge Management and Communication (KMC) Unit. The Regional Atmosphere Programme involves in
          identifying, testing, and piloting mitigation solutions; building capacity and outreach; fostering regional
          collaboration and building cross-border networks; and contributing to policy at local, national, regional, and
          global levels.
        </p>
        <p class="aboutDetPara">
          The Atmospheric Watch Initiative (AWI) was established in 2013 as part of our regional programme on
          Atmosphere. Until December 2019, this Initiative was known as the Atmosphere Initiative. AWI’s goal is to
          promote the adoption of effective measures and policies to reduce air pollution and its impacts within the HKH
          through improved knowledge and enhanced capacity of our regional partners. Its work includes improving
          scientific understanding of emissions sources, atmospheric processes and change, and air pollution impacts in
          the HKH. The initiative is involved in identifying, testing, and piloting mitigation solutions; building
          capacity and outreach; fostering regional collaboration and building cross-border networks; and contributing
          to policy at local, national, regional, and global levels.
        </p>
        <p class="aboutDetPara">
          AWI is developing an integrated information platform linking air quality data from various platforms for
          enhanced decision support in the region. This open source platform provides data analysis support to
          professionals responsible for air quality management and regulators. Users of this system will be able to
          compare different pollutants as well as single pollutant observation from different publicly available data
          repositories (in-situ, satellite, model) giving a wider understanding of the observed situation.
        </p>
        <h3 class="headingPara">Acknowledgement for Current Data Source</h3>
        <ul>
          <li> Ground-based observation –
            <el-link type="primary" href="https://pollution.gov.np/portal/#/home">Atmospheric
              Department of Environment Nepal
            </el-link>
            ,
            <el-link type="primary" href="https://www.airnow.gov/international/us-embassies-and-consulates/"> AirNow
            </el-link>
          </li>
          <li>Satellite products –
            <el-link type="primary" href="https://modis.gsfc.nasa.gov/data/"> MODIS
            </el-link>
            ,
            <el-link type="primary" href="https://sentinel.esa.int/web/sentinel/sentinel-data-access"> TROPOMI
            </el-link>
          </li>
          <li>Air quality models –
            <el-link type="primary" href="https://gmao.gsfc.nasa.gov/weather_prediction/GEOS-CF/data_access/"> GEOS-CF
            </el-link>
          </li>
          <li>Emission inventory –
            <el-link type="primary" href="https://www.nies.go.jp/REAS/"> REAS
            </el-link>
            ,
            <el-link type="primary" href="https://edgar.jrc.ec.europa.eu/dataset_htap_v2"> EDGAR-HTAP
            </el-link>
            ,
            <el-link type="primary" href="https://gains.iiasa.ac.at/models/"> GAINS
            </el-link>
          </li>
        </ul>

        <h3 class="headingPara">Pollutants</h3>

        <ul>
          <li> Particulate Pollutants – PM2.5, PM10, PM1, TSP, AOD</li>
          <li>Gaseous Pollutants – CO, NOx, SO2, O3</li>
        </ul>


        <h3 class="headingPara">Data Categories</h3>
        <ul>
          <li>Recent (Last 24 hours)</li>
          <li>Archive (Past 1 week)</li>
          <li>Forecast (Next 48 hours),</li>
          <li>Emission Inventory (Annual)</li>
        </ul>


        <h3 class="headingPara">Contact</h3>
        <ul>
          <li>Bhupesh Adhikary</li>
          <li>Senior Air Quality Specialist, Water and Air</li>
          <li>ICIMOD</li>
          <li>bhupesh.adhikary@icimod.org</li>
        </ul>

        <h3 class="headingPara">Disclaimer!</h3>
        <ul>
          <li>
            Quality of the datasets are attributed to original data provider quality assurance/quality control.
            Additional datasets continue to be added as and when they are readily available.
          </li>
        </ul>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button class="cancel-dialog" @click="centerDialogVisible = false">Cancel</el-button>
      </span>
      </template>
    </el-dialog>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      centerDialogVisible: false,
      LangVal: true
    };
  }
}
</script>

<style scoped>
.template-nabar {
  background-color: #007196;
  overflow: hidden;
}

.navbar {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.flexBox {
  flex: 33.33%
}

.full-height {
  height: 100%;
}

.template-nabar .navbar-brand {
  /* padding-bottom: .3125rem; */
  /* margin-right: 1rem; */
  font-size: 1.7rem;
  /* line-height: inherit; */
  /* white-space: nowrap; */
}

.template-nabar a.navbar-brand {
  color: white !important;
}

.navbar-brand {
  display: inline-block;
  padding-top: .3125rem;
  padding-bottom: .3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
}

a {
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
}

.navbar-brand {
  margin-left: 1rem;
}

.nav-logo-image {
  margin-right: 15px;
  margin-top: 2px;
  margin-left: 47px;
}

.logo-image-style {
  height: 40px;
  float: left;
}

.nav-bar-font {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-feature-settings: normal;
  font-kerning: auto;
  font-optical-sizing: auto;
  font-stretch: 100%;
  font-style: normal;
  font-variant-caps: normal;
  font-variant-east-asian: normal;
  font-variant-ligatures: normal;
  font-variant-numeric: normal;
  font-variation-settings: normal;
  line-height: 1.2;
}

.navbar-brand.flexBox {
  text-align: center;
}

.col-md-5.flexBox.infoIconAbout .el-button {
  border-color: #4192ac;
}

.headingPara {
  font-weight: bold;
}

.aboutDetPara {
  text-align: justify;
}

.about-body ul {
  list-style-type: none;
}

</style>