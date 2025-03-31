<template>
  <div class="order-detail-main">
    <div style="right: 20px; top: 20px; position: absolute; z-index: 3">
      <div class="cp-button-main order-btn-share">
        <!---->
        分享
      </div>
    </div>
    <div class="order-detail-title">
      <div class="order-detail-cp">
        <div class="el-image order-detail-logo">
          <img
            src="/static/gameHall/icon_ssc.png"
            class="el-image__inner"
          /><!---->
        </div>
        <span>排三</span>
      </div>
      <div class="order-detail-title-text">方案详情</div>
    </div>
    <div class="order-detail-info">
      <span style="color: rgb(253, 217, 155)">发起时间：</span>
      <span style="color: rgb(255, 169, 45)">2024-12-06 19:42:20</span>
      <span style="margin-left: 50px; color: rgb(253, 217, 155)"
        >订单编号：</span
      >
      <span style="color: rgb(255, 169, 45)"
        >3a16ae2aecbbcdca3c7ba605e6715371</span
      >
      <span style="margin-left: 50px; color: rgb(253, 217, 155)">发起人：</span>
      <span style="color: rgb(255, 169, 45)">龙霸霸</span>
      <span style="margin-left: 50px; color: rgb(253, 217, 155)"
        >截止下注：</span
      >
      <span style="color: rgb(255, 169, 45)">2024-12-07 19:55:00</span>
    </div>
    <div class="order-detail-table-container">
      <table rules="all" class="order-detail-table">
        <tr align="center" style="color: rgb(255, 241, 192)">
          <td width="20%" height="50" style="background-color: rgb(50, 22, 11)">
            基本信息
          </td>
          <td width="80%">
            <table rules="all" class="order-detail-table1">
              <tr style="background-color: rgb(85, 38, 19)">
                <th height="30">订单金额</th>
                <th height="30">订单期数</th>
                <th height="30">完成期数</th>
                <th height="30">追号</th>
                <th height="30">保底</th>
                <th height="30">购买方式</th>
                <th height="30">剩余金额</th>
                <th height="30">中奖金额</th>
                <th height="30">订单状态</th>
              </tr>
              <tr
                align="center"
                style="
                  color: rgb(253, 217, 155);
                  background-color: rgb(98, 53, 37);
                "
              >
                <td height="30">
                  <span style="color: rgb(255, 155, 0)">¥24.00</span>
                </td>
                <td height="30">4</td>
                <td height="30">0</td>
                <td height="30">中奖停止追号</td>
                <td height="30">
                  <!---->
                  <!---->
                  <!---->
                  <span>无保底 | 系统满单</span>
                </td>
                <td height="30">用户合买</td>
                <td height="30">¥12.00</td>
                <td height="30">
                  <span style="color: rgb(239, 204, 82)">¥0</span>
                </td>
                <td height="30">
                  <span>待出票</span>
                </td>
              </tr>
            </table>
            <div
              style="
                display: flex;
                justify-content: flex-end;
                align-items: center;
                width: 94%;
                margin-bottom: 10px;
              "
            >
              <div>可认购：</div>
              <div style="color: rgb(255, 216, 0)">12.00</div>
              <div>元</div>
              <div style="margin-left: 20px">我要认购：</div>
              <input class="order-info-buy-input" />
              <div>元</div>
              <div class="cp-button-main order-period-revert-btn">
                <!---->
                购买
              </div>
              <div class="cp-button-main order-period-revert-btn">
                <!---->
                全包
              </div>
            </div>
          </td>
        </tr>
        <tr align="center">
          <td width="20%" height="50" style="background-color: rgb(50, 22, 11)">
            当前开奖号码
          </td>
          <td>
            <div class="order-detail-number1">
              <div
                class="number-ball-main"
                style="
                  width: 30px;
                  height: 30px;
                  font-size: 13px;
                  border-radius: 15px;
                  background: url('/static/gameHall/color_ball_0.png') 0% 0% /
                    100% 100%;
                "
              >
                -
              </div>
              <div
                class="number-ball-main order-detail-ball"
                style="
                  width: 30px;
                  height: 30px;
                  font-size: 13px;
                  border-radius: 15px;
                  background: url('/static/gameHall/color_ball_0.png') 0% 0% /
                    100% 100%;
                "
              >
                -
              </div>
              <div
                class="number-ball-main order-detail-ball"
                style="
                  width: 30px;
                  height: 30px;
                  font-size: 13px;
                  border-radius: 15px;
                  background: url('/static/gameHall/color_ball_0.png') 0% 0% /
                    100% 100%;
                "
              >
                -
              </div>
              <div
                class="number-ball-main order-detail-ball"
                style="
                  width: 30px;
                  height: 30px;
                  font-size: 13px;
                  border-radius: 15px;
                  background: url('/static/gameHall/color_ball_0.png') 0% 0% /
                    100% 100%;
                "
              >
                -
              </div>
              <div
                class="number-ball-main order-detail-ball"
                style="
                  width: 30px;
                  height: 30px;
                  font-size: 13px;
                  border-radius: 15px;
                  background: url('/static/gameHall/color_ball_0.png') 0% 0% /
                    100% 100%;
                "
              >
                -
              </div>
            </div>
          </td>
        </tr>
        <tr align="center">
          <td width="20%" height="50" style="background-color: rgb(50, 22, 11)">
            <div>投注内容</div>
            <div>(仅对跟单者公开)</div>
          </td>
          <td>
            <div>仅对跟单者公开</div>
          </td>
        </tr>
        <tr align="center">
          <td width="20%" height="50" style="background-color: rgb(50, 22, 11)">
            用户列表
          </td>
          <td>
            <div style="overflow: auto">
              <table rules="all" class="order-detail-table1">
                <tr style="background-color: rgb(85, 38, 19)">
                  <th height="30" width="20%">用户</th>
                  <th height="30" width="20%">认购金额</th>
                  <th height="30" width="20%">购买时间</th>
                  <th height="30" width="20%">所占比例</th>
                  <th height="30" width="20%">奖金</th>
                </tr>
                <tr
                  align="center"
                  style="
                    color: rgb(253, 217, 155);
                    background-color: rgb(98, 53, 37);
                  "
                >
                  <td height="30" width="20%">12</td>
                  <td height="30" width="20%">¥10.00</td>
                  <td height="30" width="20%">2024-12-06 19:42:20</td>
                  <td height="30" width="20%">41.6667%</td>
                  <td height="30" width="20%">
                    <span class="order-detail-span">¥0</span>
                  </td>
                </tr>
                <tr
                  align="center"
                  style="
                    color: rgb(253, 217, 155);
                    background-color: rgb(98, 53, 37);
                  "
                >
                  <td height="30" width="20%">江辞</td>
                  <td height="30" width="20%">¥2.00</td>
                  <td height="30" width="20%">2024-12-06 20:01:04</td>
                  <td height="30" width="20%">8.3333%</td>
                  <td height="30" width="20%">
                    <span class="order-detail-span">¥0</span>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
        <tr align="center">
          <td width="20%" height="50" style="background-color: rgb(50, 22, 11)">
            期号列表
          </td>
          <td>
            <div style="overflow: auto">
              <table rules="all" class="order-detail-table1">
                <tr style="background-color: rgb(85, 38, 19)">
                  <th height="30">期号</th>
                  <th height="30">金额</th>
                  <th height="30">倍数</th>
                  <th height="30">开奖号码</th>
                  <th height="30">开奖时间</th>
                  <th height="30">奖金</th>
                  <th height="30">状态</th>
                  <th height="30">操作</th>
                </tr>
                <tr
                  align="center"
                  style="
                    color: rgb(253, 217, 155);
                    background-color: rgb(98, 53, 37);
                  "
                >
                  <td height="30">2024328</td>
                  <td height="30" style="color: rgb(255, 155, 0)">¥6.00</td>
                  <td height="30">1</td>
                  <td height="30" width="330px">
                    <div class="order-detail-number">
                      <div
                        class="number-ball-main"
                        style="
                          width: 24px;
                          height: 24px;
                          font-size: 28px;
                          border-radius: 12px;
                          background: url('/static/gameHall/color_ball_0.png')
                            0% 0% / 100% 100%;
                        "
                      >
                        -
                      </div>
                      <div
                        class="number-ball-main order-detail-ball"
                        style="
                          width: 24px;
                          height: 24px;
                          font-size: 28px;
                          border-radius: 12px;
                          background: url('/static/gameHall/color_ball_0.png')
                            0% 0% / 100% 100%;
                        "
                      >
                        -
                      </div>
                      <div
                        class="number-ball-main order-detail-ball"
                        style="
                          width: 24px;
                          height: 24px;
                          font-size: 28px;
                          border-radius: 12px;
                          background: url('/static/gameHall/color_ball_0.png')
                            0% 0% / 100% 100%;
                        "
                      >
                        -
                      </div>
                      <div
                        class="number-ball-main order-detail-ball"
                        style="
                          width: 24px;
                          height: 24px;
                          font-size: 28px;
                          border-radius: 12px;
                          background: url('/static/gameHall/color_ball_0.png')
                            0% 0% / 100% 100%;
                        "
                      >
                        -
                      </div>
                      <div
                        class="number-ball-main order-detail-ball"
                        style="
                          width: 24px;
                          height: 24px;
                          font-size: 28px;
                          border-radius: 12px;
                          background: url('/static/gameHall/color_ball_0.png')
                            0% 0% / 100% 100%;
                        "
                      >
                        -
                      </div>
                    </div>
                  </td>
                  <td height="30"></td>
                  <td height="30">
                    <span style="color: rgb(239, 204, 82)">¥0</span>
                  </td>
                  <td height="30">
                    <span>待出票</span>
                  </td>
                  <td height="30">
                    <div>--</div>
                  </td>
                </tr>
                <tr
                  align="center"
                  style="
                    color: rgb(253, 217, 155);
                    background-color: rgb(98, 53, 37);
                  "
                >
                  <td height="30">2024329</td>
                  <td height="30" style="color: rgb(255, 155, 0)">¥6.00</td>
                  <td height="30">1</td>
                  <td height="30" width="330px">
                    <div class="order-detail-number">
                      <div
                        class="number-ball-main"
                        style="
                          width: 24px;
                          height: 24px;
                          font-size: 28px;
                          border-radius: 12px;
                          background: url('/static/gameHall/color_ball_0.png')
                            0% 0% / 100% 100%;
                        "
                      >
                        -
                      </div>
                      <div
                        class="number-ball-main order-detail-ball"
                        style="
                          width: 24px;
                          height: 24px;
                          font-size: 28px;
                          border-radius: 12px;
                          background: url('/static/gameHall/color_ball_0.png')
                            0% 0% / 100% 100%;
                        "
                      >
                        -
                      </div>
                      <div
                        class="number-ball-main order-detail-ball"
                        style="
                          width: 24px;
                          height: 24px;
                          font-size: 28px;
                          border-radius: 12px;
                          background: url('/static/gameHall/color_ball_0.png')
                            0% 0% / 100% 100%;
                        "
                      >
                        -
                      </div>
                      <div
                        class="number-ball-main order-detail-ball"
                        style="
                          width: 24px;
                          height: 24px;
                          font-size: 28px;
                          border-radius: 12px;
                          background: url('/static/gameHall/color_ball_0.png')
                            0% 0% / 100% 100%;
                        "
                      >
                        -
                      </div>
                      <div
                        class="number-ball-main order-detail-ball"
                        style="
                          width: 24px;
                          height: 24px;
                          font-size: 28px;
                          border-radius: 12px;
                          background: url('/static/gameHall/color_ball_0.png')
                            0% 0% / 100% 100%;
                        "
                      >
                        -
                      </div>
                    </div>
                  </td>
                  <td height="30"></td>
                  <td height="30">
                    <span style="color: rgb(239, 204, 82)">¥0</span>
                  </td>
                  <td height="30">
                    <span>待出票</span>
                  </td>
                  <td height="30">
                    <div>--</div>
                  </td>
                </tr>
                <tr
                  align="center"
                  style="
                    color: rgb(253, 217, 155);
                    background-color: rgb(98, 53, 37);
                  "
                >
                  <td height="30">2024330</td>
                  <td height="30" style="color: rgb(255, 155, 0)">¥6.00</td>
                  <td height="30">1</td>
                  <td height="30" width="330px">
                    <div class="order-detail-number">
                      <div
                        class="number-ball-main"
                        style="
                          width: 24px;
                          height: 24px;
                          font-size: 28px;
                          border-radius: 12px;
                          background: url('/static/gameHall/color_ball_0.png')
                            0% 0% / 100% 100%;
                        "
                      >
                        -
                      </div>
                      <div
                        class="number-ball-main order-detail-ball"
                        style="
                          width: 24px;
                          height: 24px;
                          font-size: 28px;
                          border-radius: 12px;
                          background: url('/static/gameHall/color_ball_0.png')
                            0% 0% / 100% 100%;
                        "
                      >
                        -
                      </div>
                      <div
                        class="number-ball-main order-detail-ball"
                        style="
                          width: 24px;
                          height: 24px;
                          font-size: 28px;
                          border-radius: 12px;
                          background: url('/static/gameHall/color_ball_0.png')
                            0% 0% / 100% 100%;
                        "
                      >
                        -
                      </div>
                      <div
                        class="number-ball-main order-detail-ball"
                        style="
                          width: 24px;
                          height: 24px;
                          font-size: 28px;
                          border-radius: 12px;
                          background: url('/static/gameHall/color_ball_0.png')
                            0% 0% / 100% 100%;
                        "
                      >
                        -
                      </div>
                      <div
                        class="number-ball-main order-detail-ball"
                        style="
                          width: 24px;
                          height: 24px;
                          font-size: 28px;
                          border-radius: 12px;
                          background: url('/static/gameHall/color_ball_0.png')
                            0% 0% / 100% 100%;
                        "
                      >
                        -
                      </div>
                    </div>
                  </td>
                  <td height="30"></td>
                  <td height="30">
                    <span style="color: rgb(239, 204, 82)">¥0</span>
                  </td>
                  <td height="30">
                    <span>待出票</span>
                  </td>
                  <td height="30">
                    <div>--</div>
                  </td>
                </tr>
                <tr
                  align="center"
                  style="
                    color: rgb(253, 217, 155);
                    background-color: rgb(98, 53, 37);
                  "
                >
                  <td height="30">2024331</td>
                  <td height="30" style="color: rgb(255, 155, 0)">¥6.00</td>
                  <td height="30">1</td>
                  <td height="30" width="330px">
                    <div class="order-detail-number">
                      <div
                        class="number-ball-main"
                        style="
                          width: 24px;
                          height: 24px;
                          font-size: 28px;
                          border-radius: 12px;
                          background: url('/static/gameHall/color_ball_0.png')
                            0% 0% / 100% 100%;
                        "
                      >
                        -
                      </div>
                      <div
                        class="number-ball-main order-detail-ball"
                        style="
                          width: 24px;
                          height: 24px;
                          font-size: 28px;
                          border-radius: 12px;
                          background: url('/static/gameHall/color_ball_0.png')
                            0% 0% / 100% 100%;
                        "
                      >
                        -
                      </div>
                      <div
                        class="number-ball-main order-detail-ball"
                        style="
                          width: 24px;
                          height: 24px;
                          font-size: 28px;
                          border-radius: 12px;
                          background: url('/static/gameHall/color_ball_0.png')
                            0% 0% / 100% 100%;
                        "
                      >
                        -
                      </div>
                      <div
                        class="number-ball-main order-detail-ball"
                        style="
                          width: 24px;
                          height: 24px;
                          font-size: 28px;
                          border-radius: 12px;
                          background: url('/static/gameHall/color_ball_0.png')
                            0% 0% / 100% 100%;
                        "
                      >
                        -
                      </div>
                      <div
                        class="number-ball-main order-detail-ball"
                        style="
                          width: 24px;
                          height: 24px;
                          font-size: 28px;
                          border-radius: 12px;
                          background: url('/static/gameHall/color_ball_0.png')
                            0% 0% / 100% 100%;
                        "
                      >
                        -
                      </div>
                    </div>
                  </td>
                  <td height="30"></td>
                  <td height="30">
                    <span style="color: rgb(239, 204, 82)">¥0</span>
                  </td>
                  <td height="30">
                    <span>待出票</span>
                  </td>
                  <td height="30">
                    <div>--</div>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {};
</script>
