<template>
  <div class="app-content game-hall-main">
    <div class="game-hall-left">
      <InfoMain />
      <div style="width: 263px">
        <div class="cp-category-main" cp-list="">
          <div class="cp-category-item" v-for="(item, idx) in cat" :key="idx">
            <div
              @click="item.open = !item.open"
              class="common_layout_center_h cp-category-title-container"
              :class="{ 'cp-category-title-container-active': item.open }"
            >
              <div class="cp-category-title">
                <div class="el-image cp-category-icon">
                  <img :src="item.src" class="el-image__inner" />
                </div>
                <div style="flex: 1 1 0%">{{ item.lotteryName }}</div>
              </div>
              <img
                width="17"
                :src="
                  item.open
                    ? '/static/gameHall/arrow_up.png'
                    : '/static/gameHall/arrow_down.png'
                "
              />
            </div>
            <div v-if="item.open">
              <div
                class="cp-category-children p-b-0"
                v-for="(doc, index) in item.list"
                :key="index"
              >
                <div
                  class="cp-category-text"
                  :class="{ 'cp-category-text-active': +doc.id === +id }"
                  @click="changeId(doc.id)"
                >
                  <div class="cp-category-name">{{ doc.lotteryNameH5 }}</div>
                  <div class="cp-category-line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="game-hall-content">
      <div class="game-hall-notice">
        <div class="game-hall-bar">
          <div class="game-hall-bar-title">公告信息</div>
          <p class="marquee-tips" style="flex: 1 1 0%">
            <van-notice-bar
              style="
                background-color: transparent;
                height: 30px;
                margin-top: -2px;
                color: #fff;
              "
              :text="noticeDoc.content"
            />
          </p>
        </div>
      </div>
      <div class="game-hall-result-container">
        <div class="lottery-result-main game-hall-result">
          <div style="position: relative">
            <div class="common_layout_center_h lottery-result-title">
              <div class="el-image lottery-result-image">
                <img
                  src="/static/gameHall/lottery_result_right.png"
                  class="el-image__inner"
                /><!---->
              </div>
              <div class="lottery-result-text">
                {{ detail.lotteryNameH5 }}
              </div>
              <div class="lottery-result-date">
                {{ preData.lastExpect.cycleNum }}
              </div>
              <div class="lottery-result-text" style="margin-right: 10px">
                期
              </div>
              <div class="lottery-result-text">开奖号码</div>
              <div class="el-image">
                <img
                  src="/static/gameHall/lottery_result_left.png"
                  class="el-image__inner"
                /><!---->
              </div>
            </div>
            <div class="cp-audio-main ssc-result-audio">
              <img
                src="/static/gameHall/sound_open.png"
                class="cp-audio-image"
              />
            </div>
          </div>
          <div
            class="lottery-result-balls"
            v-if="preData.lastExpect?.openNum"
            style="color: #000"
          >
            <div class="lottery-result-ball">
              <template v-for="(item, idx) in openNumArr">
                <div
                  :key="idx"
                  class="number-ball-main"
                  :style="{
                    backgroundImage: `url(
                    /static/gameHall/color_ball_${idx}.png
                  )`,
                  }"
                >
                  {{ item }}
                </div>
                <div
                  :key="`v${idx}`"
                  v-if="isbets28"
                  :style="{
                    color: '#C77C32',
                  }"
                >
                  {{ idx !== openNumArr.length - 1 ? '+' : '=' }}
                </div>
              </template>
              <template v-if="isbets28">
                <div
                  class="number-ball-main"
                  :style="{
                    backgroundImage: `url(
                    /static/gameHall/color_ball_4.png
                  )`,
                  }"
                >
                  {{ openNumAdd }}
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="next-result-main game-hall-next">
          <div class="next-result-buttons">
            <!-- next-result-button-active -->
            <div
              class="next-result-button"
              v-for="(item, idx) in tabs"
              :key="idx"
              @click="changeTab(item.id)"
              :class="{
                'next-result-button-active': item.id === curTab,
                'm-r-16 m-l-16': idx == 1,
              }"
            >
              <div class="el-image next-result-trend" v-if="item.img">
                <img
                  src="/static/gameHall/trend_chart.png"
                  class="el-image__inner"
                />
              </div>
              <div>{{ item.name }}</div>
            </div>
          </div>
          <div v-show="curTab == 0" class="next-result-current">
            <div class="next-result-current-item">
              <div class="next-result-left">
                <div class="next-result-left-text">
                  <div class="el-image next-result-image">
                    <img
                      src="/static/gameHall/left_time_clock.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                  <div>剩余投注时间</div>
                </div>
                <div
                  class="next-result-time"
                  v-if="detail.nextExpect.countdown"
                >
                  <van-count-down
                    @finish="openFish"
                    :time="detail.nextExpect.countdown * 1000"
                  />
                </div>
              </div>
            </div>
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 27px;
              "
            >
              <!-- nextExpect nextTime -->
              <div class="next-result-date-container">
                <div class="next-result-date-text">第</div>
                <div class="next-result-date">
                  {{ detail.nextExpect.nextExpect }}
                </div>
                <div class="next-result-date-text">期</div>
              </div>
            </div>
            <div class="next-result-bottom-time">
              截止时间：{{ $dayjsTime(detail.nextExpect.stopTime) }}
            </div>
          </div>
          <prePrize :id="id" v-if="curTab == 1" />
        </div>
      </div>
      <div>
        <div class="play-tab-main game-hall-tabs">
          <div class="play-tab-left"></div>
          <div class="play-tab-middle">
            <div
              class="play-tab-item"
              v-for="(item, idx) in choseNavs"
              :key="idx"
              :class="{ 'play-tab-item-active': item === curNav }"
              @click="changeNav(item)"
            >
              {{ item }}
            </div>
          </div>
          <div class="play-tab-right"></div>
        </div>
        <div class="ssc-panel-root">
          <div class="ssc-panel-tips no-shrink">
            <div
              class="example"
              title="如：投注方案：3456；开奖号码：*3456，即为中奖。"
            >
              示例
            </div>
            <div class="ssc-panel-symbol">?</div>
            <div>{{ descTxt }}</div>
          </div>
          <div
            class="ssc-panel-select"
            v-for="(item, idx) in typeList"
            :key="idx"
          >
            <div class="ssc-panel-label">{{ item.name }}：</div>
            <div class="ssc-panel-radios-div">
              <div
                class="cp-radio-main ssc-panel-radio"
                v-for="(doc, idx) in item.list"
                @click="changeValue(doc.txt)"
                :key="idx"
              >
                <div class="cp-radio-outer">
                  <div
                    class="cp-radio-inner"
                    :class="{ 'cp-radio-inner-active': doc.txt == value }"
                  ></div>
                </div>
                <div
                  class="cp-radio-text"
                  style="color: rgb(239, 204, 82)"
                  :data-name="doc.txt"
                >
                  <!-- {{ doc.txt.replace(curNav, "") }} -->
                  {{ replaceCat(item.name, doc.txt) }}
                  <!-- {{ doc.txt }} -->
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="play_bar_ball_main">
              <transition name="fade" mode="out-in">
                <component
                  :curPre="curPre"
                  @changemultiple="changemultiple"
                  ref="$cont"
                  :playType="value"
                  @total="giveTotal"
                  :is="currentComponent"
                  :key="value"
                  v-bind="getComponentProps"
                ></component>
              </transition>
            </div>
          </div>
          <div>
            <div class="ssc-panel-radios">
              <div
                v-show="
                  ![
                    '三星大小单双',
                    '三星特码',
                    '三星波色龙虎和',
                    '三星豹子顺子对子',
                  ].includes(value)
                "
                class="cp-radio-main"
                v-for="(item, idx) in preList"
                :key="idx"
                @click="changePre(item.id)"
              >
                <div class="cp-radio-outer">
                  <div
                    class="cp-radio-inner"
                    :class="{ 'cp-radio-inner-active': item.id == preId }"
                  ></div>
                </div>
                <div class="cp-radio-text" style="color: rgb(239, 204, 82)">
                  {{ item.name }}
                </div>
              </div>

              <div>
                <span class="ssc-panel-drop-label">水倍转换：</span>
                <span style="color: rgb(255, 255, 255)">{{
                  choseValue.value || docsListValue
                }}</span>
              </div>
              <div class="common_layout_center_h ssc-panel-mode-container">
                <div class="ssc-panel-mode">当前模式：</div>
                <div class="cp-radio-main">
                  <div class="cp-radio-outer">
                    <div class="cp-radio-inner cp-radio-inner-active"></div>
                  </div>
                  <div class="cp-radio-text" style="color: rgb(239, 204, 82)">
                    元
                  </div>
                </div>
              </div>
            </div>
            <div class="ssc-panel-add">
              <div class="common_layout_center_h">
                <div class="ssc-panel-font">您选择了</div>
                <div
                  class="ssc-panel-font-red"
                  style="margin-left: 5px; margin-right: 5px"
                >
                  {{ total }}
                </div>
                <div class="ssc-panel-font">注，共</div>
                <div
                  class="ssc-panel-font-red"
                  style="margin-left: 5px; margin-right: 5px"
                >
                  {{ totalMoney }}
                </div>
                <div class="ssc-panel-font">元，输入倍数：</div>
                <div
                  class="cp-step-main"
                  style="margin-left: 10px; margin-right: 10px"
                >
                  <div class="cp-step-minus" @click="multipleChange(-1)">
                    <div class="cp-step-h"></div>
                  </div>
                  <div style="text-align: center">
                    <input
                      type="number"
                      v-model.trim="multiple"
                      class="cp-step-input"
                    />
                  </div>
                  <div class="cp-step-plus" @click="multipleChange(1)">
                    <div class="cp-step-h"></div>
                    <div class="cp-step-v"></div>
                  </div>
                </div>
                <div class="ssc-panel-font">倍</div>
              </div>
              <div class="common_layout_center_h">
                <div
                  class="cp-button-main ssc-panel-button"
                  style="margin-right: 10px"
                  @click="randem"
                  v-if="!value.includes('单式')"
                >
                  <!---->
                  随机一注
                </div>
                <div
                  class="cp-button-main ssc-panel-button"
                  style="margin-right: 10px"
                  @click="clearTable"
                >
                  <!---->
                  清除投注
                </div>
                <div @click="add" class="cp-button-main ssc-panel-button">
                  <!---->
                  添加
                </div>
              </div>
            </div>
            <div
              style="
                overflow: hidden auto;
                max-height: 210px;
                width: 100%;
                margin-top: 17px;
              "
            >
              <table
                v-if="tableList.length"
                rules="all"
                class="ssc-panel-table"
              >
                <tr v-for="(item, idx) in tableList" :key="idx">
                  <td
                    width="120px"
                    height="30"
                    style="text-align: left; padding-left: 10px"
                  >
                    {{ item.model }}
                  </td>
                  <td
                    width="290px"
                    height="30"
                    title="6|1|7|3"
                    style="
                      text-overflow: ellipsis;
                      position: relative;
                      overflow: hidden;
                      white-space: nowrap;
                      text-align: center;
                      cursor: pointer;
                    "
                  >
                    {{ item.text }}
                  </td>
                  <td width="20px" height="30" style="text-align: center">
                    元
                  </td>
                  <td width="70px" height="30" style="text-align: center">
                    {{ item.total }}注
                  </td>
                  <td width="50px" height="30" style="text-align: center">
                    {{ item.multiple }}倍
                  </td>
                  <td width="80px" height="30" style="text-align: center">
                    ¥{{ item.totalMoney }}
                  </td>
                  <td
                    width="30"
                    height="30"
                    style="text-align: center"
                    @click="del(idx)"
                  >
                    <div class="ssc-panel-delete">X</div>
                  </td>
                </tr>
              </table>
              <table v-else rules="all" class="ssc-panel-table">
                <tr>
                  <td height="30" style="text-align: center">暂无投注项</td>
                </tr>
              </table>
            </div>
            <div v-if="isChase">
              <ChaseReason
                v-model="isChase"
                :tableTotal="tableTotal"
                ref="$ChaseReason"
                :id="id"
                @change="totalChase = $event"
              />
            </div>

            <div v-if="isGroup">
              <GroupBuy
                v-model="isGroup"
                :tableTotal="tableTotal"
                :typeTotalMoney="typeTotalMoney"
                ref="$groupBuy"
              />
            </div>

            <div class="ssc-panel-add">
              <div>
                <div class="common_layout_center_h">
                  <div class="ssc-panel-font">已添加</div>
                  <div
                    class="ssc-panel-font-red"
                    style="margin-left: 5px; margin-right: 5px"
                  >
                    {{ tableTotal.orders }}
                  </div>
                  <div class="ssc-panel-font">单，总注数</div>
                  <div
                    class="ssc-panel-font-red"
                    style="margin-left: 5px; margin-right: 5px"
                  >
                    {{ typeTotal }}
                  </div>
                  <div class="ssc-panel-font">注</div>
                </div>
              </div>
              <div class="common_layout_center_h">
                <div class="ssc-panel-font">总金额</div>
                <div
                  class="ssc-panel-font-red"
                  style="margin-left: 5px; margin-right: 5px"
                >
                  {{ divide(typeTotalMoney, false) }}
                </div>
                <div class="ssc-panel-font">元</div>
              </div>
              <div class="common_layout_center_h">
                <div
                  class="cp-button-main ssc-panel-button2"
                  style="margin-right: 10px"
                  @click="sendChase"
                >
                  {{ isChase ? '取消追号' : '发起追号' }}
                </div>
                <div
                  class="cp-button-main ssc-panel-button2"
                  style="margin-right: 10px"
                  @click="sendGourp"
                >
                  {{ isGroup ? '取消合买' : '发起合买' }}
                </div>
                <div
                  v-loadding="loading"
                  @click="payNow"
                  class="cp-button-main ssc-panel-button2"
                >
                  <!---->
                  立即投注
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <tipsDialog @sure="sure" ref="$tipsDialog" :autoClose="false">
      <p>请确认您的投注信息</p>
      <p>游戏：{{ curGame.lotteryNameH5 }}</p>
      <p>期数：共{{ this.isChase ? totalChase.total : 1 }}期</p>
      <p>注数：共{{ typeTotal }}注</p>
      <p>金额：共{{ divide(typeTotalMoney, false) }}元</p>
    </tipsDialog>
    <tipsDialog @sure="clearData" ref="$finshDialog" />
    <tipsDialog @sure="clearData" ref="$clearDialog" />
    <rankList :id="id" :detail="detail" ref="$rankList" />
  </div>
