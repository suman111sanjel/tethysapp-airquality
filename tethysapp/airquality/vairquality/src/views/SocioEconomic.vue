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

import NavBar from "../components/common/NavBar";
import Tabs from "../components/common/Tabs";
import {ReDirectToSmogAppDotCom, reDirectHTTPSToHTTP} from "../utils/ReDirect";

// https://codepen.io/suman111/pen/ExmdwxP?editors=0010

export default {
  name: "SocioEconomic",
  components: {
    NavBar,
    Tabs,
  },
  data() {
    return {
      selectedTab: 'SocioEconomic',
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