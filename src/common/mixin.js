import {debounce} from "./utils";
import {TOP_DISTANCE} from 'common/const';
import BackTop from "components/content/backTop/BackTop";

/**
 * 抽取组件中的公共代码（混入）
 * 监听GoodsListItem中的图片是否加载完成
 * @type {{mounted(): void}}
 */
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      //保存防抖过得刷新函数，可以在其他地方调用
      Refresh: null
    }
  },
  mounted() {
    //1、监听GoodsListItem中的图片是否加载完成(使用自己封装的防抖函数控制执行次数)
    let newRefresh = debounce(this.$refs.scroll.refresh, 100)

    this.itemImgListener = () => {
      //refresh():重新计算 better-scroll,   this.$refs.scroll：组件创建完成才能执行后面函数
      newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener);
  }
}

export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return  {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      // this.$refs.scroll.scroll.scrollTo(0,0,700);
      this.$refs.scroll.scrollTo(0,0,300);
    },
    demo(position) {
      this.isShowBackTop = (-position.y) > TOP_DISTANCE
    },
  }
}
