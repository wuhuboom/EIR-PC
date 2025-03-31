<template>
  <div class="account-detail-main">
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

      <span style="margin-left: 18px" class="no-shrink">方案编号：</span>
      <input v-model.trim="params.orderId" class="fund-input" />
      <div
        class="cp-button-main activity-search-btn"
        v-loading="loading"
        @click="handleCurrentChange(1)"
      >
        <!---->
        查询
      </div>
    </div>

    <div class="recharge-table-container p-t-0">
      <!-- 余额变动记录,createdAt:日期,username:用户名
      ,changeMoney:账变前金额,dnedMoney:账变后金额, orderNo:订单编号,remark备注 -->
      <el-table class="g-el-table" border :data="tableData.results">
        <el-table-column prop="orderNo" label="订单号" width="280">
        </el-table-column>
        <!-- <el-table-column prop="用户名" label="用户名"> </el-table-column> -->
        <el-table-column prop="moneySys" label="充值金额">
          <template slot-scope="scope">
            <span>{{ divide(scope.row.moneySys) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="moneyDiscount" label="赠送金额">
          <template slot-scope="scope">
            <span>{{ divide(scope.row.moneyDiscount) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="日期" width="166">
          <template slot-scope="scope">
            <span>{{ $dayjsTime(scope.row.createdAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="cp-pagination-main" style="margin-top: 40px">
        <el-pagination
          class="g-el-pagination"
          @current-change="handleCurrentChange"
          :current-page="params.pageNo"
          :page-size="params.pageSize"
          layout="total, prev, pager, next"
          :total="tableData.totalCount"
        >
        </el-pagination>
      </div>
      <div class="with-draw-state p-l-8 p-r-8">
        温馨提示： <br />
        1.为提高查询速度，网站只提供最近一个月交易明细查询 <br />
        2.如您遇到其他任何问题，请您联系在线客服进行疑难解答 <br />
        3.如果您添加了预付款，银行账户钱扣了，账户还没有加上，请及时与我们联系，我们将第一时间为您处理
      </div>
    </div>
  </div>
</template>

<script>
import userApi from '@/api/user';
export default {
  name: 'AccountCenter',
  data() {
    return {
      //       21下级充值返利 23邀请奖励 24首充奖励
      // 25活动 26次充奖励 27固定日
      // 28邀请首充奖励
      // 38.累计充值返利
      tabSimpleList: [
        { id: '', text: '全部' },
        { id: 21, text: '下级充值返利' },
        { id: 23, text: '邀请奖励' },
        { id: 24, text: '首充奖励' },
        { id: 25, text: '活动' },
        { id: 26, text: '次充奖励' },
        { id: 27, text: '固定日' },
        { id: 28, text: '邀请首充奖励' },
        { id: 38, text: '累计充值返利' },
      ],
      loading: false,
      date: '',
      params: {
        orderId: '',
        type: '',
        status: '',
        pageNo: 1,
        pageSize: 4,
      },
      tableData: {
        totalCount: 0,
        results: [],
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.params.pageNo = val;
      this.lotteryBetsOrder();
    },
    async lotteryBetsOrder() {
      const query = {
        ...this.params,
      };
      //begin end
      if (this.date) {
        query.begin = this.date[0];
        query.end = this.date[1];
      }
      const [err, res] = await userApi.balanceChangeReward(query);
      if (err) {
        return;
      }
      this.tableData = res.data;
    },
  },
  created() {
    this.lotteryBetsOrder();
  },
};
</script>
<style scoped lang="scss"></style>
