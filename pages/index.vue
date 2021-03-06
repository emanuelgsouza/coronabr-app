<template>
  <div>
    <Hero
      title="CoronaBR"
      subtitle="Acompanhe a evolução nos casos de COVID-19 no Brasil"
    />

    <section class="section">
      <div class="content container">
        <p>
          Este projeto tem como objetivo trazer um acompanhamento dos casos do COVID-19 no Brasil. Sendo assim, primeiramente você poderá ver uma linha do tempo mostrando a evolução dos casos oficiais no Brasil.
        </p>

        <p>A fonte de dados para este projeto vem da <a class="link" href="https://ourworldindata.org/coronavirus-source-data" title="Confira o site oficial da Our World in Data">Our World in Data</a>, a qual usa os da dados da OMS (Organização Mundial da Saúde). Esta mesma fonte também é usada pelo equipe do Estadão em seu projeto de acompanhamento diário dos casos de CODIV-19 no Brasil (vide link abaixo). <span class="has-text-weight-bold">A atualização dos dados é diária</span></p>

        <p>
          Você pode conferir também outros projetos para acompanhamento da situação no Brasil e no mundo:
        </p>
        <ul>
          <li> <a class="link" href="https://github.com/belisards/coronabr" title="Configura a base de dados no Github">Base de dados em CSV</a> atualizado diariamente pelo <a class="link" href="https://twitter.com/belisards" title="Visite o Twitter do Adriano Belisário">Adriano Belisário</a> </li>
          <li><a class="link" href="https://covid.saude.gov.br/" title="Visite o site oficial para acompanhamento do COVID-19 feito pelo Ministério da Saúde">Site oficial</a> para acompanhamento dos casos pelo MS</li>
          <li><a class="link" href="https://coronavirus.jhu.edu/map.html" title="Visite o mapa desenvolvido pela Universidade Johns Hopkins">Mapa do Coronavirus</a> no mundo desenvolvido pela Universidade Johns Hopkins</li>
          <li><a class="link" href="https://arte.estadao.com.br/ciencia/novo-coronavirus/monitor-pandemia/" title="Confira o Monitor do COVID-19 desenvolvido pela equipe do Estadão"> Monitor do COVID-19 </a> desenvolvido pela equipe do Estadão</li>
          <li> <a class="link" href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports/" title="Confira o situation report">Situation Report</a> da Organização Mundial da Saúde</li>
          <li><a class="link" href="https://brasil.io/dataset/covid19/caso" title="Confira o site do Brasil.IO">Repositório do Brasil.IO</a> com dados a nível municipal</li>
          <li><a class="link" href="https://endoedgar.github.io/covid19-monitorbr/" title="Confira o mapa que mostra os dados a nível municipal">Mapa</a> que utiliza os dados do Brasil.IO informando dados por município</li>
        </ul>
      </div>
    </section>

    <div class="is-relative">
      <TodayStats
        :stats="todayStats"
        :last-updated="lastUpdated"
        :loading="isLoading"
      />

      <client-only>
        <DailyChart
          :period.sync="period"
          :daily-data="dailyData"
          :get-series-fn="getCasesSeriesChart"
          title="Casos confirmados por dia no Brasil"
          :loading="isLoading"
        />

        <DailyChart
          :period.sync="period"
          :daily-data="dailyData"
          :get-series-fn="getNewCasesChart"
          title="Novos casos por dia"
          :loading="isLoading"
        />

        <DailyChart
          :period.sync="period"
          :daily-data="dailyData"
          :get-series-fn="getDeathsSeriesChart"
          title="Óbitos confirmados por dia no Brasil"
          :loading="isLoading"
        />

        <DailyChart
          :period.sync="period"
          :daily-data="dailyData"
          :get-series-fn="getNewDeathsChart"
          title="Novos óbitos confirmados"
          :loading="isLoading"
        />
      </client-only>
    </div>
  </div>
</template>

<script>
import Hero from '~/components/Hero'
import TodayStats from '~/components/TodayStats'
import DailyChart from '~/components/DailyChart'

export default {
  name: 'IndexPage',

  components: { Hero, TodayStats, DailyChart },

  data: () => ({
    brazilData: {
      data: []
    },
    period: '7',
    isLoading: true
  }),

  computed: {
    todayStats () {
      return this.brazilData.data.slice(-1)[0] || {}
    },
    dailyData () {
      if (this.period === 'first_case') {
        return this.brazilData.data.filter(item => item.cases > 0)
      }

      return this.brazilData.data.slice(-this.period)
    },
    lastUpdated () {
      return this.brazilData.lastUpdated || 0
    }
  },

  watch: {
    period () {
      this.syncRouteWithData(['period'])
    }
  },

  mounted () {
    this.loadDataFromRoute(['period'])

    this.isLoading = true

    return this.loadData()
      .then((data) => {
        this.isLoading = false
        this.brazilData = data
      })
      .catch((err) => {
        this.$buefy.toast.open({
          duration: 5000,
          message: err.message,
          type: 'is-danger'
        })

        this.isLoading = false
      })
  },

  methods: {
    updateQueryString (query) {
      this.$router.push({
        ...this.$route,
        query
      })
    },
    syncRouteWithData (keys = []) {
      const data = keys.reduce((acc, key) => {
        acc[key] = this[key]

        return acc
      }, {})

      this.updateQueryString(data)
    },
    loadDataFromRoute (keys = []) {
      const { query } = this.$route

      keys.forEach((key) => {
        const val = query[key]
        if (val) {
          this[key] = val
        }
      })
    },
    getCasesSeriesChart (dailyData) {
      return [
        {
          name: 'Casos confirmados',
          type: 'column',
          data: dailyData.map(item => item.cases)
        },
        {
          name: 'Novos casos',
          type: 'line',
          data: dailyData.map(item => item.new_cases)
        }
      ]
    },
    getDeathsSeriesChart (dailyData) {
      return [
        {
          name: 'Óbitos confirmados',
          type: 'column',
          data: dailyData.map(item => item.deaths)
        },
        {
          name: 'Novos óbitos',
          type: 'line',
          data: dailyData.map(item => item.new_deaths)
        }
      ]
    },
    getNewCasesChart (dailyData) {
      return [
        {
          name: 'Novos casos',
          type: 'column',
          data: dailyData.map(item => item.new_cases)
        }
      ]
    },
    getNewDeathsChart (dailyData) {
      return [
        {
          name: 'Novos óbitos',
          type: 'column',
          data: dailyData.map(item => item.new_deaths)
        }
      ]
    },
    loadData () {
      const URL = 'https://raw.githubusercontent.com/emanuelgsouza/coronabr-api/master/data/brazil.json'
      return fetch(URL)
        .then((response) => {
          if (response.ok) {
            return response.json()
          }

          return Promise.reject(new Error('Um erro ocorreu ao trazer os dados'))
        })
        .catch(Promise.reject)
    }
  }
}
</script>

<style lang="scss">
.loading-background {
  z-index: 1;
}

.loading-background + .content {
  z-index: 2;
}
</style>
