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
      type: Number,
      default: 15,
      required: true
    }
  },

  data: () => ({
    data: [
      {
        value: 15,
        label: 'Últimos 15 dias'
      },
      {
        value: 30,
        label: 'Últimos 30 dias'
      }
    ]
  }),

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
        colors: ['#E71D36'],
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
    display: block;
  }
}
</style>
