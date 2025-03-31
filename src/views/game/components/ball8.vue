<template>
  <div>
    <Rowball
      ref="$Rowball2"
      title="和值"
      :left="left"
      @filterLeft="nums = $event"
    />
    <tipsDialog ref="$tipsDialog" />
  </div>
</template>

<script>
import Rowball from './Rowball.vue';
import bets from '@/plugins/bets';
import tipsDialog from '@/components/tipsDialog';
export default {
  name: 'InfoMain',
  data() {
    return {
      nums: [],
    };
  },
  watch: {
    nums: {
      handler() {
        const status = bets.chose7(this.nums);
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
    left() {
      let arr = Array.from({ length: 26 }, (v, k) => ({ up: k + 1 }));
      return arr;
    },
    text() {
      return `${this.nums}`;
    },
  },
  components: {
    Rowball,
    tipsDialog,
  },
  methods: {
    randem() {
      this.$refs.$Rowball2.randem();
    },
    clear() {
      this.nums = [];
      this.$refs.$Rowball2.clear();
    },
    add() {
      const status = bets.chose7(this.nums);
      console.log(status);
      if (typeof status !== 'number') {
        this.$refs.$tipsDialog.open(status.err);
        return false;
      }
      return true;
    },
  },
};
</script>
