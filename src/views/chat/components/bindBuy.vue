<template>
  <div>
    <div class="my-group-buy" @click="goDetail">
      <p class="my-title center-center">{{ doc.data.lottery }}全天计划</p>
      <div class="conts font12">
        <p class="lottery font13 align-center">{{ doc.data.lottery }}</p>
        <ul class="list-txt expect expect-color">
          <li class="d-flex">
            <p>期号:</p>
            <p>{{ doc.data.expect }}</p>
          </li>
        </ul>
        <p class="center-center" v-if="!detail.id"><van-loading /></p>
        <template v-else>
          <ul
            class="bet-code list-txt expect-color"
            v-for="(item, index) in betCode.filter((v, k) => k == 0)"
            :key="index"
          >
            <li class="d-flex">
              <p>投注玩法:</p>
              <p class="x-auto no-wrap">
                {{
                  !detail.betCode ? getVisibility(detail.visibility) : item.name
                }}
              </p>
            </li>
            <li class="d-flex">
              <p class="no-shrink">投注内容:</p>
              <div class="marquee" ref="marquee">
                <span>{{
                  !detail.betCode
                    ? getVisibility(detail.visibility)
                    : formatPositions(item.positions)
                }}</span>
                <span v-if="marqueeOverflow.betContent">{{
                  !detail.betCode
                    ? getVisibility(detail.visibility)
                    : formatPositions(item.positions)
                }}</span>
              </div>
            </li>
          </ul>
          <ul class="bet-code list-txt expect-color" v-if="detail.myBetCount">
            <li class="d-flex">
              <p>投注金额:</p>
              <p class="x-auto no-wrap">
                {{ divide(detail.myBetCount / 100, false) }}元
              </p>
            </li>
          </ul>
        </template>
        <p class="user-list">计划无神,跟反自由</p>
        <p class="btns-bet center-center">我要跟投</p>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from '@/api/user';
