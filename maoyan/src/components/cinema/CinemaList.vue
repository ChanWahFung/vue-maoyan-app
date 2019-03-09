<template>
    <div class="cinema-list">
        <div :id="item.id" @click="goCinemaDetail(item.id,item.nm)" class="cinema-item underline" v-for="(item,index) in cinemaList" :key="index">
            <div class="cinema-conten">
                <div class="cineme-title">
                    <span class="name">{{item.nm}}</span>
                    <span class="sell-price">{{item.sellPrice}}</span>
                </div>
                <div class="cinema-addr">
                    <div class="addr">{{item.addr}}</div>
                    <div class="distance">{{item.distance}}</div>
                </div>
                <div v-if="item.tag" class="cinema-label">
                    <div v-if="item.tag.allowRefund" class="tag allowRefund">退</div>
                    <div v-if="item.tag.endorse" class="tag endorse">改签</div>
                    <div v-if="item.tag.snack" class="tag snack">小吃</div>
                    <div v-if="item.tag.vipTag" class="tag vipTag">{{item.tag.vipTag}}</div>
                    <div v-if="item.tag.hallType" class="tag hallType-box">
                        <div class="tag hallType" v-for="(hallType,i) in item.tag.hallType" :key="i">{{hallType}}</div>
                    </div>
                </div>
                <div v-else class="cinema-label">
                    <div v-if="item.allowRefund" class="tag allowRefund">退</div>
                    <div v-if="item.endorse" class="tag endorse">改签</div>
                    <div v-if="item.snack" class="tag snack">小吃</div>
                    <div v-if="item.vipDesc" class="tag vipTag">{{item.vipDesc}}</div>
                    <div v-if="item.hallType" class="tag hallType-box">
                        <div class="tag hallType" v-for="(hallType,i) in item.hallType" :key="i">{{hallType}}</div>
                    </div>
                </div>
                <div v-if="item.promotion && item.promotion.cardPromotionTag" class="cineme-discount">
                    <div class="discount-icon"></div>
                    <div class="discount-text">{{item.promotion.cardPromotionTag}}</div>
                </div>
                <div v-if="item.showTimes" class="showtimes">
                    近期场次{{item.showTimes}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'cinema-list',
    props:['cinemaList'],
    inject:['app'],
    data () {
        return {
            
        };
    },
    methods: {
        goCinemaDetail(id,nm){
            this.app.title = nm;
            this.app.showBack = true;
            this.app.showTab = false;
            this.$router.push({path:'cinemadetail',query:{cinemaid:id}})
        }
    },
}

</script>

<style lang="less" scoped>
.cinema-list{
    background: #fff;
    padding: 0 .25rem;
}

.cinema-item {
    padding: 10px 0;
}

.cinema-conten {
    font-size: .32rem;
}

.cineme-title{
    .text-overflow();

    .sell-price{
        margin-left: 10px;
        color:@red;
        font-size: .35rem;

        &::after{
            content:'元起';
            font-size:.28rem;
        }
    }
}

.cinema-addr{
    display: flex;
    margin-top:.1rem;
    font-size: .26rem;
    color:#666;

    .addr{
        flex:1;
        .text-overflow();
    }
}

.cinema-label {
    font-size: .16rem;
    margin-top: 3px;

    div {
        display:inline-block;
        margin-right:3px; 
    }

    .tag{
        padding: 1px 3px;
        border-radius: 3px;
    }

    .snack,
    .vipTag{
        color:@orange;
        border:1px solid @orange;
        
    }

    .allowRefund,
    .endorse,
    .hallType{
        color: @blue;
        border:1px solid @blue;
    }
}

.cineme-discount {
    margin-top: 3px;
    .text-overflow();

    div {
        display:inline-block;
    }

    .discount-icon {
        width: 15px;
        height: 14px;
        margin-right: 5px;
        background: url(../../../public/img/card.png) no-repeat;
        background-size: 100% 100%;
        vertical-align: middle;
    }

    .discount-text {
        font-size: .2rem;
        color:#999;
    }
}
.showtimes{
    margin-top: 5px;
    font-size: 12px;
    color:#999;
} 
</style>