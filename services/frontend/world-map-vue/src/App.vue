<template>
  <div id="app">
    <div class="banner" @click="toggleBanner">
      <img src="@/assets/NEW_LOGO.png" alt="SDG Goals Image" />
      <div v-if="isBannerExpanded" class="banner-description">
        <strong>Description:</strong>
        <br>
        This dashboard features a a world map with 258 countries.
        <br>
        It illustrates the variance in how UZH research covers Sustainable Development Goals (SDGs) with respect to 165 countries which were referenced in the abstracts UZH research publications.
      </div>
    </div>
    <div v-if="!isBannerExpanded" class="expand-icon" @click="toggleBanner">
      +
    </div>

    <div class="dropdown">
      <label for="nrOfCountries">Number of Countries: </label>
      <select id="nrOfCountries" v-model="NrOfCountries.selectedValue">
        <option v-for="value in NrOfCountries.values" :key="value">
          {{ value }}
        </option>
      </select>
    </div>

    <div class="SGDdropdown">
      <label for="SDG">Number of SDG: </label>
      <select id="SDG" v-model="NrOfSDG.selectedValue">
        <option v-for="value in NrOfSDG.values" :key="value">
          {{ value }}
        </option>
      </select>
    </div>

    <IconContainer
      :icons="icons"
      @SDG-icon-id="handleSDGIconId"
      @SDG-icon-name="handleSDGIconName"
    />

    <WorldMap :selectedSDG="selectedSDG" @area-selected="handleAreaSelected" />

    <ScoreGraph
      :selectedSDG="selectedSDG"
      :selectedValue="Number(NrOfCountries.selectedValue)"
    />

    <SDGGraph
      :selectedCountry="selectedCountry"
      :selected-value="Number(NrOfSDG.selectedValue)"
      @area-selected="handleAreaSelected"
    />
  </div>
</template>

<script>
import WorldMap from "@/components/WorldMap.vue";
import IconContainer from "@/components/IconContainer.vue";
import ScoreGraph from "@/components/ScoreGraph.vue";
import SDGGraph from "@/components/SDGGraph.vue";

export default {
  components: {
    SDGGraph,
    WorldMap,
    IconContainer,
    ScoreGraph,
  },
  data() {
    return {
      isBannerExpanded: false,
      NrOfCountries: {
        values: [5, 10, 20, 50, 100],
        selectedValue: 5,
      },
      NrOfSDG: {
        values: [5, 10, 17],
        selectedValue: 17,
      },
      icons: Array.from({ length: 17 }, (_, i) => ({
        id: i + 1,
        path: require(`@/assets/icons/icon${i + 1}.png`),
      })),
      selectedSDG: {
        id: 1,
        name: "No Poverty",
      },
      selectedArea: "Global",
      selectedCountry: {
        name: "Zimbabwe",
      },
    };
  },
  methods: {
    toggleBanner() {
      this.isBannerExpanded = !this.isBannerExpanded;
    },
    handleSDGIconId(sdg_id) {
      this.selectedSDG.id = sdg_id;
    },
    handleSDGIconName(sdg_name) {
      this.selectedSDG.name = sdg_name;
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

.banner {
  position: relative;
  width: 100%;
  height: 50px;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #666;
  box-sizing: border-box;
  cursor: pointer;
  z-index: 1999;
}

.banner img {
  max-width: 21%;
  z-index: 2000;
}

.banner-description {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  background-color: #ccc; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 1.5px solid #666;
  padding: 10px;
  box-sizing: border-box;
  z-index: 100;
  font-size: 16px; 
}

.expand-icon {
  position: absolute;
  top: 50%;
  left: 62%; 
  transform: translate(-50%, -50%);
  font-size: 20px;
  color: #fff; 
  background-color: #ccc; 
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #666;
  border-radius: 50%;
  z-index: 2000;
  cursor: pointer;
}


.dropdown {
  position: fixed;
  top: 100px;
  right: 50px;
  z-index: 1000;
  font-family: sans-serif;
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
  font-family: sans-serif;
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
