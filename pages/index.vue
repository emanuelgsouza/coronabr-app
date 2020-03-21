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

        <p>
          <strike>Os dados deste projeto vem diretamente do site oficial do</strike> <a href="https://saude.gov.br/" title="Visite o site oficial do Ministério da Saúde">Ministério da Saúde (MS)</a> destinado a dar uma visualização e o estado atual da epidemia no Brasil. Você pode conferir o site oficial, que mostra algumas outras informações, tais como uma tabela mostrando os dados por país, no endereço <a href="http://plataforma.saude.gov.br/novocoronavirus/" title="Visite o site oficial para acompanhamento do COVID-19 feito pelo Ministério da Saúde">http://plataforma.saude.gov.br/novocoronavirus/</a>
        </p>

        <p>
          A partir do dia 18 de Março o site oficial do MS apresentou instabilidades e desde então os dados não foram mais atualizados. Sendo assim, <span class="has-text-weight-bold">a fonte de dados para este projeto mudou</span>. Encontramos um outro projeto, usado pela Equipe do Estadão (vide link abaixo) para analisarmos e tirarmos as informações de que precisamos para acompanhar a evolução no COVID-19 no Brasil. Reiterando, portanto, a fonte de dados atual é a do site da <a href="https://ourworldindata.org/coronavirus-source-data" title="Confira o site oficial da Our World in Data">Our World in Data</a> e <span class="has-text-weight-bold">a atualização dos dados é diária</span>.
        </p>

        <p>
          Você conferir também alguns outros projetos para acompanhamento da situação no Brasil e no mundo:
        </p>
        <ul>
          <li> <a href="https://github.com/belisards/coronabr" title="Configura a base de dados no Github">Base de dados em CSV</a> atualizado diariamente feita pelo <a href="https://twitter.com/belisards" title="Visite o Twitter do Adriano Belisário">Adriano Belisário</a> </li>
          <li><a href="http://plataforma.saude.gov.br/novocoronavirus/" title="Visite o site oficial para acompanhamento do COVID-19 feito pelo Ministério da Saúde">Site oficial</a> para acompanhamento dos casos pelo MS</li>
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
    period: '15'
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
