<template>
  <div id="app">
    <div class="banner">
      <img src="@/assets/SDG_Goals.png" alt="SDG Goals Image" />  
    </div>
    <div class="dropdown">
      <label for="nrOfCountries">Number of Countries: </label>
      <select id="nrOfCountries" v-model="NrOfCountries.selectedValue">
        <option v-for="value in NrOfCountries.values" :key="value">{{ value }}</option>
      </select>
    </div>
    <div class="SGDdropdown">
      <label for="SDG">Number of SDG: </label>
      <select id="SDG" v-model="NrOfSDG.selectedValue">
        <option v-for="value in NrOfSDG.values" :key="value">{{ value }}</option>
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

    <SDGGraph :selectedCountry="selectedCountry" :selected-value="Number(NrOfSDG.selectedValue)"/>
  </div>
</template>

<script>
import WorldMap from "@/components/WorldMap.vue";
import StatisticsTable from "@/components/StatisticsTable.vue";
import IconContainer from "@/components/IconContainer.vue";
import ScoreGraph from "@/components/ScoreGraph.vue";
import SDGGraph from "@/components/SDGGraph.vue";

export default {
  components: {
    SDGGraph,
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
        NrOfSDG: {
          values: [5, 10, 17],
          selectedValue: 17
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
        selectedArea: "Global",
        selectedCountry: {
            name: "Zimbabwe"
        },
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
      this.selectedCountry.name = selectedArea;
    },
  },
};
</script>

<style>
#app {
  position: relative;
}

.banner { /* Banner Title for the UN SDG Goals */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 45px;
  background-color: #ccc;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #666;
  box-sizing: border-box;
}

.banner img {
  max-width: 21%;
  z-index: 2000;
}
.dropdown {
  position: fixed;
  top: 100px; 
  right: 50px; 
  z-index: 1000; 
}
.dropdown label {
  margin-right: 5px;
}

.dropdown select {
  padding: 5px;
}
.SGDdropdown {
  position: fixed;
  top: 700px;
  right: 50px;
  z-index: 1000;
}
.SGDdropdown label {
  margin-right: 5px;
}
.SGDdropdown select {
  padding: 5px;
}

.icon-container {
  position: fixed;
  bottom: 0;
  width: 100%;
}

</style>
