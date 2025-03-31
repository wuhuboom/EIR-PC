<template>
  <div class="app-layout-main" :class="{ 'p-t-100': $store.state.setPdTop }">
    <router-view name="AppTopBar"></router-view>
    <router-view :key="$router.currentRoute.fullPath" />
    <router-view name="AppBtmBar"></router-view>
    <RepairDilog />
  </div>
</template>
<script>
import userApi from '@/api/user';
import RepairDilog from '@/components/RepairDilog';
import auth from '@/plugins/auth';
export default {
  data() {
    return {};
  },
  components: {
    RepairDilog,
  },
  created() {
    setInterval(() => {
      if (auth.getToken()) {
        this.$store.dispatch('getInfo');
      } else {
        userApi.versionReq();
      }
    }, 3000);
  },
};
</script>
<style lang="scss" scoped>
.p-t-100 {
  padding-top: 100px;
}
</style>
