<template>
  <div class="recommends">
    <div v-for="item in recommends" class="recommends-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      teype: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommends{
  display: flex;
  justify-content: space-between;
  text-align: center;
  font-size: .75rem;
  padding: .625rem 0 1.25rem 0;
  border-bottom: .5rem solid #eee;
}
.recommends-item{
  flex: 1;
}
.recommends-item img {
  width: 4.375rem;
  height: 4.375rem;
  margin-bottom: .625rem;
}
</style>