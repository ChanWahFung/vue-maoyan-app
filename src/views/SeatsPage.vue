<template>
    <div v-if="seatData" class="seats-page">
        <div class="info-block underline">
            <div class="movie-name">{{seatData.movie.movieName}}</div>
            <div class="show-info">
                <span class="date">{{seatData.show.showDate}}</span>
                <span class="time">{{seatData.show.showTime}}</span>
                <span class="lang">{{seatData.show.lang}}{{seatData.show.dim}}</span>
            </div>
        </div>
        <div class="select-block">
            <div class="title">
                {{seatData.hall.hallName}}
            </div>
            <div class="seats-block">
                <div class="sideBar-num">
                    <div class="num" v-for="(item,index) in seats" :key="index">
                        {{item.rowId}}
                    </div>
                </div>
                <div class="seats-row" v-for="(row,index) in seats" :key="index">
                    <div class="seats-col" :class="seat.st" @click="selectSeat(index,row.rowId,i,seat.st,seat.seatNo)" v-for="(seat,i) in row.columns" :key="i"></div>
                </div>
            </div>
        </div>
        <div class="buy-block">
            <div class="seat-info">
                <span class="seat-type choose">可选</span>
                <span class="seat-type selected">已选</span>
                <span class="seat-type sold">已售</span>
                <span class="seat-type lover">情侣座</span>
            </div>
            <div v-if="!selectedArr.length && seatData.seat.bestRecommendation" class="recommend-price-block">
                <span class="title">推荐座位</span>
                <span @click="chooseBestRecommend(index,item)" class="recommend" v-for="(item,index) in bestRecommendation" :key="index">{{index+1}}人</span>
            </div>
            <div v-else class="selected-price-block">
                <p class="title">已选座位</p>
                <div class="selected">
                    <div class="selected-item" v-for="(item,index) in selectedArr" :key="index">
                        <span class="position">{{item.position}}</span>
                        <span class="price">￥{{price}}</span>
                        <span @click="deleteSelect(index)" class="delete">x</span>
                    </div>
                </div>
            </div>
            <div class="submit-block">
                <mt-button @click="isLogin" type="danger" size="large" :disabled="showBtn">{{btnText}}</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
const SELECT = 'S';    //已选座位 绿
const NOT_SELECT = 'N';//未选座位 白
const EMPTY = 'E';     //空座位
const LK = 'LK'        //不能选择的座位 红

