import {
  ADD_CART,
  ADD_TO_CART
} from "./mutations-types";

const actions = {
  // addCart(context, payload) {
  //   return new Promise((resolve , reject) => {
  //     // payload新添加的商品
  //     /** 方法一**/
  //     // let oldProduct = null;
  //     // for (let item of state.cartList){
  //     //   if (item.iid === payload.iid) {
  //     //     oldProduct = item;
  //     //   }
  //     // }
  //     /** 方法二**/
  //     let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
  //
  //     // 判断oldProduct
  //     if (oldProduct) {
  //       oldProduct.count += 1
  //       // context.commit(ADD_COUNTER , oldProduct)
  //       resolve('当前商品数量+1')
  //     }else{
  //       oldProduct.count = 1
  //       oldProduct.checked = false
  //       state.cartList.push(payload)
  //       // state.cartList.push(payload)
  //       // context.commit(ADD_TO_CART, payload)
  //       resolve('添加新的商品')
  //     }
  //   })
  // },
  /**
   * 添加商品至全局变量中，将每个功能分发出去分别执行
   * @param context
   * @param payload
   */
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //1、判断payload对象是否为空
      if (Object.keys(payload).length === 0) {
        reject('加入购物车失败！')
      } else {
        //2、查找之前数组中是否有该商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

        //3、oldProduct有值则添加新的数量，否则直接添加数组
        if (oldProduct) {
          //如果需要传多个参数以对象的形式传送
          oldProduct.count += 1
          // context.commit('addCurrentCounts', {payload, oldProduct});
          resolve('商品已存在！数量加' + 1);
        } else {
          context.commit('addTwoCart', payload);
          // oldProduct.count = 1
          // oldProduct.checked = false
          // state.cartList.push(payload)
          resolve('✔添加购物车成功！');
        }
      }
    })
  }
}

export default actions
