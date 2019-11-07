<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'

import {getDetail, Goods, Shop, GoodsParam} from 'network/detail'
import Scroll from 'components/common/bscroll/Scroll'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {}
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    }
  },
  created() {
    // console.log(this.$route.params);
    //1. 保存传入的iid
    this.iid = this.$route.params.iid;

    //2. 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res.result);
      // 获取数据
      const data = res.result;
      //1. 获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;

      // 2. 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      // 3. 获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 4. 获取商品详细信息
      this.detailInfo = data.detailInfo;

      // 5. 获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
    })
  },
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  height: 100vh;
  background-color: #fff;
}
.content{
  height: calc(100% - 44px);
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>