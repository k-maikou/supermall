<template>
  <tab-bar>
      <tab-bar-item path="/home" activeColor="deepPink">
        <div slot="tab-bar-title" class="tab-title">首页</div>
        <img slot="tab-bar-img" src="~assets/img/tabbar/home.svg" alt="">
        <img slot="tab-bar-img-active" src="~assets/img/tabbar/home_active.svg" alt="">
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="deepPink">
        <div slot="tab-bar-title" class="tab-title">分类</div>
        <img slot="tab-bar-img" src="~assets/img/tabbar/category.svg" alt="">
        <img slot="tab-bar-img-active" src="~assets/img/tabbar/category_active.svg" alt="">
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="deepPink">
        <div slot="tab-bar-title" class="tab-title">购物车</div>
        <img slot="tab-bar-img" src="~assets/img/tabbar/shopcart.svg" alt="">
        <img slot="tab-bar-img-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="deepPink">
        <div slot="tab-bar-title" class="tab-title">我的</div>
        <img slot="tab-bar-img" src="~assets/img/tabbar/profile.svg" alt="">
        <img slot="tab-bar-img-active" src="~assets/img/tabbar/profile_active.svg" alt="">
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar';
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>