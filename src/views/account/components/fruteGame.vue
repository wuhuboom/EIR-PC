<template>
  <div class="recharge-main m-t-0 p-t-0">
    <div class="award-index-tabs">
      <div
        class="award-index-tab"
        v-for="(item, idx) in navs"
        :key="idx"
        @click="curId = item.id"
        :class="{ 'award-index-tab-active': curId === item.id }"
      >
        宾果游戏
      </div>
    </div>
    <div v-if="curId === 0" class="align-center p-t-24 justify-around">
      <div class="item-main">
        <ul
          class="item-ul center-center flex-column"
          v-for="(item, index) in list"
          :key="index"
        >
          <li class="txt">
            {{ item.txt }}
          </li>
          <li class="center-center">
            <p>{{ item.num1 }}/</p>
            <p>{{ item.num2 }}</p>
          </li>
        </ul>
      </div>
      <div class="award-right p-x-16 font12">
        <p class="award-right-title center-center font14">游戏说明</p>
        <p class="p-t-8 p-b-8" style="color: rgb(255, 236, 124)">
          奖励规则：完成格子中的任务，每五个格子连成一条直线（横向、纵向、对角方向），即可获得奖励
          <span class="tips">{{ game.bonus }}</span
          >元。（任务有效期限为一个月，每月1号会重置任务）
        </p>
        <div class="award-right-content">
          <p
            class="align-center m-b-4"
            v-for="(item, index) in list"
            :key="index"
          >
            <span> {{ item.txt }}：</span><span> {{ item.desc }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="award-record-main" v-else>
      <div class="award-record-title">
        <div
          class="cp-button-main award-record-btn"
          @click="handleCurrentChange(1)"
        >
          <!---->
          刷新
        </div>
      </div>
      <div class="award-record-table-container">
        <table rules="all" align="center" class="award-record-table">
          <tr align="center" class="award-record-table-header">
            <th height="40" width="110">奖励金额</th>
            <th height="40">游戏主题</th>
            <th height="40" width="160">完成时间</th>
          </tr>
          <!-- money:奖励金额
          fromItem:游戏主题
          createdAt:日期 -->
          <tr
            align="center"
            class="award-record-table-header"
            v-for="(item, index) in tableData.results"
            :key="index"
          >
            <td height="40">
              {{ divide(item.money) }}
            </td>
            <td height="40">
              {{ item.fromItem }}
            </td>
            <td height="40">
              {{ $dayjsTime(item.createdAt) }}
            </td>
          </tr>
        </table>
        <div class="p-b-32 center-center p-t-24">
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
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import userApi from '@/api/user';
export default {
  name: 'AccountCenter',
  data() {
    return {
      curId: 0,
      navs: [
        {
          name: '宾果游戏',
          id: 0,
        },
        {
          name: '奖励记录',
          id: 1,
        },
      ],
      game: {},
      gameList: [],
      query: {
        pageNo: 1,
        pageSize: 10,
      },
      tableData: {
        totalCount: 0,
        results: [],
      },
    };
  },
  computed: {
    list() {
      return this.game?.data || [];
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.query.pageNo = val;
      this.bingoGameList();
    },
    async bingoGameList() {
      const [err, res] = await userApi.bingoGameList(this.query);
      if (err) return;
      this.gameList = res.data;
    },
    async bingoGameData() {
      const [err, res] = await userApi.bingoGameData();
      if (err) return;
      this.game = res.data;
    },
  },
  created() {
    this.bingoGameData();
    this.bingoGameList();
  },
};
</script>
<style scoped lang="scss">
.item-main {
  display: flex;
  flex-wrap: wrap;
  color: #d6a133;
  width: 507px;
  border: 1px solid #c69c41;
  & > ul:nth-child(5n + 5) {
    border-right-color: transparent;
  }
  .txt {
    border-bottom: 1px solid #c69c41;
    padding-bottom: 4px;
    margin-bottom: 4px;
  }
}
.item-ul {
  width: 101px;
  height: 101px;
  text-align: center;
  //border: 1px solid #c69c41;
  background: #feecd6;
  border-bottom: 1px solid #c69c41;
  border-right: 1px solid #c69c41;
  padding: 0 8px;
  & > li {
    width: 100%;
  }
}
.award-right {
  background-image: linear-gradient(-180deg, #f48549, #f2642e);
  border-radius: 16px;
  width: 333px;
  color: #fff;
  .tips {
    color: red;
    font-size: 16px;
  }
}
</style>
