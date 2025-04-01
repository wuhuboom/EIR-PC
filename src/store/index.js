/* eslint-disable no-unused-vars */
import userApi from '@/api/user';
import app from '@/main';
import auth from '@/plugins/auth';
import typeBets from '@/plugins/typeBets';
import util from '@/plugins/util';
import Vue from 'vue';
import Vuex from 'vuex';
import chat from './modules/chat';
Vue.use(Vuex);
const lang = location.href.includes('zmkm') ? 'zh' : '';
export default new Vuex.Store({
  state: {
    repair: {
      code: 200,
      msg: auth.getToken('repair') || '',
    },
    theOne: [
      '三星组选组三',
      '三星组选组三胆拖',
      '三星组选组三自填',
      '三星组选组六',
      '三星组选组六胆拖',
      '三星组选组六自填',
      '三星和值',
      '三星跨度',
      '三星组选组选',
      ...typeBets.bets28,
    ],
    vuexBetPrice: 2,
    tabSimpleList: [
      { id: '', text: '全部' },
      { id: 1, text: '线上充值' },
      { id: 2, text: '提现' },
      { id: 3, text: '投注' },
      { id: 4, text: '投注盈利' },
      //{ id: 5, text: "下级盈利返利" },
      { id: 6, text: '纠正资金' },
      { id: 7, text: '撤消投注' },
      { id: 8, text: '人工减款' },
      { id: 9, text: '投注结束' },
      { id: 10, text: '转入余额宝' },
      { id: 11, text: '线下充值' },
      { id: 12, text: '提现退回' },
      { id: 13, text: '投注退回' },
      { id: 14, text: '余额宝转出' },
      { id: 15, text: '幸运抽奖' },
      { id: 16, text: '宾果游戏奖励' },
      { id: 17, text: '发送红包' },
      { id: 18, text: '收到红包' },
      { id: 19, text: '红包退回' },
      { id: 21, text: '下级充值返利' },
      { id: 23, text: '邀请奖励' },
      { id: 24, text: '首充奖励' },
      { id: 25, text: '活动' },
      { id: 26, text: '次充奖励' },
      { id: 27, text: '固定日' },
      { id: 28, text: '邀请首充奖励' },
      { id: 29, text: '赠送金额' },
      { id: 31, text: '线下活动' },
      { id: 33, text: '冲正' },
      { id: 38, text: '累计充值返利' },
    ],
    //0未开奖 1未中奖 2已中奖
    openStatus: [
      {
        name: '全部',
        id: -1,
      },
      {
        name: '未开奖',
        id: 0,
      },
      {
        name: '未中奖',
        id: 1,
      },
      {
        name: '已中奖',
        id: 2,
      },
    ],
    //0待出票 1待开奖 2已撤消 3已结束
    status: [
      {
        name: '全部',
        id: -1,
      },
      {
        name: '待出票',
        id: 0,
      },
      {
        name: '待开奖',
        id: 1,
      },
      {
        name: '已撤消',
        id: 2,
      },
      {
        name: '已结束',
        id: 3,
      },
    ],
    //0待开奖 1.已撤消 2.已中奖3.未中奖
    btmStatus: [
      {
        name: '全部',
        id: -1,
      },
      {
        name: '待开奖',
        id: 0,
      },
      {
        name: '已撤消',
        id: 1,
      },
      {
        name: '已中奖',
        id: 2,
      },
      {
        name: '未中奖',
        id: 3,
      },
    ],
    shoeName: true,
    withdrawalLimitMsg: '',
    showMain: {
      show: false,
      msg: '',
    },
    topBar: {
      height: 0,
    },
    setPdTop: true,
    config: {
      area_code: [],
    },
    user: {},
    lang: lang || localStorage.getItem('lang') || 'zh',
    // 令牌  初始化从本地获取 English  Germany Algeria India France
    token: auth.getToken(),
    serveData: {},
    fbMsg: {
      hasMsg: 0,
    },
    paySet: null,
    safeConfig: {},
    balanceRecord: [],
    recroed: {
      query: {},
      video: [],
    },
    fromRoute: {},
    safeData: {},
    devApp: {},
    scroll:
      ' 尊敬的各位用户您好，在您充值之前 一定要核对好资料，请勿使用历史记录账号转账， 请勿修改充值提示金额，仔细确认收款人和收款账号后再进行转账，如您未按规定充值所造成的财产损失及其他后果需自行承担。祝您好运连连！',
    cat: [
      {
        src: '/static/product/ssc.png',
        id: 0,
        lotteryType: 0,
        lotteryName: '高频彩',
        list: [],
        open: false,
      },
      {
        src: '/static/product/five.png',
        lotteryName: '低频彩',
        id: 1,
        lotteryType: 1,
        list: [],
        open: false,
      },
    ],
    bankCard: [],
    notice: [],
    hallId: null,
    shareData: {
      // chatAble
      // recharge 3000
      //"gainRed": 1, 可抢 0否 1是
      //gainRecharge
    },
  },
  getters: {
    noticeDoc(state) {
      return state.notice[0] || {};
    },
    defaultCode(state) {
      if (!state.config.area_code.length) return '';
      return state.config.area_code[0];
    },
    catList(state) {
      const arr = [];
      state.cat.forEach((item) => {
        arr.push(...item.list);
      });
      return arr;
    },
  },
  mutations: {
    setRepair(state, data) {
      state.repair = data;
    },
    setBetPrice(state, price) {
      state.vuexBetPrice = price;
    },
    setShareData(state, data) {
      state.shareData = data;
    },
    setHallId(state, data) {
      if (!data) return;
      state.hallId = data;
    },
    setNotice(state, data) {
      state.notice = data;
    },
    setBankCard(state, data) {
      state.bankCard = data;
    },
    setCatList(state, data) {
      state.cat.forEach((v) => {
        v.list = data.filter((i) => +i.lotteryType === +v.lotteryType);
        v.list.map((v) => {
          return {
            ...v,
            lotteryType: +v.lotteryType,
          };
        });
      });
    },
    setApp(state, data) {
      state.devApp = data;
    },
    changeSafe(state, data) {
      state.safeData = data;
    },
    setFromRoute(state, data) {
      state.fromRoute = data;
    },
    setRecroed(state, data) {
      state.recroed = data;
    },
    setBalanceRecord(state, data) {
      state.balanceRecord = data;
    },
    setwithdrawalLimitMsg(state, data) {
      state.withdrawalLimitMsg = data;
    },
    setShowName(state, data) {
      state.shoeName = data;
    },
    setMainShow(state, data) {
      Object.assign(state.showMain, data);
    },
    setSafeConfig(state, data) {
      state.safeConfig = data;
    },
    changepaySet(state, data) {
      state.paySet = data;
    },
    setFbMsg(state, data) {
      state.fbMsg = data;
    },
    setServeData(state, data) {
      state.serveData = data;
    },
    setPdTop(state, data) {
      state.setPdTop = data;
    },
    setLang(state, lang) {
      state.lang = lang;
      localStorage.setItem('lang', lang);
      location.reload();
    },
    setToken(state, token) {
      state.token = token;
      auth.setToken(token);
    },
    setUser(state, data) {
      auth.setToken(JSON.stringify(data), 'userInfo');
      state.user = data;
    },
    loginOut(state) {
      state.paySet = null;
      state.user = {};
      auth.clearToken();
      app.$router.push('/login/SignIn');
    },
    setCodeList(state, data) {
      state.config = data;
    },
    goServe(state) {
      if (!state.serveData.serviceAddr) return;
      location.href = state.serveData.serviceAddr;
      //window.open(state.serveData.serviceAddr);
    },
  },
  actions: {
    async getSharaData({ commit }) {
      const [err, res] = await userApi.chat();
      if (err) return;
      commit('setShareData', res.data);
    },
    async getNotice({ commit }) {
      const [err, res] = await userApi.notice({ pageSize: 1 });
      if (err) return;
      commit('setNotice', res.data?.results || []);
    },
    async getPaySet({ commit }) {
      const [err, res] = await userApi.getPwdPay();
      if (err) return;
      commit('changepaySet', res.data.paySet);
    },
    async getBankCard({ commit }) {
      const [err, res] = await userApi.virtualCurrencyList();
      if (err) return;
      commit('setBankCard', res.data);
    },
    async appDownload({ commit }, skip = true) {
      const appType = util.detectDevice();
      const [err, res] = await userApi.appUrl({ appType });
      if (err) return;
      const appList = {};
      res.data.forEach((v) => {
        appList[v.appType] = v;
      });
      commit('setApp', appList);
      if (!skip) return;
      const item = res.data.find((v) => v.appType === appType);
      if (!item) return;
      await userApi.appCount({ id: item.id });
      window.location.href = item.appUrl;
    },
    async getCodeList({ commit }, params) {
      const [err, result] = await userApi.authSysconfig();
      if (err) return;
      commit('setCodeList', result.data);
      commit('setMainShow', {
        show: false,
        msg: '',
      });
    },
    async getInfo({ commit }) {
      const [err, result] = await userApi.userInfo();
      if (err) return [err];
      commit('setUser', result.data);
      return [null, result];
    },
    async setSafeConfig({ commit }) {
      const [err, result] = await userApi.fbConf();
      if (err) return [err];
      commit('setSafeConfig', result.data);
      return [null, result];
    },
    async getServeData({ commit }, open = 0) {
      if (open) {
        app.$toast.loading({
          duration: 0,
          forbidClick: true,
        });
      }
      const token = auth.getToken();
      const [err, result] = await userApi[
        `${token ? 'servReq' : 'servTmpReq'}`
      ]();
      app.$toast.clear();
      if (err) {
        if (Array.isArray(err.data) && err.data.length && open) {
          app.$toast(err.data[0].msg);
        }
        return [err];
      }
      if (open) {
        const host = window.btoa(window.location.origin);
        const link = result.data.serviceAddr;
        location.href =
          link.indexOf('?') !== -1
            ? `${link}&toUrl=${host}`
            : `${link}?toUrl=${host}`;
      } else {
        commit('setServeData', result.data);
        return [null, result];
      }
    },
    async getHasMsg({ commit }) {
      const [err, result] = await userApi.hasMsg();
      if (err) return [err];
      commit('setFbMsg', result.data);
      return [null, result];
    },
    async safeInfo({ commit }) {
      const [err, res] = await userApi.safeInfo();
      if (err) return;
      commit('changeSafe', res.data);
    },
    async playerLotteryList({ commit }) {
      const [err, res] = await userApi.playerLotteryList();
      if (err) return;
      commit('setCatList', res.data);
    },
  },
  modules: {
    chat,
  },
});
