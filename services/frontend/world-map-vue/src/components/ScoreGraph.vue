
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
  const sortedData = Array.isArray(data) ? data.sort((a, b) => b[SDG] - a[SDG]) : [];

  // Slice the top 5 countries
  const top5Countries = sortedData.slice(0, 5);
  const top5CountriesWithSelectedScore = top5Countries.map(countryData => {
    return {
      country: countryData["Country"],
      SDG: countryData[SDG]
    };
  });
  return top5CountriesWithSelectedScore;
}

export default {
  data: () => ({
    data: [],
  }),
  props: {
    chartTitle: {
      type: String,
      default: 'Bar Plot',
    },
  },
  mounted() {
    this.fetchData();
    this.drawBarPlot();
  },
  watch: {
    data: 'drawBarPlot',
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get("/summary_table.json");
        console.log(response.data);
        this.data = response.data;
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
    drawBarPlot() {
      const selectedSDG = 'sdg1_avg';
      const top5CountriesData = getTop5Countries(this.data, selectedSDG);
      console.log(this.data);
      let data = [
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