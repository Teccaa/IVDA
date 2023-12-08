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
    1: 'rgb(229, 35, 59)',
    2: 'rgb(221, 168, 57)',
    3: 'rgb(76, 160, 5)',
    4: 'rgb(197, 26, 45)',
    5: 'rgb(255, 58, 34)',
    6: 'rgb(39, 189, 226)',
    7: 'rgb(252, 195, 8)',
    8: 'rgb(161, 25, 64)',
    9: 'rgb(252, 105, 36)',
    10: 'rgb(221, 20, 103)',
    11: 'rgb(252, 154, 36)',
    12: 'rgb(191, 139, 47)',
    13: 'rgb(62, 126, 68)',
    14: 'rgb(10, 151, 217)',
    15: 'rgb(86, 192, 43)',
    16: 'rgb(3, 104, 157)',
    17: 'rgb(25, 72, 106)',
  };
  return SDGid.map((id) => sdgColorMapping[id] || 'rgba(204, 204, 204)');
}
function getTopSDG(data, selectedCountry, selectedValue) {
  // Filter data for the selected country
  console.log('data in function ', data)
  const countryData = data.find((entry) => entry["Country"] === selectedCountry);
  console.log('countryData in function ', countryData)
  if (!countryData) {
    console.error(`Data not found for the selected country: ${selectedCountry}`);
    return [];
  }

  // Get all scores for the selected country, scores that end with "_avg"
  const allScores = Object.entries(countryData)
      .filter(([key]) => key.endsWith("_avg"))
      .map(([key, value]) => ({ score: parseInt(key.replace("_avg", "").replace('sdg', "")), value }));

  console.log('allScores in function ', allScores)
  // Sorting
  const sortedScores = allScores.sort((a, b) => b.value - a.value);

  // Slice
  const topScores = sortedScores.slice(0, selectedValue).map(({ score, value }) => ({
    key: `SDG ${score}`,
    value: value,
  }));

  const topColors = getSDGColor(topScores.map(({ key }) => parseInt(key.replace("SDG ", ""))));

  console.log("Colors in function", topColors);
  const result = {
    topScores: topScores,
    topColors: topColors,
  }
  return result;
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
      console.log("selectedValue changed:", newValue);
      this.drawBarPlot_SGG();
    },
  },

  methods: {
    async fetchData() {
      try {
        const response = await axios.get("/summary_table.json");
        //console.log(response.data);
        this.data = response.data;
        this.drawBarPlot_SGG();
      } catch (error) {
        console.error("Error fetching data:", error);

        // Log the complete error object for more details
        console.log(error);

        // Alternatively, log specific properties of interest
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
          console.log("Response headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log("Request made but no response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error setting up the request:", error.message);
        }
      }
    },
    drawBarPlot_SGG() {
      console.log("drawBarPlot_SDG called");
      console.log("selectedValue:", this.selectedValue);
      console.log("selectedCountry:", this.selectedCountry.name);
      const countrykey = this.selectedCountry.name;
      console.log("countrykey:", countrykey);
      const xydata = getTopSDG(this.data, countrykey, this.selectedValue);
      const topSDGScores = xydata.topScores;
      const topSDGColors = xydata.topColors;
      console.log("topSDGscores", topSDGScores);
      console.log("Color", topSDGColors.flat());
      let data = [
        {
          x: topSDGScores.map((x) => x.key),
          y: topSDGScores.map((x) => x.value),
          marker: {
            color: topSDGColors.flat() // Flatten the array,
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
