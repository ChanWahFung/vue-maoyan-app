<template>
    <div class="mine-page">
        <div class="header">
            <img class="portrait auto-img" src="../../public/img/portrait2.png" alt="">
        </div>
        <div class="order">
            <p class="order-title">我的订单</p>
            <div class="list">
                <div class="order-item movie">
                    <div @click="goMOvieOrder" class="icon iconfont icon-dianyingpiao">
                        <mt-badge v-if="app.unread" class="movie-badge" type="error">{{app.unread}}</mt-badge>
                    </div>
                    <p class="item-name">电影</p>
                </div>
                <div class="order-item store">
                    <div @click="nothing" class="icon iconfont icon-shangcheng2"></div>
                    <p class="item-name">商城</p>
                </div>
            </div>
        </div>
        <div class="group">
            <my-cell @click.native="nothing" name="我的收藏"></my-cell>
            <my-cell @click.native="nothing" name="我的足迹"></my-cell>
            <my-cell @click.native="nothing" name="我的卡包"></my-cell>
            <my-cell @click.native="nothing" name="设置"></my-cell>
        </div>
        <div class="quit-btn">
            <mt-button @click="signOut" type="danger" size="large">退出</mt-button>
        </div>
    </div>
</template>

<script>
export default {
    name:'mine-page',
    inject:['app'],
    data () {
        return {
            
        };
    },
    methods: {
        signOut(){
            this.app.loginStatus = false;
            this.$toast({
                message: '您已退出账号！',
                position: 'top',
                duration: 2500
            });
            this.$router.replace('/login');
        },
        goMOvieOrder(){
            this.$router.push('movieorder')
        },
        nothing(){
            this.$toast({
                message: '空空如也~',
                duration: 1000
            });
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm=>{
            let loginStatus = vm.$route.params.loginStatus;
            if(loginStatus==false){
                vm.app.showHeader = false;
                vm.app.showTab = false;
                vm.$router.replace('/login');
            }else{
                vm.app.showBack = false;
                vm.app.title = '我的'
            }
        }); 
    }
}

</script>

<style lang="less" scoped>
.mine-page{
    font-size: 0px;
    height: 100%;
    padding-bottom: 1.2rem;
}
.header{
    width: 100%;
    height: 150px;
    background: url(../../public/img/mine-bg.png) no-repeat;
    background-size: 100% 150px;
    text-align: center;

    .portrait{
        width: 1.2rem;
        height: 1.2rem;
        margin-top: 30px;
        border:3px solid #fff;
        border-radius: 50%;
    }
}
.order{
    margin-top: 12px;
    padding: 12px;
    text-align: center;
    background: #fff;
    min-height: 100px;

    .order-title{
        position: relative;
        font-size: .3rem;

        &::before{
            content: '';
            position: absolute;
            top: 50%;
            left: 20%;
            width: 40px;
            height: 1px;
            background: #eee;
        }

        &::after{
            content: '';
            position: absolute;
            top: 50%;
            right: 20%;
            width: 40px;
            height: 1px;
            background: #eee;
        }
    }

    .list{
        position: relative;
        display:flex;
        margin-top: 20px;
        font-size: .3rem;
    }

    .order-item{
        flex:1;

        .icon{
            display: inline-block;
            padding: .22rem;
            font-size: .4rem;
            line-height: 1;
            border-radius: 50%;
            color:#fff;
        }

        .item-name{
            margin-top: 10px;
        }
    }

    .movie{
        .icon{
            position: relative;
            background: #ff605a;
        }

        .movie-badge{
            position: absolute;
            top: -5px;
            right:-5px;
        }

    }

    .store{
        .icon{
            background: #40d6c2;
        }
    }
}
.group{
    margin-top: 12px;
}
.quit-btn{
    padding-top: 20px;
}
</style>