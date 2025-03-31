import app from '@/main';
import auth from '@/plugins/auth';
import { EventBus } from '@/plugins/bus';
import userApi from '@/api/user';
let trimrWs = null;
export default {
  namespaced: true,
  state: {
    ws: null, // WebSocket 实例
    wsStatus: null, // WebSocket 连接状态
    messages: [], // 聊天消息记录
    playerId: null, // 当前用户的 playerId
    query: {
      pageNo: 1,
      pageSize: 20,
      totalPage: null,
    },
    userStatus: 0, // 0: 正常, 1: 禁言, 2: 被踢出
    inputStatus: false, //聊天室是否禁止输入
    outStatus: false, //是否被踢出聊天室
    onlineUser: [],
  },
  getters: {
    news: (state) => {
      const arr = state.messages.filter((v) => v.new === true);
      return arr;
    },
    aites(state, getters) {
      if (!getters.news) return [];
      return getters.news?.filter((v) => {
        if ([10, 13].includes(+v.type)) {
          const data = JSON.parse(v.data);
          if (!data.playerId) return false;
          return data.playerId.includes(app.$store.state.user.id);
        }
        return false;
      });
    },
    userStatus: (state) => state.userStatus,
    getInputStatus: (state) => state.inputStatus, // 获取 inputStatus
    getOutStatus: (state) => state.outStatus,
  },
  mutations: {
    setOnlineUser(state, v) {
      state.onlineUser = v;
    },
    addMsgPacket(state, v) {
      const index = state.messages.findIndex((item) => +item.id === +v.msgId);
      if (index === -1) return;
      try {
        app.$set(state.messages[index], 'packet', JSON.parse(v.data));
      } catch (e) {
        console.log(e);
      }
    },
    setToBack(state, v) {
      console.log('setToBack', v);
      const index = state.messages.findIndex((item) => +item.id === +v.id);
      if (index === -1) return;
      console.log(state.messages[index]);
      app.$set(state.messages[index], 'status', 1);
    },
    setToOld(state, v) {
      const index = state.messages.findIndex((item) => +item.id === +v.id);
      if (index === -1) return;
      state.messages = state.messages.map((v, k) => {
        if (index >= k) {
          v.new = false;
        }
        return v;
      });
    },
    setQuery(state, query) {
      state.query = query;
    },
    SET_WS(state, ws) {
      state.ws = ws;
      state.wsStatus = ws ? true : false;
    },
    ADD_MESSAGE(state, message) {
      if (message.message) {
        state.messages.push({
          ...message.message,
          new: message.message.playerId != app.$store.state.user.id,
        });
      } else {
        state.messages.unshift(...message.reverse());
      }
    },
    CLEAR_MESSAGES(state) {
      state.messages = []; // 清空消息记录
    },
    SET_PLAYER_ID(state, playerId) {
      state.playerId = playerId; // 设置当前用户的 playerId
    },
    SET_USER_STATUS(state, status) {
      state.userStatus = status;
    },
    setInputStatus(state, status) {
      state.inputStatus = status; // 更新 inputStatus 的值
    },
    setOutStatus(state, status) {
      state.outStatus = status; // 更新 inputStatus 的值
    },
  },
  actions: {
    // 初始化 WebSocket
    initWebSocket({ commit, dispatch }) {
      //wss://api.orz-orz.cc
      const site = process.env.VUE_APP_WS || 'wss://api.orz-orz.cc'; // 默认值作为备用
      const url = `${site}/player/ws/${auth.getToken()}`;
      const playerId = app.$store.state.user.id;

      const ws = new WebSocket(url);

      ws.onopen = () => {
        console.log('WebSocket 已连接');
        commit('SET_PLAYER_ID', playerId); // 存储当前用户 ID
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        dispatch('handleMessage', message); // 处理接收到的消息
      };

      ws.onerror = (error) => {
        console.error('WebSocket 错误:', error);
      };

      ws.onclose = () => {
        console.log('WebSocket 已关闭');
        commit('SET_WS', null);
      };
      window.ws = ws;
      trimrWs && clearInterval(trimrWs);
      trimrWs = setInterval(() => {
        try {
          ws.send(1);
        } catch (e) {
          console.log('ping error', e);
        }
      }, 20 * 1000);
      commit('SET_WS', ws);
    },

    // 关闭 WebSocket 连接
    closeWebSocket({ state, commit }) {
      if (state.ws) {
        state.ws.close();
        commit('SET_WS', null);
      }
    },

    // 发送消息
    sendMessage({ state }, { type = 0, data, msgId }) {
      if (state.ws && state.ws.readyState === WebSocket.OPEN) {
        const query = { type, data };
        if (msgId) {
          query.msgId = msgId;
        }
        const message = JSON.stringify(query);
        state.ws.send(message);
      } else {
        console.error('WebSocket 未连接或已关闭');
      }
    },
    // 处理接收到的消息
    handleMessage({ commit }, message) {
      //0 文本消息 2 分享合买 4 红包消息 8图片 10 @消息 13 回复消息
      if ([0, 2, 4, 8, 10, 13].includes(+message.type)) {
        // 文本消息
        commit('ADD_MESSAGE', { message });

        app.$nextTick(() => {
          const chatContainer = document.querySelector('.js-cont-room');
          if (!chatContainer) return;
          const scrollDistanceToBottom =
            chatContainer.scrollHeight -
            chatContainer.scrollTop -
            chatContainer.clientHeight;
          if (
            message.playerId == app.$store.state.user.id ||
            scrollDistanceToBottom < 300
          ) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
          }
        });
      } else if (message.type === 1) {
        //pageNo

        const resResults = JSON.parse(message.data);
        const { results, pageNo } = resResults;
        if (!results) return;
        commit('ADD_MESSAGE', results);
        //setQuery
        commit('setQuery', resResults);
        if (+pageNo === 1) {
          app.$nextTick(() => {
            const chatContainer = document.querySelector('.js-cont-room');
            if (chatContainer) {
              chatContainer.scrollTop = chatContainer.scrollHeight;
            }
          });
        }
      } else if ([3].includes(+message.type)) {
        let data = JSON.parse(message.data);
        // 3 发红包响应的code消息 (1余额不足 2数量不正确)
        app.$message({
          message: data.code == 1 ? '余额不足' : '数量不正确',
          type: 'error',
          duration: 2000,
          showClose: true,
        });
      } else if ([5].includes(+message.type)) {
        //查询红包 状态
        commit('addMsgPacket', message);
      } else if ([6].includes(+message.type)) {
        //抢红包响应数据
        // 接收消息:{"type":6,"data":"{\"code\":1}"}(0.抢到红包 1.已被抢空 2.已抢过红包)
        // 抢到红包返回{money:抢到金额,nickname:发送人,describes:红包标题}

        //抢红包后更新红包状态
        EventBus.$emit('redGetStatus', {
          ...message,
          data: JSON.parse(message.data),
        });
      } else if ([7].includes(+message.type)) {
        EventBus.$emit('getMoneyRecord', {
          ...message,
          data: JSON.parse(message.data),
        });
      } else if ([9].includes(+message.type)) {
        //撤回消息修改status
        commit('setToBack', JSON.parse(message.data));
      } else if ([12].includes(+message.type)) {
        // headImg
        // :
        // null
        // playerId
        // :
        // 42
        // username
        // :
        // "arman706"
        commit(
          'setOnlineUser',
          JSON.parse(message.data).filter(
            (v) => v.playerId != app.$store.state.user.id
          )
        );
        // console.log(
        //   '12--',
        //   JSON.parse(message.data).filter(
        //     (v) => v.playerId != app.$store.state.user.id
        //   )
        // );
      } else if ([15].includes(+message.type)) {
        if (message.data === 0) {
          commit('setInputStatus', false);
          commit('setOutStatus', false); // 异步更新状态
        } else if (message.data === 1) {
          commit('setInputStatus', true);
          commit('setOutStatus', false);
        } else {
          commit('setInputStatus', true);
          commit('setOutStatus', true);
        }
        commit('SET_USER_STATUS', message.data);
      }
    },
    async fetchChatStatus({ commit }) {
      this.loadingShare = true;
      const [err, res] = await userApi.chat();
      this.loadingShare = false;
      if (err) return;
      commit('SET_USER_STATUS', +res.data.chatStatus); // 保存 chatStatus 到 Vuex
    },

    // 请求历史消息
    fetchHistory({ dispatch }, { pageNo, pageSize }) {
      const data = JSON.stringify({ pageNo, pageSize });
      dispatch('sendMessage', { type: 1, data });
    },
  },
};
