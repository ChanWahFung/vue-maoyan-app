<template>
    <div v-if="cm" class="cinema-movie">
        <div class="detail">
            <div class="bg">
                <img :src="dealImgUrl(cm.img)">
            </div>
            <div class="poster">
                <img class="auto-img" :src="dealImgUrl(cm.img)">
            </div>
            <div class="content">
                <div class="name">{{cm.nm}}</div>
                <div class="enname">{{cm.enm}}</div>
                <div v-if="cm.sc" class="score">
                    <span class="sc">{{cm.sc}}{{Number.isInteger(cm.sc)?'.0':''}} </span>
                    <span class="snum"> ({{cm.snum}}人评)</span>
                </div>
                <div v-else class="wish">{{cm.wish}}人想看</div>
                <div class="type">
                    <span class="cat">{{cm.cat}}</span>
                    <span :class="cm.version"></span>
                </div>
                <div class="src">{{cm.src}}/{{cm.dur}}分钟</div>
                <div class="pubDesc">{{cm.pubDesc}}</div>
            </div>
            <div @click="goMovieDetai(cm.id,cm.nm)" class="arrow iconfont icon-xiangyou"></div>
        </div>
        <div v-if="showDays" class="nav-showdate">
            <div class="datelist">
                <div class="date" :class="{active:index==activeIndex}" @click="activeDate(index)" v-for="(item,index) in showDays" :key="index">
                    {{dealDate(item.date)}}
                </div>
            </div>
        </div>
        <FilterTab :filterCinema="filterCinema" @update-cinema="updateCinema"></FilterTab>
        <CinemaList :cinemaList="cinemas"></CinemaList>
        <div class="btn" @click="lazyLoad">
            <p>查看更多</p>
        </div>
    </div>
</template>

<script>
import CinemaList from '../components/cinema/CinemaList'
import FilterTab from '../components/cinema/FilterTab'

export default {
    name:'cinema-movie',
    inject:['app'],
    data () {
        return {
            cm:null,
            cinemas:null,
            filterCinema:null,
            showDays:[],
            activeIndex:0,
            filterIds:{
                districtId: -1, //区域
                areaId: -1,  //地点
                brandId: -1, //品牌
                serviceId: -1,//服务
                hallType: -1, //特殊厅
                lineId: -1, //地铁线
                stationId: -1 //地铁站点
            }
        };
    },
    methods: {
        updateCinema(filterIds){
            this.filterIds = filterIds
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'triple-bounce'
            });
            this.getData({
                movieId: this.$route.query.movieid,
                day: this.showDays[this.activeIndex].date,
                offset: 0,
                limit: 10,
                updateShowDay: true,
                cityId: 20,
                ...filterIds
            })
        },
        dealDate(date){
            let dateArr = date.split('-');
            return `${dateArr[1]}日${dateArr[2]}月`
        },
        lazyLoad(){
            let date = new Date().getTime();
            this.$axios.post('/api/ajax/movie?forceUpdate='+date,{
                movieId: this.$route.query.movieid,
                day: this.showDays[this.activeIndex].date,
                offset: this.cinemas.length,
                limit: 10,
                updateShowDay: true,
                cityId: 20,
                ...this.filterIds
            })
                .then(res=>{
                    if(res.status===200){
                        return res.data
                    }else{
                        return 'error'
                    }
                })  
                .then(data=>{
                    this.cinemas = this.cinemas.concat(data.cinemas);
                })
        },
        goMovieDetai(id,name){
            this.app.showTab = false;
            this.app.showBack = true;
            this.app.title = name;
            this.$router.push({path:'moviedetail',query:{movieid:id}});
        },
        activeDate(index){
            this.activeIndex = index;
            this.getData({
                movieId: this.$route.query.movieid,
                day: this.showDays[index].date,
                offset: 0,
                limit: 10,
                updateShowDay: true,
                cityId: 20,
                ...this.filterIds
            })
            this.getFilterData({
                    movieId:this.$route.query.movieid,
                    day:this.showDays[index].date
            })
        },
        getData(obj){
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'triple-bounce'
            });
            let date = new Date().getTime();
            //影院详情
            //http://m.maoyan.com/ajax/movie?forceUpdate=1551330183792
            this.$axios.post('/api/ajax/movie?forceUpdate='+date,obj)
                .then(res=>{
                    if(res.status===200){
                        return res.data
                    }else{
                        return 'error'
                    }
                })  
                .then(data=>{
                    if(this.showDays.length==0)this.showDays = data.showDays.dates;
                    this.cinemas = data.cinemas;

                    if(!this.cinemas.length){
                        this.getData(this.showDays[0].date)
                    }else{
                        this.$indicator.close();
                    }
                })
        },
        getFilterData(obj){
            this.$axios.get('/api/ajax/filterCinemas',{
                    params:obj
                })
                    .then(res=>{
                        if(res.status===200){
                            return res.data
                        }else{
                            return 'error'
                        }
                    })  
                    .then(data=>{
                        this.filterCinema = data;
                    })
        }
    },
    watch: {
        showDays(){
            if(this.activeIndex===0){
                this.getFilterData({
                    movieId:this.$route.query.movieid,
                    day:this.showDays[0].date
                })
            }
        }
    },
    created() {
        this.getData({
            movieId: this.$route.query.movieid,
            day: '',
            offset: 0,
            limit: 10,
            updateShowDay: true,
            cityId: 20,
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
                this.cm = data.detailMovie;
            })
    },
    beforeRouteEnter (to, from, next) {
        next(vm=>{
            vm.app.showBack = true;
        })
    },
    components:{
        CinemaList,
        FilterTab
    }
}

