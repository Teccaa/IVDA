<template>
  <div id="world-map"></div>
  <div id="clicked-country">
    <p v-if="clickedCountry">Clicked Country: {{ clickedCountry }}</p>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default {
  name: 'WorldMap',
  data() {
    return {
      clickedCountry: null,
    };
  },
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoib3dlbmVnbyIsImEiOiJjbHBicDF1NjYwbDVhMmtwZDRxMjZ0c3F6In0.byDv07-88KvMWM3pjPxBlQ'; // Replace with your Mapbox Access Token

    const map = new mapboxgl.Map({
      container: 'world-map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 2,
      language: 'en',
    });

    // Add click event listener to the map
    map.on('click', (e) => {

      const features = map.queryRenderedFeatures(e.point);

      if (features.length > 0 && features[0].properties && features[0].properties.name) {
        this.clickedCountry = features[0].properties.name;
        // Emit a custom event to pass the clickedCountry to the parent component
        this.$emit('country-clicked', this.clickedCountry);
      }
    });

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

#clicked-country {
  position: fixed;
  top: 10px;
  left: 10px;
}
</style>