<template>
  <div class="recharge-main">
    <div class="recharge-table-container">
      <table rules="all" align="center" class="recharge-table">
        <tr align="center" class="recharge-table-header">
          <th height="40" width="180">标题</th>
          <th height="40">内容</th>
          <th height="40" width="155">创建时间</th>
          <th height="40" width="60">操作</th>
        </tr>

        <tr
          align="center"
          class="recharge-table-header"
          v-for="(item, index) in tableData.results"
          :key="index"
        >
          <td
            height="32"
            width="180"
            style="
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              text-align: center;
              cursor: pointer;
            "
          >
            {{ item.title }}
          </td>
          <td height="32">
            <div>
              <p class="els">{{ item.content }}</p>
            </div>
          </td>
          <td height="32" width="155">
            {{ $dayjsTime(item.createdAt) }}
          </td>
          <td height="32" width="60">
            <div
              @click="views(item)"
              class="cp-button-main"
              style="color: rgb(255, 216, 0)"
            >
              <!---->
              查看
            </div>
          </td>
        </tr>
      </table>
      <div class="p-b-32 p-t-32 center-center">
        <el-pagination
          class="g-el-pagination"
          @current-change="handleCurrentChange"
          :current-page="query.pageNo"
          :page-size="query.pageSize"
          layout="total, prev, pager, next"
          :total="tableData.totalCount"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :title="item.title"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <div class="p-b-48 pre-line">
        {{ item.content }}
      </div>
    </el-dialog>
  </div>
</template>

<script>
import userApi from '@/api/user';
export default {
  name: 'AccountCenter',
  data() {
    return {
      item: {},
      centerDialogVisible: false,
      query: {
        pageNo: 1,
        pageSize: 12,
      },
      tableData: {
        totalCount: 0,
        results: [],
      },
    };
  },
  methods: {
    views(item) {
      this.item = item;
      this.centerDialogVisible = true;
    },
    handleCurrentChange(val) {
      this.query.pageNo = val;
      this.getNoticeList();
    },
    async getNoticeList() {
      const [err, res] = await userApi.notice(this.query);
      if (err) return;
      this.tableData = res.data;
    },
  },
  created() {
    this.getNoticeList();
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
