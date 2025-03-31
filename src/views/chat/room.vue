<template>
  <div class="center-center">
    <div v-if="playerId" class="align-center">
      <ul class="slides flex-column p-t-40">
        <li class="my-avatar m-b-40">
          <el-image
            class="d-img"
            :src="user.headerImg ? `${$baseURL}/${user.headerImg}` : userPic"
          >
          </el-image>
        </li>
        <li class="new-msg pointer" @click="srcollBtm">
          <van-badge :data-badge="news.length" :content="news.length" max="99">
            <img class="d-img" src="@/assets/img/mgs.png" alt="" />
          </van-badge>
        </li>
      </ul>
      <div class="rooms flex-column">
        <ul class="head p-l-24 p-r-24 justify-between align-center">
          <li class="center-center">欢聚一堂</li>
          <li class="center-center serve-line m-r-4 pointer" @click="serve">
            <img class="d-img" src="@/assets/img/bank.png" alt="" />
            人工充值
          </li>
        </ul>
        <div
          v-if="detail.id"
          class="top-bets-bot align-center justify-between p-l-16 p-r-18"
        >
          <div
            class="cat-list"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
          >
            <div class="font16 cat-txt align-center justify-around">
              {{ detail.lotteryNameH5 }}
              <van-icon :name="!showmenu ? 'arrow-down' : 'arrow-up'" />
            </div>
            <ul class="cat-down" v-if="showmenu">
              <li
                class="center-center"
                v-for="(item, index) in catList"
                :key="index"
                @click="changeId(item.id)"
              >
                {{ item.lotteryNameH5 }}
              </li>
            </ul>
          </div>
          <div
            class="table-boxs"
            @mouseenter="handleMouseEnter1"
            @mouseleave="handleMouseLeave1"
          >
            <ul
              class="table-lists align-center justify-around p-l-8 p-r-8"
              @click="(showmenu = false), (showother = !showother)"
            >
              <li>{{ prize.cycleNum }}期</li>
              <li class="center-center m-r-4 m-l-4">
                <p
                  v-for="(v, i) in prize.openArr"
                  class="openbets center-center"
                  :class="[
                    'openbets' + i,
                    { 'm-r-4': i != prize.openArr.length - 1 },
                  ]"
                  :key="i"
                >
                  {{ v }}
                </p>
              </li>
              <li>
                <van-icon :name="!showother ? 'arrow-down' : 'arrow-up'" />
              </li>
            </ul>
            <div class="cat-down" v-if="showother">
              <ul
                class="align-center justify-around p-x-4"
                v-for="(v, i) in otherPrize"
                :key="i"
                style="height: 45px"
                :class="{ b1s: i != otherPrize.length - 1 }"
              >
                <li class="center-center">{{ v.cycleNum }}期</li>
                <li
                  class="center-center colorfff m-r-4 m-l-4"
                  style="color: #fff"
                >
                  <p
                    class="openbets center-center"
                    :class="[
                      'openbets' + i2,
                      { 'm-r-4': i2 != prize.openArr.length - 1 },
                    ]"
                    v-for="(v2, i2) in v.openArr"
                    :key="i2"
                  >
                    {{ v2 }}
                  </p>
                </li>
                <li style="opacity: 0"><van-icon name="arrow-down" /></li>
              </ul>
            </div>
          </div>
          <div class="align-center">
            <p class="m-r-4">{{ detail.nextExpect.nextExpect }}</p>
            投注中
            <van-count-down :time="detail.nextExpect?.countdown * 1000">
              <template #default="timeData">
                <div class="colorfff timeData align-center m-l-8">
                  <span class="block center-center m-r-8">{{
                    timeData.hours >= 10 ? timeData.hours : `0${timeData.hours}`
                  }}</span>
                  <span class="block center-center m-r-8">{{
                    timeData.minutes >= 10
                      ? timeData.minutes
                      : `0${timeData.minutes}`
                  }}</span>
                  <span class="block center-center">{{
                    timeData.seconds >= 10
                      ? timeData.seconds
                      : `0${timeData.seconds}`
                  }}</span>
                </div>
              </template>
            </van-count-down>
            <p
              class="align-center color-yellow m-l-8 p-r-8"
              @click="
                $router.push({
                  path: `/game/hall`,
                  query: {
                    id: curCat.id,
                    type: curCat.lotteryType,
                  },
                })
              "
            >
              <span>去投注</span><van-icon class="m-l-4" name="arrow" />
            </p>
          </div>
        </div>
        <div
          class="flex-1 cont y-container js-cont-room p-t-12"
          @scroll="handleScroll"
          ref="chatBox"
        >
          <infinite-loading
            direction="top"
            @infinite="infiniteHandler"
          ></infinite-loading>
          <roomMsg
            @reply="replay"
            :disabled="disabled"
            :data-msg-id="v.id"
            v-observe-visibility="visibilityChanged(v, i)"
            :item="v"
            v-for="(v, i) in messages"
            :key="i"
            ref="$roomMsg"
          />
        </div>
        <div
          class="btm"
          :class="{ 'btm-disabled': disabled }"
          v-loading="loadingShare"
        >
          <div class="unread-mention center-center flex-column">
            <div
              v-if="showButton"
              class="center-center m-t-16 at-symbol"
              @click="scrollToBottom"
            >
              <van-icon name="arrow-down" />
            </div>
          </div>
          <div class="tool-row align-center p-l-24">
            <emoji-picker class="face-box" @emoji="insert">
              <div
                slot="emoji-invoker"
                slot-scope="{ events: { click: clickEvent } }"
                @click.stop="clickEvent"
                v-popover:popover
              >
                <img class="d-img face" src="@/assets/img/face.png" alt="" />
              </div>
              <div
                class="prop-invoker p-x-8"
                slot="emoji-picker"
                slot-scope="{ emojis, insert }"
              >
                <!-- 原有的表情 -->
                <span
                  class="emoji"
                  v-for="(emoji, emojiName) in emojis.People"
                  :key="emojiName"
                  @click="insert(emoji)"
                  :title="emojiName"
                >
                  {{ emoji }}
                </span>
                <!-- 添加自定义图片 -->
                <div class="custom-images">
                  <img
                    class="custom-img"
                    src="@/assets/img/zjpw.png"
                    @click="sendforBug('[中奖喷雾]')"
                  />
                  <img
                    class="custom-img"
                    src="@/assets/img/qf.png"
                    @click="sendforBug('[求佛]')"
                  />
                  <img
                    class="custom-img"
                    src="@/assets/img/sx.gif"
                    @click="sendforBug('[烧香]')"
                  />
                  <img
                    class="custom-img"
                    src="@/assets/img/xmsx.gif"
                    @click="sendforBug('[熊猫烧香]')"
                  />
                </div>
              </div>
            </emoji-picker>
            <van-uploader class="m-l-16" :after-read="afterRead">
              <i
                class="el-icon-picture"
                style="font-size: 30px; color: #ee8453"
              ></i>
            </van-uploader>
            <img
              @click="openPopup"
              class="d-img redMony m-l-16 pointer"
              src="@/assets/img/redMony.png"
              alt=""
            />
            <div
              class="m-l-16 color999 reply-txt p-l-4 p-r-4 align-center"
              v-if="doc.id"
            >
              <ul class="m-r-8">
                <li>
                  回复：<span>{{ doc.user }}</span>
                </li>
                <li class="font12 els" style="max-width: 400px">
                  <template v-if="[10, 13].includes(+doc.type)">
                    <p class="" v-html="highlightedText(doc.data?.msg)"></p>
                  </template>
                  <template v-else-if="doc.type === 8">
                    <div style="width: 20px; height: 20px">
                      <img
                        class="d-img"
                        :src="
                          doc.data.includes('http')
                            ? doc.data
                            : `${$baseURL}/${doc.data}`
                        "
                      />
                    </div>
                  </template>
                  <template v-else>
                    {{ doc.data }}
                  </template>
                </li>
              </ul>
              <p class="center-center" @click="doc = {}">
                <van-icon name="cross" color="#000" />
              </p>
            </div>
          </div>
          <div class="enter p-l-8 p-r-8">
            <el-input
              type="textarea"
              :placeholder="placeholder"
              v-model="text"
              maxlength="120"
              show-word-limit
              @keydown.enter.native.prevent="send"
              resize="none"
              :disabled="inputStatus"
              ref="inputRef"
            ></el-input>
          </div>
          <ul class="send-row align-center p-x-8">
            <li class="send center-center font16" @click="send">发送</li>
          </ul>
        </div>
      </div>
    </div>
    <popupMoney ref="$popupMoney" />
  </div>
