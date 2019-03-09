<template>
    <div class="search-page">
        <div class="input-warp">
            <mt-search
                v-model="value"
                cancel-text="取消"
                placeholder="搜索"
                @input="inputEvent">
            </mt-search>
            <MovieList v-if="$route.query.searchtype=='movie'" :movieList="movieList"></MovieList>
            <CinemaList v-if="$route.query.searchtype=='cinema'" :cinemaList="cinemaList"></CinemaList>
        </div>
    </div>
</template>

<script>
import MovieList from '../components/movie/MovieList'
import CinemaList from '../components/cinema/CinemaList'

export default {
    name:'search-page',
    data () {
        return {
            value:'',
            timer:null,
            movieList:[],
            cinemaList:[]
        };
    },
    methods: {
        getMovieData(){
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'triple-bounce'
            });
            //搜索加载
            //http://m.maoyan.com/ajax/search?kw=123&cityId=10&stype=-1
            this.$axios.get('/api/ajax/search',{
                params:{
                    kw:this.value,
                    cityId:20,
                    stype:-1
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
                    if(data.movies){
                        this.movieList = data.movies.list;
                    }else{
                        this.movieList = [];
                    }
                    this.$indicator.close();
                })
        },
        getCinemaData(){
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'triple-bounce'
            });
            //搜索加载
            //http://m.maoyan.com/ajax/search?kw=123&cityId=10&stype=2
            this.$axios.get('/api/ajax/search',{
                params:{
                    kw:this.value,
                    cityId:20,
                    stype:2
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
                    if(data.cinemas){
                        this.cinemaList = data.cinemas.list;
                    }else{
                        this.cinemaList = [];
                    }
                    this.$indicator.close();
                })
        },
        inputEvent(){
            let type = this.$route.query.searchtype;
            clearTimeout(this.timer);
            this.timer = setTimeout(()=>{
                if(type=='movie'){
                    this.getMovieData()
                }else if(type=='cinema'){
                    this.getCinemaData();
                }
            },500)
        }
    },
    components:{
        MovieList,
        CinemaList
    }
}

</script>

<style lang="less" scoped>
.mint-search{
    height: 100%;
}
</style>