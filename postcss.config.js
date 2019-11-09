module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      unitToConvert: 'px',  //要转换的单位
      viewportWidth: 375, //视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight: 667, //视窗的高度，对应的是我们设计稿的宽度
      unitPrecision: 5, //指定'px'转换为视窗单位值的小数位数
      propList: ['*'],
      viewportUnit: 'vw', //指定需要转换成视窗单位，建议使用vw
      fontViewportUnit: 'vw',
      selectorBlackList: ['tab-bar', 'tab-bar-item'],  //指定不需要转换的类
      minPixelValue: 1, //小于或等于1px不转换为视窗单位
      mediaQuery: false, //是否允许媒体查询中转换px
      replace: true,
      exclude: [/TabBar/],
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 568
    }
  }
}
