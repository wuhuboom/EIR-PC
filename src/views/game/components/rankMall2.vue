<template>
  <div>
    <div class="table-header" style="width: 100%">
      <div class="table-header-border" style="width: 90px; line-height: 40px">
        期数
      </div>
      <div class="table-header-border" style="width: 70px; line-height: 40px">
        开奖号码
      </div>
      <div class="table-header-border" style="flex: 10 1 0%">
        <div>
          <div
            style="
              line-height: 20px;
              border-bottom: 1px solid rgb(198, 156, 65);
            "
          >
            号码分布
          </div>
          <div class="table-row">
            <div style="flex: 1 1 0%; line-height: 20px">
              <div>0</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">1</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">2</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">3</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">4</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">5</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">6</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">7</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">8</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">9</div>
            </div>
          </div>
        </div>
      </div>
      <div class="table-header-border" style="flex: 6 1 0%">
        <div>
          <div
            style="
              line-height: 20px;
              border-bottom: 1px solid rgb(198, 156, 65);
            "
          >
            大小比
          </div>
          <div class="table-row">
            <div style="flex: 1 1 0%; line-height: 20px">
              <div>5:0</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">4:1</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">3:2</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">2:3</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">1:4</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">0:5</div>
            </div>
          </div>
        </div>
      </div>
      <div class="table-header-border" style="flex: 6 1 0%">
        <div>
          <div
            style="
              line-height: 20px;
              border-bottom: 1px solid rgb(198, 156, 65);
            "
          >
            奇偶比
          </div>
          <div class="table-row">
            <div style="flex: 1 1 0%; line-height: 20px">
              <div>5:0</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">4:1</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">3:2</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">2:3</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">1:4</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">0:5</div>
            </div>
          </div>
        </div>
      </div>
      <div class="table-header-border" style="flex: 1 1 0%">
        <div style="height: 41px">和值</div>
      </div>
    </div>
    <div
      class="y-container"
      style="position: relative; overflow: hidden auto; height: 545px"
    >
      <div
        class="chart-table"
        style="width: 100%"
        v-for="item in tableData"
        :key="item.id"
      >
        <div class="table-row" style="width: 100%">
          <div class="table-cell no-shrink" style="width: 90px">
            {{ item.cycleNum }}
          </div>
          <div class="table-cell no-shrink" style="width: 70px">
            {{ item.openNum }}
          </div>
          <div class="table-row bg-blue tab1">
            <div
              class="table-cell"
              style="flex: 1 1 0%"
              v-for="(v, idx) in item.ballMiss.ballAll"
              :key="idx"
            >
              <div
                class="gold-ball"
                v-if="
                  item.openNumArr.find(
                    (item) => +item.value === +idx && item.num == 1
                  )
                "
              >
                {{ idx }}
              </div>
              <div
                class="red-ball"
                v-else-if="
                  item.openNumArr.find(
                    (item) => +item.value === +idx && item.num > 1
                  )
                "
              >
                {{ idx }}
              </div>
              <div v-else>{{ showLuo ? v : '' }}</div>
            </div>
          </div>
          <!---->
          <div class="table-row bg-yellow tab2">
            <div
              class="table-cell"
              style="flex: 1 1 0%"
              v-for="(v, k) in item.bigLittle"
              :key="k"
              :class="{ 'blue-cell': v.key === item.sizeRatio }"
              :name="`${v.key}-${item.sizeRatio}`"
            >
              <p v-if="v.key === item.sizeRatio">{{ item.sizeRatio }}</p>
              <p v-else>{{ showLuo ? v.value : '' }}</p>
            </div>
          </div>
          <div class="table-row bg-blue tab3">
            <div
              class="table-cell"
              :class="{ 'green-cell': v.key === item.oddEvenRatio }"
              style="flex: 1 1 0%"
              v-for="(v, k) in item.oddEven"
              :key="k"
            >
              <p v-if="v.key === item.oddEvenRatio">{{ item.oddEvenRatio }}</p>
              <p v-else>{{ showLuo ? v.value : '' }}</p>
            </div>
          </div>
          <div class="table-cell bg-beigo" style="flex: 1 1 0%">
            {{ item.sum }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BindCard',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    showLuo: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      bigs: [
        { key: '5:0' },
        { key: '4:1' },
        { key: '3:2' },
        { key: '2:3' },
        { key: '1:4' },
        { key: '0:5' },
      ],
    };
  },
  computed: {
    tableData() {
      // bigLittle:{"datas":[大小比]}
      // oddEven:{"datas":[奇偶比]}
      return this.data.map((item) => {
        const { sizeRatio, sum, oddEvenRatio } = this.analyzeNumbers(
          item.openNum
        );
        let bigLittle = JSON.parse(item.bigLittle);
        bigLittle = bigLittle.datas.map((item, idx) => {
          return {
            value: item,
            key: this.bigs[idx].key,
          };
        });
        let oddEven = JSON.parse(item.oddEven);
        oddEven = oddEven.datas.map((item, idx) => {
          return {
            value: item,
            key: this.bigs[idx].key,
          };
        });
        return {
          ...item,
          openNumArr: this.countAndFormat(item.openNum.split(',')),
          sizeRatio,
          sum,
          oddEvenRatio,
          bigLittle,
          oddEven,
        };
      });
    },
  },
  methods: {
    countAndFormat(inputArray) {
      // 使用 Map 统计每个值的数量
      const countMap = inputArray.reduce((map, value) => {
        map.set(value, (map.get(value) || 0) + 1);
        return map;
      }, new Map());

      // 将 Map 转换为所需格式的数组
      return Array.from(countMap, ([value, num]) => ({ value, num }));
    },
    analyzeNumbers(input) {
      // 将字符串转为数组并转换为数字类型
      const numbers = input.split(',').map(Number);

      // 初始化变量
      let largeCount = 0; // 大数计数
      let smallCount = 0; // 小数计数
      let oddCount = 0; // 奇数计数
      let evenCount = 0; // 偶数计数
      let sum = 0; // 总和值

      // 遍历数组
      for (let num of numbers) {
        sum += num; // 累加总和

        // 判断大数和小数
        if (num >= 5) {
          largeCount++;
        } else {
          smallCount++;
        }

        // 判断奇数和偶数
        if (num % 2 === 0) {
          evenCount++;
        } else {
          oddCount++;
        }
      }

      // 构造结果
      return {
        sizeRatio: `${largeCount}:${smallCount}`, // 大小比
        sum, // 和值
        oddEvenRatio: `${oddCount}:${evenCount}`, // 奇偶比
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.chart-table {
  .table-row {
    &.tab1 {
      width: 433px;
    }
    &.tab2,
    &.tab3 {
      width: 261px;
    }
  }
}
</style>
