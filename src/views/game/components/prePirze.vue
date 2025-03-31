<template>
  <div>
    <div class="next-result-history-container scrollbar">
      <div class="next-result-history" v-for="(item, idx) in list" :key="idx">
        <div class="next-result-history-text">{{ item.cycleNum }}</div>
        <div class="common_layout_center_h">
          <div
            class="next-result-number"
            v-for="(doc, index) in item.openNum.split(',')"
            :key="index"
          >
            {{ doc }}
          </div>
        </div>
        <div class="next-result-history-text">
          <span class=""></span>
        </div>
      </div>
    </div>
    <div class="next-result-more" @click="open">
      查看更多<i class="el-icon-arrow-right"></i>
    </div>
    <hisExpect :id="id" ref="$hisExpect" />
  </div>
</template>
<script>
import hisExpect from '@/views/game/components/hisExpect.vue';
import userApi from '@/api/user';
export default {
  name: 'BindCard',
  data() {
    return {
      params: {
        pageNo: 1,
        pageSize: 10,
      },
      list: [],
    };
  },
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  components: {
    hisExpect,
  },
  methods: {
    async lotteryHisExpect() {
      const [err, res] = await userApi.lotteryHisExpect({
        ...this.params,
        id: this.id,
      });
      if (err) return;
      this.list = res.data.results;
    },
    open() {
      this.$refs.$hisExpect.open();
    },
  },
  created() {
    if (this.list.length) return;
    this.lotteryHisExpect();
  },
};
</script>
