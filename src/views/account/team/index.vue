<template>
  <div class="recharge-main">
    <div
      class="custom-record-tabs"
      style="margin-left: 15px; margin-bottom: 15px; margin-right: 15px"
    >
      <div
        class="custom-record-tab"
        v-for="(item, idx) in navs"
        :key="idx"
        @click="tab = item.id"
        :class="{ 'custom-record-tab-active': tab == item.id }"
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
// eslint-disable-next-line no-unused-vars
import userApi from '@/api/user';
import Team0 from './Team0.vue';
import Team1 from './Team1.vue';
import Team2 from './Team2.vue';
import Team3 from './Team3.vue';
import Team4 from './Team4.vue';
import Team5 from './Team5.vue';
export default {
  name: 'AccountTeam',
  data() {
    return {
      navs: [
        {
          name: '成员充值',
          id: 0,
        },
        {
          name: '成员提款',
          id: 1,
        },
        {
          name: '成员购彩',
          id: 2,
        },
        {
          name: '成员列表',
          id: 3,
        },
        {
          name: '账单明细',
          id: 4,
        },
        // {
        //   name: "代理佣金",
        //   id: 5,
        // },
      ],
      tab: 0,
    };
  },
  computed: {
    // 根据当前 tab id 返回对应的组件
    currentComponent() {
      //navs 调用组件
      const components = {
        0: Team0,
        1: Team1,
        2: Team2,
        3: Team3,
        4: Team4,
        5: Team5,
      };
      return components[this.tab] || null;
    },
  },
};
</script>
<style scoped lang="scss"></style>
