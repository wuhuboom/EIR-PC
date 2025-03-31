<template>
  <div>
    <section class="app-main">
      <div>
        <div class="main-page-banners">
          <div>
            <el-carousel :interval="5000" arrow="always">
              <el-carousel-item v-for="(p, i) in slider" :key="i">
                <img
                  class="carousel-img"
                  @click="goDetail(p)"
                  :src="p.imageUrl"
                />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="main-page-account">
            <InfoMain />
          </div>
        </div>
        <div class="main-page-3d">
          <div class="main-page-car">
            <div class="main-page-plat">
              <div class="main-page-notice">
                <div class="main-page-notice-title">公告信息</div>
                <div style="width: 370px">
                  <van-notice-bar
                    style="
                      background-color: transparent;
                      height: 30px;
                      margin-top: -6px;
                      color: #fff;
                    "
                    :text="noticeDoc.content"
                  />
                </div>
              </div>
              <div class="main-page-cp">
                <div class="common_layout_center_v">
                  <a :href="`#/game/hall?id=${gid}`" class=""
                    ><div
                      class="cp-item-main"
                      style="
                        background: url('/static/cp_ssc.png') 0% 0% / 100% 100%;
                      "
                    >
                      <div class="cp-item-title"></div></div
                  ></a>
                  <a href="#/game/hall" class=""
                    ><div
                      class="cp-item-main"
                      style="
                        background: url('/static/cp_11_5.png') 0% 0% / 100% 100%;
                        margin-top: 6px;
                      "
                    >
                      <div class="cp-item-title"></div></div
                  ></a>
                </div>
                <div class="common_layout_center_v main-page-cp-middle">
                  <a href="#/game/hall" class=""
                    ><div
                      class="cp-item-main"
                      style="
                        background: url('/static/cp_k3.png') 0% 0% / 100% 100%;
                      "
                    >
                      <div class="cp-item-title"></div></div
                  ></a>
                  <a href="#/game/hall" class=""
                    ><div
                      class="cp-item-main"
                      style="
                        background: url('/static/cp_kl.png') 0% 0% / 100% 100%;
                        margin-top: 6px;
                      "
                    >
                      <div class="cp-item-title"></div></div
                  ></a>
                </div>
                <div class="common_layout_center_v">
                  <a href="#/game/hall" class=""
                    ><div
                      class="cp-item-main"
                      style="
                        background: url('/static/cp_pk10.png') 0% 0% / 100% 100%;
                      "
                    >
                      <div class="cp-item-title"></div></div
                  ></a>
                  <a :href="`#/game/hall?id=${did}`" class=""
                    ><div
                      class="cp-item-main"
                      style="
                        background: url('/static/cp_dp.png') 0% 0% / 100% 100%;
                        margin-top: 6px;
                      "
                    >
                      <div class="cp-item-title"></div></div
                  ></a>
                </div>
                <div style="margin-left: 14px">
                  <div class="lottery-tab-main">
                    <div class="lottery-tab-discover">
                      <svg
                        width="100%"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <text
                          text-anchor="middle"
                          dominant-baseline="middle"
                          x="50%"
                          y="50%"
                          fill="#FDD99B"
                          class="cp-text"
                          style="font-size: 11px"
                        >
                          中奖公告
                        </text>
                      </svg>
                    </div>
                    <div class="lottery-tab-container">
                      <div
                        class="lottery-tab-content"
                        v-for="(v, k) in wins"
                        :key="k"
                      >
                        <div class="lottery-tab-content-left no-grow">
                          <div class="lottery-tab-num no-grow"></div>
                          <p class="els m-r-4 m-l-4" style="font-size: 10px">
                            {{ v.playerName }}
                          </p>
                        </div>
                        <p class="els no-grow" style="font-size: 10px">
                          {{ v.nickname }}
                        </p>
                        <p class="cp-text">{{ divide(v.money) }}元</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="main_page_card">
                <p
                  class="d-fucai"
                  style="margin-left: 108px"
                  @click="
                    $router.push({ path: '/game/hall', query: { id: did } })
                  "
                >
                  <img class="d-img" src="@/assets/img/b1.png" alt="" />
                </p>
                <p class="d-fucai">
                  <img class="d-img" src="@/assets/img/b2.png" alt="" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="main-page-recommend">
          <div class="main-page-recommend-content">
            <div class="promotion-main">
              <div class="promotion-title">优惠活动</div>
              <div class="promotion-images">
                <div class="el-image promotion-image">
                  <img src="@/static/p1.jpeg" class="el-image__inner" /><!---->
                </div>
                <div class="el-image promotion-image">
                  <img src="@/static/p2.jpeg" class="el-image__inner" /><!---->
                </div>
              </div>
            </div>
            <div
              class="lottery-recommend-main"
              style="margin-right: 9px; margin-left: 9px"
            >
              <div class="lottery-recommend-label">平台推荐</div>
              <div class="lottery-recommend-images">
                <a :href="`#/game/hall`" class=""
                  ><div class="lottery-item-main lottery-item-left">
                    <div class="el-image lottery-item-image">
                      <img
                        src="@/static/lottery_ssc_cq.png"
                        class="el-image__inner"
                      /><!---->
                    </div>
                    <div class="lottery-item-text"></div></div
                ></a>
                <a href="#/game/hall" class=""
                  ><div class="lottery-item-main lottery-item-middle">
                    <div class="el-image lottery-item-image">
                      <img
                        src="@/static/lottery_ssc_xj.png"
                        class="el-image__inner"
                      /><!---->
                    </div>
                    <div class="lottery-item-text"></div></div
                ></a>
                <a href="#/game/hall" class=""
                  ><div class="lottery-item-main lottery-item-right">
                    <div class="el-image lottery-item-image">
                      <img
                        src="@/static/lottery_ssc_five.png"
                        class="el-image__inner"
                      /><!---->
                    </div>
                    <div class="lottery-item-text"></div></div
                ></a>
              </div>
              <div class="lottery-recommend-divider"></div>
              <div class="lottery-recommend-images">
                <a href="#/game/hall" class=""
                  ><div class="lottery-item-main lottery-item-left">
                    <div class="el-image lottery-item-image">
                      <img
                        src="@/static/lottery_k3_gx.png"
                        class="el-image__inner"
                      /><!---->
                    </div>
                    <div class="lottery-item-text"></div></div
                ></a>
                <a href="#/game/hall" class=""
                  ><div class="lottery-item-main lottery-item-middle">
                    <div class="el-image lottery-item-image">
                      <img
                        src="@/static/lottery_happy_gd.png"
                        class="el-image__inner"
                      /><!---->
                    </div>
                    <div class="lottery-item-text"></div></div
                ></a>
                <a href="#/game/hall" class=""
                  ><div class="lottery-item-main lottery-item-right">
                    <div class="el-image lottery-item-image">
                      <img
                        src="@/static/lottery_boat.png"
                        class="el-image__inner"
                      /><!---->
                    </div>
                    <div class="lottery-item-text"></div></div
                ></a>
              </div>
            </div>
            <div class="main-page-games">
              <div
                class="game-item-main"
                @click="
                  $router.push({ path: '/game/hall', query: { id: did } })
                "
              >
                <div class="el-image game-item-image">
                  <img
                    src="@/static/cp_ssc.png"
                    class="el-image__inner"
                  /><!---->
                </div>
                <div class="game-item-text">
                  <div>
                    <div class="game-item-title">平台游戏</div>
                    <div class="game-item-desc">
                      <svg
                        width="100%"
                        height="14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <!---->
                        <text
                          text-anchor="start"
                          dominant-baseline="middle"
                          x="0%"
                          y="50%"
                          fill="#8F614D"
                          style="font-size: 11px"
                        >
                          丰富游戏，精彩无限
                        </text>
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                      </svg>
                    </div>
                  </div>
                  <div href="#/game/detail/ssc/ssc_cq" class="">
                    <div class="game-item-button">
                      <div>
                        立即游戏
                        <i class="el-icon-caret-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="game-item-main"
                @click="
                  $router.push({ path: '/game/hall', query: { id: did } })
                "
              >
                <div class="el-image game-item-image">
                  <img
                    src="@/static/cp_dp.png"
                    class="el-image__inner"
                  /><!---->
                </div>
                <div class="game-item-text">
                  <div>
                    <div class="game-item-title">平台游戏</div>
                    <div class="game-item-desc">
                      <svg
                        width="100%"
                        height="14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <!---->
                        <text
                          text-anchor="start"
                          dominant-baseline="middle"
                          x="0%"
                          y="50%"
                          fill="#8F614D"
                          style="font-size: 11px"
                        >
                          丰富游戏，精彩无限
                        </text>
                      </svg>
                    </div>
                  </div>
                  <div href="#/game/detail/lf/lf_3d" class="">
                    <div class="game-item-button">
                      <div>
                        立即游戏
                        <i class="el-icon-caret-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="app-bar-main">
              <div class="app-bar-item">
                <div class="app-bar-div">
                  <div id="id_android" @click="goApp(0)">
                    <QrcodeVue :value="dev[0]?.appUrl || ''" :size="67" />
                  </div>
                </div>
                <div class="app-bar-title">App安卓版</div>
              </div>
              <div class="app-bar-item">
                <div class="app-bar-div">
                  <div id="id_ios" @click="goApp(1)">
                    <QrcodeVue :value="dev[1]?.appUrl || ''" :size="67" />
                  </div>
                </div>
                <div class="app-bar-title">App苹果版</div>
              </div>
            </div>
          </div>
        </div>
        <div style="z-index: 999">
          <!---->
        </div>
        <el-dialog
          :title="itemDoc.title"
          :visible.sync="show"
          width="30%"
          center
        >
          <div class="p-b-48 pre-line">
            {{ itemDoc.content }}
          </div>
        </el-dialog>
      </div>
    </section>
  </div>
