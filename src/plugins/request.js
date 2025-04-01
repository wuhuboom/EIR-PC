import app from '@/main';
import to from 'await-to-js';
import axios from 'axios';
import auth from './auth';

// 获取 BASEPATH，确保 window.BASEPATH 存在
const baseURL = window.BASEPATH ? window.BASEPATH : process.env.VUE_APP_API; // 兜底默认值

const instance = axios.create({
  baseURL: `${baseURL}/player`,
  timeout: 8 * 1000,
  responseType: 'json',
});

instance.interceptors.request.use(
  (config) => {
    const token = app.$store.state.token;
    if (token) config.headers.Token = token;

    if (config.data && typeof config.data === 'object') {
      const formData = new FormData();
      for (let key in config.data) {
        formData.append(key, config.data[key]);
      }
      config.data = formData;
    }

    config.params = Object.assign({}, config.params || {}, {});

    return config;
  },
  (err) => Promise.reject(err)
);

const specialCode = [];

instance.interceptors.response.use(
  (res) => {
    let result = res.data || {};
    let { code, msg, data } = result;

    if ([886, 188].includes(code)) {
      if (code === 188) {
        msg = msg || '系统维护中，请稍后再试';
        auth.setToken(msg, 'repair-msg');
      }
      app.$store.commit('setRepair', {
        code: 886,
        msg: auth.getToken('repair-msg') || msg,
      });
      return Promise.reject(result);
    }

    if (app.$store.state.repair.code !== 200) {
      app.$store.commit('setRepair', {
        code: 200,
        msg: '',
      });
    }

    if ([500].includes(code)) {
      msg = '系统繁忙，请稍后再试。';
    }

    if ([401, 402, 403].includes(code)) {
      const isLogin = res.config.url.includes('/auth/login');
      app.$toast.clear();
      if (!isLogin) {
        app.$store.commit('loginOut');
        if (!location.href.includes('/login/SignIn')) {
          app.$router.push({
            name: 'SignIn',
          });
        }
      }
      if (code == 403 && isLogin) {
        app.$message.error(app.$t('login.fail'));
      }
      return Promise.reject({ code });
    }

    if (code !== 200) {
      if (!specialCode.includes(code)) {
        if (code === 188) {
          app.$store.commit('setMainShow', {
            show: true,
            msg,
          });
        } else if (code === 409) {
          app.$message.error(app.$t('backapi.self.alert.fast.access.tip.text'));
        } else {
          let title = '';
          if (data && data.length > 0) {
            const backkey = 'backapi.' + data[0].msgKey;
            title = data[0].msg || app.$t('backapi.' + data[0].msgKey);
            if ('backapi.rechargeUrlError' === backkey) {
              title = '';
            }
          }

          title = title || msg;
          if (title) {
            if (data[0].msgKey === 'outWiTime') {
              app.$message.error('请在' + data[0].time + '之间提现');
            } else {
              app.$message.error(title);
            }
          } else {
            app.$toast.clear();
          }
        }
      }
      return Promise.reject(result);
    }
    return result;
  },
  async (err) => {
    app.$toast.clear();
    return Promise.reject(err);
  }
);

// 2. 导出一个通过新 axios 实例调用接口的函数
export default ({
  url,
  method = 'get',
  params,
  data,
  headers,
  responseType,
  noAutoFormData = true,
}) => {
  const promise = instance({
    url,
    method,
    params,
    data,
    responseType,
    headers,
    noAutoFormData,
  });
  return to(promise);
};
