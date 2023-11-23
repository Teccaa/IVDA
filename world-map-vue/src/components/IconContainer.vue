<template>
  <div class="icon-container">
    <div
      v-for="icon in icons"
      :key="icon.id"
      class="icon-item"
      @mouseover="showIconInfo(icon)"
      @mouseout="hideIconInfo"
    >
      <img :src="generateIconPath(icon.id)" alt="icon" class="icon-image" />
      <div v-if="icon === hoveredIcon" class="icon-info">
        <div class="icon-description">{{ icon.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icons: Array,
  },
  data() {
    return {
      hoveredIcon: null,
    };
  },
  methods: {
    showIconInfo(icon) {
      this.hoveredIcon = icon;
    },
    hideIconInfo() {
      this.hoveredIcon = null;
    },
    generateIconPath(id) {
      return require(`@/assets/icons/icon${id}.png`);
    },
  },
};
</script>

<style scoped>
.icon-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
}

.icon-item {
  position: relative;
  margin: 6px;
}

.icon-item .icon-image {
  width: 80px;
  height: 60px;
}

.icon-info {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 8px;
  border-radius: 4px;
  display: none;
}

.icon-info .icon-description {
  font-weight: bold;
}

.icon-item:hover .icon-info {
  display: block;
}
</style>
