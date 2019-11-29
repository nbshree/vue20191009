<template>
  <div id="app">
<!--    <router-view/>-->
<!--    <About/>-->
    <Home/>
  </div>
</template>

<script>
// import About from '@/views/About'
import Home from '@/views/Home'
export default {
  name: 'App',
  comments: {
    // About,
    Home
  }
}
</script>
