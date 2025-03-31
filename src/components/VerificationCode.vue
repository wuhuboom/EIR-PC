<template>
  <el-button
    class="code-btn"
    type="danger"
    :disabled="isCounting"
    @click="startCountdown"
  >
    {{ isCounting ? countdown + '秒' : '获取验证码' }}
  </el-button>
</template>

<script>
export default {
  data() {
    return {
      countdown: 60,
      isCounting: false,
      interval: null,
    };
  },
  props: {
    validFn: {
      type: Function,
      default: null,
    },
    getCode: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    resCountdown() {
      this.countdown = 60;
      this.isCounting = false;
      this.interval && clearInterval(this.interval);
    },
    async startCountdown() {
      let status = true;
      if (this.validFn) {
        status = await this.validFn();
      }
      if (!status) return;
      if (this.isCounting) return; // Prevent multiple clicks
      this.isCounting = true;
      await this.getCode();
      this.interval = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(this.interval);
          this.isCounting = false;
          this.countdown = 60; // Reset countdown
        }
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.code-btn {
  background-color: #412315;
  border: none;
}
</style>
