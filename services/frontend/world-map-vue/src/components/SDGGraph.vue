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
  // Sort scores in descending order
  const sortedScores = allScores.sort((a, b) => b.value - a.value);

  // Get the top N scores
  const topScores = sortedScores.slice(0, selectedValue).map(({ score, value }) => ({
    key: `SDG ${score}`,
    value: value,
  }));

  return topScores;
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
      const topSDGScores = getTopSDG(this.data, countrykey, this.selectedValue);
      console.log("topSDGscores", topSDGScores);
      let data = [
        {
          //x: countries,
          //y: scores,
          x: topSDGScores.map((x) => x.key),
          y: topSDGScores.map((x) => x.value),
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
