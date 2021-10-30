import {request} from "./request";

/**
 * 根据iid请求商品详情信息
 * @param iid
 * @returns {*}
 */
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

/**
 * 将杂乱的商品数据封装到一个类中
 */
// export class Goods{
//   constructor(itemInfo, columns, services) {
//     this.desc = itemInfo.desc;
//     this.title = itemInfo.title;
//     this.newPrice = itemInfo.price;
//     this.oldPrice = itemInfo.oldPrice;
//     this.discount = itemInfo.discountDesc;
//     this.discountBgColor = itemInfo.discountBgColor;
//     this.columns = columns;
//     this.services = services;
//     this.realPrice = itemInfo.lowNowPrice;
//   }
// }
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
}
//用法
// const g = new GoodsInfo()
// g.title
// g.desc


/**
 * 店铺信息
 */
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

/**
 * 商品的参数信息
 */
export class GoodsParam {
  constructor(info, rule) {
    if (rule) {
      // 注: images可能没有值(某些商品有值, 某些没有值)
      this.image = info.images ? info.images[0] : '';
      this.infos = info.set;
      this.sizes = rule.tables;
    }
  }
}

/**
 * 请求推荐信息
 * @returns {AxiosPromise}
 */
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}
