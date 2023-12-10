<template>
  <div>
    <h2></h2>
    <div ref="plotlyChart"></div>
    <div
      id="SDGDiv"
      style="position: fixed; bottom: 0px; right: 5px; height: 40vh"
    ></div>
  </div>
</template>

<script>
import axios from "axios";
import Plotly from "plotly.js/dist/plotly";

function getSDGColor(SDGid) {
  const sdgColorMapping = {
    1: "rgb(229, 35, 59)",
    2: "rgb(221, 168, 57)",
    3: "rgb(76, 160, 5)",
    4: "rgb(197, 26, 45)",
    5: "rgb(255, 58, 34)",
    6: "rgb(39, 189, 226)",
    7: "rgb(252, 195, 8)",
    8: "rgb(161, 25, 64)",
    9: "rgb(252, 105, 36)",
    10: "rgb(221, 20, 103)",
    11: "rgb(252, 154, 36)",
    12: "rgb(191, 139, 47)",
    13: "rgb(62, 126, 68)",
    14: "rgb(10, 151, 217)",
    15: "rgb(86, 192, 43)",
    16: "rgb(3, 104, 157)",
    17: "rgb(25, 72, 106)",
  };
  if (!Array.isArray(SDGid)) {
    console.error("SDGid is not an array:", SDGid);
    return [];
  }
  return SDGid.map((id) => sdgColorMapping[id] || "rgba(204, 204, 204)");
}

function getTopSDG(data, selectedCountry, selectedValue) {
  const countryData = data.find(
    (entry) => entry["Country"] === selectedCountry
  );
  if (!countryData) {
    console.error(
      `Data not found for the selected country: ${selectedCountry}`
    );
    return [];
  }

  const allScores = Object.entries(countryData)
    .filter(([key]) => key.endsWith("_avg"))
    .map(([key, value]) => ({
      score: parseInt(key.replace("_avg", "").replace("sdg", "")),
      value,
    }));

  const sortedScores = allScores.sort((a, b) => b.value - a.value);
  const topScores = sortedScores
    .slice(0, selectedValue)
    .map(({ score, value }) => ({
      key: `SDG ${score}`,
      value: value,
    }));

  const topColors = getSDGColor(
    topScores.map(({ key }) => parseInt(key.replace("SDG ", "")))
  );
  return { topScores, topColors };
}

export default {
  props: {
    chartTitle: {
      type: String,
      default: "Bar Plot",
    },
    selectedCountry: {
      type: Object,
      default: () => ({ name: "Zimbabwe" }),
    },
    selectedValue: Number,
  },

  mounted() {
    this.fetchData();
    this.drawBarPlot_SGG();
  },
  watch: {
    "selectedCountry.name": function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchData();
        this.drawBarPlot_SGG();
      }
    },
    selectedValue(newValue) {
      console.log(newValue);
      this.drawBarPlot_SGG();
    },
  },

  methods: {
    async fetchData() {
      try {
        const response = await axios.get("/summary_table.json");
        this.data = response.data;
        this.drawBarPlot_SGG();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    drawBarPlot_SGG() {
      const countrykey = this.selectedCountry.name;
      const xydata = getTopSDG(this.data, countrykey, this.selectedValue);
      if (!xydata) {
        console.error("Failed to get top SDG data");
        return;
      }
      const topSDGScores = xydata.topScores;
      const topSDGColors = xydata.topColors;
      if (!Array.isArray(topSDGColors)) {
        console.error("topSDGColors is not an array:", topSDGColors);
        return;
      }

      let data = [
        {
          x: topSDGScores.map((x) => x.key),
          y: topSDGScores.map((x) => x.value),
          marker: {
            color: topSDGColors, // Verwenden Sie topSDGColors direkt, .flat() ist nicht mehr notwendig
          },
          type: "bar",
        },
      ];

      const layout = {
        title: `Top SDG scores for ${this.selectedCountry.name}`,
        xaxis: {
          title: "",
        },
        yaxis: {
          title: "Average SDG Score",
        },
      };

      const config = {
        responsive: true,
      };

      Plotly.newPlot("SDGDiv", data, layout, config);
    },
  },
};
</script>
