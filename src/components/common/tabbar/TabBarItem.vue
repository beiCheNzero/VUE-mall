<template>
  <!--所有的item都展示同一个图片，同一个文字-->
  <div class="tab-bar-item" @click="itemClick">
    <!--方案1：建议采纳-->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <!--方案2：不建议采纳-->
    <!--<slot v-if="isActive" name="item-icon"></slot>-->
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
<!--    <div :class="{active: isActive}"><slot name="item-text"></slot></div>-->
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    /*默认49px，移动端的tab-bar*/
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img{
    width: 24px;
    height: 24px;
    /*去掉图片本身与下方文字的3px*/
    vertical-align: middle;
    margin-bottom: 2px;
  }

  /*.active{*/
  /*  color: red;*/
  /*}*/
</style>
