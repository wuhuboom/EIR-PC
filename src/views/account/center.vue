<template>
  <div class="app-content account-center-main">
    <div class="account-center-content">
      <div class="account-center-left no-shrink" style="cursor: pointer">
        <div
          class="fun-item-main"
          :class="{ 'fun-item-main-active': curId === item.id }"
          v-for="(item, idx) in navs"
          @click="curId = item.id"
          :key="idx"
        >
          <div class="fun-item-title">{{ item.name }}</div>
          <div class="el-image fun-item-arrow">
            <img
              src="/static/accountCenter/icon_arrow_right.png"
              class="el-image__inner"
            />
          </div>
        </div>
      </div>
      <div class="account-center-right">
        <component
          :paySet="paySet"
          :Cards="Cards"
          :bankCard="bankCard"
          :usdtCard="usdtCard"
          :is="currentComponent"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import Account from './components/account.vue';
import Balance from './components/Balance.vue';
import fruteGame from './components/fruteGame.vue';
import FundDetail from './components/FundDetail.vue';
import GameRecord from './components/GameRecord.vue';
import GiftRecord from './components/GiftRecord.vue';
import LuckyDraw from './components/LuckyDraw.vue';
import MemberManage from './components/MemberManage.vue';
import Notice from './components/Notice.vue';
import RechargeRecord from './components/RechargeRecord.vue';
import RedPacketRecord from './components/RedPacketRecord.vue';
import SiteMessage from './components/SiteMessage.vue';
import WithdrawRecord from './components/WithdrawRecord.vue';
import team from './team/index.vue';
export default {
  name: 'AccountCenter',
  data() {
    return {
      navs: [
        {
          name: '我的账户',
          id: 0,
        },
        {
          name: '余额宝',
          id: 1,
        },
        // {
        //   name: "宾果游戏",
        //   id: 40,
        // },
        {
          name: '游戏记录',
          id: 2,
        },
        {
          name: '充值记录',
          id: 3,
        },
        {
          name: '提现记录',
          id: 4,
        },
        {
          name: '赠送记录',
          id: 5,
        },
        {
          name: '红包记录',
          id: 6,
        },
        // {
        //   name: "幸运抽奖",
        //   id: 7,
        // },
        {
          name: '资金明细',
          id: 8,
        },
        // {
        //   name: "站内信",
        //   id: 9,
        // },
        {
          name: '公告',
          id: 10,
        },
        {
          name: '邀请好友',
          id: 11,
        },
      ],
      curId: +this.$route.query.id || 0,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    paySet() {
      return this.$store.state.paySet;
    },
    Cards() {
      return this.$store.state.bankCard;
    },
    bankCard() {
      return this.Cards.find((v) => +v.ctype === 2) || {};
    },
    usdtCard() {
      return this.Cards.find((v) => +v.ctype === 3) || {};
    },
    // 根据当前 tab id 返回对应的组件
    currentComponent() {
      const components = {
        0: Account,
        1: Balance,
        2: GameRecord,
        3: RechargeRecord,
        4: WithdrawRecord,
        5: GiftRecord,
        6: RedPacketRecord,
        7: LuckyDraw,
        8: FundDetail,
        9: SiteMessage,
        10: Notice,
        11: MemberManage,
        40: fruteGame,
        12: team,
      };
      return components[this.curId] || null;
    },
  },
  async created() {
    // await this.$store.dispatch("getInfo");
    this.$store.dispatch('getPaySet');
    this.$store.dispatch('getBankCard');
    let docCat = this.$store.state.cat.find((v) => v.list.length);
    if (!docCat) {
      await this.$store.dispatch('playerLotteryList');
    }

    // if (this.user.proxyPlayer) {
    //   this.navs.push({
    //     name: "我的团队",
    //     id: 12,
    //   });
    // }
    this.navs.push({
      name: '我的团队',
      id: 12,
    });
  },
};
</script>
<style scoped lang="scss"></style>
