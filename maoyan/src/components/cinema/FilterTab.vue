<template>
    <div v-if="filterCinema" class="filter-box">
        <div class="filter-nav-warp underline">
            <div class="filter-tab">
                <div @click="activeTab(index)" class="item text-overflow" :class="[{activeTab:currTab===index},item.name]" v-for="(item,index) in filterTab" :key="index">
                    {{item.title}}
                    <span class="drop iconfont icon-below-s"></span>
                </div>
            </div>
            <div class="show-tab">
                <div class="page region-list" v-show="currTab==0">
                    <div class="chose-tab">
                        <span class="chose-item" :class="{chose:currChose==1}" @click="currChose=1">商区</span>
                        <span class="chose-item" :class="{chose:currChose==2}" @click="currChose=2">地铁站</span>
                    </div>
                    <div v-show="currChose==1" class="district">
                        <div class="sideBar">
                            <li class="side-item text-overflow" :class="{activeDistrict:currDistrict===index}" @click="activeDistrict(index,item.id)" :id="item.id" v-for="(item,index) in filterCinema.district.subItems" :key="index">
                                {{item.name}}({{item.count}})
                            </li>
                        </div>
                        <div class="area">
                            <li class="area-item" :class="{activeArea:currArea===index}" @click="activeArea(index,item.id,item.name)" v-for="(item,index) in areaArr" :key="index">
                                <span class="area-name">{{item.name}}</span>
                                <span class="area-count">{{item.count}}</span>
                            </li>
                        </div>
                    </div>
                    <div v-show="currChose==2" class="subway">
                        <div class="sideBar">
                            <li class="side-item text-overflow" :class="{activeLine:currLine===index}" @click="activeLine(index,item.id,item.name)" :id="item.id" v-for="(item,index) in filterCinema.subway.subItems" :key="index">
                                {{item.name}}({{item.count}})
                            </li>
                        </div>
                        <div class="station">
                            <li class="station-item" :class="{activeStation:currStation===index}" @click="activeStation(index,item.id,item.name)" v-for="(item,index) in stationArr" :key="index">
                                <span class="station-name">{{item.name}}</span>
                                <span class="station-count">{{item.count}}</span>
                            </li>
                        </div>
                    </div>
                </div>
                <div class="page brand-list"  v-show="currTab==1">
                    <li class="brand-item underline" :class="{activeBrand:currBrand===index}"  :id="item.id" @click="activeBrand(index,item.id,item.name)" v-for="(item,index) in filterCinema.brand.subItems" :key="index">
                        <span class="name">{{item.name}}</span>
                        <span class="count">{{item.count}}</span>
                    </li>
                </div>
                <div class="page special-list"  v-show="currTab==2">
                    <div class="service">
                        <p class="title">特色功能</p>
                        <div class="service-item" :class="{activeService:currService==index}" @click="activeService(index,item.id)" :id="item.id" v-for="(item,index) in filterCinema.service.subItems" :key="index">
                            {{item.name}}
                        </div>
                    </div>
                    <div class="hallType">
                        <p class="title">特殊厅</p>
                        <div class="hallType-item" :class="{activeHallType:currHallType==index}" @click="activeHallType(index,item.id)" :id="item.id" v-for="(item,index) in filterCinema.hallType.subItems" :key="index">
                            {{item.name}}
                        </div>
                    </div>
                    <div class="btn-block">
                        <my-button @click.native="resetSpecial" type="defalut"></my-button>
                        <my-button @click.native="submitSpecial" type="buy">确定</my-button>
                    </div>
                </div>
            </div>
        </div>
        <div @click="hiddenMask" :class="{mask:currTab!==-1}"></div>
    </div>
</template>

