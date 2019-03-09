<template>
    <div class="cinema-page">
        <div class="top-bar underline">
            <div @click="goCityList" class="city">
                <p>
                    {{city}}
                   <span class="drop iconfont icon-below-s"></span>
                </p>
            </div>
            <div @click="goSearch" class="search">
                <span class="search-icon iconfont icon-fangdajing"></span>
                <span class="search-text">搜影院</span>
            </div>
        </div>
        <FilterTab :filterCinema="filterCinema" @update-cinema="updateCinema"></FilterTab>
        <CinemaList :cinemaList="cinemaList"></CinemaList>
        <div class="btn" @click="lazyLoad">
            <p>查看更多</p>
        </div>
    </div>
</template>

<script>
import CinemaList from '../components/cinema/CinemaList'
import FilterTab from '../components/cinema/FilterTab'

export default {
    name:'cinema-page',
    inject:['app'],
    props:['city'],
    data () {
        return {
            cinemaList:null,
            filterCinema:null,
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
        goCityList(){
            this.app.showTab = false;
            this.app.showBack = true;
            this.app.title = '选择城市'
            this.$router.push('/citylist');
        },
        goSearch(){
            this.app.showTab = false;
            this.app.showBack = true;
            this.$router.push({path:'search',query:{searchtype:'cinema'}});
        },
        updateCinema(filterIds){
            this.filterIds = filterIds;
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'triple-bounce'
            });
            let day = this.formatDate();
            this.$axios.get('/api/ajax/cinemaList',{
                params:{
                    day,
                    offset:0,
                    limit:10,
                    ...this.filterIds,
                    cityId:20
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
                this.cinemaList = data.cinemas;
                this.$indicator.close();
            })
        },
        lazyLoad(){
            let day = this.formatDate();
            let offset = this.cinemaList.length;
            this.$axios.get('/api/ajax/cinemaList',{
                params:{
                    day,
                    offset:offset,
                    limit:10,
                    ...this.filterIds,
                    cityId:20
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
                this.cinemaList = this.cinemaList.concat(data.cinemas);
                this.$indicator.close();
            })
        }
    },
    created() {
        this.$indicator.open({
            text: '加载中...',
            spinnerType: 'triple-bounce'
        });
        //初始化影院
        let day = this.formatDate();
        this.$axios.get('/api/ajax/cinemaList',{
            params:{
                day,
                offset:0,
                limit:10,
                cityId:20
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
                this.cinemaList = data.cinemas;
                this.$indicator.close();
            })

        this.$axios.get('/api/ajax/filterCinemas',{
            params:{ci:20}
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
    },
    components:{
        CinemaList,
        FilterTab
    },
    beforeRouteEnter (to, from, next) {
        next(vm=>{
            vm.app.showBack = false;
            vm.app.title = '影院'
        })
    },
}

</script>

<style lang="less" scoped>
.cinema-page{
    position: relative;
    font-size: 0px;
}
.top-bar {
    z-index: 10;
    display: flex;
    position: sticky;
    top: 1rem;
    left:0;
    height:.88rem;
    padding: .15rem .25rem;
    font-size:.28rem;
    color:#666;
    box-sizing: border-box;
    background: #f5f5f5;

    .city {
        flex:2;
        
        p {
            margin-top: .08rem;
        }
    }    

    .search {
        flex:4;
        padding: .1rem 0;
        text-align: center;
        font-size: .22rem;
        background: #fff;
        border:1px solid rgb(224, 224, 224);
        border-radius: 5px;
        opacity: .8;

        .search-icon{
            font-size: .26rem;
            margin-right:.1rem;
        }
    }
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
.drop{
    display: inline-block;
    font-size: 8px;
    color:#ccc;
}
</style>