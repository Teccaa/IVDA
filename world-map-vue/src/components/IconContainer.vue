<template>
  <div class="icon-container">
    <div v-for="icon in icons" :key="icon.id" class="icon-item">
      <img :src="icon.path" alt="icon" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icons: Array,
  },
};
</script>

<style scoped>
.icon-container {
  display: flex;
  overflow-x: auto;
  padding: 10px;
}

.icon-item {
  margin-right: 0px;
}

.icon-item:last-child {
  margin-right: 0;
}

.icon-item img {
  width: 60px;
  height: 40px;
}
</style>
