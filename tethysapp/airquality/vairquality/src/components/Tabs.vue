<template>
  <el-tabs type="border-card" class="tabs-outer" height="28px" v-model="currentTab" @tab-click="changePage">

    <el-tab-pane key="Recent" name="Recent" label="Recent" class="full-height">
      <TabBodyRecent v-if="currentTab ==='Recent'"></TabBodyRecent>
    </el-tab-pane>

    <el-tab-pane key="Archive" name="Archive" label="Archive" class="full-height">
      <TabBodyArchive v-if="currentTab ==='Archive'"></TabBodyArchive>
    </el-tab-pane>

    <el-tab-pane key="Forecast" name="Forecast" label="Forecast" class="full-height">
      <TabBodyForecast v-if="currentTab ==='Forecast'"></TabBodyForecast>
    </el-tab-pane>

    <el-tab-pane key="Forecast" name="Emission" label="Emission" class="full-height">
      <TabBodyEmission v-if="currentTab ==='Emission'"></TabBodyEmission>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import {TethysAppName} from "../config";
// import outlookTabBody from "./outlookTabBody";

import TabBodyRecent from "./TabBodyRecent";
import TabBodyArchive from "./TabBodyArchive";
import TabBodyForecast from "./TabBodyForecast";
import TabBodyEmission from "./TabBodyEmission";

export default {
  name: "Tabs",
  props: {
    activeTab: {
      type: String,
      required: true
    },
  },
  components: {
    TabBodyRecent,
    TabBodyArchive,
    TabBodyForecast,
    TabBodyEmission,
  },
  data() {
    return {selectedTab: 'emission'}
  },
  methods: {
    changePage(evt) {
      var download = document.createElement('a');
      if (evt.props.name === "Recent") {
        download.href = "/apps/" + TethysAppName + "/recent/";
      } else if (evt.props.name === "Archive") {
        download.href = "/apps/" + TethysAppName + "/archive/";
      } else if (evt.props.name === "Forecast") {
        download.href = "/apps/" + TethysAppName + "/forecast/";
      } else {
        download.href = "/apps/" + TethysAppName + "/emission/";
      }
      // }
      download.click();
    },
    getCurrentTab() {
      return this.activeTab
    }
  },
  computed: {
    currentTab() {
      return this.getCurrentTab()
    },
  }
}
</script>

<style lang="scss">
.tabs-outer {
  width: 100%;
}


.tabs-outer .el-tabs__nav-scroll, .tabs-outer .el-tabs__nav.is-top, .el-tabs__item {
  height: 28px;
}

.el-tabs__item.is-active {
  height: 29px;
}

.el-tabs__nav-scroll {
  color: white;
}

.el-tabs--border-card {
  border: 0px solid #DCDFE6;
}

.tabs-outer .el-tabs__item {
  color: white !important;
}

.el-tabs__item.is-active {
  background-color: #9cb4be !important;
  border-right-color: #9cb4be !important;
  border-left-color: #9cb4be !important;
}

.el-tabs__content {
  background-color: #9cb4be !important;
}

.el-tabs__item {
  line-height: 32px
}

.el-tabs__content {
  height: calc(100% - 28px);
  padding: 0px !important;
}

.full-height {
  height: 100%;
}
</style>