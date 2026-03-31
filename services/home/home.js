import { config, cdnBase } from '../../config/index';

/** 获取首页数据 */
function mockFetchHome() {
  const { delay } = require('../_utils/delay');
  const { genSwiperImageList } = require('../../model/swiper');
  return delay().then(() => {
    return {
      swiper: genSwiperImageList(),
      hotList: [
        {
          spuId: 'hot-1',
          thumb: `${cdnBase}/goods/goods1.png`,
          title: '三角洲双排上分热销套餐',
          price: 19900,
          originPrice: 25900,
          soldCount: 128,
        },
        {
          spuId: 'hot-2',
          thumb: `${cdnBase}/goods/goods2.png`,
          title: '三角洲王牌冲分热门套餐',
          price: 29900,
          originPrice: 35900,
          soldCount: 86,
        },
      ],
      pointsActivity: {
        title: '免费抽积分',
        subtitle: '每日可参与，积分可抵扣订单金额',
        buttonText: '立即抽奖',
      },
    };
  });
}

/** 获取首页数据 */
export function fetchHome() {
  if (config.useMock) {
    return mockFetchHome();
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
