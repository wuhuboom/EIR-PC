<template>
  <div class="recharge-main m-t-0 p-t-0">
    <div class="recharge-title align-center">
      <span class="no-shrink">用户名：</span>
      <input v-model.trim="params.playerName" class="fund-input" />
      <div
        class="cp-button-main activity-search-btn"
        v-loading="loading"
        @click="handleCurrentChange(1)"
      >
        查询
      </div>
    </div>
    <div class="recharge-table-container p-t-0">
      <el-table class="g-el-table" border :data="tableData.results">
        <el-table-column prop="playerName" label="用户"> </el-table-column>
        <el-table-column prop="money" label="提现金额">
          <template slot-scope="scope">
            <span>{{ divide(scope.row.money) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="申请时间">
          <template slot-scope="scope">
            <span>{{ $dayjsTime(scope.row.createdAt) }}</span>
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
      tableData: {
        totalCount: 0,
        results: [],
      },
      date: '',
      loading: false,
      params: {
        playerName: '',
        pageNo: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    //"status": 状态 1待审核’* 2已审核’* 3失败’* 4提现成功’* 5代付中’* 6代付失败* 8.冲正,
    statusType(status) {
      switch (status) {
        case 1:
          return '待审核';
        case 2:
          return '已审核';
        case 3:
          return '失败';
        case 4:
          return '提现成功';
        case 5:
          return '代付中';
        case 6:
          return '代付失败';
        case 8:
          return '冲正';
        default:
          return '';
      }
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
      const [err, res] = await userApi.groupWithdrawal(sendData);
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
