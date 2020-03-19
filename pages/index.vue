<template>
  <div>
    <Hero
      title="CoronaBR"
      subtitle="Acompanhe os casos de COVID-19 no Brasil"
    />

    <TodayStats :stats="todayStats" :last-updated="lastUpdated" />
  </div>
</template>

<script>
import Hero from '~/components/Hero'
import TodayStats from '~/components/TodayStats'

export default {
  name: 'IndexPage',

  components: { Hero, TodayStats },

  data: () => ({
    todayStats: {},
    lastUpdated: new Date().getTime()
  })
}
</script>

<style>

</style>
