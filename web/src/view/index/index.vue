<template>
  <div>
    <el-collapse-transition>
      <header-model v-if="!allClient"></header-model>
    </el-collapse-transition>
    <section-model></section-model>
    <footer-model></footer-model>
  </div>
</template>

<script>
  import headerModel from '@/view/headers'
  import sectionModel from '@/view/section'
  import footerModel from '@/view/footer'

  import { mapState } from "vuex"

  export default {
    name: 'index',
    data() {
      return {}
    },
    computed: {
      ...mapState({
        allClient: state => state.baseStates.allClient
      })
    },
    components: {
      headerModel, sectionModel, footerModel
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped type="text/css">

</style>
