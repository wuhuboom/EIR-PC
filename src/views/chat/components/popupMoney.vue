<template>
  <van-popup class="popupMoney" v-model="show">
    <p class="pop-title center-center m-t-24 m-b-32">发红包</p>
    <van-form class="ntf-yellow-form" @submit="onSubmit">
      <van-field
        v-model.trim="form.quantity"
        class="m-b-32"
        autocomplete="new-password"
        label="红包个数"
        placeholder="请填写红包个数"
        :rules="[
          { required: true, message: '请填写红包个数' },
          {
            pattern: /^[1-9]\d*$/,
            message: '请输入正整数',
          },
        ]"
      >
        <template #button> <span class="left-text p-r-8">个</span> </template>
      </van-field>
      <van-field
        class="m-b-32"
        v-model.trim="form.money"
        autocomplete="new-password"
        label="红包金额"
        :rules="[
          { required: true, message: '请填写金额' },
          {
            pattern: /^[1-9]\d*$/,
            message: '请输入正整数',
          },
        ]"
      >
        <template #button> <span class="left-text p-r-8">元</span> </template>
      </van-field>
      <van-field
        v-model.trim="form.describes"
        autocomplete="new-password"
        :rules="[
          {
            validator: (value) => value.length <= 14, // 长度不超过 14
            message: '最多 14 个字符',
          },
        ]"
        label="标题"
      >
        <template #button> <span class="left-text p-r-8"></span> </template>
      </van-field>
      <ul class="center-center m-t-48">
        <li class="m-r-32" @click="show = false">
          <van-button round block type="info" native-type="button"
            >取消</van-button
          >
        </li>
        <li>
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </li>
      </ul>
    </van-form>
  </van-popup>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import userApi from '@/api/user';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'PopupMoney',
  data() {
    return {
      show: false,
      form: {
        quantity: '',
        money: '',
        describes: '恭喜发财，大吉大利',
      },
    };
  },
  computed: {
    ...mapState('chat', ['messages', 'playerId', 'query', 'ws', 'wsStatus']),
  },
  watch: {
    wsStatus() {
      this.alertReload();
    },
  },
  methods: {
    ...mapActions('chat', [
      'initWebSocket',
      'closeWebSocket',
      'sendMessage',
      'fetchHistory',
    ]),
    alertReload() {
      if (this.wsStatus === false) {
        this.show = false;
      }
    },
    onSubmit() {
      const params = {
        ...this.form,
      };
      if (!params.describes) {
        params.describes = '恭喜发财，大吉大利';
      }
      this.sendMessage({
        type: 3,
        data: JSON.stringify(params),
      });
      this.show = false;
    },
  },
};
</script>
<style scoped lang="scss">
.popupMoney {
  width: 510px;
  height: 407px;
  background: #774230;
  padding-left: 58px;
  .left-text {
    color: #000;
  }
  .pop-title {
    font-size: 16px;
    color: #feedaf;
  }
}
</style>
