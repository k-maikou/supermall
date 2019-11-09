import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
  // actions处理业务逻辑
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 查找之前数组中是否有该商品
      let Product = context.state.cartList.find(item => item.iid === payload.iid)

      // 判断oldProduct
      if (Product) {
        // Product.count += 1
        context.commit(ADD_COUNTER, Product)
        resolve('当前的商品数量 + 1')
      }else {
        payload.count = 1;
        // context.state.cartList.push(payload);
        context.commit(ADD_TO_CART, payload)
        resolve('成功添加至购物车')
      }
    })
  }
}

// payload新添加的商品
    // let oldProduct = null;
    // for(let item of state.cartList){
    //   if (item.iid === payload.iid) {
    //     oldProduct = item;
    //   }
    // }
