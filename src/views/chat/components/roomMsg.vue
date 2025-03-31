<template>
  <div
    class="d-flex"
    :class="{
      'my-msg': doc.playerId === user.id,
      'center-center': doc.status == 1,
    }"
  >
    <ul
      v-if="doc.status == 1"
      class="center-center flex-column m-t-12 m-b-12 font14 color999"
    >
      <li class="m-b-4">{{ $dayjsTime(doc.time) }}</li>
      <li>
        {{ isMe ? '你撤回了一条消息' : `${doc.user}撤回了一条消息` }}
      </li>
    </ul>
    <div v-else class="room-msg p-l-24 p-l-24 d-flex m-b-12">
      <img
        class="d-img user-pic"
        :class="[doc.playerId === user.id ? 'm-l-12 m-r-24' : ' m-r-12']"
        :src="
          doc.img
            ? doc.img.includes('http')
              ? doc.img
              : `${$baseURL}/${doc.img}`
            : userPic
        "
      />
      <ul class="flex-column">
        <li class="name align-center">
          <span class="m-r-8">{{ doc.user }}</span>
          <span>{{ $dayjsTime(doc.time) }}</span>
        </li>
        <li class="msg-txt-box d-flex">
          <el-popover
            placement="bottom-start"
            width="128"
            :open-delay="300"
            trigger="hover"
            class="p-x-4"
            :disabled="popoverDisabled"
            popper-class="popper-class-replay"
            @show="show(doc)"
            ref="popoverRef"
          >
            <ul class="popover-content">
              <li
                class="center-center"
                v-for="action in countActions"
                :key="action.value"
                @click="onSelect(action.value)"
              >
                {{ action.text }}
              </li>
            </ul>
            <div slot="reference" :data-reference="doc.type">
              <component
                v-if="[2, 4, 8, 13, 14].includes(+doc.type)"
                :is="currentComponent(+doc.type)"
                :userPic="userPic"
                :doc="doc"
                ref="$component"
              ></component>
              <template v-else-if="+doc.type === 0 && isCustomImage(doc.data)">
                <img
                  :src="getImageSrc(doc.data)"
                  class="msg-img"
                  @click="openModal(getImageSrc(doc.data))"
                />
              </template>
              <template v-else>
                <p
                  class="msg-txt p-x-8 m-t-4"
                  v-if="[10, 13].includes(+doc.type)"
                  v-html="highlightedText(doc.data?.msg)"
                ></p>
                <p class="msg-txt p-x-8 m-t-4" v-else>
                  {{ doc.data }}
                </p>
              </template>
            </div>
          </el-popover>
        </li>
      </ul>
    </div>
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content">
        <img :src="selectedImage" alt="放大图片" class="modal-image" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import userPic from '@/assets/img/user-room.png';
import bindBuy from '@/views/chat/components/bindBuy.vue';
import redImg from '@/views/chat/components/redImg.vue';
import imgMsg from '@/views/chat/components/imgMsg.vue';
import repalyMsg from '@/views/chat/components/repalyMsg.vue';
import opensMsg from '@/views/chat/components/opensMsg.vue';

export default {
  data() {
    return {
      userPic,
      isModalOpen: false,
      selectedImage: '',
      actions: [
        { text: '撤回', value: 1, disabled: false },
        { text: '回复', value: 2, disabled: false },
      ],
      imageMap: {
        '[中奖喷雾]': require('@/assets/img/zjpw.png'),
        '[求佛]': require('@/assets/img/qf.png'),
        '[烧香]': require('@/assets/img/sx.gif'),
        '[熊猫烧香]': require('@/assets/img/xmsx.gif'),
      },
    };
  },
  components: {
    bindBuy,
    redImg,
    imgMsg,
    repalyMsg,
    opensMsg,
  },
  computed: {
    popoverDisabled() {
      if (![0, 8, 10, 13].includes(+this.doc.type)) {
        return true;
      }
      return this.disabled;
    },
    countActions() {
      return this.actions.filter((v) => !v.disabled);
    },
    isMe() {
      return this.doc.playerId === this.user.id;
    },
    user() {
      return this.$store.state.user;
    },
    doc() {
      let data;
      try {
        data = JSON.parse(this.item.data);
      } catch (error) {
        data = this.item.data;
      }
      return {
        ...this.item,
        data,
      };
    },
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapActions('chat', [
      'initWebSocket',
      'closeWebSocket',
      'sendMessage',
      'fetchHistory',
    ]),
    contextmenu(event) {
      event.preventDefault();
      this.showPopover = true;
      console.log('contextmenu', event);
    },
    highlightedText(v) {
      return v.replace(
        /@(\w+)/g,
        '<span style="color:#488fca;margin:0 2px;">@$1</span>'
      );
    },
    comfire(v) {
      return new Promise((resolve) => {
        this.$confirm(v, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: 'g-confirm-box',
        })
          .then(() => resolve(1))
          .catch(() => resolve(0));
      });
    },
    onSelect(v) {
      if (v === 1) {
        this.recallMessage(this.doc);
        return;
      }
      this.$emit('reply', this.doc);
      this.$refs.popoverRef.doClose();
    },
    show(doc) {
      if (new Date().getTime() - doc.time > 120000 || !this.isMe) {
        this.actions[0].disabled = true;
      }
    },
    async recallMessage(doc) {
      const status = await this.comfire('是否撤回消息？');
      if (!status) return;
      this.sendMessage({
        type: 9,
        data: JSON.stringify({ id: doc.id }),
      });
    },
    visib() {
      if (this.$refs.$component?.visib) {
        this.$refs.$component.visib();
      }
    },
    currentComponent(type) {
      switch (type) {
        case 2:
          return 'bindBuy';
        case 4:
          return 'redImg';
        case 8:
          return 'imgMsg';
        case 13:
          return 'repalyMsg';
        case 14:
          return 'opensMsg';
        default:
          return 'redImg';
      }
    },
    isCustomImage(data) {
      return ['[中奖喷雾]', '[求佛]', '[烧香]', '[熊猫烧香]'].includes(data);
    },
    getImageSrc(data) {
      return this.imageMap[data];
    },
    openModal(imageSrc) {
      this.selectedImage = imageSrc;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>

<style lang="scss">
.my-msg {
  justify-content: flex-end;
  .room-msg {
    flex-direction: row-reverse;
  }
  .name {
    justify-content: flex-end !important;
  }
  .msg-txt {
    text-align: right;
  }
  .msg-txt-box {
    justify-content: flex-end;
  }
}
.room-msg {
  color: #000;
  .user-pic {
    border-radius: 50%;
    width: 38px;
    height: 38px;
  }
  .name {
    color: #999999;
    &,
    span {
      line-height: 1;
    }
  }
  .msg-txt {
    background: #ffffff;
    border-radius: 5px 5px 5px 5px;
    border: 1px solid #f0f0f0;
    display: inline-flex;
  }
}
.popover-content {
  li {
    height: 30px;
    border-bottom: 1px solid #ebedf0;
    cursor: pointer;
  }
  li:last-child {
    border-bottom-color: transparent;
  }
}
.msg-img {
  max-width: 100px;
  max-height: 100px;
  cursor: pointer;
}
</style>

<style lang="scss">
body {
  .popper-class-replay[role='tooltip'] {
    min-width: auto;
    padding: 4px;
  }
}
</style>
<style scoped>
/* 模态框遮罩层 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* 半透明黑色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 放大显示的图片 */
.modal-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 放大图片的样式 */
.modal-image {
  object-fit: cover; /* 保持图片的比例填充区域，不会被拉伸 */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
