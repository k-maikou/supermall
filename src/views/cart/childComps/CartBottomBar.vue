<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" 
                    class="check-button" 
                    @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      ￥合计：{{ totalPrice }}
      </div>
      <div class="calculate" @click="caclClick">
        购买({{ checkLength }})
      </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import {mapGetters} from 'vuex'

export default {
 name: 'CartBottomBar',
 components: {
  CheckButton
 },
 methods: {
   //处理全选点击
   checkClick() {
     if (this.isSelectAll) {  //全部选中
       this.cartList.forEach(item => item.checked = false)
     } else { //有部分或全部没选中
       this.cartList.forEach(item => item.checked = true)
     }
     
    //  this.cartList.forEach(item => item.checked = !this.isSelectAll)
   },
   caclClick() {
     if (!this.isSelectAll) {
       this.$toast.show('请选择要添加的商品')
     }
   }
 },
 computed: {
   ...mapGetters(['cartList']),
  //  合计计算
  totalPrice() {
    return this.cartList.filter(item => {
      return item.checked
    }).reduce((oldValue, item) => {
      return oldValue + item.price * item.count
    }, 0).toFixed(2);
  },
  // 购买显示的数量
  checkLength() {
    return this.cartList.filter(item => item.checked).length;
  },
  // 全选
  isSelectAll() {
    if (this.cartList.length === 0) return false;

    // 1. 使用filter
    // return !this.cartList.filter(item => !item.checked).length
    // 2. 使用find
    return !this.cartList.find(item => !item.checked);
    
    // 3. 使用普通遍历
    // for(let item of this.cartList){
    //   if (!item.checked) {
    //     return false
    //   }
    //   return true
    // }
  }
 }
}
</script>

<style scoped>
.bottom-bar{
  height: 40px;
  background-color: #eee;
  position: relative;
  display: flex;
  align-items: center;
}
.check-content{
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 14px;
  width: 60px;
}
.check-button{
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-left: 5px;
}
.price{
  margin-left: 5px;
  color: orange;
  flex: 1;
  font-size: 14px;
}
.calculate{
  width: 80px;
  background: red;
  color: white;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
}
</style>