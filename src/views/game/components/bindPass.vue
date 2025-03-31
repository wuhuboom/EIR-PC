<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="form"
      class="el-form el-form--label-right el-form--inline"
    >
      <div class="common_layout_center_h">
        <el-form-item
          prop="origin"
          class="align-center"
          :rules="[
            { required: true, message: '请输入原登录密码' },
            { validator: validatePass, trigger: 'blur' },
          ]"
        >
          <label for="OldPwd" class="el-form-item__label" style="width: 110px"
            ><span class="recharge-dialog-span">原登录密码</span></label
          >
          <div class="el-form-item__content align-center">
            <div
              class="pwd-input-main recharge-dialog-input"
              type="password"
              maxlength="30"
              style="padding-right: 5px"
            >
              <input
                :type="originEye ? 'text' : 'password'"
                maxlength="30"
                class="pwd-input-input"
                v-model.trim="form.origin"
                style="background: transparent"
              />
              <img
                @click="originEye = !originEye"
                :src="originEye ? openedEye : closedEye"
                class="icon-eye"
              />
            </div>
          </div>
        </el-form-item>
      </div>
      <div class="common_layout_center_h">
        <el-form-item
          prop="newpwd"
          class="align-center"
          :rules="[{ required: true, message: '请输新登录密码' }]"
        >
          <label for="OldPwd" class="el-form-item__label" style="width: 110px"
            ><span class="recharge-dialog-span">新登录密码</span></label
          >
          <div class="el-form-item__content align-center">
            <div
              class="pwd-input-main recharge-dialog-input"
              type="password"
              maxlength="30"
              style="padding-right: 5px"
            >
              <input
                :type="newEye ? 'text' : 'password'"
                maxlength="30"
                class="pwd-input-input"
                v-model.trim="form.newpwd"
                style="background: transparent"
              />
              <img
                @click="newEye = !newEye"
                :src="newEye ? openedEye : closedEye"
                class="icon-eye"
              />
            </div>
          </div>
        </el-form-item>
      </div>
      <div class="common_layout_center_h">
        <el-form-item
          prop="confirmed"
          class="align-center"
          :rules="[
            { required: true, message: '请输入确认密码' },
            { validator: validatePass, trigger: 'blur' },
          ]"
        >
          <label for="OldPwd" class="el-form-item__label" style="width: 110px"
            ><span class="recharge-dialog-span">确认密码</span></label
          >
          <div class="el-form-item__content align-center">
            <div
              class="pwd-input-main recharge-dialog-input"
              type="password"
              maxlength="30"
              style="padding-right: 5px"
            >
              <input
                :type="confirmedEye ? 'text' : 'password'"
                maxlength="30"
                class="pwd-input-input"
                v-model.trim="form.confirmed"
                style="background: transparent"
              />
              <img
                @click="confirmedEye = !confirmedEye"
                :src="confirmedEye ? openedEye : closedEye"
                class="icon-eye"
              />
            </div>
          </div>
        </el-form-item>
      </div>
    </el-form>
    <div class="cp-popup-buttons" style="width: 365px">
      <div
        v-loading="loading"
        class="cp-button-main cp-popup-button"
        @click="submitForm('ruleForm')"
        style="margin-right: 50px"
      >
        <!---->
        确定
      </div>
      <div @click="close" class="cp-button-main cp-popup-button-cancel">
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
    origin: '',
    newpwd: '',
    confirmed: '',
  };
};
export default {
  name: 'BindCard',
  data() {
    return {
      closedEye: '/static/base/eye_closed2.png',
      openedEye: '/static/base/eye_open2.png',
      loading: false,
      show: false,
      originEye: false,
      newEye: false,
      confirmedEye: false,
      form: initForm(),
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
    validatePass2(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
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
      const [err] = await userApi.editPwd(this.form);
      this.loading = false;
      if (err) return;
      this.$emit('close');
      this.$message.success('修改成功, 请登录');
      this.showReg = false;
      this.$store.commit('loginOut');
      this.$router.push({ name: 'SignIn' });
    },
    open() {
      this.show = true;
      this.form = initForm();
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
.icon-eye {
  position: absolute;
  top: 4px;
  right: 4px;
}
::v-deep {
  .el-form-item__error {
    left: 110px;
    white-space: nowrap;
  }
  .el-form-item__content {
    align-items: center;
    display: flex;
  }
}
</style>
