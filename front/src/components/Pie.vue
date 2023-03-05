<template>
  <v-card>
    <v-card-title class="align-start">
      <span>{{ title }}</span>

      <v-spacer></v-spacer>

      <v-btn icon small class="me-n3 mt-n2">
        <v-icon> </v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <Doughnut
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
import { Doughnut } from 'vue-chartjs/legacy'

import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'DoughnutChart',
  components: {
    Doughnut,
  },
  props: {
    selected: {
      type: String,
      default: 2022,
    },
    title: {
      type: String,
      default: '',
    },
    data: {
      type: Object,
      default: null,
    },
    chartId: {
      type: String,
      default: 'doughnut-chart',
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
  watch: {
    selected(val) {
      console.log('changed')
      this.onchangeYear(val)
    },
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
  mounted() {
    // Object.keys(this.data).forEach(el => {
    //   switch (el) {
    //     case 'accepted':
    //       this.chartData.labels.push('Acceptées')
    //       this.chartData.datasets[0].backgroundColor.push('#247035')
    //       break
    //     case 'refused':
    //       this.chartData.labels.push('Réfusées')
    //       this.chartData.datasets[0].backgroundColor.push('#ff4949')
    //       break
    //     case 'in_progress':
    //       this.chartData.labels.push('En Attente')
    //       this.chartData.datasets[0].backgroundColor.push('#49dcff')
    //       break
    //   }

    //   this.chartData.datasets[0].data.push(this.data[el])
    // })
    this.onchangeYear(this.selected)
  },
  methods: {
    onchangeYear(val) {
      let data = this.data[val] ? this.data[val] : []
      // console.log('test  test', data, this.selected, val)
      var filtred = {
        accepted: 0,
        refused: 0,
        in_progress: 0,
      }
      filtred.accepted = data.filter(el => {
        // console.log('bla', el)
        return el.validated ? el.validated == 1 : el.confirmed ? el.confirmed == 1 : false
      }).length
      filtred.refused = data.filter(el => {
        return el.validated ? el.validated == -1 : el.confirmed ? el.confirmed == -1 : false
      }).length
      filtred.in_progress = data.filter(el => {
        return el.validated ? el.validated == 0 : el.confirmed ? el.confirmed == 0 : false
      }).length

      this.chartData = {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: [],
          },
        ],
      }
      Object.keys(filtred).forEach(el => {
        // console.log('el', el)
        switch (el) {
          case 'accepted':
            this.chartData.labels.push('Acceptées')
            this.chartData.datasets[0].backgroundColor.push('#247035')
            break
          case 'refused':
            this.chartData.labels.push('Réfusées')
            this.chartData.datasets[0].backgroundColor.push('#ff4949')
            break
          case 'in_progress':
            this.chartData.labels.push('En Attente')
            this.chartData.datasets[0].backgroundColor.push('#49dcff')
            break
        }

        this.chartData.datasets[0].data.push(filtred[el])
        // console.log(this.chartData);
      })
    },
  },
}
</script>
