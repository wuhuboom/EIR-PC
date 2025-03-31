<template>
  <el-dialog
    :visible.sync="dialogTableVisible"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="g-msg-repair-dialog"
    width="440px"
  >
    <ul>
      <li class="center-center font16 m-b-12">系统维护通知</li>
      <li class="text-center font12">{{ repair.msg }}</li>
    </ul>
  </el-dialog>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'RepairDilog',
  data() {
    return {
      dialogTableVisible: false,
    };
  },
  computed: {
    ...mapState({
      repair: (state) => state.repair, // 监听整个 repair 对象
    }),
  },
  watch: {
    repair: {
      handler(newVal) {
        if ([886, 188].includes(newVal?.code)) {
          if (!this.dialogTableVisible) {
            this.dialogTableVisible = true;
          }
        } else {
          if (this.dialogTableVisible) {
            this.dialogTableVisible = false;
            location.reload();
          }
        }
      },
      deep: true, // 监听 repair 内部属性变化
      immediate: true, // 组件初始化时立即触发一次
    },
  },
  methods: {},
};
</script>
<style lang="scss">
.g-msg-repair-dialog {
  .el-dialog {
    background: none;
  }
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    background: #774230;
    padding: 16px 24px;
    color: #fff;
  }
}
</style>