export default {
    name:'seats-page',
    inject:['app'],
    data () {
        return {
            btnText:'请先选座',
            price:this.$route.query.p,
            seatData:null,
            seats:null,
            selectedArr:[]
        };
    },
    computed: {
        showBtn(){
            let len = this.selectedArr.length;
            return len==0 ? true : false;
        },
        bestRecommendation(){
            return Object.keys(this.seatData.seat.bestRecommendation)
        }
    },
    watch:{
        selectedArr(){
            let len = this.selectedArr.length;
            if(len==0){
                this.btnText = '请先选座';
            }else{
                this.btnText = `￥${(this.price*10)*(len*10)/100} 确认选座`
                // this.btnText = `￥${(this.price*len).toFixed(1)} 确认选座`
            }
        }
    },
    methods:{
        chooseBestRecommend(num){
            let best = this.seatData.seat.bestRecommendation;
            if(num==0){
                let bestOne = best.bestOne.seats;
                this.goBestRecommend(bestOne);
            }else if(num==1){
                let bestTwo = best.bestTwo.seats;
                this.goBestRecommend(bestTwo);
            }else if(num==2){
                let bestThree = best.bestThree.seats;
                this.goBestRecommend(bestThree);
            }else if(num==3){
                let bestFour = best.bestFour.seats;
                this.goBestRecommend(bestFour);
            }else if(num==4){
                let bestFive = best.bestFive.seats;
                this.goBestRecommend(bestFive);
            }
            
        },
        goBestRecommend(arr){
            arr.forEach((item)=>{

                this.seats.forEach((row,index)=>{
                    if(item.rowId==row.rowId){

                        row.columns.forEach((col,i)=>{
                            if(item.columnId == col.columnId){
                                this.setSeat(index,i,SELECT)
                                this.selectedArr.push({
                                    rowIndex:index,
                                    colIndex:i,
                                    seatNo:col.seatNo,
                                    position:this.position(index,row.rowId,i,col.seatNo)
                                });
                            }
                        })
                    }
                })
            })
        },
        position(row,rowId,col,seatNo){
            let colseat = 0;
            let colArr = this.seats[row].columns.filter((item)=>item.seatNo!=='');
            colArr.forEach((item,index)=>{
                if(item.seatNo==seatNo){
                    colseat = index+1;
                }
            })
            return `${rowId}排${colseat}座`
        },
        selectSeat(rowIndex,rowId,colIndex,st,seatNo){
            if(this.selectedArr.length>=4 && st == NOT_SELECT){
                this.$toast({
                    message: '每次最多可选4个座位',
                    duration: 3000
                });
                return;
            }
            
            if(st == NOT_SELECT && st !== EMPTY){
                this.setSeat(rowIndex,colIndex,SELECT);
                
                this.selectedArr.push({
                    rowIndex,
                    colIndex,
                    seatNo,
                    position:this.position(rowIndex,rowId,colIndex,seatNo)
                });
            }else if(st == SELECT){
                this.setSeat(rowIndex,colIndex,NOT_SELECT)
                this.selectedArr.forEach((item,index,arr)=>{
                    if(item.seatNo===seatNo){
                        arr.splice(index,1);
                        return;
                    }
                })
            }else{
                return;
            }
        },
        setSeat(rowIndex,colIndex,state){
            let seatObj = this.seats[rowIndex].columns[colIndex];
            this.$set(seatObj,'st',state);
        },
        deleteSelect(i){
            let selectedArr = this.selectedArr;
            let rowIndex = selectedArr[i].rowIndex;
            let colIndex = selectedArr[i].colIndex;
            this.setSeat(rowIndex,colIndex,NOT_SELECT);
            selectedArr.splice(i,1);
        },
        isLogin(){
            if(this.app.loginStatus==false){
                this.$messagebox.confirm('',{
                    message:'您需要登录才能购票哦！',
                    confirmButtonText:'去登录',
                    cancelButtonText:'留在这里'
                }).then(()=> {
                    this.$router.push('/login');
                }).catch(()=>{})
            }else{
                this.submitSelect();
            }
        },
        submitSelect(){
            let date = this.seatData.show.showDate.split('-');
            let sceneDate = `${date[1]}月${date[2]}日`;
            let orderInfo = {
                cinemaName:this.seatData.cinema.cinemaName,
                movieName:this.seatData.movie.movieName,
                sceneDate,
                sceneTime:this.seatData.show.showTime,
                lang:this.seatData.show.lang + this.seatData.show.dim,
                hallName:this.seatData.hall.hallName,
                payTime:new Date().toLocaleString(),
                selectedArr:this.selectedArr
            }
            this.$messagebox.confirm('o(>ω<)o确定购票吗?').then(()=> {
                this.$emit('update-payorder',orderInfo);
                this.$toast({
                    message: '购票成功，请在电影订单查看！',
                    duration: 1500
                });
                this.selectedArr.forEach((item)=>{
                    this.setSeat(item.rowIndex,item.colIndex,LK);
                })
                this.selectedArr = [];
                
            }).catch(()=> {
                this.$toast({
                    message: ' (╥╯^╰╥)呜呜呜',
                    duration: 1500
                });
            });
        }
    },
    created() {
        this.$indicator.open({
            text: '加载中...',
            spinnerType: 'triple-bounce'
        });
        let date = new Date().getTime();
        //http://m.maoyan.com/ajax/seatingPlan?timestamp=1551935723901
        this.$axios.post('/api/ajax/seatingPlan?timestamp='+date,{
            cityId: 20,
            ci: 20,
            seqNo: this.$route.params.id
        })
            .then(res=>{
                if(res.status===200){
                    return res.data
                }else{
                    return 'error'
                }
            })
            .then(data=>{
                this.seatData = data.seatData;
                this.seats = this.seatData.seat.sections[0].seats;
                this.$indicator.close();
            })
    },
    beforeRouteEnter (to, from, next) {
        next(vm=>{
            vm.app.showBack = true;
        })
    },
}

