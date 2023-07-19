import { defineStore } from 'pinia'
import type { IChartOption } from '@/types/chart'

const useChatStore = defineStore('chat', {
  state: () => {
    return {
      monthData: {
        categories: [],
        series: [
          {
            name: '收入',
            data: []
          },
          {
            name: '支出',
            data: []
          }
        ]
      } as IChartOption,
      yearData: {
        categories: [],
        series: [
          {
            name: '收入',
            data: []
          },
          {
            name: '支出',
            data: []
          }
        ]
      } as IChartOption
    }
  },

  actions: {
    setCategories(type: 'month' | 'year', data: string[]) {
      if (type === 'month') {
        this.monthData.categories = data
      } else {
        this.yearData.categories = data
      }
    },

    setSeries(type: 'month' | 'year', expense: string[], income: string[]) {
      if (type === 'month') {
        this.monthData.series[0]['data'] = income
        this.monthData.series[1]['data'] = expense
      } else {
        this.yearData.series[0]['data'] = income
        this.yearData.series[1]['data'] = expense
      }
    }
  }
})

export default useChatStore
