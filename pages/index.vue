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

export default {
  name: 'IndexPage',

  components: { Hero, TodayStats, DailyCases },

  asyncData () {
    return fetch('https://raw.githubusercontent.com/emanuelgsouza/coronabr-api/master/data/brazil.json')
      .then((response) => {
        if (response.ok) {
          return response.json()
        }

        return Promise.resolve({})
      })
      .then((data) => {
        return {
          brazilData: data
        }
      })
  },

  data: () => ({
    brazilData: {}
  }),

  computed: {
    todayStats () {
      return this.brazilData.data.slice(-1)[0] || {}
    },
    dailyData () {
      return this.brazilData.data.slice(-15)
    },
    lastUpdated () {
      return this.brazilData.lastUpdated
    }
  }
}
</script>
