<template>
  <div class="red-bag-main">
    <div class="red-bag-tabs">
      <div
        class="red-bag-tab"
        v-for="(item, idx) in navs"
        :key="idx"
        @click="id = item.id"
        :class="{ 'red-bag-tab-active': id === item.id }"
      >
        {{ item.name }}
      </div>
    </div>
    <div>
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import RedPacketSendRecord0 from './RechargeRecord0.vue';
import RedPacketReceiveRecord1 from './RechargeRecord1.vue';
export default {
  name: 'AccountCenter',
  components: {
    RedPacketSendRecord0,
    RedPacketReceiveRecord1,
  },
  data() {
    return {
      navs: [
        {
          name: '红包派发记录',
          id: 0,
        },
        {
          name: '红包领取记录',
          id: 1,
        },
      ],
      id: 0,
      sendData: {},
    };
  },
  computed: {
    currentComponent() {
      return this.id === 0 ? 'RedPacketSendRecord0' : 'RedPacketReceiveRecord1';
    },
  },
  methods: {
    handleQuery() {
      console.log('查询');
    },
  },
};
</script>
<style scoped lang="scss"></style>
