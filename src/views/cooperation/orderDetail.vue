<template>
  <div class="app-content">
    <div class="order-detail-main">
      <div
        class="align-center"
        style="right: 20px; top: 20px; position: absolute; z-index: 3"
      >
        <div
          class="cp-button-main order-btn-share m-r-16"
          v-clipboard:copy="textToCopy"
          v-clipboard:success="onCopySuccess"
        >
          复制链接
        </div>
        <div class="cp-button-main order-btn-share" @click="shareToChatRoom">
          分享到聊天室
        </div>
      </div>
      <div class="order-detail-title">
        <div class="order-detail-cp">
          <div class="el-image order-detail-logo">
            <img :src="curCat.src" class="el-image__inner" />
          </div>
          <span> {{ getName(detail.lotteryId) }}</span>
        </div>
        <div class="order-detail-title-text">方案详情</div>
      </div>
      <div class="order-detail-info">
        <span style="color: rgb(253, 217, 155)">发起时间：</span>
        <span style="color: rgb(255, 169, 45)">{{
          $dayjsTime(detail.createdAt)
        }}</span>
        <span style="margin-left: 50px; color: rgb(253, 217, 155)"
          >订单编号：</span
        >
        <span style="color: rgb(255, 169, 45)">{{ detail.orderId }}</span>
        <span style="margin-left: 50px; color: rgb(253, 217, 155)"
          >发起人：</span
        >
        <span style="color: rgb(255, 169, 45)">{{ detail.playerName }}</span>
        <span style="margin-left: 50px; color: rgb(253, 217, 155)"
          >截止下注：</span
        >
        <span style="color: rgb(255, 169, 45)">{{
          $dayjsTime(detail.finishTime)
        }}</span>
      </div>
      <div class="order-detail-table-container">
        <table rules="all" class="order-detail-table">
          <tr align="center" style="color: rgb(255, 241, 192)">
            <td
              width="20%"
              height="50"
              style="background-color: rgb(50, 22, 11)"
            >
              基本信息
            </td>
            <td width="80%">
              <table rules="all" class="order-detail-table1">
                <tr style="background-color: rgb(85, 38, 19)">
                  <th height="30">订单金额</th>
                  <th height="30">订单期数</th>
                  <th height="30">完成期数</th>
                  <th height="30">追号</th>
                  <th height="30">保底</th>
                  <th height="30">购买方式</th>
                  <th height="30">剩余金额</th>
                  <th height="30">中奖金额</th>
                  <th height="30">订单状态</th>
                </tr>
                <tr
                  align="center"
                  style="
                    color: rgb(253, 217, 155);
                    background-color: rgb(98, 53, 37);
                  "
                >
                  <td height="30">
                    <span style="color: rgb(255, 155, 0)"
                      >¥{{ divide(detail.money) }}</span
                    >
                  </td>
                  <td height="30">{{ detail.totalExpect }}</td>
                  <td height="30">{{ detail.currExpect }}</td>
                  <td height="30">{{ getReType(+detail.reType) }}</td>
                  <td height="30">
                    <!---->
                    <!---->
                    <!---->
                    <span
                      >{{ getBtype(detail.btype) }}
                      {{ detail.ftype === 1 ? `| 系统满单` : '' }}</span
                    >
                  </td>
                  <td height="30">用户合买</td>
                  <td height="30">¥{{ detail.sellCount }}</td>
                  <td height="30">
                    <span style="color: rgb(239, 204, 82)"
                      >¥{{ divide(detail.moneyIncome) }}</span
                    >
                  </td>
                  <td height="30">
                    <div
                      class="cp-button-main order-btn-share center-center"
                      v-if="+detail.status === 0 && isMe"
                      style="height: auto"
                      @click="cancelAll"
                    >
                      撤销
                    </div>
                    <span v-else>{{ getStatus(detail.status) }}</span>
                  </td>
                </tr>
              </table>
              <div
                style="
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                  width: 94%;
                  margin-bottom: 10px;
                "
                v-if="detail.sellCount && +detail.status === 0"
              >
                <div>可认购：</div>
                <div style="color: rgb(255, 216, 0)">
                  {{ detail.sellCount }}
                </div>
                <div>元</div>
                <div style="margin-left: 20px">我要认购：</div>
                <input
                  @input="validateInput(detail, $event)"
                  v-model.trim="detail.clientMoney"
                  class="order-info-buy-input"
                />
                <div>元</div>
                <div
                  @click="buyPlayer(detail.clientMoney)"
                  class="cp-button-main order-period-revert-btn"
                >
                  <!---->
                  购买
                </div>
                <div
                  @click="buyPlayer('all')"
                  class="cp-button-main order-period-revert-btn"
                >
                  <!---->
                  全包
                </div>
              </div>
            </td>
          </tr>
          <tr align="center">
            <td
              width="20%"
              height="50"
              style="background-color: rgb(50, 22, 11)"
            >
              当前开奖号码
            </td>
            <td>
              <div class="order-detail-number1">
                <span style="color: rgb(255, 241, 192)">第</span
                ><span
                  class="order-detail-span"
                  style="margin-left: 10px; margin-right: 10px; font-size: 14px"
                  >{{ detail?.open?.cycleNum }}</span
                ><span style="color: rgb(255, 241, 192); margin-right: 30px"
                  >期</span
                >
                <div
                  v-for="(num, idx) in getOpen(detail?.open?.openNum)"
                  :key="idx"
                  class="number-ball-main"
                  style="
                    width: 30px;
                    height: 30px;
                    font-size: 13px;
                    border-radius: 15px;
                    background-image: url('/static/gameHall/color_ball_0.png');
                    background-position: 0 0;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-size: contain;
                  "
                >
                  {{ num }}
                </div>
              </div>
            </td>
          </tr>
          <tr align="center">
            <td
              width="20%"
              height="50"
              style="background-color: rgb(50, 22, 11)"
            >
              <div>投注内容</div>
              <div>({{ getVisibility(detail.visibility) }})</div>
            </td>
            <td>
              <div
                v-if="showContent(detail.visibility)"
                style="overflow: auto; max-height: 450px"
              >
                <table
                  rules="all"
                  class="order-detail-table1"
                  style="table-layout: fixed"
                >
                  <tr
                    v-for="(item, index) in detail.betListArr"
                    :key="index"
                    style="
                      color: rgb(253, 217, 155);
                      background-color: rgb(98, 53, 37);
                    "
                  >
                    <td width="166px" height="30" style="text-align: center">
                      {{ item.name }}
                    </td>
                    <td
                      align="center"
                      style="
                        min-height: 30px;
                        overflow-wrap: break-word;
                        text-align: center;
                        color: rgb(51, 51, 51);
                        display: flex;
                        flex-flow: wrap;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <!-- 当 name 为特定值时，将 positions[0] 的数字用 | 分隔 -->
                      <div
                        v-if="
                          [
                            '前三直选和值',
                            '前三直选组合',
                            '前三组三复式',
                            '前三组六复式',
                          ].includes(item.name)
                        "
                        class="align-center x-container"
                      >
                        <div
                          v-for="(v, i) in item.positions[0]"
                          :key="i"
                          class="align-center"
                        >
                          <div style="color: #fff">{{ v }}</div>
                          <div
                            v-if="i < item.positions[0].length - 1"
                            style="font-size: 18px; color: rgb(255, 216, 0)"
                          >
                            |
                          </div>
                        </div>
                      </div>
                      <!-- 其他情况下，保持原有逻辑 -->
                      <div
                        v-else
                        class="align-center x-container"
                        v-for="(doc, idx) in item?.positions"
                        :key="idx"
                      >
                        <div v-for="(v, i) in doc" :key="i">
                          <div style="color: #fff">{{ v }}</div>
                        </div>
                        <div v-if="idx < item.positions?.length - 1">
                          <div
                            class="o-select-ball"
                            style="font-size: 18px; color: rgb(255, 216, 0)"
                          >
                            |
                          </div>
                        </div>
                      </div>
                    </td>
                    <td width="20px" height="30" style="text-align: center">
                      元
                    </td>
                    <td width="70px" height="30" style="text-align: center">
                      {{ item.quantity }}注
                    </td>
                    <td width="50px" height="30" style="text-align: center">
                      {{ item.multiplier }}倍
                    </td>
                    <td
                      width="80px"
                      height="30"
                      style="text-align: center; color: rgb(255, 155, 0)"
                    >
                      ¥{{ countPrice(item) }}
                    </td>
                  </tr>
                </table>
              </div>
              <div v-else>{{ getVisibility(detail.visibility) }}</div>
            </td>
          </tr>
          <tr align="center">
            <td
              width="20%"
              height="50"
              style="background-color: rgb(50, 22, 11)"
            >
              用户列表
            </td>
            <td>
              <div style="overflow: auto" v-if="detail.joins?.length">
                <table rules="all" class="order-detail-table1">
                  <tr style="background-color: rgb(85, 38, 19)">
                    <th height="30" width="20%">用户</th>
                    <th height="30" width="20%">认购金额</th>
                    <th height="30" width="20%">购买时间</th>
                    <th height="30" width="20%">所占比例</th>
                    <th height="30" width="20%">奖金</th>
                  </tr>

                  <tr
                    align="center"
                    style="
                      color: rgb(253, 217, 155);
                      background-color: rgb(98, 53, 37);
                    "
                    v-for="(item, index) in detail.joins"
                    :key="index"
                  >
                    <td height="30" width="20%">{{ item.playerName }}</td>
                    <td height="30" width="20%">¥{{ divide(item.money) }}</td>
                    <td height="30" width="20%">
                      {{ $dayjsTime(item.time) }}
                    </td>
                    <td height="30" width="20%">
                      {{ $util.toPercent(item.money, detail.money, 4) }}
                    </td>
                    <td height="30" width="20%">
                      <span class="order-detail-span"
                        >¥{{ divide(item.moneyIncome) }}</span
                      >
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          <tr align="center">
            <td
              width="20%"
              height="50"
              style="background-color: rgb(50, 22, 11)"
            >
              期号列表
            </td>
            <td>
              <div style="overflow: auto">
                <table rules="all" class="order-detail-table1">
                  <tr style="background-color: rgb(85, 38, 19)">
                    <th height="30">期号</th>
                    <th height="30">金额</th>
                    <th height="30">倍数</th>
                    <th height="30">开奖号码</th>
                    <th height="30">开奖时间</th>
                    <th height="30">奖金</th>
                    <th height="30">状态</th>
                    <th height="30">操作</th>
                  </tr>
                  <tr
                    align="center"
                    style="
                      color: rgb(253, 217, 155);
                      background-color: rgb(98, 53, 37);
                    "
                    v-for="(item, index) in detail.expects"
                    :key="index"
                  >
                    <td height="30">{{ item.expect }}</td>
                    <td height="30" style="color: rgb(255, 155, 0)">
                      ¥{{ divide(item.money) }}
                    </td>
                    <td height="30">{{ item.mulp }}</td>
                    <td height="30" width="330px">
                      <div class="order-detail-number">
                        <div
                          class="number-ball-main"
                          v-for="(num, idx) in item.open
                            ?.split(',')
                            .filter((v) => v)"
                          :key="idx"
                          style="
                            width: 24px;
                            height: 24px;
                            font-size: 12px;
                            border-radius: 12px;
                            background: url('/static/gameHall/color_ball_0.png')
                              0% 0% / 100% 100%;
                            background-size: contain;
                          "
                        >
                          {{ num }}
                        </div>
                      </div>
                    </td>
                    <td height="30">
                      {{ item.openTime ? $dayjsTime(item.openTime) : '' }}
                    </td>
                    <td height="30">
                      <span style="color: rgb(239, 204, 82)"
                        >¥{{ divide(item.bingo) }}</span
                      >
                    </td>
                    <td height="30">
                      <span style="color: rgb(175, 112, 3)">{{
                        btmStatus(item.status)
                      }}</span>
                    </td>
                    <td height="30">
                      <div
                        class="cp-button-main order-btn-share center-center"
                        v-if="+item.status === 0 && isMe && detail.type3 == 1"
                        style="height: auto"
                        @click="cancel(item.expect)"
                      >
                        撤销
                      </div>
                      <div v-else>--</div>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <tipsDialog ref="$tipsDialog" />
    <tipsDialog ref="$buyDialog" @sure="mySure">
      <ul>
        <li>请确认您的认购信息</li>
        <li>游戏名称：{{ detail.lotteryName }}</li>
        <li>认购金额：￥{{ detail.clientMoney }}</li>
      </ul>
    </tipsDialog>
  </div>
