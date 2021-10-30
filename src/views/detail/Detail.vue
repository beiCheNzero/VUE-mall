<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <!-- 属性：topImages 传值:top-images  @后面必须严格保持一致   -->
      <detaile-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
<!--    <toast :message="" :show=""/>-->
  </div>
</template>

<script>
  //项目组件
  import DetailNavBar from "./childComps/DetailNavBar"
  import DetaileSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  // import Toast from "components/common/toast/Toast";

  //方法
  import {getDetail , Goods, Shop ,getRecommend} from "network/detail";
  import {GoodsParam} from "network/detail";
  import {debounce} from "common/utils";
  import {itemListenerMixin,backTopMixin} from "common/mixin";

  import { mapActions } from 'vuex'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetaileSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      //scroll组件
      Scroll, GoodsList,
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {

        // 1.获取顶部图片的轮播数据
        const data = res.result;
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        // 5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        /** this.$refs.params.$el值没有渲染出来 **/
        // this.themeTopYs = []
        // this.themeTopYs.push(0)/*商品offsetTop*/
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop)/*参数offsetTop*/
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)/*评论offsetTop*/
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)/*推荐offsetTop*/
        //
        // console.log(this.themeTopYs);

        //在界面渲染完成后才执行的函数
        // this.$nextTick(() => {
        //   //根据最新的数据，对应的DOM是已经被渲染出来了
        //   //图片还没有加载完成（获取的offsetTop不包含图片）
        //
        //   this.themeTopYs = []
        //   this.themeTopYs.push(0)/*商品offsetTop*/
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)/*参数offsetTop*/
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)/*评论offsetTop*/
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)/*推荐offsetTop*/
        //
        //   console.log(this.themeTopYs);
        // })
      })

      //3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })

      //4.给getThemeTopY赋值（对this.thememTopYs赋值的操作进行防抖）
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)/*商品offsetTop*/
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)/*参数offsetTop*/
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)/*评论offsetTop*/
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)/*推荐offsetTop*/
        this.themeTopYs.push(Number.MAX_VALUE)
        /** Number.MAX_VALUE表示所能显示的最大值 **/

        // console.log(this.themeTopYs);
      }, 100)
    },
    methods: {
      ...mapActions(["addCart"]),/** 映射action中的addCart方法 **/
      //通过点击监听事件加载完成
      imageLoad() {
        //2)每张图片加载完后调用getThemeTopY赋值
        this.getThemeTopY();
        // this.$nextTick(() => {
        //   this.getThemeTopY();
        // })
      },
      titleClick(index) {
        // const themeTopY = -this.themeTopYs[index]+44
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 1000)
      },
      contentScroll(position) {
        /** 普通做法**/
          //1.获取Y值
        const positionY = -position.y
        //2.和主题中的值进行对比
        //方法1
        // let length = this.themeTopYs.length

        //   if (this.currentIndex !== i && ((i < this.themeTopYs.length - 1 && positionY >= this.themeTopYs[i] &&
        //     positionY < this.themeTopYs[i+1]) || (i === this.themeTopYs.length - 1 && positionY >= this.themeTopYs[i]))){
        //     this.currentIndex = i;
        //     this.$refs.nav.currentIndex = this.currentIndex
        //   }
        // }
        /** 第二种方式 **/
        // for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        //   if (this.titleCurrentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
        //     this.titleCurrentIndex = i;
        //     //拿到子组件传下标值
        //     this.$refs.nav.currentIndex = this.titleCurrentIndex;
        //   }
        // }
        // for (let i = 0; i < this.themeTopYs.length; i++) {
        //   if (this.titleCurrentIndex !== i && ((positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]
        //     && i < this.ThemeTopYs.length -1) || (i === this.themeTopYs.length - 1 && positionY >= this.themeTopYs[i]))) {
        //     this.titleCurrentIndex = i;
        //     //拿到子组件传下标值
        //     this.$refs.nav.currentIndex = this.titleCurrentIndex;
        //   }
        // }

        /** hack做法 **/
        for (let i = 0; i < this.themeTopYs.length; i++) {
          if ((this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]))) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        // 3.是否显示回到顶部
        this.demo(position)
      },
      backClick() {
        // this.$refs.scroll.scroll.scrollTo(0,0,700);
        this.$refs.scroll.scrollTo(0,0,500);
      },
      mounted() {
        // //这个地方的img标签确实被挂载，但是其中的图片还没有占据高度
        // //this.$refs.scroll.refresh对这个函数进行防抖操作
        // let newrefresh = debounce(this.$refs.scroll.refresh, 100)
        // //对监听的事件进行保存
        // this.itemImgListener = () => {
        //   newrefresh()
        // }
        // this.$bus.$on('itemImageLoad' , this.itemImgListener)
      },
      destroyed() {
        this.$bus.$off('itemImageLoad', this.itemImgListener)
      },
      addToCart() {
        // 1.获取购物车需要展示的信息
        // console.log('-----');/*子组件的事件发出来了*/
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        // 2.将商品添加到购物车里面,添加到store中（1.Promise 2.mapActions）
        // this.$store.commit('addCart', product)/*调用mutaitios中的方法*/

        // this.addCart(product).then(res => {
        //   this.$toast.show(res, 2000)
        // })

        this.$store.dispatch('addCart',product).then(res => {
          this.$toast.show(res, 2000)
        })
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }

  .content{
    height: calc(100% - 44px - 49px);
  }
</style>
