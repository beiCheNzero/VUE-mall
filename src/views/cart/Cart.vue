<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!--商品的列表-->
    <cart-list/>

    <!--底部的汇总-->
    <cart-button-bar/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  import CartList from "./childComps/CartList";
  import CartButtonBar from "./childComps/CartButtonBar";

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartButtonBar},
    computed: {
      /** 两种语法，其一**/
      // ...mapGetters(['cartLength','cartList'])
      /** 两种语法，其二**/
      ...mapGetters({
        length: 'cartLength',
        list: 'cartList'
      })
    }
  }
</script>

<style scoped>
  .cart{
    position: relative;
  }

  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    font-width: bold;
  }
</style>
