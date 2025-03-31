<template>
  <div>
    <Rowball
      ref="$Rowball2"
      title="组六"
      :left="left"
      @filterLeft="nums = $event"
      :count="3"
      :curPre="curPre[0] || []"
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
  props: {
    curPre: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    nums: {
      handler() {
        const status = bets.chose5(this.nums);
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
      return Array.from({ length: 10 }, (v, k) => ({ up: k }));
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
      const status = bets.chose5(this.nums);
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
