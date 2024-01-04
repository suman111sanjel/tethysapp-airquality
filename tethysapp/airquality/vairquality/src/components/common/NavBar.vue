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
        <font-awesome-icon icon="info-circle" class="infoTabIcon"/>
      </el-button>
    </div>
    <el-dialog
        title="Air Quality Information System"
        v-model="centerDialogVisible"
        width="75%"
        center class="model-title-header">
      <div class="aboutContent">
        <h3 class="headingPara">About</h3>
        <p class="">
          <a href="https://www.icimod.org/">ICIMOD</a> , a regional intergovernmental organization, serves the eight
          countries of the Hindu Kush Himalaya
          (HKH) - Afghanistan, Bangladesh, Bhutan, China, India, Myanmar, Nepal, and Pakistan. It aims to influence
          policies and practices addressing environmental and livelihood challenges in the HKH region. The institute
          offers a platform for global researchers, practitioners, and policymakers to share knowledge, support
          evidence-based decisions, and promote regional cooperation.
        </p>

        <p class="">
          ICIMOD's fifth Medium-Term Action Plan (MTAP V: 2023-2026) outlines a roadmap for achieving a greener,
          inclusive, and climate resilient HKH. The plan consists of three Strategic Groups (SGs): Reducing Climate and
          Environmental Risks, Shaping Green and Resilient Mountain Economies, and Enabling Regional and Global
          Mechanisms for Sustainable Action. Each SG includes two Action Areas (AAs). SG1 includes Action Area A (AAA)
          and Action Area B (AAB); AAB focuses on stimulating action for clean air by strengthening institutions,
          capacity, policies, and investments for air quality improvement.
        </p>
        <p class="">
          Established in 2013 as part of the regional atmosphere program, the Atmospheric Watch Initiative (AWI) was
          previously known as the Atmosphere Initiative until December 2019. AWI aims to reduce air pollution impacts in
          the HKH through enhanced knowledge and capacity. It works on understanding emissions sources, atmospheric
          processes, air pollution impacts, testing mitigation solutions, building cross-border networks, and
          contributing to policies at various levels.
        </p>
        <p class="">
          The Air Quality Watch-HKH initiative is developing an integrated information platform for air quality data.
          This platform supports decision-making by professionals responsible for air quality management. It enables
          users to compare pollutants and observations from different data sources, providing a comprehensive
          understanding of the situation.
        </p>

        <h3 class="headingPara">Pollutants name: </h3>
        <p class="">
          Aerosol optical depth (AOD), Ozone(O<sub>3</sub>), Sulphur dioxide (SO<sub>2</sub>), Nitrogen dioxide (NO<sub>2</sub>),
          Carbon-monoxide (CO), Particulate matter (PM<sub>2.5</sub>)
        </p>

        <h3 class="headingPara">Data/tools categories:</h3>


        <div class="data-tool">

          <el-collapse>
            <el-collapse-item title="Recent (Last 24 hours)" name="1">
              <div>
                <a href="https://www.airnow.gov/">AirNow network</a>: https://www.airnow.gov/): The U.S. EPA AirNow
                program provides air quality data and information at
                state, national, and globally. AirNow receives real-time air quality observations from over 2,000
                monitoring stations and collects forecasts for more than 300 cities. In Air Quality Watch-HKH, every day
                last 24-hour PM<sub>2.5</sub> concentrations were displayed for eight selected stations: Dhaka, Lahore,
                Kolkata,
                Yangon, Kathmandu, Islamabad, Kabul, and New Delhi.


              </div>
              <br>
              <div class="">
                <a href="https://aeronet.gsfc.nasa.gov/">AERONET</a>: The AErosol RObotic NETwork (AERONET) is a network
                of ground-based sun photometers that measure aerosol
                properties. It provides continuous cloud-screened observations of spectral aerosol optical depth (AOD).
                AOD is regularly measured every 15 minutes 340, 380, 440, 500, 675, 870, 940, and 1020 nm following a
                direct measurement of the Sun when cloud-free. The AERONET AOD database has been widely used for
                statistical assessment and evaluation of satellite and model AOD. In Air Quality Watch-HKH, AERONET
                level 1.5 AOD measured at 500 nm is analyzed and extracted for the following stations: Amity University
                Gurgaon, Bhola, Bidur, Dhaka University, Gandhi College, IIT Delhi, Kanpur, Karachi, Lahore, Lumbini
                North, Mandalay MTU.
              </div>
              <br>
              <div class="">
                <strong>Terra Modis True color</strong> (Red: VIS<sub>0.64</sub> micrometer; Green: VIS<sub>0.51</sub>
                micrometer, Blue:
                VIS<sub>0.47</sub> micrometer) is
                used for layer control over the HKH domain in the dashboard: Suite of Red-Green-Blue (RGB) products from
                the geostationary Advanced Meteorological Instrument (AMI) for monitoring can help better understand the
                evolution of dust, fires, haze, smoke, cloud, fog, and snow.
              </div>

              <div class="">
                Using the three visible channels of AMI, this system monitors aerosols, clouds, and vegetation. It is
                designed to imitate the visual perception of a scene as perceived by the human eye.
              </div>

            </el-collapse-item>
            <el-collapse-item title="Archive (Past 1 week)" name="2">
              <strong>TROPOMI satellite</strong>

              <div>
                Copernicus Sentinel-5 Precursor (S5P) satellite carrying the TROPOspheric Monitoring Instrument
                (TROPOMI)
                instrument is the first of the atmospheric composition Sentinels, launched on 13 October 2017, provides
                high spatial-temporal resolution atmospheric measurements of pollutants such as NO<sub>2</sub>, CO,
                SO<sub>2</sub>, and PM<sub>2.5</sub>.
                Its mission is to reduce gaps in the availability of global atmospheric data products between
                SCIAMACHY/Envisat (which ended in April 2012), the OMI/AURA mission, and the future Copernicus
                Sentinel-4
                and Sentinel-5 missions. TROPOMI, a state-of-the-art spectrometer satellite with a swath width of ~2600
                km, maps the global atmosphere daily. Tropomi total column level 3 NO<sub>2</sub> & SO<sub>2</sub> data
                products are available
                at 5.5x3.5 and CO at 7.0x7.0 resolution.

                Copernicus Sentinel-5 Precursor (S5P) satellite carrying the TROPOspheric Monitoring Instrument
                (TROPOMI) instrument is the first of the atmospheric composition Sentinels, launched on 13 October 2017,
                provides high spatial-temporal resolution atmospheric measurements of pollutants such as NO<sub>2</sub>,
                CO,
                SO<sub>2</sub>, and PM<sub>2.5</sub>. Its mission is to reduce gaps in the availability of global
                atmospheric data products between
                SCIAMACHY/Envisat (which ended in April 2012), the OMI/AURA mission, and the future Copernicus
                Sentinel-4 and Sentinel-5 missions. TROPOMI, a state-of-the-art spectrometer satellite with a swath
                width of ~2600 km, maps the global atmosphere daily. Tropomi total column level 3 NO<sub>2</sub> &
                SO<sub>2</sub> data
                products available at 5.5x3.5, and CO at 7.0x7.0 resolution is used on the ICIMOD dashboard.

              </div>
              <br>


              <strong>MODIS (TERRA) satellite AOD </strong>

              <div>
                The MODIS (Moderate Resolution Imaging Spectroradiometer) instrument on board the Terra satellite
                monitors the ambient aerosol optical thickness over land and ocean surfaces globally at a spatial
                resolution of 250m at nadir, 500m, and 1km. The instrument captures data in the visible and
                near-infrared regions of the electromagnetic spectrum with a swath of 2,330 km and provides global
                coverage every one to two days. It measures the amount of aerosol particles present in a vertical column
                of the atmosphere. It quantifies the extinction of solar radiation due to aerosol scattering and
                absorption. We add satellite AOD data in Air Quality Watch-HKH for understanding air quality, climate
                modeling, and studying the impact of aerosols on weather patterns and ecosystems.
              </div>
              <br>


              <strong> <a href="https://geos-chem.seas.harvard.edu/geos-overview">GEOS-Chem (Reanalysis)</a> </strong>

              <div>
                The Global Modeling and Assimilation Office (GMAO) uses the GEOS ESM system to generate GEOS-Forward
                Processing (GEOS-FP) data products in near real-time or reanalysis modes supporting diverse user
                communities. The FP products are primarily used for real-time support for NASA field campaigns, support
                for NASA science, GEOS system evaluation, and interaction with other data assimilation centers. We have
                downloaded six-hourly PM<sub>2.5</sub>, O<sub>3</sub>, SO<sub>2</sub>, NO<sub>2</sub>, and CO data over
                the selected domain.
              </div>
              <br>
              <strong>Terra Modis True color </strong>
              <div>
                (Red: VIS <sub>0.64</sub> micrometer; Green: VIS <sub>0.51</sub> micrometer, Blue: VIS <sub>0.47</sub>
                micrometer) is used for layer control
                over the HKH domain in the dashboard: Suite of Red-Green-Blue (RGB) products from the geostationary
                Advanced Meteorological Instrument (AMI) for monitoring can help better understand the evolution of
                dust, fires, haze, smoke, cloud, fog, and snow.
                Using the three visible channels of AMI, this system monitors aerosols, clouds, and vegetation. It is
                designed to imitate the visual perception of a scene as perceived by the human eye.
              </div>
              <br>
            </el-collapse-item>
            <el-collapse-item title="Forecast (Next 48 hours)" name="3">
              <strong> <a href="https://gmao.gsfc.nasa.gov/weather_prediction/GEOS-CF/">GEOS-CF (model data)</a>
              </strong>
              <div>
                The GEOS-Composition Forecasting (GEOS-CF) system generates real-time distributions of atmospheric
                constituents, including five-day forecasts, beginning at 12Z, with a horizontal resolution of about
                25km. GEOS-CF was made possible by including the GEOS-Chem chemistry model in GEOS. The system uses a
                contemporary atmospheric chemistry module and observation-based emissions estimates to provide a unique
                dataset for research studies based on NASA’s observations of atmospheric composition. Geos forecast data
                are obtained from the NASA/GMAO Centre for Climate Simulation (<a href="https://portal.nccs.nasa.gov/datashare/gmao/geoscf/v1/forecast/
              &https://gmao.gsfc.nasa.gov/weather_prediction/GEOS-CF/">NCCS</a>)
              </div>
              <br>


              <strong><a href="https://www.mmm.ucar.edu/models/wrf">WRF-Chem model </a></strong>
              <div>
                The WRF-Chem (Weather Research and Forecasting with Chemistry) model is widely used for simulating and
                forecasting atmospheric chemistry and air quality. It combines the WRF meteorological model with various
                chemistry and aerosol modules to simulate the transport, transformation, and deposition of pollutants in
                the atmosphere. The WRF-Chem version 4.2.1 model simulation over the Hindu Kush Himalaya (HKH) at 12 km
                resolution and Nepal at 4km resolution helps us to understand the current state of air quality and
                pollutant distributions in the region.
              </div>
              <br>
              <div>
                Additionally, having a 48-hour pollution forecast in the dashboard is valuable for predicting and
                understanding the future air quality impact in the region. The forecasted information can help
                stakeholders and decision-makers across the HKH region take appropriate measures to mitigate air
                pollution and its associated environmental impacts.
              </div>
              <br>
              <div>
                Overall, the combination of real-time pollution simulation and 48-hour pollution forecast using the
                WRF-Chem model can provide valuable insights into the air quality state and help make informed decisions
                regarding pollution management and control in the HKH and Nepal region.
              </div>
              <br>
              <div class="">Note: Model validation with observations data for the following stations: Kabul, Islamabad,
                Lahore, New Delhi, Kanpur, Lumbini, Kathmandu, Patna, Kolkata
              </div>
            </el-collapse-item>
            <el-collapse-item title="Emission Inventory (Annual)" name="4">
              <strong> <a href="https://eccad.sedoo.fr/#/catalogue">Emission data</a></strong>
              <div>
                1. Regional Emission inventory in ASia version 3.2.1 (REASv3.2.1) provides details of emissions from
                major anthropogenic sectors for each country and its sub-regions and provides monthly gridded data with
                0.25<sup>∘</sup>×0.25<sup>∘</sup> resolution from 1950-2015 over the East, Southeast, and South Asia
                region
                (<a href="https://doi.org/10.5194/acp-20-12761-2020">https://doi.org/10.5194/acp-20-12761-2020</a> & <a
                  href="https://eccad.aeris-data.fr/">https://eccad.aeris-data.fr/</a>).

              </div>

              <div>
                Species available: SO<sub>2</sub>, NO<sub>x</sub>, CO, NMVOC, PM<sub>10</sub>, PM<sub>2.5</sub>, BC, OC,
                NH<sub>3</sub>, and CO<sub>2</sub>
              </div>
              <br>
              <div class="">
                2. Greenhouse Gas-Air Pollution INteractions and Synergies (GAINS) model inventory data available at
                0.5<sup>◦</sup>x0.5<sup>◦</sup> Km grid. The GAINS Model gridded globally following the ECLIPSE
                (Evaluating the Climate and
                Air Quality Impacts of Short-Lived Pollutants) project version 5a [ECLIPSE-GAINS-V5a]
                (<a href="https://eccad.aeris-data.fr/">https://eccad.aeris-data.fr/ </a>).
              </div>
              <br>
              <div class="">
                3. Emissions Database for Global Atmospheric Research version 5 (EDGARv5) provides pollutants, including
                greenhouse gases per sector and country globally at a horizontal resolution of 0.1x0.1 km grid size and
                temporal coverage from 1970-2015 (<a
                  href="https://eccad.aeris-data.fr/">https://eccad.aeris-data.fr/</a>).
              </div>
              <div class="">
                Species available: SO<sub>2</sub>, NO<sub>x</sub>, CO, NMVOC, VOC, PM <sub>10</sub>, PM<sub>2.5</sub>,
                BC, OC, NH<sub>3</sub>, CH<sub>4</sub>, CO<sub>2</sub> etc.
              </div>
              <div class="">
                Note: Emissions from large-scale biomass burning with Savannah burning, forest fires, and sources and
                sinks from land use, land-use change, and forestry (LULUCF) are excluded. For the energy-related
                sectors, the activity data are mainly based on the energy balance statistics of IEA (2017)
                ( <a
                  href="http://www.oecd-ilibrary.org/energy/co2-emissions-from-fuel-combustion-2017_co2_fuel-2017-en">http://www.oecd-ilibrary.org/energy/co2-emissions-from-fuel-combustion-2017_co2_fuel-2017-en</a>),
                whereas
                the activity data for the agricultural sectors originate mainly from FAO (2018); Crippa et al. (2019).


              </div>
              <br>

            </el-collapse-item>
            <el-collapse-item title="Demography (Annual scale)" name="5">
              <div>
                <a href="https://www.worldpop.org/datacatalog/">WorldPop</a>
                is based at the University of Southampton and was initiated in 2013 with the aim of producing detailed
                and freely available high-resolution data for mapping human population, distributions, and composition
                for the whole of Central and South America, Africa, and Asia. WorldPop provides gridded information on
                population density, population count, Age, and sex structure from 2000 to 2020 at 1km horizontal
                resolution. The population density data are produced by the unconstrained top-down modeling method. In
                this method, a global database of the administrative unit-based census and projection counts for each
                year 2000-2020 is taken and utilizes a set of detailed geospatial datasets to disaggregate to grid
                cell-based counts. Two methods have been adopted to produce these over multiple countries using Random
                Forests machine learning methods described in the following link (<a
                  href="https://www.worldpop.org/methods/top_down_constrai ned_vs_unconstrained/">https://www.worldpop.org/methods/top_down_constrai
                ned_vs_unconstrained/</a>).

              </div>


            </el-collapse-item>
          </el-collapse>

        </div>

        <br>
        <h3 class="headingPara">Acknowledgment of Current Data Source</h3>
        <ul>
          <li><a href="https://servir.icimod.org/">SERVIR-HKH</a> contributes data products.</li>
          <li>Ground-based observation – <a href="https://www.airnow.gov/international/us-embassies-and-consulates/">AirNow</a>,
             <a href="https://aeronet.gsfc.nasa.gov/">AERONET</a>
          </li>
          <li>Satellite products – <a href="https://modis.gsfc.nasa.gov/data/">MODIS</a>, <a
              href="https://sentinel.esa.int/web/sentinel/sentinel-data-access">TROPOMI</a></li>
          <li>Air quality models – <a
              href="https://gmao.gsfc.nasa.gov/weather_prediction/GEOS-CF/data_access/">GEOS-CF</a>, WRF-Chem forecast
            (<a href="https://servir.icimod.org/">SERVIR-HKH</a>)
          </li>
          <li>Reanalysis –  <a href="https://geos-chem.seas.harvard.edu/geos-overview">GEOS-CF</a></li>
          <li>Emission inventory – <a href="https://www.nies.go.jp/REAS/">REAS</a>, <a
              href="https://edgar.jrc.ec.europa.eu/dataset_htap_v2">EDGAR-HTAP</a>,
            <a href="https://gains.iiasa.ac.at/models/">GAINS</a></li>
        </ul>

        <h3 class="headingPara">Contact</h3>
        <ul>
          <li>Bhupesh Adhikary</li>
          <li>Senior Air Quality Specialist, AAB: Stimulating Action for Clean Air </li>
          <li>bhupesh.adhikary@icimod.org</li>
        </ul>

        <h3 class="headingPara">Disclaimer!</h3>
        <ul>
          <li>
            Quality of the datasets is attributed to the original data provider's quality assurance/quality control. Additional datasets continue to be added as and when they are readily available.
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
      LangVal: true,
    };
  }
}
</script>


<style scoped>
:root {
  --fontColors: '#606266';
}

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
  word-break: initial;
}

.about-body ul {
  list-style-type: none;
}

.aboutContent ul {
  list-style-type: none;
}

.infoTabIcon {
  font-size: 20px;
}

.aboutContent {
  font-family: Arial, Helvetica, sans-serif;
  color: var(--fontColors);
}

.data-tool {
  padding-left: 40px;
}


/*.aboutContent .el-collapse-item__content {*/
/*  font-family: Arial, Helvetica, sans-serif;*/
/*  color: rgb(96, 98, 102) !important;*/
/*}*/

/*.model-title-header .el-dialog__title{*/
/*  font-weight: bold;*/
/*}*/
</style>