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

  // Calculate the average score for the top 5 countries
  //const averageScore = top5Countries.reduce((sum, country) => sum + country[selectedScore], 0) / top5Countries.length;

  return { top5Countries, averageScore };
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
          x: getTop5Countries(this.$data.items, selectedScore).map(
            x => x.Country
          ),
          y: getTop5Countries(this.$data.items, selectedScore).map(
            x => x.selectedScore),
          type: "bar"
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