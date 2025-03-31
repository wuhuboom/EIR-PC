<template>
  <div class="recharge-main center-center">
    <div class="m-l-12 font16 p-t-16 m-r-12 p-b-16 p-l-32 main-cont">
      <!-- <ul class="m-b-32 align-center">
        <li class="m-r-24">推广码</li>
        <li class="align-center">
          {{ user.invitationCode }}
          <span
            class="m-l-8 pointer"
            v-clipboard:copy="textToCopy(`${user.invitationCode}`)"
            v-clipboard:success="onCopySuccess"
          >
            <img class="d-img" src="@/assets/img/copy.png" alt="" />
          </span>
        </li>
      </ul> -->
      <ul class="m-b-32 align-center">
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
      <ul class="align-center">
        <li class="m-r-24">官方地址</li>
        <li class="align-center">
          <p class="align-center">{{ website }}</p>
          <span
            class="m-l-8 pointer"
            v-clipboard:copy="textToCopy(website)"
            v-clipboard:success="onCopySuccess"
          >
            <img class="d-img" src="@/assets/img/copy.png" alt="" />
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import userApi from '@/api/user';
export default {
  name: 'AccountCenter',
  data() {
    return {
      query: {
        pageNo: 1,
        pageSize: 10,
        // begin: "",
        // end: "",
        nickname: '',
      },
      date: '',
      tableData: {
        totalCount: 0,
        results: [],
      },
      headData: {
        //website:官方 website2:推广链接 point:返点 month:本月返点 lastMonth:上月返点
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
      return this.headData.website;
    },
  },
  methods: {
    textToCopy(v) {
      return v;
    },
    onCopySuccess() {
      this.$message.success('复制成功');
    },
    handleCurrentChange(val) {
      this.query.pageNo = val;
      this.mysub();
    },
    async mysub2() {
      const [err, res] = await userApi.mysub2();
      if (err) return;
      this.headData = res.data;
    },
    async mysub() {
      const params = {
        ...this.query,
      };
      if (Array.isArray(this.date)) {
        params.begin = this.date[0];
        params.end = this.date[1];
      }
      const [err, res] = await userApi.mysub(params);
      if (err) return;

      this.tableData = res.data;
    },
  },
  created() {
    this.mysub();
    this.mysub2();
  },
};
</script>
<style scoped lang="scss">
.main-cont {
  background: #623525;
  height: 600px;
  width: 100%;
  font-size: 16px;
  & > ul {
    & > li:first-child {
      width: 66px;
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
