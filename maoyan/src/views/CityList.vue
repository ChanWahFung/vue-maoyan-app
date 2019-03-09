<template>
    <div v-if="citylist" class="city-list">
        <mt-index-list>
            <mt-index-section v-for="(item,index) in citylist" :index="item.initial" :key="index">
                <mt-cell @click.native="choseCity(city.name)" :title="city.name" v-for="(city,i) in item.list" :key="i"></mt-cell>
            </mt-index-section>
        </mt-index-list>
    </div>
</template>

<script>
export default {
    name:'city-list',
    inject:['app'],
    data () {
        return {
            citylist:null
        };
    },
    methods:{
        choseCity(name){
            this.app.showTab = true;
            this.app.showBack = false;
            this.app.title = '猫眼电影'
            this.app.city = name;
            this.$toast({
                message: '操作成功',
                position: 'top',
                duration: 2500
            });
            this.$router.go(-1);
        }
    },
    created() {
        this.$indicator.open({
            text: '加载中...',
            spinnerType: 'triple-bounce'
        });
        this.$axios.get('/api/citylist')
            .then(res=>{
                if(res.status===200){
                    return res.data.data
                }else{
                    return 'error'
                }
            })
            .then(data=>{
                this.citylist = data;
                this.$indicator.close();
            })
    },
    beforeRouteEnter (to, from, next) {
        next(vm=>{
            vm.app.title = '选择城市';
            vm.app.showBack = true;
        });
    }
}

</script>

<style scoped>
.city-list{
    z-index: 10;
    position: relative;
    font-size: .32rem !important;
}
</style>