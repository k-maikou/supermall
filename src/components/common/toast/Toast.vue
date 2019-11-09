<template>
  <div class="toast" v-show="show">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // show: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message, duration = 2000) {
      this.isShow = true,
      this.message = message

      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      }, duration)
    }
  },
}
</script>

<style scoped>
.toast{
  width: 200px;
  line-height: 50px;
  text-align: center;
  font-size: 18px;
  background:rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -10%);
  z-index: 999;
}
</style>
