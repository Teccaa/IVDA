<!-- App.vue -->

<template>
  <div id="app">
    <div class="search-box">
      <i class="fa fa-search"></i>
      <input type="text" placeholder="Search..." v-model="searchQuery" />
    </div>
    <WorldMap :icons="icons"
              @country-clicked="handleCountryClicked" />
    <IconContainer :icons="icons" @icon-click="updateCurrentTopic" />
    <StatisticsTable :documents="documents" :currentTopic="currentTopic" :currentCountry="currentCountry"/>
  </div>
</template>

<script>
import WorldMap from "@/components/WorldMap.vue";
import IconContainer from "@/components/IconContainer.vue";
import StatisticsTable from "@/components/StatisticsTable.vue";

export default {
  components: {
    WorldMap,
    IconContainer,
    StatisticsTable,
  },
  data() {
    return {
      icons: Array.from({ length: 17 }, (_, i) => ({
        id: i + 1,
        path: require(`@/assets/icons/icon${i + 1}.png`),
      })),
      documents: [], // Update with your actual documents data
      currentTopic: '', // Added to track the current topic
      currentCountry: '', // Added to track the current topic
    };
  },
  methods: {
    updateCurrentTopic(topic) {
      this.currentTopic = topic;
    },
    handleCountryClicked(clickedCountry) {
      // Do something with the clicked country data
      this.currentCountry = clickedCountry;
      console.log('Clicked Country in App.vue:', clickedCountry);
    },
  },
};
</script>

<style>
#app {
  position: relative;
}

.search-box {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.search-box i {
  margin: 0 10px;
}

.search-box input {
  flex: 1;
  padding: 8px;
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
}

.icon-container {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.score-graph {
  position: fixed;
  top: 0;
  right: 0;
}
</style>