export default {
  name: 'PopupMoney',
  data() {
    return {
      show: true,
      detail: {},
      marqueeOverflow: {
        expect: false, // 期号
        betMethod: false, // 投注玩法
        betContent: false, // 投注内容
        betAmount: false, // 投注金额
      },
    };
  },
  props: {
    doc: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    theOne() {
      return this.$store.state.theOne;
    },
    betCode() {
      if (this.doc.data.betCode) {
        return this.$util.parseFourStarInput(this.doc.data.betCode);
      }
      return [];
    },
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    this.checkMarqueeOverflow();
  },
  updated() {
    this.checkMarqueeOverflow();
  },
  methods: {
    checkMarqueeOverflow() {
      const marquees = this.$refs.marquee;
      if (!marquees) return;

      // 如果是单个元素，转换为数组
      const marqueeArray = Array.isArray(marquees) ? marquees : [marquees];

      marqueeArray.forEach((marquee, index) => {
        const span = marquee.querySelector('span');
        if (!span) return;

        const spanWidth = span.scrollWidth;
        const marqueeWidth = marquee.clientWidth;

        // 根据索引更新对应的 marqueeOverflow 状态
        const keys = ['expect', 'betMethod', 'betContent', 'betAmount'];
        const key = keys[index] || 'unknown';

        if (spanWidth > marqueeWidth) {
          this.$set(this.marqueeOverflow, key, true);
          marquee.classList.add('animate');
        } else {
          this.$set(this.marqueeOverflow, key, false);
          marquee.classList.remove('animate');
        }
      });
    },
    formatPositions(positions) {
      if (!positions) {
        console.warn('positions is undefined or null:', positions);
        return '';
      }

      // 情况 2：positions 不是数组
      if (!Array.isArray(positions)) {
        console.warn('positions is not an array:', positions);
        return '';
      }

      // 情况 3：过滤出有效的子数组
      const validSubArrays = positions.filter((subArr) =>
        Array.isArray(subArr)
      );

      // 情况 4：如果没有有效子数组，返回空字符串
      if (validSubArrays.length === 0) {
        console.warn('No valid sub-arrays found in positions:', positions);
        return '';
      }

      // 情况 5：根据子数组数量决定解析方式
      if (validSubArrays.length === 1) {
        // 只有一个子数组，直接将元素用 '|' 分隔
        const subArr = validSubArrays[0];
        if (subArr.length === 0) {
          console.warn('Sub-array is empty:', subArr);
          return '';
        }
        return subArr.join('|'); // 例如 [5, 12, 19, 26] -> "5|12|19|26"
      } else {
        // 有多个子数组，将每个子数组的元素连接成字符串，然后用 '|' 分隔
        const formatted = validSubArrays
          .map((subArr, index) => {
            if (subArr.length === 0) {
              console.warn(`subArr at index ${index} is empty:`, subArr);
              return '';
            }
            return subArr.join(''); // 例如 [1, 3, 5, 7, 9] -> "13579"
          })
          .filter((str) => str !== ''); // 过滤掉空字符串

        if (formatted.length === 0) {
          console.warn('No valid strings found in positions:', positions);
          return '';
        }
        return formatted.join('|');
      }
    },
    showContent(v) {
      //visibility 0公开 1仅对跟单者公开 2截止后公开 3永久保密
      if (v === 0) {
        return true;
      }
      if (v === 1) {
        return this.detail.joins.some((v) => v.playerId === this.user.id);
      }
      if (v === 2) {
        if (this.detail.playerId === this.user.id) {
          return true;
        }
        return false;
      }
      if (v === 3) {
        if (this.detail.playerId === this.user.id) {
          return true;
        }
        return false;
      }
      return false;
    },
    getVisibility(v) {
      const docs = [
        {
          name: '公开',
          status: 0,
        },
        {
          name: '仅对跟单者公开',
          status: 1,
        },
        {
          name: '截止后公开',
          status: 2,
        },
        {
          name: '永久保密',
          status: 3,
        },
      ];
      return (docs.find((doc) => doc.status === v) || {}).name;
    },
    btmStatus(v) {
      return (this.$store.state.btmStatus.find((doc) => +doc.id === +v) || {})
        .name;
    },
    goDetail() {
      this.$router.push(`/order/detail/${this.doc.data.id}`);
    },
    async visib() {
      if (this.detail.id) return;
      const [err, res] = await userApi.betsOrderDetail({
        id: this.doc.data.id,
      });
      if (err) return;
      this.detail = res.data;
    },
  },
};
</script>
<style scoped lang="scss">
.my-group-buy {
  cursor: pointer;
  width: 244px;
  border-radius: 8px 8px;
  overflow: hidden;
  .my-title {
    height: 29px;
    background: #e7474c;
    color: #fff;
  }
  .list-txt {
    color: #505050;
  }
  .conts {
    padding: 0 12px 12px;
    font-size: 12px;
    background: url('@/assets/img/room.png') no-repeat 189px 8px #fff;
    background-size: 40px 40px;
  }
  .expect {
    margin-bottom: 4px;
    & > li {
      p:first-child {
        margin-right: 12px;
      }
    }
  }
  .lottery {
    font-size: 13px;
    height: 30px;
    color: #000;
  }
  .bet-code {
    & > li {
      margin-bottom: 4px;
      p:first-child {
        margin-right: 8px;
      }
    }
  }
  .btm-status {
    padding: 12px;
    background-color: #eff8ff;
  }
  .color-green {
    color: #02b500;
  }
  .color-red {
    color: #e7474c;
  }
  .user-list {
    padding: 12px 0;
  }
  .btns-bet {
    height: 31px;
    background: #e7474c;
    border-radius: 8px 8px 8px 8px;
    color: #fff;
  }
}
.expect-color {
  & > li {
    p:first-child {
      margin-right: 24px;
      color: #505050;
    }
    p:last-child {
      color: #b78756;
    }
  }
}

.marquee {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  width: 150px; /* 根据需求调整宽度 */
  height: 20px; /* 确保高度足够 */
}

.marquee span {
  display: inline-block;
  white-space: nowrap; /* 确保内容不换行 */
}

/* 只有当内容超长时才应用动画 */
.marquee.animate span {
  animation: marquee 10s linear infinite;
}

/* 无缝循环动画 */
@keyframes marquee {
  0% {
    transform: translateX(0); /* 从起始位置开始 */
  }
  100% {
    transform: translateX(-50%); /* 滑动到第二个文本的开头 */
  }
}
</style>
