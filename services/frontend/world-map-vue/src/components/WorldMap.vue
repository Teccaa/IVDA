<template>
  <div id="world-map">
    <div id="info-panel" class="info-panel">
      <div>Selected Area: {{ selectedArea }}</div>
      <div>SDG Coverage: {{ sdgAverage }}%</div>
      <div>
        Publications referencing "{{ selectedArea }}": {{ numberOfPapers }}
      </div>
    </div>

    <div id="additional-info-panel" class="additional-info-panel">
      <div>Total Publications: 27'161</div>
      <div>Publications with Geographical References: 4'729</div>
      <div>Publications without Geographical References: 22'732</div>
    </div>

    <div id="legend" class="legend">
      <div
        class="legend-item"
        v-for="(intensity, index) in sdgIntensities"
        :key="index"
      >
        <span
          class="legend-square"
          :style="{
            backgroundColor: getSDGColorIntensity(
              selectedSDGColor,
              intensity.value
            ),
          }"
        ></span>
        <span class="legend-text">{{ intensity.text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import countries from "../../data/admin_0_countries.geojson";

export default {
  name: "WorldMap",
  data() {
    return {
      selectedArea: "Zimbabwe",
      map: null,
      numberOfPapers: 2,
      sdgAverage: 0.6,
    };
  },
  props: {
    selectedSDG: {
      type: Object,
      default: () => ({ id: 1, name: "No Poverty" }),
    },
  },

  watch: {
    "selectedSDG.id": function (newId, oldId) {
      if (newId !== oldId) {
        this.loadSDGAverages();
      }
    },
  },

  computed: {
    selectedSDGColor() {
      return this.getSDGColor(this.selectedSDG.id);
    },
    sdgIntensities() {
      return [
        { value: 0, text: "No data" },
        { value: 0.25, text: "Low: 25% SDG avg" },
        { value: 0.5, text: "Middle: 50% SDG avg" },
        { value: 0.75, text: "High: 75% SDG avg" },
        { value: 1, text: "Very High: 100% SDG avg" },
      ];
    },
  },

  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoib3dlbmVnbyIsImEiOiJjbHBicDF1NjYwbDVhMmtwZDRxMjZ0c3F6In0.byDv07-88KvMWM3pjPxBlQ";

    this.map = new mapboxgl.Map({
      container: "world-map",
      style: "mapbox://styles/mapbox/light-v10",
      center: [0, 0],
      zoom: 2,
      language: "en",
    });

    this.map.on("click", (e) => {
      const features = this.map.queryRenderedFeatures(e.point);
      if (
        features.length > 0 &&
        features[0].properties &&
        features[0].properties.NAME_EN
      ) {
        this.selectedArea = features[0].properties.NAME_EN;
        this.updateSDGAverage(this.selectedArea);
        this.updateNumberOfPapers(this.selectedArea);
        this.highlightSelectedCountry(this.selectedArea);
        this.$emit("area-selected", this.selectedArea);
      }
    });

    this.map.on("load", () => {
      this.map.addSource("countries", {
        type: "geojson",
        data: countries,
      });

      this.map.addLayer({
        id: "country_areas",
        type: "fill",
        source: "countries",
        layout: {},
        paint: {
          "fill-color": "transparent",
          "fill-opacity": 0.8,
        },
      });
      this.loadSDGAverages();
      this.loadPapersData();

      // Testing if colorCountry method works:
      // this.colorCountry("Sudan", { r: 0, g: 255, b: 0 }, 0.05);
    });
  },
  methods: {
    colorCountry(countryName, color, alpha = 1) {
      const layerId = `country-${countryName}`;
      const rgbaColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;

      if (this.map.getLayer(layerId)) {
        this.map.setPaintProperty(layerId, "fill-color", rgbaColor);
      } else {
        this.map.addLayer({
          id: layerId,
          type: "fill",
          source: "countries",
          filter: ["==", ["get", "NAME_EN"], countryName],
          paint: {
            "fill-color": rgbaColor,
            "fill-opacity": 0.8,
          },
        });
      }
    },

    updateNumberOfPapers(countryName) {
      const papersInfo = this.papersData.find(
        (region) => region["Geographical Region"] === countryName
      );
      if (papersInfo) {
        this.numberOfPapers = papersInfo["Total Papers"];
      } else {
        this.numberOfPapers = 0; // Standardwert, falls keine Daten vorhanden sind
      }
    },

    async loadSDGAverages() {
      if (!this.selectedSDG) return;

      try {
        const response = await fetch(
          `/sdg_averages/sdg${this.selectedSDG.id}_averages.json`
        );
        const data = await response.json();
        this.sdgData = data;
        this.colorCountriesBasedOnSDG(data);
      } catch (error) {
        console.error("Failed loading SDG average scores:", error);
      }
    },

    getSDGColor(selectedSDGid) {
      const sdgColorMapping = {
        1: [229, 35, 59],
        2: [221, 168, 57],
        3: [76, 160, 56],
        4: [197, 26, 45],
        5: [255, 58, 34],
        6: [39, 189, 226],
        7: [252, 195, 8],
        8: [161, 25, 64],
        9: [252, 105, 36],
        10: [221, 20, 103],
        11: [252, 154, 36],
        12: [191, 139, 47],
        13: [62, 126, 68],
        14: [10, 151, 217],
        15: [86, 192, 43],
        16: [3, 104, 157],
        17: [25, 72, 106],
      };
      return sdgColorMapping[selectedSDGid] || "";
    },

    colorCountriesBasedOnSDG(sdgData) {
      console.log("Induce colorization process of areas ...");
      let color = this.getSDGColor(this.selectedSDG.id);
      console.log(color);
      sdgData.forEach((region) => {
        const countryName = region["Geographical Region"];
        //console.log(`Area: ${countryName}`);
        const sdgAverage = region["SDG Average"];
        //console.log(`SDG Average: ${sdgAverage}`);
        this.colorCountry(
          countryName,
          { r: color[0], g: color[1], b: color[2] },
          sdgAverage
        );
        //console.log("Coloring successful!");
      });
    },

    highlightSelectedCountry(countryName) {
      if (this.map.getLayer("selected-country-border")) {
        this.map.removeLayer("selected-country-border");
      }

      // adding layer for country boarders
      this.map.addLayer({
        id: "selected-country-border",
        type: "line",
        source: "countries",
        paint: {
          "line-color": "#000000",
          "line-width": 1.5,
        },
        filter: ["==", ["get", "NAME_EN"], countryName],
      });
    },

    getSDGColorIntensity(color, intensity) {
      return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${intensity})`;
    },

    updateSDGAverage(countryName) {
      const countryData = this.sdgData.find(
        (region) => region["Geographical Region"] === countryName
      );
      if (countryData) {
        // Wandeln Sie den SDG-Wert in einen Prozentwert um und runden Sie ihn
        this.sdgAverage = (countryData["SDG Average"] * 100).toFixed(1);
      } else {
        this.sdgAverage = "0.0"; // Standardwert, falls keine Daten vorhanden sind
      }
    },

    async loadPapersData() {
      try {
        const response = await fetch("/papers-per-region.json");
        const papersData = await response.json();
        this.papersData = papersData;
      } catch (error) {
        console.error("Failed loading papers data:", error);
      }
    },
  },
};
</script>

<style scoped>
#world-map {
  position: fixed;
  top: 115px;
  left: 10px;
  height: 770px;
  width: 1050px;
}

#selected-area {
  font-family: sans-serif;
  text-align: center;
  position: fixed;
  top: 85px;
  left: 30px;
}

.legend {
  z-index: 2;
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  display: flex;
  align-items: center;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.legend-square {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 5px; /* Abstand zwischen Farbbox und Text */
  border: 1px solid #1c1c1c; /* Feiner schwarz-grauer Rand */
}

.legend-text {
}

.info-panel {
  position: absolute;
  bottom: 35px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  z-index: 2;
}

.additional-info-panel {
  position: absolute;
  bottom: 35px;
  right: 47px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  z-index: 3;
}
</style>
