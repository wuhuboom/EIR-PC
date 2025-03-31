<template>
  <div class="account-center-right">
    <div class="my-account-main">
      <div class="my-account-welcome-container">
        <div class="my-account-welcome" style="margin-left: 10px">
          您好，尊敬的用户：
          <span class="my-account-span">{{ user.username }}</span
          >，您当前的总余额如下：
        </div>
        <div class="my-account-buttons">
          <div class="my-account-button" @click="recharge">充值申请</div>
          <div
            class="my-account-button"
            @click="withdraw"
            style="margin-left: 10px; margin-right: 10px"
          >
            提现申请
          </div>
          <div
            @click="surePaySet(0)"
            class="my-account-button"
            style="margin-right: 15px"
          >
            修改密码
          </div>
        </div>
      </div>
      <div class="account-detail-amount-container">
        <div class="account-detail-amount-red">
          <div class="account-detail-amount">
            <img
              src="/static/accountCenter/money.png"
              class="account-detail-image"
            />
          </div>
          <div class="account-detail-bar">
            <span style="margin-left: 10px"
              >余额：{{ divide(user.balance) }}元</span
            >
          </div>
          <div
            class="account-detail-amount"
            style="background: rgb(0, 150, 255)"
          >
            <img
              src="/static/accountCenter/money.png"
              class="account-detail-image"
            />
          </div>
          <div class="account-detail-bar" style="background: rgb(0, 150, 255)">
            <span style="margin-left: 10px"
              >投注任务：{{ divide(user.taskAim) }}元</span
            >
          </div>
          <!-- <div
            class="account-detail-amount"
            style="background: rgb(133, 156, 156)"
          >
            <img
              src="/static/accountCenter/money.png"
              class="account-detail-image"
            />
          </div>
          <div
            class="account-detail-bar"
            style="background: rgb(133, 156, 156); border-radius: 10px"
          >
            <span style="margin-left: 10px"
              >待消费：{{ divide(user.balance + user.frozenBet) }}元</span
            >
          </div> -->
          <div class="account-detail-amount-bg"></div>
          <div
            class="account-detail-amount-bg"
            style="background: rgb(0, 150, 255); left: 280px"
          ></div>
          <!-- <div
            class="account-detail-amount-bg"
            style="background: rgb(133, 156, 156); left: 540px; width: 20px"
          ></div> -->
        </div>
      </div>
      <div class="my-account-person-main">
        <div class="my-account-person">个人资料</div>
        <div>
          <table rules="all" class="my-account-person-table">
            <tr class="my-account-table-header">
              <th height="50">头像</th>
              <th height="50">用户名</th>
              <th height="50">昵称</th>
              <th height="50">手机号</th>
              <th height="50">QQ</th>
              <th height="50">邮箱</th>
            </tr>
            <tr align="center" class="my-account-table-body">
              <td height="50">
                <div class="photo-picker-main">
                  <van-uploader :after-read="afterRead" accept="image/*">
                    <span class="el-avatar el-avatar--circle"
                      ><img
                        :src="
                          user.headerImg
                            ? `${$baseURL}/${user.headerImg}`
                            : DefaultAvatar
                        "
                        style="object-fit: cover"
                    /></span>
                  </van-uploader>
                </div>
              </td>
              <td height="50">{{ user.username }}</td>
              <td height="50">{{ user.nickname }}</td>
              <td height="50">{{ user.phone }}</td>
              <td height="50">{{ user.qq }}</td>
              <td height="50">
                {{ user.email }}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="my-account-person-main" style="margin-top: 20px">
        <div class="my-account-person">消费统计</div>
        <div>
          <table rules="all" class="my-account-person-table">
            <tr class="my-account-table-header">
              <th height="50">今日消费金额</th>
              <th height="50">今日中奖金额</th>
              <th height="50">今日平台赠送</th>
              <th height="50">本周中奖金额</th>
              <th height="50">本周平台赠送</th>
              <th height="50">本月中奖金额</th>
              <th height="50">本月平台赠送</th>
            </tr>
            <tr align="center" class="my-account-table-body">
              <td height="50">{{ divide(statis.dayUse) }}元</td>
              <td height="50">{{ divide(statis.dayBingo) }}元</td>
              <td height="50">{{ divide(statis.dayGet) }}元</td>
              <td height="50">{{ divide(statis.weekBingo) }}元</td>
              <td height="50">{{ divide(statis.weekGet) }}元</td>
              <td height="50">{{ divide(statis.monthBingo) }}元</td>
              <td height="50">{{ divide(statis.monthGet) }}元</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="my-account-person-main" style="margin-top: 20px">
        <div class="my-account-bank">
          <div>我的银行卡</div>
          <div
            class="cp-button-main my-account-button"
            v-if="!bankCard.id"
            @click="openBink"
          >
            绑定银行卡
          </div>
        </div>
        <div>
          <table rules="all" class="my-account-person-table">
            <tr class="my-account-table-header">
              <th height="50">卡号</th>
              <th height="50">开户行</th>
              <th height="50">持卡人</th>
              <th height="50">身份证</th>
            </tr>
            <tr align="center" class="my-account-table-body">
              <td height="50" width="20%">{{ bankCard.cardNumber }}</td>
              <td height="50" width="20%">{{ bankCard.bankName }}</td>
              <td height="50" width="20%">{{ bankCard.cardName }}</td>
              <td height="50" width="20%">
                {{ maskID(bankCard?.identity || '') }}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="my-account-person-main" style="margin-top: 20px">
        <div class="my-account-bank">
          <div>我的U钱包</div>
          <div style="display: flex">
            <div
              class="cp-button-main my-account-button"
              style="font-size: 14px; width: auto"
              @click="openUsdtSay"
            >
              <!---->
              USDT提现教程
            </div>
            <div
              class="cp-button-main my-account-button"
              style="font-size: 14px; width: auto; margin-left: 10px"
              @click="bindUsdt"
              v-if="!usdtCard.id"
            >
              <!---->
              绑定USDT钱包地址
            </div>
          </div>
        </div>
        <div>
          <table rules="all" class="my-account-person-table">
            <tr class="my-account-table-header">
              <th height="40">钱包地址</th>
            </tr>
            <tr align="center" class="my-account-table-body">
              <td height="40" width="20%">
                {{
                  usdtCard.cardNumber ? usdtCard.cardNumber : '请先绑定钱包地址'
                }}
              </td>
            </tr>
          </table>
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
                <div class="charts-tab-item charts-tab-item-active">
                  在线充值
                </div>
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
    </div>
    <tipsDialog @sure="sure" ref="$tipDialog" />
    <bindCard ref="$bindCard" />
    <bindUsdt ref="$bindUsdt" />
    <tipsDialog @sure="surePaySet(1)" ref="$paySet" />
    <bindPassWrod ref="$bindPassWrod" />
    <RechargeDialog ref="$RechargeDialog" />
    <withdrawdialog ref="$withdrawdialog" />
  </div>
