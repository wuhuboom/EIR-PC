<template>
  <el-dialog
    title="注册账号"
    class="reg-dialog-form"
    :visible.sync="showReg"
    width="500px"
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
          { validator: $util.regUserNameFn, trigger: 'blur' },
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
        prop="password"
        :rules="[
          { required: true, message: '请输入密码' },
          { validator: validatePass, trigger: 'blur' },
        ]"
      >
        <el-input
          type="password"
          v-model.trim="ruleForm.password"
          maxlength="20"
          autocomplete="new-password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="twoPassword"
        :rules="[
          { required: true, message: '请再次输入密码' },
          { validator: validatePass2, trigger: 'blur' },
        ]"
      >
        <el-input
          maxlength="20"
          type="password"
          v-model.trim="ruleForm.twoPassword"
          autocomplete="new-password"
          placeholder="请再次输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="邀请码"
        prop="invitationCode"
        :rules="[{ required: true, message: '请输入邀请码' }]"
      >
        <el-input
          v-model.trim.number="ruleForm.invitationCode"
          maxlength="20"
          autocomplete="new-password"
          placeholder="请输入邀请码"
          @input="handleInput('invitationCode')"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="QQ"
        prop="qq"
        :rules="[
          { required: true, message: '请输入QQ号' },
          {
            pattern: /^\d{4,14}$/,
            message: '请输入正确的QQ号',
          },
        ]"
      >
        <el-input
          v-model.trim.number="ruleForm.qq"
          maxlength="20"
          autocomplete="new-password"
          placeholder="请输入QQ号"
          @input="handleInput('qq')"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="手机号"
        prop="phone"
        :rules="[
          { required: true, message: '请输入手机号' },
          {
            pattern: /^\d{11}$/,
            message: '请输入正确的手机号',
          },
        ]"
      >
        <el-input
          v-model.trim.number="ruleForm.phone"
          maxlength="20"
          autocomplete="new-password"
          placeholder="请输入手机号"
          @input="handleInput('phone')"
        ></el-input>
      </el-form-item>
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
import userApi from '@/api/user';
export default {
  name: 'RegisterDialog',
  data() {
    return {
      loading: false,
      ruleForm: {
        username: '',
        password: '',
        twoPassword: '',
        invitationCode: this.$route.query.code || '',
        qq: '',
        phone: '',
        from: 1,
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
        if (this.ruleForm.twoPassword !== '') {
          this.$refs.ruleForm.validateField('twoPassword');
        }
        callback();
      }
    },
    validatePass2(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    },
    handleInput(key) {
      this.ruleForm[key] = `${this.ruleForm[key]}`.replace(/\D/g, '');
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        this.confirm();
      });
    },
    async confirm() {
      //用户名和密码不能一样
      if (this.ruleForm.username === this.ruleForm.password) {
        this.$message.error('用户名和密码不能一样');
        return;
      }
      if (this.loading) return;
      this.loading = true;
      const [err] = await userApi.register(this.ruleForm);
      this.loading = false;
      if (err) return;
      this.$message.success('注册成功, 请登录');
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
