<template>
  <el-dialog
    class="RechargeDialog font12"
    title="充值"
    :visible.sync="show"
    append-to-body
    width="565px"
  >
    <div class="contDialog">
      <ul class="flex-wrap cat-list font14">
        <li
          class="align-center m-r-16 m-b-16"
          :class="{ active: item.name === catName }"
          v-for="(item, index) in rechargeList"
          :key="index"
          @click="chose(item.list[0])"
        >
          <img :src="findIcon(+item.ctype) || dMoney" class="d-img" />
          {{ item.name }}
        </li>
      </ul>
      <div>
        <div class="align-center">
          <div class="nav-left m-t-12">
            <p class="nav-left-tip center-center">通道列表</p>
            <ul>
              <li
                class="p-x-8 center-center"
                v-for="item in payList"
                :key="item.id"
                :class="{ active: +item.id === +chooseRecType.id }"
                @click="chose(item)"
              >
                {{ showTxt(item) }}
              </li>
            </ul>
          </div>
          <div class="flex-1 rit center-center">
            <ul>
              <li v-if="minMax">
                金额区间:
                <span
                  >{{ minMax[0] }}{{ chooseRecType.currencySymbol }}-{{
                    minMax[1]
                  }}{{ chooseRecType.currencySymbol }}</span
                >
              </li>
              <li class="center-center m-t-20 m-b-16 m-r-16">
                充值金额:
                <el-input
                  class="enter-money m-l-12"
                  v-model.trim="amount"
                  @blur="changeMoney"
                ></el-input>
              </li>
              <li>
                <p class="next center-center" @click="onSubmit">下一步</p>
              </li>
            </ul>
          </div>
        </div>
        <ul class="m-t-16">
          <li
            class="m-b-8"
            v-for="(item, index) in rechargeInstructions"
            :key="index"
            :class="{ yellow: [1, 2, 3, 4].includes(index) }"
          >
            {{ index + 1 }}.{{ item }}
          </li>
        </ul>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import userApi from '@/api/user';
