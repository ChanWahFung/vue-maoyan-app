<template>
    <div class="app-header">
        <div class="header-bg">
            <span v-show="showBack" @click="goBack" class="back iconfont icon-fanhui"></span>
            <p class="header-title">{{title}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'app-header',
    inject:['app'],
    props:{
        title:{
            type:String,
            defalut:'猫眼电影'
        },
        showBack:Boolean
    },
    data () {
        return {
        };
    },
    methods:{
        goBack(){
            this.app.showTab = true;
            this.$router.go(-1);
        }
    }
}

</script>

<style lang="less" scoped>
.app-header{
    z-index: 12;
    position: sticky;
    top:0;
    font-size: 0;
}
.header-bg{
    position: relative;
    padding: .26rem;
    text-align: center;
    background: #e54847;

    .back {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        font-size: .5rem;
        color:#fff;
    }

    .header-title{
        padding: 0 .7rem;
        font-size: .36rem;
        color: #fff;
        .text-overflow();
    }
}
</style>