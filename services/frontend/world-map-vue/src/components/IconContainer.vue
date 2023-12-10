<template>
  <div class="icon-container">
    <div
      v-for="icon in icons"
      :key="icon.id"
      @click="handleIconClick(icon)"
      :class="{ 'selected-icon': icon.id === selectedIconId }"
      class="icon-item"
    >
      <img :src="icon.path" alt="icon" />
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
      selectedIconId: 1,
    };
  },

  methods: {
    handleIconClick(icon) {
      console.log(icon.id);
      console.log(this.getTopicName(icon.id));
      // SDG-icon-id and SDG-icon-name are emitted after clicking an icon:
      this.$emit("SDG-icon-id", icon.id);
      this.$emit("SDG-icon-name", this.getTopicName(icon.id));

      // Set the selectedIconId to the clicked icon id
      this.selectedIconId = icon.id;
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
  justify-content: center;
  overflow-x: auto;
  max-width: 1055px;
  padding: 5px;
}

.icon-item {
  flex-basis: calc(12% - 20px);
  margin-right: 1px;
  margin-bottom: 4px;
  position: relative;
  cursor: pointer; 
  transition: transform 0.2s, box-shadow 0.2s;
}

.icon-item:last-child {
  margin-right: 0;
}
.icon-item:not(:last-child) {
  margin-right: 10px;
}

.icon-item img {
  width: 85px;
  height: 50px;
}

.selected-icon::before {
  content: "";
  position: absolute;
  top: 0px;
  left: 0px;
  right: 19px;
  bottom: 3px;
  border: 3px solid #333; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  pointer-events: none; 
}

.selected-icon {
  position: relative;
  z-index: 1;
  transform: scale(1.15);
}
</style>
