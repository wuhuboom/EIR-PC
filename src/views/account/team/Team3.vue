<template>
  <div class="recharge-main m-t-0 p-t-0">
    <div class="m-l-12 font16 p-t-16 m-r-12 p-b-16 p-l-32 main-cont">
      <ul class="align-center">
        <li class="m-r-24">本月拉新</li>
        <li class="align-center">
          <p class="align-center">{{ statis.monthNew }}</p>
        </li>
      </ul>
      <ul class="align-center">
        <li class="m-r-24">上月拉新</li>
        <li class="align-center">
          <p class="align-center">{{ statis.lastMonthNew }}</p>
        </li>
      </ul>
      <ul class="align-center">
        <li class="m-r-24">本月销售</li>
        <li class="align-center">
          <p class="align-center">{{ divide(statis.monthSale) }}</p>
        </li>
      </ul>
      <ul class="align-center m-t-16">
        <li class="m-r-24">邀请码</li>
        <li class="align-center">
          <p>{{ myLink }}</p>
          <span
            class="m-l-8 pointer"
            v-clipboard:copy="
              textToCopy(`官网地址:${website}\n邀请码:${myLink}
            `)
            "
            v-clipboard:success="onCopySuccess"
          >
            <img class="d-img" src="@/assets/img/copy.png" alt="" />
          </span>
        </li>
      </ul>
    </div>
    <div class="recharge-title align-center">
      <span class="no-shrink">用户名：</span>
      <input v-model.trim="params.playerName" class="fund-input m-r-16" />
      <span class="no-shrink">充值/提现时间：</span>
      <el-date-picker
        style="width: 310px"
        v-model="date"
        class="g-el-input__inner m-r-16"
        type="daterange"
        size="small"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        popper-class="g-table-popper-class"
      >
      </el-date-picker>
      <span class="no-shrink">状态：</span>
      <el-select
        style="width: 110px"
        class="g-el-cascader"
        size="small"
        v-model="params.status"
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
      <div
        class="cp-button-main activity-search-btn"
        v-loading="loading"
        @click="handleCurrentChange(1)"
      >
        查询
      </div>
    </div>
    <div class="recharge-table-container p-t-0">
      <!-- "createdAt": 注册时间,
      "nickname": "用户",
      "balance": 余额,
      "status": 状态 0禁用 1正常,
      "theNewLoginTime": 登录时间,
      "qq": "qq",
      "accumulativeBet": 累计投注, -->
      <el-table class="g-el-table" border :data="tableData.results">
        <el-table-column prop="nickname" label="昵称"> </el-table-column>
        <el-table-column prop="username" label="用户"> </el-table-column>
        <el-table-column prop="balance" label="余额">
          <template slot-scope="scope">
            <span>{{ divide(scope.row.balance) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span>{{ +scope.row.status ? '正常' : '禁' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderNo" label="投注任务">
          <template slot-scope="scope">
            <span>{{ divide(scope.row.taskAim) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="注册时间">
          <template slot-scope="scope">
            <span>{{
              scope.row.createdAt ? $dayjsTime(scope.row.createdAt) : ''
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="theNewLoginTime" label="登录时间">
          <template slot-scope="scope">
            <span>{{
              scope.row.theNewLoginTime
                ? $dayjsTime(scope.row.theNewLoginTime)
                : ''
            }}</span>
          </template>
        </el-table-column>
        <!-- "status": 状态 0禁用 1正常, -->
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span>{{ +scope.row.status ? '正常' : '禁' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderNo" label="详情">
          <template slot-scope="scope">
            <span
              class="pointer"
              @click="views(scope.row)"
              style="text-decoration: underline"
              >查看</span
            >
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
      <viewDiaolog ref="$viewDiaolog" />
    </div>
  </div>
</template>

<script>
import viewDiaolog from '@/views/account/team/viewDiaolog.vue';
import userApi from '@/api/user';
export default {
  name: 'AccountCenter',
  components: {
    viewDiaolog,
  },
  data() {
    return {
      //"status": 状态 0禁用 1正常,
      tabSimpleList: [
        { id: 0, text: '禁用' },
        { id: 1, text: '正常' },
      ],
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
        status: '',
      },
      headData: {
        //website:官方 website2:推广链接 point:返点 month:本月返点 lastMonth:上月返点
      },
      statis: {
        //         "monthSale": 本月销售,
        // "lastMonthNew": 上月拉新,
        // "monthNew": 本月拉新
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    myLink() {
      return this.user.invitationCode;
    },
    website() {
      return `${window.location.protocol}//${window.location.host}`;
    },
  },
  methods: {
    views(row) {
      this.$refs.$viewDiaolog.open(row);
    },
    onCopySuccess() {
      this.$message.success('复制成功');
    },
    textToCopy(v) {
      return v;
    },
    async groupStatis() {
      const [err, res] = await userApi.groupStatis();
      if (err) return;
      this.statis = res.data;
    },
    async mysub2() {
      const [err, res] = await userApi.mysub2();
      if (err) return;
      this.headData = res.data;
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
      //删除空字符串
      for (const key in sendData) {
        if (sendData[key] === '') {
          delete sendData[key];
        }
      }
      const [err, res] = await userApi.groupMember(sendData);
      this.loading = false;
      if (err) return;
      this.tableData = res.data;
    },
  },
  created() {
    this.lotteryBetsOrder();
    this.mysub2();
    this.groupStatis();
  },
};
</script>
<style scoped lang="scss">
.main-cont {
  font-size: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  & > ul {
    & > li:first-child {
      width: 76px;
      text-align: right;
    }
    i {
      color: #b78756;
      font-size: 18px;
    }
    p {
      height: 30px;
      line-height: 30px;
      background: #fdf1bd;
      padding: 0 8px;
      color: #000;
    }
    .d-img {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
