<template>
  <div id="toIndexFixed" @click="handlerClick">

  </div>
</template>

<script>
export default {
  name: 'footer-model',
  data () {
    return {

    }
  },
  methods: {
    handlerClick() {
      this.$router.push({
        path: '/indexPage'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped type="text/css">
  #toIndexFixed{
    display: inline-block;
    position: fixed;
    right: 100px;
    bottom: 15%;
    width: 60px;
    height: 50px;
    background-color: white;
  }
</style>
