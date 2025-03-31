<template>
  <div v-if="show">
    <div style="z-index: 9999">
      <div class="cp-dialog-mask"></div>
      <div class="cp-dialog" style="width: 300px; z-index: 99">
        <div class="cp-dialog-title">
          提示
          <img
            src="/static/gameHall/dialog_close.png"
            class="cp-dialog-close"
            @click="close"
          />
        </div>
        <div class="cp-dialog-content">
          <div class="cp-dialog-message" style="margin-left: 10px">
            <slot
              ><p>{{ txt }}</p></slot
            >
          </div>
        </div>
        <div class="cp-dialog-buttons">
          <div class="cp-dialog-button" @click="sure">
            <div class="cp-button-main cp-dialog-ok">
              <!---->
              确定
            </div>
          </div>
          <div class="cp-dialog-button" @click="close">
            <div class="cp-button-main cp-dialog-cancel">
              <!---->
              取消
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tipsDialog',
  data() {
    return {
      show: false,
      txt: '',
    };
  },
  props: {
    autoClose: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    close() {
      this.show = false;
    },
    sure() {
      this.show = false;
      this.$emit('sure');
    },
    open(v = '选择号码错误，请重新确认号码') {
      this.txt = v;
      this.show = true;
      this.trimr && clearTimeout(this.trimr);
      if (!this.autoClose) return;
      this.trimr = setTimeout(() => {
        this.show = false;
      }, 4000);
    },
  },
  beforeDestroy() {
    this.trimr && clearTimeout(this.trimr);
  },
};
</script>