import dMoney from '@/assets/img/d-money.png';
export default {
  name: 'AppRecharge',
  data() {
    return {
      show: false,
      dMoney,
      amount: '',
      catName: '',
      rechargeList: [],
      chooseRecType: {},
      rechargeInstructions: [
        '请使用手机银行APP进行充值。',
        '每次充值都需要进入充值通道获取相应的银行卡号和充值金额，切勿直接转账。',
        '会员充值必须按照当笔充值所获取银行卡转账，切勿转账至保存转账记录的银行卡。',
        '银行卡转账户名需要与提款银行卡绑定户名一致，切勿找他人代充。',
        '转账金额必须与充值所获取的金额一致，切勿转入错误金额。',
        '转账成功30分钟如还未到账，请联系客服提供相关证明，如48小时内未反应，客服将不再受理。如未按照以上规定导致充值未到账的会员，后果将由本人承担。',
      ],
      icons: [
        {
          ctype: 0,
          icon: require('@/assets/img/bank/ctype0.png'),
          name: '支付宝',
        },
        {
          ctype: 1,
          icon: require('@/assets/img/bank/ctype1.png'),
          name: '微信',
        },
        {
          ctype: 2,
          icon: require('@/assets/img/bank/ctype2.png'),
          name: '银行卡',
        },
        {
          ctype: 3,
          icon: require('@/assets/img/bank/ctype3.png'),
          name: 'USDT',
        },
        {
          ctype: 4,
          icon: require('@/assets/img/bank/ctype4.png'),
          name: '数字货币',
        },
        {
          ctype: 5,
          icon: require('@/assets/img/bank/ctype5.png'),
          name: '快捷支付',
        },
        {
          ctype: 6,
          icon: require('@/assets/img/bank/ctype6.png'),
          name: '数字人民币',
        },
        {
          ctype: 7,
          icon: require('@/assets/img/bank/ctype7.png'),
          name: 'QQ钱包',
        },
        {
          ctype: 8,
          icon: require('@/assets/img/bank/ctype8.png'),
          name: '云闪付',
        },
        {
          ctype: 9,
          icon: require('@/assets/img/bank/ctype9.png'),
          name: '银联钱包',
        },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    quickAmountList() {
      if (this.chooseRecType.fast) {
        return this.chooseRecType.fast.split('-');
      }
      return [];
    },
    minMax() {
      if (!this.chooseRecType.minMax) return '';
      return this.chooseRecType.minMax.split('-').map((v) => +v);
    },
    payList() {
      return (
        this.rechargeList.find((item) => item.name === this.catName)?.list || []
      );
    },
  },
  methods: {
    changeMoney() {
      this.amount = this.amount.replace(/[^\d]/g, '');
      if (this.amount) {
        this.amount = parseInt(this.amount);
        return;
      }
      this.amount = '';
    },
    findIcon(ctype) {
      return this.icons.find((v) => v.ctype === ctype)?.icon;
    },
    showTxt(item) {
      if (item.minMax) {
        const arr = item.minMax.split('-');
        return `${item.name}(${arr[0]}${item.currencySymbol}-${arr[1]}${item.currencySymbol})`;
      }
      return item.name;
    },
    chose(item) {
      this.amount = '';
      if (!item) return;
      this.catName = item.catName;
      for (let k in item) {
        this.$set(this.chooseRecType, k, item[k]);
      }
      if (this.quickAmountList.length) {
        this.amount = this.quickAmountList[0];
      } else if (this.minMax.length) {
        this.amount = this.minMax[0];
      }
    },
    async recharge() {
      const [err, res] = await userApi.recharge();
      if (err) return;
      this.rechargeList = res.data?.filter((item) => item?.list?.length);
      this.rechargeList.forEach((item) => {
        item.list.forEach((v) => {
          v.catName = item.name;
        });
      });
      if (!this.rechargeList.length) return;
      this.chose(this.rechargeList[0].list[0]);
    },
    comfire(v = '请联系客服') {
      return new Promise((resolve) => {
        this.$confirm(v, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'g-confirm-box',
        })
          .then(() => {
            resolve(1);
          })
          .catch(() => {
            resolve(0);
          });
      });
    },
    async onSubmit() {
      if (!this.amount) {
        this.$message.error('请输入金额');
        return;
      }
      if (this.minMax.length) {
        if (this.amount < this.minMax[0] || this.amount > this.minMax[1]) {
          this.$message.error(`金额在${this.minMax[0]}-${this.minMax[1]}之间`);
          return;
        }
      }
      this.$toast.loading({ duration: 0 });
      const [err, res] = await userApi.rechargeOrder({
        payId: this.chooseRecType.id,
        money: this.amount * 1,
      });
      if (err) {
        this.$toast.clear();
        if (
          Array.isArray(err?.data) &&
          err.data[0].msgKey === 'rechargeUrlError'
        ) {
          this.$toast.clear();
          const status = await this.comfire();
          if (!status) return;
          this.$store.dispatch('getServeData', 1);
        }
        return;
      }
      this.$toast.clear();
      if (res.data.UrlAddress) {
        window.location.href = res.data.UrlAddress;
      }
    },
    async open() {
      await this.recharge();
      this.show = true;
    },
  },
  created() {
    // this.$store.dispatch("getInfo");
  },
};
</script>

<style scoped lang="scss">
.align-start {
  display: flex;
  align-items: flex-start;
}
.yellow {
  color: #feedaf;
}
.nav-left {
  border-right: 1px solid #b78756;
  li {
    cursor: pointer;
  }
  .active {
    color: #feedaf;
  }
}
.nav-left-tip {
  height: 40px;
  border-bottom: 1px solid #b78756;

  min-width: 112px;
}
.rit {
  //文字不换行
  white-space: nowrap;
  color: #feedaf;
}
.next {
  cursor: pointer;
  width: 192px;
  height: 28px;
  color: #feedaf;
  background: linear-gradient(274deg, #c67d30 0%, #daa42a 53%, #c77c32 100%);
  border-radius: 0px 0px 0px 0px;
}
.enter-money {
  width: 102px;
  ::v-deep {
    .el-input__inner {
      width: 102px;
      height: 23px;
      background: #ffffff;
      border-radius: 12px 12px 12px 12px;
      padding: 0 8px;
      color: #333;
      &:hover {
        border: none;
      }
    }
  }
}
.contDialog {
  color: #ffffff;
  .nav {
    color: #feedaf;
    border: 1px solid #bf855d;
    background-color: #32160b;

    li {
      height: 36px;
      &.active {
        background-color: #8c2e2f;
      }
    }
    & > li:nth-child(2) {
      border-left: 1px solid #bf855d;
    }
  }
}
.RechargeDialog {
  .gold {
    color: #feedaf;
  }
  ::v-deep {
    .el-icon-close {
      color: #feedaf;
    }
    .el-dialog__title {
      color: #feedaf;
    }
    [role='dialog'] {
      background-color: #774230;
      color: #ffffff;
    }
  }
}
.cat-list {
  & > li {
    width: 119px;
    height: 37px;
    background: #32160b;
    border-radius: 0px 0px 0px 0px;
    border: 1px solid #bf855d;
    //每行的第四个不需要右间距
    img {
      width: 23px;
      height: 23px;
      margin: 0 12px;
    }
    &:nth-child(4n) {
      margin-right: 0 !important;
    }
    &.active {
      background: #8c2e2f;
    }
  }
}
</style>
