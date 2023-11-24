<template>
  <div>
    <div class="statistics-table">
      <table>
        <tr>
          <th>General Statistics</th>
          <th>Amount</th>
        </tr>

        <tr>
          <td>Number of research papers found in Switzerland</td>
          <td>{{ numberOfPapers }}</td>
        </tr>
        <tr>
          <td>Average SDG score for topic 1 in Switzerland</td>
          <td>{{ averageSDGScore }}</td>
        </tr>
      </table>
    </div>

    <div class="filter-table">
      <h2>Filter Results</h2>
      <table>
        <tr>
          <th>Title</th>
          <th>Date</th>
          <th>Author</th>
          <th>HTML-Link</th>
          <th>SDG Score</th>
        </tr>
        <tr>
          <td>Research Paper 1</td>
          <td>2023-01-01</td>
          <td>John Doe</td>
          <td><a href="#">Link 1</a></td>
          <td>0.75</td>
        </tr>
        <tr>
          <td>Research Paper 2</td>
          <td>2023-02-01</td>
          <td>Jane Smith</td>
          <td><a href="#">Link 2</a></td>
          <td>0.85</td>
        </tr>
        <tr>
          <td>Research Paper 3</td>
          <td>2023-03-01</td>
          <td>Bob Johnson</td>
          <td><a href="#">Link 3</a></td>
          <td>0.92</td>
        </tr>
        <tr>
          <td>Research Paper 4</td>
          <td>2023-04-01</td>
          <td>Alice Brown</td>
          <td><a href="#">Link 4</a></td>
          <td>0.78</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    numberOfPapers: Number,
    averageSDGScore: Number,
  },
};
</script>

<style scoped>
.statistics-table {
  position: fixed;
  bottom: 240px;
  right: 60px;
  margin-bottom: 30px;
  width: 34%;
}

.filter-table {
  position: fixed;
  bottom: 20px;
  right: 60px;
  margin-top: 20px;
  width: 34%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  font-size: 12px;
}



th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
</style>
