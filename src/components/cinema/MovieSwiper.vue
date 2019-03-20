<template>
    <swiper class="my-swiper" :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide class="movie-img" v-for="(item,index) in movies" :key="index">
            <img class="auto-img" :src="dealImgUrl(item.img,'148.208')" alt="">
            <span class="triangle_border_down"></span>
        </swiper-slide>
    </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    name: 'carrousel',
    props:['movies','showIndex'],
    data() {
      return {
        swiperOption: {
            slidesPerView: 4,
            centeredSlides: true,
            slideToClickedSlide:true,
            slideActiveClass : 'swiper-slide-active',
            spaceBetween:15,
            slidesOffsetBefore:-20,
            on:{
                slideChange:()=>{
                    let swiper = this.$refs.mySwiper.swiper;
                    let nowIndex = swiper.activeIndex;
                    this.$emit('custom-now-index',nowIndex);
                }
            }
        }
      }
    },
    components: {
        swiper,
        swiperSlide
    }
}

</script>

<style lang="less" scoped>
.my-swiper{
    font-size: 16px;
    padding-bottom: .2rem;

    .swiper-slide-active{
        position: relative;
        width: 1.55rem !important;
        height: 2.2rem;
        margin:0;
        border:2px solid #fff;
        transition: all .2s;

        .triangle_border_down{
            content:'';
            position:absolute;
            display: inline-block;
            bottom: -0.28rem;
            left: 50%;
            width: 0;
            height: 0;
            border-width: .13rem;
            border-style: solid;
            border-color:#fff transparent transparent transparent; 
            transform: translateX(-50%);
        }
    }
}
.movie-img{
    width: 1.5rem !important;
    height: 2.1rem;
    margin-top: .1rem;
}
</style>