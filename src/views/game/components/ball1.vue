<template>
  <div>
    <Rowball
      ref="$Rowball1"
      :curPre="curPre[0] || []"
      @filterLeft="nums.baiWei = $event"
      :title="titleText[0]"
    />
    <Rowball
      ref="$Rowball2"
      :curPre="curPre[1] || []"
      :title="titleText[1]"
      @filterLeft="nums.shiWei = $event"
    />
    <Rowball
      ref="$Rowball3"
      :curPre="curPre[2] || []"
      :title="titleText[2]"
      @filterLeft="nums.geWei = $event"
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
    geWei: [],
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
    titleText: {
      type: Array,
      default: () => {
        return ['百位', '十位', '个位'];
      },
    },
    curPre: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    nums: {
      handler() {
        const status = bets.chose1(this.baiWei, this.shiWei, this.geWei);
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
      return `${this.baiWei}|${this.shiWei}|${this.geWei}`;
    },
  },
  components: {
    Rowball,
    tipsDialog,
  },
  methods: {
    clear() {
      this.nums = initDatas();
      this.$refs.$Rowball1.clear();
      this.$refs.$Rowball2.clear();
      this.$refs.$Rowball3.clear();
    },
    randem() {
      this.$refs.$Rowball1.randem();
      this.$refs.$Rowball2.randem();
      this.$refs.$Rowball3.randem();
    },
    add() {
      const status = bets.chose1(this.baiWei, this.shiWei, this.geWei);
      if (typeof status !== 'number') {
        this.$refs.$tipsDialog.open(status.err);
        return false;
      }

      return true;
    },
  },
};
</script>
