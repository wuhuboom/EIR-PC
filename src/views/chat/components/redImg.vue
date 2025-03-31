<template>
  <div class="m-t-4 red-img">
    <div
      @click="open"
      class="reg-img-cont pointer"
      :style="{ backgroundImage: `url(${canGet ? red1 : red2})` }"
    >
      <p class="font16 describes els">
        {{ packet.describes }}
      </p>
      <!-- "status": 0,// 0可抢 1抢空 2过期 -->
      <p class="status">
        {{ packetStatus }}
      </p>
    </div>
    <van-popup class="popupOpen pointer" v-model="showOpen" @click="getPacket">
      <ul class="flex-column center-center getPacket font14">
        <li class="align-center font14">
          <img
            class="d-img user-red m-r-8"
            :src="
              doc.img
                ? doc.img.includes('http')
                  ? doc.img
                  : `${$baseURL}/${doc.img}`
                : userPic
            "
          />
          收到{{ doc.user }}的红包
        </li>
        <li class="d-desc m-t-12">恭喜发财, 大吉大利</li>
      </ul>
    </van-popup>
    <van-popup class="popupFinish" v-model="showFinish">
      <ul class="flex-column center-center font14 m-b-8">
        <li class="align-center font14 names">
          <img
            class="d-img user-red m-r-8"
            :src="
              doc.img
                ? doc.img.includes('http')
                  ? doc.img
                  : `${$baseURL}/${doc.img}`
                : userPic
            "
          />
          收到{{ doc.user }}的红包
        </li>
        <li class="d-desc m-b-8">{{ myRedMoney.describes }}</li>
        <li class="d-meng d-flex m-b-8">
          {{ divide(myRedMoney.money) }}
          <span>元</span>
        </li>
        <li class="view pointer" @click="getMoneyRecord">
          全部领取记录<van-icon :size="12" name="arrow" />
        </li>
      </ul>
    </van-popup>
    <van-popup
      class="popupOpen pointer redRecord"
      v-model="showRecord"
      @click="getRecord"
    >
      <img class="red-close" src="@/assets/img/red-close.png" alt="" />
      <ul class="justify-between align-center m-b-16 red-active">
        <li class="font16">领取记录</li>
        <li>
          {{ recordList.quantity }}个红包 金额{{ divide(recordList.money) }}元
        </li>
      </ul>
      <ul>
        <li
          class="justify-between align-center one-doc"
          v-for="(item, index) in recordList.list"
          :key="index"
        >
          <span class="doc-nickname" :class="{ 'red-active': index === 0 }">{{
            item.nickname
          }}</span>
          <span class="red-active">{{ divide(item.money) }}</span>
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import red1 from '@/assets/img/red1.png';
import red2 from '@/assets/img/red2.png';
import { EventBus } from '@/plugins/bus';
import { mapActions, mapState } from 'vuex';
export default {
  name: 'RedImg',
  data() {
    return {
      red1,
      red2,
      showOpen: false,
      showFinish: false,
      showRecord: false,
      ajaxPack: {}, //红包状态
      recordList: {
        list: [],
      },
    };
  },
  computed: {
    ...mapState('chat', ['messages', 'playerId', 'query', 'ws', 'wsStatus']),
    shareData() {
      return this.$store.state.shareData;
    },
    pack() {
      return this.ajaxPack;
    },
    packet() {
      // "id": 4,
      //      "createdAt": 1736042197315,
      //      "describes": "每日福利2",
      //      "nickname": "super_admin",
      //      "quantity": 20,
      //      "money": 1000000,
      //      "status": 0,// 0可抢 1抢空 2过期
      //      "list": [
      //      //状态为0,list为空,可抢红包
      //      //list有数据,表示已抢到该红包
      //          {
      //              "nickname": "User1",
      //              "money": 50963
      //          }
      //      ]
      console.log('packet', this.doc.packet);
      return this.doc.packet || {};
    },
    myRedMoney() {
      return this.packet.list?.length > 0 ? this.packet.list[0] : this.ajaxPack;
    },
    //是否可抢
    canGet() {
      return this.packet.status === 0 && this.packet.list?.length === 0;
    },
    packetStatus() {
      if (this.myRedMoney.money !== undefined) {
        return '已领取';
      }
      if (this.packet.status === 0) {
        return '点击领取红包';
      }
      return this.packet.status === 1 ? '抢空' : '过期';
    },
  },
  watch: {
    wsStatus() {
      this.alertReload();
    },
  },
  props: {
    doc: {
      type: Object,
      default: () => {},
    },
    userPic: {
      type: String,
      default: '',
    },
  },
  methods: {
    ...mapActions('chat', [
      'initWebSocket',
      'closeWebSocket',
      'sendMessage',
      'fetchHistory',
    ]),

    getMoneyRecord() {
      this.$toast.loading({
        duration: 3000, // 设置 3 秒后关闭
      });
      this.sendMessage({
        type: 7,
        msgId: this.doc.id,
        data: JSON.stringify({ id: this.doc.data?.id }),
      });
      this.showFinish = false;
    },
    visib() {
      if (this.packet.list === undefined) {
        this.redGetStatus();
      }
    },
    redGetStatus() {
      //{"type":5,"data":"{\"id\":6}"}
      this.sendMessage({
        type: 5,
        msgId: this.doc.id,
        data: JSON.stringify({ id: this.doc.data?.id }),
      });
    },
    alertReload() {
      if (this.wsStatus === false) {
        this.showOpen = false;
        this.showFinish = false;
      }
    },
    open() {
      if (this.shareData.gainRed === 0) {
        this.$message({
          message: `充值${this.shareData.gainRecharge}才能参与抢红包`,
          type: 'error',
          customClass: 'index-99999',
        });
        this.getMoneyRecord();
        return;
      }
      if (this.canGet) {
        this.showOpen = true;
        return;
      }
      if (this.myRedMoney.money !== undefined) {
        this.showFinish = true;
        return;
      }
      this.getMoneyRecord();
    },
    getRecord() {
      this.showRecord = false;
    },
    //发送消息:{"type":6,"data":"{\"id\":2}"}
    async getPacket() {
      this.showOpen = false;
      this.$toast.loading({
        message: '领取中...',
        duration: 3000, // 设置 3 秒后关闭
        forbidClick: true,
      });
      await this.sleep(500);
      this.sendMessage({
        type: 6,
        msgId: this.doc.id,
        data: JSON.stringify({ id: this.doc.data?.id }),
      });
    },
  },
  created() {
    EventBus.$on('redGetStatus', ({ msgId, data }) => {
      if (+msgId === +this.doc.id) {
        this.redGetStatus();
        const { code } = data;
        this.$toast.clear();
        if (+code > 0) {
          //1.已被抢空 2.已抢过红包
          this.$toast.fail(+code === 1 ? '红包已被抢空' : '您已抢过该红包');
          return;
        }
        this.ajaxPack = data;
        this.showFinish = true;
      }
    });
    //getMoneyRecord
    EventBus.$on('getMoneyRecord', ({ msgId, data }) => {
      if (+msgId === +this.doc.id) {
        this.showRecord = true;
        this.recordList = data;
        this.$toast.clear();
      }
    });
  },
  beforeDestroy() {
    // 清理监听
    // console.log("beforeDestroy  清理监听");
    // EventBus.$off("redGetStatus");
    // EventBus.$off("getMoneyRecord");
  },
};
</script>
<style scoped lang="scss">
.red-img {
  width: 234px;
  height: 86px;
  img {
    object-fit: contain;
  }
}
.popupOpen {
  padding-top: 73px;
  width: 255px;
  height: 397px;
  background: url('@/assets/img/openRed.png') no-repeat center;
  background-size: 100% 100%;
  color: #feedaf;

  .d-desc {
    font-size: 18px;
  }
}
.user-red {
  width: 16px;
  height: 16px;
}
.popupFinish {
  padding-top: 204px;
  width: 255px;
  height: 399px;
  background: url('@/assets/img/finishRed.png') no-repeat center;
  background-size: 100% 100%;
  .names {
    color: #191919;
  }
  .d-desc {
    color: #999999;
    font-size: 12px;
  }
  .d-meng {
    font-size: 42px;
    color: #cdac74;
    align-items: baseline;
    span {
      font-size: 12px;
    }
  }
  .view {
    color: #b78756;
    font-size: 12px;
  }
}
.redRecord {
  width: 497px;
  height: 324px;
  background: #774230;
  padding: 32px 52px;
  color: #fff;
  .red-active {
    color: #feedaf;
  }
  .red-close {
    position: absolute;
    top: 0px;
    right: 0;
    width: 54px;
  }
  .one-doc {
    height: 25px;
    border-bottom: 1px solid rgba(254, 237, 175, 0.3);
  }
}
.reg-img-cont {
  width: 234px;
  height: 86px;
  background-size: 100% 100%;
  color: #fff;
  .describes {
    padding-top: 21px;
    padding-left: 61px;
    margin-bottom: 20px;
  }
  .status {
    margin-left: 14px;
  }
}
</style>
