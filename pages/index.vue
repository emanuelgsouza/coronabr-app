<template>
  <div>
    <Hero
      title="CoronaBR"
      subtitle="Acompanhe os casos de COVID-19 no Brasil"
    />

    <TodayStats :stats="todayStats" :last-updated="lastUpdated" />

    <client-only>
      <DailyCases :daily-data="dailyData" />
    </client-only>
  </div>
</template>

<script>
import Hero from '~/components/Hero'
import TodayStats from '~/components/TodayStats'
import DailyCases from '~/components/DailyCases'
import brData from '~/data/br.json'

export default {
  name: 'IndexPage',

  components: { Hero, TodayStats, DailyCases },

  data: () => ({
    brData
  }),

  computed: {
    todayStats () {
      return this.brData.data.slice(-1)[0] || {}
    },
    dailyData () {
      return this.brData.data.slice(-15)
    },
    lastUpdated () {
      return this.brData.lastUpdated
    }
  }
}
</script>
