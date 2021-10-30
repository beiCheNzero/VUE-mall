/** 方法一 **/
// import {
//   ADD_CART,
//   ADD_TO_CART
// } from "./mutations-types";
//
// const mutations = {
//   //mutations唯一的目的就是修改state中的状态
//   //mutations中的每一个方法尽可能完成的事情比较单一
//
//   [ADD_CART](state , payload){
//     payload.count++
//     // payload.counter += 1
//   },
//   [ADD_TO_CART](state , payload){
//     state.cartList.push(payload)
//     payload.count = 1
//   }
// }


/** 方法二 **/
const mutations = {
  // addCart(state, info) {
  //     // console.log(info);
  //     // 1.查看是否添加过
  //     const oldInfo = state.cartList.find(item => item.iid === info.iid)
  //
  //     // 2.+1或者新添加
  //     if (oldInfo) {
  //       oldInfo.count += 1
  //     } else {
  //       info.count = 1
  //       info.checked = false
  //       state.cartList.push(info)
  //     }
  //
  // }
  //   addCart(state, info) {
  //   // console.log(info);
  //   // 1.查看是否添加过
  //   const oldInfo = state.cartList.find(item => item.iid === info.iid)
  //
  //   // 2.+1或者新添加
  //   if (oldInfo) {
  //     oldInfo.count += 1
  //   } else {
  //     info.count = 1
  //     info.checked = true
  //     state.cartList.push(info)
  //   }
  /**
   * 相同商品数量加一
   * @param state
   * @param payload   payload用户传进来的商品，oldProduct数组中原有的商品
   */
  // addCurrentCounts(state, payload) {
  //   payload.oldProduct.currentCounts += payload.payload.currentCounts;
  // },
  /**
   * 将不同商品添加到数组中
   * @param state
   * @param payload 商品对象
   */
  addTwoCart(state, payload) {
    payload.count = 1
    payload.checked = false;
    state.cartList.push(payload);
  },

}



export default mutations
