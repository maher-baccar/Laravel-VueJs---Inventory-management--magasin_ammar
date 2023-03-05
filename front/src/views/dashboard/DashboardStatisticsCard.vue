<template>
  <v-card>
    <v-card-title class="align-start">
      <span class="font-weight-semibold">Statistiques Général</span>
      <v-spacer></v-spacer>
    </v-card-title>

    <v-card-subtitle class="mb-8 mt-n5"> </v-card-subtitle>

    <v-card-text>
      <v-row>
        <v-col v-for="data in statisticsData" :key="data.title" cols="6" md="3" class="d-flex align-center">
          <v-avatar size="44" :color="resolveStatisticsIconVariation(data.title).color" rounded class="elevation-1">
            <v-icon dark color="white" size="30">
              {{ resolveStatisticsIconVariation(data.title).icon }}
            </v-icon>
          </v-avatar>
          <div class="ms-3">
            <p class="text-xs mb-0">
              {{ data.title }}
            </p>
            <h3 class="text-xl font-weight-semibold">
              {{ data.total }}
            </h3>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiAccountOutline, mdiCurrencyUsd, mdiTrendingUp, mdiDotsVertical, mdiLabelOutline,mdiAccountCircle } from '@mdi/js'

export default {
  props: ['data','selected'],
  data() {
    return {
      statisticsData: [
        {
          title: 'Sales',
          total: '245k',
        },
        {
          title: 'Customers',
          total: '12.5k',
        },
        {
          title: 'Product',
          total: '1.54k',
        },
        {
          title: 'Revenue',
          total: '$88k',
        },
      ],
      icons: {
        mdiDotsVertical,
        mdiTrendingUp,
        mdiAccountOutline,
        mdiLabelOutline,
        mdiAccountCircle,
        mdiCurrencyUsd,
      },
    }
  },
  watch:{
    selected(val)
    {
      console.log('hahahahah');
        this.rerender()
    }
  },
  methods: {
    resolveStatisticsIconVariation(data) {
      if (data === 'profits') return { icon: mdiCurrencyUsd, color: 'primary' }
      if (data === 'prestataires') return { icon: mdiAccountOutline, color: 'success' }
      if (data === 'clients') return { icon: mdiAccountCircle, color: 'warning' }
      if (data === 'services') return { icon: mdiLabelOutline, color: 'info' }
      if (data === 'orders') return { icon: mdiTrendingUp, color: 'info' }

      return { icon: mdiAccountOutline, color: 'success' }
    },
     rerender()
    {
      let stats = Object.keys(this.data).map(el => {
      let obj = {
        title: el,
        total: this.data[el],
      }
      return obj
    })
    this.statisticsData = stats
    console.log('tesssssssst');
    }
  },
  mounted() {
   this.rerender()
  },
}
</script>
