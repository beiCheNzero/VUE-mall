<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"
                    :is-checked="isSelectALL"
                    @click.native="checkedClick"/>
      <span>全选</span>
    </div>

    <div class="price">合计：{{totalPrice}}</div>

    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import checkButton from "components/content/checkButton/CheckButton"

  import {mapGetters} from 'vuex'

  export default {
    name: "CartButtonBAR",
    components: {
      checkButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectALL() {
        if (this.cartList.length === 0) return false
        //如果有不选中，且有长度，证明没有被全选，且取反（获取到未选中的checked）
        /** 第一种逻辑**/
        // return !(this.cartList.filter(item => !item.checked).length)
        /** 第二种逻辑**/
        return !this.cartList.find(item => !item.checked)
        /** 普通的遍历方法**/
        // for (let item of cartList) {
        //   if(!item.checked) {
        //     return false
        //   }
        //   return true
        // }
      },
      noSelect() {
        if (this.cartList.length === 0) return false
        return !this.cartList.find(item => item.checked)
      }
    },
    methods: {
      checkedClick() {
        if (this.isSelectALL) {//全部选中
          this.cartList.forEach(item => item.checked = false)
        } else {
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if(this.noSelect) {
          this.$toast.show('请选择购买的商品', 2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    position: fixed;
    bottom: 49px;
    left: 0;
    right: 0;
    display: flex;
    height: 40px;
    background-color: #fff8e7;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  }

  .check-content{
    display: flex;
    align-items: center;
    width: 100px;
  }
  .check-content span{
    font-weight: bold;
  }

  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 4px;
    margin-left: 10px;
  }

  .price{
    margin-left: 60px;
    font-size: 18px;
    line-height: 40px;
    color: #5ea732;
    font-weight: 700;
    flex: 1;
  }

  .calculate{
    width: 90px;
    background-color: #ff5f3e;
    text-align: center;
    color: #ffffff;
    line-height: 40px;
  }
</style>
