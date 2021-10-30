<template>
  <div id="app">
    <keep-alive exclude="Detail"><!-- exclude='Detail'排除在外，不保持活跃，避免进去详情页获取同一个数据 -->
      <router-view/>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from "components/content/mainTabbar/MainTabBar";

  export default {
    name: 'App',
    components:{
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
