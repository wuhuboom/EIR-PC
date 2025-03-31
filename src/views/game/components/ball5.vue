<template>
  <div>
    <Rowball
      ref="$Rowball1"
      title="胆码"
      @filterLeft="filterLeft1"
      :showRight="false"
      :isOne="1"
      :orther="nums.shiWei"
      @del="del1"
    />
    <Rowball
      ref="$Rowball2"
      title="拖码"
      @filterLeft="filterLeft2"
      @del="del2"
      :orther="nums.baiWei"
      :curPre="curPre[0] || []"
    />
    <tipsDialog ref="$tipsDialog" />
  </div>
</template>

<script>
import Rowball from './Rowball.vue';
import bets from '@/plugins/bets';
import tipsDialog from '@/components/tipsDialog';
const initDatas = () => {
  return {
    baiWei: [],
    shiWei: [],
  };
};
export default {
  name: 'InfoMain',
  data() {
    return {
      nums: {
        ...initDatas(),
      },
    };
  },
  props: {
    curPre: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    nums: {
      handler() {
        const status = bets.chose4(this.baiWei, this.shiWei);
        if (typeof status !== 'number') {
          this.$emit('total', status.totalBets || 0);
          return;
        }
        this.$emit('total', status);
      },
      deep: true,
    },
  },
  computed: {
    baiWei() {
      return this.nums.baiWei;
    },
    shiWei() {
      return this.nums.shiWei;
    },
    geWei() {
      return this.nums.geWei;
    },
    text() {
      return `${this.baiWei}|${this.shiWei}`;
    },
  },
  components: {
    Rowball,
    tipsDialog,
  },
  methods: {
    del1(v) {
      this.$refs.$Rowball2.nums = this.$refs.$Rowball2.nums.filter(
        (item) => !v.includes(item)
      );
    },
    del2(v) {
      this.$refs.$Rowball1.nums = this.$refs.$Rowball1.nums.filter(
        (item) => !v.includes(item)
      );
    },
    filterLeft1(val) {
      this.nums.baiWei = val;
    },
    filterLeft2(val) {
      this.nums.shiWei = val;
    },
    clear() {
      this.nums = initDatas();
      this.$refs.$Rowball1.clear();
      this.$refs.$Rowball2.clear();
    },
    randem() {
      const arr = this.$refs.$Rowball1.randem([]);
      this.$refs.$Rowball2.randem(arr);
    },
    add() {
      const status = bets.chose4(this.baiWei, this.shiWei, this.geWei);
      if (typeof status !== 'number') {
        this.$refs.$tipsDialog.open(status.err);
        return false;
      }

      return true;
    },
  },
};
</script>
