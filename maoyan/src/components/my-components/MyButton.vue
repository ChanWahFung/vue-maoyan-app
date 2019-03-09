<template>
    <div class="my-button">
        <span v-if="type=='buy'" class="btn buy">
            <slot>购票</slot>
        </span>
        <span v-if="type=='presell'" class="btn presell">
            <slot>预售</slot>
        </span>
        <span v-if="type=='want'" class="btn want">
            <slot>想看</slot>
        </span>
        <span v-if="type=='defalut'" class="btn defalut">
            <slot>重置</slot>
        </span>
    </div>
</template>

<script>
export default {
    name:'my-button',
    props:{
        type:String
    },
    data () {
        return {
        };
    },
}

</script>

<style lang="less" scoped>
.my-button{
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 50px;
}
.btn {
    padding: 5px 10px;
    font-size: 13px;
    color:#fff;
    border-radius: 5px;
    
    &.buy {
        background: @red;
    }

    &.want {
        background: @orange;
    }

    &.presell {
        background: @blue;
    }

    &.defalut{
        color:#999;
        border:1px solid #999;
    }
}
</style>