</template>

<script>
import userApi from '@/api/user';
import userPic from '@/assets/img/user-room.png';
import popupMoney from '@/views/chat/components/popupMoney.vue';
import roomMsg from '@/views/chat/components/roomMsg.vue';
import EmojiPicker from 'vue-emoji-picker';
import InfiniteLoading from 'vue-infinite-loading';
import { ObserveVisibility } from 'vue-observe-visibility';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'chatRoom',
  data() {
    return {
      showButton: false,
      userPic,
      text: '',
      shareData: {
        chatAble: 1,
      },
      loadingShare: false,
      doc: {},
      showother: false,
      showmenu: false,
      detail: {
        mulConfig: [],
        nextExpect: {},
      },
      results: [],
      id: null,
    };
  },
  directives: {
    ObserveVisibility,
  },
  components: {
    roomMsg,
    InfiniteLoading,
    EmojiPicker,
    popupMoney,
  },
  computed: {
    ...mapGetters(['catList']),
    userStatus() {
      return this.userStatus; // 获取用户禁言状态
    },
    prize() {
      return this.results[0] || {};
    },
    otherPrize() {
      return this.results.slice(1);
    },
    curCat() {
      return this.catList.find((v) => v.id === this.id);
    },
    placeholder() {
      if (+this.shareData.chatStatusSys === 0) {
        return '全体禁言中.';
      }
      return this.disabled
        ? `充值${this.shareData.recharge}才能解锁聊天`
        : '请输入聊天内容';
    },
    disabled() {
      return (
        +this.shareData.chatStatusSys === 0 || this.shareData.chatAble === 0
      );
    },
    serveData() {
      return this.$store.state.serveData?.serviceAddr;
    },
    user() {
      return this.$store.state.user;
    },
    ...mapState('chat', [
      'messages',
      'playerId',
      'query',
      'ws',
      'wsStatus',
      'inputStatus',
      'userStatus',
      'outStatus',
    ]),
    ...mapGetters('chat', ['news']),
  },
  watch: {
    wsStatus() {
      this.alertReload();
    },
    userStatus(newStatus) {
      if (newStatus === 1) {
        this.inputStatus = true;
        this.notAllow();
      } else if (newStatus === 2) {
        this.notView();
      } else {
        this.$message('解除禁言');
        this.inputStatus = false;
      }
    },
  },
  methods: {
    handleScroll() {
      const scrollContainer = this.$refs.chatBox;
      if (!scrollContainer) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      this.showButton = scrollTop + clientHeight < scrollHeight - 50;
    },
    scrollToBottom() {
      const scrollContainer = this.$refs.chatBox;
      if (!scrollContainer) return;

      scrollContainer.scrollTop = scrollContainer.scrollHeight;
      this.showButton = false;
    },
    highlightedText(v) {
      return v.replace(
        /@(\w+)/g,
        '<span style="color:#488fca;margin:0 2px;">@$1</span>'
      );
    },
    replay(v) {
      console.log('消息', v);
      this.doc = v;
      this.$refs.inputRef.$refs.textarea.focus();
    },
    ...mapActions('chat', [
      'initWebSocket',
      'closeWebSocket',
      'sendMessage',
      'fetchHistory',
    ]),
    async afterRead({ file }) {
      if (file.type.indexOf('image/') === -1) {
        this.$toast('请上传图片');
        return;
      }
      if (file.size > 1024 * 1024 * 10) {
        this.$toast('图片大小不能超过10M');
        return;
      }
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      const [err, res] = await userApi.uploadImg({ file });
      if (err) return;
      this.$toast.clear();
      // 发送上传的图片
      this.sendMessage({
        type: 8,
        data: res.data, // 假设返回的是图片路径
      });
    },
    // 发送自定义图片
    async sendCustomImage(imageUrl) {
      if (this.disabled) {
        this.$toast('当前无法发送消息');
        return;
      }
      this.sendMessage({
        type: 8, // 图片消息类型
        data: imageUrl, // 直接使用图片 URL
      });
    },
    notAllow() {
      this.$alert('你已经被禁言', {
        confirmButtonText: '确定',
        showClose: false,
        callback: () => {},
      });
    },
    notView() {
      this.$alert('你已经被踢出聊天室', {
        confirmButtonText: '确定',
        showClose: false,
        callback: () => {
          this.$router.push('/');
        },
      });
    },
    openPopup() {
      this.$refs.$popupMoney.show = true;
    },
    async serve() {
      await this.$store.dispatch('getServeData');
      window.open(this.serveData);
    },
    alertReload() {
      if (this.wsStatus === false) {
        this.$alert('已经离线，是否重连？', {
          confirmButtonText: '确定',
          showClose: false,
          callback: () => {
            location.reload();
          },
        });
      }
    },
    visibilityChanged(v, i) {
      return (isVisible) => {
        if (isVisible) {
          this.$refs.$roomMsg[i].visib && this.$refs.$roomMsg[i].visib();
          if (v.new === true) {
            this.$store.commit('chat/setToOld', v);
          }
        }
      };
    },
    async send() {
      if (this.text) {
        if (this.doc.id) {
          const cont = {
            id: this.doc.id,
            msg: this.text,
          };
          this.sendMessage({
            type: 13,
            data: JSON.stringify(cont),
          });
          this.doc = {};
        } else {
          this.sendMessage({
            data: this.text.trim(),
          });
        }
        this.text = '';
        await this.sleep(800);
      }
    },
    async sendforBug(msg) {
      this.sendMessage({
        data: msg,
      });
    },
    insert(emoji) {
      this.text += emoji;
    },
    sleep(v) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(v);
        }, v);
      });
    },
    async infiniteHandler($state) {
      const pageNo = this.query.pageNo + 1;
      if (this.query.totalPage !== null && pageNo > this.query.totalPage) {
        $state.complete();
        return;
      }
      this.fetchHistory({
        ...this.query,
        pageNo: this.query.pageNo + 1,
      });
      await this.sleep(1000);
      $state.loaded();
    },
    srcollBtm() {
      this.$nextTick(() => {
        const chatContainer = document.querySelector('.js-cont-room');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      });
    },
    async lotteryBetsOrder() {
      const query = {
        id: this.id,
        pageNo: 1,
        pageSize: 8,
      };
      const [err, res] = await userApi.lotteryHisExpect(query);
      if (err) {
        return;
      }
      res.data.results = res.data.results.map((v) => {
        v.openArr = v.openNum.split(',');
        return v;
      });
      this.results = res.data.results;
    },
    async getDetail() {
      const [err, res] = await userApi.betsDetail({ id: this.id });
      if (err) return;
      res.data.mulConfig = JSON.parse(res.data.mulConfig);
      if (!res.data.nextExpect) {
        res.data.nextExpect = {};
      }
      if (
        this.detail.id !== res.data.id ||
        this.detail.nextExpect.nextExpect !== res.data.nextExpect.nextExpect
      ) {
        this.detail = res.data;
        this.lotteryBetsOrder();
      }
    },
    changeId(id) {
      this.id = id;
      sessionStorage.setItem('lotteryId', id);
      this.getDetail();
      this.showmenu = false;
    },
    handleMouseLeave() {
      this.timeoutId = setTimeout(() => {
        this.showmenu = false;
      }, 300);
    },
    handleMouseEnter() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.showmenu = true;
    },
    handleMouseLeave1() {
      this.timeoutId1 = setTimeout(() => {
        this.showother = false;
      }, 300);
    },
    handleMouseEnter1() {
      if (this.timeoutId1) {
        clearTimeout(this.timeoutId1);
      }
      this.showother = true;
    },
    checkStatus() {
      if (this.outStatus) {
        this.$message({
          message: '您已被提出聊天室',
          type: 'warning',
        });
        this.$router.push('/');
      }
    },
  },
  created() {
    this.checkStatus();
    this.$store.dispatch('getSharaData');
    this.id = +sessionStorage.getItem('lotteryId') || +this.catList[0].id;
    this.getDetail();
    this.timer = setInterval(() => {
      this.getDetail();
    }, 6000);
  },
  mounted() {
    if (this.wsStatus === true) {
      this.srcollBtm();
      return;
    }
    this.initWebSocket();
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer);
  },
};
</script>

