<template>
  <div>
    <h2>{{ "Barplot" }}</h2>
    <div ref="plotlyChart"></div>
  </div>
  <div style="height: 90vh">
    <div id='myDiv' style="height: inherit"></div>
  </div>
</template>

<script>
import axios from "axios";
import Plotly from 'plotly.js/dist/plotly';

function getTop5Countries(data, SDG) {
  // Sort the data by the selected SDG
  const sortedData = data.sort((a, b) => b[SDG] - a[SDG]);

  // Slice the top 5 countries
  const top5Countries = sortedData.slice(0, 5);

  const top5CountriesWithSelectedScore = top5Countries.map(countryData => {
    return {
      country: countryData.country,
      SDG: countryData[SDG]
    };
  });
  return top5CountriesWithSelectedScore;
}

export default {
  chartTitle: {
    type: String,
    default: 'Bar Plot',
  },
  props: [
    "selectedSDG"
  ],
  mounted() {
    this.fetchData();
    this.drawBarPlot();
  },
  watch: {
    data: 'darwBarPlot',
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
      const selectedSDG = 'sdg1_avg';
      const top5CountriesData = getTop5Countries(data, selectedSDG);
      var data = [
        {
          //x: countries,
          //y: scores,
          x: top5CountriesData.map(countryData => countryData.country),
          y: top5CountriesData.map(countryData => countryData.SDG),
          type: 'bar'
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
      const config = {
        responsive: true,
      };
      Plotly.newPlot("myDiv", data, layout, config);
    }

  }
};


</script>

<style scoped>
#bar-plot {
  height: 500px;
  width: 1000px;
}
</style>