<template>
  <div>
    <Hero
      title="CoronaBR"
      subtitle="Acompanhe os casos de COVID-19 no Brasil"
    />

    <section class="section">
      <div class="content container">
        <p>
          Este projeto tem como objetivo trazer um acompanhamento dos casos do COVID-19 no Brasil. Sendo assim, primeiramente você poderá ver uma linha do tempo mostrando a evolução dos casos oficiais no Brasil.
        </p>

        <p>
          Os dados deste projeto vem diretamente do site oficial do <a href="https://saude.gov.br/" title="Visite o site oficial do Ministério da Saúde">Ministério da Saúde</a> destinado a dar uma visualização e o estado atual da epidemia no Brasil. Você pode conferir o site oficial, que mostra algumas outras informações, tais como uma tabela mostrando os dados por país, no endereço <a href="http://plataforma.saude.gov.br/novocoronavirus/" title="Visite o site oficial para acompanhamento do COVID-19 feito pelo Ministério da Saúde">http://plataforma.saude.gov.br/novocoronavirus/</a>
        </p>

        <p>
          Você conferir também alguns outros projetos para acompanhamento da situação no Brasil e no mundo:
        </p>
        <ul>
          <li> <a href="https://github.com/belisards/coronabr" title="Configura a base de dados no Github">Base de dados em CSV</a> atualizado diariamente feita pelo <a href="https://twitter.com/belisards" title="Visite o Twitter do Adriano Belisário">Adriano Belisário</a> </li>
          <li><a href="http://plataforma.saude.gov.br/novocoronavirus/" title="Visite o site oficial para acompanhamento do COVID-19 feito pelo Ministério da Saúde">Site oficial</a> para acompanhamento dos casos pelo MS</li>
          <li><a href="https://coronavirus.jhu.edu/map.html" title="Visite o mapa desenvolvido pela Universidade Johns Hopkins">Mapa do Coronavirus</a> no mundo desenvolvido pela Universidade Johns Hopkins</li>
        </ul>
      </div>
    </section>

    <TodayStats :stats="todayStats" :last-updated="lastUpdated" />

    <client-only>
      <DailyCases :daily-data="dailyData" />
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
    brazilData: {}
  }),

  computed: {
    todayStats () {
      return this.brazilData.data.slice(-1)[0] || {}
    },
    dailyData () {
      return this.brazilData.data.slice(-15)
    },
    lastUpdated () {
      return this.brazilData.lastUpdated
    }
  }
}
</script>
