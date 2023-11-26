<template>
  <div>
    <h2></h2>
    <div ref="plotlyChart"></div>

    <div
      id="myDiv"
      style="position: fixed; top: 0; right: 0; height: 60vh"
    ></div>
  </div>
</template>

<script>
import axios from "axios";
import Plotly from "plotly.js/dist/plotly";

function getTop5Countries(data, SDG, selectedValue) {
  // Sort the data by the selected SDG
  const sortedData = Array.isArray(data)
    ? data.sort((a, b) => b[SDG] - a[SDG])
    : [];

  // Slice the top 5 countries
  const top5Countries = sortedData.slice(0, selectedValue);
  const top5CountriesWithSelectedScore = top5Countries.map((countryData) => {
    return {
      country: countryData["Country"],
      SDG: countryData[SDG],
    };
  });
  return top5CountriesWithSelectedScore;
}

export default {
  props: {
    chartTitle: {
      type: String,
      default: "Bar Plot",
    },
    selectedSDG: {
      type: Object,
      default: () => ({ id: 1, name: "No Poverty" }),
    },
    selectedValue: Number,
  },
  mounted() {
    this.fetchData();
    this.drawBarPlot();
  },
  watch: {
    "selectedSDG.id": function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchData();
        this.drawBarPlot();
      }
    },
    selectedValue(newValue) {
      console.log("selectedValue changed:", newValue);
      this.drawBarPlot();
  },
},

  methods: {
    async fetchData() {
      try {
        const response = await axios.get("/summary_table.json");
        console.log(response.data);
        this.data = response.data;
        this.drawBarPlot();
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
      console.log("drawBarPlot called");
      console.log("selectedValue:", this.selectedValue);
      console.log("selectedSDG:", this.selectedSDG);
      //const selectedSDG = 'sdg14_avg';
      const SDGKey = `sdg${this.selectedSDG.id}_avg`;

      const top5CountriesData = getTop5Countries(this.data, SDGKey, this.selectedValue);
      console.log(this.data);
      let data = [
        {
          //x: countries,
          //y: scores,
          x: top5CountriesData.map((countryData) => countryData.country),
          y: top5CountriesData.map((countryData) => countryData.SDG),
          type: "bar",
        },
      ];
      const layout = {
        title: `Top ${this.selectedValue} Countries for ${this.selectedSDG.name}`,
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
      Plotly.newPlot("myDiv", data, layout, config);
    },
  },
};
</script>
