Page({
  data: {
    serviceText: '下单前可先咨询客服，服务中也可随时沟通进度与需求。',
    serviceTips: [
      '优先使用小程序官方客服能力',
      '添加客服前请先备注订单信息',
      '如客服忙线可先扫码添加后等待回复',
    ],
    qrCodeUrl: 'https://via.placeholder.com/320x320.png?text=Service+QR',
  },

  onShow() {
    this.getTabBar().init();
  },
});
