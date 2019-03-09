<template>
    <div class="up-coming" >
        <div class="most-expected">
            <p class="title">近期最受期待</p>
            <div class="most-expected-list">
                <div class="expected-item" v-for="(item,index) in comingList" :key="index">
                    <div class="banner">
                        <span ref="favorite" @click="favorite(index)" class="favorite iconfont icon-aixin"></span>
                        <img class="auto-img" :src="dealImgUrl(item.img)" alt="">
                        <p class="dec">{{item.wish}}人想看</p>
                    </div>
                    <div class="content">
                        <p class="movie-name">{{item.nm}}</p>
                        <p class="show-date">{{item.comingTitle.split(' ')[0]}}</p>
                    </div>
                </div>
            </div>
        </div>
        <MovieList :movieList="movieList" ></MovieList>
        <div class="btn" @click="lazyLoad">
            <p>查看更多</p>
        </div>
    </div>
</template>

<script>
import MovieList from './MovieList'
export default {
    name:'up-coming',
    data () {
        return {
            loading:false,
            comingList:[],
            movieList:[]
        };
    },
    methods: {
        favorite(i){
            let item = this.$refs.favorite[i];
            if(item.classList.contains('active')){
                item.classList.remove('active')
                this.$toast({
                     message: '已取消收藏',
                     duration: 2000,
                     iconClass: 'iconfont icon-aixin'
                })
            }else{
                item.classList.add('active')
                this.$toast({
                     message: '已添加收藏',
                     duration: 2000,
                     iconClass: 'iconfont icon-aixin'
                })
            }
            
        },
        lazyLoad(){
            // let len = this.movieList.length;
            // let movieIds = this.movieIds.slice(12,17).toString();
            //http://m.maoyan.com/ajax/moreComingList?ci=20&token=&limit=10&movieIds=1261118%2C1250615%2C1261537%2C1257071%2C1262397%2C1261959%2C1220710%2C1212353%2C1220571%2C1229799
            this.$axios.get('/api/ajax/moreComingList',{
                params:{
                    token:'',
                    limit:10,
                    movieIds:'1261118,1250615,1261537,1257071,1262397,1261959,1220710,1212353,1220571,1229799'
                }
            })
                .then(res=>{
                    if(res.status===200){
                        return res.data
                    }else{
                        return 'error'
                    }
                })
                .then(data=>{
                    this.movieList = this.movieList.concat(data.coming)
                })
        },
    },
    created(){
        this.$indicator.open({
            text: '加载中...',
            spinnerType: 'triple-bounce'
        });
        //最受期待加载
        //http://m.maoyan.com/ajax/mostExpected?ci=20&limit=10&offset=10&token=
        this.$axios.get('/api/ajax/mostExpected',{
            params:{
                ci:20,
                limit:10,
                offset:10,
                token:''
            }
        })
        .then(res=>{
            if(res.status===200){
                return res.data
            }else{
                return 'error'
            }
        })
        .then(data=>{
            this.comingList = data.coming;
            this.$indicator.close();
        })
        //即将上映加载
        //http://m.maoyan.com/ajax/comingList?ci=20&token=&limit=10
        this.$axios.get('/api/ajax/comingList',{
            params:{
                ci:20,
                limit:10,
                token:''
            }
        })
        .then(res=>{
            if(res.status===200){
                return res.data
            }else{
                return 'error'
            }
        })
        .then(data=>{
            this.movieList = data.coming;
        })
        
    },
    components:{
        MovieList
    }
}

</script>

<style lang="less" scoped>
.up-coming{
    font-size: 0px;
}

.most-expected{
    margin-bottom: 10px;
    padding: .2rem;
    background: #fff;

    .title {
        margin-bottom: 10px;
        font-size: 14px;
        color:#333;
    }
}
.most-expected-list {
    z-index: 3;
    display: flex;
    position: relative;
    padding-bottom:10px; 
    overflow-x: auto;

    &::-webkit-scrollbar{
        display:none;
    }

    .expected-item{
        margin-right: 15px;
        width: 85px;

        .banner{
            position: relative;
            width: 85px;
            height:115px;
            overflow: hidden;

            .favorite{
                position:absolute;
                top: 0;
                left: 0;
                padding: 8px;
                background: rgba(0,0,0,.5);
                font-size: .22rem;
                color: rgb(190, 190, 190);
                border-bottom-right-radius:10px;
            }

            .dec {
                position: absolute;
                bottom:0;
                left:0%;
                margin-left:5px; 
                font-size: 13px;
                font-weight: 700;
                color:@orange;
            }

            .active {
                color:@red;
            }
        }

        .content {
            font-size: .28rem;

            .movie-name{
                width: 100%;
                margin-top: 5px;
                font-weight: 700;
                color:#333;
                .text-overflow();
            }

            .show-date{
                margin-top: 3px;
                font-size: .24rem;
                color:#666;
            }
        }
    }
}
.btn{
    height: 1.7rem;
    text-align: center;
    background: #fff;

    p {
        padding: 10px 0;
        font-size: .24rem;
        color:rgb(107, 107, 107);
    }
}
</style>