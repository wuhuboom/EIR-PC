<template>
  <div class="account-detail-main">
    <div class="my-account-welcome" style="margin-left: 10px">
      您好，尊敬的用户：
      <span class="my-account-span">{{ user.username }}</span
      >，您当前的总余额如下：
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
            >可以提现：{{ divide(user.balanceWithdrawCurr) }}元</span
          >
        </div>
        <div class="account-detail-amount" style="background: rgb(0, 150, 255)">
          <img
            src="/static/accountCenter/money.png"
            class="account-detail-image"
          />
        </div>
        <div class="account-detail-bar" style="background: rgb(0, 150, 255)">
          <span style="margin-left: 10px"
            >可以使用：{{ divide(user.balance) }}元</span
          >
        </div>
        <div
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
        </div>
        <div class="account-detail-amount-bg"></div>
        <div
          class="account-detail-amount-bg"
          style="background: rgb(0, 150, 255); left: 280px"
        ></div>
        <div
          class="account-detail-amount-bg"
          style="background: rgb(133, 156, 156); left: 540px; width: 20px"
        ></div>
      </div>
    </div>
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
      <div class="align-center" style="margin-left: 18px; width: 180px">
        <span class="select-drop-span no-shrink">类型:</span>
        <el-select
          class="g-el-cascader"
          size="small"
          v-model="params.type"
          clearable
          placeholder="请选择"
          popper-class="g-el-cascader-popper"
        >
          <el-option
            v-for="item in tabSimpleList"
            :key="item.id"
            :label="item.text"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
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
        <el-table-column prop="orderNo" label="订单号" width="294">
        </el-table-column>
        <el-table-column prop="orderNo" label="资金类型">
          <template slot-scope="scope">
            <span>{{ statusType(scope.row.balanceChangeType) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="changeMoney" label="账变金额">
          <template slot-scope="scope">
            <span>{{ divide(scope.row.changeMoney) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dnedMoney" label="账变后金额">
          <template slot-scope="scope">
            <span>{{ divide(scope.row.dnedMoney) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="日期" width="166">
          <template slot-scope="scope">
            <span>{{ $dayjsTime(scope.row.createdAt) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="remark" label="备注">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column> -->
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
      loading: false,
      date: '',
      params: {
        orderId: '',
        type: '',
        status: '',
        pageNo: 1,
        pageSize: 8,
      },
      tableData: {
        totalCount: 0,
        results: [],
      },
    };
  },
  computed: {
    tabSimpleList() {
      return this.$store.state.tabSimpleList;
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    statusType(type) {
      return this.tabSimpleList.find((item) => +item.id === +type)?.text;
    },
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
      const [err, res] = await userApi.balanceChangeReq(query);
      if (err) {
        return;
      }
      this.tableData = res.data;
    },
  },
  created() {
    this.$store.dispatch('getInfo');
    this.lotteryBetsOrder();
  },
};
</script>
<style scoped lang="scss"></style>
