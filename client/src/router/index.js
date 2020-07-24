import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import PlayRoom from '../views/PlayRoom.vue';
import Rooms from '../views/Rooms.vue';
import MainMenu from '../views/MainMenu.vue';
import Waiting from '../views/Waiting.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/waiting/:id',
    name: 'Waiting',
    component: Waiting,
    meta: { auth: true },
  },
  {
    path: '/lobby',
    name: 'MainMenu',
    component: MainMenu,
    meta: { auth: true },
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: Rooms,
    meta: { auth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/playroom/:id',
    name: 'PlayRoom',
    component: PlayRoom,
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
    next({ path: '/login' });
  } else {
    next();
  }
})

export default router
