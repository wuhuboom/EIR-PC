<template>
  <div class="app-layout-nav">
    <div class="nav-bar-main app-nav-bar">
      <div
        class="nav-bar-link"
        v-for="(item, idx) in navs"
        :key="idx"
        @click="navClick(item)"
      >
        <div
          class="nav-item-main"
          :class="{
            'nav-item-active': item.path == $route.fullPath,
          }"
        >
          <div>{{ item.name }}</div>
          <div class="nav-item-subtitle">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppTopBar',
  data() {
    return {};
  },
  computed: {
    serveData() {
      return this.$store.state.serveData?.serviceAddr;
    },
    navs() {
      let path = '/game/hall';
      if (this.$store.state.hallId) {
        path += `?id=${this.$store.state.hallId}`;
      }
      return [
        {
          name: '首页',
          desc: 'Home',
          path: '/',
        },
        {
          name: '游戏大厅',
          desc: 'Game Hall',
          path,
        },
        {
          name: '合买中心',
          desc: 'Cooperation',
          path: '/cooperation/activity',
        },
        // {
        //   name: "定制跟单",
        //   desc: "Customizations",
        //   path: "/custom/follow",
        // },
        {
          name: '用户中心',
          desc: 'Account',
          path: '/account/center',
        },
        {
          name: 'App下载',
          desc: 'DownLoad',
          path: '/download/app',
        },
        //客服
        {
          name: '在线客服',
          desc: 'Customer Service',
          path: '/customer/service',
        },
        {
          name: '线路检测',
          desc: 'Line Detection',
          path: '/line/index',
        },
        {
          name: '聊天室',
          desc: 'Chat Room',
          path: '/chat/room',
        },
        {
          name: 'U充教程',
          desc: 'Usdt Course',
          path: '/usdtInfo/index',
        },
      ];
    },
  },
  methods: {
    navClick(item) {
      if (item.path === '/customer/service') {
        this.$store.dispatch('getServeData');
        window.open(this.serveData);
        return;
      }
      if (item.path === '/line/index') {
        window.open(window.lineSite);
        return;
      }
      //window.location.origin
      if (item.path === '/chat/room') {
        location.href = `${window.location.origin}/#/chat/room`;
        return;
      }

      if (
        item.path === '/cooperation/activity' &&
        location.href.includes('/cooperation/activity')
      ) {
        location.reload();
        console.log(item, `${window.location.origin}/#/cooperation/activity`);
        return;
      }

      this.$router.push(item.path);
    },
  },
};
</script>
<style>
.nav-bar-link {
  cursor: pointer;
}
</style>
