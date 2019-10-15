<template>
  <div class="myWeb">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>{{title}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld'
require.context('@/components/components-test', useSubdirectories, regExp)
export default {
  name: 'myWeb',
  data () {
    return {
      title: 'myWeb'
    }
  }
}
</script>
