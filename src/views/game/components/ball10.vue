<template>
  <div>
    <div class="play_ball_bar_remark">
      每注以英文逗号","分隔，例如：1234,2345
    </div>
    <textarea
      v-model.trim="nums"
      @blur="validateInput"
      class="play_ball_bar_input p-x-8"
    ></textarea>
    <tipsDialog ref="$tipsDialog" />
  </div>
</template>

<script>
import tipsDialog from '@/components/tipsDialog';
export default {
  name: 'InfoMain',
  data() {
    return {
      nums: '',
    };
  },

  computed: {
    text() {
      const arr = this.nums.split(/[,\s]+/).filter(Boolean);
      let str = '';
      arr.forEach((item, index) => {
        if (index === arr.length - 1) {
          str += `${item.split('')}`;
        } else {
          str += `${item.split('')}|`;
        }
      });
      return str;
    },
  },
  components: {
    tipsDialog,
  },
  methods: {
    validateInput() {
      if (this.nums.endsWith(',')) {
        this.nums = this.nums.slice(0, -1);
      }
      const value = this.nums;
      // 将输入的值拆分成数组，逗号和空格作为分隔符
      const values = value.split(/[,\s]+/).filter(Boolean); // 去除空值
      // 验证是否格式正确（单个数字为1-4位，或逗号分隔两组4位数字）
      const regex = /^(\d{1,4}|\d{4},\d{4})$/;
      const allValid = values.every((v) => regex.test(v));
      if (value.length < 4) {
        this.$emit('total', 0);
        return false;
      }
      if (!allValid) {
        this.$refs.$tipsDialog.open('选择号码错误，请重新确认号码');
        this.$emit('total', 0);
        return false;
      }
      // 检查数组中是否有重复
      const hasDuplicates = values.some(
        (item, index) => values.indexOf(item) !== index
      );

      if (hasDuplicates) {
        this.$refs.$tipsDialog.open(
          '抱歉，系统检测到重复下注号码，请重新选择下注号码'
        );
        this.$emit('total', 0);
        return false;
      }
      this.$emit('total', values.length);
      return true;
    },
    clear() {
      this.nums = '';
      this.$emit('total', 0);
    },
    add() {
      return this.validateInput();
    },
  },
};
</script>
