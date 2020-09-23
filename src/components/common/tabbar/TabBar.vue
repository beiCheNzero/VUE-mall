<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tab-bar{
    display: flex;
    background: #f2f2f2;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    /*box-shadow后面的值分别是X,Y,模糊程度,颜色*/
    box-shadow: 0px -2px 1px rgba(100,100,100,.2);
  }

  .tab-bar-item{
    flex: 1;
    text-align: center;
    /*默认49px，移动端的tab-bar*/
    height: 49px;
  }
</style>
