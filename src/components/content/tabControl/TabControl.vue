<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" 
    class="tab-control-item" 
    :class="{active: currentIndex === index}" 
    @click="itemClick(index)">
      <span>{{ item }}</span>   
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index);
    }
  },
}
</script>

<style>
.tab-control{
  display: flex;
  text-align: center;
  font-size: 15px;
  line-height: 2.5rem;
  background-color: #fff;
}
.tab-control-item{
  flex: 1;
}
.tab-control-item span{
  padding: .3125rem;
}
.active{
  color: var(--color-high-text);
}
.active span{
  border-bottom: 3px solid var(--color-high-text);
}
</style>