<template>
  <div class="card-box full-height full-width about-div">
    <div class="pannel-title">
      <h6 class="title-heading">Useful Links
      </h6>
    </div>
    <div class="body-container">
          <a href="http://tethys.icimod.org/apps/streamflowbangladesh/" target="_blank">Streamflow Prediction -
            Bangladesh</a> <br>
          <a href="http://tethys.icimod.org/apps/streamflownepal/" target="_blank">Streamflow Prediction - Nepal</a> <br>
          <a href="http://tethys.icimod.org/apps/hiwat/" target="_blank">Hiwat Extreme Climate</a> <br>
          <a href="http://rds.icimod.org/" target="_blank">Regional Database System</a> <br>
          <a href="http://servir.icimod.org/science-applications/the-agriculture-information-portal" target="_blank">Agriculture
            Information Portal</a> <br>
    </div>
  </div>
</template>

<script>
export default {
  name: "usefulLinks",
}
</script>

<style scoped>
.body-container {
  height: calc(100% - 54px);
}
a {
    color: #337ab7;
    text-decoration: none;
      font-family: "Open Sans","Segoe UI",sans-serif, Verdana, Helvetica;
}
a:focus, a:hover {
    color: #23527c;
    text-decoration: underline;
}
a:active, a:hover {
    outline: 0;
}

</style>