import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Rooms from '../views/Rooms.vue';
import MainMenu from '../views/MainMenu.vue';
import Waiting from '../views/Waiting.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/waiting/:id',
    name: 'Waiting',
    component: Waiting,
  },
  {
    path: '/lobby',
    name: 'MainMenu',
    component: MainMenu,
  },
 {
    path: '/rooms',
    name: 'Rooms',
    component: Rooms,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {auth : true},
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // if (to.matched.some(record => record.meta.auth) && localStorage.access_token) {
  //   next();
  // } else if (to.name !== 'LoginPage' && !localStorage.access_token) {
  //   next({path: '/login'});
  // } else if(to.name === 'LoginPage' && localStorage.access_token) {
  //   next({name: 'Dashboard'});
  // } else {
  //   next();
  // }
  if (!localStorage.nickname && to.path !== '/login') {
    next({path: '/login'});
  } else {
    next();
  }
})

export default router
