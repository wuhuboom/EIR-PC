<template>
  <div>
    <div v-if="show" style="z-index: 999">
      <div class="cp-popup-mask"></div>
      <div
        class="cp-popup-main"
        style="width: 900px; height: 520px; z-index: 9"
      >
        <div class="cp-popup-title">
          <div class="cp-popup-title-content">
            <div style="color: rgb(230, 162, 60)">提现申请</div>
            <i class="el-icon-close" @click="close" style="cursor: pointer"></i>
          </div>
        </div>
        <div class="bank-card-dialog-row m-b-16" style="margin-top: 30px">
          <div class="align-center">
            <label class="el-form-item__label no-start" style="width: 100px">
              <span class="recharge-dialog-span"> 提现方式</span>
            </label>
            <div class="align-center">
              <div
                class="cp-button-main m-t-0 m-b-0 m-r-16"
                v-for="(item, index) in typelist"
                :class="
                  curType === item.id
                    ? 'cp-popup-button'
                    : 'cp-popup-button-cancel'
                "
                :key="index"
                @click="changType(item.id)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <component
          ref="$cont"
          :is="currentComponent"
          @close="close"
        ></component>
      </div>
    </div>
    <addUsdt ref="addUsdt" />
    <addAlipay ref="addAlipay" />
    <addWechat ref="addWechat" />
  </div>
</template>
<script>
import userApi from '@/api/user';
import addAlipay from '@/views/components/addAlipay.vue';
import addWechat from '@/views/components/addWechat.vue';
import bindAlipay from '@/views/components/bindAlipay.vue';
import bindBank from '@/views/components/bindBank.vue';
import bindUsdt from '@/views/components/bindUsdt.vue';
import bindWechat from '@/views/components/bindWechat.vue';
import addUsdt from '@/views/game/components/bindUsdt.vue';
// usdtId: this.typeValue,
// type: this.chooseRecType.type,
// money: +this.amount,
// payPwd: this.form.password,
// code: this.form.vercode,
const initForm = () => {
  return {
    ctype: 2,
    cardName: '',
    identity: '',
    cardNumber: '',
    bankName: '',
    subBranch: '',
  };
};
export default {
  name: 'BindCard',
  data() {
    return {
      loading: false,
      show: false,
      form: initForm(),
      cart: {},
      typeArr: [
        { name: '银行卡提现', id: 2 },
        { name: 'usdt提现', id: 3 },
        { name: '支付宝', id: 0 },
        { name: '微信', id: 1 },
      ],
      curType: 2,
      //statusCheck 0待审核1通过2拒绝
    };
  },
  components: {
    bindBank,
    bindUsdt,
    addUsdt,
    addAlipay,
    bindAlipay,
    bindWechat,
    addWechat,
  },
  computed: {
    typelist() {
      return this.typeArr.filter((v) => this.ctypes.includes(v.id));
    },
    ctypes() {
      return this.$store.state.bankCard.map((v) => v.ctype);
    },
    currentComponent() {
      //return this.curType === 2 ? "bindBank" : "bindUsdt";
      switch (this.curType) {
        case 0:
          return 'bindAlipay';
        case 1:
          return 'bindWechat';
        case 2:
          return 'bindBank';
        case 3:
          return 'bindUsdt';
        default:
          return 'bindBank';
      }
    },
    statusCheck() {
      return [
        { name: `您的${this.bankTxt}还在审核中,清审核通过再提现`, id: 0 },
        { name: `审核通过`, id: 1 },
        { name: `您的${this.bankTxt}审核不通过,无法提现`, id: 2 },
      ];
    },
    bankTxt() {
      //0支付宝 1微信 2银行卡 3USDT
      const arr = ['支付宝', '微信', '银行卡', 'USDT地址'];
      //return this.ctype === 2 ? "银行卡" : "USDT地址";
      return arr[this.form.ctype];
    },
    Cards() {
      return this.$store.state.bankCard;
    },
    bankCard() {
      const doc = this.Cards.find((v) => +v.ctype === 2) || {};
      return doc;
    },
    usdtCard() {
      return this.Cards.find((v) => +v.ctype === 3) || {};
    },
    //支付宝
    alipayCard() {
      return this.Cards.find((v) => +v.ctype === 0) || {};
    },
    //微信
    wechatCard() {
      return this.Cards.find((v) => +v.ctype === 1) || {};
    },
  },
  methods: {
    changType(id) {
      if (!this.usdtCard.id && id === 3) {
        this.close();
        this.$refs.addUsdt.open();
        this.$message.error('请先绑定USDT地址');
        return;
      }
      if (!this.alipayCard.id && id === 0) {
        this.$refs.addAlipay.open();
        this.close();
        this.$message.error('请先绑定支付宝');
        return;
      }
      if (!this.wechatCard.id && id === 1) {
        this.$refs.addWechat.open();
        this.close();
        this.$message.error('请先绑定微信');
        return;
      }
      this.curType = id;
      //curType = item.id
      this.$nextTick(() => {
        this.$refs.$cont.resData();
      });
    },
    validMoney(rule, value, callback) {
      //金额为正整数
      const moneyPattern = /^[1-9]\d*$/;
      if (!value) {
        callback(new Error('请输入提现金额'));
      } else if (!moneyPattern.test(value)) {
        callback(new Error('请输入有效的提现金额'));
      } else {
        callback();
      }
    },
    idCardValidator(rule, value, callback) {
      const idCardPattern =
        /^(^[1-9]\d{5}(18|19|20|21|22|23|24|25|26|27|28|29)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}(\d|X|x)$)$/;
      if (!value) {
        callback(new Error('请输入身份证号'));
      } else if (!idCardPattern.test(value)) {
        callback(new Error('请输入有效的身份证号'));
      } else {
        callback();
      }
    },
    bankCardValidator(rule, value, callback) {
      const bankCardPattern = /^\d{16,19}$/;
      if (!value) {
        callback(new Error('请输入银行卡号'));
      } else if (!bankCardPattern.test(value)) {
        callback(new Error('请输入有效的银行卡号'));
      } else {
        callback();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        this.ajaxBindCard();
      });
    },
    async ajaxBindCard() {
      if (+this.form.statusCheck !== 1) {
        const msg =
          this.statusCheck.find((v) => +v.id === +this.form.statusCheck) || {};
        this.$message.error(msg.name);
        return;
      }
      this.loading = true;
      const [err] = await userApi.withdrawalReq({
        ...this.form,
      });
      this.loading = false;
      if (err) return;
      this.show = false;
      this.$store.dispatch('getBankCard');
      this.$message.success('提现成功.等待管理员审核');
    },
    async open() {
      this.$toast.loading({
        duration: 0,
      });
      await this.$store.dispatch('getBankCard');
      this.$toast.clear();
      this.show = true;
      this.curType = 2;
      this.$nextTick(() => {
        this.$refs.$cont.resData();
      });
    },
    resData(obj) {
      this.form = {
        ...initForm(),
        ...obj,
        usdtId: obj.id,
        type: obj.ctype,
        money: '',
        payPwd: '',
      };
    },
    close() {
      this.show = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.recharge-dialog-input {
  text-align: left;
  padding-left: 4px;
}
.el-form-item__label::before {
  content: '*';
  color: rgb(245, 108, 108);
  margin-right: 4px;
  margin-left: 4px;
}
.no-start {
  &:before {
    display: none;
  }
}
::v-deep {
  .el-form-item__error {
    left: 100px;
  }
}
</style>
