<template>
  <div v-if="show" style="z-index: 999">
    <div class="cp-popup-mask"></div>
    <div class="cp-popup-main" style="width: 900px; height: 400px; z-index: 9">
      <div class="cp-popup-title">
        <div class="cp-popup-title-content">
          <div style="color: rgb(230, 162, 60)">绑定银行卡</div>
          <i class="el-icon-close" @click="close" style="cursor: pointer"></i>
        </div>
      </div>
      <div class="cp-popup-body" style="width: 900px">
        <div class="cp-popup-body-content">
          <el-form
            :model="form"
            ref="numberValidateForm"
            class="el-form el-form--label-right el-form--inline"
          >
            <div class="bank-card-dialog-row" style="margin-top: 30px">
              <div class="common_layout_center_h" style="margin-right: 120px">
                <el-form-item
                  prop="cardName"
                  :rules="[{ required: true, message: '持卡人不能为空' }]"
                  class="is-required"
                >
                  <label class="el-form-item__label" style="width: 100px">
                    <span class="recharge-dialog-span"> 持卡人</span>
                  </label>
                  <div class="el-form-item__content">
                    <input
                      maxlength="30"
                      class="recharge-dialog-input"
                      v-model.trim="form.cardName"
                    /><!---->
                  </div>
                </el-form-item>
              </div>
              <div class="common_layout_center_h">
                <el-form-item
                  prop="identity"
                  :rules="[
                    { required: true, message: '身份证不能为空' },
                    { validator: idCardValidator, trigger: 'blur' },
                  ]"
                  class="is-required"
                >
                  <label class="el-form-item__label" style="width: 100px"
                    ><span class="recharge-dialog-span">身份证</span></label
                  >
                  <div class="el-form-item__content">
                    <input
                      maxlength="30"
                      class="recharge-dialog-input"
                      v-model.trim="form.identity"
                    /><!---->
                  </div>
                </el-form-item>
              </div>
            </div>
            <div class="bank-card-dialog-row">
              <div class="common_layout_center_h" style="margin-right: 120px">
                <div class="el-form-item is-required">
                  <el-form-item
                    prop="cardNumber"
                    :rules="[
                      { required: true, message: '银行卡号不能为空' },
                      { validator: bankCardValidator, trigger: 'blur' },
                    ]"
                    class="is-required"
                  >
                    <label class="el-form-item__label" style="width: 100px"
                      ><span class="recharge-dialog-span">银行卡号</span></label
                    >
                    <div class="el-form-item__content">
                      <input
                        maxlength="30"
                        class="recharge-dialog-input"
                        v-model.trim="form.cardNumber"
                      /><!---->
                    </div>
                  </el-form-item>
                </div>
              </div>
              <div class="common_layout_center_h">
                <el-form-item
                  prop="bankName"
                  :rules="[{ required: true, message: '银行名称不能为空' }]"
                  class="is-required"
                >
                  <label class="el-form-item__label" style="width: 100px"
                    ><span class="recharge-dialog-span">银行名称</span></label
                  >
                  <div class="el-form-item__content">
                    <input
                      maxlength="30"
                      class="recharge-dialog-input"
                      v-model.trim="form.bankName"
                    /><!---->
                  </div>
                </el-form-item>
              </div>
            </div>
            <div class="bank-card-dialog-row">
              <div class="common_layout_center_h">
                <el-form-item
                  prop="subBranch"
                  :rules="[{ required: true, message: '开户支行不能为空' }]"
                  class="is-required"
                >
                  <label class="el-form-item__label" style="width: 100px"
                    ><span class="recharge-dialog-span">开户支行</span></label
                  >
                  <div class="el-form-item__content">
                    <input
                      style="width: 632px"
                      class="recharge-dialog-input"
                      v-model.trim="form.subBranch"
                    />
                  </div>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="cp-popup-buttons">
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
  </div>
</template>
<script>
import userApi from '@/api/user';
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
    };
  },
  methods: {
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
      this.loading = true;
      const [err] = await userApi.bindBankCard({
        ...this.form,
        cardNumberTwice: this.form.cardNumber,
      });
      this.loading = false;
      if (err) return;
      this.show = false;
      this.$store.dispatch('getBankCard');
    },
    open() {
      this.form = initForm();
      this.show = true;
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
::v-deep {
  .el-form-item__error {
    left: 100px;
  }
}
</style>
