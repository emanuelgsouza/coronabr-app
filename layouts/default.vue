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
