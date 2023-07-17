import type { ButtonType, IChartOption } from '@/types/chart'
import { getAllBills } from '@/utils/bill'
import { handleMoney } from '@/utils/money'

const monthData: IChartOption = {
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
}
const yearData: IChartOption = {
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
}

// 获取到所有的月份和年份以及对应的数据
const getAllMonthOrAllYear = (type: ButtonType) => {
  const billList = getAllBills()
  const tempData = {} as any
  billList.forEach(item => {
    const dateString = item.date.split('-')

    if (type === 'year') {
      const year = dateString[0]
      if (tempData[year]) {
        tempData[year][item.type] += Number(item.money) * 100
      } else {
        tempData[year] = {
          expense: item.type === 'expense' ? Number(item.money) * 100 : 0,
          income: item.type === 'income' ? Number(item.money) * 100 : 0
        }
      }
    } else if (type === 'month') {
      const month = dateString[1]
      if (tempData[month]) {
        tempData[month][item.type] += Number(item.money) * 100
      } else {
        tempData[month] = {
          expense: item.type === 'expense' ? Number(item.money) * 100 : 0,
          income: item.type === 'income' ? Number(item.money) * 100 : 0
        }
      }
    }
  })

  console.log(tempData, 'tempData==')

  // 月份或年份排序
  const categories = Object.keys(tempData).sort()
  const data: any = {}
  for (let category of categories) {
    data[category] = tempData[category]
  }
  console.log(data, 'data===')
  if (type === 'month') {
    monthData.categories = categories
    const allIncome: string[] = []
    const allExpense: string[] = []
    monthData.categories.forEach(month => {
      allIncome.push(handleMoney(data[month]['income']) + '')
      allExpense.push(handleMoney(data[month]['expense']) + '')
    })
    monthData['series'][1]['data'] = allExpense
    monthData['series'][0]['data'] = allIncome
  } else {
    yearData.categories = categories
    const allIncome: string[] = []
    const allExpense: string[] = []
    yearData.categories.forEach(month => {
      allIncome.push(data[month]['income'])
      allExpense.push(data[month]['expense'])
    })
    yearData['series'][1]['data'] = allExpense
    yearData['series'][0]['data'] = allIncome
  }
}

const getChartData = (type: ButtonType) => {
  getAllMonthOrAllYear(type)
  if (type === 'month') {
    return monthData
  } else {
    return yearData
  }
}

export default getChartData
