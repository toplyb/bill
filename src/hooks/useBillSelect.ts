import { SELECTOPTION } from '@/enums'
import { computed, ref } from 'vue'
import { allMoneyByType } from '@/utils/bill'
import useBillStore from '@/store/bill'

const useBillSelectHook = () => {
  const billStore = useBillStore()

  // 筛选器
  const selectOptions = [
    {
      label: '全部',
      key: SELECTOPTION.ALL
    },
    {
      label: '按时间筛选',
      key: SELECTOPTION.TIME
    },
  ]
  const currentIndex = ref(0)
  const selectOption = (e: any) => {
    currentIndex.value = e.detail.value
    if (e.detail.value === '1') {
      isShowTimeSelect.value = true
      currentYear.value = getAllYearInBill.value[0]
    } else {
      currentYear.value = ''
      currentMonth.value = getAllMonthByYear.value[0]
      isShowTimeSelect.value = false
    }
  }

  // 获取所有的账单
  let billListInPage = billStore.sortBillList

  // 所有的收入
  const allIncome = computed(() => {
    return allMoneyByType('income', billStore.sortBillList)
  })
  // 所有的支出
  let allExpense = computed(() => {
    return allMoneyByType('expense', billStore.sortBillList)
  })
  // 账单中所有的年份
  let getAllYearInBill = computed(() => {
    const data: string[] = []
    billListInPage.forEach(item => {
      const year = item.date.split('-')[0] + '年'
      if (!data.includes(year)) {
        data.push(year)
      }
    })
    return data
  })

  // 年份选择器
  const isShowTimeSelect = ref(false)
  // 选中的年份
  const currentYear = ref('')
  const selectYear = (e: any) => {
    currentYear.value = getAllYearInBill.value[e.detail.value]
  }

  // 月份选择器
  const getAllMonthByYear = computed(() => {
    const data: string[] = []
    billListInPage.forEach(item => {
      if (item.date.indexOf(currentYear.value.split('年')[0]) !== -1) {
        const month = item.date.split('-')[1] + '月'
        if (!data.includes(month)) {
          data.push(month)
        }
      }
    })
    data.sort()
    data.unshift('全部')
    return data
  })
  // 选中的月份
  const currentMonth = ref(getAllMonthByYear.value[0])
  const selectMonth = (e: any) => {
    currentMonth.value = getAllMonthByYear.value[e.detail.value]
  }

  return {
    selectOptions,
    selectOption,
    currentIndex,
    isShowTimeSelect,
    getAllYearInBill,
    currentYear,
    selectYear,
    getAllMonthByYear,
    currentMonth,
    selectMonth,
    allIncome,
    allExpense,
    billListInPage
  }
}

export default useBillSelectHook
