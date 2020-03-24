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

        <p>A fonte de dados para este projeto vem da <a href="https://ourworldindata.org/coronavirus-source-data" title="Confira o site oficial da Our World in Data">Our World in Data</a>, a qual usa os da dados da OMS (Organização Mundial da Saúde). Esta mesma fonte também é usada pelo equipe do Estadão em seu projeto de acompanhamento diário dos casos de CODIV-19 no Brasil (vide link abaixo). <span class="has-text-weight-bold">A atualização dos dados é diária</span></p>

        <p>
          Você pode conferir também outros projetos para acompanhamento da situação no Brasil e no mundo:
        </p>
        <ul>
          <li> <a href="https://github.com/belisards/coronabr" title="Configura a base de dados no Github">Base de dados em CSV</a> atualizado diariamente pelo <a href="https://twitter.com/belisards" title="Visite o Twitter do Adriano Belisário">Adriano Belisário</a> </li>
          <li><a href="http://plataforma.saude.gov.br/novocoronavirus/" title="Visite o site oficial para acompanhamento do COVID-19 feito pelo Ministério da Saúde">Site oficial</a> para acompanhamento dos casos pelo MS (<span class="has-text-weight-bold">Até o momento sem atualização</span> )</li>
          <li><a href="https://coronavirus.jhu.edu/map.html" title="Visite o mapa desenvolvido pela Universidade Johns Hopkins">Mapa do Coronavirus</a> no mundo desenvolvido pela Universidade Johns Hopkins</li>
          <li><a href="https://arte.estadao.com.br/ciencia/novo-coronavirus/monitor-pandemia/" title="Confira o Monitor do COVID-19 desenvolvido pela equipe do Estadão"> Monitor do COVID-19 </a> desenvolvido pela equipe do Estadão</li>
          <li> <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports/" title="Confira o situation report">Situation Report</a> da Organização Mundial da Saúde</li>
        </ul>
      </div>
    </section>

    <TodayStats :stats="todayStats" :last-updated="lastUpdated" />

    <client-only>
      <DailyCases :period.sync="period" :daily-data="dailyData" />
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
    brazilData: {},
    period: '7'
  }),

  computed: {
    todayStats () {
      return this.brazilData.data.slice(-1)[0] || {}
    },
    dailyData () {
      return this.brazilData.data.slice(-this.period)
    },
    lastUpdated () {
      return this.brazilData.lastUpdated
    }
  },

  watch: {
    period () {
      this.syncRouteWithData(['period'])
    }
  },

  mounted () {
    this.loadDataFromRoute(['period'])
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
    }
  }
}
</script>
