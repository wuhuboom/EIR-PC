<template>
  <div class="app-content">
    <div class="cd-main">
      <div class="cd-search">
        <div class="cd-search-conditions">
          <div class="el-image cd-search-icon">
            <img
              src="/static/activity/icon_search.png"
              class="el-image__inner"
            /><!---->
          </div>
          <span>查询</span>
        </div>
        <div class="cd-user">
          <span>发起人：</span> <input class="cd-user-input" />
        </div>
        <div class="cp-button-main cd-search-btn">
          <!---->
          查询
        </div>
      </div>
      <div class="cd-table-container">
        <table rules="cols" class="cd-table">
          <tr align="center" style="background: rgb(50, 22, 11)">
            <th height="50">发起人</th>
            <th height="50">游戏</th>
            <th height="50">战绩段位</th>
            <th height="50">月奖金</th>
            <th height="50">本周奖金</th>
            <th height="50">
              <div>每次认购</div>
              <div style="font-size: 12px">(最少1元且为整数)</div>
            </th>
            <th height="50">
              <div>定制次数</div>
              <div style="font-size: 12px">(最多999次)</div>
            </th>
            <th height="50">操作</th>
          </tr>
          <tr
            align="center"
            class="cd-tr-o"
            style="font-size: 13px; color: rgb(253, 217, 155)"
          >
            <td height="50">颠覆</td>
            <td height="50" style="color: rgb(255, 156, 0)">
              <div
                class="cp-cascader-main"
                style="width: 254px; margin-top: 5px; margin-bottom: 5px"
              >
                <div class="cp-cascader-btn">
                  <div class="cp-cascader-span"></div>
                  <i class="el-icon-caret-bottom" style="margin-right: 6px"></i>
                </div>
                <div class="cp-cascader-items">
                  <div class="cp-multi-cascader-btns">
                    <div
                      class="cp-multi-cascader-btn"
                      style="margin-left: 15px"
                    >
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_all.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>全选</span>
                    </div>
                    <div class="cp-multi-cascader-btn">
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_clear.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>清空</span>
                    </div>
                    <div
                      class="cp-multi-cascader-btn"
                      style="margin-right: 15px"
                    >
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_reverse.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>反选</span>
                    </div>
                  </div>
                  <div class="cp-cascader-columns">
                    <div class="cp-cascader-column">
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">河内五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希三分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">印尼五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希分分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">腾讯分分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">上证五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">深证五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">广东11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">山东11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">泰国11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">加拿大11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">福彩3D</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">排三</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td height="50">
              <div class="score-record-main">
                <div class="score-record-item">
                  <div class="el-image score-record-image">
                    <img
                      src="/static/activity/1.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    class="score-record-num"
                  >
                    <text
                      text-anchor="middle"
                      dominant-baseline="middle"
                      x="50%"
                      y="50%"
                      fill="#e4e4e4"
                      class="cp-text"
                      style="font-size: 12px"
                    >
                      9
                    </text>
                    <!---->
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
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">2803987.70</td>
            <td height="50" style="color: rgb(255, 156, 0)">907254.66</td>
            <td height="50">
              <input type="number" class="cd-table-input" /><span>元</span>
            </td>
            <td height="50">
              <input type="number" class="cd-table-input" /><span>次</span>
            </td>
            <td height="50">
              <div class="cp-button-main cd-table-button">
                <!---->
                定制
              </div>
            </td>
          </tr>
          <tr
            align="center"
            class="cd-tr-j"
            style="font-size: 13px; color: rgb(253, 217, 155)"
          >
            <td height="50">黎明前的朝霞</td>
            <td height="50" style="color: rgb(255, 156, 0)">
              <div
                class="cp-cascader-main"
                style="width: 254px; margin-top: 5px; margin-bottom: 5px"
              >
                <div class="cp-cascader-btn">
                  <div class="cp-cascader-span"></div>
                  <i class="el-icon-caret-bottom" style="margin-right: 6px"></i>
                </div>
                <div class="cp-cascader-items">
                  <div class="cp-multi-cascader-btns">
                    <div
                      class="cp-multi-cascader-btn"
                      style="margin-left: 15px"
                    >
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_all.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>全选</span>
                    </div>
                    <div class="cp-multi-cascader-btn">
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_clear.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>清空</span>
                    </div>
                    <div
                      class="cp-multi-cascader-btn"
                      style="margin-right: 15px"
                    >
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_reverse.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>反选</span>
                    </div>
                  </div>
                  <div class="cp-cascader-columns">
                    <div class="cp-cascader-column">
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">河内五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希三分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">印尼五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希分分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">腾讯分分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">上证五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">深证五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">广东11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">山东11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">泰国11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">加拿大11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">福彩3D</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">排三</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td height="50">
              <div class="score-record-main">
                <div class="score-record-item">
                  <div class="el-image score-record-image">
                    <img
                      src="/static/activity/2.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    class="score-record-num"
                  >
                    <text
                      text-anchor="middle"
                      dominant-baseline="middle"
                      x="50%"
                      y="50%"
                      fill="#e4e4e4"
                      class="cp-text"
                      style="font-size: 12px"
                    >
                      4
                    </text>
                    <!---->
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
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">2729002.15</td>
            <td height="50" style="color: rgb(255, 156, 0)">1396419.39</td>
            <td height="50">
              <input type="number" class="cd-table-input" /><span>元</span>
            </td>
            <td height="50">
              <input type="number" class="cd-table-input" /><span>次</span>
            </td>
            <td height="50">
              <div class="cp-button-main cd-table-button">
                <!---->
                定制
              </div>
            </td>
          </tr>
          <tr
            align="center"
            class="cd-tr-o"
            style="font-size: 13px; color: rgb(253, 217, 155)"
          >
            <td height="50">風一样的男人</td>
            <td height="50" style="color: rgb(255, 156, 0)">
              <div
                class="cp-cascader-main"
                style="width: 254px; margin-top: 5px; margin-bottom: 5px"
              >
                <div class="cp-cascader-btn">
                  <div class="cp-cascader-span"></div>
                  <i class="el-icon-caret-bottom" style="margin-right: 6px"></i>
                </div>
                <div class="cp-cascader-items">
                  <div class="cp-multi-cascader-btns">
                    <div
                      class="cp-multi-cascader-btn"
                      style="margin-left: 15px"
                    >
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_all.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>全选</span>
                    </div>
                    <div class="cp-multi-cascader-btn">
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_clear.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>清空</span>
                    </div>
                    <div
                      class="cp-multi-cascader-btn"
                      style="margin-right: 15px"
                    >
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_reverse.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>反选</span>
                    </div>
                  </div>
                  <div class="cp-cascader-columns">
                    <div class="cp-cascader-column">
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">河内五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希三分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">印尼五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希分分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">腾讯分分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">上证五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">深证五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">广东11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">山东11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">泰国11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">加拿大11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">福彩3D</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">排三</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td height="50">
              <div class="score-record-main">
                <div class="score-record-item">
                  <div class="el-image score-record-image">
                    <img
                      src="/static/activity/1.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    class="score-record-num"
                  >
                    <text
                      text-anchor="middle"
                      dominant-baseline="middle"
                      x="50%"
                      y="50%"
                      fill="#e4e4e4"
                      class="cp-text"
                      style="font-size: 12px"
                    >
                      9
                    </text>
                    <!---->
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
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">2306137.17</td>
            <td height="50" style="color: rgb(255, 156, 0)">764548.35</td>
            <td height="50">
              <input type="number" class="cd-table-input" /><span>元</span>
            </td>
            <td height="50">
              <input type="number" class="cd-table-input" /><span>次</span>
            </td>
            <td height="50">
              <div class="cp-button-main cd-table-button">
                <!---->
                定制
              </div>
            </td>
          </tr>
          <tr
            align="center"
            class="cd-tr-j"
            style="font-size: 13px; color: rgb(253, 217, 155)"
          >
            <td height="50">天下游</td>
            <td height="50" style="color: rgb(255, 156, 0)">
              <div
                class="cp-cascader-main"
                style="width: 254px; margin-top: 5px; margin-bottom: 5px"
              >
                <div class="cp-cascader-btn">
                  <div class="cp-cascader-span"></div>
                  <i class="el-icon-caret-bottom" style="margin-right: 6px"></i>
                </div>
                <div class="cp-cascader-items">
                  <div class="cp-multi-cascader-btns">
                    <div
                      class="cp-multi-cascader-btn"
                      style="margin-left: 15px"
                    >
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_all.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>全选</span>
                    </div>
                    <div class="cp-multi-cascader-btn">
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_clear.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>清空</span>
                    </div>
                    <div
                      class="cp-multi-cascader-btn"
                      style="margin-right: 15px"
                    >
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_reverse.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>反选</span>
                    </div>
                  </div>
                  <div class="cp-cascader-columns">
                    <div class="cp-cascader-column">
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">河内五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希三分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">印尼五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希分分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">腾讯分分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">上证五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">深证五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">广东11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">山东11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">泰国11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">加拿大11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">福彩3D</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">排三</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td height="50">
              <div class="score-record-main">
                <div class="score-record-item">
                  <div class="el-image score-record-image">
                    <img
                      src="/static/activity/1.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    class="score-record-num"
                  >
                    <text
                      text-anchor="middle"
                      dominant-baseline="middle"
                      x="50%"
                      y="50%"
                      fill="#e4e4e4"
                      class="cp-text"
                      style="font-size: 12px"
                    >
                      1
                    </text>
                    <!---->
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
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">2264891.99</td>
            <td height="50" style="color: rgb(255, 156, 0)">1008474.88</td>
            <td height="50">
              <input type="number" class="cd-table-input" /><span>元</span>
            </td>
            <td height="50">
              <input type="number" class="cd-table-input" /><span>次</span>
            </td>
            <td height="50">
              <div class="cp-button-main cd-table-button">
                <!---->
                定制
              </div>
            </td>
          </tr>
          <tr
            align="center"
            class="cd-tr-o"
            style="font-size: 13px; color: rgb(253, 217, 155)"
          >
            <td height="50">你相信光吗</td>
            <td height="50" style="color: rgb(255, 156, 0)">
              <div
                class="cp-cascader-main"
                style="width: 254px; margin-top: 5px; margin-bottom: 5px"
              >
                <div class="cp-cascader-btn">
                  <div class="cp-cascader-span"></div>
                  <i class="el-icon-caret-bottom" style="margin-right: 6px"></i>
                </div>
                <div class="cp-cascader-items">
                  <div class="cp-multi-cascader-btns">
                    <div
                      class="cp-multi-cascader-btn"
                      style="margin-left: 15px"
                    >
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_all.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>全选</span>
                    </div>
                    <div class="cp-multi-cascader-btn">
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_clear.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>清空</span>
                    </div>
                    <div
                      class="cp-multi-cascader-btn"
                      style="margin-right: 15px"
                    >
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_reverse.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>反选</span>
                    </div>
                  </div>
                  <div class="cp-cascader-columns">
                    <div class="cp-cascader-column">
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">河内五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希三分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">印尼五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希分分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">腾讯分分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">上证五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">深证五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">广东11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">山东11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">泰国11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">加拿大11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">福彩3D</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">排三</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td height="50">
              <div class="score-record-main">
                <div class="score-record-item">
                  <div class="el-image score-record-image">
                    <img
                      src="/static/activity/1.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    class="score-record-num"
                  >
                    <text
                      text-anchor="middle"
                      dominant-baseline="middle"
                      x="50%"
                      y="50%"
                      fill="#e4e4e4"
                      class="cp-text"
                      style="font-size: 12px"
                    >
                      9
                    </text>
                    <!---->
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
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">2097371.88</td>
            <td height="50" style="color: rgb(255, 156, 0)">645273.62</td>
            <td height="50">
              <input type="number" class="cd-table-input" /><span>元</span>
            </td>
            <td height="50">
              <input type="number" class="cd-table-input" /><span>次</span>
            </td>
            <td height="50">
              <div class="cp-button-main cd-table-button">
                <!---->
                定制
              </div>
            </td>
          </tr>
          <tr
            align="center"
            class="cd-tr-j"
            style="font-size: 13px; color: rgb(253, 217, 155)"
          >
            <td height="50">心动</td>
            <td height="50" style="color: rgb(255, 156, 0)">
              <div
                class="cp-cascader-main"
                style="width: 254px; margin-top: 5px; margin-bottom: 5px"
              >
                <div class="cp-cascader-btn">
                  <div class="cp-cascader-span"></div>
                  <i class="el-icon-caret-bottom" style="margin-right: 6px"></i>
                </div>
                <div class="cp-cascader-items">
                  <div class="cp-multi-cascader-btns">
                    <div
                      class="cp-multi-cascader-btn"
                      style="margin-left: 15px"
                    >
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_all.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>全选</span>
                    </div>
                    <div class="cp-multi-cascader-btn">
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_clear.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>清空</span>
                    </div>
                    <div
                      class="cp-multi-cascader-btn"
                      style="margin-right: 15px"
                    >
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_reverse.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>反选</span>
                    </div>
                  </div>
                  <div class="cp-cascader-columns">
                    <div class="cp-cascader-column">
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">河内五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希三分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">印尼五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希分分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">腾讯分分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">上证五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">深证五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">广东11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">山东11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">泰国11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">加拿大11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">福彩3D</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">排三</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td height="50">
              <div class="score-record-main">
                <div class="score-record-item">
                  <div class="el-image score-record-image">
                    <img
                      src="/static/activity/1.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    class="score-record-num"
                  >
                    <text
                      text-anchor="middle"
                      dominant-baseline="middle"
                      x="50%"
                      y="50%"
                      fill="#e4e4e4"
                      class="cp-text"
                      style="font-size: 12px"
                    >
                      8
                    </text>
                    <!---->
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
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">1875133.18</td>
            <td height="50" style="color: rgb(255, 156, 0)">531728.37</td>
            <td height="50">
              <input type="number" class="cd-table-input" /><span>元</span>
            </td>
            <td height="50">
              <input type="number" class="cd-table-input" /><span>次</span>
            </td>
            <td height="50">
              <div class="cp-button-main cd-table-button">
                <!---->
                定制
              </div>
            </td>
          </tr>
          <tr
            align="center"
            class="cd-tr-o"
            style="font-size: 13px; color: rgb(253, 217, 155)"
          >
            <td height="50">太阳神</td>
            <td height="50" style="color: rgb(255, 156, 0)">
              <div
                class="cp-cascader-main"
                style="width: 254px; margin-top: 5px; margin-bottom: 5px"
              >
                <div class="cp-cascader-btn">
                  <div class="cp-cascader-span"></div>
                  <i class="el-icon-caret-bottom" style="margin-right: 6px"></i>
                </div>
                <div class="cp-cascader-items">
                  <div class="cp-multi-cascader-btns">
                    <div
                      class="cp-multi-cascader-btn"
                      style="margin-left: 15px"
                    >
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_all.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>全选</span>
                    </div>
                    <div class="cp-multi-cascader-btn">
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_clear.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>清空</span>
                    </div>
                    <div
                      class="cp-multi-cascader-btn"
                      style="margin-right: 15px"
                    >
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_reverse.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>反选</span>
                    </div>
                  </div>
                  <div class="cp-cascader-columns">
                    <div class="cp-cascader-column">
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">河内五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希三分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">印尼五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希分分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">腾讯分分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">上证五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">深证五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">广东11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">山东11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">泰国11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">加拿大11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">福彩3D</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">排三</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td height="50">
              <div class="score-record-main">
                <div class="score-record-item">
                  <div class="el-image score-record-image">
                    <img
                      src="/static/activity/1.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    class="score-record-num"
                  >
                    <text
                      text-anchor="middle"
                      dominant-baseline="middle"
                      x="50%"
                      y="50%"
                      fill="#e4e4e4"
                      class="cp-text"
                      style="font-size: 12px"
                    >
                      9
                    </text>
                    <!---->
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
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">1711075.73</td>
            <td height="50" style="color: rgb(255, 156, 0)">199800.00</td>
            <td height="50">
              <input type="number" class="cd-table-input" /><span>元</span>
            </td>
            <td height="50">
              <input type="number" class="cd-table-input" /><span>次</span>
            </td>
            <td height="50">
              <div class="cp-button-main cd-table-button">
                <!---->
                定制
              </div>
            </td>
          </tr>
          <tr
            align="center"
            class="cd-tr-j"
            style="font-size: 13px; color: rgb(253, 217, 155)"
          >
            <td height="50">财富自由</td>
            <td height="50" style="color: rgb(255, 156, 0)">
              <div
                class="cp-cascader-main"
                style="width: 254px; margin-top: 5px; margin-bottom: 5px"
              >
                <div class="cp-cascader-btn">
                  <div class="cp-cascader-span"></div>
                  <i class="el-icon-caret-bottom" style="margin-right: 6px"></i>
                </div>
                <div class="cp-cascader-items">
                  <div class="cp-multi-cascader-btns">
                    <div
                      class="cp-multi-cascader-btn"
                      style="margin-left: 15px"
                    >
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_all.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>全选</span>
                    </div>
                    <div class="cp-multi-cascader-btn">
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_clear.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>清空</span>
                    </div>
                    <div
                      class="cp-multi-cascader-btn"
                      style="margin-right: 15px"
                    >
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_reverse.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>反选</span>
                    </div>
                  </div>
                  <div class="cp-cascader-columns">
                    <div class="cp-cascader-column">
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">河内五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希三分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">印尼五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希分分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">腾讯分分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">上证五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">深证五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">广东11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">山东11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">泰国11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">加拿大11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">福彩3D</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">排三</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td height="50">
              <div class="score-record-main">
                <div class="score-record-item">
                  <div class="el-image score-record-image">
                    <img
                      src="/static/activity/1.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    class="score-record-num"
                  >
                    <text
                      text-anchor="middle"
                      dominant-baseline="middle"
                      x="50%"
                      y="50%"
                      fill="#e4e4e4"
                      class="cp-text"
                      style="font-size: 12px"
                    >
                      7
                    </text>
                    <!---->
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
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">1636941.20</td>
            <td height="50" style="color: rgb(255, 156, 0)">156072.00</td>
            <td height="50">
              <input type="number" class="cd-table-input" /><span>元</span>
            </td>
            <td height="50">
              <input type="number" class="cd-table-input" /><span>次</span>
            </td>
            <td height="50">
              <div class="cp-button-main cd-table-button">
                <!---->
                定制
              </div>
            </td>
          </tr>
          <tr
            align="center"
            class="cd-tr-o"
            style="font-size: 13px; color: rgb(253, 217, 155)"
          >
            <td height="50">朱砂琪</td>
            <td height="50" style="color: rgb(255, 156, 0)">
              <div
                class="cp-cascader-main"
                style="width: 254px; margin-top: 5px; margin-bottom: 5px"
              >
                <div class="cp-cascader-btn">
                  <div class="cp-cascader-span"></div>
                  <i class="el-icon-caret-bottom" style="margin-right: 6px"></i>
                </div>
                <div class="cp-cascader-items">
                  <div class="cp-multi-cascader-btns">
                    <div
                      class="cp-multi-cascader-btn"
                      style="margin-left: 15px"
                    >
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_all.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>全选</span>
                    </div>
                    <div class="cp-multi-cascader-btn">
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_clear.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>清空</span>
                    </div>
                    <div
                      class="cp-multi-cascader-btn"
                      style="margin-right: 15px"
                    >
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_reverse.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>反选</span>
                    </div>
                  </div>
                  <div class="cp-cascader-columns">
                    <div class="cp-cascader-column">
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">河内五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希三分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">印尼五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希分分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">腾讯分分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">上证五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">深证五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">广东11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">山东11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">泰国11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">加拿大11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">福彩3D</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">排三</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td height="50">
              <div class="score-record-main">
                <div class="score-record-item">
                  <div class="el-image score-record-image">
                    <img
                      src="/static/activity/1.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    class="score-record-num"
                  >
                    <text
                      text-anchor="middle"
                      dominant-baseline="middle"
                      x="50%"
                      y="50%"
                      fill="#e4e4e4"
                      class="cp-text"
                      style="font-size: 12px"
                    >
                      9
                    </text>
                    <!---->
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
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">1605605.17</td>
            <td height="50" style="color: rgb(255, 156, 0)">829117.14</td>
            <td height="50">
              <input type="number" class="cd-table-input" /><span>元</span>
            </td>
            <td height="50">
              <input type="number" class="cd-table-input" /><span>次</span>
            </td>
            <td height="50">
              <div class="cp-button-main cd-table-button">
                <!---->
                定制
              </div>
            </td>
          </tr>
          <tr
            align="center"
            class="cd-tr-j"
            style="font-size: 13px; color: rgb(253, 217, 155)"
          >
            <td height="50">一飞冲云霄</td>
            <td height="50" style="color: rgb(255, 156, 0)">
              <div
                class="cp-cascader-main"
                style="width: 254px; margin-top: 5px; margin-bottom: 5px"
              >
                <div class="cp-cascader-btn">
                  <div class="cp-cascader-span"></div>
                  <i class="el-icon-caret-bottom" style="margin-right: 6px"></i>
                </div>
                <div class="cp-cascader-items">
                  <div class="cp-multi-cascader-btns">
                    <div
                      class="cp-multi-cascader-btn"
                      style="margin-left: 15px"
                    >
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_all.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>全选</span>
                    </div>
                    <div class="cp-multi-cascader-btn">
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_clear.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>清空</span>
                    </div>
                    <div
                      class="cp-multi-cascader-btn"
                      style="margin-right: 15px"
                    >
                      <div class="el-image cp-multi-cascader-icon">
                        <img
                          src="/static/customDocumentary/icon_reverse.png"
                          class="el-image__inner"
                        /><!---->
                      </div>
                      <span>反选</span>
                    </div>
                  </div>
                  <div class="cp-cascader-columns">
                    <div class="cp-cascader-column">
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">河内五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希三分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">印尼五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">哈希分分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">腾讯分分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">上证五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">深证五分彩</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">广东11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">山东11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">泰国11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">加拿大11选5</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">福彩3D</div>
                        </div>
                      </div>
                      <div class="cp-cascader-item">
                        <div class="cp-checkbox-main" style="margin-left: 15px">
                          <div class="cp-checkbox-image"></div>
                          <div style="margin-left: 18px">排三</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td height="50">
              <div class="score-record-main">
                <div class="score-record-item">
                  <div class="el-image score-record-image">
                    <img
                      src="/static/activity/1.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    class="score-record-num"
                  >
                    <text
                      text-anchor="middle"
                      dominant-baseline="middle"
                      x="50%"
                      y="50%"
                      fill="#e4e4e4"
                      class="cp-text"
                      style="font-size: 12px"
                    >
                      2
                    </text>
                    <!---->
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
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">1466516.24</td>
            <td height="50" style="color: rgb(255, 156, 0)">724439.05</td>
            <td height="50">
              <input type="number" class="cd-table-input" /><span>元</span>
            </td>
            <td height="50">
              <input type="number" class="cd-table-input" /><span>次</span>
            </td>
            <td height="50">
              <div class="cp-button-main cd-table-button">
                <!---->
                定制
              </div>
            </td>
          </tr>
        </table>
        <div class="cp-pagination-main" style="margin-top: 30px">
          <div class="cp-pagination-head">
            <div class="cp-pagination-first">首页</div>
            <div class="cp-pagination-page">上一页</div>
            <div class="cp-pagination-num cp-pagination-num-active">1</div>
          </div>
          <div class="cp-pagination-middle">
            <!---->
            <div class="cp-pagination-num">2</div>
            <div class="cp-pagination-num">3</div>
            <div class="cp-pagination-num">4</div>
            <div class="cp-pagination-num">5</div>
            <div class="cp-pagination-num">6</div>
            <span class="cp-pagination-span">•••</span>
          </div>
          <div class="cp-pagination-head">
            <div class="cp-pagination-num1">670</div>
            <div class="cp-pagination-page">下一页</div>
            <div class="cp-pagination-tail">尾页</div>
          </div>
          <div class="cp-pagination-data">页次：1/670</div>
          <div class="cp-pagination-data">记录：6698条</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CustomFollow',
};
</script>
