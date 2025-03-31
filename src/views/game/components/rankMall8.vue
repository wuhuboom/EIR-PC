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
            百位
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
      <div class="table-header-border" style="flex: 10 1 0%">
        <div>
          <div
            style="
              line-height: 20px;
              border-bottom: 1px solid rgb(198, 156, 65);
            "
          >
            十位
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
      <div class="table-header-border" style="flex: 10 1 0%">
        <div>
          <div
            style="
              line-height: 20px;
              border-bottom: 1px solid rgb(198, 156, 65);
            "
          >
            个位
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
      <div class="table-header-border" style="flex: 4 1 0%">
        <div>
          <div
            style="
              line-height: 20px;
              border-bottom: 1px solid rgb(198, 156, 65);
            "
          >
            百位
          </div>
          <div class="table-row">
            <div style="flex: 1 1 0%; line-height: 20px">
              <div>大</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">小</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">单</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">双</div>
            </div>
          </div>
        </div>
      </div>
      <div class="table-header-border" style="flex: 4 1 0%">
        <div>
          <div
            style="
              line-height: 20px;
              border-bottom: 1px solid rgb(198, 156, 65);
            "
          >
            十位
          </div>
          <div class="table-row">
            <div style="flex: 1 1 0%; line-height: 20px">
              <div>大</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">小</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">单</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">双</div>
            </div>
          </div>
        </div>
      </div>
      <div class="table-header-border" style="flex: 4 1 0%">
        <div>
          <div
            style="
              line-height: 20px;
              border-bottom: 1px solid rgb(198, 156, 65);
            "
          >
            个位
          </div>
          <div class="table-row">
            <div style="flex: 1 1 0%; line-height: 20px">
              <div>大</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">小</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">单</div>
            </div>
            <div style="flex: 1 1 0%; line-height: 20px">
              <div style="border-left: 1px solid rgb(198, 156, 65)">双</div>
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
      style="
        position: relative;
        overflow: hidden auto;
        height: 545px;
        width: 100%;
      "
    >
      <div class="chart-table container1" style="width: 100%">
        <div
          class="table-row"
          style="width: 100%"
          v-for="item in tableData"
          :key="item.id"
        >
          <div class="table-cell no-shrink" style="width: 90px">
            {{ item.cycleNum }}
          </div>
          <div class="table-cell no-shrink" style="width: 70px">
            {{ item.openNum }}
          </div>
          <div class="table-row bg-blue" style="width: 187.98px">
            <div
              class="table-cell"
              style="flex: 1 1 0%"
              v-for="(v, idx) in item.ballMiss?.ball1"
              :key="idx"
            >
              <div
                class="blue-ball js-chose1"
                v-if="idx === +item.openNumArr[0]"
              >
                {{ idx }}
              </div>
              <div v-else>{{ showLuo ? v : '' }}</div>
            </div>
          </div>
          <div class="table-row bg-yellow" style="width: 187.98px">
            <div class="table-row bg-yellow" style="flex: 10 1 0%">
              <div
                class="table-cell"
                v-for="(v, idx) in item.ballMiss?.ball2"
                style="flex: 1 1 0%"
                :key="idx"
              >
                <div
                  class="red-ball js-chose2"
                  v-if="idx === +item.openNumArr[1]"
                >
                  {{ idx }}
                </div>
                <div v-else>{{ showLuo ? v : '' }}</div>
              </div>
            </div>
          </div>
          <div class="table-row bg-blue" style="width: 187.98px">
            <div
              class="table-cell"
              style="flex: 1 1 0%"
              v-for="(v, idx) in item.ballMiss?.ball3"
              :key="idx"
            >
              <div
                class="green-ball js-chose3"
                v-if="idx === +item.openNumArr[2]"
              >
                {{ idx }}
              </div>
              <div v-else>{{ showLuo ? v : '' }}</div>
            </div>
          </div>
          <div class="table-row bg-beigo" style="width: 187.98px">
            <div
              class="table-cell"
              style="flex: 1 1 0%"
              v-for="(v, idx) in item.ballMiss?.ballAll"
              :key="idx"
            >
              <div
                class="gold-ball"
                v-if="item.openNumArr.find((num) => num === idx)"
              >
                {{ idx }}
              </div>
              <div v-else>{{ showLuo ? v : '' }}</div>
            </div>
          </div>
          <div class="table-row bg-blue" style="width: 76px">
            <!--小 双 green-cell 大 单blue-cell -->
            <div
              class="table-cell"
              style="flex: 1 1 0%"
              v-for="(v, idx) in item.bsg?.bai"
              :key="idx"
            >
              <div
                v-if="
                  !Number.isInteger(
                    getNumberProperty(item.openNumArr[0], idx, v)
                  )
                "
                :class="{
                  'blue-cell': ['大', '单'].includes(
                    getNumberProperty(item.openNumArr[0], idx, v)
                  ),
                  'green-cell': ['小', '双'].includes(
                    getNumberProperty(item.openNumArr[0], idx, v)
                  ),
                }"
              >
                {{ getNumberProperty(item.openNumArr[0], idx, v) }}
              </div>
              <div v-else>{{ showLuo ? v : '' }}</div>
            </div>
          </div>
          <div class="table-row bg-yellow" style="width: 76px">
            <div
              class="table-cell"
              style="flex: 1 1 0%"
              v-for="(v, idx) in item.bsg?.ge"
              :key="idx"
            >
              <div
                v-if="
                  !Number.isInteger(
                    getNumberProperty(item.openNumArr[1], idx, v)
                  )
                "
                :class="{
                  'blue-cell': ['大', '单'].includes(
                    getNumberProperty(item.openNumArr[1], idx, v)
                  ),
                  'green-cell': ['小', '双'].includes(
                    getNumberProperty(item.openNumArr[1], idx, v)
                  ),
                }"
              >
                {{ getNumberProperty(item.openNumArr[1], idx, v) }}
              </div>
              <div v-else>{{ showLuo ? v : '' }}</div>
            </div>
          </div>
          <div class="table-row bg-blue" style="width: 76px">
            <div
              class="table-cell"
              style="flex: 1 1 0%"
              v-for="(v, idx) in item.bsg?.ge"
              :key="idx"
            >
              <div
                v-if="
                  !Number.isInteger(
                    getNumberProperty(item.openNumArr[2], idx, v)
                  )
                "
                :class="{
                  'blue-cell': ['大', '单'].includes(
                    getNumberProperty(item.openNumArr[2], idx, v)
                  ),
                  'green-cell': ['小', '双'].includes(
                    getNumberProperty(item.openNumArr[2], idx, v)
                  ),
                }"
              >
                {{ getNumberProperty(item.openNumArr[2], idx, v) }}
              </div>
              <div v-else>{{ showLuo ? v : '' }}</div>
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
  computed: {
    tableData() {
      return this.data.map((item) => {
        const openNumArr = this.getFirstThree(item.openNum.split(',')).map(
          (num) => +num
        );
        return {
          ...item,
          openNum: `${openNumArr}`,
          openNumArr,
          sum: this.sumArray(openNumArr),
          bsg: JSON.parse(item.bsg),
          calculate: this.calculateLotteryObject(openNumArr),
        };
      });
    },
  },
  methods: {
    getNumberProperty(num, type, realNum) {
      // 检查是否是有效的数字（0-9 且是整数）
      if (num < 0 || num > 9 || !Number.isInteger(num)) {
        return `无效号码 (${realNum})`; // 返回错误提示
      }
      // 根据类型参数返回对应的文案
      switch (type) {
        case 0:
          return num > 4 ? '大' : realNum; // 判断大
        case 1:
          return num <= 4 ? '小' : realNum; // 判断小
        case 2:
          return num % 2 !== 0 ? '单' : realNum; // 判断单
        case 3:
          return num % 2 === 0 ? '双' : realNum; // 判断双
      }
    },
    calculateLotteryObject(numbers) {
      return numbers.reduce((acc, num) => {
        const size = num >= 5 ? '大' : '小';
        const parity = num % 2 === 0 ? '双' : '单';
        acc[`${num}`] = [size, parity];
        return acc;
      }, {});
    },
    calculateSpan(arr) {
      if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error('输入必须是非空数组');
      }
      const max = Math.max(...arr); // 获取数组的最大值
      const min = Math.min(...arr); // 获取数组的最小值
      return max - min; // 返回跨度
    },
    determineType(arr) {
      if (!Array.isArray(arr) || arr.length !== 3) {
        throw new Error('输入必须是包含三个数字的数组');
      }
      const [a, b, c] = arr;
      if (a === b && b === c) {
        return '子'; // 三个数字相同
      } else if (a === b || a === c || b === c) {
        return '三'; // 两个数字相同
      } else {
        return '六'; // 三个数字都不同
      }
    },
    sumArray(arr) {
      if (!Array.isArray(arr)) {
        throw new Error('输入必须是一个数组');
      }
      return arr.reduce((sum, num) => {
        if (typeof num !== 'number') {
          throw new Error('数组中必须全部为数字');
        }
        return sum + num;
      }, 0);
    },
    getFirstThree(arr) {
      if (!Array.isArray(arr)) {
        throw new Error('输入必须是一个数组');
      }
      return arr.slice(0, 3);
    },
    draw1() {
      const container = document.querySelector('.container1');
      const highlights = container.querySelectorAll('.container1 .js-chose1');
      this.$util.drawLines({ container, highlights, color: '#8a2be2' });
    },
    draw2() {
      const container = document.querySelector('.container1');
      const highlights = container.querySelectorAll('.container1 .js-chose2');
      this.$util.drawLines({ container, highlights, color: '#ec0000' });
    },
    draw3() {
      const container = document.querySelector('.container1');
      const highlights = container.querySelectorAll('.container1 .js-chose3');
      this.$util.drawLines({ container, highlights, color: '#00a14c' });
    },
    draw4() {
      const container = document.querySelector('.container1');
      const highlights = container.querySelectorAll('.container1 .js-chose4');
      this.$util.drawLines({ container, highlights, color: '#00a14c' });
    },
    drawLIne() {
      this.draw1();
      this.draw2();
      this.draw3();
      this.draw4();
    },
    clearLIne() {
      document.querySelectorAll('.container1 canvas').forEach((canvas) => {
        canvas.remove();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.chart-table {
  .table-row {
    width: 184px;
  }
}
.table-header {
  .table-header-border {
    width: 184px;
    box-sizing: border-box;
  }
}
</style>
