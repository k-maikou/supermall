// 优化加载性能 防抖动
export function debounce(func, delay) {
  let timer = null

  return function (...args) {
    if(timer) clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay);

  }
}