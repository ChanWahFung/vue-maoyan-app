<template>
    <div class="star-block">
        <span class="star" :class="star" v-for="(star,i) in starArr" :key="i"></span>
    </div>
</template>

<script>
const STARLENGTH = 5
const STAR_ON = 'on'
const STAR_OFF = 'off'
const STAR_HALF = 'half'
export default {
    name:'start-block',
    props:['score'],
    data () {
        return {

        };
    },
    computed: {
        starArr() {

            let record = []
            let score = Math.floor(this.score)/2
            let intScore = parseInt(score)

            for (let i = 1; i <= STARLENGTH; i++) {
                if (i <= intScore) {
                    record.push(STAR_ON)
                } else if (i > intScore && i === Math.ceil(score)) {
                    record.push(STAR_HALF)
                } else {
                    record.push(STAR_OFF)
                }
            }

            return record
        }
    }
}

</script>

<style lang="less" scoped>
.star-block{
    display:inline-block;
    opacity: 1 !important;

    .star{
        display: inline-block;
        width: .3rem;
        height: .3rem;

        &.on{
            background: url(../../../public/img/star-full.png) no-repeat;
            background-size:100% 100%; 
        }

        &.off{
            background: url(../../../public/img/star-empty.png) no-repeat;
            background-size:100% 100%; 
        }

        &.half{
            background: url(../../../public/img/star-half.png) no-repeat;
            background-size:100% 100%; 
        }
    }
}
</style>