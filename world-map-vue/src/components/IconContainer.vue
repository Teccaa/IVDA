<!-- IconContainer.vue -->

<template>
  <div class="icon-container">
    <div
      v-for="icon in icons"
      :key="icon.id"
      @click="handleIconClick(icon)"
      class="icon-item"
    >
      <img :src="icon.path" alt="Icon" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icons: Array,
  },
  methods: {
    handleIconClick(icon) {
      this.$emit("icon-click", icon.id, this.getTopicName(icon.id));
    },
    getTopicName(iconId) {
      const topicMapping = {
        1: "No Poverty",
        2: "Zero Hunger",
        3: "Good Health and Well-Being",
        4: "Quality Education",
        5: "Gender Equality",
        6: "Clean Water and Sanitation",
        7: "Affordable and Clean Energy",
        8: "Decent Work and Economic Growth",
        9: "Industry, Innovation and Infrastructure",
        10: "Reduced Inequalities",
        11: "Sustainable Cities and Communities",
        12: "Responsible Consumption and Production",
        13: "Climate Action",
        14: "Life Below Water",
        15: "Life on Land",
        16: "Peace, Justice and Strong Institutions",
        17: "Partnerships for the Goals",
      };
      return topicMapping[iconId] || "";
    },
  },
};
</script>

<style scoped>
.icon-container {
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
  padding: 10px;
  max-width: 100%;
}

.icon-item {
  margin-right: 0px;
}

.icon-item img {
  max-width: 54px;
  height: auto;
  cursor: pointer;
}
</style>
