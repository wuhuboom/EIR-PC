<template>
  <div>
    <tipsDialog ref="buyDialog" />
    <div v-if="show" class="trace-order-main">
      <div class="trace-order-title">
        <div class="trace-order-info align-center">
          隔
          <CpInput
            class="m-l-4 m-r-4"
            v-model="Interval"
            @input="changeMultiplier"
            :min="1"
            :max="9999"
          />
          <span>期</span>
          <span class="m-r-4 m-l-16">倍x</span>
          <CpInput
            v-model="multiplier"
            @input="changeMultiplier"
            :min="1"
            :max="9999"
          />
          <div
            class="cp-radio-main trace-order-radio"
            v-for="(item, idx) in lineList"
            :key="idx"
            @click="changeline(item)"
          >
            <div class="cp-radio-outer">
              <div
                class="cp-radio-inner"
                :class="{ 'cp-radio-inner-active': item.id === line }"
              ></div>
            </div>
            <div class="cp-radio-text" style="color: rgb(253, 217, 155)">
              {{ item.name }}
            </div>
          </div>

          <span class="m-r-4">追号期数</span>
          <CpInput
            v-model="period"
            @input="changePeriod"
            :min="1"
            :max="list.length"
          />
        </div>
        <div class="cp-checkbox-main trace-order-cb">
          <div
            class="cp-checkbox-image"
            @click="stop = !stop"
            :class="{ 'cp-checkbox-image-active': stop }"
          ></div>
          <div style="margin-left: 10px">中奖后停止追号</div>
        </div>
      </div>
      <div class="trace-order-table-div">
        <table rules="cols" class="trace-order-table">
          <tr align="center" style="background: rgb(50, 22, 11)">
            <th height="40">选择</th>
            <th height="40">期号</th>
            <th height="40">单倍金额</th>
            <th height="40">倍数</th>
            <th height="40">当前投入</th>
          </tr>
          <tr
            align="center"
            class="trace-order-tr-o"
            v-for="(item, idx) in list"
            :key="idx"
          >
            <td height="40">
              <div class="cp-checkbox-main" @click="choseRow(idx)">
                <div
                  class="cp-checkbox-image"
                  :class="{ 'cp-checkbox-image-active': item.checked }"
                ></div>
                <div style="margin-left: 10px"></div>
              </div>
            </td>
            <td height="40">
              <span v-if="idx === 0" style="color: red"
                >{{ item.name }}(当前期号)</span
              >
              <span v-else>{{ item.name }}</span>
            </td>
            <td height="40">{{ divide(tableTotal.totalMoney, false) }}元</td>
            <td height="40">
              <CpInput
                class="line-input-num"
                v-model="item.multiplier"
                :min="1"
                :max="9999"
              />
              <span>倍</span>
            </td>
            <td height="40">{{ tableTotal.totalMoney * item.multiplier }}元</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from '@/api/user';
//订单金额低于 2 元，不能发起合买
export default {
  name: 'GroupBuy',
  data() {
    return {
      show: false,
      minNum: 0,
      type: 0,
      form: {
        betCountMin: 0,
        betCountCurr: 0,
      },
      list: [],
      period: 1, //期数
      Interval: 1, //隔期
      multiplier: 1, //倍数
      line: 1, // 1递增 2固定
      stop: true, //中奖后停止追号
      lineList: [
        {
          name: '递增',
          id: 1,
        },
        {
          name: '固定',
          id: 2,
        },
      ],
    };
  },
  props: {
    id: {
      type: Number,
      default: null,
    },
    status: {
      type: Boolean,
      default: false,
    },
    tableTotal: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    //深度监听list
    list: {
      handler(v) {
        const money = v
          .filter((item) => item.checked)
          .reduce((acc, cur) => {
            return acc + this.tableTotal.totalMoney * cur.multiplier;
          }, 0);
        this.$emit('change', {
          totalMoney: money,
          total: v.filter((item) => item.checked).length,
        });
      },
      deep: true,
    },
    id(val) {
      if (val) {
        this.getList();
      }
    },
    show(val) {
      this.$emit('input', val);
    },
  },
  computed: {
    vuexBetPrice() {
      return this.$store.state.vuexBetPrice;
    },
    currP() {
      let p = (this.form.betCountCurr / this.tableTotal.totalMoney) * 100;
      return `${p.toFixed(2)}%`;
    },
    dataForm() {
      const obj = {
        stop: this.stop ? 1 : 0,
        content: '',
      };
      const list = this.list.filter((item) => item.checked);
      list.forEach((item) => {
        if (!obj.content) {
          obj.content = `${item.name},${item.multiplier}`;
        } else {
          obj.content += `|${item.name},${item.multiplier}`;
        }
      });
      return obj;
    },
  },
  methods: {
    changeline(v) {
      this.line = v.id;
      this.changeMultiplier();
    },
    changeMultiplier() {
      this.list = this.processMultiplier(
        this.list,
        this.line,
        this.Interval,
        this.multiplier
      );
    },
    processMultiplier(data, line, interval, multiplierIncrement) {
      return data.map((item, index) => {
        const groupIndex = Math.floor(index / interval); // 当前数据所在组
        if (line === 1) {
          // 类型1: 递增
          return {
            ...item,
            multiplier: 1 * Math.pow(multiplierIncrement, groupIndex),
          };
        } else if (line === 2) {
          // 类型2: 固定
          return {
            ...item,
            multiplier: multiplierIncrement,
          };
        } else {
          throw new Error(
            'Unsupported line type. Use 1 for increment or 2 for fixed.'
          );
        }
      });
    },
    choseRow(idx) {
      this.list[idx].checked = !this.list[idx].checked;
      this.period = this.list.filter((item) => item.checked).length;
    },
    changePeriod(n) {
      const count = this.list.filter((item) => item.checked).length;
      if (n === count) {
        return;
      }
      this.list.forEach((item, idx) => {
        if (idx < this.period) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      });
    },
    async getList() {
      const [err, res] = await userApi.lotteryExpects({
        id: this.id,
      });
      if (err) return;
      res.data = res.data.slice(0, 5);
      this.list = res.data.map((item, idx) => {
        return {
          name: item,
          checked: idx === 0 ? true : false,
          multiplier: 1,
        };
      });
    },
    vaild() {
      if (this.form.betCountCurr < this.minNum) {
        this.form.betCountCurr = this.minNum;
        this.$refs.buyDialog.open('认购金额至少为总金额的10%');
      }
    },
    toggle() {
      if (this.tableTotal.total < 1) {
        this.show = false;
        this.$refs.buyDialog.open('订单注数低于 1 注，不能发起追号');
        return;
      }
      if (!this.list.length) {
        this.getList();
      }
      this.show = !this.show;
    },
  },
};
</script>
<style lang="scss" scoped></style>
