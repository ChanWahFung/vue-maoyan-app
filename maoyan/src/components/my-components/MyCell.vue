<template>
    <div class="cell-item underline">
        <span class="name">{{name}}</span>
        <span class="arrow iconfont icon-xiangyou"></span>
    </div>
</template>

<script>
export default {
    name:'cell-item',
    props:{
        name:String
    },
    data () {
        return {
        };
    },
}

</script>

<style lang="less" scoped>
.cell-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .24rem;
    font-size: .3rem;
    background: #fff;

    .arrow{
        font-size: .3rem;
        color:#ccc;
    }
}
</style>