</template>

<script>
import userApi from '@/api/user';
import InfoMain from '@/components/InfoMain';
import auth from '@/plugins/auth';
import QrcodeVue from 'qrcode.vue';
export default {
  name: 'HomePage',
  data() {
    return {
      show: false,
      wins: [],
      slider: [],
      noticeDoc: {
        content: '',
      },
    };
  },
  computed: {
    Cards() {
      return this.$store.state.bankCard;
    },
    bankCard() {
      return this.Cards.find((v) => +v.ctype === 2) || {};
    },
    dev() {
      return this.$store.state.devApp;
    },
    gid() {
      const gdoc = this.$store.state.cat.find((v) => v.id === 0);
      const doc = gdoc.list.find((v) => v.id) || {};
      return doc.id;
    },
    did() {
      const gdoc = this.$store.state.cat.find((v) => v.id === 1);
      const doc = gdoc.list.find((v) => v.id) || {};
      return doc.id;
    },
    itemDoc() {
      return this.$store.getters.noticeDoc;
    },
  },
  components: {
    InfoMain,
    QrcodeVue,
  },
  methods: {
    goDetail(p) {
      this.$router.push({
        path: '/account/center',
        query: { id: p.policyType },
      });
    },
    async homeWinning() {
      const [err, res] = await userApi.homeWinning();
      if (err) return;
      this.wins = res.data.filter((v, k) => k <= 7);
    },
    async sliderSlide() {
      const [err, res] = await userApi.homeswiper();
      if (err) return;
      this.slider = res.data;
    },
    async homeDialog() {
      const [err, res] = await userApi.homeDialog();
      if (err) return;
      if (!res.data?.length) return;
      this.noticeDoc = res.data[0];
    },
    goApp(appType) {
      if (!this.dev[appType]) {
        return;
      }
      window.open(this.dev[appType].appUrl);
    },
    async showDliog() {
      await this.$store.dispatch('getNotice');
      const dialogs = auth.getToken('dialogs')
        ? JSON.parse(auth.getToken('dialogs'))
        : [];
      if (!dialogs.includes(this.itemDoc.id) && this.itemDoc.id) {
        this.show = true;
        dialogs.push(this.itemDoc.id);
        //dialogs 取最后10个
        if (dialogs.length > 10) {
          dialogs.shift();
        }
        auth.setToken(JSON.stringify(dialogs), 'dialogs');
      }
    },
  },
  async created() {
    this.showDliog();
    this.$store.commit('setPdTop', false);
    this.$store.dispatch('appDownload', false);
    this.homeDialog();
    this.sliderSlide();
    this.homeWinning();
    if (!this.$store.state.cat.find((v) => v.list.length)) {
      await this.$store.dispatch('playerLotteryList');
    }
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-carousel__container {
  height: 360px;
}
.carousel-img {
  display: block;
  height: 100%;
  width: 100%;
}
.d-fucai {
  width: 337px;
}
.lottery-tab-content-left {
  width: auto;
}
.els {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 30px;
}
.lottery-tab-discover {
  margin-top: -3px;
}
::v-deep {
  [role='dialog'] {
    background-color: #623525;

    .el-dialog__body,
    .el-dialog__title {
      color: rgb(253, 217, 155);
    }
  }
}
</style>
