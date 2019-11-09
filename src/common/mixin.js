import {debounce} from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      ItemImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    //1. 图片加载完成的事件监听
    this.newRefresh = debounce(this.$refs.scroll.refresh, 50);

    this.ItemImgListener = () => {
      this.newRefresh();
    };

    this.$bus.$on('itemImageLoad', this.ItemImgListener);
    // console.log('我是混入中的内容');
    
  },
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
 methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    }
  }
}