<template>
  <div id="app">
    <div class="search-box">
      <i class="fas fa-search"></i>
      <input type="text" placeholder="Search for documents with keywords" />
      <i class="fas fa-question-circle"></i>
    </div>
    <div class="dropdown">
  <label for="nrOfCountries">Number of Countries: </label>
  <select id="nrOfCountries" v-model="NrOfCountries.selectedValue">
    <option v-for="value in NrOfCountries.values" :key="value">{{ value }}</option>
  </select>
</div>


    <IconContainer
      :icons="icons"
      @SDG-icon-id="handleSDGIconId"
      @SDG-icon-name="handleSDGIconName"
    />

    <WorldMap :selectedSDG="selectedSDG" @area-selected="handleAreaSelected"/>

    <StatisticsTable :documents="documents" :selectedSDG="selectedSDG" :selectedArea="selectedArea" />

    <ScoreGraph :selectedSDG="selectedSDG" :selectedValue="Number(NrOfCountries.selectedValue)"/>
  </div>
</template>

<script>
import WorldMap from "@/components/WorldMap.vue";
import StatisticsTable from "@/components/StatisticsTable.vue";
import IconContainer from "@/components/IconContainer.vue";
import ScoreGraph from "@/components/ScoreGraph.vue";

export default {
  components: {
    WorldMap,
    IconContainer,
    StatisticsTable,
    ScoreGraph,
  },
  data() {
    
      return {
        NrOfCountries: {
          values: [5, 10, 20, 50, 100],
          selectedValue: 5
        },
      icons: Array.from({ length: 17 }, (_, i) => ({
        id: i + 1,
        path: require(`@/assets/icons/icon${i + 1}.png`),
      })),
      documents: [
        { id: 1, title: "Document 1", author: "Author 1" },
        { id: 2, title: "Document 2", author: "Author 2" },
      ],
      selectedSDG: {
        id: 1,
        name: "No Poverty",
      },
      selectedArea: {

      }
    };
  },
  methods: {
    handleSDGIconId(sdg_id) {
      this.selectedSDG.id = sdg_id;
      // console.log(`Updated selected SDG-ID: ${this.selectedSDG.id}.`);
    },
    handleSDGIconName(sdg_name) {
      this.selectedSDG.name = sdg_name;
      // console.log(`Updated SDG-name: ${this.selectedSDG.name}.`);
    },
    handleAreaSelected(selectedArea) {
      this.selectedArea = selectedArea;
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
  z-index: 1000; 
}
.dropdown {
  position: fixed;
  top: 60px; 
  right: 50px; 
  z-index: 1000; 
}
.dropdown label {
  margin-right: 5px;
}

.dropdown select {
  padding: 5px;
}

.icon-container {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
