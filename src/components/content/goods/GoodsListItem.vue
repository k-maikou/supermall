<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="">
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style>
.goods-item{
  padding-bottom: 2.5rem;
  position: relative;
  width: 48%;
}
.goods-item img{
  width: 100%;
  border-radius: .3125rem;
}
.goods-info{
  font-size: .75rem;
  position: absolute;
  bottom: .3125rem;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price{
  color: var(--color-high-text);
  margin-right: 1.25rem;
}
.goods-info .collect{
  position: relative;
}
.goods-info .collect::before{
  content: '';
  position: absolute;
  left: -0.9375rem;
  top: -1px;
  width: .875rem;
  height: .875rem;
  background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
}
</style>