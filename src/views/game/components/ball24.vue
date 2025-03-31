<template>
  <div>
    <Rowball
      ref="$Rowball2"
      :title="titleText[0] || '和值'"
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
  props: {
    titleText: {
      type: Array,
      default: () => [],
    },
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
