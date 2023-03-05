<template>
  <v-card>
    <v-card-title class="align-start">
      <span>{{ title }}</span>

      <v-spacer></v-spacer>

      <!-- <v-select :items="selection"  v-model="selected" @change="onchangeYear"/> -->
       
    
    </v-card-title>
    <v-card-text>
       <!-- :key="selected" -->
      <Bar
        :key="selected"
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { Bar } from 'vue-chartjs/legacy'

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: {
    Bar,
  },
  props: {
    selected:{
      type:String,
      default:2022
    },
    title: {
      type: String,
      default: '',
    },
     color: {
      type: String,
      default: '#f87979',
    },
    data: {
      type: Object,
      default: null,
    },
    chartId: {
      type: String,
      default: 'bar-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selection:[],
      chartData: {
        labels: [
          'Janvier',
          'Février',
          'Mars',
          'Avril',
          'Mai',
          'Juin',
          'Juillet',
          'Août',
          'Septembre',
          'Octobre',
          'Novembre',
          'Decembre',
        ],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [0,0,0,0,0,0,0,0,0,0,0,0],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
  watch:
  {
      selected(val)
      {
          this.onchangeYear(val)
      }
  },
  mounted()
  {
      this.chartData.datasets[0].backgroundColor=this.color
    
       this.onchangeYear(this.selected)
     
  },
  updated()
  {
     this.chartData.datasets[0].backgroundColor=this.color
    
       this.onchangeYear(this.selected)
  },
  methods:{
      onchangeYear(val)
      {
        let data=this.data[val]?this.data[val]:[]
          this.chartData.datasets[0].data=[0,0,0,0,0,0,0,0,0,0,0,0]
          this.chartData.datasets[0].label=this.title+' ('+val+')'
          data.forEach(element => {
              this.chartData.datasets[0].data[new Date(element.created_at).getMonth()]=this.chartData.datasets[0].data[new Date(element.created_at).getMonth()]+1
              this.chartData.datasets[0].data

          });
          //this.chartData.datasets[0].data.push(this.data[el])
      }
  }
}
</script>
