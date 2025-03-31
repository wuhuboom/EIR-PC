<template>
  <div class="recharge-main m-t-0 p-t-0">
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
        v-loading="loading"
        @click="handleCurrentChange(1)"
      >
        查询
      </div>
    </div>
    <div class="recharge-table-container p-t-0">
      <!-- <th height="40">红包主题</th>
              <th height="40">红包金额</th>
              <th height="40">红包数量</th>
              <th height="40">领取金额</th>
              <th height="40">剩余金额</th>
              <th height="40">领取数量</th>
              <th height="40">剩余数量</th>
              <th height="40">红包状态</th> 0.待领取 1.已抢光 2已过期
              <th height="40">是否已退款</th>
              <th height="40">派发时间</th> -->
      <el-table class="g-el-table" border :data="tableData.results">
        <el-table-column prop="describes" label="红包主题"> </el-table-column>
        <el-table-column prop="money" label="红包金额">
          <template slot-scope="scope">
            <span>{{ divide(scope.row.money) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="quantity" label="红包数量"> </el-table-column>
        <el-table-column prop="receiveMoney" label="已领取金额">
          <template slot-scope="scope">
            <span>{{ divide(scope.row.moneyReceive) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="moneySurplus" label="剩余金额">
          <template slot-scope="scope">
            <span>{{ divide(scope.row.money - scope.row.moneyReceive) }}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="quantityReceive" label="已领取数量">
          <template slot-scope="scope">
            <span>{{ scope.row.quantityReceive }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="quantitySurplus" label="剩余数量">
          <template slot-scope="scope">
            <span>{{ scope.row.quantity - scope.row.quantityReceive }}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="status" label="红包状态">
          <template slot-scope="scope">
            <span>{{ statusType(scope.row.status) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="isRefund" label="是否已退款">
          <template slot-scope="scope">
            <span>{{ scope.row.statusRefund ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="派发时间">
          <template slot-scope="scope">
            <span>{{ $dayjsTime(scope.row.createdAt) }}</span>
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
        pageSize: 12,
      },
    };
  },
  methods: {
    statusType(type) {
      switch (type) {
        case 0:
          return '待领取';
        case 1:
          return '已抢光';
        case 2:
          return '已过期';
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
      if (Array.isArray(this.date) && this.date.length) {
        sendData.begin = this.date[0];
        sendData.end = this.date[1];
      }
      const [err, res] = await userApi.redSend(sendData);
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
