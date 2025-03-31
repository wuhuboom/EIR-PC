<template>
  <div class="recharge-main">
    <div class="recharge-title align-center m-t-0">
      <div class="align-center" style="margin-left: 18px">
        <span class="select-drop-span">时间:</span>
        <el-select
          class="g-el-cascader"
          size="small"
          v-model="params.time"
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
      <div class="align-center" style="margin-left: 18px">
        <span class="select-drop-span">状态:</span>
        <el-select
          class="g-el-cascader"
          size="small"
          v-model="params.status"
          clearable
          placeholder="请选择"
          popper-class="g-el-cascader-popper"
        >
          <el-option
            v-for="item in inputSearchListItemArray"
            :key="item.id"
            :label="item.text"
            :value="item.id"
          >
          </el-option>
        </el-select>
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
      <el-table class="g-el-table" border :data="curItem.results">
        <el-table-column prop="orderNo" label="订单号" width="208">
          <template slot-scope="scope">
            <span>{{ scope.row.orderNo }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="提现方式">
          <template slot-scope="scope">
            {{ getType(+scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column prop="money" label="金额">
          <template slot-scope="scope">
            <span>{{ divide(scope.row.money) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="日期">
          <template slot-scope="scope">
            <span>{{ $dayjsTime(scope.row.createdAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span :class="[+scope.row.status == 3 ? 'red' : 'green']">{{
              getState(+scope.row.status)
            }}</span>
            <p class="red" v-if="scope.row.remark">
              {{ scope.row.remark }}
            </p>
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
          :total="curItem.totalCount"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from '@/api/user';
import i18n from '@/locale';
export default {
  name: 'AccountCenter',
  data() {
    return {
      loading: false,
      params: {
        time: '',
        status: '',
        pageNo: 1,
        pageSize: 10,
      },
      filterTab: 1,
      status: '',
      tabSimpleList: [
        {
          text: i18n.t('dropdown.billing.all.title.text'),
          id: '',
        },
        {
          text: i18n.t('match.records.today.text'),
          id: 1,
        },
        {
          text: i18n.t('match.records.yes.text'),
          id: 2,
        },
        {
          text: i18n.t('match.records.nearly7.text'),
          id: 3,
        },
        {
          text: i18n.t('match.records.nearly10.text'),
          id: 4,
        },
        {
          text: i18n.t('match.records.nearly30.text'),
          id: 5,
        },
      ],
      inputSearchListItemArray: [
        {
          text: i18n.t('dropdown.billing.all.title.text'),
          id: '',
        },
        {
          text: i18n.t('withdraw.loading'),
          id: 1,
        },
        {
          text: i18n.t('withdraw.record.status.withdraw.success.text'),
          id: 2,
        },
        {
          text: i18n.t('withdraw.failed'),
          id: 3,
        },
      ],
      statusList: [
        {
          nameStr: this.$t('withdraw.record.status.need.audit.text'),
          valueNum: 1,
        },
        {
          nameStr: this.$t('withdraw.record.status.already.audit.text'),
          valueNum: 2,
        },
        {
          nameStr: this.$t('withdraw.failed'),
          valueNum: 3,
        },
        {
          nameStr: this.$t('withdraw.record.status.withdraw.success.text'),
          valueNum: 4,
        },
        {
          nameStr: this.$t('withdraw.record.status.paid.in.text'),
          valueNum: 5,
        },
        {
          nameStr: this.$t('backapi.self.pay.failed.text'),
          valueNum: 6,
        },
        {
          nameStr: this.$t('withdraw.record.status.operation.in.text'),
          valueNum: 7,
        },
        {
          nameStr: this.$t('withdraw.record.status.redo.in.text'),
          valueNum: 8,
        },
        {
          nameStr: this.$t('backapi.self.pay.failed.text'),
          valueNum: 9,
        },
      ],
      typeList: [
        //0支付宝1微信2.银行卡,3.USDT
        {
          nameStr: '支付宝',
          valueNum: 0,
        },
        {
          nameStr: '微信',
          valueNum: 1,
        },
        {
          nameStr: '银行卡',
          valueNum: 2,
        },
        {
          nameStr: 'USDT',
          valueNum: 3,
        },
      ],
      curItem: {
        hasNext: true,
        pageNo: 1,
        pageSize: 20,
        results: [],
        totalCount: null,
        totalPage: null,
      },
    };
  },
  methods: {
    getType(value) {
      if (value) {
        let res = this.typeList.find((item) => item.valueNum === value);
        return res.nameStr;
      }
      return '--';
    },
    getState(value) {
      const res = this.statusList.find((item) => item.valueNum === value);
      if (res) {
        return res.nameStr;
      }
      return '--';
    },
    handleCurrentChange(val) {
      this.params.pageNo = val;
      this.onLoad();
    },
    async onLoad() {
      const [err, res] = await userApi.withdrawLogReq(this.params);
      this.loading = false;

      if (err) {
        this.curItem.hasNext = false;
        return;
      }
      let list =
        res.data.pageNo == 1
          ? res.data.results
          : this.curItem.results.concat(res.data.results);
      this.curItem = {
        ...res.data,
        results: list,
      };
      console.log(this.curItem);
      this.$toast.clear();
    },
  },
  created() {
    this.onLoad();
  },
};
</script>
<style scoped lang="scss">
.gray {
  color: #929292;
}
.green {
  color: #85f823;
}
.red {
  color: #f82354;
}
</style>
