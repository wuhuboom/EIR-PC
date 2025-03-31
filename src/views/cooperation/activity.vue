<template>
  <div class="app-content">
    <div class="activity-main">
      <div class="activity-search">
        <div class="activity-search-conditions">
          <div class="el-image activity-search-icon">
            <img
              src="/static/activity/icon_search.png"
              class="el-image__inner"
            /><!---->
          </div>
          <span>查询</span>
          <div class="select-category-main" style="margin-left: 18px">
            <span class="select-category-span">游戏名称:</span>
            <div class="cp-cascader-main" style="width: 117px">
              <el-cascader
                class="g-el-cascader"
                popper-class="g-el-cascader-popper"
                size="small"
                :options="cat"
                v-model="params.lotteryId"
                :props="{
                  value: 'id',
                  label: 'lotteryName',
                  children: 'list',
                }"
                :show-all-levels="false"
              ></el-cascader>
            </div>
          </div>
          <div class="select-drop-main" style="margin-left: 18px">
            <span class="select-drop-span">保底:</span>
            <div class="cp-cascader-main" style="width: 117px">
              <el-cascader
                class="g-el-cascader"
                popper-class="g-el-cascader-popper"
                size="small"
                :options="countList"
                v-model="params.betCountMin"
                :props="{
                  value: 'id',
                  label: 'name',
                }"
                :show-all-levels="false"
              ></el-cascader>
            </div>
          </div>
          <!-- <div class="select-drop-main" style="margin-left: 18px">
            <span class="select-drop-span">系统满单:</span>
            <div class="cp-cascader-main" style="width: 117px">
              <el-cascader
                class="g-el-cascader"
                popper-class="g-el-cascader-popper"
                size="small"
                :options="sysList"
                v-model="params.activity"
                :props="{
                  value: 'id',
                  label: 'name',
                }"
                :show-all-levels="false"
              ></el-cascader>
            </div>
          </div> -->
          <span style="margin-left: 18px">发起人：</span>
          <input
            v-model.trim="params.playerName"
            class="activity-member-input center-center p-x-4"
            style="height: 30px"
          />
          <div
            class="cp-button-main activity-search-btn"
            v-loading="loading"
            @click="lotteryBetsOrder"
          >
            <!---->
            查询
          </div>
        </div>
        <div
          title="青铜：中奖金额【1000 - 10000】，黄金：中奖金额【10000 - 100000】，钻石：中奖金额【100000 - 1000000】，星耀：中奖金额【1000000 - 10000000】，王者：中奖金额达 10000000及以上。"
          class="activity-state"
        >
          <div class="el-image activity-state-image">
            <img src="/static/activity/1.png" class="el-image__inner" /><!---->
          </div>
          <div>段位说明</div>
        </div>
      </div>
      <div class="activity-table-container no-grow">
        <table rules="cols" class="activity-table">
          <tr align="center" style="background: rgb(50, 22, 11)">
            <th height="50">游戏</th>
            <th height="50">方案金额</th>
            <th height="50">保底</th>
            <th height="50">剩余</th>
            <th height="50">中奖金额</th>
            <th height="50">进度</th>
            <th height="50">参与人数</th>
            <th height="50">发起人</th>
            <th height="50">战绩段位</th>
            <th height="50">截止时间</th>
            <th height="50">操作</th>
          </tr>
          <tr
            v-for="(item, index) in tableData.results"
            :key="index"
            align="center"
            class="activity-tr-o"
            style="font-size: 13px"
          >
            <td height="50" @click="goDetail(item.id)">
              <a
                href="#/order/detail/3a164b7dc8a7b4a41be288ef63abccc6/co"
                class="common_table_link"
                title="查看订单"
                target="_blank"
                >{{ item.lotteryName }}
              </a>
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">
              ¥{{ divide(item.money) }}
            </td>
            <td height="50">
              <div>
                <div style="color: rgb(255, 216, 0); margin-top: 3px">
                  ¥{{ item.betCountMin }}
                </div>
              </div>
            </td>
            <td height="50">
              ¥{{ item.sellCount }}<span style="color: rgb(255, 216, 0)"></span>
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">
              ¥{{ divide(item.moneyIncome) }}
            </td>
            <td height="50">
              <div style="width: 114px">
                <p>{{ `${item.p}%` }}</p>
                <el-progress
                  class="g-el-progress"
                  :stroke-width="12"
                  :show-text="false"
                  :percentage="item.p"
                  define-back-color="#a84f2b"
                  color="#ffa92d"
                ></el-progress>
              </div>

              <!-- <div style="margin-bottom: 3px">{{ item.p }}</div>
              <div class="cp-progress-main">
                <div class="cp-progress-bar" style="width: 80px; height: 10px">
                  <div class="cp-progress" style="flex: 100 1 0%"></div>
                  <div
                    class="cp-left"
                    :style="{
                      flex: `0 1 ${item.p}`,
                    }"
                  ></div>
                </div>
              </div> -->
            </td>
            <td height="50">{{ item.playerCount }}</td>
            <td height="50">{{ item.playerName }}</td>
            <td height="50">
              <div class="score-record-main">
                <div class="score-record-item">
                  <div class="el-image score-record-image">
                    <img
                      :src="getTier(divide(item.moneyBingo))"
                      class="el-image__inner"
                    />
                  </div>
                  <!-- <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    class="score-record-num"
                  >
                    <text
                      text-anchor="middle"
                      dominant-baseline="middle"
                      x="50%"
                      y="50%"
                      fill="#e4e4e4"
                      class="cp-text"
                      style="font-size: 12px"
                    >
                      5
                    </text>
                  </svg> -->
                </div>
              </div>
            </td>
            <td height="50">{{ $dayjsTime(item.finishTime) }}</td>
            <td height="50">
              <div
                v-if="item.sellCount && +item.status === 0"
                style="padding: 3px 0px"
              >
                <div>
                  <input
                    @input="validateInput(item, $event)"
                    v-model.trim="item.clientMoney"
                    class="activity-cell-buy-input"
                  />
                  <span>元</span>
                </div>
                <div class="activity-cell-buy">
                  <div
                    class="cp-button-main activity-cell-buy-btn"
                    @click="buyPlayer(item.clientMoney, item)"
                  >
                    购买
                  </div>
                  <div
                    class="cp-button-main activity-cell-buy-btn"
                    @click="buyPlayer('all', item)"
                  >
                    全包
                  </div>
                </div>
              </div>
              <p v-else>{{ getStatus(+item.status) }}</p>
            </td>
          </tr>
        </table>
      </div>
      <div class="p-b-32 center-center">
        <el-pagination
          class="g-el-pagination"
          @current-change="handleCurrentChange"
          :current-page="params.pageNo"
          :page-size="params.pageSize"
          layout="total, prev, pager, next"
          :total="
            tableData.totalCount > totalCount
              ? totalCount
              : tableData.totalCount
          "
        >
        </el-pagination>
      </div>
    </div>
    <tipsDialog ref="$tipsDialog" />
    <tipsDialog ref="$buyDialog" @sure="mySure">
      <ul>
        <li>请确认您的认购信息</li>
        <li>游戏名称：{{ item.lotteryName }}</li>
        <li>方案编号：{{ item.orderId }}</li>
        <li>认购金额：￥{{ item.clientMoney }}</li>
      </ul>
    </tipsDialog>
  </div>
