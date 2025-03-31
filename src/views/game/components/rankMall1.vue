<template>
  <div>
    <div class="table-header" style="max-width: 100%">
      <div
        class="table-header-border no-shrink"
        style="width: 90px; line-height: 40px"
      >
        期数
      </div>
      <div
        class="table-header-border no-shrink"
        style="width: 70px; line-height: 40px"
      >
        开奖号码
      </div>
      <div class="table-header-border">
        <div>
          <div
            style="
              line-height: 20px;
              border-bottom: 1px solid rgb(198, 156, 65);
            "
          >
            万位
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
      <div class="table-header-border">
        <div>
          <div
            style="
              line-height: 20px;
              border-bottom: 1px solid rgb(198, 156, 65);
            "
          >
            千位
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
      <div class="table-header-border">
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
      <div class="table-header-border">
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
      <div class="table-header-border">
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
    </div>
    <div
      class="y-container"
      style="position: relative; overflow: hidden auto; height: 545px"
    >
      <div class="container1">
        <div
          class="chart-table"
          style="max-width: 100%"
          v-for="item in data"
          :key="item.id"
        >
          <div class="table-row">
            <div class="table-cell no-shrink" style="width: 90px">
              {{ item.cycleNum }}
            </div>
            <div class="table-cell no-shrink" style="width: 70px">
              {{ item.openNum }}
            </div>
            <div class="table-row bg-blue" style="flex: 10 1 0%">
              <div
                class="table-cell"
                v-for="(v, idx) in item.ballMiss?.ball1"
                style="flex: 1 1 0%"
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
            <div class="table-row bg-blue" style="flex: 10 1 0%">
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
            <div class="table-row bg-yellow" style="flex: 10 1 0%">
              <div
                class="table-cell"
                style="flex: 1 1 0%"
                v-for="(v, idx) in item.ballMiss?.ball4"
                :key="idx"
              >
                <div
                  class="red-ball js-chose4"
                  v-if="idx === +item.openNumArr[3]"
                >
                  {{ idx }}
                </div>
                <div v-else>{{ showLuo ? v : '' }}</div>
              </div>
            </div>
            <div class="table-row bg-blue" style="flex: 10 1 0%">
              <div
                class="table-cell"
                style="flex: 1 1 0%"
                v-for="(v, idx) in item.ballMiss?.ball5"
                :key="idx"
              >
                <div
                  class="blue-ball js-chose5"
                  v-if="idx === +item.openNumArr[4]"
                >
                  {{ idx }}
                </div>
                <div v-else>{{ showLuo ? v : '' }}</div>
              </div>
            </div>
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
  methods: {
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
      this.$util.drawLines({ container, highlights, color: '#ec0000' });
    },
    draw5() {
      const container = document.querySelector('.container1');
      const highlights = container.querySelectorAll('.container1 .js-chose5');
      this.$util.drawLines({ container, highlights, color: '#8a2be2' });
    },
    drawLIne() {
      this.draw1();
      this.draw2();
      this.draw3();
      this.draw4();
      this.draw5();
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
    width: 200px;
  }
}
.table-header {
  .table-header-border {
    width: 200px;
    box-sizing: border-box;
  }
}
</style>
