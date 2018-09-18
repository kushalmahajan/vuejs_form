<template>
  <div id="app">
    <CustomerDetails msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import CustomerDetails from "./components/CustomerDetails.vue";

export default {
  name: "app",
  components: {
    CustomerDetails
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
