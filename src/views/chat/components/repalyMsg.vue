<!-- eslint-disable no-empty -->
<!-- eslint-disable no-empty -->
<template>
  <div class="repaly-txt p-x-8 m-t-4 font12">
    <ul class="replays p-x-4 m-b-8 flex-column" @click.stop="goview(replay.id)">
      <li>
        <span>{{ replay.user }}</span>
      </li>
      <li class="font12 els" style="max-width: 400px">
        <template v-if="replay.type === 10">
          <!--  -->
          <p
            class=""
            v-if="+replay.type === 10"
            v-html="highlightedText(replayFn(replay.data))"
          ></p>
        </template>
        <template v-else-if="replay.type === 8">
          <div style="width: 20px; height: 20px">
            <img
              class="d-img"
              :src="
                replay.data.includes('http')
                  ? replay.data
                  : `${$baseURL}/${replay.data}`
              "
            />
          </div>
        </template>
        <template v-else> {{ replayData?.msg || replayData }} </template>
      </li>
    </ul>
    <p v-html="highlightedText(doc.data?.msg)"></p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'repalyMsg',
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
    replay() {
      return this.doc.data?.replay || {};
    },
    replayData() {
      try {
        return JSON.parse(this.replay.data);
      } catch (e) {
        return this.replay.data;
      }
      //return this.replay.data || {};
    },
    httpSrc() {
      return this.doc.data.includes('http')
        ? this.doc.data
        : `${this.$baseURL}/${this.doc.data}`;
    },
  },
  methods: {
    ...mapActions('chat', [
      'initWebSocket',
      'closeWebSocket',
      'sendMessage',
      'fetchHistory',
    ]),
    replayFn(v) {
      const obj = JSON.parse(v);
      return obj.msg;
    },
    goview(v) {
      document.querySelector(`[data-msg-id="${v}"]`)?.scrollIntoView();
    },
    highlightedText(v) {
      return v.replace(
        /@(\w+)/g,
        '<span style="color:#488fca;margin:0 2px;">@$1</span>'
      );
    },
  },
};
</script>
<style scoped lang="scss">
.repaly-txt {
  background: #ffffff;
  border-radius: 5px 5px 5px 5px;
  border: 1px solid #f0f0f0;
}
.replays {
  background-color: #f5f5f5;
}
</style>
