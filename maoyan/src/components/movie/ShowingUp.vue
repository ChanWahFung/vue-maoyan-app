<template>
    <div class="showing-up"> 
        <MovieList :movieList="movieList"></MovieList>           
        <div class="btn" @click="lazyLoad">
            <p>查看更多</p>
        </div>
    </div>
</template>

<script>
import MovieList from './MovieList'
export default {
    name:'showing-up',
    props:['currComponent'],
    data () {
        return {
            loading:false,
            movieIds:[],
            movieList:[]
        };
    },
    methods: {
        lazyLoad(){
            // let len = this.movieList.length;
            let movieIds = this.movieIds.slice(12,17).toString();
            //http://m.maoyan.com/ajax/moreComingList?token=&movieIds=
            this.$axios.get('/api/ajax/moreComingList',{
                params:{
                    token:'',
                    movieIds:movieIds
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
    created() {
        this.$indicator.open({
            text: '加载中...',
            spinnerType: 'triple-bounce'
        });
        this.$axios.get('/api/ajax/movieOnInfoList',{
            params:{
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
                this.movieList = data.movieList;
                this.movieIds = data.movieIds;
                this.$indicator.close();
            })
    },
    components:{
        MovieList
    }
}

</script>

<style lang="less" scoped>
.showing-up {
    font-size: 0px;
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