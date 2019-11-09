<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control @tabClick="tabClick" 
                  :titles="['流行', '新款', '精选']" 
                  ref="tabControl1" 
                  class="tab-control" 
                  v-show="isTabFixed"></tab-control>
                
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll" 
            :pull-up-load="true"
            @pullingUp="loadMore">

      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control @tabClick="tabClick" 
                  :titles="['流行', '新款', '精选']" 
                  ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    
    </scroll>

    <!-- 监听组件点击 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/bscroll/Scroll'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import {getHomeMultiData, getHomeGoods} from 'network/home'
import {itemListenerMixin, backTopMixin} from 'common/mixin'

import BScroll from 'better-scroll'

export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop : 0,
      isTabFixed: false,
      saveY: 0,
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    // 1. 请求多个数据
    this.getHomeMultiData();

    // 2. 请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

  },
  activated() {
    // this.$refs.scroll._scroll.y = this.saveY;
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 1. 保存Y值
    this.saveY = this.$refs.scroll.getScrollY();

    // 2. 取消全局事件监听
    this.$bus.$off('itemImageLoad', this.ItemImgListener);
  },
  mounted() {
    this.tabClick(0);
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      //1.判断backtop是否显示
      this.isShowBackTop = (-position.y) > 1000

      // 2. 决定tabcontrol是否吸顶(positionL fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      //2. 获取tabControl的offsetTop
      // 所有组件都有一个属性：$el 用于获取组件中的元素的
      // console.log(this.$refs.tabControl.$el.offsetTop)
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultiData() {
      
      getHomeMultiData().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })

    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;

      getHomeGoods(type, page).then(res => {
        // console.log(res)
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      })

    }
  },
}
</script>

<style scoped>
#home{
  padding-top: 2.75rem;
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);

  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
  color: white;
}

.content{
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom:49px;
}
.tab-control{
  position: relative;
  z-index: 9;
}
/* .content{
  margin-top: 44px;
  overflow: hidden;
  height: calc(100% - 93px);
} */
</style>