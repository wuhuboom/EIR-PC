import Vue from 'vue';
import VueRouter from 'vue-router';
import auth from '@/plugins/auth';
//import app from "@/main";
Vue.use(VueRouter);
import store from '@/store';
import Nprogress from 'nprogress';
import AppTopBar from '@/components/AppTopBar';
import AppBtmBar from '@/components/AppBtmBar';
import app from '@/main';
const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: () => import('@/views/HomeView.vue'),
      AppTopBar,
      AppBtmBar,
    },
  },
  {
    path: '/login/SignIn',
    name: 'SignIn',
    components: {
      default: () => import('@/views/login/SignIn.vue'),
    },
  },
  {
    path: '/game/hall',
    name: 'gameHall',
    components: {
      default: () => import('@/views/game/hall.vue'),
      AppTopBar,
      AppBtmBar,
    },
  },
  {
    path: '/cooperation/activity',
    name: 'cooperationActivity',
    components: {
      default: () => import('@/views/cooperation/activity.vue'),
      AppTopBar,
      AppBtmBar,
    },
  },
  {
    path: '/custom/follow',
    name: 'customFollow',
    components: {
      default: () => import('@/views/custom/follow.vue'),
      AppTopBar,
      AppBtmBar,
    },
  },
  {
    path: '/order/detail/:id',
    name: 'orderDetail',
    components: {
      default: () => import('@/views/cooperation/orderDetail.vue'),
      AppTopBar,
      AppBtmBar,
    },
  },
  {
    path: '/myorder/detail/:id',
    name: 'myorderDetail',
    components: {
      default: () => import('@/views/cooperation/myOrder.vue'),
      AppTopBar,
      AppBtmBar,
    },
  },
  {
    path: '/pre/detail/:id',
    name: 'preDetail',
    components: {
      default: () => import('@/views/cooperation/preDetail.vue'),
      AppTopBar,
      AppBtmBar,
    },
  },
  {
    path: '/download/app',
    name: 'downloadApp',
    components: {
      default: () => import('@/views/download/app.vue'),
      AppTopBar,
      AppBtmBar,
    },
  },
  {
    path: '/usdtInfo/index',
    name: 'usdtInfoIndex',
    components: {
      default: () => import('@/views/usdtInfo/index.vue'),
      AppTopBar,
      AppBtmBar,
    },
  },
  {
    path: '/account/center',
    name: 'accountCenter',
    components: {
      default: () => import('@/views/account/center.vue'),
      AppTopBar,
      AppBtmBar,
    },
  },
  {
    path: '/chat/room',
    name: '/chatRoom',
    components: {
      default: () => import('@/views/chat/room.vue'),
      AppTopBar,
      AppBtmBar,
    },
  },
  {
    path: '/customer/service',
    name: 'customerService',
    components: {
      default: () => import('@/views/account/service.vue'),
      AppTopBar,
      AppBtmBar,
    },
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
});
router.beforeEach(async (to, from, next) => {
  Nprogress.start();
  const ajaxs = [];
  if (!store.state.serveData.serviceAddr) {
    store.dispatch('getServeData');
  }
  if (!store.state.config.area_code.length) {
    // ajaxs.push(store.dispatch("getCodeList"));
  }
  await Promise.all(ajaxs);
  if (auth.getToken() && !store.state.user.id) {
    const [error] = await store.dispatch('getInfo');
    if (error && auth.getToken('userInfo')) {
      store.commit('setUser', JSON.parse(auth.getToken('userInfo')));
    }
  }
  if (auth.getToken()) {
    if (!store.getters.catList.length) {
      await store.dispatch('playerLotteryList');
    }
    if (to.path.includes('/login')) {
      Nprogress.done();
      next('/');
    } else {
      next();
    }
  } else {
    if (to.path.includes('/login')) {
      next();
    } else {
      Nprogress.done();
      next('/login/SignIn');
    }
  }
  next();
});
router.afterEach((to, from) => {
  store.commit('setPdTop', true);
  Nprogress.done();
  app.$store.commit('setFromRoute', from);
});
export default router;
