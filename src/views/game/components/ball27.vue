<template>
  <div>
    <!-- <div class="play_ball_bar_remark">每注以英文逗号","分隔，例如：123,456</div> -->
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
      return this.validateInput();
    },
  },
  components: {
    tipsDialog,
  },
  methods: {
    changemultiple() {
      const text = this.nums;
      const chineseNumbers = {
        一: 1,
        二: 2,
        三: 3,
        四: 4,
        五: 5,
        六: 6,
        七: 7,
        八: 8,
        九: 9,
        十: 10,
      };

      // **精准匹配数值+单位**
      const regex = /(\d+(\.\d+)?|[一-十]+)(元|毛|角|块)/g;
      const matches = [...text.matchAll(regex)];

      if (matches.length === 0) return null; // 没有匹配到任何金额

      // 取最后一个匹配的金额
      let number = matches[matches.length - 1][1];
      let unit = matches[matches.length - 1][3];

      // **处理中文数字**
      if (isNaN(number)) {
        if (number === '十') {
          number = 10;
        } else if (number.includes('十')) {
          let [first, second] = number.split('十');
          first = chineseNumbers[first] || 1; // '十' 开头的默认 1
          second = chineseNumbers[second] || 0;
          number = first * 10 + second;
        } else {
          number = chineseNumbers[number] || 0;
        }
      } else {
        number = parseFloat(number);
      }

      // **角/毛 忽略小数**
      if (unit === '角' || unit === '毛') {
        number = Math.floor(number);
      }

      // **元/块 转换为角**
      if (unit === '元' || unit === '块') {
        number = Math.floor(number * 10); // 直接转成角
        unit = '角'; // 修改单位
      }

      console.log('number----', number);
      this.$emit('changemultiple', number);
    },
    validateInput() {
      const text = this.nums;
      const matches = text.match(/\b\d{3}\b/g);
      if (!matches) {
        this.$refs.$tipsDialog.open('选择号码错误，请重新确认号码');
        this.$emit('total', 0);
        return false;
      }
      // 分类筛选
      const group3 = []; // 组三（有两个相同数字）
      const group6 = []; // 组六（三个数字都不同）

      matches.forEach((num) => {
        const digits = num.split('').sort(); // 分割为数组并排序
        const uniqueDigits = new Set(digits); // 转 Set 统计不同数字

        if (uniqueDigits.size === 2) {
          group3.push(num); // 组三
        } else if (uniqueDigits.size === 3) {
          group6.push(num); // 组六
        }
      });
      const allArr = [...group3, ...group6];
      if (!allArr.length) {
        this.$refs.$tipsDialog.open('选择号码错误，请重新确认号码');
        this.$emit('total', 0);
        return false;
      }
      this.$emit('total', allArr.length, allArr);
      this.changemultiple();
      return `${allArr.map((str) => str.split('').join(',')).join('|')}`;
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
