<template>
  <div class="all-conts">
    <el-container class="cont-outer">
      <el-header>
        <NavBar></NavBar>
      </el-header>
      <el-container class="sidebar-main">
        <Tabs :activeTab="currentTab"></Tabs>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import NavBar from "../components/NavBar";
import Tabs from "../components/Tabs"
import {ReDirectToSmogAppDotCom,reDirectHTTPSToHTTP} from "../utils/ReDirect";
// import emissionTabBody from "../components/emissionTabBody";

// https://codepen.io/suman111/pen/ExmdwxP?editors=0010

export default {
  name: "current",

  components: {
    NavBar,
    Tabs,
  },

  data() {
    return {
      selectedTab: 'Forecast',
    };
  },
  computed: {
    currentTab() {
      return this.getCurrentTab()
    },
  },
  methods: {
    getCurrentTab() {
      return this.selectedTab;
    }
  },
  beforeCreate() {
    ReDirectToSmogAppDotCom();
    reDirectHTTPSToHTTP();
  }
};
</script>

<style lang="scss">
@import "../utils/main";


</style>