</script>

<style lang="less" scoped>
.cinema-movie{
    z-index: 7;
    position: relative;
    font-size: 0px;   
}
.detail{
    position: relative;
    display: flex;
    padding: 19px 30px 19px 15px;
    font-size: .26rem;
    color:#fff;
    overflow: hidden;

    .bg{
        z-index: 2;
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom:0;
        filter: blur(15px) brightness(65%) saturate(80%);
        transform: scale(1.4);

        img{
            width:100%;
        }
    }
}
.nav-showdate{
    z-index: 10;
    position:sticky;
    top: 1rem;
    padding:0 .2rem;
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
        padding: .22rem;
        
        font-size: .3rem;
        color:#666;

        &.active{
            color:@red;
            border-bottom:2px solid @red;
        }
    }
}
.poster{
    z-index: 3;
    position: relative;
    width: 2.2rem;
    height: 3rem;
}
.content{
    z-index: 3;
    position: relative;
    flex:1;
    margin-left: .24rem;
    overflow-x:hidden;

    div{
        margin-top: .1rem;
        opacity: .8;
        .text-overflow();
    }

    .name{
        font-size: .38rem;
        font-weight: 700;
        opacity: 1;
    }

    .enname{
        font-size: .24rem;
        .text-overflow()
    }

    .score{
        opacity: 1;

        .sc{
            font-size: .36rem;
            font-weight: 700;
            color:@orange;
        }

        .snum{
            opacity: .8;
        }
    }

    .wish{
        font-size: .32rem;
        font-weight: 700;
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
.mt-swiper{
    z-index: 10;
    position:sticky;
    top:1rem;
    height: .88rem;
    padding: 0 15px;
    color:@red;
    background: #fff4f4;
    box-sizing: border-box;

    .item{
        font-size: .26rem;
        text-align: center;
        line-height: .88rem;
        color:#666;
    }
}
.arrow{
    z-index: 3;
    position:absolute;
    top:50%;
    right:10px;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    opacity: .6;
    transform: translateY(-50%);
}
.btn{
    height: 1.7rem;
    text-align: center;
    background: #fff;

    p {
        padding: 10px 0;
        font-size: .24rem;
        color:rgb(107, 107, 107);
    }
}
</style>