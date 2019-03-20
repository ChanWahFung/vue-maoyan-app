<template>
    <div class="movie-list">
            <div class="item" @click="goCinemMovie(item.id,item.nm,item.globalReleased)" :id="item.id" v-for="(item,index) in movieList" :key="index">
                <div class="avatar">
                    <img class="auto-img" :src="dealImgUrl(item.img)" alt="">
                </div>
                <div class="content underline">
                    <div class="detail-box">
                        <div class="movie-title">
                            <p class="title">{{item.nm}}</p>
                            <span :class="item.version"></span>
                            <span v-if="item.pubDesc && item.sc" class="num">{{item.sc}}分</span>
                            <span v-else-if="item.punDesc && !item.globalReleased" class="grade">{{item.wish}}</span>
                            <span v-else-if="item.pubDesc && !item.sc" class="noSc">暂无评价</span>
                        </div>
                        <div class="detail">
                            <div v-if="item.globalReleased && item.sc && !item.enm" class="score line-ellipsis">
                                <span class="viewer">观众评 </span>
                                <span class="grade">{{Number.isInteger(item.sc)?item.sc+'.0':item.sc}}</span>
                            </div>
                            <div v-else-if="!item.globalReleased && !item.sc && !item.enm && !item.pubDesc" class="score line-ellipsis">
                                <span class="grade">{{item.wish}} </span>
                                <span class="viewer">人想看</span>
                            </div>
                            <div v-else-if="item.enm" class="score line-ellipsis">
                                <span class="viewer">{{item.enm}}</span>
                            </div>
                            <div v-else-if="!item.pubDesc"  class="score line-ellipsis">
                                <span class="viewer">暂无评论</span>
                            </div>
                            <div v-if="item.star" class="actor line-ellipsis">主演:{{item.star}}</div>
                            <div v-if="item.showInfo" class="show-info line-ellipsis">{{item.showInfo}}</div>
                            <div v-if="item.pubDesc" class="show-info line-ellipsis">{{item.pubDesc}}</div>
                        </div>
                    </div>
                    <div class="button-block" v-if="item.showInfo">
                        <my-button v-if="item.globalReleased" type="buy"></my-button>
                        <my-button v-else type="presell"></my-button>
                    </div>
                    <div v-else-if="!item.enm && !item.pubDesc" class="button-block">
                        <my-button type="want"></my-button>
                    </div>
                </div>
                
            </div>
    </div>
</template>

<script>
export default {
    name:'',
    props:['movieList'],
    inject:['app'],
    data () {
        return {
            
        };
    },
    methods: {
        goCinemMovie(id,nm,globalReleased){
            this.app.showBack = true;
            this.app.showTab = false;
            this.app.title = nm;
            if(!globalReleased){
                this.$router.push({path:'moviedetail',query:{movieid:id}})
            }else{
                this.$router.push({path:'cinemmovie',query:{movieid:id}})
            }   
        }
    },
}

</script>

<style lang='less' scoped>
.movie-list{
    background: #fff;
    padding: 0 .2rem;

    &::-webkit-scrollbar{
        display:none;
    }
}

.item {
    display:flex;
    overflow: hidden;

    .avatar {
        height: 1.8rem;
        flex:0 0 1.28rem;
        margin: .22rem .2rem .22rem 0;
    }
}

.content{
    flex: 1;
    display: flex;
    height: 1.8rem;
    font-size: .32rem;
    padding: .22rem 0;
}

.detail-box{
    flex:1;

    .movie-title{
        position: relative;
        display: flex;
        margin: 3px 0;

        .title{
            max-width: 2.2rem;
            padding-right: 5px;
            font-size: .34rem;
            font-weight: 700;
            color: #333;
            .text-overflow();
        }

        .num {
            position:absolute;
            top:0;
            right:0;
            font-size: .32rem;
            color:@orange;
        }

        .noSc{
            position:absolute;
            top:0;
            right:0;
            font-size: .28rem;
            color:#333;
        }

        .imax {
            display: inline-block;
            width: .86rem;
            height: .26rem;
            flex: 0 0 auto;
            margin-top:5px; 
        }

        .v2d {
            background: url(../../../public/img/v2d.png);
            background-size: 100%;
        }

        .v3d {         
            background: url(../../../public/img/v3d.png);
            background-size: 100%;            
        }
    }
    
    .detail {
        width: 100%;
        font-size:.26rem;
        color:#666;

        .grade {
            font-weight: 700;
            color:@orange;
        }

        .line-ellipsis {
            width: 3.3rem;
            margin-top: 5px;
            .text-overflow();
        }
    }
}

.button-block {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 50px;
}
</style>