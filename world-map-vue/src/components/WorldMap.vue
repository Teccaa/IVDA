<template>
  <div id="world-map"></div>
  <div id="selected-area">
    <p v-if="selectedArea">Selected area: {{ selectedArea }}</p>
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
      selectedArea: "Global",
      selectedSDG: 1,
      map: null,
    };
  },

  watch: {
    selectedSDG(sdg_new, sdg_old) {
      if (sdg_new !== sdg_old) {
        this.loadSDGAverages();
      }
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
        console.log("Selected area: ", this.selectedArea);
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

      // Testing if colorCountry method works:
      this.colorCountry("Sudan", { r: 0, g: 255, b: 0 }, 0.05);
    });
  },
  methods: {
    colorCountry(countryName, color, alpha = 1) {
      const rgbaColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
      this.map.setPaintProperty("country_areas", "fill-color", [
        "case",
        ["==", ["get", "NAME_EN"], countryName],
        rgbaColor,
        "transparent",
      ]);
    },

    async loadSDGAverages() {
      // if (!this.selectedSDG) return;

      try {
        console.log(
          `Trying to fetch: '../../data/sdg_averages/sdg${this.selectedSDG}_averages.json'`
        );
        const response = await fetch(
          `../../data/sdg_averages/sdg${this.selectedSDG}_averages.json`
        );
        const data = await response.json();
        this.colorCountriesBasedOnSDG(data);
      } catch (error) {
        console.error("Failed loading SDG average scores:", error);
      }
    },

    colorCountriesBasedOnSDG(sdgData) {
      sdgData.forEach((region) => {
        const countryName = region["Geographical Region"];
        const sdgAverage = region["SDG Average"];
        this.colorCountry(countryName, { r: 0, g: 255, b: 0 }, sdgAverage);
      });
    },
  },
};
</script>

<style scoped>
#world-map {
  position: fixed;
  top: 50px;
  left: 10px;
  height: 600px;
  width: 925px;
  z-index: 999;
}

#selected-area {
  position: fixed;
  top: 10px;
  left: 10px;
}
</style>
