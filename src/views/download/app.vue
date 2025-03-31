<template>
  <div class="app-content">
    <div class="download_content">
      <div class="download_content-title">
        <div class="download-line"></div>
        <div class="download-title">App下载</div>
        <div class="download-line"></div>
      </div>
      <div class="download-app">
        <div class="download-android">
          <div class="download-android-image">
            <div id="id_android" @click="goApp(0)">
              <QrcodeVue :value="dev[0]?.appUrl || ''" :size="130" />
            </div>
          </div>
          <div>
            <div class="download-android-name">安卓App</div>
            <div class="download-android-address">下载地址</div>
            <div class="el-image download-android-logo">
              <img src="/static/android.png" class="el-image__inner" /><!---->
            </div>
          </div>
        </div>
        <div class="download-iphone">
          <div class="download-android-image" @click="goApp(1)">
            <div id="id_ios">
              <QrcodeVue :value="dev[1]?.appUrl || ''" :size="130" />
            </div>
          </div>
          <div>
            <div class="download-android-name">苹果App</div>
            <div class="download-android-address">下载地址</div>
            <div class="el-image download-android-logo">
              <img src="/static/iphone.png" class="el-image__inner" /><!---->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue';
export default {
  name: 'DownloadApp',
  components: {
    QrcodeVue,
  },
  computed: {
    dev() {
      return this.$store.state.devApp;
    },
  },
  methods: {
    goApp(appType) {
      if (!this.dev[appType]) {
        return;
      }
      window.open(this.dev[appType].appUrl);
    },
  },
  created() {
    this.downloadApp();
    this.$store.dispatch('appDownload', false);
  },
};
</script>
