<template>
    <div class="login-page">
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
            console.log(vm.from);
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
    background: rgb(250, 250, 250);
}
.back{
    display: inline-block;
    font-size: 15px;
    padding: 15px 0;
}
.login-form {  

    >div{
        margin-top: 15px;
    }
}
.logo{
    padding: 30px 0; 
    text-align: center;
    
    >img{
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
    }
}
</style>