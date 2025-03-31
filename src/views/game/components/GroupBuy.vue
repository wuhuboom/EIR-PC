<template>
  <div>
    <tipsDialog ref="buyDialog" />
    <div v-if="show" class="co-purse-main m-t-16">
      <div>
        <span>我要认购：</span>
        <CpInput
          v-model="form.betCountCurr"
          :min="minNum"
          :max="typeTotalMoney"
        />
        <span
          >元，所占比例 {{ currP }}
          {{ `(认购金额至少为总金额的${this.lotteryConf.toMin}%)` }}</span
        >
      </div>
      <div class="co-purse-bo">
        <div style="height: 26px">是否保底：</div>
        <div class="co-purse-select">
          <div class="align-center">
            <CpSelect v-model="type" />
            <div class="m-l-12" v-if="type === 1">
              <CpInput
                :min="minType"
                v-model="typeMoney"
                :max="typeTotalMoney"
              />
              <span>所占比例 {{ typeP }} (至少为总金额的5%)</span>
            </div>
          </div>
          <div
            v-if="type !== 2"
            class="cp-checkbox-main"
            style="margin-top: 10px"
          >
            <div
              class="cp-checkbox-image"
              @click="isFull = !isFull"
              :class="{ 'cp-checkbox-image-active': isFull }"
            ></div>
            <div style="margin-left: 10px">
              系统最多参与订单总金额的90%,最大满单
              {{ sysBuy }}元
            </div>
          </div>
        </div>
      </div>
      <div class="co-purse-radios" style="margin-top: 10px">
        <span>是否公开：</span>
        <div
          class="cp-radio-main"
          v-for="(item, idx) in visibilityList"
          :key="idx"
          @click="visibility = item.id"
        >
          <div class="cp-radio-outer">
            <div
              class="cp-radio-inner"
              :class="{ 'cp-radio-inner-active': item.id === visibility }"
            ></div>
          </div>
          <div class="cp-radio-text" style="color: rgb(239, 204, 82)">
            {{ item.name }}
          </div>
        </div>
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
      isFull: true,
      money: 0,
      show: false,
      minType: 0,
      typeMoney: 0,
      minNum: 0,
      visibility: 0,
      type: 0,
      form: {
        betCountCurr: 1, //认购份数
        betCountMin: 0, //保底份数
      },
      visibilityList: [
        {
          name: '公开',
          id: 0,
        },
        {
          name: '仅对跟单者公开',
          id: 1,
        },
        {
          name: '截止后公开',
          id: 2,
        },
        {
          name: '永久保密',
          id: 3,
        },
      ],
      lotteryConf: {},
    };
  },
  props: {
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
    typeTotalMoney: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    show(val) {
      this.$emit('input', val);
    },
    typeTotalMoney(val) {
      //认购金额至少为总金额的10%
      this.minNum = Math.ceil(val * this.toMin);
      this.form.betCountCurr = this.minNum;
    },
  },
  computed: {
    toMin() {
      return this.lotteryConf.toMin / 100;
    },
    sysBuy() {
      let orther = 0;
      if (this.type) {
        orther = this.typeMoney;
      }
      return Math.max(0, this.typeTotalMoney - this.form.betCountCurr - orther);
    },
    dataForm() {
      const { betCountCurr } = this.form;
      const obj = {
        betCountCurr,
        ftype: this.isFull ? 1 : 0,
        betCountMin: 0,
        btype: 2, // Default to no保底
        visibility: this.visibility,
      };

      if (this.type === 1) {
        // 部分保底
        obj.betCountMin = this.typeMoney;
        obj.btype = 1;
      } else if (this.type === 2) {
        // 全额保底
        obj.betCountMin = this.typeTotalMoney;
        obj.btype = 0;
        obj.ftype = 0;
      }

      return obj;
    },
    currP() {
      let p = (this.form.betCountCurr / this.typeTotalMoney) * 100;
      return `${p.toFixed(2)}%`;
    },
    typeP() {
      let p = (this.typeMoney / this.typeTotalMoney) * 100;
      return `${p.toFixed(2)}%`;
    },
  },
  methods: {
    vaild() {
      if (this.form.betCountCurr < this.minNum) {
        this.form.betCountCurr = this.minNum;
        this.$refs.buyDialog.open(
          `认购金额至少为总金额的${this.lotteryConf.toMin}%`
        );
      }
    },
    async getlotteryConf() {
      this.$toast.loading({
        forbidClick: false, // 允许点击和滚动
        duration: 0, // 持续时间为 0 表示不会自动关闭
      });
      const [err, res] = await userApi.lotteryConf();
      this.$toast.clear();
      if (err) return;
      this.lotteryConf = res.data;
    },
    async toggle() {
      const num = +this.typeTotalMoney || 0;
      if (num < 2) {
        this.show = false;
        this.$refs.buyDialog.open('订单金额低于 2 元，不能发起合买');
        return;
      }
      if (!Object.keys(this.lotteryConf).length) {
        await this.getlotteryConf();
      }
      this.show = !this.show;
      if (this.show) {
        this.minNum = Math.ceil(num * this.toMin);
        this.minType = Math.ceil(num * 0.05);
        this.form.betCountCurr = +this.minNum;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.co-purse-input {
  color: #333;
}
</style>
