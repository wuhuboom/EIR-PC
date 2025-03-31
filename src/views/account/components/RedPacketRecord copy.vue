<template>
  <div class="red-bag-main">
    <div class="red-bag-tabs">
      <div
        class="red-bag-tab"
        v-for="(item, idx) in navs"
        :key="idx"
        @click="id = item.id"
        :class="{ 'red-bag-tab-active': id === item.id }"
      >
        {{ item.name }}
      </div>
    </div>
    <div>
      <div v-if="id == 0" class="red-send-main">
        <div class="red-send-table-container">
          <table rules="all" align="center" class="red-send-table">
            <tr align="center" class="red-send-table-header">
              <th height="40">红包主题</th>
              <th height="40">红包金额</th>
              <th height="40">红包数量</th>
              <th height="40">领取金额</th>
              <th height="40">剩余金额</th>
              <th height="40">领取数量</th>
              <th height="40">剩余数量</th>
              <th height="40">红包状态</th>
              <th height="40">是否已退款</th>
              <th height="40">派发时间</th>
            </tr>
          </table>
          <div class="cp-pagination-main" style="margin-top: 40px">
            <div class="cp-pagination-head">
              <div class="cp-pagination-first">首页</div>
              <div class="cp-pagination-page">上一页</div>
              <div class="cp-pagination-num cp-pagination-num-active">1</div>
            </div>
            <div class="cp-pagination-middle">
              <!---->
              <!---->
            </div>
            <div class="cp-pagination-head">
              <!---->
              <div class="cp-pagination-page">下一页</div>
              <div class="cp-pagination-tail">尾页</div>
            </div>
            <div class="cp-pagination-data">页次：1/0</div>
            <div class="cp-pagination-data">记录：0条</div>
          </div>
        </div>
      </div>
      <div v-if="id == 1" class="red-collect-main">
        <div class="custom-table-container">
          <table rules="all" class="custom-table">
            <tr>
              <th height="40">红包发起人</th>
              <th height="40">红包主题</th>
              <th height="40">领取金额</th>
              <th height="40">领取时间</th>
            </tr>
          </table>
          <div class="cp-pagination-main" style="margin-top: 40px">
            <div class="cp-pagination-head">
              <div class="cp-pagination-first">首页</div>
              <div class="cp-pagination-page">上一页</div>
              <div class="cp-pagination-num cp-pagination-num-active">1</div>
            </div>
            <div class="cp-pagination-middle">
              <!---->
              <!---->
            </div>
            <div class="cp-pagination-head">
              <!---->
              <div class="cp-pagination-page">下一页</div>
              <div class="cp-pagination-tail">尾页</div>
            </div>
            <div class="cp-pagination-data">页次：1/0</div>
            <div class="cp-pagination-data">记录：0条</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountCenter',
  data() {
    return {
      navs: [
        {
          name: '红包派发记录',
          id: 0,
        },
        {
          name: '红包领取记录',
          id: 1,
        },
      ],
      id: 0,
      sendData: {},
    };
  },
  methods: {
    handleQuery() {
      console.log('查询');
    },
  },
};
</script>
<style scoped lang="scss"></style>
