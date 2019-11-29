<template>
  <div>
    <router-link to="/404">404</router-link>
    |
    <router-link to="/403">403</router-link>
    |
    <router-link to="/lock">lock</router-link>
    <router-view/>
  </div>
</template>

<script>

  export default {
    name: 'Exhibition1129'
  }
</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
