<template>
  <div>
    <nuxt />

    <Footer />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',

  components: {
    Footer: () => import('~/components/Footer')
  }
}
</script>

<style lang="scss">
@import "../assets/sass/general.scss";
</style>