</template>

<script>
import userApi from '@/api/user';
const initData = () => {
  return {
    ftype: -1,
    playerName: '',
    lotteryId: -1,
    betCountMin: -1,
    pageNo: 1,
    pageSize: 10,
  };
};
export default {
  name: 'AppTopBar',
  data() {
    return {
      loading: false,
      params: {
        ...initData(),
      },
      countList: [
        {
          name: '全部',
          id: -1,
        },
        {
          name: '无保底',
          id: 0,
        },
        {
          name: '部分保底',
          id: 1,
        },
        {
          name: '全额保底',
          id: 2,
        },
      ],
      sysList: [
        {
          name: '全部',
          id: -1,
        },
        {
          name: '是',
          id: 1,
        },
        {
          name: '否',
          id: 0,
        },
      ],
      tableData: {
        totalCount: 0,
        results: [],
      },
      item: {},
    };
  },
  computed: {
    totalCount() {
      return 100 * this.params.pageSize;
    },
    cat() {
      return [
        {
          id: -1,
          lotteryName: '全部',
        },
        ...this.$store.state.cat,
      ];
    },
  },
  methods: {
    goDetail(id) {
      window.open(`#/order/detail/${id}`);
    },
    getStatus(v) {
      return (this.$store.state.status.find((doc) => doc.id === v) || {}).name;
    },
    getTier(amount) {
      const tiers = [
        {
          tier: '青铜',
          src: require('@/assets/img/level/1.png'),
          min: 1000,
          max: 10000,
        },
        {
          tier: '黄金',
          min: 10000,
          max: 100000,
          src: require('@/assets/img/level/2.png'),
        },
        {
          tier: '钻石',
          min: 100000,
          max: 1000000,
          src: require('@/assets/img/level/3.png'),
        },
        {
          tier: '星耀',
          min: 1000000,
          max: 10000000,
          src: require('@/assets/img/level/4.png'),
        },
        {
          tier: '王者',
          min: 10000000,
          max: Infinity,
          src: require('@/assets/img/level/5.png'),
        },
      ];

      for (const tier of tiers) {
        if (amount >= tier.min && amount < tier.max) {
          return tier.src;
        }
      }
      return tiers[0].src; // 如果数字不在任何范围内
    },
    handleCurrentChange(val) {
      this.params.pageNo = val;
      this.lotteryBetsOrder();
    },
    buyPlayer(price, item) {
      this.item = item;
      if (price === 'all') {
        this.item.clientMoney = this.item.sellCount;
        this.$refs.$buyDialog.open();
        return;
      }
      if (!price) {
        this.$refs.$tipsDialog.open('请输入购买金额');
        return;
      }
      if (price > this.item.sellCount) {
        this.$refs.$tipsDialog.open('购买金额不能大于剩余金额');
        return;
      }
      this.$refs.$buyDialog.open();
    },
    async mySure() {
      const [err] = await userApi.lotteryBetsJoin({
        betId: this.item.id,
        betCount: this.item.clientMoney,
      });
      if (err) return;
      this.$message.success('购买成功');
      this.params = {
        ...initData(),
      };
      this.lotteryBetsOrder();
    },
    validateInput(item, v) {
      let value = v.target.value.replace(/\D/g, '');
      if (value) {
        const numericValue = parseInt(value, 10);
        value = Math.min(Math.max(numericValue, 1), item.sellCount);
      }
      item.clientMoney = value;
    },
    async lotteryBetsOrder() {
      if (this.loading) return;
      this.loading = true;
      const sendData = {
        ...this.params,
      };

      if (Array.isArray(sendData.lotteryId)) {
        sendData.lotteryId = +sendData.lotteryId[sendData.lotteryId.length - 1];
      }
      //删除-1
      for (let key in sendData) {
        if (sendData[key] === -1) {
          delete sendData[key];
        }
      }
      const [err, res] = await userApi.lotteryBetsOrder(sendData);
      this.loading = false;
      if (err) return;
      res.data.results.forEach((v) => {
        v.betCountCurr = v.betCountCurr / 100;
        v.betTotal = v.betTotal / 100;
        const curMoney = v.betCountCurr;
        const fix = (curMoney / v.betTotal).toFixed(2);
        v.p = parseInt(fix * 100);
        v.clientMoney = '';
        //剩余
        v.sellCount = v.betTotal - curMoney;
      });
      this.tableData = res.data;
    },
  },
  async created() {
    let docCat = this.$store.state.cat.find((v) => v.list.length);
    if (!docCat) {
      await this.$store.dispatch('playerLotteryList');
    }
    this.lotteryBetsOrder();
  },
};
</script>
<style lang="scss" scoped>
.activity-table {
  tr:nth-child(2n + 1) {
    background: #5d3324;
  }
}
</style>
