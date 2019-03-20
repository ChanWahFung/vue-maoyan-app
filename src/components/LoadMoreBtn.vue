<template>
    <div class="btn" @click="lazyLoad">
        <p>查看更多</p>
    </div>
</template>

<script>
export default {
    name:'',
    data () {
        return {
        };
    },
    methods: {
        
    },
}

</script>

<style lang="less" scoped>
.btn{
    height: 1.7rem;
    text-align: center;

    p {
        margin: 10px;
        padding: 5px;
        background: rgba(255, 180, 180, 0.5);
        border:1px solid rgb(255, 160, 160);
        border-radius: 10px; 
        font-size: .24rem;
        color:rgb(107, 107, 107);
    }
}
</style>