<style scoped>
/* 自定义图片样式 */
.custom-images {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.custom-img {
  width: 60px;
  height: 60px;
  cursor: pointer;
}

.custom-img:hover {
  opacity: 0.8;
}
</style>

<style lang="scss" scoped>
.face-box {
  position: relative;
  .prop-invoker {
    width: 400px;
    position: absolute;
    bottom: 100%;
    background: #fff;
  }
  .emoji {
    cursor: pointer;
  }
}
$height: 752px;
$head: 57px;
.rooms {
  width: 800px;
  height: $height;
  background: #f5f5f5;
  border-radius: 0px 0px 0px 0px;
  position: relative;

  .head {
    height: $head;
    font-size: 20px;
    color: #000000;
    border-bottom: 1px solid #dedcdb;
    position: relative;
  }
  .cont {
    padding-top: $head !important;
    overflow-y: auto;
  }
  .btm {
    border-top: 1px solid #dedcdb;
    position: relative;
    ::v-deep {
      textarea {
        height: 80px;
      }
    }

    &.btm-disabled {
      ::v-deep {
        textarea::placeholder {
          color: #f56c6c;
        }
      }
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
      }
    }
    .face {
      width: 32px;
      height: 32px;
    }
    .tool-row {
      height: 50px;
    }
    .send-row {
      justify-content: flex-end;
    }
    .send {
      width: 84px;
      height: 36px;
      background: #2f3c57;
      border-radius: 5px 5px 5px 5px;
      cursor: pointer;
    }
  }
}
.slides {
  width: 102px;
  height: $height;
  background: #293650;
  border-radius: 0px 0px 0px 0px;
  align-items: center;
  .my-avatar {
    height: 53px;
    width: 53px;
    overflow: hidden;
    border-radius: 50%;
  }
}
.new-msg {
  img {
    height: 36px;
    width: 36px;
  }
}
.serve-line {
  font-size: 18px;
  img {
    width: 20px;
    height: 20px;
  }
}
.redMony {
  width: 32px;
  height: 32px;
}
.unread-mention {
  bottom: 110%;
  right: 16px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}
