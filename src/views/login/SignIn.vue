<template>
  <div>
    <div v-if="!token" class="center-center login_page">
      <div class="login_content">
        <div class="login_content-left">
          <el-form
            :model="form"
            ref="numberValidateForm"
            class="demo-ruleForm"
            @keyup.enter.native="submitForm('numberValidateForm')"
          >
            <div class="login-content login_center">
              <div class="login-title-container">
                <div class="login-title-cn">用户登录</div>
                <div class="login-title-en">MEMBER LOGIN</div>
              </div>
              <el-form-item
                prop="username"
                :rules="[{ required: true, message: '请输入用户名' }]"
              >
                <template>
                  <div class="login-item">
                    <div class="el-image login-icon">
                      <img
                        src="@/static/icon_user.png"
                        class="el-image__inner"
                      />
                    </div>
                    <input
                      v-model.trim="form.username"
                      placeholder="请输入用户名"
                      class="login_input"
                      autocomplete="new-password"
                    />
                  </div>
                </template>
              </el-form-item>
              <el-form-item
                prop="password"
                :rules="[{ required: true, message: '请输入密码' }]"
              >
                <template>
                  <div class="login-item">
                    <div class="el-image login-icon">
                      <img
                        src="@/static/icon_user.png"
                        class="el-image__inner"
                      />
                    </div>
                    <input
                      v-model.trim="form.password"
                      placeholder="请输入密码"
                      autocomplete="new-password"
                      type="password"
                      class="login_input"
                    />
                  </div>
                </template>
              </el-form-item>
              <el-form-item
                prop="code"
                :rules="[{ required: true, message: '请输入验证码' }]"
              >
                <template>
                  <div class="login-item">
                    <div style="display: flex; align-items: center">
                      <div class="el-image login-icon">
                        <img
                          src="@/static/icon_code.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                    </div>
                    <div style="flex: 1 1 0%">
                      <input
                        v-model.trim="form.code"
                        placeholder="请输入验证码"
                        type="text"
                        class="login_input"
                        autocomplete="new-password"
                      />
                    </div>
                    <div
                      class="login-code"
                      @click="verifyCodeReq"
                      :style="{
                        backgroundImage: `url(${codeData.img})`,
                      }"
                    ></div>
                  </div>
                </template>
              </el-form-item>
              <ul class="justify-between login-other">
                <li @click="openReg">立即注册</li>
                <li class="m-l-32" @click="forgetFn">忘记密码?</li>
              </ul>
              <el-form-item>
                <div
                  @click="submitForm('numberValidateForm')"
                  @keyup.enter="submitForm('numberValidateForm')"
                  class="cp-button-main login-button"
                  v-loading="loading"
                  tabindex="0"
                >
                  登录
                </div>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="login-divider-v"></div>
        <div class="login-content-right">
          <div>
            <div>
              <img class="logo" src="@/static/logo.png" alt="" />
            </div>
          </div>
          <div style="width: 260px">
            <div class="login-download">
              <div @click="goApp(0)" class="login-download-qr pointer">
                <div class="app-bar-div">
                  <div id="id_android">
                    <QrcodeVue :value="dev[0]?.appUrl || ''" :size="110" />
                  </div>
                </div>
                <div class="login-app-android">
                  <div class="login-app-occupy"></div>
                  <div>安卓版</div>
                  <div class="el-image login-app-download">
                    <img
                      src="@/static/icon_download.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                </div>
              </div>
              <div
                @click="goApp(1)"
                class="login-download-qr pointer"
                style="margin-left: 50px"
              >
                <div class="app-bar-div">
                  <div id="id_ios">
                    <QrcodeVue :value="dev[1]?.appUrl || ''" :size="110" />
                  </div>
                </div>
                <div class="login-app-android">
                  <div class="login-app-occupy"></div>
                  <div>苹果版</div>
                  <div class="el-image login-app-download">
                    <img
                      src="@/static/icon_download.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                </div>
              </div>
            </div>
            <div class="info">
              温馨提示：使用手机浏览器扫描上方二维码（不要使用QQ或微信）
            </div>
          </div>
        </div>
      </div>
    </div>
    <agreenContent @agree="agree" v-if="token" />
    <register ref="$register" />
    <forget ref="$forget" />
  </div>
</template>
<script>
import userApi from '@/api/user';
import auth from '@/plugins/auth';
import QrcodeVue from 'qrcode.vue';
import agreenContent from './agreen-content.vue';
import forget from './components/forget.vue';
import register from './components/register.vue';
const initForm = () => ({
  username: '',
  password: '',
  code: '',
  verifyKey: '',
  from: 0,
});
export default {
  data() {
    return {
      showReg: false,
      loading: false,
      form: {
        ...initForm(),
      },
      codeData: {},
      token: '',
    };
  },
  computed: {
    dev() {
      console.log(this.$store.state.devApp);
      return this.$store.state.devApp;
    },
    production() {
      return process.env.NODE_ENV === 'production';
    },
  },
  components: {
    QrcodeVue,
    agreenContent,
    register,
    forget,
  },
  methods: {
    forgetFn() {
      this.$refs.$forget.openReg();
    },
    openReg() {
      this.$refs.$register.openReg();
    },
    async verifyCodeReq() {
      const [err, res] = await userApi.verifyCodeReq();
      if (err) {
        return;
      }
      this.form.verifyKey = res.data.verifyKey;
      this.codeData = res.data;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return;
        await this.login();
      });
    },
    async login() {
      if (this.loading) return;
      this.loading = true;
      const [err, res] = await userApi.login(this.form);
      this.loading = false;
      if (err) {
        this.form.code = '';
        this.verifyCodeReq();
        return;
      }
      const isView = auth.getToken('viewed');
      const token = res.data.token;
      if (!isView) {
        this.token = token;
        return;
      }
      this.agree(1, token);
    },
    agree(v, token) {
      if (v === 1) {
        auth.setToken(true, 'viewed');
        this.$store.commit('setToken', token || this.token);
        this.$router.push('/');
        auth.setToken(true, 'loginSuccess');
        return;
      }
      this.token = '';
      this.form = {
        ...initForm(),
      };
    },
    suceess() {
      this.$store.commit('setToken', this.token);
      this.$router.push('/');
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goApp(appType) {
      if (!this.dev[appType]) {
        return;
      }
      window.open(this.dev[appType].appUrl);
    },
  },
  created() {
    this.verifyCodeReq();
    this.$store.commit('setPdTop', false);
    this.$store.dispatch('appDownload', false);
  },
  mounted() {
    if (this.$route.query.code) {
      this.openReg();
    }
  },
};
</script>
<style lang="scss">
.login_page {
  min-height: 100vh;
  .login-code {
    width: 54px;
  }
  .login-other {
    & > li {
      cursor: pointer;
    }
    & > li:nth-child(2) {
      color: darkgray;
    }
  }
}
.logo {
  width: auto;
}
</style>
