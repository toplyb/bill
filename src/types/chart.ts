interface ISeries {
  name: '收入' | '支出',
  data: string[]
}

export interface IChartOption {
  categories: string[],
  series: ISeries[]
}

export type ButtonType = 'month' | 'year'
