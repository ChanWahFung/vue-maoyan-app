<template>
    <div class="food-warp">
        <div class="list-title underline">影院超值套餐</div>
        <div class="food-list">
            <div class="food-item underline" v-for="(item,index) in foods" :key="index">
                <div class="food-post">
                    <i class="cardTag" v-if="item.cardTag">{{item.cardTag}}</i>
                    <img class="auto-img" :src="dealImgUrl(item.imageUrl,'440.0')" alt="">
                </div>
                <div class="food-content">
                    <div class="title">
                        <span class="recommend-person">{{item.recommendPersonNum}}人</span>
                        <span>{{item.title}}</span>
                    </div>
                    <div class="sold">{{Number.isFinite(item.curNumberDesc)?'已售':''}}{{item.curNumberDesc}}</div>
                    <div class="price">
                        <span>￥{{item.price}}</span>
                        <my-button style="display:inline-block;float:right;" type="buy">去购买</my-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'foos-warp',
    props:{
        foods:Array
    },
    data () {
        return {
        };
    },
}

</script>

<style lang="less" scoped>
.food-warp{
    padding: 0 10px;
    margin-top: 12px;
    background: #fff;

    .list-title{
        padding: 12px 0;
        font-size: .3rem;
        color:#424242;
    }
}
.food-item{
    display: flex;
    padding: 12px 0;

    .food-post{
        position: relative;
        flex:0 0 92px;
        width: 92px;
        height: 92px;

        .cardTag{
            position: absolute;
            display: block;
            top: 0;
            left:0;
            padding: 1px 2px;
            background: @red;
            font-size: 10px;
            color:#fff;
        }
    }

    .food-content{
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 5px;

        .title{
            font-size: 14px;
            color:#333;

            .recommend-person{
                margin-right: 10px;
                padding: 0 2px;
                font-size: 10px;
                color:#fff;
                border-radius: 3px;
                background: @orange;
            }
        }

        .sold{
            text-align: right;
            font-size: 12px;
            color:#999;
        }

        .price{
            font-size: 18px;
            color:@red;
        }
    }
}
</style>