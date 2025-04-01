<template>
  <div class="play_ball_container play-ball-bar-item" :class="className">
    <div class="play_balls">
      <div class="play_ball_label no-shrink" v-if="title">
        <div>{{ title }}</div>
        <i class="el-icon-caret-right"></i>
      </div>
      <div class="play_ball_items">
        <div class="play_ball_numbers play_ball_numbers_last">
          <!-- 移除数字的可点击功能，仅显示 -->
          <div v-for="(item, index) in left" :key="index">
            <div
              class="play_ball"
              :class="{ play_ball_active: nums.includes(item.up) }"
            >
              {{ item.up }}
            </div>
            <svg width="32" height="10" xmlns="http://www.w3.org/2000/svg">
              <text
                text-anchor="middle"
                dominant-baseline="middle"
                x="50%"
                y="50%"
                fill="#C4AB84"
                class="cp-text"
                style="font-size: 10px"
              >
                {{ curPre[index] }}
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="play_ball_operations" v-if="showRight">
      <div
        class="play_ball_operation"
        v-for="(item, idx) in right"
        :class="{ 'play_ball_operation-active': item == type }"
        @click="filterLeft(item)"
        :key="idx"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
const initDatas = () => {
  return {
    nums: [],
    type: '',
  };
};

export default {
  name: 'InfoMain',
  data() {
    return {
      ...initDatas(),
      right: ['大', '小', '奇', '偶'], // 只保留 '大', '小', '奇', '偶'
    };
  },
  props: {
    className: {
      type: String,
      default: '',
    },
    count: {
      type: Number,
      default: 1,
    },
    curPre: {
      type: Array,
      default: () => [],
    },
    isOne: {
      type: Number,
      default: 0,
    },
    showRight: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '百位',
    },
    left: {
      type: Array,
      default: () => [
        { up: 0, down: '' },
        { up: 1, down: '' },
        { up: 2, down: '' },
        { up: 3, down: '' },
        { up: 4, down: '' },
        { up: 5, down: '' },
        { up: 6, down: '' },
        { up: 7, down: '' },
        { up: 8, down: '' },
        { up: 9, down: '' },
      ],
    },
    orther: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    upList() {
      return this.left.map((item) => item.up);
    },
  },
  watch: {
    nums(val) {
      if (this.isOne == 1 && val.length > 1) {
        this.nums = [val[val.length - 1]];
        return;
      }
      if (this.isOne == 2 && val.length > 2) {
        this.nums = [val[val.length - 2], val[val.length - 1]];
        return;
      }
      this.$emit('filterLeft', val);
      const intersection = this.calculateIntersection(this.nums, this.orther);
      if (intersection.length > 0) {
        this.$emit('del', intersection);
      }
    },
  },
  methods: {
    calculateIntersection(array1, array2) {
      return array1.filter((value) => array2.includes(value));
    },
    clear() {
      Object.assign(this.$data, {
        ...initDatas(),
      });
    },
    // 移除 addNum 方法，因为不再需要点击数字选择
    filterLeft(option) {
      // 根据不同的 right 选项筛选 left
      if (option === '大') {
        this.nums = this.upList.filter(
          (item, k) => k >= this.upList.length / 2
        );
        this.type = '大';
      } else if (option === '小') {
        this.nums = this.upList.filter((item, k) => k < this.upList.length / 2);
        this.type = '小';
      } else if (option === '奇') {
        this.nums = this.upList.filter((item) => item % 2 !== 0);
        this.type = '奇';
      } else if (option === '偶') {
        this.nums = this.upList.filter((item) => item % 2 === 0);
        this.type = '偶';
      }
    },
  },
};
</script>

<style scoped lang="scss">
.play_ball_container {
  .play_ball {
    height: 32px;
    width: 32px;
  }
  .play_balls {
    align-items: flex-start;
  }
  .play_ball_active {
    color: #fff;
  }
  .play_ball_numbers_last {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
