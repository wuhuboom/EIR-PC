<template>
  <div class="account-info-main" style="width: 260px">
    <div class="account-info-title">
      <div class="el-image account-info-image">
        <img src="@/static/account-left.png" class="el-image__inner" /><!---->
      </div>
      <div class="account-info-title-text m-r-8 m-l-8">账户信息</div>
      <div class="el-image">
        <img src="@/static/account-right.png" class="el-image__inner" /><!---->
      </div>
    </div>
    <div class="common_layout_horizontal account-info-item">
      <div class="el-image account-info-icon-user">
        <img src="@/static/account_user.png" class="el-image__inner" /><!---->
      </div>
      <div class="account-info-label">呢称：</div>
      <div class="account-info-text">{{ hideNAme }}</div>
      <img
        :src="seen.name ? closeIcon : openIcon"
        class="icon-eye"
        @click="seen.name = !seen.name"
      />
    </div>
    <div class="common_layout_horizontal account-info-item">
      <div class="el-image account-info-icon-user">
        <img src="@/static/account_money.png" class="el-image__inner" /><!---->
      </div>
      <div class="account-info-label">等级：</div>
      <div class="account-info-text">
        <div class="vip-level-main" style="width: 22px">
          <img src="@/static/icon_vip.png" class="vip-level-image" />
          <div class="vip-level-num">{{ user.vipLevel }}</div>
        </div>
      </div>
    </div>
    <div class="common_layout_horizontal account-info-item">
      <div class="el-image account-info-icon-user">
        <img src="@/static/account_rmb.png" class="el-image__inner" /><!---->
      </div>
      <div class="account-info-label">余额：</div>
      <div class="account-info-text" style="font-size: 14px">
        {{ seen.money ? divide(user.balance) : '****' }}
      </div>
      <img
        :src="seen.money ? closeIcon : openIcon"
        class="icon-eye"
        @click="seen.money = !seen.money"
      />
    </div>
    <div class="common_layout_horizontal account-info-item">
      <div class="el-image account-info-icon-user">
        <img src="@/static/account_rmb.png" class="el-image__inner" /><!---->
      </div>
      <div class="account-info-label">冻结：</div>
      <div class="account-info-text" style="font-size: 14px">
        {{ seen.dieMoney ? dieMoney : '****' }}
      </div>
      <img
        :src="seen.dieMoney ? closeIcon : openIcon"
        class="icon-eye"
        @click="seen.dieMoney = !seen.dieMoney"
      />
    </div>
    <div class="common_layout_horizontal account-info-buttons">
      <div
        class="account-info-button1 common_layout_center_h"
        @click="rechange"
      >
        充值
      </div>
      <div class="account-info-button2 common_layout_center_h" @click="windth">
        提现
      </div>
    </div>
    <div class="common_layout_horizontal account-info-buttons">
      <div
        class="account-info-button3 common_layout_center_h"
        @click="$store.commit('loginOut')"
      >
        退出
      </div>
    </div>
    <div style="z-index: 999; display: none">
      <div class="cp-popup-mask"></div>
      <div class="cp-popup-main">
        <div class="cp-popup-title">
          <div class="cp-popup-title-content">
            <div style="color: rgb(255, 236, 124)">充值</div>
            <i class="el-icon-close" style="cursor: pointer"></i>
          </div>
        </div>
        <div class="cp-popup-body">
          <div class="cp-popup-body-content">
            <div class="charts-tabs">
              <div class="charts-tab-item charts-tab-item-active">在线充值</div>
            </div>
            <div>
              <div>
                <div class="empty-info">正在维护中，请稍后尝试！</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <tipsDialog @sure="sure" ref="$tiphDialog" />

    <bindCard ref="bindCard" />
    <bindPassWrod ref="$bindPassWrod" />
    <RechargeDialog ref="$RechargeDialog" />
    <withdrawdialog ref="$withdrawdialog" />
    <bindUsdt ref="$bindUsdt" />
  </div>
</template>

<script>
import RechargeDialog from '@/views/components/RechargeDialog.vue';
import withdrawdialog from '@/views/components/withdrawdialog.vue';
import bindCard from '@/views/game/components/bindCard.vue';
import bindPassWrod from '@/views/game/components/bindPassWrod.vue';
import bindUsdt from '@/views/game/components/bindUsdt.vue';
export default {
  name: 'InfoMain',
  data() {
    return {
      closeIcon: require('@/static/eye_closed2.png'),
      openIcon: require('@/static/eye_open2.png'),
      seen: {
        name: true,
        money: true,
        dieMoney: true,
      },
    };
  },
  components: {
    bindCard,
    RechargeDialog,
    withdrawdialog,
    bindPassWrod,
    bindUsdt,
  },
  computed: {
    paySet() {
      return this.$store.state.paySet;
    },
    typeList() {
      return this.$store.state.bankCard.map((v) => v.ctype);
    },
    Cards() {
      return this.$store.state.bankCard.filter((v) => v.createdAt);
    },
    bankCard() {
      return this.Cards.find((v) => +v.ctype === 2) || {};
    },
    hideNAme() {
      return this.seen.name
        ? this.user.username
        : this.user.username.slice(0, 2) + '***';
    },
    user() {
      return this.$store.state.user;
    },
    dieMoney() {
      //frozenBet 投注  frozenWithdrawa 提现冻结
      return this.divide(this.user.frozenBet + this.user.frozenWithdrawal);
    },
  },
  methods: {
    bindPay(v) {
      alert(v);
      //v 0支付宝 1微信 2银行卡 3USDT
      switch (v) {
        case 0:
          this.$refs.$bindAlipay.show = true;
          break;
        case 1:
          this.$refs.$bindWechat.show = true;
          break;
        case 2:
          this.$refs.bindCard.show = true;
          break;
        case 3:
          this.$refs.$bindUsdt.open();
          break;
        default:
          break;
      }
    },
    windth() {
      if (this.paySet !== 1) {
        this.$message.error('请先设置支付密码');
        return this.$refs.$bindPassWrod.open(1);
      }
      if (!this.Cards.length) {
        this.$refs.$tiphDialog.open(
          '您好，您还未绑定提款方式，确定现在进行绑定？'
        );
        return;
      }

      this.$refs.$withdrawdialog.open();
    },
    rechange() {
      // if (this.bankCard.id) {
      //   this.$refs.$RechargeDialog.open();
      //   return;
      // }
      // this.$refs.$tiphDialog.open(
      //   "您好，您还未绑定提款银行卡，确定现在进行绑定银行卡？"
      // );
      this.$refs.$RechargeDialog.open();
    },
    sure() {
      this.$refs.bindCard.show = true;
    },
  },
  created() {
    this.$store.dispatch('getBankCard');
    this.$store.dispatch('getPaySet');
  },
};
</script>
