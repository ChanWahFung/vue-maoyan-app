<template>
    <div class="movie-order">
        <div v-if="payOrders.length" class="order-list">
            <div class="order-item" v-for="(item,index) in payOrders" :key="index">
                <p class="payTime">订单时间：{{item.payTime}}</p>
                <span class="num">{{item.selectedArr.length}}张</span>
                <p class="movieName">{{item.movieName}}</p>
                <p class="cinemaName">影院：{{item.cinemaName}}</p>
                <p class="sence underline text-overflow">
                    场次：
                    <span>{{item.sceneDate}}</span>
                    <span>{{item.sceneTime}}</span>
                    <span>{{item.hallName}}</span>
                </p>
                <div class="position">
                    <span v-for="(p,i) in item.selectedArr" :key="i">
                        {{p.position}}
                    </span>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="nothing"></div>
            <p class="desc">QAQ 您还没有最新订单，快去下一单吧！</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'movie-order',
    inject:['app'],
    data () {
        return {
            payOrders:[]
        };
    },
    methods: {
        
    },
    created() {
        this.payOrders = this.app.payOrders;
    },
    beforeRouteEnter (to, from, next) {
        
        next(vm=>{
            vm.app.title = '电影订单';
            vm.app.showBack = true;
            vm.app.showTab = false;
        })
    }
}

</script>

<style lang="less" scoped>
.movie-order{
    z-index: 10;
    position: relative;
    min-height: 100vh;
    background: #f5f5f5;
}
.order-list{
    padding: 8px;
    font-size: .28rem;
    color:#555;
}
.order-item{
    position: relative;
    padding: 15px 8px;
    background: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
    box-shadow: 1px 1px 6px 0 #ddd;

    .num{
        position: absolute;
        top: .2rem;
        right:.2rem;
        font-size: 15px;
        color:#444;
    }

    .payTime{
        margin-bottom: .16rem;
    }

    .movieName{
        margin: .16rem 0;
        font-size: .36rem;
        font-weight: 600;
        color:#424242;
    }

    .cinemaName{
        margin:.1rem 0;
    }

    .sence{
        margin-top: .1rem;
        padding-bottom: .1rem;

        span{
            margin-right: .16rem;
        }
    }

    .position{
        margin-top: .1rem;

        span{
            margin-right: .1rem;
            color:#777;
        }
    }
}
.nothing{
    width: 3rem;
    height: 3rem;
    margin: 20vh auto 10PX auto;
    background: url(../../public/img/nothing.png) no-repeat;
    background-size:100% 100%; 
}
.desc{
    font-size: .3rem;
    color:#999;
    text-align: center;
}
</style>