</script>

<style lang="less" scoped>

.seats-page{
    z-index: 10;
    position: relative;
    font-size: 0px;
}
.info-block{
    z-index: 5;
    position: relative;
    padding: .24rem;
    background: #fff;

    .movie-name{
        font-size:.32rem;
        font-weight:600;
        color:#333;
    }

    .show-info{
        margin-top: .1rem;

        >span{
            font-size: .26rem;
            color:#777;
            margin-right: .1rem;
        }
    }
}
.select-block{
    position: relative;
    padding-bottom: 2rem; 
    overflow-x: auto;
    text-align: center;

    .title{
        position: absolute;
        top: -12px;
        left: 40vh;
        text-align:center;
        padding: 12px 50px 0 50px;
        font-size: 14px;
        white-space: nowrap;
        color:#777;
        background: #e3e3e3;
        border-radius: 35px;
        transform: translateX(-50%);
    }

    .seats-block{
        position: relative;
        display: inline-block;
        padding: 0 1rem;
        margin-top: 1rem;
        opacity: .8;
    }

    .sideBar-num{
        position: fixed;
        display: inline-block;
        top:3.34rem;
        left:0;
        background: #e3e3e3;
        opacity: .8;

        .num{
            height: .2rem;
            padding: .1rem 0;
            font-size: .22rem;
            line-height: .2rem;
            color:#999;
            transform: scale(.8);
        }
    }

    .seats-row{
        display: flex;
        padding: 0.05rem 0;
    }

    .seats-col{
        width: .34rem;
        height: .3rem;
        margin-right: 0.06rem;

        &.N{
            background: url(../../public/img/seat-icon1.png) no-repeat;
            background-size: 100% 100%;
        }

        &.LK{
            background: url(../../public/img/seat-icon3.png) no-repeat;
            background-size: 100% 100%;
        }

        &.S{
            background: url(../../public/img/seat-icon2.png) no-repeat;
            background-size: 100% 100%;
        }
    }
}
.buy-block{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

    .seat-info{
        display:flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
        background: #f5f5f5;

        .seat-type{
            font-size: 12px;
            color:#999;
            margin-right: 10px;

            &::before{
                content: '';
                display: inline-block;
                width: 17px;
                height: 15px;
                margin-right: 3px;
                vertical-align: top;
            }
        }

        .choose::before{            
            background: url(../../public/img/seat-icon1.png) no-repeat;
            background-size: 100% 100%;
        }

        .selected::before{
            background: url(../../public/img/seat-icon2.png) no-repeat;
            background-size: 100% 100%;
        }

        .sold::before{
            background: url(../../public/img/seat-icon3.png) no-repeat;
            background-size: 100% 100%;
        }

        .lover::before{
            background: url(../../public/img/seat-icon4.png) no-repeat;
            background-size: 100% 100%;
        }
    }

    .recommend-price-block{
        display:flex;
        align-items: center;
        padding: 10px;
        font-size: 12px;
        color:#999;
        background: #fff;

        .title{
            flex: 2;
            color:#333;
            font-size: 14px;
            margin-right: 5px;
        }

        .recommend{
            flex: 1;
            padding: 5px 8px;
            border:1px solid #ccc;
            margin-right: 5px;
            text-align: center;
        }

    }

    .selected-price-block{
        padding: 10px;
        padding-bottom: 0;
        background: #fff;

        .title{
            color:#333;
            font-size: 14px;
            margin-bottom: 5px;
        }

        .selected{
            display:flex;
             flex-wrap:wrap;

            .selected-item{
                position: relative;
                display:flex;
                flex-direction:column;
                margin: 0 3px 5px 0;
                padding: .05rem .35rem .05rem .12rem;
                font-size: .24rem;
                text-align: center;
                border-radius: 2px;
                border: 1px solid #ccc;
            }

            .position{
                color:#333;
            }

            .price{
                color:@red;
            }

            .delete{
                display: block;
                position:absolute;
                top:50%;
                right:0;
                padding: 3px;
                color:#ccc;
                transform: translateY(-50%);
            }
        }
    }

    .submit-block{
        padding: 10px;
        background: #fff;
    }
}
</style>