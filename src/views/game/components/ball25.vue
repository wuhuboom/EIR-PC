<template>
  <div>
    <Rowball
      ref="$Rowball2"
      title="跨度"
      :left="left"
      @filterLeft="nums = $event"
    />
    <tipsDialog ref="$tipsDialog" />
  </div>
</template>

<script>
import tipsDialog from '@/components/tipsDialog';
import bets from '@/plugins/bets';
import Rowball from './Rowball.vue';
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
        const status = bets.chose15(this.nums);
        if (typeof status !== 'number') {
          this.$emit('total', 0);
          return;
        }
        this.$emit('total', this.nums.length, this.nums);
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
      const status = bets.chose15(this.nums);
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
