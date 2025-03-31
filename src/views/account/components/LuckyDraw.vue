<template>
  <div class="award-index-main">
    <div class="award-index-tabs">
      <div
        class="award-index-tab"
        v-for="(item, idx) in navs"
        :key="idx"
        @click="changeId(item.id)"
        :class="{ 'award-index-tab-active': id === item.id }"
      >
        {{ item.name }}
      </div>
    </div>
    <div>
      <div v-if="id === 0" class="container">
        <div class="header">
          <div class="header-title">
            <div>
              <span style="color: rgb(216, 151, 32)">剩余次数：</span>
              <span style="color: rgb(255, 216, 0)">{{ quantity }}</span>
            </div>
          </div>
          <div class="typecheckbox">
            <div
              class="m-r-12"
              :class="[type === 1 ? 'award-item-active' : '']"
              @click="type = 1"
            >
              消费达到{{ config.consume }}
            </div>
            <div
              :class="[type === 2 ? 'award-item-active' : '']"
              @click="type = 2"
            >
              单笔充值{{ config.recharge }}
            </div>
          </div>
        </div>
        <div class="center-center p-b-24 p-t-16">
          <div id="my-lucky"></div>
        </div>
        <div class="guize">
          <div class="title">规则说明</div>
          <div class="g_item" v-if="type === 1">
            尊敬的用户，欢迎您来到幸运转盘，祝您好运连连。抽奖规则如下： <br />
            1：如果当日您的累计消费达到{{
              config.consume
            }}元，您将拥有一次抽奖机会。<br />
            2.抽奖机会是可以叠加的，（如您消费达到{{
              config.consume * 2
            }}元，您会获得2次抽奖机会) <br />
            3.当您满足抽奖条件后，当日不会生效，需要次日您才能进行抽奖。
          </div>
          <div class="g_item" v-else>
            1:如果您的当日首次充值，且充值金额达到{{
              config.recharge
            }}元，并且当日消费{{
              config.rechargeRate
            }}%后，您将拥有一次抽奖机会。
            <br />
            2.当您满足抽奖条件后，当日不会生效，需要次日您才能进行抽奖。
          </div>
        </div>
      </div>
      <div v-if="id === 1" class="award-record-main">
        <div class="recharge-title align-center">
          <el-date-picker
            v-model="date"
            class="g-el-input__inner"
            type="daterange"
            size="small"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            popper-class="g-table-popper-class"
          >
          </el-date-picker>

          <div
            class="cp-button-main activity-search-btn"
            @click="handleCurrentChange(1)"
          >
            查询
          </div>
        </div>
        <div class="award-record-table-container">
          <table rules="all" align="center" class="award-record-table">
            <tr align="center" class="award-record-table-header">
              <th height="40">活动主题</th>
              <th height="40">中奖奖项</th>
              <th height="40">中奖金额</th>
              <th height="40">奖品状态</th>
              <th height="40">中奖时间</th>
            </tr>
            <!-- drawItem:活动主题1消费 2充值
            bingoName:中奖项目
            bingoMoney:中奖金额
            createdAt:日期 -->
            <tr
              align="center"
              v-for="(item, idx) in tableData.results"
              :key="idx"
            >
              <td height="40">
                <span v-if="item.drawItem === 1">消费</span>
                <span v-else>充值</span>
              </td>
              <td height="40">{{ item.drawName }}</td>
              <td height="40">￥{{ divide(item.drawMoney) }}</td>
              <td height="40">已领取</td>
              <td height="40">{{ $dayjsTime(item.createdAt) }}</td>
            </tr>
          </table>
          <div class="p-b-32 p-t-32 center-center">
            <el-pagination
              class="g-el-pagination"
              @current-change="handleCurrentChange"
              :current-page="query.pageNo"
              :page-size="query.pageSize"
              layout="total, prev, pager, next"
              :total="tableData.totalCount"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from '@/api/user';
