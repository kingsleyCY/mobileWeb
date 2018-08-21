<template>
  <div ref="myIntroduce">
    introduce
  </div>
</template>

<script>
  export default {
    name: "my-introduce",
    created() {
      this.$nextTick(() => {
        window.onresize = () => {
          this.$refs.myIntroduce.style.height = document.body.clientHeight - 60 + 'px'
        }
        this.$refs.myIntroduce.style.height = document.body.clientHeight - 60 + 'px'
      })
    }
  }
</script>

<style lang="scss" scoped type="text/scss">

</style>
