<template>
     <div class="scene-warp">          
        <div v-if="activeSceneInfo.length" class="scene-list">
            <div class="scene underline" @click="goSeat(item.seqNo,item.vipPrice)" v-for="(item,index) in activeSceneInfo" :key="index">
                <div class="scene-info">
                    <div class="info-col">
                        <div class="time">{{item.tm}}</div>
                        <div class="leave-time gray">{{leaveTime(item.tm)}} 散场</div>
                    </div>
                    <div class="info-col">
                        <div class="lang">{{item.lang + item.tp}}</div> 
                        <div class="th gray">{{item.th}}</div>                            
                    </div>
                    <div class="info-col">
                        <div v-if="item.vipPrice" class="price">￥{{~~item.vipPrice+5}}</div>
                        <div v-else class="price">￥43</div>
                        <div v-if="item.vipPrice" class="vip-card">
                            <i class="vip-pricename">{{item.vipPriceName}}</i>
                            <i class="vip-price">￥{{item.vipPrice}}</i>
                        </div>
                        <div class="extraDesc gray">{{item.extraDesc}}</div>
                    </div>
                </div>
                <my-button type="buy"></my-button>
            </div>
        </div>
        <div v-else class="no-scene">
            <div class="no-scene-img">
                <img src="../../../public/img/no-scene.png" alt="">
            </div>
            <div class="no-scene-text">暂无场次</div>
        </div>
    </div>
</template>

<script>
export default {
    name:'scene-warp',
    inject:['app'],
    props:{
        activeSceneInfo:Array,
        movieDur:Number
    },
    data () {
        return {
        };
    },
    methods:{
        goSeat(id,price){
            if(!price) price = 43;
            this.app.showTab = false;
            this.app.showBack = true;
            this.$router.push({name:'seats',params:{id},query:{p:price}});

        },
        leaveTime(time){
            let hour = 0;
            let min = 0;
            let timeArr = time.split(':');
            let durArr = [Math.floor(this.movieDur/60),this.movieDur%60]
            let tempHour = parseInt(timeArr[0]) + durArr[0];
            let tempMin = parseInt(timeArr[1]) + durArr[1];
            if(tempMin >= 60){
                hour+=1;
                min = tempMin % 60;
            }else{
                min = tempMin;
            }
            if(tempHour >= 24){
                hour+=tempHour % 24;
            }else{
                hour+=tempHour;
            }
            if(hour < 10) hour = '0' + hour
            if(min < 10) min = '0' + min
            return hour+':'+min;
        }
    }
}

</script>

<style lang="less" scoped>
.scene-warp{
    font-size: 16px;
    background: #fff;
}
.scene{
    display: flex;
    padding: 15px 8px 15px 12px;
    color:#333;

    .scene-info{
        display: flex;
        flex:1;
        font-size: 14px;
    }

    .info-col{
        flex:1;
        margin-right: 5px;

        &:last-child{
            flex:2;
            margin:0;
        }

        .gray{
            color:#999;
            font-size: 12px;
            margin-top: 3px;
        }

        .time{
            font-size: 20px;
            margin: 0;
        }

        .lang{
            margin-top: 3px;
            text-align: center;
            
        }

        .th{
            margin-top: 5px;
            text-align: center;
        }

        .price{
            display: inline-block;
            font-size: 18px;
            color:@red;
        }   

        .vip-card{
            display: inline-block;
            margin-left: 5px;
            font-size: 10px;
            border-radius: 3px;
            border:1px solid @orange;
            transform-origin: left;
            transform: scale(.8);
            overflow: hidden;

            >i{
                padding: 1px;
            }

            .vip-pricename{
                background: @orange;
                color:#fff;
            }

            .vip-price{
                color:@orange;
            }
        }
    }
}
.no-scene{
    padding: .7rem 0;
    text-align: center;

    .no-scene-img{
        >img{
            width: 77px;
            height: 71px;
        }
    }

    .no-scene-text{
        font-size: .32rem;
        color:#999;
    }
}
</style>