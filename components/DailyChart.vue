<template>
  <section class="section">
    <div class="section-header">
      <h2 class="title is-4">
        {{ title }}
      </h2>

      <b-field
        label="Selecione um período para visualizar"
        label-for="period"
      >
        <b-select
          id="period"
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
  name: 'DailyChart',

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
    },
    getSeriesFn: {
      type: Function,
      required: true
    },
    title: {
      type: String,
      default: '',
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
      return this.getSeriesFn(this.dailyData)
    },
    options () {
      return {
        chart: {
          id: 'vuechart',
          type: 'line',
          toolbar: {
            tools: {
              download: false,
              pan: false
            }
          }
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
        }
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
  margin-bottom: 2rem;
}
</style>
