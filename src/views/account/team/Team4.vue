<template>
  <div class="recharge-main m-t-0 p-t-0">
    <div class="recharge-table-container p-t-0">
      <el-table class="g-el-table" border :data="tableData.results">
        <!-- "id": 78,
    "createdAt": 日期,
    "orderNo": "订单号",
    "username": "用户",
    "changeMoney": 金额,
    "balanceChangeType": 类型,参与账变类型, -->
        <el-table-column prop="createdAt" label="日期">
          <template slot-scope="scope">
            <span>{{ $dayjsTime(scope.row.createdAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderNo" label="订单号"> </el-table-column>
        <el-table-column prop="username" label="用户"> </el-table-column>
        <el-table-column prop="changeMoney" label="金额">
          <template slot-scope="scope">
            <span
              >{{ `${scope.row.changeMoney}`.includes('-') ? '' : '+'
              }}{{ divide(scope.row.changeMoney) }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="balanceChangeType" label="类型">
          <template slot-scope="scope">
            <span>{{ statusType(+scope.row.balanceChangeType) }}</span>
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
    </div>
  </div>
</template>

<script>
import userApi from '@/api/user';
export default {
  name: 'AccountCenter',
  data() {
    return {
      tableData: {
        totalCount: 0,
        results: [],
      },
      date: '',
      loading: false,
      params: {
        pageNo: 1,
        pageSize: 10,
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
    statusType(v) {
      return this.tabSimpleList.find((item) => item.id === v).text;
    },
    handleCurrentChange(val) {
      this.params.pageNo = val;
      this.lotteryBetsOrder();
    },
    getNname: () => {},
    async lotteryBetsOrder() {
      if (this.loading) return;
      this.loading = true;
      const sendData = {
        ...this.params,
      };
      const [err, res] = await userApi.groupBill(sendData);
      this.loading = false;
      if (err) return;
      this.tableData = res.data;
    },
  },
  created() {
    this.lotteryBetsOrder();
  },
};
</script>
<style scoped lang="scss"></style>
