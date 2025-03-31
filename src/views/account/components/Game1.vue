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
      <div class="align-center" style="margin-left: 18px">
        <span class="select-category-span">游戏名称:</span>
        <div style="width: 117px">
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
      <div class="align-center" style="margin-left: 18px">
        <span class="select-drop-span">状态:</span>
        <div style="width: 117px">
          <el-cascader
            class="g-el-cascader"
            popper-class="g-el-cascader-popper"
            size="small"
            :options="$store.state.openStatus"
            v-model="params.status"
            :props="{
              value: 'id',
              label: 'name',
            }"
            :show-all-levels="false"
          ></el-cascader>
        </div>
      </div>
      <div
        class="cp-button-main activity-search-btn"
        v-loading="loading"
        @click="handleCurrentChange(1)"
      >
        查询
      </div>
    </div>
    <div class="recharge-table-container p-t-0">
      <!-- <el-table class="g-el-table" border :data="tableData.results">
        <el-table-column prop="orderNo" label="游戏">
          <template slot-scope="scope">
            <p
              @click="goDetail(scope.row.id)"
              style="text-decoration: underline; cursor: pointer"
            >
              {{ getName(scope.row.lotteryId) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="方案金额">
          <template slot-scope="scope">
            ￥{{ divide(scope.row.money) }}
          </template>
        </el-table-column>
        <el-table-column prop="moneyIncome" label="方案奖金">
          <template slot-scope="scope">
            ￥{{ divide(scope.row.moneyIncome) }}
          </template>
        </el-table-column>
        <el-table-column prop="myBetCount" label="我的认购">
          <template slot-scope="scope">
            ￥{{ divide(scope.row.myBetCount) }}
          </template>
        </el-table-column>
        <el-table-column prop="myMoneyIncome" label="我的奖金">
          <template slot-scope="scope">
            ￥{{ divide(scope.row.myMoneyIncome) }}
          </template>
        </el-table-column>
        <el-table-column prop="p" label="完成进度">
          <template slot-scope="scope">
            <div>
              <p>{{ `${scope.row.p}%` }}</p>
              <el-progress
                class="g-el-progress"
                :stroke-width="12"
                :show-text="false"
                :percentage="scope.row.p"
                define-back-color="#a84f2b"
                color="#ffa92d"
              ></el-progress>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="playerName" label="发起人"></el-table-column>
        <el-table-column prop="status" label="订单状态">
          <template slot-scope="scope">
            {{ getStatus(scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column prop="openStatus" label="中奖状态">
          <template slot-scope="scope">
            {{ getOpenStatus(scope.row.openStatus) }}
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="购买时间">
          <template slot-scope="scope">
            {{ $dayjsTime(scope.row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span
              style="color: gold; text-decoration: underline; cursor: pointer"
              @click="goDetail(scope.row.id)"
              >查看</span
            >
          </template>
        </el-table-column>
      </el-table> -->
      <table rules="all" align="center" class="recharge-table m-t-0">
        <tr align="center" class="recharge-table-header">
          <th height="40" width="100">游戏</th>
          <th height="40" width="80">方案金额</th>
          <th height="40" width="80">方案奖金</th>
          <th height="40">我的认购</th>
          <th height="40">我的奖金</th>
          <th height="40" width="80">完成进度</th>
          <th height="40" width="80">发起人</th>
          <th height="40">订单状态</th>
          <th height="40">中奖状态</th>
          <th height="40" width="150">购买时间</th>
          <th height="40">操作</th>
        </tr>
        <tr
          align="center"
          v-for="(item, idx) in tableData.results"
          :key="idx"
          class="recharge-table-row"
        >
          <td height="40">
            <p
              @click="goDetail(item.id)"
              style="text-decoration: underline; cursor: pointer"
            >
              {{ getName(item.lotteryId) }}
            </p>
          </td>
          <td height="40">￥{{ divide(item.money) }}</td>
          <td height="40">￥{{ divide(item.moneyIncome) }}</td>
          <td height="40">￥{{ divide(item.myBetCount) }}</td>
          <td height="40">￥{{ divide(item.myMoneyIncome) }}</td>
          <td height="40">
            <div>
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
          </td>
          <td height="40">
            <p class="els">{{ item.playerName }}</p>
          </td>
          <td height="40">{{ getStatus(item.status) }}</td>
          <td height="40">{{ getOpenStatus(item.openStatus) }}</td>
          <td height="40">{{ $dayjsTime(item.createdAt) }}</td>
          <td
            height="40"
            style="color: gold; text-decoration: underline; cursor: pointer"
            @click="goDetail(item.id)"
          >
            查看
          </td>
        </tr>
      </table>
      <div class="p-t-32 center-center">
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
        lotteryId: -1,
        status: -1,
        pageNo: 1,
        pageSize: 10,
      },
    };
  },
  computed: {
    catList() {
      const list = [];
      this.cat.forEach((item) => {
        if (item.list) {
          item.list.forEach((i) => {
            list.push(i);
          });
        }
      });
      return list;
    },
    cat() {
      console.log(this.$store.state.cat);
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
      return (this.$store.state.status.find((doc) => +doc.id === +v) || {})
        .name;
    },
    getOpenStatus(v) {
      const item = this.$store.state.openStatus.find((d) => d.id === v);
      return item ? item.name : '';
    },
    getName(id) {
      const item = this.catList.find((v) => v.id === id);
      return item ? item.lotteryName : '';
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
        sendData.start = this.date[0];
        sendData.end = this.date[1];
      }
      if (Array.isArray(sendData.lotteryId)) {
        sendData.lotteryId = +sendData.lotteryId[sendData.lotteryId.length - 1];
      }
      if (Array.isArray(sendData.status)) {
        sendData.status = +sendData.status[sendData.status.length - 1];
      }
      //删除-1
      for (let key in sendData) {
        if (sendData[key] === -1) {
          delete sendData[key];
        }
      }
      const [err, res] = await userApi.lotteryMyOrderTogether(sendData);
      this.loading = false;
      if (err) return;
      res.data.results.forEach((v) => {
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
  created() {
    this.lotteryBetsOrder();
  },
};
</script>
<style scoped lang="scss">
.g-el-table {
  ::v-deep {
    td {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
}
</style>
