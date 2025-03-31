<template>
  <div class="center-center iframe-box">
    <!-- 900*470 -->
    <iframe
      v-if="loading"
      class="iframe"
      :src="serveData"
      frameborder="0"
    ></iframe>
  </div>
</template>
<script>
//import userApi from "@/api/user";
export default {
  name: 'BindCard',
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    //state.serveData.serviceAddr
    serveData() {
      return this.$store.state.serveData?.serviceAddr;
    },
  },
  async created() {
    await this.$store.dispatch('getServeData');
    this.loading = true;
  },
};
</script>
<style lang="scss" scoped>
.iframe-box {
  width: 900px;
  height: 700px;
  margin: 0 auto;
  .iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
