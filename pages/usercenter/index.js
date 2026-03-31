import { fetchUserCenter } from '../../services/usercenter/fetchUsercenter';
import Toast from 'tdesign-miniprogram/toast/index';

const menuData = [
  [
    {
      title: '我的订单',
      tit: '',
      url: '',
      type: 'order',
    },
    {
      title: '积分明细',
      tit: '',
      url: '',
      type: 'point',
    },
    {
      title: '联系客服',
      tit: '',
      url: '',
      type: 'contact',
    },
  ],
];

const orderTagInfos = [
  {
    title: '待支付',
    iconName: 'wallet',
    orderNum: 0,
    tabType: 1,
    status: 1,
  },
  {
    title: '已支付',
    iconName: 'secured',
    orderNum: 0,
    tabType: 2,
    status: 1,
  },
  {
    title: '服务中',
    iconName: 'time-filled',
    orderNum: 0,
    tabType: 3,
    status: 1,
  },
  {
    title: '已完成',
    iconName: 'check-circle-filled',
    orderNum: 0,
    tabType: 4,
    status: 1,
  },
];

const getDefaultData = () => ({
  showMakePhone: false,
  userInfo: {
    avatarUrl: '',
    nickName: '正在登录...',
    phoneNumber: '',
  },
  menuData,
  orderTagInfos,
  customerServiceInfo: {},
  currAuthStep: 1,
  showKefu: true,
  versionNo: '',
});

Page({
  data: getDefaultData(),

  onLoad() {
    this.getVersionInfo();
  },

  onShow() {
    this.getTabBar().init();
    this.init();
  },
  onPullDownRefresh() {
    this.init();
  },

  init() {
    this.fetUseriInfoHandle();
  },

  fetUseriInfoHandle() {
    fetchUserCenter().then(({ userInfo, countsData, orderTagInfos: orderInfo, customerServiceInfo }) => {
      // eslint-disable-next-line no-unused-expressions
      menuData?.[0].forEach((v) => {
        countsData.forEach((counts) => {
          if (counts.type === v.type) {
            // eslint-disable-next-line no-param-reassign
            v.tit = counts.num;
          }
        });
      });
      const info = orderTagInfos.map((v, index) => ({
        ...v,
        ...orderInfo[index],
      }));
      this.setData({
        userInfo,
        menuData,
        orderTagInfos: info,
        customerServiceInfo,
        currAuthStep: 2,
      });
      wx.stopPullDownRefresh();
    });
  },

  onClickCell({ currentTarget }) {
    const { type } = currentTarget.dataset;

    switch (type) {
      case 'order': {
        this.jumpAllOrder();
        break;
      }
      case 'contact': {
        wx.switchTab({ url: '/pages/contact/index' });
        break;
      }
      case 'point': {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '积分明细功能开发中',
          icon: '',
          duration: 1000,
        });
        break;
      }
      default: {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '未知跳转',
          icon: '',
          duration: 1000,
        });
        break;
      }
    }
  },

  jumpNav(e) {
    const status = e.detail.tabType;
    wx.navigateTo({ url: `/pages/order/order-list/index?status=${status}` });
  },

  jumpAllOrder() {
    wx.navigateTo({ url: '/pages/order/order-list/index' });
  },

  openMakePhone() {
    this.setData({ showMakePhone: true });
  },

  closeMakePhone() {
    this.setData({ showMakePhone: false });
  },

  call() {
    wx.makePhoneCall({
      phoneNumber: this.data.customerServiceInfo.servicePhone,
    });
  },

  gotoUserEditPage() {
    const { currAuthStep } = this.data;
    if (currAuthStep === 2) {
      wx.navigateTo({ url: '/pages/user/person-info/index' });
    } else {
      this.fetUseriInfoHandle();
    }
  },

  getVersionInfo() {
    const versionInfo = wx.getAccountInfoSync();
    const { version, envVersion = __wxConfig } = versionInfo.miniProgram;
    this.setData({
      versionNo: envVersion === 'release' ? version : envVersion,
    });
  },
});
