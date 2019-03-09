<template>
  <div id="app">
    <AppHeader v-show="showHeader" :showBack="showBack" :title="title"></AppHeader>
    <transition name='fade'>
      <router-view :city="city" @update-payorder="updatePayOrder"></router-view>
    </transition>
    <AppTabBar v-show="showTab" :loginStatus="loginStatus" @custom-update-title="updateTitle"></AppTabBar>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
import AppTabBar from './components/AppTabBar'

export default {
  name: 'app',
  provide () {
    return {
      app: this
    }
  },
  data() {
    return {
      title:'猫眼电影',
      city:'广州',
      showHeader:true,
      showTab:true,
      showBack:false,
      loginStatus:false,
      payOrders:[]
    };
  },
  computed: {
    unread() {
      return this.payOrders.length ;
    }
  },
  methods: {
    updateTitle(title){
      this.title = title;
    },
    updatePayOrder(orderInfo){
      this.payOrders.push(orderInfo)
    }
  },
  components:{
    AppHeader,
    AppTabBar
  },
}
</script>

<style lang="less">
#app{
  font-size: 0;
  color:#424242;
  position: relative;
  background: #f5f5f5;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}

//bounce(动画)
.bounce-enter-active {
  animation: bounce-in .3s;
}
.bounce-leave-active {
  animation: bounce-in .3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
