<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" 
            ref="scroll" 
            @scroll="contentScroll"
            :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info ref="goods" :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <!-- <toast :message="message" :show="show"/> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import DetailCommentInfo from './childComps/DetailCommentInfo'

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
import {itemListenerMixin, backTopMixin} from 'common/mixin'
import {debounce} from 'common/utils'
import {mapActions} from 'vuex'

import Scroll from 'components/common/bscroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
// import Toast from 'components/common/toast/Toast'

export default {
  name: 'Detail',
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [],
      getThemeTopy: null,
      currentIndex: 0,
      // message: '',
      // show: false
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailBottomBar,
    DetailCommentInfo,
    Scroll,
    GoodsList,
    // Toast
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      // this.$refs.scroll.refresh();
      this.newRefresh();

      this.getThemeTopy();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 50, 500);
    },
    addToCart() {
      // 1. 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2. 将商品添加到购物车里(1.Promise, 2.mapActions:映射关系)
      // this.$store.commit('addCart', product);
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })
      this.addCart(product).then(res => {
        // this.show = true;
        // this.message = res;

        // setTimeout(() => {
        //   this.show = false;
        //   this.message = ''
        // }, 1500)
        // console.log(this.$toast);
        // 弹窗方法
        this.$toast.show(res, 1500)
      })

    },
    contentScroll(position) {
      // 判断backTop是否显示
      this.isShowBackTop = (-position.y) > 1000;
      
      // 1. 获取y值
      const positionY = -position.y;

      // 2. positionY和主题中的值进行对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {

        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i;

          this.$refs.nav.currentIndex = this.currentIndex;
        }

        // 第一次的判断方法
        // if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {

        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }
      }
    }
  },
  mounted() {
    
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.ItemImgListener);
  },
  created() {
    // console.log(this.$route.params);
    //1. 保存传入的iid
    this.iid = this.$route.query.iid;

    //2. 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res.result);
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

      // 6. 获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
      
    });

    //3. 请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommend = res.data.list;
    });

    //4. 给getThemeTopy赋值(给this.themeTopYs赋值的操作进行防抖)
    this.getThemeTopy = debounce(() => {
      // console.log('-----');
      
      this.themeTopYs = [];
      // 获取组件的offsetTop
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);

      // console.log(this.themeTopYs);

    }, 100)

  }
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
  height: calc(100% - 44px - 50px);
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>