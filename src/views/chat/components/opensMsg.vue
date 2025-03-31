<template>
  <div class="opens-list p-x-12">
    <p class="tops m-b-8 font16">
      {{ data.lottery }}
    </p>
    <ul class="mid font14">
      <li
        v-for="(item, index) in data.opens"
        :key="index"
        class="one-doc m-b-4"
        :class="{ 'p-t-4 doc-line': index == data.opens.length - 1 }"
      >
        <span> {{ item.cycleNum }}期 </span>
        <span>
          {{ item.openNum ? item.openNum.replace(/,/g, ' ') : '进行中' }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'imgMsg',
  props: {
    doc: {
      type: Object,
      default: () => {},
    },
    userPic: {
      type: String,
      default: '',
    },
  },
  computed: {
    data() {
      return this.doc.data;
    },
  },
  methods: {},
  mounted() {},
};
</script>
<style scoped lang="scss">
.opens-list {
  background-color: #fff;
}
.doc-line {
  //虚线
  border-top: 1px dashed #412116;
}
.font14 {
  font-size: 14px;
}
.font16 {
  font-size: 16px;
}
</style>
