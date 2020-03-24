<template>
  <section class="section">
    <div class="section-header">
      <h2 class="title is-4 has-text-centered">
        Casos confirmados por dia no Brasil
      </h2>

      <b-field horizontal>
        <b-select
          :value="period"
          placeholder="Selecione um período"
          @input="onSelectInput"
        >
          <option
            v-for="option in data"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </b-select>
      </b-field>
    </div>
    <VueApexCharts
      :options="options"
      :series="series"
      height="450px"
    />
  </section>
</template>

<script>
import { formatToMonth } from '~/support/dates'

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
    },
    period: {
      type: String,
      default: '7',
      required: true
    }
  },

  data: () => ({
    data: [
      {
        value: '7',
        label: 'Últimos 7 dias'
      },
      {
        value: '15',
        label: 'Últimos 15 dias'
      },
      {
        value: '30',
        label: 'Últimos 30 dias'
      }
    ]
  }),

  computed: {
    series () {
      return [
        {
          name: 'Casos confirmados',
          type: 'column',
          data: this.dailyData.map(item => item.cases)
        },
        {
          name: 'Novos casos',
          type: 'line',
          data: this.dailyData.map(item => item.new_cases)
        }
      ]
    },
    options () {
      return {
        chart: {
          id: 'vuechart',
          type: 'line'
        },
        xaxis: {
          categories: this.dailyData.map(item => item.date),
          labels: {
            formatter: date => formatToMonth(date)
          }
        },
        legend: {
          show: true,
          offsetX: 20
        },
        colors: ['#E71D36', '#FF9F1C'],
        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: '12px'
          },
          enabledOnSeries: [0]
        },
        stroke: {
          width: [0, 4]
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top'
            }
          }
        },
        responsive: [
          {
            breakpoint: 768,
            options: {
              plotOptions: {
                bar: {
                  horizontal: false
                }
              }
            }
          }
        ]
      }
    }
  },

  methods: {
    onSelectInput (period) {
      this.$emit('update:period', period)
    }
  }
}
</script>

<style lang="scss" scoped>
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  .title {
    margin: 0;
  }

  @media screen and (max-width: $tablet) {
    flex-direction: column;
    justify-content: center;
  }
}
</style>
