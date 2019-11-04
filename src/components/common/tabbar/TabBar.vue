<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style>
#tab-bar{
  display: flex;
  justify-content: space-around;
  height: 3.0625rem;
  align-items: center;
  background: #f6f6f6;
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>