<template>
  <el-dialog title="详情" :visible.sync="show" width="933px">
    <div class="custom-record-tabs" style="margin-bottom: 15px">
      <div
        class="custom-record-tab"
        v-for="(item, idx) in navs"
        :key="idx"
        @click="tab = item.id"
        :class="{ 'custom-record-tab-active': tab == item.id }"
      >
        {{ item.name }}
      </div>
    </div>
    <component :row="row" :is="currentComponent"></component>
  </el-dialog>
</template>

<script>
import viewList0 from './viewList0.vue';
import viewList1 from './viewList1.vue';
import viewList2 from './viewList2.vue';
import userApi from '@/api/user';
export default {
  name: 'AccountCenter',
  data() {
    return {
      navs: [
        {
          name: '购彩记录',
          id: 0,
        },
        {
          name: '充值记录',
          id: 1,
        },
        {
          name: '提款记录',
          id: 3,
        },
      ],
      tab: 0,
      show: false,
      row: {},
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
  components: {
    viewList0,
    viewList1,
    viewList2,
  },
  computed: {
    currentComponent() {
      switch (this.tab) {
        case 0:
          return 'viewList0';
        case 1:
          return 'viewList1';
        case 3:
          return 'viewList2';
        default:
          return 'viewList0';
      }
    },
  },
  methods: {
    open(row) {
      this.show = true;
      this.row = row;
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
      res.data.results = [
        {
          orderId: '202107010001',
          fromUser: 'admin',
          playerName: 'test',
          money: 96.669,
          orderMoney: 1000,
          createdAt: 1625097600000,
          moneyIncome: 0,
          status: 0,
        },
      ];
      this.tableData = res.data;
    },
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
