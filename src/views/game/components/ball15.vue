<template>
  <div>
    <Rowball
      ref="$Rowball2"
      :left="left"
      title=""
      :className="className"
      :curPre="curPre[0] || []"
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
  props: {
    className: {
      type: String,
      default: '',
    },
    curPre: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    nums: {
      handler() {
        const status = bets.chose11(this.nums);
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
      this.$refs.$Rowball2.randemTow();
    },
    clear() {
      this.nums = [];
      this.$refs.$Rowball2.clear();
    },
    add() {
      const status = bets.chose11(this.nums);
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
