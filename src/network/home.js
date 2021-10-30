import {request} from "./request";

export function getHomeMultidata() {
  return request({
    url: "/home/multidata",
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

//数组传值到另外一个数组里面的
// let totalNums = []
//
// const num1 = [20,11,200]
// const num2 = [54,53,875]

//第一种方法
// for (let n of num1) {
//   totalNums.push(n)
// }

//第二种方法
// totalNums.push(...num1)
