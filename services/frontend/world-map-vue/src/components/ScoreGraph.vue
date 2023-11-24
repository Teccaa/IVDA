<template>
  <div>
    <h1>Bar Plot</h1>
    <div id="bar-plot"></div>
  </div>
</template>

<script>
import axios from "axios";
import Plotly from 'plotly.js/dist/plotly';
function getTop5Countries(data, selectedScore) {
  const sortedData = data.sort((a, b) => b[selectedScore] - a[selectedScore]);

  // Slice the top 5 countries
  const top5Countries = sortedData.slice(0, 5);

  const top5CountriesWithSelectedScore = top5Countries.map(countryData => {
    return {
      country: countryData.country,
      [selectedScore]: countryData[selectedScore]
    };
  });
  return top5CountriesWithSelectedScore;
}

export default {
  props: [
    "selectedSDG"
  ],
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get("/src/assets/summary_table.json");
        this.items = response.data.items;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    drawBarPlot() {
      const selectedSDG = 'SDG1_avg'; //add a '-average' to the selected score
      const data = [
        {
          getTop5Countries(this.items, selectedSDG);
        }
      ];
      const layout = {
        title: "Bar Plot",
        xaxis: {
          title: "Name"
        },
        yaxis: {
          title: "Value"
        }
      };
      Plotly.newPlot("bar-plot", data, layout);
    }

  }
};


</script>