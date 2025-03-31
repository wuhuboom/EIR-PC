<template>
  <div>
    <div class="recharge-title align-center">
      <span class="no-shrink">方案编号：</span>
      <input v-model.trim="params.orderId" class="fund-input m-r-16" />
      <div
        class="cp-button-main activity-search-btn"
        v-loading="loading"
        @click="handleCurrentChange(1)"
      >
        查询
      </div>
    </div>
    <div class="m-t-16">
      <el-table class="g-el-table" border :data="tableData.results">
        <el-table-column prop="orderId" label="方案号"> </el-table-column>
        <!-- <el-table-column prop="fromUser" label="昵称"> </el-table-column> -->
        <el-table-column prop="username" label="用户"> </el-table-column>
        <el-table-column prop="money" label="认购金额">
          <template slot-scope="scope">
            <span>{{ divide(scope.row.money) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderMoney" label="订单金额">
          <template slot-scope="scope">
            <span>{{ divide(scope.row.orderMoney) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所占百分比">
          <template slot-scope="scope">
            <span>{{
              `${((scope.row.money / scope.row.orderMoney) * 100).toFixed(2)}%`
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="认购时间">
          <template slot-scope="scope">
            <span>{{ $dayjsTime(scope.row.createdAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="moneyIncome" label="中奖金额">
          <template slot-scope="scope">
            <span>{{ divide(scope.row.moneyIncome) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span>{{ statusType(scope.row.status) }}</span>
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
      loading: false,
      params: {
        orderId: '',
        pageNo: 1,
        pageSize: 10,
      },
      tableData: {
        totalCount: 0,
        results: [],
      },
    };
  },
  props: {
    row: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    statusType(status) {
      switch (status) {
        case 0:
          return '待开奖';
        case 1:
          return '已中';
        case 2:
          return '未中';
      }
    },
    handleCurrentChange(val) {
      this.params.pageNo = val;
      this.lotteryBetsOrder();
    },
    getNname: () => {},
    async lotteryBetsOrder() {
      console.log(this.row);
      if (this.loading) return;
      this.loading = true;
      const sendData = {
        ...this.params,
        id: this.row.id,
      };
      //删除空参数
      for (const key in sendData) {
        if (sendData[key] === '') {
          delete sendData[key];
        }
      }
      const [err, res] = await userApi.groupBets(sendData);
      this.loading = false;
      if (err) return;
      // 模拟 res.data.results 数据
      // res.data.results = [
      //   {
      //     orderId: "202107010001",
      //     fromUser: "admin",
      //     playerName: "test",
      //     money: 96.669,
      //     orderMoney: 1000,
      //     createdAt: 1625097600000,
      //     moneyIncome: 0,
      //     status: 0,
      //   },
      // ];
      this.tableData = res.data;
    },
  },
  created() {
    this.lotteryBetsOrder();
  },
};
</script>
<style scoped lang="scss">
::v-deep {
  [role='dialog'] {
    background-color: #623525;

    .el-dialog__body,
    .el-dialog__title {
      color: rgb(253, 217, 155);
    }
  }
}
</style>