</template>

<script>
import userApi from '@/api/user';
export default {
  name: 'OrderDetail',
  data() {
    return {
      id: this.$route.params.id,
      detail: {},
      textToCopy: location.href,
      shareData: {
        // chatAble
        // recharge 3000
      },
    };
  },
  computed: {
    theOne() {
      return this.$store.state.theOne;
    },
    user() {
      return this.$store.state.user;
    },
    cat() {
      return [...this.$store.state.cat];
    },
    catList() {
      const list = [];

      this.cat.forEach((item) => {
        console.log(item);
        if (item.list) {
          item.list.forEach((i) => {
            list.push(i);
          });
        }
      });
      return list;
    },
    curCat() {
      let catData = {};
      this.cat.forEach((v) => {
        v.list.forEach((c) => {
          if (+c.id === +this.detail.lotteryId) {
            catData = v;
          }
        });
      });
      return catData;
    },
    isMe() {
      return +this.user.id === +this.detail?.playerId;
    },
  },
  methods: {
    countPrice(item) {
      if (this.theOne.includes(item.name)) {
        return item.price;
      }
      return item.quantity * item.multiplier * item.price;
    },
    open() {
      return new Promise((resolve) => {
        this.$confirm('确定要撤销吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            resolve(true);
          })
          .catch(() => {
            resolve(false);
          });
      });
    },
    async cancelAll() {
      const status = await this.open();
      if (!status) return;
      const [err] = await userApi.cancelTogether({
        id: this.id,
      });
      if (err) return;
      this.$message.success('撤销成功');
      this.getDetail();
    },
    async cancel(expect) {
      const status = await this.open();
      if (!status) return;
      const [err] = await userApi.lotteryMyOrderCancelRe2({
        expect,
        id: this.id,
      });
      if (err) return;
      this.$message.success('撤销成功');
      this.getDetail();
    },
    onCopySuccess() {
      this.$message.success('复制链接成功');
    },
    getName(id) {
      const item = this.catList.find((v) => v.id === id);
      return item ? item.lotteryName : '';
    },
    getOpen(v) {
      if (!v) return ['_', '_', '_', '', '_'];
      return v.split(',').filter((v) => v);
    },
    showContent(v) {
      //visibility 0公开 1仅对跟单者公开 2截止后公开 3永久保密
      if (v === 0) {
        return true;
      }
      if (v === 1) {
        return this.detail.joins.some((v) => v.playerId === this.user.id);
      }
      if (v === 2) {
        return +this.detail.status === 4;
      }
      return false;
    },
    getVisibility(v) {
      const docs = [
        {
          name: '公开',
          status: 0,
        },
        {
          name: '仅对跟单者公开',
          status: 1,
        },
        {
          name: '截止后公开',
          status: 2,
        },
        {
          name: '永久保密',
          status: 3,
        },
      ];
      return (docs.find((doc) => doc.status === v) || {}).name;
    },
    getBtype(v) {
      // 0 btype 是否保底0全保 1部分 2不保
      const docs = [
        {
          name: '全保保底',
          status: 0,
        },
        {
          name: '部分保底',
          status: 1,
        },
        {
          name: '不保底',
          status: 2,
        },
      ];
      return (docs.find((doc) => doc.status === v) || {}).name;
    },
    getReType(v) {
      // 0 无追号 1中奖停 2中奖不停
      const docs = [
        {
          name: '无追号',
          status: 0,
        },
        {
          name: '中奖停',
          status: 1,
        },
        {
          name: '中奖不停',
          status: 2,
        },
      ];
      return (docs.find((doc) => doc.status === v) || {}).name;
    },
    validateInput(item, v) {
      let value = v.target.value.replace(/\D/g, '');
      if (value) {
        const numericValue = parseInt(value, 10);
        value = Math.min(Math.max(numericValue, 1), item.sellCount);
      }
      item.clientMoney = value;
    },
    buyPlayer(price) {
      if (price === 'all') {
        this.detail.clientMoney = this.detail.sellCount;
        this.$refs.$buyDialog.open();
        return;
      }
      if (!price) {
        this.$refs.$tipsDialog.open('请输入购买金额');
        return;
      }
      if (price > this.detail.sellCount) {
        this.$refs.$tipsDialog.open('购买金额不能大于剩余金额');
        return;
      }
      this.$refs.$buyDialog.open();
    },
    getExpects(v) {
      return (this.$store.state.openStatus.find((doc) => doc.id === v) || {})
        .name;
    },
    getStatus(v) {
      return (this.$store.state.status.find((doc) => doc.id === v) || {}).name;
    },
    btmStatus(v) {
      return (this.$store.state.btmStatus.find((doc) => doc.id === v) || {})
        .name;
    },
    async chat() {
      const [err, res] = await userApi.chat();
      if (err) return;

      this.shareData = res.data;
    },
    async mySure() {
      const [err] = await userApi.lotteryBetsJoin({
        betId: this.detail.id,
        betCount: this.detail.clientMoney,
      });
      if (err) return;
      this.$message.success('购买成功');
      this.getDetail();
    },
    async getDetail() {
      const [err, res] = await userApi.betsOrderDetail({
        id: this.id,
      });
      if (err) return;
      res.data.clientMoney = '';
      res.data.betTotal = res.data.betTotal / 100;
      res.data.betCountCurr = res.data.betCountCurr / 100;
      res.data.sellCount = res.data.betTotal - res.data.betCountCurr;
      console.log(res.data.betCode);
      res.data.betListArr = res.data.betCode
        ? this.$util.parseFourStarInput(res.data.betCode)
        : [];
      console.log(res.data.betListArr);
      for (let key in res.data) {
        this.$set(this.detail, key, res.data[key]);
      }
    },
    comfire() {
      return new Promise((resolve) => {
        this.$confirm('确定分享到聊天室吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'g-confirm-box',
        })
          .then(() => {
            resolve(1);
          })
          .catch(() => {
            resolve(0);
          });
      });
    },
    async shareToChatRoom() {
      if (+this.detail.shareDisabled === 0) {
        this.$message.error('分享已禁用');
        return;
      }
      if (this.detail.status !== 0) {
        this.$message.error('合买已结束，无法分享');
        return;
      }
      if (!this.shareData.chatAble) {
        this.$message.error(`充值${this.shareData.recharge}才能解锁聊天`);
        return;
      }
      const status = await this.comfire();
      if (!status) return;
      this.$toast.loading({
        forbidClick: false, // 允许点击和滚动
        duration: 0, // 持续时间为 0 表示不会自动关闭
      });
      const [err] = await userApi.lotteryBetsShare({
        id: this.id,
      });
      this.sleep(1000);
      this.$toast.clear();
      if (err) return;
      this.$message.success('分享成功');
      // this.$confirm("分享成功，是否查看聊天室消息?", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "success",
      //   customClass: "g-confirm-box",
      // })
      //   .then(() => {
      //     this.$router.push("/chat/room");
      //   })
      //   .catch(() => {});
    },
  },
  async created() {
    this.chat();
    let docCat = this.$store.state.cat.find((v) => v.list.length);
    if (!docCat) {
      await this.$store.dispatch('playerLotteryList');
    }
    this.getDetail();
  },
};
</script>
