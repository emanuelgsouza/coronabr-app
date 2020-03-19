<template>
  <header class="hero is-medium is-primary is-bold has-text-centered">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {{ title }}
        </h1>
        <h2 v-if="hasSubtitle" class="subtitle">
          {{ subtitle }}
        </h2>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Hero',

  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    }
  },

  computed: {
    hasSubtitle () {
      return this.subtitle.length > 0
    }
  }
}
</script>

<style>

</style>
