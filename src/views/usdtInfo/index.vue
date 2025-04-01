<template>
  <section class="app-main">
    <div class="flex-column center-center" style="color: rgb(255, 255, 255)">
      <div class="o-title">U充教程</div>
      <div class="o-root-item">
        <div class="o-text-title">
          <span>扫描下方二维码下载欧易APP</span>
        </div>
        <div>
          <div class="download-flex">
            <div class="text-center">
              <div
                id="http://8.138.175.151:5678/static/apk/okx-6-113-0.apk"
                style="
                  background-color: rgba(0, 0, 0, 0.5);
                  padding: 5px;
                  box-shadow: 0px 0px 10px;
                "
                title="http://8.138.175.151:5678/static/apk/okx-6-113-0.apk"
              >
                <canvas width="130" height="130" style="display: none"></canvas
                ><img
                  alt="Scan me!"
                  style="display: block"
                  src="data:image/png;base64,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"
                />
              </div>
              <div class="mg-t-xs">安卓下载地址1</div>
            </div>
            <div class="text-center">
              <div
                id="http://www.okxtutorialdemo.com/res/app/2024/5/okx-android.apk"
                style="
                  background-color: rgba(0, 0, 0, 0.5);
                  padding: 5px;
                  box-shadow: 0px 0px 10px;
                "
                title="http://www.okxtutorialdemo.com/res/app/2024/5/okx-android.apk"
              >
                <canvas width="130" height="130" style="display: none"></canvas
                ><img
                  alt="Scan me!"
                  style="display: block"
                  src="data:image/png;base64,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"
                />
              </div>
              <div class="mg-t-xs">安卓下载地址2</div>
            </div>
          </div>
        </div>
      </div>
      <div class="o-root-item">
        <div class="o-text-title">
          <span>注册欧易账号</span>
        </div>
        <div class="o-text-body">
          <div class="o-text-body-item">
            <p>
              1. 打开欧易
              APP，点击页面上的【注册/登录】-【立即注册】,您可以选择【手机号】或者【邮箱】注册，按要求输入【手机号/邮箱】-【验证码】-设置密码，完成注册。
            </p>
            <div style="text-align: center; padding-top: 10px">
              <img
                src="/static/okxT3/okx01.1.png"
                class="img"
                style="width: 256px; height: 256px"
              />
              <img
                src="/static/okxT3/okx01.2.png"
                class="img"
                style="width: 256px; height: 256px"
              />
              <img
                src="/static/okxT3/okx01.3.png"
                class="img"
                style="width: 256px; height: 256px"
              />
            </div>
          </div>
          <div class="o-text-body">
            <div class="o-text-body-item">
              <p>
                2. 完成身份认证(务必)，在设置页面选择【基础认证】(下图示例)。
              </p>
              <div style="text-align: center; padding-top: 10px">
                <img
                  src="/static/okxT3/okx03.png"
                  class="img"
                  style="width: 256px; height: 256px"
                />
                <img
                  src="/static/okxT3/okx04.png"
                  class="img"
                  style="width: 256px; height: 256px"
                />
                <img
                  src="/static/okxT3/okx05.png"
                  class="img"
                  style="width: 256px; height: 256px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="o-root-item">
        <div class="o-text-title">
          <span>购买USDT</span>
        </div>
        <div class="o-text-body">
          <div class="o-text-body-item">
            <p>
              1.点击首页【购买或充值数字货币】-【我想要买币】-【购买】，搜索要买的币种，如USDT，输入购买金额或数量-【购买
              USDT】。
            </p>
            <div style="text-align: center; margin-top: 10px">
              <img
                src="/static/okxT3/okx16.png"
                class="img"
                style="width: 200px; height: 200px"
              />
              <img
                src="/static/okxT3/okx17.png"
                class="img"
                style="width: 200px; height: 200px"
              />
              <img
                src="/static/okxT3/okx29.png"
                class="img"
                style="width: 200px; height: 200px"
              />
              <img
                src="/static/okxT3/okx18.png"
                class="img"
                style="width: 200px; height: 200px"
              />
            </div>
          </div>
          <div class="o-text-body-item">
            <p>
              2.
              选择支付方式(银行卡/支付宝/微信支付)，点击【下一步】，订单生成后，确认订单信息，如果您对订单信息有疑问，可以点击【取消订单】，如果信息无误，请点击【下一步】。
            </p>
            <div style="text-align: center; margin-top: 10px">
              <img
                src="/static/okxT3/okx19.png"
                class="img"
                style="width: 255px; height: 255px"
              />
              <img
                src="/static/okxT3/okx20.png"
                class="img"
                style="width: 255px; height: 255px"
              />
              <img
                src="/static/okxT3/okx21.png"
                class="img"
                style="width: 255px; height: 255px"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="o-root-item">
        <div class="o-text-title">
          <span>将虚拟币(USDT)充值到游戏平台</span>
        </div>
        <div class="o-text-body">
          <div class="o-text-body-item">
            <p>
              1.
              进入游戏平台充值页面，选择【USDT】通道进行充值,复制平台提供的虚拟币钱包地址
              (下图为范例)。
            </p>
            <div style="text-align: left; padding-left: 10px; margin-top: 10px">
              <img
                src="/static/okxT3/okx31.7.png"
                class="img"
                style="width: 256px; height: 194px"
              />
              <img
                src="/static/okxT3/okx32.png"
                class="img"
                style="width: 256px; height: 194px"
              />
            </div>
          </div>
          <div class="o-text-body-item">
            <p>
              2.
              前往欧易平台，点选首页右下角【资产】-【提币】-点选币种USDT-【链上提币】
            </p>
            <div style="text-align: left; padding-left: 10px; margin-top: 10px">
              <img
                src="/static/okxT3/okx23.png"
                class="img"
                style="width: 256px; height: 228px"
              />
              <img
                src="/static/okxT3/okx24.png"
                class="img"
                style="width: 256px; height: 228px"
              />
              <img
                src="/static/okxT3/okx30.png"
                class="img"
                style="width: 256px; height: 228px"
              />
            </div>
          </div>
          <div class="o-text-body-item">
            <p>
              3. 选择提现网络必须为
              USDT-TRC20，若提现网络错误则有极大机率造成资产遗失。
            </p>
            <div style="text-align: left; padding-left: 10px; margin-top: 10px">
              <img
                src="/static/okxT3/okx25.png"
                class="img"
                style="width: 256px; height: 400px"
              />
            </div>
          </div>
          <div class="o-text-body-item">
            <p>4. 再次确认信息准确无误，输入邮箱和手机验证码，提交完成。</p>
            <div style="text-align: left; padding-left: 10px; margin-top: 10px">
              <img
                src="/static/okxT3/okx28.png"
                class="img"
                style="width: 256px; height: 206px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'UsdtInfoIndex',
};
</script>
