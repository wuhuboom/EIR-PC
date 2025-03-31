<template>
  <el-input-number
    class="g-font-input-number"
    controls-position="right"
    v-model="num"
    :controls="controls"
    size="small"
    :min="min"
    :max="max"
  ></el-input-number>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
    };
  },
  props: {
    integer: {
      type: Boolean,
      default: true,
    },
    controls: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 9999,
    },
  },
  watch: {
    num(val) {
      //判断是不是正整数不是就向上取整
      if (this.integer && `${val}`.includes('.')) {
        this.num = Math.ceil(val);
        return;
      }
      this.$emit('input', val);
    },
    value(val) {
      console.log(val);
      this.num = val;
    },
  },
  created() {
    this.num = this.value;
  },
};
</script>
<style lang="scss">
.g-font-input-number.el-input-number {
  width: 70px;
  .el-input__inner {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none !important;
    padding-right: 15px;
  }
  .el-input-number__increase,
  .el-input-number__decrease {
    width: 12px;
    height: 12px;
    align-items: center;
    justify-content: center;
    line-height: 1 !important;
    border: none !important;
    background: none;
    right: 3px;
  }
  .el-input-number__increase {
    margin-top: -3px;
  }
  .el-input-number__decrease {
    margin-bottom: -1px;
  }
  &.line-input-num {
    .el-input__inner {
      background: none;
      border-bottom: 1px solid #fdd99b !important;
      color: #ffd800;
      border-radius: 0;
    }
    [role='button']:not(.is-disabled) {
      color: #ffd800;
    }
    .el-input-number__increase {
      margin-top: -4px;
    }
    .el-input-number__decrease {
      margin-bottom: 1px;
    }
  }
}
</style>
