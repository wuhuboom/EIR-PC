<template>
  <div v-if="show" style="z-index: 999">
    <div class="cp-popup-mask"></div>
    <div
      class="cp-popup-main"
      style="width: 700px; min-height: 200px; z-index: 9; height: 336px"
    >
      <div class="cp-popup-title">
        <div class="cp-popup-title-content">
          <div style="color: rgb(230, 162, 60)">微信收款</div>
          <i class="el-icon-close" style="cursor: pointer" @click="close"></i>
        </div>
      </div>
      <div class="cp-popup-body" style="width: 700px">
        <div class="cp-popup-body-content">
          <div style="display: flex; align-items: center; height: 100%">
            <el-form
              :model="form"
              ref="numberValidateForm"
              class="el-form el-form--label-right el-form--inline"
            >
              <el-form-item class="is-required">
                <label class="el-form-item__label" style="width: 200px">
                  <span class="recharge-dialog-span">收款码：</span>
                </label>
                <div class="el-form-item__content">
                  <div style="width: 400px" class="justify-between">
                    <van-uploader
                      v-model="fileList"
                      :max-count="1"
                      accept="image/*"
                    >
                      <img class="d-img" src="@/assets/img/upload.png" alt="" />
                    </van-uploader>
                  </div>
                </div>
              </el-form-item>
              <el-form-item
                prop="payPwd"
                :rules="[{ required: true, message: '提款密码不能为空' }]"
                class="is-required"
              >
                <label class="el-form-item__label" style="width: 200px">
                  <span class="recharge-dialog-span"> 提款密码：</span>
                </label>
                <div class="el-form-item__content">
                  <input
                    maxlength="30"
                    class="recharge-dialog-input"
                    style="width: 400px"
                    autocomplete="new-password"
                    type="password"
                    v-model.trim="form.payPwd"
                  /><!---->
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="cp-popup-buttons align-center">
        <div
          class="cp-button-main cp-popup-button m-b-0"
          style="margin-right: 50px"
          @click="submitForm('numberValidateForm')"
          v-loading="loading"
        >
          <!---->
          确认绑定
        </div>
        <div @click="close" class="cp-button-main cp-popup-button-cancel m-b-0">
          <!---->
          取消
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userApi from '@/api/user';
const initForm = () => ({
  ctype: 1,
  identity: '',
  cardNumber: '',
  bankName: '微信',
  payPwd: '',
});
export default {
  name: 'BindCard',
  data() {
    return {
      loading: false,
      show: false,
      form: initForm(),
      fileList: [],
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
      const trc20Pattern = /^T[a-zA-Z1-9]{10,}$/;
      if (!value) {
        callback(new Error('请输入 TRC20 地址'));
      } else if (!trc20Pattern.test(value)) {
        callback(new Error('请输入有效的 TRC20 地址'));
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
      if (!this.fileList.length) {
        return this.$toast.fail('请上传微信收款码');
      }
      const query = {
        ...this.form,
        cardNumberTwice: this.form.cardNumber,
      };
      if (this.fileList[0].file) {
        query.file = this.fileList[0].file;
      }
      this.loading = true;
      const [err] = await userApi.bindBankCard(query);
      this.loading = false;
      if (err) return;
      this.show = false;
      this.$store.dispatch('getBankCard');
      this.$message.success('操作成功');
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
    left: 200px;
  }
}
</style>
