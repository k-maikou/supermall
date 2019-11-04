// axios的封装
import axios from 'axios'

// 最终方案：
export function request(config) {

  //1. 创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  //2. axios的拦截器
  // 拦截请求的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  });

  //拦截响应
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
    
  });

  //3. 发送真正的网络请求
  // 本身创建的函数内部就是使用promise，所以不用使用promise的方法来写
  return instance(config);

}
