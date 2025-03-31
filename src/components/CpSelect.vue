<template>
  <div class="co-purse-radios">
    <div
      class="cp-cascader-main"
      @mouseleave="show = false"
      style="width: 117px; height: 26px"
    >
      <div class="cp-cascader-btn" @mouseover="show = true">
        <span class="cp-cascader-span">{{ name }}</span>
        <i class="el-icon-caret-bottom" style="margin-right: 6px"></i>
      </div>
      <div class="cp-cascader-items" v-show="show">
        <div
          class="cp-cascader-columns flex-column"
          style="background: rgb(255, 241, 192)"
        >
          <div
            class="cp-cascader-item"
            :class="{
              'cp-cascader-item-active': active === item.id,
              'cp-cascader-color': active !== item.id,
            }"
            v-for="(item, index) in list"
            :key="index"
            @click="active = item.id"
          >
            <span class="cp-cascader-item-span">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CpSelect',
  data() {
    return {
      show: false,
      active: 0,
    };
  },
  computed: {
    name() {
      return (this.list.find((item) => item.id === this.active) || {}).name;
    },
  },
  watch: {
    active(val) {
      this.$emit('input', val);
    },
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
    list: {
      type: Array,
      default: () => {
        return [
          {
            name: '无保底',
            id: 0,
          },
          {
            name: '部分保底',
            id: 1,
          },
          {
            name: '全额保底',
            id: 2,
          },
        ];
      },
    },
  },
  methods: {},
  created() {
    this.active = this.value;
  },
};
</script>
<style lang="scss" scoped>
.cp-cascader-main {
  background-color: #ffba2c;
}
.cp-cascader-color {
  color: #412315;
  &:hover {
    color: #ff9c00;
  }
}
</style>
