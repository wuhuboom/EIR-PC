<template>
  <van-popup
    class="chat-top-bets"
    v-model="show"
    v-show="detail.id"
    position="top"
    :overlay="false"
  >
    <div class="top-bets-bot">
      <div
        v-if="head"
        class="top-bets-cont colorfff flex-column justify-around font13"
      >
        <ul class="justify-between p-l-16 p-r-8">
          <li class="d-flex">
            <van-icon
              :name="!showmenu ? 'list-switch' : 'cross'"
              @click="(showother = false), (showmenu = !showmenu)"
              class="m-r-16 m-t-4"
              :size="20"
            />
            <div>
              <p class="font16 m-b-8">
                <span> {{ detail.lotteryNameH5 }}</span>
              </p>
              <p>{{ detail.nextExpect.nextExpect }}期</p>
            </div>
          </li>
          <li class="align-center">
            投注中
            <van-count-down :time="detail.nextExpect?.countdown * 1000">
              <template #default="timeData">
                <div class="colorfff timeData align-center m-l-16">
                  <span class="block center-center m-r-16">{{
                    timeData.hours >= 10 ? timeData.hours : `0${timeData.hours}`
                  }}</span>

                  <span class="block center-center m-r-16">{{
                    timeData.minutes >= 10
                      ? timeData.minutes
                      : `0${timeData.minutes}`
                  }}</span>

                  <span class="block center-center">{{
                    timeData.seconds >= 10
                      ? timeData.seconds
                      : `0${timeData.seconds}`
                  }}</span>
                </div>
              </template>
            </van-count-down>
            <p
              class="align-center color-yellow m-l-16"
              @click="
                $router.push({
                  path: `/game/hall`,
                  query: {
                    id: curCat.id,
                    type: curCat.lotteryType,
                  },
                })
              "
            >
              <span>去投注</span><van-icon class="m-l-16" name="arrow" />
            </p>
          </li>
        </ul>
        <div>
          <ul
            class="table-lists align-center justify-around"
            @click="(showmenu = false), (showother = !showother)"
          >
            <li>{{ prize.cycleNum }}期</li>
            <li class="center-center">
              <p
                v-for="(v, i) in prize.openArr"
                class="openbets center-center"
                :class="[
                  'openbets' + i,
                  { 'm-r-8': i != prize.openArr.length - 1 },
                ]"
                :key="i"
              >
                {{ v }}
              </p>
            </li>
            <li>
              <van-icon :name="!showother ? 'arrow-down' : 'arrow-up'" />
            </li>
          </ul>
        </div>
      </div>
      <div v-if="showother">
        <ul
          class="align-center other-prize justify-around"
          v-for="(v, i) in otherPrize"
          :key="i"
        >
          <li class="center-center">{{ v.cycleNum }}期</li>
          <li class="center-center colorfff">
            <p
              class="openbets center-center"
              :class="[
                'openbets' + i2,
                { 'm-r-8': i2 != prize.openArr.length - 1 },
              ]"
              v-for="(v2, i2) in v.openArr"
              :key="i2"
            >
              {{ v2 }}
            </p>
          </li>
          <li style="opacity: 0"><van-icon name="arrow-down" /></li>
        </ul>
      </div>
      <div class="select-box" v-if="showmenu">
        <div
          class="select"
          v-for="(item, index) in catList"
          :key="index"
          @click="changeId(item.id)"
          :class="{ on: id === item.id }"
        >
          {{ item.lotteryNameH5 }}
        </div>
      </div>
      <p
        class="slides"
        :class="{ slidesclose: !head }"
        @click="head = !head"
      ></p>
    </div>
  </van-popup>
</template>