import { LuckyWheel } from 'lucky-canvas';
import startBg from '@/assets/img/prize-btn.png';
import bgWheel from '@/assets/img/prize-circle.png';
// recharge: 单日充值x获得1次,
// rechargeRate: 消费达到充值的%",
// consume: 消费达到x
// drawRe:充值抽奖次数
// drawCu:消费抽奖次数
export default {
  name: 'AccountCenter',
  data() {
    return {
      query: {
        pageNo: 1,
        pageSize: 10,
      },
      date: '',
      winIndx: null,
      config: { oddsConfig: [] },
      navs: [
        {
          name: '幸运转盘',
          id: 0,
        },
        {
          name: '中奖记录',
          id: 1,
        },
      ],
      id: 0,
      type: 1,
      tableData: {
        totalCount: 0,
        results: [],
      },
    };
  },
  computed: {
    quantity() {
      return this.type === 1 ? this.config.drawCu : this.config.drawRe;
    },
    oddsConfig() {
      let arr = this.config.oddsConfig.map((v) => {
        let txts = [
          { text: v.name, fontColor: '#f44747', top: '10%', fontSize: '24px' },
          { text: v.item, fontColor: '#f44747', top: '40%' },
        ];
        if (v.name === '谢谢惠顾') {
          txts = [
            {
              text: v.name,
              fontColor: '#f44747',
              top: '10%',
              fontSize: '24px',
            },
          ];
        }
        return {
          fonts: txts,
        };
      });
      return arr;
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.query.pageNo = val;
      this.mysub();
    },
    async mysub() {
      const params = {
        ...this.query,
      };
      if (Array.isArray(this.date)) {
        params.begin = this.date[0];
        params.end = this.date[1];
      }
      const [err, res] = await userApi.drawList(params);
      if (err) return;

      this.tableData = res.data;
    },
    changeId(v) {
      this.id = v;
      this.$nextTick(() => {
        if (v === 0) {
          this.initGame();
        }
      });
    },
    async drawConf() {
      const [err, res] = await userApi.drawConf();
      if (err) {
        return;
      }
      let oddsConfig = [];
      try {
        oddsConfig = JSON.parse(res.data.oddsConfig);
      } catch (e) {
        oddsConfig = [];
      }
      res.data.oddsConfig = oddsConfig;
      for (let i in res.data) {
        this.$set(this.config, i, res.data[i]);
      }
    },
    close() {
      this.winIndx = null;
      this.myLucky.init();
    },
    sleep(v) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, v * 1000);
      });
    },
    async bingo() {
      const [err, res] = await userApi.drawDraw({
        type: this.type,
      });
      if (err) {
        this.close();
        return;
      }
      if (this.type === 1) {
        this.config.drawCu = this.config.drawCu - 1;
        this.config.drawCu = this.config.drawCu < 0 ? 0 : this.config.drawCu;
      } else {
        this.config.drawRe = this.config.drawRe - 1;
        this.config.drawRe = this.config.drawRe < 0 ? 0 : this.config.drawRe;
      }
      this.winIndx = res.data;
      //const prize = this.config.oddsConfig[res.data];
      await this.sleep(5);
      this.myLucky.stop(this.winIndx);
      //this.$toast.success(`${prize.name}`);
    },
    startFlashing() {
      if (!this.quantity) {
        this.close();
        this.$toast(this.$t('backapi.unLotteryDraw'));
        return;
      }
      this.winIndx = null;
      this.bingo();
    },
    initGame() {
      this.myLucky = new LuckyWheel('#my-lucky', {
        width: '600px',
        height: '600px',
        prizes: this.oddsConfig,
        blocks: [
          {
            padding: '48px',
            imgs: [
              {
                rotate: true,
                src: bgWheel,
                width: '600px',
                height: '600px',
              },
            ],
          },
        ],
        buttons: [
          {
            radius: '50px',
          },
          {
            radius: '45px',
          },
          {
            imgs: [
              {
                src: startBg,
                top: '-50px',
                width: '100px',
                height: '100px',
              },
            ],
          },
        ],
        defaultStyle: {
          background: '#e9e8fe',
        },
        defaultConfig: {
          gutter: 2,
        },
        start: () => {
          this.myLucky.play();
          this.startFlashing();
        },
        end: () => {
          if (this.winIndx !== null) {
            this.show = true;
          }
        },
      });
    },
  },
  async mounted() {
    await this.drawConf();
    this.initGame();
    this.mysub();
  },
};
</script>
<style scoped lang="scss"></style>