</template>

<script>
import userApi from '@/api/user';
import InfoMain from '@/components/InfoMain';
import auth from '@/plugins/auth';
import typeBets from '@/plugins/typeBets';
import typeConfigList from '@/plugins/typeConfigList';
import ChaseReason from '@/views/game/components/ChaseReason.vue';
import GroupBuy from '@/views/game/components/GroupBuy.vue';
import ball1 from './components/ball1';
import ball10 from './components/ball10';
import ball11 from './components/ball11';
import ball12 from './components/ball12';
import ball13 from './components/ball13';
import ball14 from './components/ball14';
import ball15 from './components/ball15';
import ball16 from './components/ball16';
import ball17 from './components/ball17';
import ball18 from './components/ball18';
import ball19 from './components/ball19';
import ball2 from './components/ball2';
import ball20 from './components/ball20';
import ball21 from './components/ball21';
import ball22 from './components/ball22';
import ball23 from './components/ball23';
import ball24 from './components/ball24';
import ball25 from './components/ball25';
import ball26 from './components/ball26';
import ball27 from './components/ball27';
import ball28 from './components/ball28';
import ball29 from './components/ball29';
import ball30 from './components/ball30';
import ball31 from './components/ball31';
import ball3 from './components/ball3';
import ball4 from './components/ball4';
import ball5 from './components/ball5';
import ball6 from './components/ball6';
import ball7 from './components/ball7';
import ball8 from './components/ball8';
import ball9 from './components/ball9';
import prePrize from './components/prePirze';
const initData = () => {
  return {
    typeBets,
    curTab: 0,
    preId: 0,
    preData: {
      hot: [],
      losses: [],
      lastExpect: {},
    },
    isChase: false,
    totalChase: {
      total: 0,
      totalMoney: 0,
    },
    isGroup: false,
    isFinsh: false,
    loading: false,
    price: 2,
    multiple: 1,
    total: 0,
    value: '',
    detail: {
      mulConfig: [],
      nextExpect: {},
    },
    tableList: [],
    catTree: [],
    nums: [],
  };
};
export default {
  name: 'gameHall',
  data() {
    return {
      ...initData(),
      docsListValue: '',
      tabs: [
        {
          name: '当前奖期',
          id: 0,
        },
        {
          name: '前期开奖',
          id: 1,
        },
        {
          name: '走势图',
          id: 2,
          img: '/static/gameHall/trend_chart.png',
        },
      ],
      preList: [
        {
          id: 0,
          name: '遗漏',
        },
        {
          id: 1,
          name: '冷热',
        },
      ],
      id: +this.$route.query.id,
      typeConfigList,
      curNav: null,
      cat: [],
    };
  },
  components: {
    rankList: () => import('@/views/game/components/rankList.vue'),
    ChaseReason,
    GroupBuy,
    InfoMain,
    prePrize,
    ball1,
    ball2,
    ball3,
    ball4,
    ball5,
    ball6,
    ball7,
    ball8,
    ball9,
    ball10,
    ball11,
    ball12,
    ball13,
    ball14,
    ball15,
    ball16,
    ball17,
    ball18,
    ball19,
    ball20,
    ball21,
    ball22,
    ball23,
    ball24,
    ball25,
    ball26,
    ball27,
    ball28,
    ball29,
    ball30,
    ball31,
  },
  computed: {
    isbets28() {
      return this.typeBets.bets28.includes(this.value);
    },
    openNumArr() {
      return this.preData.lastExpect.openNum?.split(',') || [];
    },
    openNumAdd() {
      return this.preData.lastExpect.openNum
        ?.split(',')
        .map(Number) // 转换为数字
        .reduce((acc, num) => acc + num, 0);
    },
    theOne() {
      return this.$store.state.theOne;
    },
    vuexBetPrice() {
      return this.$store.state.vuexBetPrice;
    },
    noticeDoc() {
      return this.$store.getters.noticeDoc;
    },
    typeTotalMoney() {
      if (this.isChase) {
        return this.totalChase.totalMoney;
      }
      return this.tableTotal.totalMoney;
    },
    typeTotal() {
      let num = this.tableTotal.total;
      if (this.isChase) {
        return num * this.totalChase.total;
      }
      return num;
    },
    typeList() {
      return this.catTree.find((item) => item.name === this.curNav)?.list || [];
    },
    hideMulConfig() {
      const arr = this.detail.mulConfig.filter((item) => +item.show === 0);
      return arr.map((item) => item.title);
    },
    lotteryType() {
      const doc =
        this.cat.find((v) => v.list.find((doc) => doc.id === this.id)) || {};
      return doc.lotteryType;
    },
    choseNavs() {
      return this.catTree.map((item) => item.name);
    },

    curPre() {
      const {
        losses,
        hot,
        zxzh1,
        zxzh1_hot,
        zxzh2,
        zxzh2_hot,
        zxzh3,
        zxzh3_hot,
      } = this.preData;

      switch (this.value) {
        case '三星直选复式':
          return this.preId === 0 ? losses : hot;
        case '三星一码百位':
          return this.preId === 0 ? losses[0] : hot[0];
        case '三星一码十位':
          return this.preId === 0 ? losses[1] : hot[1];
        case '三星一码个位':
          return this.preId === 0 ? losses[2] : hot[2];
        case '三星二码百十位':
          return this.preId === 0 ? [losses[0], losses[1]] : [hot[0], hot[1]];
        case '三星二码百个位':
          return this.preId === 0 ? [losses[0], losses[2]] : [hot[0], hot[2]];
        case '三星二码十个位':
          return this.preId === 0 ? [losses[1], losses[2]] : [hot[1], hot[2]];
        case '三星组六复式':
        case '三星组选组六':
        case '三星组六胆拖':
        case '三星组选组六胆拖':
        case '三星组三复式':
        case '三星组三胆拖':
        case '前三组三复式':
        case '前三组三胆拖':
        case '前三组六复式':
        case '前三组六胆拖':
        case '前三直选组合':
        case '三星独胆':
        case '三星双飞':
        case '三星对子':
        case '三星组选组三':
        case '三星组选组三胆拖':
        case '三星跨度':
          return this.preId === 0 ? [zxzh1] : [zxzh1_hot];
        case '中三组三复式':
        case '中三组三胆拖':
        case '中三组六复式':
        case '中三组六胆拖':
        case '中三直选组合':
          return this.preId === 0 ? [zxzh2] : [zxzh2_hot];
        case '后三组三复式':
        case '后三组三胆拖':
        case '后三组六复式':
        case '后三组六胆拖':
        case '后三直选组合':
          return this.preId === 0 ? [zxzh3] : [zxzh3_hot];
        case '四星直选复式':
          return this.preId === 0
            ? losses.filter((_, k) => k > 0)
            : hot.filter((_, k) => k > 0);
        case '前三直选复式':
          return this.preId === 0
            ? losses.filter((_, k) => k < 3)
            : hot.filter((_, k) => k < 3);
        case '中三直选复式':
          return this.preId === 0
            ? losses.filter((_, k) => k > 0 && k < 4)
            : hot.filter((_, k) => k > 0 && k < 4);
        case '后三直选复式':
          return this.preId === 0
            ? losses.filter((_, k) => k > 1 && k < 5)
            : hot.filter((_, k) => k > 1 && k < 5);

        // 已有的前后二直选和组选
        case '前二直选':
          return this.preId === 0 ? losses.slice(0, 2) : hot.slice(0, 2); // 前两位：万位、千位
        case '后二直选':
          return this.preId === 0 ? losses.slice(-2) : hot.slice(-2); // 后两位：十位、个位
        case '前二组选':
          return this.preId === 0 ? [zxzh1] : [zxzh1_hot]; // 前二组选使用前三组选数据
        case '后二组选':
          return this.preId === 0 ? [zxzh3] : [zxzh3_hot]; // 后二组选使用后三组选数据

        // 新增的后一直选
        case '后一直选':
          return this.preId === 0 ? losses.slice(-1) : hot.slice(-1); // 后一位：个位

        // 默认情况
        default:
          return [];
      }
    },
    catList() {
      let list = [];
      this.cat.forEach((v) => {
        list = list.concat(v.list);
      });
      return list;
    },
    curGame() {
      return this.catList.find((v) => v.id === this.id) || {};
    },
    tableTotal() {
      const total = this.tableList.reduce(
        (total, item) => total + item.total,
        0
      );
      // this.tableList 里面已经有价格 totalMoney
      let totalMoney = 0;
      this.tableList.forEach((item) => {
        totalMoney += item.totalMoney * 1;
      });
      return {
        orders: this.tableList.length,
        total,
        totalMoney,
      };
    },
    totalMoney() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.docsListValue = '';
      if (this.total == 0) return 0;
      const betList =
        this.lastTree.find((doc) => doc.txt === this.value)?.betList || [];
      if (this.theOne.includes(this.value)) {
        if (['三星组选组选'].includes(this.value)) {
          const group3 = []; // 组三（有两个相同数字）
          const group6 = []; // 组六（三个数字都不同）

          this.nums.forEach((num) => {
            const digits = num.split('').sort(); // 分割为数组并排序
            const uniqueDigits = new Set(digits); // 转 Set 统计不同数字

            if (uniqueDigits.size === 2) {
              group3.push(num); // 组三
            } else if (uniqueDigits.size === 3) {
              group6.push(num); // 组六
            }
          });
          // 获取 price3 和 price6
          let price3Obj = betList.find((item) => item.txt === '组三');
          let price6Obj = betList.find((item) => item.txt === '组六');

          let price3 = price3Obj ? price3Obj.bet : 0;
          let price6 = price6Obj ? price6Obj.bet : 0;
          let value3 = price3Obj ? price3Obj.value : 0;
          let value6 = price6Obj ? price6Obj.value : 0;
          console.log('price3:', price3, 'price6:', price6);
          // 计算总金额
          let totalAmount =
            (group3.length * price3 + group6.length * price6) * this.multiple;

          // 计算 docsListValue
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.docsListValue = this.divide(
            group3.length * value3 + group6.length * value6,
            false
          );

          return this.divide(totalAmount, false);
        }

        // 组三金额=list[号码个数-2].bet
        // 组六金额=list[号码个至少输入2个号码,每个以英文逗号","分隔，例如：1,2,3数-3].bet
        // 和值金额=list[号码].bet
        if (
          ['三星和值', '三星跨度', '三星特码', '三星组选组选'].includes(
            this.value
          )
        ) {
          const reduceNum = this.nums.reduce((total, num) => {
            return total + betList[num].value * 1;
          }, 0);
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.docsListValue = this.divide(reduceNum, false);
          //list[号码].bet 相加
          return this.nums.reduce((total, num) => {
            return total + betList[num].bet * this.multiple;
          }, 0);
        }
        if (
          ['三星大小单双', '三星波色龙虎和', '三星豹子顺子对子'].includes(
            this.value
          )
        ) {
          const reduceNum = this.nums.reduce((total, num) => {
            const betItem = betList.find((item) => item.txt === num);
            return total + betItem?.value * 1;
          }, 0);
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.docsListValue = this.divide(reduceNum, false);
          return this.nums.reduce((total, num) => {
            const betItem = betList.find((item) => item.txt === num);
            return total + (betItem?.bet || 0) * this.multiple;
          }, 0);
        }
        let cutNum = 0;
        if (['组三', '胆拖'].find((v) => this.value.includes(v))) {
          cutNum = 2;
        } else if (this.value.includes('组六')) {
          cutNum = 4;
        } else if (this.value.includes('和值')) {
          cutNum = this.nums.length;
        }
        cutNum = this.nums.length - cutNum;
        let docs = betList[cutNum] || {};
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.docsListValue = docs.value;
        console.log('三星特码');
        return docs.bet * this.multiple || 0;
      }
      return this.divide(
        this.total * this.multiple * this.getPrice(this.value),
        false
      );
    },
    currentComponent() {
      console.log(this.value);
      switch (this.value) {
        // 复式类型
        case '三星直选复式':
        case '后三直选复式':
        case '中三直选复式':
        case '前三直选复式':
          return 'ball1';

        // 单式类型
        case '三星直选单式':
        case '后三直选单式':
        case '中三直选单式':
        case '前三直选单式':
          return 'ball2';
        case '三星组选组选':
          return 'ball27';
        // 和值类型
        case '三星直选和值':
        case '后三直选和值':
        case '中三直选和值':
        case '前三直选和值':
          return 'ball3';

        // 组三复式类型
        case '三星组三复式':
        case '后三组三复式':
        case '中三组三复式':
        case '前三组三复式':
          return 'ball4';
        case '三星组选组三':
          return 'ball18';
        case '三星跨度':
          return 'ball25';
        case '三星组选组三胆拖':
          return 'ball19';
        // 组三胆拖类型
        case '三星组三胆拖':
        case '后三组三胆拖':
        case '中三组三胆拖':
        case '前三组三胆拖':
          return 'ball5';

        // 组三单式类型
        case '三星组三单式':
        case '后三组三单式':
        case '中三组三单式':
        case '前三组三单式':
          return 'ball12';
        case '三星组选组三自填':
          return 'ball20';
        case '三星组选组六自填':
          return 'ball23';
        // 组六复式类型
        case '三星组六复式':
        case '后三组六复式':
        case '中三组六复式':
        case '前三组六复式':
          return 'ball6';
        case '三星组选组六':
          return 'ball21';
        // 组六胆拖类型
        case '三星组六胆拖':
        case '后三组六胆拖':
        case '中三组六胆拖':
        case '前三组六胆拖':
          return 'ball7';
        case '三星组选组六胆拖':
          return 'ball22';
        // 组六单式类型
        case '三星组六单式':
        case '后三组六单式':
        case '中三组六单式':
        case '前三组六单式':
          return 'ball13';

        // 组选和值类型
        case '中三组选和值':
        case '后三组选和值':
        case '三星组选和值':
          return 'ball8';
        case '三星和值':
        case '三星特码':
          return 'ball24';
        // 四星类型
        case '四星直选复式':
          return 'ball9';
        case '四星直选单式':
          return 'ball10';

        // 直选组合类型
        case '后三直选组合':
        case '中三直选组合':
        case '前三直选组合':
          return 'ball11';
        case '三星独胆':
        case '三星对子':
          return 'ball14';
        case '三星双飞':
          return 'ball15';
        case '三星一码百位':
        case '三星一码十位':
        case '三星一码个位':
          return 'ball16';
        case '三星二码百十位':
        case '三星二码百个位':
        case '三星二码十个位':
          return 'ball17';
        case '三星大小单双':
        case '三星波色龙虎和':
        case '三星豹子顺子对子':
          return 'ball26';
        case '后二直选':
        case '前二直选':
          return 'ball29';
        case '后二和值':
        case '前二和值':
          return 'ball28';
        case '后一直选':
        case '后二组选':
        case '前二组选':
          return 'ball30';
        case '大小单双':
          return 'ball31';
        // 默认情况
        default:
          return 'ball1';
      }
    },
    getComponentProps() {
      if (this.value.includes('直选和值')) {
        return {
          className: 'flex-start',
        };
      }
      if (this.value === '前三直选复式') {
        return {
          titleText: ['万位', '千位', '百位'],
        };
      }
      if (this.value === '中三直选复式') {
        return {
          titleText: ['千位', '百位', '十位'],
        };
      }
      if (this.value === '后三直选复式') {
        return {
          titleText: ['百位', '十位', '个位'],
        };
      }
      if (this.value === '三星一码百位') {
        return {
          titleText: ['百位'],
        };
      }
      if (this.value === '三星一码十位') {
        return {
          titleText: ['十位'],
        };
      }
      if (this.value === '三星一码个位') {
        return {
          titleText: ['个位'],
        };
      }
      if (this.value === '三星二码百十位') {
        return {
          titleText: ['百位', '十位'],
        };
      }
      if (this.value === '三星二码百个位') {
        return {
          titleText: ['百位', '个位'],
        };
      }
      if (this.value === '三星二码十个位') {
        return {
          titleText: ['十位', '个位'],
        };
      }
      if (this.value === '三星特码') {
        return {
          titleText: ['特码'],
        };
      }
      return {
        betListDocs: this.betListDocs,
      };
    },
    fullTxt() {
      const list = [];
      this.typeList.forEach((v) => {
        v.list.forEach((doc) => {
          list.push({
            value: doc.value,
            txt: `${doc.txt}`,
            desc: doc.desc,
            key: doc.txt,
          });
        });
      });
      // list.forEach((v) => {
      //   const model = this.detail.mulConfig.find((doc) => doc.title === v.txt);
      //   if (model) {
      //     console.log(model, "------model");
      //     v.value = model.value;
      //   }
      // });
      return list;
    },
    model() {
      const model = this.fullTxt.find((item) => item.key === this.value) || {};
      return model.txt;
    },
    choseValue() {
      // console.log(
      //   this.fullTxt.find((v) => v.key === this.value),
      //   "this.value"
      // );
      return this.fullTxt.find((v) => v.key === this.value) || {};
    },
    descTxt() {
      const newAmount = this.choseValue.value || '';
      const text = this.choseValue.desc || '';
      if (!newAmount) return text;
      return text.replace(/\d+元/, newAmount + '元');
    },
    lastTree() {
      return this.extractDeepList(this.catTree);
    },
    betListDocs() {
      return this.lastTree.find((doc) => doc.txt === this.value)?.betList || [];
    },
  },
  watch: {
    id(v) {
      this.setlotteryType(v);
    },
    value() {
      this.viewHistory();
    },
    multiple(v) {
      //范围1 - 无穷大
      if (v < 1) {
        this.multiple = 1;
      }
    },
  },
  methods: {
    changemultiple(v) {
      console.log(v, 'v---');
      if (!['三星直选单式', '三星组选组选'].includes(this.value)) return;
      // this.multiple = v;
    },
    replaceCat(name, txt) {
      if (!txt) return '';
      if (name === '三星组选') {
        return txt.replace(name, '').replace(this.curNav, '');
      }
      return txt.replace(this.curNav, '');
    },
    giveTotal(v, n) {
      console.log(v, n, 'v, n');
      this.total = v;
      this.nums = n || [];
    },
    getPrice(v) {
      return this.lastTree.find((doc) => doc.txt === v)?.bet || 2;
    },
    setlotteryType(v) {
      // this.$ref.$cont?.clear();
      const type = this.catList.find((doc) => doc.id === v).lotteryType;
      if (+type === 0) {
        //高频彩
        //  this.value = "四星直选复式";
        this.curNav = 'lotteryType4';
      } else {
        //低频彩
        // this.value = "三星直选复式";
        this.curNav = 'lotteryType1';
      }
    },
    changeNav(v) {
      this.curNav = v;
      //this.value = this.typeList[0].list[0].txt;
      this.setValue();
    },
    changeTab(v) {
      if (v === 2) {
        this.$refs.$rankList.open();
        return;
      }
      this.curTab = v;
    },
    clearData() {
      this.tableList = [];
      this.isGroup = false;
      this.isChase = false;
    },
    clearTable() {
      if (!this.tableList.length) return;
      this.$refs.$clearDialog.open('确定清空已投注内容？');
    },
    sendGourp() {
      if (this.tableTotal.total < 1) {
        this.$refs.$finshDialog.open('订单注数低于 1 注，不能发起合买');
        return;
      }
      if (!this.$refs.$groupBuy) {
        this.isGroup = true;
      }

      this.$nextTick(() => {
        this.$refs.$groupBuy.toggle();
      });
    },
    sendChase() {
      if (this.tableTotal.total < 1) {
        this.$refs.$finshDialog.open('订单注数低于 1 注，不能发起追号');
        return;
      }
      if (!this.$refs.$ChaseReason) {
        this.isChase = true;
      }
      this.$nextTick(() => {
        this.$refs.$ChaseReason.toggle();
      });
    },
    changePre(v) {
      this.preId = v;
    },
    openFish() {
      this.isGroup = false;
      this.isChase = false;
      this.$refs.$finshDialog.open(
        `当前期数【${this.detail.nextExpect.nextExpect}】已停止下注，是否清空已投注内容？`
      );
    },
    finish() {
      if (this.detail.nextExpect.countdown === undefined) return;
      this.isFinsh = true;
      //this.openFish();
      this.changeId();
    },
    sleep(v = 1) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, v * 1000);
      });
    },
    async changeId(v) {
      //删除 body van-toast--unclickable
      if (+v) {
        if (this.id === v) {
          return;
        }
        this.$refs.$cont?.clear();
        this.id = v;
      }
      document.body.classList.add('body-toast--visible');
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      Object.assign(this.$data, initData());
      await this.initDetail();
      await this.sleep();
      this.$toast.clear();
      document.body.classList.remove('body-toast--visible');
    },
    openDiag() {
      this.$refs.$tipsDialog.open();
    },
    async payNow() {
      if (this.tableList.length === 0) return;
      this.openDiag();
    },
    async lazyGetUser() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      await this.sleep(1.5);
      await this.$store.dispatch('getInfo');
      this.$toast.clear();
    },
    async sure() {
      if (this.loading) return;
      let dataStr = '';
      this.tableList.forEach((v) => {
        //dataStr += `${v.model} ${v.text} ${v.multiple}/`;
        if (!dataStr) {
          dataStr = `${v.model} ${v.text} ${v.multiple} ${v.total} ${v.price}`;
        } else {
          dataStr += `/${v.model} ${v.text} ${v.multiple} ${v.total} ${v.price}`;
        }
      });
      if (this.isChase) {
        const chaseData = this.$refs.$ChaseReason.dataForm;
        if (chaseData.content) {
          this.lotteryBetsRes(dataStr);
          return;
        }
      }

      if (this.isGroup) {
        await this.lotteryBets(dataStr);
      } else {
        await this.ajaxPay(dataStr);
      }
    },
    async ajaxPay(v) {
      console.log(v);
      const [err] = await userApi.lotteryBet({
        lotteryId: this.id,
        betCode: v,
      });
      if (err) return;
      this.clearData();
      this.$message({
        message: '投注成功',
        type: 'success',
        duration: 2000,
        showClose: true,
      });
      this.lazyGetUser();
    },
    async lotteryBetsRes(v) {
      const params = {
        lotteryId: this.id,
        betCode: v,
        ...this.$refs.$ChaseReason.dataForm,
        together: 0,
      };
      if (this.isGroup) {
        Object.assign(params, {
          ...this.$refs.$groupBuy.dataForm,
          together: 1,
        });
      }
      const [err] = await userApi.lotteryBetsRe(params);
      if (err) return;
      this.clearData();

      this.$message({
        message: '追号成功',
        type: 'success',
        duration: 2000,
        showClose: true,
      });
      this.lazyGetUser();
    },
    comfire(v) {
      return new Promise((resolve) => {
        this.$confirm(v, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: 'g-confirm-box',
        })
          .then(() => {
            resolve(1);
          })
          .catch(() => {
            resolve(0);
          });
      });
    },
    async betsShare(id) {
      this.$toast.loading({
        forbidClick: false, // 允许点击和滚动
        duration: 0, // 持续时间为 0 表示不会自动关闭
      });
      const [err] = await userApi.lotteryBetsShare({
        id,
      });
      this.sleep(1000);
      this.$toast.clear();
      if (err) return;
      this.$toast.success('分享成功');
    },
    async chat(id) {
      const [err, res] = await userApi.chat();
      if (err) return;
      if (!res.data?.chatAble || +res.data?.shareDisabled === 0) return;
      const status = await this.comfire('合买成功分享到聊天室吗？');
      if (!status || !id) return;
      this.betsShare(id);
    },
    async lotteryBets(v) {
      const [err, res] = await userApi.lotteryBets({
        lotteryId: this.id,
        betCode: v,
        ...this.$refs.$groupBuy.dataForm,
      });
      if (err) return;
      this.clearData();
      this.chat(res.data?.id);
      this.$message({
        message: '合买成功',
        type: 'success',
        duration: 2000,
        showClose: true,
      });
      this.lazyGetUser();
    },
    multipleInupt(v) {
      console.log(v);
    },
    multipleChange(v) {
      if (v < 1) {
        this.multiple--;
        this.multiple = Math.max(1, this.multiple);
      } else {
        this.multiple++;
        this.multiple = Math.min(999, this.multiple);
      }
    },
    async playerLotteryList() {
      if (!this.$store.state.cat.find((v) => v.list.length)) {
        await this.$store.dispatch('playerLotteryList');
      }
      this.cat = JSON.parse(JSON.stringify(this.$store.state.cat));
      if (this.id) {
        this.cat.forEach((doc) => {
          if (doc.list.length && doc.list.find((v) => v.id === this.id)) {
            doc.open = true;
          }
        });
        return;
      }
      this.cat.forEach((doc) => {
        if (doc.list.length && !this.id) {
          this.id = doc.list[0].id;
          doc.open = true;
        }
      });
    },
    changeValue(value) {
      this.$refs.$cont.clear();
      this.$nextTick(() => {
        this.value = value;
      });
    },
    extractDeepList(data) {
      const result = [];
      const traverse = (arr) => {
        arr.forEach((item) => {
          if (item.list) {
            traverse(item.list);
          } else {
            result.push(item);
          }
        });
      };

      traverse(data);
      return result;
    },
    async getPreData(s) {
      if (s !== 'stop') {
        const [err, res] = await userApi.lotteryCurrExpect({ id: this.id });
        if (!err) {
          const { lastExpect } = res.data;
          const cur = this.preData.lastExpect.cycleNum;
          if (cur && lastExpect.cycleNum !== cur) {
            this.preData = res.data;
            await this.getDetail();
          }
        }
      }

      this.tirmr = setTimeout(this.getPreData, 3000);
    },
    async lotteryCurrExpect() {
      const [err, res] = await userApi.lotteryCurrExpect({ id: this.id });
      if (err) return;
      this.preData = res.data;
    },
    setValue() {
      this.typeList.forEach((item, index) => {
        item.list.forEach((v, idx) => {
          if (index === 0 && idx === 0) {
            this.value = v.txt;
          }
        });
      });
    },
    async getDetail() {
      this.$store.commit('setHallId', this.id);
      const [err, res] = await userApi.betsDetail({ id: this.id });
      if (err) return;
      this.catTree = JSON.parse(res.data.mulConfig);
      res.data.mulConfig = JSON.parse(res.data.mulConfig);
      this.setlotteryType(this.id);
      if (!res.data.nextExpect) {
        res.data.nextExpect = {};
      }
      console.log(res.data);
      const curDoc = this.setHistory();
      if (!curDoc) {
        this.curNav = this.catTree[0]?.name;
        this.setValue();
      }
    },
    initDetail() {
      // this.getDetail();
      // this.lotteryCurrExpect();
      return Promise.all([this.getDetail(), this.lotteryCurrExpect()]);
    },
    randem() {
      this.$refs.$cont.randem();
      this.$nextTick(() => {
        this.add();
      });
    },
    add() {
      const status = this.$refs.$cont.add();
      if (!status) return;
      const price = this.getPrice(this.value);
      //const totalMoney = this.divide(price * this.total * this.multiple, false);
      this.tableList.push({
        model: this.model,
        text: this.$refs.$cont.text,
        total: this.total,
        multiple: this.multiple,
        price: this.theOne.includes(this.value) ? this.totalMoney : price,
        totalMoney: this.totalMoney,
      });
      this.$refs.$cont.clear();
    },
    del(index) {
      this.tableList.splice(index, 1);
      if (this.tableList.length === 0) {
        this.clearData();
      }
    },
    setHistory() {
      const storedData = auth.getToken('curDoc');
      if (!storedData) return null;

      const arr = JSON.parse(storedData) || [];
      const curDoc = arr.find((v) => v.id === this.id);
      if (!curDoc) return null;

      const { curNav, value } = curDoc;

      const isHava = this.catTree.some(
        (v) =>
          v.name === curNav &&
          v.list?.some((doc) => doc.list?.some((item) => item.txt === value))
      );

      if (isHava) {
        this.curNav = curNav;
        this.value = value;
        return curDoc;
      }

      return null;
    },

    viewHistory() {
      if (!this.value) return;
      const arr = auth.getToken('curDoc')
        ? JSON.parse(auth.getToken('curDoc'))
        : [];
      const curDoc = {
        id: this.id,
        curNav: this.curNav,
        value: this.value,
      };
      // arr 根据id 查找，没有就插入以后就修改
      const index = arr.findIndex((v) => v.id === this.id);
      if (index === -1) {
        arr.push(curDoc);
      } else {
        arr[index] = curDoc;
      }
      //arr 保留最新20条
      if (arr.length > 20) {
        arr.shift();
      }
      auth.setToken(JSON.stringify(arr), 'curDoc');
    },
  },
  async created() {
    await this.playerLotteryList();
    await this.initDetail();
    this.getPreData('stop');
  },
  beforeDestroy() {
    this.tirmr && clearTimeout(this.tirmr);
  },
};
</script>
<style scoped lang="scss">
.game-hall-main {
  ::v-deep(.van-count-down) {
    color: #ffa800;
    font-size: 18px;
  }
  .cp-step-input {
    color: #333;
  }
  .lottery-result-ball {
    justify-content: space-around;
  }
  .number-ball-main {
    width: 72px;
    height: 72px;
    font-size: 28px;
    border-radius: 36px;
    background-size: 100% 100%;
    background-position: center;
  }
}
</style>
