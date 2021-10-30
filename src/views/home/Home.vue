<template>
  <div id="home" class="wrapper">
    <nav-bar class="home_nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isTabFixed"/>
      <scroll class="content"
              ref="scroll"
              :probe-type="3"
              @scroll="contentScrool"
              :pull-up-load="true"
              @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <recommend-view :recommends="recommends"/>
        <feature-view/>
        <tab-control :titles="['流行','新款','精选']"
                     @tabClick="tabClick"
                     ref="tabControl2"/>
<!--                 :class="{fixed: isTabFixed}"/>-->
        <!--         class="tab-control"-->
        <goods-list :goods="showGoods"/>
      </scroll>

      <back-top @click.native="backClick" v-show="isShowBackTop"/>
      <!--  在我们需要监听一个组件的原生事件时，需要给对应的事件加上.native  -->
  </div>
</template>

<script>
  //公共组件
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";

  //项目组件
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  //方法
  import {
    getHomeMultidata,
    getHomeGoods
  } from "network/home";
  import {debounce} from "../../common/utils";
  import {itemListenerMixin,backTopMixin} from "common/mixin";



  export default {
    name: "Home",
    components:{
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    mixins: [itemListenerMixin,backTopMixin],
    data(){
      return{
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0 ,list: []},
          'new': {page: 0 ,list: []},
          'sell': {page: 0 ,list: []},

        },
        currentType: 'pop',
        // isShowBackTop: false,
        TabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      }
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
    methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      // backClick() {
      //   // this.$refs.scroll.scroll.scrollTo(0,0,700);
      //   this.$refs.scroll.scrollTo(0,0,300);
      // },
      contentScrool(position){
        //1.判断backtop是否显示
        this.demo(position)

      //  2.决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        //监听图片加载完毕
        this.getHomeGoods(this.currentType)
        // //重新计算可滚动的高度
        // this.$refs.csroll.scroll.refresh()
      },
      swiperImageLoad() {
        //  获取tabControl的tabOffsetTop
        //  所有的组件都有一个属性$el: 用于获取组件中的元素
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        //1、请求多个数据
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

        //  完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list;
      }
    },
    deactivated() {
      //1.保存Y值
      // this.saveY = this.$refs.scroll.getCurrentY()

      //2.取消全局事件的监听
      this.$bus.$off('itemImageLoad' , this.itemImgListener)
    },
    created() {
      //1、请求多个数据
      this.getHomeMultidata();
      // getHomeMultidata().then(res => {
      //       this.banners = res.data.banner.list;
      //       this.recommends = res.data.recommend.list;
      //     })

      //2、请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
      // getHomeGoods('pop', 1).then(res => {
      //   console.log(res);
      // })

      // 3.监听图片加载完成
      // this.$bus.$on('itemImageLoad' , () => {
      //   this.$refs.scroll.refresh()
      // })
    },
    //进入本组件时触发
    activated() {
      //一进入组件就滚动到离开时保存的位置
      this.$refs.scroll && this.$refs.scroll.scrollTo(0, this.saveY, 10);
      //refresh():重新计算 better-scroll,
      this.$refs.scroll && this.$refs.scroll.refresh();
    }

  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home_nav{
    background-color: var(--color-tint);
    color: #ffffff;
    /*在使用浏览器原生滚动是不跟随浏览器一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  /*.tab-control{*/
  /*  !*position: sticky;*!*/
  /*  !*多数浏览器会不兼容*!*/
  /*  !*粘性定位，设置top表示离顶部还有多久就暂停*!*/
  /*  top: 44px;*/
  /*  z-index: 9;*/
  /*}*/
  .content{
    position: absolute;
    right: 0;
    left: 0;
    top: 44px;
    bottom: 49px;
    /*height: 300px;*/
    /*height: calc(100% - 93px);*/
    overflow: hidden;
    /*margin-top: 44px;*/
  }

  .tab-control{
    position: relative;/*相对定位*/
    z-index: 9;

  }

  /*动态绑定的class  吸顶的实现*/
  /*添加fixed类后由于betterscroll插件的原因会直接消失，所以直接放弃*/
  /*.fixed {*/
  /*  position: fixed;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*  top: 44px;*/
  /*}*/
</style>
