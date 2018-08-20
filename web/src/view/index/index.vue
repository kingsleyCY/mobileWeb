<template>
  <div>
    <header-model></header-model>
    <section-model></section-model>
    <footer-model></footer-model>
  </div>
</template>

<script>
  import headerModel from '@/view/headers'
  import sectionModel from '@/view/section'
  import footerModel from '@/view/footer'
export default {
  name: 'index',
  data () {
    return {

    }
  },
  components: {
    headerModel, sectionModel, footerModel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped type="text/css">
</style>
