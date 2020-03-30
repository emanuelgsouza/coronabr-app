<template>
  <section class="section">
    <h2 class="title is-4 has-text-centered">
      Últimos dados - Atualizado em <span class="has-text-danger">{{ lastUpdatedFormated }}</span>
    </h2>

    <div class="columns">
      <div class="column is-4">
        <div class="box has-text-centered">
          <p class="is-size-1 has-text-weight-semibold">
            {{ todayCases }}
          </p>

          <p class="is-size-5">
            Casos confirmados
          </p>
        </div>
      </div>

      <div class="column is-4">
        <div class="box has-text-centered">
          <p class="is-size-1 has-text-weight-semibold">
            {{ newCases }}
          </p>

          <p class="is-size-5">
            Novos casos
          </p>
        </div>
      </div>

      <div class="column is-4">
        <div class="box has-text-centered">
          <p class="is-size-1 has-text-weight-semibold">
            {{ todayDeaths }}
          </p>

          <p class="is-size-5">
            Óbitos confirmados
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { MONTHS } from '~/support/dates'

export default {
  name: 'TodayStats',

  components: {
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
