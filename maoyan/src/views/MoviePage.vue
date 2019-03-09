<template>
    <div class="movie-page">
        <div class="top-bar underline">
            <div @click="goCityList" class="item city">
                {{city}}
                <span class="city-below iconfont icon-below-s"></span>
            </div>
            <div class="item" :class="{active:currComponent=='ShowingUp'}" @click="changeComponent('ShowingUp')">正在上映</div>
            <div class="item" :class="{active:currComponent=='UpComing'}" @click="changeComponent('UpComing')">即将上映</div>
            <div class="item search">
                <span @click="goSearch" class="search-icon iconfont icon-fangdajing"></span>
            </div>
        </div>
        <keep-alive>
            <component :is="currComponent"></component>
        </keep-alive>
    </div>
</template>

<script>
import ShowingUp from '../components/movie/ShowingUp'
import UpComing from '../components/movie/UpComing'

export default {
    name:'movie-page',
    props:['city'],
    inject:['app'],
    data () {
        return {
            currComponent:'ShowingUp',
        };
    },
    methods:{
        changeComponent(name){
            this.currComponent = name;
        },
        goSearch(){
            this.app.showTab = false;
            this.app.showBack = true;
            this.$router.push({path:'search',query:{searchtype:'movie'}});
        },
        goCityList(){
            this.app.showTab = false;
            this.app.showBack = true;
            this.app.title = '选择城市'
            this.$router.push('/citylist');
        }
    },
    components:{
        ShowingUp,
        UpComing
    },
    beforeRouteEnter (to, from, next) {
        next(vm=>{
            vm.app.showBack = false;
            vm.app.title = '猫眼电影'
        })
    },
}

</script>

<style lang="less" scoped>
.movie-page{
    position: relative;
}
.top-bar {
    z-index: 4;
    display: flex;
    position: sticky;
    top: 1rem;
    left:0;
    font-size: 0px;
    padding: 0 5px;
    background: #fff;

    .item {
        flex:1;
        font-size:14px;
        font-weight: 700;
        text-align: center;
        padding:10px 0;
        color:#666;

        &.city {
            font-weight: normal;
        }

        .city-below {
            font-size:12px;
        }

        &.active{
            color:@red;
            border-bottom:2px solid @red;
        }

        .search-icon{
            font-size: 20px;
            color:@red;
            margin-left:15px; 
        }
    }
}
</style>