<template>
  <v-card>
    <v-card-title class="align-start">
      <span>Profit par Service</span>

      <v-spacer></v-spacer>
    </v-card-title>

    <v-card-text>
      <v-list class="pb-0">
        <v-list-item
          v-for="(data, index) in salesByCountries"
          :key="data.country"
          :class="`d-flex align-center px-0 ${index > 0 ? 'mt-4' : ''}`"
        >
          <v-avatar  size="40" class=" white--text font-weight-medium me-3`">
            <v-img class="text-base" :src="data.service.logo "/>
          </v-avatar>

          <div class="d-flex align-center flex-grow-1 flex-wrap">
            <div class="me-2">
              <div class="font-weight-semibold">
                <span class="text--primary text-base me-1">{{ data.name }}</span>
              </div>
            </div>

            <v-spacer></v-spacer>

            <div>
              <h4 class="font-weight-semibold">
                {{ data.total }}  TND
              </h4>
            </div>
          </div>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiDotsVertical, mdiChevronUp, mdiChevronDown } from '@mdi/js'

export default {
  props:['data'],
  data() {
    return{
     salesByCountries : [
      {
        abbr: 'US',
        amount: '$8,656k',
        country: 'United states of america',
        change: '+25.8%',
        sales: '894k',
        color: 'success',
      },
      {
        abbr: 'UK',
        amount: '$2,415k',
        country: 'United kingdom',
        change: '-6.2%',
        sales: '645k',
        color: 'error',
      },
      {
        abbr: 'IN',
        amount: '$865k',
        country: 'India',
        change: '+12.4%',
        sales: '148k',
        color: 'warning',
      },
      {
        abbr: 'JA',
        amount: '$745k',
        country: 'Japan',
        change: '-11.9%',
        sales: '86k',
        color: 'secondary',
      },
      {
        abbr: 'KO',
        amount: '$45k',
        country: 'Korea',
        change: '+16.2%',
        sales: '42k',
        color: 'error',
      },
    ],

 
      icons: {
        mdiDotsVertical,
        mdiChevronUp,
        mdiChevronDown,
      },
    }
  },
  mounted()
  {
    console.log('test',this.data);
     this.salesByCountries=this.data
  }
}
</script>
