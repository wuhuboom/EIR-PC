<template>
  <div>
    <div class="play_ball_bar_remark">
      至少输入3个号码,每个以英文逗号","分隔，例如：1,2,3
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
    numsArr() {
      return this.nums.split(/[,\s]+/).filter(Boolean);
    },
    text() {
      return `${this.numsArr}`;
    },
  },
  components: {
    tipsDialog,
  },
  methods: {
    validateInput() {
      // 去除末尾逗号，防止空值
      if (this.nums.endsWith(',')) {
        this.nums = this.nums.slice(0, -1);
      }

      // 拆分输入的值，按逗号分隔，并去除空值
      const values = this.nums.split(',').filter(Boolean);

      // 确保至少输入 2 个数字
      if (values.length < 4) {
        this.$refs.$tipsDialog.open('请至少选择 4 个号码');
        this.$emit('total', 0);
        return false;
      }

      // 正则：确保每个值是 0-9 的单个数字
      const regex = /^[0-9]$/;
      const allValid = values.every((v) => regex.test(v));

      if (!allValid) {
        this.$refs.$tipsDialog.open('选择号码错误，请重新确认号码');
        this.$emit('total', 0);
        return false;
      }

      // 检查是否有重复项
      const hasDuplicates = new Set(values).size !== values.length;
      if (hasDuplicates) {
        this.$refs.$tipsDialog.open('抱歉，系统检测到重复号码，请重新选择');
        this.$emit('total', 0);
        return false;
      }

      // 通过验证，返回有效号码总数
      this.$emit('total', 1, this.numsArr);
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
