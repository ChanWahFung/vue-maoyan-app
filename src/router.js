import Vue from 'vue';
import Router from 'vue-router';

//一级路由
import MoviePage from './views/MoviePage.vue'
import CinemaPage from './views/CinemaPage.vue'
import MinePage from './views/MinePage.vue'
import SearchPage from './views/SearchPage.vue'
import CityList from './views/CityList.vue'
import CinemaAndMovie from './views/CinemaAndMovie.vue'
import MovieDetail from './views/MovieDetail.vue'
import CinemaDetail from './views/CinemaDetail.vue'
import SeatsPage from './views/SeatsPage.vue'
import LoginPage from './views/LoginPage.vue'
import MovieOrder from './views/MovieOrder.vue'

Vue.use(Router);

const routes = [
  {path:'/',name:'movie',component:MoviePage,alias:'/movie'},
  {path:'/cinemmovie',name:'cinemmovie',component:CinemaAndMovie},
  {path:'/moviedetail',name:'moviedetail',component:MovieDetail},
  {path:'/cinema',name:'cinema',component:CinemaPage},
  {path:'/cinemadetail',name:'cinemadetail',component:CinemaDetail},
  {path:'/search',name:'search',component:SearchPage},
  {path:'/seats/:id',name:'seats',component:SeatsPage},
  {path:'/citylist',name:'citylist',component:CityList},
  {path:'/mine',name:'mine',component:MinePage},
  {path:'/movieorder',name:'movieorder',component:MovieOrder},
  {path:'/login',name:'login',component:LoginPage}
];

export default new Router({
  routes,
  mode:'history',
});
