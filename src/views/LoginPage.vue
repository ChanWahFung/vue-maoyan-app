<template>
    <div class="login-page">
        <div class="bg"></div>
        <div @click="goBack" class="back iconfont icon-fanhui">返回</div>
        <div class="logo">
            <img src="../../public/img/logo.jpg">
        </div>
        <div class="login-form">
            <div class="user">
                <mt-field label="用户名" placeholder="请输入用户名"></mt-field>
            </div>
            <div class="password">
                <mt-field label="密码" placeholder="请输入密码" type="password"></mt-field>
            </div>
            <div class="submit">
                <mt-button @click="verification" type="danger" size="large">
                    登录
                </mt-button>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name:'login-page',
    inject:['app'],
    data () {
        return {
            from:''
        };
    },
    methods:{
        verification(){
            this.app.loginStatus = true;
            this.app.showHeader = true;
            this.app.showTab = true;
            this.$toast({
                message: '登录成功',
                position: 'top',
                duration: 2000
            });
            if(this.from.name == 'seats'){
                this.$router.go(-1)
            }else{
                this.$router.replace('mine');
            }
        },
        goBack(){
            this.app.showHeader = true;
            this.app.showTab = true;
            this.$router.go(-1);
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm=>{
            vm.app.showHeader = false;
            vm.app.showTab = false;
            vm.from = from
        });
    }
}

</script>

<style lang="less" scoped>
.login-page{
    z-index: 15;
    position: relative;
    padding: 12px;
    font-size: 0px;
    height: 100vh;
    box-sizing: border-box;

    .bg{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: url(../../public/img/login-bg.jpg) no-repeat;
        opacity: .5;
    }
}
.back{
    z-index: 5;
    position: relative;
    display: inline-block;
    font-size: 15px;
    padding: 15px 0;
    color:#fff;
}
.login-form {  

    >div{
        margin-top: 15px;
        border-radius: 10px;
        overflow: hidden;
    }
}
.logo{
    z-index: 5;
    position: relative;
    padding: 30px 0; 
    text-align: center;
    
    >img{
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
    }
}
</style>