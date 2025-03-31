<template>
  <el-image
    class="m-t-12"
    style="width: 100px; height: 100px"
    :src="httpSrc"
    fit="cover"
    :preview-src-list="[httpSrc]"
  >
  </el-image>
</template>

<script>
import { mapActions } from 'vuex';
import { ImagePreview } from 'vant';
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
    preview() {
      console.log('preview', this.httpSrc);
      ImagePreview([this.httpSrc]);
    },
  },
};
</script>
<style scoped lang="scss">
.red-img {
  width: 468px;
  height: 172px;
  img {
    object-fit: contain;
  }
}
.popupOpen {
  padding-top: 146px;
  width: 510px;
  height: 794px;
  background: url('@/assets/img/openRed.png') no-repeat center;
  background-size: 100% 100%;
  color: #feedaf;

  .d-desc {
    font-size: 36px;
  }
}
.user-red {
  width: 32px;
  height: 32px;
}
.popupFinish {
  padding-top: 408px;
  width: 510px;
  height: 798px;
  background: url('@/assets/img/finishRed.png') no-repeat center;
  background-size: 100% 100%;
  .names {
    color: #191919;
  }
  .d-desc {
    color: #999999;
    font-size: 24px;
  }
  .d-meng {
    font-size: 84px;
    color: #cdac74;
    align-items: baseline;
    span {
      font-size: 24px;
    }
  }
  .view {
    color: #b78756;
    font-size: 24px;
  }
}
.table-lists {
  .hearder {
    background: #f0f0f0;
    color: #333 !important;
    margin: 0 !important;
    padding: 0 30px;
  }
  .row {
    display: grid;
    grid-template-columns: 50% 50%;
    color: #777777;
    border-bottom: 1px solid #eaeaea;
    align-items: center;
  }
  .col {
    padding: 24px 0;
    text-align: center;
  }
}
.redRecord {
  //width: 994px;
  //height: 648px;

  background: #fff;
  .red-active {
    color: #feedaf;
  }
  .red-close {
    position: absolute;
    top: 0px;
    right: 0;
    width: 108px;
  }
  .one-doc {
    height: 50px;
    border-bottom: 2px solid rgba(254, 237, 175, 0.3);
  }
}
.reg-img-cont {
  width: 468px;
  height: 172px;
  background-size: 100% 100%;
  color: #fff;
  .describes {
    padding-top: 42px;
    padding-left: 122px;
    margin-bottom: 40px;
  }
  .status {
    margin-left: 28px;
  }
}
</style>
