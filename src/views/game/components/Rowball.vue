<template>
  <div class="play_ball_container play-ball-bar-item" :class="className">
    <div class="play_balls">
      <div class="play_ball_label no-shrink" v-if="title">
        <div>{{ title }}</div>
        <i class="el-icon-caret-right"></i>
      </div>
      <div class="play_ball_items">
        <div class="play_ball_numbers play_ball_numbers_last">
          <div v-for="(item, index) in left" :key="index" @click="addNum(item)">
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
      right: ['全', '大', '小', '奇', '偶', '清'],
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
        {
          up: 0,
          down: '',
        },
        {
          up: 1,
          down: '',
        },
        {
          up: 2,
          down: '',
        },
        {
          up: 3,
          down: '',
        },
        {
          up: 4,
          down: '',
        },
        {
          up: 5,
          down: '',
        },
        {
          up: 6,
          down: '',
        },
        {
          up: 7,
          down: '',
        },
        {
          up: 8,
          down: '',
        },
        {
          up: 9,
          down: '',
        },
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
        //取数组的最后一个作为 新数组
        this.nums = [val[val.length - 1]];
        return;
      }
      //取数组的最后两个个作为 新数组
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
      // 将数组转换为 Set，并计算交集
      return array1.filter((value) => array2.includes(value));
    },
    clear() {
      Object.assign(this.$data, {
        ...initDatas(),
      });
    },
    addNum(num) {
      if (this.nums.includes(num.up)) {
        this.nums = this.nums.filter((item) => item !== num.up);
      } else {
        this.nums.push(num.up);
      }
      //升序
      //this.nums.sort((a, b) => a - b);
    },
    randem(v = []) {
      // 检查参数是否有效，默认为 1
      const count = this.count;
      const excludeArray = v;

      // 过滤掉排除数组中的元素
      const availableList = this.upList.filter(
        (item) => !excludeArray.includes(item)
      );

      // 确保数量不超过过滤后的数组长度
      const maxCount = Math.min(count, availableList.length);

      // 使用 Set 来避免重复
      const selected = new Set();
      while (selected.size < maxCount) {
        const randomIndex = Math.floor(Math.random() * availableList.length);
        selected.add(availableList[randomIndex]);
      }

      // 更新 nums 为选中的元素数组
      this.nums = Array.from(selected);
      return this.nums;
    },
    getTwoRandomElements(arr, exclude = []) {
      const filteredArr = arr.filter((item) => !exclude.includes(item)); // 过滤掉 v 数组的元素
      if (filteredArr.length < 2) throw new Error('可用数组长度不足2');

      const copy = [...filteredArr]; // 复制数组，避免修改原数组
      const firstIndex = Math.floor(Math.random() * copy.length);
      const firstElement = copy.splice(firstIndex, 1)[0]; // 删除并获取该元素
      const secondIndex = Math.floor(Math.random() * copy.length);
      const secondElement = copy[secondIndex]; // 直接获取第二个元素

      return [firstElement, secondElement];
    },

    randemTow(v = []) {
      this.nums = this.getTwoRandomElements(this.upList, v);
      return this.nums;
    },

    filterLeft(option) {
      // 根据不同的 right 选项筛选 left
      if (option === '全') {
        this.nums = this.upList;
        this.type = '全';
      } else if (option === '大') {
        this.nums = this.upList.filter(
          (item, k) => k >= this.upList.length / 2
        );
        this.type = '大';
      } else if (option === '小') {
        this.nums = this.upList.filter((item, k) => k < this.upList.length / 2); // 示例：小于 5
        this.type = '小';
      } else if (option === '奇') {
        this.nums = this.upList.filter((item) => item % 2 !== 0); // 奇数
        this.type = '奇';
      } else if (option === '偶') {
        this.nums = this.upList.filter((item) => item % 2 === 0); // 偶数
        this.type = '偶';
      } else if (option === '清') {
        this.nums = []; // 清空筛选结果
        this.type = '清';
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
    //width: 476px;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
