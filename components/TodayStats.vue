<template>
  <section class="section">
    <h2 class="title is-4 has-text-centered">
      Dados oficiais - Atualizado em <span class="has-text-danger">{{ lastUpdatedFormated }}</span>
    </h2>

    <div class="columns">
      <div class="column is-6">
        <div class="box has-text-centered">
          <p class="is-size-1 has-text-weight-semibold">
            {{ todayCases }}
          </p>

          <p class="is-size-5">
            Casos confirmados
          </p>
        </div>
      </div>

      <div class="column is-6">
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
    accumulated () {
      return this.stats.accumulated || {}
    },
    todayCases () {
      return this.accumulated.cases || 0
    },
    todayDeaths () {
      return this.accumulated.deaths || 0
    },
    lastUpdatedFormated () {
      const date = new Date(this.lastUpdated)

      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    }
  }
}
</script>

<style>

</style>
