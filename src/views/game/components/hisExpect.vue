<template>
  <div v-if="show" class="HisExpect">
    <div style="z-index: 999">
      <div class="cp-popup-mask"></div>
      <div
        class="cp-popup-main"
        style="width: 900px; min-height: 400px; z-index: 9"
      >
        <div class="cp-popup-title">
          <div class="cp-popup-title-content">
            <div style="color: rgb(230, 162, 60)">历史记录</div>
            <i class="el-icon-close" style="cursor: pointer" @click="close"></i>
          </div>
        </div>
        <div class="cp-popup-body" style="width: 900px">
          <div class="cp-popup-body-content">
            <div>
              <div
                class="el-date-editor el-input el-input--small el-input--prefix el-input--suffix el-date-editor--date"
                style="margin-right: 30px"
              >
                <el-date-picker
                  popper-class="HisExpect-popper-class"
                  v-model="params.ymd"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </div>
              <button
                type="button"
                class="el-button select-button el-button--default"
                @click="lotteryHisExpect({ pageNo: 1 })"
              >
                <span>查找</span>
              </button>
            </div>
            <div
              style="border: 1px solid rgb(140, 147, 157); padding-right: 17px"
            >
              <table
                rules="all"
                align="center"
                style="width: 100%; font-size: 15px"
              >
                <tr
                  style="
                    color: rgb(255, 241, 192);
                    display: flex;
                    align-items: center;
                  "
                >
                  <th height="30" style="flex: 1 1 0%; line-height: 30px">
                    游戏
                  </th>
                  <th height="30" style="flex: 1 1 0%; line-height: 30px">
                    期号
                  </th>
                  <th height="30" style="flex: 1 1 0%; line-height: 30px">
                    号码
                  </th>
                  <th height="30" style="flex: 1 1 0%; line-height: 30px">
                    形态
                  </th>
                  <!---->
                </tr>
              </table>
            </div>
            <div
              ref="scroll"
              style="
                height: 300px;
                overflow: auto;
                border: 1px solid rgb(140, 147, 157);
              "
            >
              <table
                rules="all"
                align="center"
                style="width: 100%; font-size: 13px"
              >
                <tr
                  style="color: rgb(255, 216, 0); display: flex"
                  v-for="(item, index) in tableData.results"
                  :key="index"
                >
                  <td height="24" style="flex: 1 1 0%; line-height: 24px">
                    {{ item.lotteryName }}
                  </td>
                  <td height="24" style="flex: 1 1 0%; line-height: 24px">
                    {{ item.cycleNum }}
                  </td>
                  <td height="24" style="flex: 1 1 0%; line-height: 24px">
                    {{ item.openNum }}
                  </td>
                  <td height="24" style="flex: 1 1 0%; line-height: 24px">
                    {{ getGroup(+item.type) }}
                  </td>
                </tr>
              </table>
            </div>
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
        <div class="cp-popup-buttons"></div>
      </div>
    </div>
  </div>
</template>
<script>
import userApi from '@/api/user';
export default {
  name: 'HisExpect',
  data() {
    return {
      show: false,
      params: {
        pageNo: 1,
        pageSize: 30,
        ymd: this.$dayjsTime(new Date(), 'YYYY-MM-DD'),
      },
      tableData: {
        totalCount: 0,
        results: [],
      },
    };
  },
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  methods: {
    getGroup(type) {
      // type 1豹子 2组三 3组六
      switch (type) {
        case 1:
          return '豹子';
        case 2:
          return '组三';
        case 3:
          return '组六';
        default:
          return '';
      }
    },
    handleCurrentChange(val) {
      this.params.pageNo = val;
      this.lotteryHisExpect();
    },
    async lotteryHisExpect(obj = {}) {
      if (this.$refs.scroll) {
        this.$refs.scroll.scrollTop = 0;
      }
      Object.assign(this.params, obj);
      const [err, res] = await userApi.lotteryHisExpect({
        ...this.params,
        id: this.id,
      });
      if (err) return;
      this.tableData = res.data;
    },
    close() {
      this.show = false;
    },
    open() {
      this.show = true;
      this.lotteryHisExpect();
    },
  },
};
</script>
<style lang="scss">
.HisExpect-popper-class {
  tr:hover {
    background-color: transparent;
  }
}
</style>
