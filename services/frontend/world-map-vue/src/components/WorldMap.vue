<template>
  <div id="world-map"></div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'WorldMap',
  mounted() {

    const map = L.map('world-map').setView([0, 0], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    }).addTo(map);
  }
};
</script>

<style scoped>
#world-map {
  position: fixed;
  top: 50px;
  left: 10px;
  height: 700px;
  width: 1025px;
  z-index: 999;
}
</style>
