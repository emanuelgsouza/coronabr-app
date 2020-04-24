<template>
  <div class="box has-text-centered is-relative">
    <template v-if="!loading">
      <p class="is-size-1 has-text-weight-semibold">
        {{ formatValue }}
      </p>

      <p class="is-size-5">
        {{ label }}
      </p>
    </template>

    <b-loading :is-full-page="false" :active.sync="loading" />
  </div>
</template>

<script>
import { formatNumber } from '~/support/numbers'

export default {
  name: 'TodayStatsBox',
  props: {
    label: {
      type: String,
      default: '',
      required: true
    },
    value: {
      type: Number,
      default: 0,
      required: true
    },
    loading: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  computed: {
    formatValue () {
      return formatNumber(this.value)
    }
  }
}
</script>

<style scoped>
.box {
  min-height: 142px;
}
</style>
