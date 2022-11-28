<template>
  <el-cascader
      v-model="cascaderValue"
      :options="cascaderData"
      style="width: 100%"

  ></el-cascader>
</template>

<script>
export default {
  name: 'Pollutantcascader',
  props: {
    cascaderData: {
      type: Array,
      required: true
    },
    index:{
      type: Number,
      required: true
    }
  },
  data() {
    return {
      cascaderValue:[],
    }
  },
  created(){
  }
};
</script>

<style lang="scss">

</style>