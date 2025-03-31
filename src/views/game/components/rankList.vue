<template>
  <div v-if="show" style="z-index: 999">
    <div width="1200" style="z-index: 999">
      <div class="cp-popup-mask"></div>
      <div
        class="cp-popup-main"
        style="width: 1200px; min-height: 400px; height: auto; z-index: 9"
      >
        <div class="cp-popup-title">
          <div class="cp-popup-title-content">
            <div style="color: rgb(255, 236, 124)">
              走势图：{{ detail.lotteryName }}
            </div>
            <i class="el-icon-close" @click="close" style="cursor: pointer"></i>
          </div>
        </div>
        <div class="cp-popup-body">
          <div class="cp-popup-body-content" style="overflow: hidden">
            <div class="charts-tabs">
              <div
                class="charts-tab-item"
                :class="{ 'charts-tab-item-active': item.type === curType }"
                v-for="item in navs"
                :key="item.type"
                @click="(curType = item.type), (isDraw = false)"
              >
                {{ item.name }}
              </div>
            </div>
            <div class="charts-selects">
              <div class="row-start">
                <div class="cp-checkbox-main">
                  <div
                    class="cp-checkbox-image"
                    :class="{ 'cp-checkbox-image-active': showLuo }"
                    @click="showLuo = !showLuo"
                  ></div>
                  <div style="margin-left: 10px">遗漏</div>
                </div>
                <div class="cp-checkbox-main charts-interval">
                  <div
                    class="cp-checkbox-image"
                    :class="{ 'cp-checkbox-image-active': isDraw }"
                    @click="drawLIne"
                  ></div>
                  <div style="margin-left: 10px">折线</div>
                </div>
              </div>
              <div class="row-start">
                <div
                  class="charts-interval"
                  v-for="item in times"
                  :key="item.id"
                  :class="{ 'charts-interval-active': item.id === curTime }"
                  @click="changeTime(item)"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
            <component
              ref="$cont"
              :is="currentComponent"
              :showLuo="showLuo"
              :data="data"
            ></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userApi from '@/api/user';
import rankMall1 from './rankMall1.vue';
import rankMall2 from './rankMall2.vue';
import rankMall3 from './rankMall3.vue';
import rankMall4 from './rankMall4.vue';
import rankMall5 from './rankMall5.vue';
import rankMall6 from './rankMall6.vue';
import rankMall7 from './rankMall7.vue';
import rankMall8 from './rankMall8.vue';
import rankMall9 from './rankMall9.vue';
import rankMall10 from './rankMall10.vue';
const initForm = () => ({
  ctype: 3,
  identity: '',
  cardNumber: '',
  bankName: 'TRC20',
  payPwd: '',
});
export default {
  name: 'BindCard',
  components: {
    rankMall1,
    rankMall2,
    rankMall3,
    rankMall4,
    rankMall5,
    rankMall6,
    rankMall7,
    rankMall8,
    rankMall9,
    rankMall10,
  },
  data() {
    return {
      showLuo: true,
      loading: false,
      curType: 1,
      show: false,
      isDraw: false,
      form: initForm(),
      data: [],
      curTime: 1,
      times: [
        {
          name: '最近30期',
          id: 1,
          query: {
            pageNo: 1,
            pageSize: 30,
          },
        },
        {
          name: '今日数据',
          id: 2,
          query: {
            today: 1,
            pageNo: 1,
          },
        },
      ],
    };
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
    detail: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    isLeo() {
      return this.data.find((item) => item.leo === 5);
    },
    navs() {
      if (this.isLeo) {
        return [
          { name: '五星走势图', type: 1 },
          { name: '五星综合走势图', type: 2 },
          { name: '前三综合走势图', type: 3 },
          { name: '中三综合走势图', type: 4 },
          { name: '后三综合走势图', type: 5 },
          { name: '前二综合走势图', type: 6 },
          { name: '后二综合走势图', type: 7 },
        ];
      }
      return [
        { name: '三星综合走势图', type: 8 },
        { name: '前二综合走势图', type: 9 },
        { name: '后二综合走势图', type: 10 },
      ];
    },
    numList() {
      return [...Array(10).keys()];
    },
    currentComponent() {
      return `rankMall${this.curType}`;
    },
  },
  methods: {
    drawLIne() {
      this.isDraw = !this.isDraw;
      if (this.isDraw) {
        this.$refs.$cont.drawLIne();
        return;
      }
      this.$refs.$cont && this.$refs.$cont.clearLIne();
    },
    idCardValidator(rule, value, callback) {
      const idCardPattern =
        /^(^[1-9]\d{5}(18|19|20|21|22|23|24|25|26|27|28|29)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}(\d|X|x)$)$/;
      if (!value) {
        callback(new Error('请输入身份证号'));
      } else if (!idCardPattern.test(value)) {
        callback(new Error('请输入有效的身份证号'));
      } else {
        callback();
      }
    },
    bankCardValidator(rule, value, callback) {
      const trc20Pattern = /^T[a-zA-Z1-9]{10,}$/;
      if (!value) {
        callback(new Error('请输入 TRC20 地址'));
      } else if (!trc20Pattern.test(value)) {
        callback(new Error('请输入有效的 TRC20 地址'));
      } else {
        callback();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        this.ajaxBindCard();
      });
    },
    async ajaxBindCard() {
      this.loading = true;
      const [err] = await userApi.bindBankCard({
        ...this.form,
        cardNumberTwice: this.form.cardNumber,
      });
      this.loading = false;
      if (err) return;
      this.show = false;
      this.$store.dispatch('getBankCard');
    },
    async changeTime(item) {
      this.isDraw = false;
      this.$refs.$cont && this.$refs.$cont.clearLIne();
      this.curTime = item.id;
      this.lotteryHisExpect(item.query);
    },

    async lotteryHisExpect(obj = { pageSize: 30 }) {
      const [err, res] = await userApi.lotteryHisExpect({
        id: this.id,
        pageNo: 1,
        ...obj,
      });
      if (err) return;
      res.data.results.forEach((item) => {
        item.openNumArr = item.openNum.split(',');
        item.ballMiss = JSON.parse(item.ballMiss);
        item.leo = item.openNumArr.length;
      });
      this.data = res.data.results;
    },
    async open() {
      await this.lotteryHisExpect();
      this.form = initForm();
      this.show = true;
      this.curTime = 1;
      this.isDraw = false;
      this.curType = this.isLeo ? 1 : 8;
    },
    close() {
      this.show = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.charts-tabs {
  border: none;
  background: none;
  .charts-tab-item {
    height: 100%;
  }
}
</style>
