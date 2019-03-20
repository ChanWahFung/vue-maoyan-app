<template>
    <div class="app-tarBar">
        <div class="tarBar-warpper">
            <router-link tag="div" @click.native="updateTitle(item.name)" exact :to="{name:item.link,params:{loginStatus}}"  class="tarBar-item" v-for="(item,index) in itemArr" :key="index">
                <span class="iconfont icon" :class="'icon-'+item.icon"></span>
                <p class="name">{{item.name}}</p>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name:'',
    props:['loginStatus'],
    data () {
        return {
            itemArr:[
                {name:'猫眼电影',icon:'dianying',link:'movie'},
                {name:'影院',icon:'yingyuan',link:'cinema'},
                {name:'我的',icon:'wode',link:'mine'}
            ]
        };
    },
    methods: {
        updateTitle(name){
            this.$emit('custom-update-title',name)
        }
    },
}

</script>

<style lang="less" scoped>
.app-tarBar{
    z-index: 5;
    position: fixed;
    bottom:0;
    left:0;
    width: 100%;
    font-size: 0px;
    background: #fff;

    .tarBar-warpper{
        display: flex;
        padding: 3px 0 1px 0;
        border-top:1px solid rgb(192, 192, 192);
        color:#696969;
    }

    .tarBar-item{
        flex:1;
        text-align: center;

        .icon {
            font-size:.45rem;
        }

        .name {
            font-size: .2rem;
        }

        li{
            font-size: 12px;
        }
    }
}
.router-link-active {
    color:@red;
}
</style>