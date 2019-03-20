<template>
    <div v-if="cinema" class="cinema-detail">
        <div class="cinema-content">
            <div class="cinema-info">
                <div class="cinema-name">{{cinema.nm}}</div>
                <div class="cinema-addr">{{cinema.addr}}</div>
            </div>
            <div class="cinema-location">
                <div @click="showMap(cinema.nm)" class="icon iconfont icon-dingwei"></div>
            </div>
        </div>
        <div class="show-movies">
            <MovieSwiper :showIndex="showIndex" :movies="show.movies" @custom-now-index="getNowIndex"></MovieSwiper>
        </div>
        <div class="movie-content underline">
            <div class="movie-title">
                <span class="name">{{nowShow.nm}}</span>
                <span v-if="nowShow.globalReleased && nowShow.sc!='0.0'" class="score">{{nowShow.sc}}分</span>
                <span v-else-if="nowShow.sc=='0.0'" class="score">暂无评分</span>
                <span v-else class="wish">{{nowShow.wish}}人想看</span>
            </div>
            <div class="movie-info">
                <span class="desc">{{nowShow.desc}}</span>
            </div>
        </div>
        <div class="nav-showdate">
            <div class="datelist">
                <div class="date" :class="{active:index==activeIndex}" @click="activeDate(index)" v-for="(item,index) in nowShow.shows" :key="index">
                    {{item.dateShow}}
                </div>
            </div>
        </div>
        <div class="vip-info text-overflow" v-for="(item,index) in show.vipInfo" :key="index">
            <span class="tag">{{item.tag}}</span>
            <span class="title">{{item.title}}</span>
            <span class="process">{{item.process}}</span>
            <span class="arrow iconfont icon-xiangyou"></span>
        </div>
        <SceneList :movieDur="movieDur" :activeSceneInfo="activeSceneInfo"></SceneList>
        <FoodList v-if="deal.length" :foods="deal"></FoodList>
        <transition name="fade">
            <iframe v-show="showmap" class="map" :src="`https://apis.map.qq.com/tools/poimarker?type=1&keyword=${cinema.nm}&region=${app.city}&radius=500&key=3IFBZ-YUJ6O-32FWX-SF5OE-ZJPSH-JTBLN&referer=myapp`" frameborder="0"></iframe>
        </transition>
        <transition name="fade">
            <div v-show="showmap" @click="hiddenMap" class="mask"></div>
        </transition>
    </div>
</template>

<script>
import MovieSwiper from '../components/cinema/MovieSwiper'
import SceneList from '../components/cinema/SceneList'
import FoodList from '../components/cinema/FoodList'

export default {
    name:'cinema-detail',
    inject:['app'],
    data () {
        return {
            nowIndex:0,
            activeIndex:0,
            showIndex:1,
            cinema:null,
            deal:null,
            show:null,
            showmap:false,
        };
    },
    computed: {
        nowShow(){
            return this.show.movies[this.nowIndex];
        },
        activeSceneInfo(){
            return this.nowShow.shows[this.activeIndex].plist;
        },
        movieDur(){
            return ~~/\d+/.exec(this.nowShow.desc)[0];
        }
    },
    methods: {
        getNowIndex(index){
            this.nowIndex = index;
        },
        activeDate(index){
            this.activeIndex = index;
        },
        showMap(){
            this.showmap = true;
        },
        hiddenMap(){
            this.showmap = false;
        }
    },
    created() {
        this.$indicator.open({
            text: '加载中...',
            spinnerType: 'triple-bounce'
        });
        this.$axios.get('/api/ajax/cinemaDetail',{
            params:{
                cinemaId:this.$route.query.cinemaid
            }
        })
            .then(res=>{
                if(res.status===200){
                    return res.data
                }else{
                    return 'error'
                }
            })
            .then(data=>{
                this.cinema = data.cinemaData;
                this.deal = data.dealList.dealList;
                this.show = data.showData;
                this.$indicator.close();
                // console.log(this.cinema);
                // console.log(this.deal);
                // console.log(this.show);
            })
    },
    beforeRouteEnter (to, from, next) {
        next(vm=>{
            vm.app.showBack = true;
        })
    },
    components:{
        MovieSwiper,
        SceneList,
        FoodList
    }
}

</script>

<style lang="less" scoped>
.cinema-detail{
    z-index: 7;
    position: relative;
    font-size: 0px;
}
.cinema-content{
    display: flex;
    padding: 18px 15px;
    font-size: 16px;
    color:#333;
    background: #fff;

    .cinema-info {
        flex:3;
        padding-right:10px; 
        overflow-x: hidden;
        border-right:1px solid #d3d3d3;

        .cinema-name{
            font-size: .34rem;
            font-weight: 700;
            color:#222;
            .text-overflow();
        }
        .cinema-addr{
            margin-top: 3px;
            font-size: .25rem;
            color:#999;
            .text-overflow();
        }
    }

    .cinema-location{
        flex:1;

        .icon{
            margin-top: .1rem;
            text-align: center;
            font-size: 30px;
            color:@blue;
        }
    }
}
.show-movies{
    height: 2.72rem;
    padding: 12px 0 10px 0;
    box-sizing: border-box;
    overflow: hidden;
    background: radial-gradient(rgb(56, 56, 77),rgb(121, 133, 145));
}
.movie-content{
    padding: 12px 15px;
    background: #fff;
    
    .movie-title{
        text-align: center;
        font-size: .3rem;
        font-weight: 700;
        .text-overflow();

        .name{
            margin-right:8px;
            font-size: .34rem;
            color:#333;
        }

        .score,
        .wish{
            color:@orange;
        }
    }

}
.movie-info{
    margin-top: 5px;
    color:#999;
    text-align: center;
    .text-overflow();

    .desc{
        font-size: .26rem;
    }
}
.nav-showdate{
    padding:0 10px;
    background: #fff;    

    .datelist{
        overflow-x: auto;
        white-space: nowrap;

        &::-webkit-scrollbar{
            display: none;
        }
    }

    .date{
        display: inline-block;
        margin-right: 8px;
        padding: 10px;
        
        font-size: 14px;
        color:#666;

        &.active{
            color:@red;
            border-bottom:2px solid @red;
        }
    }
}
.vip-info{
    position: relative;
    padding: 10px 20px 10px 10px;
    font-size: 11px;
    background-color: #fff5ea;

    .tag{
        padding: 1px 2px;
        background: @orange;
        color:#fff;
        border-radius: 3px;
    }

    .title{
        margin-left: 5px;
        color:@orange;
    }

    .process{
        margin-left: 8px;
        color:#999;
    }

    .arrow{
        position: absolute;
        top: 50%;
        right: 3px;
        transform: translateY(-50%);
        color:#999;
        font-size: 10px;
    }
}
.map{
    z-index: 10;
    width: 6rem;
    height: 8rem;
    position: absolute;
    top: 10vh;
    left: 50%;
    transform: translateX(-50%);
}
.mask{
    z-index: 8;
    position: absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    background: rgba(0,0,0,.3);
}
.fade-enter,
.fade-leave-to{
    opacity: 0;
}
.fade-enter-active,
.fade-leave-avtive{
    transition: all .2s;
}
.fade-enter-to,
.fade-leave{
    opacity: 1;
}
</style>