<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    
    <!-- 商品的列表 -->
    <cart-list/>
    
    <!-- 底部的汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

// vuex内部的属性，可以把vuex对应的getters内的方法解析成计算属性
import {mapGetters} from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 解构vuex里getters的方法，成为计算属性，不用再次定义，直接使用
    // ...mapGetters(['cartLength'])
    // 对象写法可自定义名称
    ...mapGetters({length: 'cartLength'})
  },
}
</script>

<style scoped>
.cart{
  height: 100vh;
}
.cart-nav{
  background-color: var(--color-tint);
  color: white;
  font-weight: bold;
}
</style>