import request from '@/plugins/request';
export default {
  //lottery/my_order/all
  uploadImg(data) {
    return request({
      url: '/home/upload_img',
      method: 'post',
      data,
    });
  },
  lotteryMyOrderAll(data) {
    return request({
      url: '/lottery/my_order/all',
      method: 'post',
      data,
    });
  },
  lotteryMyOrderCancel(data) {
    return request({
      url: '/lottery/my_order/cancel',
      method: 'post',
      data,
    });
  },
  cancelTogether(data) {
    return request({
      url: '/lottery/my_order/cancel/together',
      method: 'post',
      data,
    });
  },
  lotteryConf() {
    return request({
      url: '/lottery/conf',
    });
  },
  redReceive(data) {
    return request({
      url: '/red/receive',
      method: 'post',
      data,
    });
  },
  redSend(data) {
    return request({
      url: '/red/send',
      method: 'post',
      data,
    });
  },
  groupStatis() {
    return request({
      url: '/group/statis',
    });
  },
  groupProxy(data) {
    return request({
      url: '/group/proxy',
      method: 'post',
      data,
    });
  },
  groupBill(data) {
    return request({
      url: '/group/bill',
      method: 'post',
      data,
    });
  },
  groupMember(data) {
    return request({
      url: '/group/member',
      method: 'post',
      data,
    });
  },
  groupBets(data) {
    return request({
      url: '/group/bets',
      method: 'post',
      data,
    });
  },
  groupWithdrawal(data) {
    return request({
      url: '/group/withdrawal',
      method: 'post',
      data,
    });
  },
  groupRecharge(data) {
    return request({
      url: '/group/recharge',
      method: 'post',
      data,
    });
  },
  chat() {
    return request({
      url: '/chat',
    });
  },
  lotteryBetsShare(data) {
    return request({
      url: '/lottery/bets/share',
      method: 'post',
      data,
    });
  },
  editHeader(data) {
    return request({
      url: '/editHeader',
      method: 'post',
      data,
    });
  },
  mysub2() {
    return request({
      url: '/mysub2',
    });
  },
  balanceChangeReward(data) {
    return request({
      url: '/balance_change_reward',
      method: 'post',
      data,
    });
  },
  safeToBalanceAll(data) {
    return request({
      url: '/safe/toBalanceAll',
      method: 'post',
      data,
    });
  },
  balanceChangeReq(data) {
    return request({
      url: '/balance_change',
      method: 'post',
      data,
    });
  },
  withdrawLogReq(data) {
    return request({
      url: '/withdrawal_log',
      method: 'post',
      data,
    });
  },
  rechargeLogReq(data) {
    return request({
      url: '/recharge_log',
      method: 'post',
      data,
    });
  },
  withdrawalReq(data) {
    return request({
      url: '/withdrawal',
      method: 'post',
      data,
    });
  },
  bankCardinfo() {
    return request({
      url: '/bank_card_info',
    });
  },
  recharge() {
    return request({
      url: '/recharge_pre',
    });
  },
  drawList(data) {
    return request({
      url: '/draw/list',
      method: 'post',
      data,
    });
  },
  drawDraw(data) {
    return request({
      url: '/draw/draw',
      method: 'post',
      data,
    });
  },
  drawConf() {
    return request({
      url: '/draw/conf',
    });
  },
  bingoGameList(data) {
    return request({
      url: '/bingoGame/list',
      method: 'post',
      data,
    });
  },
  bingoGameData() {
    return request({
      url: '/bingoGame/data',
    });
  },
  mysub(data) {
    return request({
      url: '/mysub',
      method: 'post',
      data,
    });
  },
  homeWinning() {
    return request({
      url: '/home/winning',
    });
  },
  safeList(data) {
    return request({
      url: '/safe/list',
      method: 'post',
      data,
    });
  },
  safeToBalance(data) {
    return request({
      url: '/safe/toBalance',
      method: 'post',
      data,
    });
  },
  safeTransfer(data) {
    return request({
      url: '/safe/transfer',
      method: 'post',
      data,
    });
  },
  safeData() {
    return request({
      url: '/safe/data',
    });
  },
  fbConf() {
    return request({
      url: '/safe/conf',
    });
  },
  myStatis() {
    return request({
      url: '/statis',
    });
  },
  editPwdPay(data) {
    return request({
      url: '/editPwdPay',
      method: 'post',
      data,
    });
  },
  phoneCode() {
    return request({
      url: '/v2/phone_code/online',
      method: 'post',
    });
  },
  editPwd(data) {
    return request({
      url: '/editPwd',
      method: 'post',
      data,
    });
  },
  getPwdPay() {
    return request({
      url: '/getPwdPay',
    });
  },
  bindBankCard(data) {
    return request({
      url: '/bind_bank_card',
      method: 'post',
      data,
    });
  },
  virtualCurrencyList() {
    return request({
      url: '/virtual_currency_list',
      method: 'post',
    });
  },
  lotteryMyOrderCancelRe(data) {
    return request({
      url: '/lottery/my_order/cancel/re',
      method: 'post',
      data,
    });
  },
  lotteryMyOrderCancelRe2(data) {
    return request({
      url: '/lottery/my_order/cancel/re2',
      method: 'post',
      data,
    });
  },
  lotteryMyOrderReDetail(data) {
    return request({
      url: '/lottery/my_order/re/detail',
      method: 'post',
      data,
    });
  },
  lotteryMyOrderRe(data) {
    return request({
      url: '/lottery/my_order/re',
      method: 'post',
      data,
    });
  },
  lotteryMyOrderTogether(data) {
    return request({
      url: '/lottery/my_order/together',
      method: 'post',
      data,
    });
  },
  lotteryMyOrderDetail(data) {
    return request({
      url: '/lottery/my_order/detail',
      method: 'post',
      data,
    });
  },
  lotteryMyOrder(data) {
    return request({
      url: '/lottery/my_order',
      method: 'post',
      data,
    });
  },
  betsOrderDetail(data) {
    return request({
      url: '/lottery/bets_order/detail',
      method: 'post',
      data,
    });
  },
  lotteryBetsJoin(data) {
    return request({
      url: '/lottery/bets_join',
      method: 'post',
      data,
    });
  },
  lotteryBetsOrder(data) {
    return request({
      url: '/lottery/bets_order',
      method: 'post',
      data,
    });
  },
  lotteryHisExpect(data) {
    return request({
      url: '/lottery/his_expect',
      method: 'post',
      data,
    });
  },
  lotteryBetsRe(data) {
    return request({
      url: '/lottery/bets_re',
      method: 'post',
      data,
    });
  },
  lotteryExpects(data) {
    return request({
      url: '/lottery/expects',
      method: 'post',
      data,
    });
  },
  login(data) {
    return request({
      url: '/auth/login',
      method: 'post',
      data,
    });
  },
  verifyCodeReq(
    params = {
      verifyKey: new Date().getTime(),
    }
  ) {
    return request({
      url: '/auth/verify_code',
      params,
    });
  },
  homeDialog() {
    return request({
      url: '/home/dialog',
    });
  },
  register(data) {
    return request({
      url: '/auth/regist',
      method: 'post',
      data,
    });
  },
  changePwdOnlineReq(data) {
    return request({
      url: '/v2/change_pwd_online',
      method: 'post',
      data,
    });
  },
  // 获取手机验证码-未登录状态
  notLoginchangePwd(data) {
    return request({
      url: '/v2/phone_code/username',
      method: 'post',
      data,
    });
  },
  // 修改登录密码(需短信验证码)
  phoneChangePwdReq(data) {
    return request({
      url: '/v2/phone_change_pwd',
      method: 'post',
      data,
    });
  },
  servTmpReq() {
    return request({
      url: '/home/serv_tmp',
    });
  },
  userInfo() {
    return request({
      url: '/player_info',
    });
  },
  homeswiper(params) {
    return request({
      url: '/home/slider',
      params,
    });
  },
  // 获取客服地址
  servReq() {
    return request({
      url: '/home/serv',
    });
  },
  playerLotteryList() {
    return request({
      url: '/lottery/list',
    });
  },
  betsDetail(params) {
    return request({
      url: '/lottery/detail',
      params,
    });
  },
  lotteryBet(data) {
    return request({
      url: '/lottery/bet',
      method: 'post',
      data,
    });
  },
  lotteryCurrExpect(data) {
    return request({
      url: '/lottery/curr_expect',
      method: 'post',
      data,
    });
  },
  ///lottery/bets
  lotteryBets(data) {
    return request({
      url: '/lottery/bets',
      method: 'post',
      data,
    });
  },
  //老版
  authSysconfig() {
    return request({
      url: '/auth/sys_config',
    });
  },

  homehot() {
    return request({
      url: '/home/hot',
    });
  },

  playerGame(data) {
    return request({
      url: '/game',
      method: 'post',
      data,
    });
  },
  gameDetail(params) {
    return request({
      url: '/game',
      params,
    });
  },
  betPre(data) {
    return request({
      url: '/bet/pre',
      method: 'post',
      data,
    });
  },
  betOrder(data) {
    return request({
      url: '/bet',
      method: 'post',
      data,
    });
  },
  listBetsToday(data) {
    return request({
      url: '/bets/today',
      method: 'post',
      data,
    });
  },
  listBets(data) {
    return request({
      url: '/bets',
      method: 'post',
      data,
    });
  },
  gameFinished(data) {
    return request({
      url: '/game/finished',
      method: 'post',
      data,
    });
  },
  betInfo(params) {
    return request({
      url: '/betInfo',
      params,
    });
  },
  unbet(params) {
    return request({
      url: '/unbet',
      params,
    });
  },
  notice(params) {
    return request({
      url: '/home/notice',
      params,
    });
  },
  hasMsg() {
    return request({
      url: '/fb/msg/has',
    });
  },

  rechargeOrder(data) {
    return request({
      url: '/recharge',
      method: 'post',
      data,
    });
  },
  withdrawalPre() {
    return request({
      url: '/withdrawal_pre',
    });
  },
  homeVip() {
    return request({
      url: '/home/vip',
    });
  },
  safeInfo() {
    return request({
      url: '/safe/info',
    });
  },
  usdtListReq() {
    return request({
      url: '/virtual_currency_list',
      method: 'post',
    });
  },
  // 发送邮件验证码,用于绑定或者换绑邮箱地址 换绑发送验证码到原邮件地址
  emailCodeReq(data) {
    return request({
      url: '/mail/code',
      method: 'post',
      data,
    });
  },
  mailCode() {
    return request({
      url: '/mail/code',
    });
  },
  // 获取手机验证码-登录状态(需手机号)
  phoneCodeReq(data) {
    return request({
      url: '/v2/phone_code',
      method: 'post',
      data,
    });
  },

  phoneBindReq(data) {
    return request({
      url: '/v2/phone_bind',
      method: 'post',
      data,
    });
  },
  virtualCurrencyAdd(data) {
    return request({
      url: '/virtual_currency_add',
      method: 'post',
      data,
    });
  },
  walletInfo() {
    return request({
      url: '/wallet_info',
    });
  },

  walletTypeReq() {
    return request({
      url: '/wallet_type',
    });
  },
  walletReq(data) {
    return request({
      url: '/wallet',
      method: 'post',
      data,
    });
  },
  banks() {
    return request({
      url: '/banks',
    });
  },
  bindBank(data) {
    return request({
      url: '/bind_bank_card',
      method: 'post',
      data,
    });
  },
  detailSafeInfo() {
    return request({
      url: '/safe/info',
    });
  },
  safeChangeLog(data) {
    return request({
      url: '/safe/changeLog',
      method: 'post',
      data,
    });
  },
  getFaceRecognition(data) {
    return request({
      url: '/risk/secure3',
      method: 'post',
      data,
    });
  },
  riskSecure2(data) {
    return request({
      url: '/risk/secure2',
      method: 'post',
      data,
    });
  },
  riskSecure6(data) {
    return request({
      url: '/risk/secure6',
      method: 'post',
      data,
    });
  },
  appUrl(params) {
    return request({
      url: '/home/app_url',
      params,
    });
  },
  appCount(params) {
    return request({
      url: '/home/app_url_count',
      params,
    });
  },
  dataCenter(data, index) {
    return request({
      url: `/data_center/${index}`,
      method: 'post',
      data,
    });
  },
  rebateStatisReq(params) {
    return request({
      url: `/rebate_statis`,
      params,
    });
  },
  rebateListReq(data) {
    return request({
      url: '/rebate_list',
      method: 'post',
      data,
    });
  },
  subPlayersReq(data) {
    return request({
      url: '/sub_players',
      method: 'post',
      data,
    });
  },
  setPwdPay(data) {
    return request({
      url: '/setPwdPay',
      method: 'post',
      data,
    });
  },
  authEditPwd(data) {
    return request({
      url: '/auth/editPwd',
      method: 'post',
      data,
    });
  },

  emailBindReq(data) {
    return request({
      url: '/mail/bind',
      method: 'post',
      data,
    });
  },
  // 修改提现密码
  editPwdPayReq(data) {
    return request({
      url: '/v2/change_pwd_pay',
      method: 'post',
      data,
    });
  },
  // 修改提现密码
  editPwdPayNeedCodeReq(data) {
    return request({
      url: '/v2/phone_change_pwd_pay',
      method: 'post',
      data,
    });
  },
  // 虚拟币修改
  usdtEditReq(data) {
    return request({
      url: '/virtual_currency_edit',
      method: 'post',
      data,
    });
  },
  // 修改银行卡
  bindBankCardEditReq(data) {
    return request({
      url: '/bind_bank_card_edit',
      method: 'post',
      data,
    });
  },
  // 提现-新类型修改钱包
  walletEditReq(data) {
    return request({
      url: '/wallet_edit',
      method: 'post',
      data,
    });
  },

  // 获取邮件验证码-未登录状态
  notLoginEmailChangePwd(data) {
    return request({
      url: '/mail/change_pwd',
      method: 'post',
      data,
    });
  },

  ///safe/recharge_pre_mult
  rechargePreMult() {
    return request({
      url: '/safe/recharge_pre_mult',
    });
  },
  safeRecharge(data) {
    return request({
      url: '/safe/recharge',
      method: 'post',
      data,
    });
  },
  palyerConfig() {
    return request({
      url: '/fb/conf',
    });
  },
  versionReq() {
    return request({
      url: '/home/version',
    });
  },
  fbInfo() {
    return request({
      url: '/fb/info',
    });
  },
  saleList(data) {
    return request({
      url: '/fb/sale_list',
      data,
      method: 'post',
    });
  },
  fbMsgHasReq() {
    return request({
      url: '/fb/msg/has',
    });
  },
  fbSaleMe() {
    return request({
      url: '/fb/sale/me',
      method: 'post',
    });
  },
  soldout(data) {
    return request({
      url: '/fb/soldout',
      method: 'post',
      data,
    });
  },
  resale(data) {
    return request({
      url: '/fb/resale',
      method: 'post',
      data,
    });
  },
  fbSaleReq(data) {
    return request({
      url: '/fb/sale',
      method: 'post',
      data,
    });
  },
  fbSaleMerLimitrReq(data) {
    return request({
      url: '/fb/sale/limit',
      method: 'post',
      data,
    });
  },
  fbInfoSalerReq(data) {
    return request({
      url: '/fb/info/saler',
      method: 'post',
      data,
    });
  },
  fbBuyReq(data) {
    return request({
      url: '/fb/buy',
      method: 'post',
      data,
    });
  },
  //购买-获取支付方式
  fbBuy1Req(data) {
    return request({
      url: '/fb/buy1',
      method: 'post',
      data,
    });
  },
  // 交易列表详情
  fbSaleOrderDetailReq(data) {
    return request({
      url: '/fb/sale/order/detail',
      method: 'post',
      data,
    });
  },
  //购买-选择支付方式
  fbBuy2Req(data) {
    return request({
      url: '/fb/buy2',
      method: 'post',
      data,
    });
  },
  fbBuyPayedReq(data) {
    return request({
      url: '/fb/buy/payed',
      method: 'post',
      data,
    });
  },
  fbBuyCancelReq(data) {
    return request({
      url: '/fb/buy/cancel',
      method: 'post',
      data,
    });
  },
  // 会员交易列表
  fbSalePlayerOrderReq(data) {
    return request({
      url: '/fb/sale/player/order',
      method: 'post',
      data,
    });
  },
  mailCodeRegReq(params) {
    return request({
      url: '/mail/code/reg',
      params,
    });
  },
  // 申请商户
  fbOpenReq(data) {
    return request({
      url: '/fb/open',
      method: 'post',
      data,
    });
  },
  //充值准备
  fbRechargePreReq() {
    return request({
      url: '/fb/recharge_pre',
    });
  },
  //充值 minMax
  fbRechargeReq(data) {
    return request({
      url: '/fb/recharge',
      method: 'post',
      data,
    });
  },
  //消息列表-商家
  fbMsgSalerReq(data) {
    return request({
      url: '/fb/msg/saler',
      method: 'post',
      data,
    });
  },
  reportForm(data) {
    return request({
      url: '/report_form',
      method: 'post',
      data,
    });
  },
  groupUnaimReq(data) {
    return request({
      url: '/group/unaim',
      method: 'post',
      data,
    });
  },
  informationDealSold(data) {
    return request({
      url: '/information/deal/sold',
      method: 'post',
      data,
    });
  },
  informationVideo(data) {
    return request({
      url: '/information/video',
      method: 'post',
      data,
    });
  },
  informationDeal(data) {
    return request({
      url: '/information/deal',
      method: 'post',
      data,
    });
  },
  informationGame(data) {
    return request({
      url: '/information/game',
      method: 'post',
      data,
    });
  },
  InformationDetail(id) {
    return request({
      url: '/information/deal/' + id,
      method: 'post',
    });
  },
  investPlans() {
    return request({
      url: '/invest/plans',
      method: 'post',
    });
  },
  invest(data) {
    return request({
      url: '/invest',
      method: 'post',
      data,
    });
  },
  investPlanYeb(data) {
    return request({
      url: '/invest/plan/yeb',
      method: 'post',
      data,
    });
  },
  investMy(data) {
    return request({
      url: '/invest/my',
      method: 'post',
      data,
    });
  },
  investMyDetail(data) {
    return request({
      url: '/invest/my/detail',
      method: 'post',
      data,
    });
  },
  investMyStopYeb(data) {
    return request({
      url: '/invest/my/stop/yeb',
      method: 'post',
      data,
    });
  },
  investMyStatisItems() {
    return request({
      url: '/invest/my/statis/items',
    });
  },
  myStatis2() {
    return request({
      url: '/invest/my/statis2',
    });
  },
  investMyStatis() {
    return request({
      url: '/invest/my/statis3',
    });
  },
  investMyStatisFriendsThree2() {
    return request({
      url: '/invest/my/statis/friends/three2',
    });
  },
  investMyStatisFriendsThree() {
    return request({
      url: '/invest/my/statis/friends/three',
    });
  },
  investMyStatisFriends() {
    return request({
      url: '/invest/my/statis/friends',
    });
  },
  investMyStatisFriends2() {
    return request({
      url: '/invest/my/statis/friends2',
    });
  },
  investFriendsStatis() {
    return request({
      url: '/invest/friends/statis',
      method: 'post',
    });
  },
  investMyStatisReq() {
    return request({
      url: '/invest/my/statis',
    });
  },
  investMyStatisPost() {
    return request({
      url: '/invest/my/statis',
      method: 'post',
    });
  },
  investMyReq() {
    return request({
      url: '/invest/my',
    });
  },
  investMyPost(data) {
    return request({
      url: '/invest/my',
      method: 'post',
      data,
    });
  },
  ///invest/my/detail/log
  investMyDetailLog(data) {
    return request({
      url: '/invest/my/detail/log',
      method: 'post',
      data,
    });
  },
  authCodeReq(data) {
    return request({
      url: '/auth/code',
      method: 'post',
      data,
    });
  },
  ///mail/email_change_pwd
  emailChangePwd(data) {
    return request({
      url: '/mail/email_change_pwd',
      method: 'post',
      data,
    });
  },
  //mail/change_pwd_online
  emailChangePwdOnline(data) {
    return request({
      url: '/mail/change_pwd_online',
      method: 'post',
      data,
    });
  },

  ///invest/dayActive
  investDayActive() {
    return request({
      url: '/invest/dayActive',
    });
  },
  postDayActive(data) {
    return request({
      url: '/invest/dayActive',
      method: 'post',
      data,
    });
  },
  ///bingo/count
  bingoCount() {
    return request({
      url: '/bingo/count',
    });
  },
  //bingo
  bingo(data) {
    return request({
      url: '/bingo',
      method: 'post',
      data,
    });
  },
  ///invest/my/friends/list
  investMyFriendsList(data) {
    return request({
      url: '/invest/my/friends/list',
      method: 'post',
      data,
    });
  },
  ///player/invest/my/total
  playerInvestMyTotal() {
    return request({
      url: '/invest/my/t2',
    });
  },
};
