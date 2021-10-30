<template>
    <swiper class="detail-swiper">
      <swiper-item v-for="item in topImages">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper';/*swiper/index.js,统一导出*/

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    //拿到数据
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .detail-swiper{
    height: 300px;
    overflow: hidden;
  }
</style>
