<template>
  <div id="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="tab-bar-img"></slot></div>
    <div v-else><slot name="tab-bar-img-active"></slot></div>
    <div :style="activeStyle"><slot name="tab-bar-title"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  data() {
    return {
      // isActive: false,
    }
  },
  props: {
    path: {
        type: String
      },
    activeColor: {
      type: String,
      deafult: 'red'
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.path)
    }
  },
  computed: {
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    },
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    }
  }
}
</script>

<style>
#tab-bar-item{
  flex: 1;
  text-align: center;
}
#tab-bar-item img{
  width: 1.5625rem;
  height: 1.5625rem;
  vertical-align: middle;
  margin-top: .25rem;
}
.tab-title{
  font-size: .875rem;
}
</style>