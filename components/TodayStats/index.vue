<template>
  <section class="section">
    <h2 class="title is-4 has-text-centered">
      Últimos dados - Atualizado em <span class="has-text-danger">{{ lastUpdatedFormated }}</span>
    </h2>

    <div class="columns">
      <div class="column is-4">
        <TodayBox label="Casos confirmados" :value="todayCases" :loading="loading" />
      </div>

      <div class="column is-4">
        <TodayBox label="Novos casos" :value="newCases" :loading="loading" />
      </div>

      <div class="column is-4">
        <TodayBox
          class="has-text-danger"
          label="Óbitos confirmados"
          :value="todayDeaths"
          :loading="loading"
        />
      </div>
    </div>
  </section>
</template>

<script>
import TodayBox from './Box'
import { MONTHS } from '~/support/dates'

export default {
  name: 'TodayStats',

  components: {
    TodayBox
  },

  props: {
    stats: {
      type: Object,
      default: () => ({}),
      required: true
    },
    lastUpdated: {
      type: Number,
      default: () => 0,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    todayCases () {
      return this.stats.cases || 0
    },
    todayDeaths () {
      return this.stats.deaths || 0
    },
    newCases () {
      return this.stats.new_cases || 0
    },
    lastUpdatedFormated () {
      if (this.lastUpdated === 0) {
        return 'Não disponível...'
      }
      const date = new Date(this.lastUpdated)
      const month = MONTHS[date.getMonth()]

      return `${date.getDate()} de ${month}, às ${date.getHours()}:${date.getMinutes()}`
    }
  }
}
</script>

<style>

</style>