<script>
import { mapGetters } from 'vuex';
import userApi from '@/api/user';
export default {
  data() {
    return {
      show: true,
      id: null,
      results: [],
      head: true,
      showother: false,
      showmenu: false,
      detail: {
        mulConfig: [],
        nextExpect: {},
      },
    };
  },
  computed: {
    ...mapGetters(['catList']),
    prize() {
      return this.results[0] || {};
    },
    otherPrize() {
      return this.results.slice(1);
    },
    curCat() {
      return this.catList.find((v) => v.id === this.id);
    },
  },
  watch: {
    head(val) {
      if (!val) {
        this.showother = false;
        this.showmenu = false;
      }
    },
  },
  methods: {
    open() {
      this.show = true;
    },
    async lotteryBetsOrder() {
      const query = {
        id: this.id,
        pageNo: 1,
        pageSize: 8,
      };
      const [err, res] = await userApi.lotteryHisExpect(query);
      if (err) {
        return;
      }
      res.data.results = res.data.results.map((v) => {
        v.openArr = v.openNum.split(',');
        return v;
      });
      this.results = res.data.results;
    },
    async getDetail() {
      const [err, res] = await userApi.betsDetail({ id: this.id });
      if (err) return;
      res.data.mulConfig = JSON.parse(res.data.mulConfig);
      //value
      if (!res.data.nextExpect) {
        res.data.nextExpect = {};
      }
      if (
        this.detail.id !== res.data.id ||
        this.detail.nextExpect.nextExpect !== res.data.nextExpect.nextExpect
      ) {
        this.detail = res.data;
        this.lotteryBetsOrder();
      }
    },
    changeId(id) {
      this.id = id;
      sessionStorage.setItem('lotteryId', id);
      this.getDetail();
      this.showmenu = false;
    },
  },
  created() {
    this.id = +sessionStorage.getItem('lotteryId') || +this.catList[0].id;
    this.getDetail();
    //getDetail d定时检查
    this.timer = setInterval(() => {
      this.getDetail();
    }, 6000);
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer);
  },
};
</script>
<style scoped lang="scss">
.chat-top-bets {
  z-index: 3 !important;
  padding-top: 90px;
  overflow: visible;
}
.top-bets-bot {
  position: relative;
}
$height: 246px;
$tabwidth: 686px;
.box-p-t {
  padding-top: $height;
}
.top-bets-cont {
  background: url('@/assets/img/betsbg.png') no-repeat center;
  background-size: 100% 100%;
  height: $height;
  .table-lists {
    width: $tabwidth;
    height: 96px;
    background: #7284d8;
    border-radius: 12px 12px 12px 12px;
    margin: 0 auto;
  }
  .color-yellow {
    color: #f6c343;
  }
}
.slides {
  width: 134px;
  height: 40px;
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: url('@/assets/img/close-bet.png') no-repeat center;
  background-size: 100% 100%;
}
.slidesclose {
  background: url('@/assets/img/open-bet.png') no-repeat center;
  background-size: 100% 100%;
}
.openbets {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #dcae3e;
}
.openbets1 {
  background: #58b2e3;
}
.openbets2 {
  background: #de9fe7;
}
.openbets3 {
  background: #efb187;
}
.openbets4 {
  background: #dc6957;
}
.other-prize {
  width: $tabwidth;
  margin: 0 auto;
  height: 88px;
  border-bottom: 1px solid #f5f6f7;
}
.select-box {
  position: relative;
  background: #fff;
  padding: 40px 34px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 40px;
  width: 100%;
  .select {
    width: 200px;
    height: 68px;
    text-align: center;
    line-height: 68px;
    border: 1px solid #999999;
    border-radius: 14px;
    color: #666666;
    font-size: 28px;
    overflow: hidden;
    &.on {
      color: #bf2935;
      border: 1px solid #bf2935;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        background: url('@/assets/img/Welfare3D/dui.png') no-repeat;
        background-size: 100% auto;
        width: 36px;
        height: 36px;
        right: -1px;
        bottom: -1px;
      }
    }
  }
}
.timeData {
  //221px x 76px
  width: 221px;
  height: 76px;

  .block {
    background: url('@/assets/img/bets-num.png') no-repeat;
    background-size: 100% 100%;
    width: 61px;
    height: 64px;
    font-size: 48px;
    color: #000000;
  }
}
</style>
