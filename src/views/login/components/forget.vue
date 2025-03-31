<template>
  <el-dialog
    title="修改密码"
    class="reg-dialog-form"
    :visible.sync="showReg"
    width="400px"
    :close-on-click-modal="false"
  >
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="用户名"
        prop="username"
        :rules="[
          { required: true, message: '请输入用户名' },
          {
            pattern: $util.regUserName,
            message: $t('reg.username.rule'),
          },
        ]"
      >
        <el-input
          autocomplete="new-password"
          maxlength="20"
          v-model.trim="ruleForm.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="newPwd"
        :rules="[
          { required: true, message: '请输入密码' },
          { validator: validatePass, trigger: 'blur' },
        ]"
      >
        <el-input
          type="password"
          v-model.trim="ruleForm.newPwd"
          maxlength="20"
          autocomplete="new-password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="验证码"
        prop="code"
        :rules="[{ required: true, message: '验证码' }]"
      >
        <div class="align-center">
          <el-input
            class="flex-1"
            type="password"
            v-model.trim="ruleForm.code"
            maxlength="20"
            autocomplete="new-password"
            placeholder="请输入验证码"
          ></el-input>
          <VerificationCode
            :getCode="getCode"
            :validFn="validFn"
            class="m-l-8"
          />
        </div>
      </el-form-item>
      <p
        style="color: red; text-align: right"
        class="pointer"
        @click="$store.dispatch('getServeData', 1)"
      >
        联系客服
      </p>
      <el-form-item>
        <el-button
          type="danger"
          v-loading="loading"
          @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import VerificationCode from '@/components/VerificationCode';
import userApi from '@/api/user';
export default {
  name: 'RegisterDialog',
  components: { VerificationCode },
  data() {
    return {
      loading: false,
      ruleForm: {
        username: '',
        newPwd: '',
        code: '',
      },
      showReg: false,
    };
  },
  methods: {
    validatePass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!this.$util.regPassword.test(value)) {
        callback(new Error('密码必须包含字母和数字，长度在6-16之间'));
      } else {
        callback();
      }
    },
    async getCode() {
      await userApi.notLoginchangePwd({
        username: this.ruleForm.username,
      });
    },
    async validFn() {
      return new Promise((resolve) => {
        this.$refs.ruleForm.validateField('username', (errorMessage) => {
          if (errorMessage) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        this.confirm();
      });
    },
    async confirm() {
      if (this.loading) return;
      this.loading = true;
      const [err] = await userApi.phoneChangePwdReq(this.ruleForm);
      this.loading = false;
      if (err) return;
      this.$message.success('修改成功, 请登录');
      this.showReg = false;
    },
    openReg() {
      this.showReg = true;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.showReg = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.reg-dialog-form {
  ::v-deep() {
    .el-form-item__error {
      color: #f56c6c;
    }
  }
}
</style>