</template>

<script>
import userApi from '@/api/user';
import DefaultAvatar from '@/assets/img/DefaultAvatar.jpg';
import RechargeDialog from '@/views/components/RechargeDialog.vue';
import withdrawdialog from '@/views/components/withdrawdialog.vue';
import bindCard from '@/views/game/components/bindCard.vue';
import bindPassWrod from '@/views/game/components/bindPassWrod.vue';
import bindUsdt from '@/views/game/components/bindUsdt.vue';
//"dayUse":今日消费 "dayBingo":今日中奖 “dayGet”：今日平台赠送"weekBingo":本周中奖 "monthBingo":本月中然 "weekGet":本周平台赠送 "monthGet":木月平台赠送
export default {
  name: 'AccountCenter',
  data() {
    return {
      DefaultAvatar,
      statis: {
        dayUse: 0,
        dayBingo: 0,
        dayGet: 0,
        weekBingo: 0,
        monthBingo: 0,
        weekGet: 0,
        monthGet: 0,
      },
    };
  },
  components: {
    bindCard,
    bindUsdt,
    bindPassWrod,
    RechargeDialog,
    withdrawdialog,
  },
  props: {
    paySet: {
      type: Number,
      default: null,
    },
    Cards: {
      type: Array,
      default: () => [],
    },
    bankCard: {
      type: Object,
      default: () => {},
    },
    usdtCard: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    typeList() {
      return this.$store.state.bankCard.map((v) => v.ctype);
    },
    banksAll() {
      return this.$store.state.bankCard.filter((v) => v.createdAt);
    },
  },
  methods: {
    sleep(time) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    },
    async afterRead(file) {
      const [err] = await userApi.editHeader({
        file: file.file,
      });
      if (err) return;
      await this.sleep(1000);
      this.$store.dispatch('getInfo');
    },
    async myStatis() {
      const [err, res] = await userApi.myStatis();
      if (err) return;
      this.statis = res.data;
    },
    openPayDialog() {
      this.$refs.$paySet.open('您还未设置支付密码，请在修改密码中设置');
    },
    surePaySet(v = 0) {
      this.$refs.$bindPassWrod.open(v);
    },
    maskID(idNumber) {
      if (!idNumber) return;
      return idNumber[0] + '*'.repeat(idNumber.length - 1);
    },
    openUsdtSay() {
      window.open('https://www.okxtutorialdemo.com/usdtBind1.html?theme=two');
    },
    sure() {
      this.openBink();
    },
    openBink() {
      this.$refs.$bindCard.open();
    },
    bindUsdt() {
      if (this.paySet !== 1) {
        return this.openPayDialog();
      }
      this.$refs.$bindUsdt.open();
    },
    openTipsDialog(v = '您好，您还未绑定提款方式，确定现在进行绑定？') {
      this.$refs.$tipDialog.open(v);
    },
    recharge() {
      // if (!this.bankCard.id) {
      //   return this.openTipsDialog();
      // }
      this.$refs.$RechargeDialog.open();
    },
    withdraw() {
      if (!this.banksAll.length) {
        return this.openTipsDialog();
      }
      if (this.paySet !== 1) {
        return this.openPayDialog();
      }
      this.$refs.$withdrawdialog.open();
    },
  },
  created() {
    this.myStatis();
  },
};
</script>
<style scoped lang="scss"></style>
