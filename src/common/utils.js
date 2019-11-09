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

export function formatDate(data, fmt) {
  // 1. 获取年份
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (data.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  // 2. 
  let o = {
    'M+': data.getMonth() + 1,
    'D+': data.getDate(),
    'h+': data.getHours(),
    'm+': data.getMinutes(),
    's+': data.getSeconds()
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }

  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}