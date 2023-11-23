<!-- App.vue -->

<template>
  <div id="app">
    <div class="search-box">
      <i class="fas fa-search"></i>
      <input type="text" placeholder="Search for documents with keywords" />
      <i class="fas fa-question-circle"></i>
    </div>
    <WorldMap :icons="icons" />
    <IconContainer :icons="iconsWithDescriptions" />
    <StatisticsTable :documents="documents" />
    <ScoreGraph />
  </div>
</template>

<script>
import WorldMap from "@/components/WorldMap.vue";
import IconContainer from "@/components/IconContainer.vue";
import StatisticsTable from "@/components/StatisticsTable.vue";
import ScoreGraph from "@/components/ScoreGraph.vue";

export default {
  components: {
    WorldMap,
    IconContainer,
    StatisticsTable,
    ScoreGraph
  },
  data() {
    return {
      icons: Array.from({ length: 17 }, (_, i) => ({
        id: i + 1,
        path: require(`@/assets/icons/icon${i + 1}.png`),
      })),
      iconsWithDescriptions: [
        { id: 1, path: require(`@/assets/icons/icon1.png`), description: 'No poverty' },
        { id: 2, path: require(`@/assets/icons/icon2.png`), description: 'Zero hunger' },
        { id: 3, path: require(`@/assets/icons/icon3.png`), description: 'Good health and wellbeing' },
        { id: 4, path: require(`@/assets/icons/icon4.png`), description: 'Quality education' },
        { id: 5, path: require(`@/assets/icons/icon5.png`), description: 'Gender equality' },
        { id: 6, path: require(`@/assets/icons/icon6.png`), description: 'Clean water and sanitation' },
        { id: 7, path: require(`@/assets/icons/icon7.png`), description: 'Affordable and clean energy' },
        { id: 8, path: require(`@/assets/icons/icon8.png`), description: 'Decent work and economic growth' },
        { id: 9, path: require(`@/assets/icons/icon9.png`), description: 'Industry, innovation and infrastructure' },
        { id: 10, path: require(`@/assets/icons/icon10.png`), description: 'Reduced inequalities' },
        { id: 11, path: require(`@/assets/icons/icon11.png`), description: 'Sustainable cities and communities' },
        { id: 12, path: require(`@/assets/icons/icon12.png`), description: 'Responsible consumption and production' },
        { id: 13, path: require(`@/assets/icons/icon13.png`), description: 'Climate action' },
        { id: 14, path: require(`@/assets/icons/icon14.png`), description: 'Life below water' },
        { id: 15, path: require(`@/assets/icons/icon15.png`), description: 'Life on land' },
        { id: 16, path: require(`@/assets/icons/icon16.png`), description: 'Peace, justice and strong institutions' },
        { id: 17, path: require(`@/assets/icons/icon17.png`), description: 'Partnerships for the goals' },
      ],
      documents: [
        { id: 1, title: "Document 1", author: "Author 1" },
        { id: 2, title: "Document 2", author: "Author 2" },
      ],
    };
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
  width: 1025px;
}

.score-graph {
  position: fixed;
  top: 0;
  right: 0;
}
</style>
