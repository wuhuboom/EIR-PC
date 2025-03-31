<template>
  <div v-if="show" style="z-index: 999">
    <div class="cp-popup-mask"></div>
    <div class="cp-popup-main" style="width: 400px; height: 420px; z-index: 9">
      <div class="cp-popup-title">
        <div class="cp-popup-title-content">
          <div style="color: rgb(230, 162, 60)">修改密码</div>
          <i class="el-icon-close" @click="close" style="cursor: pointer"></i>
        </div>
      </div>
      <div class="cp-popup-body" style="width: 400px; height: 420px">
        <div class="cp-popup-body-content">
          <div class="custom-record-tabs">
            <div
              class="custom-record-tab flex-1"
              :class="{ 'custom-record-tab-active': curId === item.id }"
              v-for="(item, index) in navs"
              :key="index"
              @click="curId = item.id"
            >
              {{ item.name }}
            </div>
          </div>
          <component
            @close="close"
            class="m-t-32"
            :is="currentComponent"
          ></component>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bindPass from '@/views/game/components/bindPass.vue';
import bindPayPass from '@/views/game/components/bindPayPass.vue';
export default {
  name: 'BindCard',
  data() {
    return {
      loading: false,
      show: false,
      navs: [
        {
          name: '登录密码',
          id: 0,
        },
        {
          name: '支付密码',
          id: 1,
        },
      ],
      curId: 0,
    };
  },
  computed: {
    currentComponent() {
      const components = {
        0: bindPass,
        1: bindPayPass,
      };
      return components[this.curId] || null;
    },
  },
  methods: {
    open(v = 0) {
      this.show = true;
      this.curId = v;
    },
    close() {
      this.show = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.recharge-dialog-input {
  text-align: left;
  padding-left: 4px;
}
.el-form-item__label::before {
  content: '*';
  color: rgb(245, 108, 108);
  margin-right: 4px;
  margin-left: 4px;
}
.icon-eye {
  position: absolute;
  top: 4px;
  right: 4px;
}
::v-deep {
  .el-form-item__error {
    left: 110px;
    white-space: nowrap;
  }
  .el-form-item__content {
    align-items: center;
    display: flex;
  }
}
</style>
