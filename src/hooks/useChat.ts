import type { ButtonType, IChartOption } from '@/types/chart'
import { handleMoney } from '@/utils/bill'
import useBillStore from '@/store/bill'
import useChatStore from '@/store/chat'
import chat from '@/store/chat'
import type { IBillFrom } from '@/types/bill'

const useChatHook = () => {
  const billStore = useBillStore()
  const chatStore = useChatStore()

  const setTempData = (type: 'month' | 'year', billList: IBillFrom[]) => {
    const data: any = {}

    billList.forEach(item => {
      const dateString = item.date.split('-')
      const typeString = type === 'year' ? dateString[0] : dateString[1]
      if (data[typeString]) {
        data[typeString][item.type] += Number(item.money) * 100
      } else {
        data[typeString] = {
          expense: item.type === 'expense' ? Number(item.money) * 100 : 0,
          income: item.type === 'income' ? Number(item.money) * 100 : 0
        }
      }

      return data
    })

    return data
  }

  const setChatData = (type: 'month' | 'year', categories: string[], data: any) => {
    chatStore.setCategories(type, categories)
    const allIncome: string[] = []
    const allExpense: string[] = []

    const storeName = type === 'month' ? 'monthData' : 'yearData'

    chatStore[storeName].categories.forEach(item => {
      allIncome.push(handleMoney(data[item]['income']) + '')
      allExpense.push(handleMoney(data[item]['expense']) + '')
    })
    chatStore.setSeries(type, allExpense, allIncome)
  }

  // 获取到所有的月份和年份以及对应的数据
  const setAllMonthOrAllYear = (type: ButtonType) => {
    const billList = billStore.sortBillList
    const tempData: any = setTempData(type, billList)
    // 月份或年份排序
    const categories = Object.keys(tempData).sort()
    const data: any = {}
    for (let category of categories) {
      data[category] = tempData[category]
    }

    // 设置表单数据
    setChatData(type, categories, data)
  }

  const getChartData = (type: ButtonType) => {
    setAllMonthOrAllYear(type)
    if (type === 'month') {
      return chatStore.monthData
    } else {
      return chatStore.yearData
    }
  }

  return {
    getChartData
  }
}

export default useChatHook
