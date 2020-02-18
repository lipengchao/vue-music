<template>
  <div id="app">
    <!--  头部组件  -->
    <m-header></m-header>
    <tab></tab>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Tab from 'components/tab/tab'

  export default {
    name: 'App',
    components: {
      MHeader,
      Tab
    }
  }
</script>