.at-symbol {
  font-size: 14px;
  width: 32px;
  border-radius: 50%;
  height: 32px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.reply-txt {
  background: #ffffff;
  border-radius: 5px 5px 5px 5px;
  border: 1px solid #f0f0f0;
}
.openbets {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #dcae3e;
}
.openbets1 {
  background: #58b2e3;
}
.openbets2 {
  background: #de9fe7;
}
.openbets3 {
  background: #efb187;
}
.openbets4 {
  background: #dc6957;
}
.top-bets-bot {
  position: absolute;
  left: 0;
  top: $head;
  width: 100%;
  height: 51px;
  background: #6280ff;
  z-index: 9;
  .cat-list {
    position: relative;
    .cat-txt {
      width: 123px;
      height: 30px;
      background-color: rgba(155, 174, 255, 0.65);
      border-radius: 5px 5px 5px 5px;
    }
  }
}
.cat-down {
  cursor: pointer;
  color: #333;
  position: absolute;
  left: 0;
  top: 36px;
  width: 100%;
  background: #ffffff;
  border-radius: 5px 5px 5px 5px;
  & > li {
    height: 34px;
    border-bottom: 1px solid #ededed;
  }
  & > li:last-child {
    border-bottom: none;
  }
}
.table-boxs {
  position: relative;
}
.b1s {
  border-bottom: 1px solid #f5f6f7;
}
.timeData {
  width: 110.5px;
  height: 38px;

  .block {
    background: url('@/assets/img/bets-num.png') no-repeat;
    background-size: 100% 100%;
    width: 30.5px;
    height: 32px;
    font-size: 22px;
    color: #6280ff;
  }
}
.color-yellow {
  color: #f6c343;
}
</style>
