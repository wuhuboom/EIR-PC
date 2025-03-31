<template>
  <div class="recharge-main">
    <div
      class="custom-record-tabs"
      style="margin-left: 15px; margin-bottom: 15px; margin-right: 15px"
    >
      <div
        class="custom-record-tab"
        v-for="(item, idx) in navs"
        :key="idx"
        @click="changeTab(item.id)"
        :class="{ 'custom-record-tab-active': tab == item.id }"
      >
        {{ item.name }}
      </div>
    </div>
    <div>
      <div v-if="tab == 0">
        <div class="board-list">
          <div class="board shadow2">
            <p>待转出总金额</p>
            <p>￥{{ data.canOut }}</p>
          </div>
          <div class="board shadow3">
            <p>待领取总返利</p>
            <p>￥{{ data.interestCurr }}</p>
          </div>
          <div class="board shadow1">
            <p>已领取总返利</p>
            <p>￥{{ data.interestOut }}</p>
          </div>
        </div>
        <div style="padding: 0px 10px">
          <ul class="info-save">
            <li>
              <p>利率</p>
              <p
                style="
                  color: rgb(255, 255, 255);
                  font-weight: 700;
                  font-size: 16px;
                "
              >
                {{ config.rate }}%
              </p>
            </li>
            <li>
              <p>最低转入金额</p>
              <p
                style="
                  font-weight: 700;
                  color: rgb(255, 255, 255);
                  font-size: 16px;
                "
              >
                ￥{{ config.min }}
              </p>
            </li>
            <li>
              <p>当前最多转入金额</p>
              <p
                style="
                  font-weight: 700;
                  color: rgb(255, 255, 255);
                  font-size: 16px;
                "
              >
                ￥{{ data.canTrans }}
              </p>
            </li>
            <li>
              <p class="enter-input">
                <input
                  v-model.trim="money"
                  placeholder="请输入转入金额"
                  type="text"
                  class="input-account"
                  @blur="vaidNum"
                /><span style="padding-left: 6px">元</span>
              </p>
              <tipsDialog @sure="sureRecharge" ref="$recharge" />
              <div
                class="recharge-btn"
                @click="recharge"
                style="cursor: pointer; width: 80px; background-size: 100% 100%"
              >
                转入
              </div>
              <div
                class="recharge-btn btn-search"
                @click="withdraw"
                style="
                  cursor: pointer;
                  width: 80px;
                  background-image: linear-gradient(
                    to right,
                    rgb(255, 242, 0),
                    rgb(255, 127, 39)
                  );
                  margin-right: 10px;
                "
              >
                转出
              </div>
            </li>
          </ul>
        </div>
        <div style="padding: 0px 25px">
          <div style="display: flex; align-items: center">
            <p class="desc"></p>
            <span class="font-700">余额宝说明</span>
          </div>

          <div style="white-space: pre-wrap; color: rgb(255, 255, 255)">
            1.用户可将当前账户余额转入余额宝产生收益，收益为转入金额的{{
              config.rate
            }}% <br />
            2.需完成百分百待消费才能转入余额宝 <br />
            3.转入余额宝金额次日才会有收益，转出金额不能直接提款需消费转出金额100%流水才能提款
          </div>
        </div>
        <!---->
      </div>
      <div v-if="tab == 1" class="content-bg page-color">
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
            <span class="select-drop-span">状态:</span>
            <div style="width: 117px">
              <el-cascader
                class="g-el-cascader"
                popper-class="g-el-cascader-popper"
                size="small"
                :options="statusList.filter((item) => item.id !== 2)"
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
            <!---->
            查询
          </div>
        </div>
        <div class="m-x-16">
          <el-table class="g-el-table" border :data="tableData.results">
            <el-table-column prop="orderId" label="余额宝编号" width="180">
            </el-table-column>
            <el-table-column label="返点模式">
              <template> 默认 </template>
            </el-table-column>
            <el-table-column prop="money" label="转入金额">
              <template slot-scope="scope">
                <span>￥{{ divide(scope.row.money) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="rate" label="利率">
              <template slot-scope="scope"> {{ scope.row.rate }}% </template>
            </el-table-column>
            <el-table-column prop="currIncome" label="利息">
              <template slot-scope="scope">
                <span
                  >￥{{
                    divide(
                      +scope.row.status === 0
                        ? scope.row.currIncome
                        : scope.row.outIncome
                    )
                  }}</span
                >
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                {{
                  scope.row.status == 0
                    ? '生息中'
                    : scope.row.status == 1
                    ? '已转出'
                    : '待转出'
                }}
              </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="转入时间" width="160">
              <template slot-scope="scope">
                <span>{{ $dayjsTime(scope.row.createdAt) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="finishTime" label="转出时间" width="160">
              <template slot-scope="scope">
                <span>{{
                  scope.row.finishTime ? $dayjsTime(scope.row.finishTime) : ''
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <div
                  v-if="+scope.row.status !== 1"
                  class="recharge-btn btn-search m-x-0"
                  @click="withdrawOne(scope.row)"
                  style="
                    cursor: pointer;
                    width: 80px;
                    background-image: linear-gradient(
                      to right,
                      rgb(255, 242, 0),
                      rgb(255, 127, 39)
                    );
                    margin-right: 10px;
                  "
                >
                  转出
                </div>
                <span v-else> -- </span>
              </template>
            </el-table-column>
          </el-table>
        </div>

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
  </div>
</template>

<script>
import userApi from '@/api/user';
export default {
  name: 'AccountCenter',
  data() {
    return {
      statusList: [
        {
          id: -1,
          name: '全部',
        },
        {
          id: 0,
          name: '生息中',
        },
        {
          id: 1,
          name: '已转出',
        },
        {
          id: 2,
          name: '待转出',
        },
      ],
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
      navs: [
        {
          name: '余额宝',
          id: 0,
        },
        {
          name: '明细记录',
          id: 1,
        },
      ],
      tab: 0,
      config: {
        rate: 0,
        min: 0,
      },
      data: {},
      money: '',
    };
  },
  methods: {
    changeTab(id) {
      this.tab = id;
      if (id === 1) {
        this.lotteryBetsOrder();
      }
    },
    handleCurrentChange(val) {
      this.params.pageNo = val;
      this.lotteryBetsOrder();
    },
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
      console.log(sendData, userApi.safeList);
      const [err, res] = await userApi.safeList(sendData);
      this.loading = false;
      if (err) return;
      this.tableData = res.data;
    },
    recharge() {
      if (!this.money) {
        this.$message.error('请输入金额');
        return;
      }
      if (this.money < this.config.min) {
        this.$message.error('最低转入金额为' + this.config.min + '元');
        return;
      }
      if (this.money > this.data.canTrans) {
        this.$message.error('当前最多转入金额为' + this.data.canTrans + '元');
        return;
      }
      this.$refs.$recharge.open(`确定要转入${this.money}元到余额宝吗？`);
    },
    async withdraw() {
      if (!this.data.canOut) {
        this.$message.error(`待转出总金额为${this.data.canOut}元`);
        return;
      }
      const [err, res] = await userApi.safeToBalanceAll();
      if (err) return;
      this.money = '';
      console.log(res);
      this.$message.success('转出成功');
      this.initPage();
    },
    //确定转出吗
    comfire() {
      return new Promise((resolve) => {
        this.$confirm('确定要转出吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
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
    async withdrawOne(row) {
      const status = await this.comfire();
      if (!status) return;
      const [err] = await userApi.safeToBalance({ id: row.id });
      if (err) return;
      this.$message.success('转出成功');
      this.handleCurrentChange(1);
      this.safeData();
    },
    async sureRecharge() {
      const [err, res] = await userApi.safeTransfer({
        money: this.money,
      });
      if (err) return;
      console.log(res);
      this.money = '';
      this.$message.success('转入成功');
      this.initPage();
    },
    vaidNum() {
      if (this.money === '') return;
      let num = this.money.replace(/[^\d.]/g, '');
      num = parseInt(num);
      this.money = num;
    },
    async getConfig() {
      const [err, res] = await userApi.fbConf();
      if (err) return;
      this.config = res.data;
    },
    async safeData() {
      const [err, res] = await userApi.safeData();
      if (err) return;
      for (let key in res.data) {
        res.data[key] = +this.divide(res.data[key]);
      }
      this.data = res.data;
    },
    initPage() {
      this.getConfig();
      this.safeData();
    },
  },

  created() {
    this.initPage();
  },
};
</script>
<style scoped lang="scss">
.recharge-table {
  text-align: center;
}
.enter-input {
  font-size: 12px;
  .input-account {
    width: 88px;
    color: #333;
    &::placeholder {
      color: #333;
    }
  }
}
</style>
