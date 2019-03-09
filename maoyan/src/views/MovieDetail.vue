<template>
    <div v-if="md" class="movie-detail">
        <div class="detail">
            <div class="bg">
                <img :src="dealImgUrl(md.img)">
            </div>
            <div class="poster">
                <img class="auto-img" :src="dealImgUrl(md.img)">
            </div>
            <div class="content">
                <div class="name">{{md.nm}}</div>
                <div class="enname">{{md.enm}}</div>
                <div v-if="md.sc" class="score">
                    <Star :score="md.sc"></Star>
                    <span class="sc">{{md.sc}}{{Number.isInteger(md.sc)?'.0':''}} </span>
                    <div class="snum"> ({{md.snum}}人评)</div>
                </div>
                <div v-else class="wish">{{md.wish}}人想看</div>
                <div class="type">
                    <span class="cat">{{md.cat}}</span>
                    <span :class="md.version"></span>
                </div>
                <div class="src">{{md.src}}/{{md.dur}}分钟</div>
                <div class="pubDesc">{{md.pubDesc}}</div>
            </div>
            <div @click="goMovieDetai(md.id,md.nm)" class="arrow iconfont icon-xiangyou"></div>
        </div>
        <div class="present underline">
            <mt-button @click.native="goRoute" class="buy-btn" size="large" type="danger">特惠购票</mt-button>
            <div class="present-content">
                <p :class="{showText:show}" class="hiddenText">{{md.dra}}</p>
                <span :class="{reverse:show}" class="slide-btn iconfont icon-xiangyou" @click="show=!show"></span>
            </div>
        </div>
        <div class="section media-library underline">
            <div class="title">媒体库</div>
            <div class="photo-list">
                <li class="photo" v-for="(p,i) in md.photos" :key="i">
                    <img class="img" :src="dealImgUrl(p,'180.140')">
                </li>
            </div>
        </div>
        <div class="section trailer underline">
            <div class="title">宣传片</div>
            <video class="video" controls :poster="md.videoImg" style="width: 100%; object-fit: fill" :src="md.videourl"></video>
        </div>
        <div class="copyright">
            <mt-button class="down-btn" type="danger" size="large">下载猫眼电影，查看更多电影信息</mt-button>
            <p class="phone">© 猫眼电影 客服电话: <a href="#">1010-5353</a></p>
            <p class="record">京ICP备16022489号-1 京公网安备11010502030881号</p>
            <p class="company">北京猫眼文化传媒有限公司</p>
        </div>
    </div>
</template>

<script>
import Star from '../components/my-components/Star'
export default {
    name:'movie-detail',
    inject:['app'],
    data () {
        return {
            md:null,
            show:false
        };
    },
    methods: {
        goRoute(){
            this.$router.go(-1);
        }
    },
    created() {
        this.$indicator.open({
            text: '加载中...',
            spinnerType: 'triple-bounce'
        });
        //电影详情
        //http://m.maoyan.com/ajax/detailmovie?movieId=341139
        this.$axios.get('/api/ajax/detailmovie',{
            params:{movieId:this.$route.query.movieid}
        })
            .then(res=>{
                if(res.status===200){
                    return res.data
                }else{
                    return 'error'
                }
            })  
            .then(data=>{
                this.md = data.detailMovie;
                 this.$indicator.close();
            })
    },
    beforeRouteEnter (to, from, next) {
        next(vm=>{
            vm.app.showBack = true;
        })
    },
    components:{
        Star
    }
}

</script>

<style lang="less" scoped>
.movie-detail{
    z-index: 8;
    position: relative;
    font-size: 0px;
}
.detail{
    position: relative;
    display: flex;
    padding: 12px;
    font-size: .22rem;
    color:#f0f0f0;
    overflow: hidden;

    .bg{
        z-index: 2;
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom:0;
        filter: blur(25px) brightness(85%) saturate(60%);
        transform: scale(1.4);

        img{
            width:100%;
        }
    }
}
.poster{
    z-index: 3;
    position: relative;
    width: 1.8rem;
    height: 2.52rem;
    border:1px solid #fff;
}
.content{
    z-index: 3;
    position: relative;
    flex:1;
    margin-left: .24rem;
    overflow-x:hidden;

    div{
        margin-top: 1px;
        opacity: .8;
        .text-overflow();
    }

    .name{
        font-size: .29rem;
        opacity: 1;
    }

    .enname{
        font-size: .2rem;
        .text-overflow()
    }

    .score{
        opacity: 1;

        .sc{
            margin-left: 5px;
            font-size: .28rem;
            vertical-align: top;
            color:@orange;
        }

        .snum{
            opacity: .8;
        }
    }

    .wish{
        margin:.1rem 0;
        font-size: .27rem;
        color:@orange;
        opacity: 1;
    }

    .type{

        .imax{
            display: inline-block;
            vertical-align: middle;
            margin-left: .1rem;
        }

        .v3d{
            width: .86rem;
            height: .26rem;
            background: url(../../public/img/d-v3d.png) no-repeat;
            background-size: 100% 100%;
        }

        .v2d{
            width: .52rem;
            height: .26rem;
            background: url(../../public/img/d-v2d.png) no-repeat;
            background-size: 100% 100%;
        }
    }
   
}
.present{
    padding: 10px;
    background: #fff;

    .buy-btn{
        padding: 6px 0;
        height: auto;
        font-size: 16px;
    }

    .present-content{
        position: relative;      
        padding: 8px 0 20px 0;
        font-size: 13px;
        line-height: 20px;
        color:#666;

        .hiddenText{
            height: 60px;
            overflow: hidden;

            &.showText{
                height: auto;
            }
        }
    }
    .slide-btn{
        position: absolute;
        bottom: 0;
        left:50%;
        font-size: 14px;
        color:#666;
        transform: translateX(-50%) rotate(90deg);

        &.reverse{
            transform: translateX(-50%) rotate(-90deg);
        }
    }
}
.section{
    margin-top: 10px;
    padding: 10px;
    background: #fff;

    .title{
        font-size: 13px;
        font-weight: 700;
        color:#555;
    }
}
.media-library{
    
    .photo-list{
        padding: 8px 0;
        white-space: nowrap;
        overflow-x: auto;

        &::-webkit-scrollbar{
            display: none;
        }

        .photo{
            display: inline-block;
            width: 90px;
            height: 70px;
            margin-right: 3px;
            overflow: hidden;
        }

        .img{
            transform: translateX(-20%);
        }
    }
}
.trailer{

    .video{
        margin-top: 8px;
    }
}
.copyright{
    margin-top: 10px;
    padding: 10px;
    text-align: center;

    >p{
        margin: 10px 0;
    }

    .down-btn{
        height: auto;
        padding: 5px 0;
        font-size: 14px;
    }

    .phone{
        font-size: 11px;
        color:#333;

        >a{
            color:@red;
        }
    }

    .record,
    .company{
        font-size: 10px;
        color:#999;
    }
}
</style>