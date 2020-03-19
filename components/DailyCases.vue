<template>
  <section class="section">
    <h2 class="title is-4 has-text-centered">
      Casos confirmados por dia
    </h2>
    <VueApexCharts
      :options="options"
      :series="series"
      height="450px"
    />
  </section>
</template>

<script>
export default {
  name: 'DailyCases',

  components: {
    VueApexCharts: () => import('vue-apexcharts')
  },

  props: {
    dailyData: {
      type: Array,
      default: () => [],
      required: true
    }
  },

  computed: {
    series () {
      return [
        {
          name: 'Casos confirmados',
          data: this.dailyData.map(item => item.accumulated.cases)
        }
      ]
    },
    options () {
      return {
        chart: {
          id: 'vuechart',
          type: 'bar'
        },
        xaxis: {
          categories: this.dailyData.map(item => item.date)
        },
        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#304758']
          }
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top'
            }
          }
        }
      }
    }
  }
}
</script>
