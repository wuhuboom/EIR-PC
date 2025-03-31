<template>
  <div>
    <div class="cp-popup-body" style="width: 900px">
      <div class="cp-popup-body-content">
        <el-form
          :model="form"
          ref="numberValidateForm"
          class="el-form el-form--label-right el-form--inline"
        >
          <div class="bank-card-dialog-row">
            <div class="common_layout_center_h" style="margin-right: 120px">
              <div class="el-form-item is-required">
                <el-form-item
                  prop="cardNumber"
                  :rules="[{ required: true, message: '支付宝账号不能为空' }]"
                  class="is-required"
                >
                  <label
                    class="el-form-item__label no-start"
                    style="width: 100px"
                    ><span class="recharge-dialog-span">支付宝账号</span></label
                  >
                  <div class="el-form-item__content">
                    <input
                      disabled
                      maxlength="30"
                      class="recharge-dialog-input"
                      v-model.trim="form.cardNumber"
                      style="width: 280px"
                    /><!---->
                  </div>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="bank-card-dialog-row">
            <div class="common_layout_center_h" style="margin-right: 120px">
              <div class="el-form-item is-required">
                <el-form-item
                  prop="money"
                  :rules="[{ validator: validMoney, trigger: 'blur' }]"
                  class="is-required"
                >
                  <label class="el-form-item__label" style="width: 100px"
                    ><span class="recharge-dialog-span">提现金额</span></label
                  >
                  <div class="el-form-item__content">
                    <input
                      maxlength="30"
                      class="recharge-dialog-input"
                      v-model.trim="form.money"
                    /><!---->
                  </div>
                </el-form-item>
              </div>
            </div>
            <div class="common_layout_center_h">
              <el-form-item
                prop="payPwd"
                :rules="[{ required: true, message: '请输入支付密码' }]"
                class="is-required"
              >
                <label class="el-form-item__label" style="width: 100px"
                  ><span class="recharge-dialog-span">支付密码</span></label
                >
                <div class="el-form-item__content">
                  <input
                    maxlength="30"
                    type="password"
                    class="recharge-dialog-input"
                    v-model.trim="form.payPwd"
                  /><!---->
                </div>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <p>每日只可以提现三次,提现手续费为0.</p>
      </div>
    </div>
    <div class="center-center">
      <div
        class="cp-button-main cp-popup-button"
        @click="submitForm('numberValidateForm')"
        v-loading="loading"
        style="margin-right: 50px"
      >
        <!---->
        确定
      </div>
      <div class="cp-button-main cp-popup-button-cancel" @click="close">
        <!---->
        取消
      </div>
    </div>
  </div>
</template>

<script>
import userApi from '@/api/user';
const initForm = () => {
  return {
    ctype: 0,
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
      typelist: [
        { name: '银行卡提现', id: 2 },
        { name: 'usdt提现', id: 3 },
        { name: '支付宝', id: 0 },
        { name: '微信', id: 1 },
      ],
      curType: 2,
      //statusCheck 0待审核1通过2拒绝
    };
  },
  computed: {
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
      if (!this.usdtCard.id && id === 1) {
        this.$message.error('请先绑定USDT地址');
        return;
      }
      this.curType = id;
      //curType = item.id
      this.resData(id === 0 ? this.bankCard : this.usdtCard);
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
      this.$emit('close');
      this.$store.dispatch('getBankCard');
      this.$message.success('提现成功.等待管理员审核');
    },
    async open() {
      this.$toast.loading({
        duration: 0,
      });
      await this.$store.dispatch('getBankCard');
      this.$toast.clear();
      this.resData(this.bankCard);
      this.show = true;
    },
    resData(obj = this.alipayCard) {
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
      this.$emit('close');
    },
  },
};
</script>
<style scoped lang="scss"></style>