<script>
export default {
    name:'filter-box',
    props:['filterCinema'],
    data () {
        return {
            currTab:-1,
            currChose:1,
            currDistrict:0,
            currArea:0,
            currLine:0,
            currStation:0,
            currBrand:0,
            currService:0,
            currHallType:0,
            filterTab:[
                {title:'全城',name:'region'},
                {title:'品牌',name:'brand'},
                {title:'特色',name:'special'}],
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
    computed: {
        areaArr(){
            if(!this.currDistrict){
                return [];
            }
            return this.filterCinema.district.subItems[this.currDistrict].subItems;
        },
        stationArr(){
            if(!this.currLine){
                return [];
            }
            return this.filterCinema.subway.subItems[this.currLine].subItems;
        }
    },
    methods:{
        activeTab(i){
            if(this.currTab===i){
                this.currTab = -1;
            }else{
                this.currTab = i;
            }
        },
        activeDistrict(i,id){
            this.currDistrict = i;
            this.$set(this.filterIds,'districtId',id);

            this.currArea = 0;
            this.$set(this.filterIds,'areaId',-1);
        },
        activeArea(i,id,title){
            this.currArea = i;
            this.$set(this.filterIds,'areaId',id);
            this.$set(this.filterTab,this.currTab,{title,...this.filterTab});
            this.currTab = -1;
            this.$emit('update-cinema',this.filterIds)
        },
        activeLine(i,id){
            this.currLine = i;
            this.$set(this.filterIds,'lineId',id);
        },
        activeStation(i,id,title){
            this.currStation = i;
            this.$set(this.filterIds,'stationId',id);
            this.$set(this.filterTab,this.currTab,{title,...this.filterTab});
            this.currTab = -1;
            this.$emit('update-cinema',this.filterIds)
        },
        activeBrand(i,id,title){
            this.currBrand = i;
            this.$set(this.filterIds,'brandId',id);
            this.$set(this.filterTab,this.currTab,{title,...this.filterTab});
            this.currTab = -1;
            this.$emit('update-cinema',this.filterIds);
        },
        activeService(i,id){
            this.currService = i;
            this.$set(this.filterIds,'serviceId',id);
        },
        activeHallType(i,id){
            this.currHallType = i;
            this.$set(this.filterIds,'hallType',id);
        },
        resetSpecial(){
            this.currService = 0;
            this.currHallType = 0;
            this.$set(this.filterIds,'hallType',-1);
            this.$set(this.filterIds,'serviceId',-1);
        },
        submitSpecial(){
            this.currTab = -1;
            this.$emit('update-cinema',this.filterIds)
        },
        hiddenMask(){
            this.currTab = -1;
        },
    }
}

</script>

<style lang="less" scoped>
.filter-box{
    z-index: 6;
    position: sticky !important;
    top: 1.86rem;

    .mask{
        z-index: 7;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom:0;
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,.3);
        transition: all .1s;
    }
}
.filter-nav-warp{
    z-index: 10;
    position: relative;
    padding: .2rem 0;
    background: #fff;

    .filter-tab{
        display:flex;
        font-size: .26rem;
        coloe:#999;
        text-align: center;
        
    }

    .item{
        flex:1;
        padding: 0 5px;
        border-right:1px solid #e8e8e8; 

        &:last-child{
            border:0;
        }

        &.activeTab{
            color:@red;

            .drop{
                transform: rotate(180deg) translateY(2px);
            }
        }
    }
}
.show-tab{
    position: relative;

    .page{
        position: absolute;
        top:10px;
        left:0;
        width: 100%;
        font-size: 15px;
        color:#333;
        background: #fff;
        min-height: 150px;
        max-height: 7rem;
        box-sizing: border-box;
    }  
}
.region-list{

    .chose-tab{
        display: flex;
        font-size: 15px;
        color:#777;
        text-align:center;

        .chose-item{
            flex: 1;
            padding: 10px;
        }

        .chose{
            color: @red;
            border-bottom:2px solid @red;
        }
    }
}
.district,
.subway{
    display: flex;
    max-height: 6rem;

    .sideBar{
        flex:3;
        font-size: 14px;
        overflow-y: auto;
        color:#666;

        &::-webkit-scrollbar{
            display: none;
        }
        
        .side-item{
            padding:12px 8px;

            &.activeDistrict{
                background: #f5f5f5;
                color:@red;
            }

            &.activeLine{
                background: #f5f5f5;
                color:@red;
            }
        }
    }

    .area,
    .station{
        flex:7;
        padding: 0 15px 0 20px;
        overflow-y: auto;
        background: #f5f5f5;

        &::-webkit-scrollbar{
            display: none;
        }

        .area-item,
        .station-item{
            display: flex;
            justify-content: space-between;
            padding:12px 8px;
            font-size: 14px;
            color:#333;

            &.activeArea{
                color:@red;
            }
        }

        .station-item.activeStation{
            color:@red;
        }

        .area-count,
        .station-count{
            font-size: 10px;
            color:#999;
        }
    }
}
.brand-list{
    overflow-y: auto;

    &::-webkit-scrollbar{
        display:none;
    }

    .brand-item{
        display:flex;
        align-items:center;
        justify-content: space-between;
        padding: 12px 15px 12px 30px;
        margin-right: 25px;

        &.activeBrand{
            color:@red;

            .count{
                color:inherit;
            }
        }
    }

    .count{
        font-size: 12px;
        color:#666;
    }
}
.special-list{
    overflow-y: auto;
    padding:10px;

    .title{
        margin: 5px 0;
        font-size: 15px;
        color:#666;
    }

    .service-item,
    .hallType-item{
        display: inline-block;
        width: 50px;
        padding: 8px 3px;
        margin-right: 8px;
        margin-bottom: 5px;
        text-align:center;
        font-size: .22rem;
        overflow: hidden;
        color:#777;
        border-radius: 5px;
        border:1px solid #999;
        .text-overflow();
    }

    .activeService,
    .activeHallType{
        color:@red;
        border:1px solid @red;
        background: #fcf0f0;
    }

    .btn-block{
        padding: 10px;
        padding-bottom:0; 
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #999;
    }
}
.drop{
    display: inline-block;
    font-size: 8px;
    color:#ccc;
}
</style>