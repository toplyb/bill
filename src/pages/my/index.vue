<template>
  <view class="select-container">
    <view class="select-container-top">
      <view class="money-detail">
        <view class="income">
          <view class="money-title">收入</view>
          <view class="money">{{ allIncome }}</view>
        </view>
        <view class="expense">
          <view class="money-title">支出</view>
          <view class="money">{{ allExpense }}</view>
        </view>
        <view class="expense">
          <view class="money-title">净收入</view>
          <view class="money">{{ allIncome - allExpense }}</view>
        </view>
      </view>
      <view class="select-type">
        <XSPicker class="xs-picker" mode="selector" :range="selectOptions" range-key="label" :value="currentIndex"
                  :current-value="selectOptions[currentIndex].label"
                  @selectYear="selectOption"
        ></XSPicker>
      </view>
      <view v-if="isShowTimeSelect" class="select-type">

        <XSPicker class="xs-picker" mode="selector" :range="getAllYearInBill" :value="getAllYearInBill[0]"
                  :current-value="currentYear"
                  @selectYear="selectYear"
        ></XSPicker>

        <XSPicker class="xs-picker" mode="selector" :range="getAllMonthByYear" :value="getAllMonthByYear[0]"
                  :current-value="currentMonth"
                  @selectYear="selectMonth"
        ></XSPicker>
      </view>
    </view>

    <view class="bill-list">
      <BillItem v-for="(bill, index) in billListInPage" :key="bill.created_at + index" :bill="bill"></BillItem>
    </view>
  </view>
</template>

<script setup lang='ts'>
import { computed, reactive, ref, watch } from 'vue'
import { IBillFrom } from '@/types/bill'
import BillItem from '@/components/bill/Item.vue'
import { SELECTOPTION } from '@/enums'
import XSPicker from '@/components/common/XSPicker.vue'

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
  }
}

// 获取所有的账单
const billList = uni.getStorageSync('bill_list') as IBillFrom[] || [] as IBillFrom[]
let billListInPage = reactive(billList)

const baseAllMoney = function (type: string, billListInPage: IBillFrom[]) {
  let total = 0
  const incomeList = billListInPage.filter(item => item.type === type)
  incomeList.forEach(item => {
    total += Number(item.money)
  })
  return total
}
// 所有的收入
const allIncome = ref(baseAllMoney('income', billListInPage))
// 所有的支出
let allExpense = ref(baseAllMoney('expense', billListInPage))
// 账单中所有的年份
let getAllYearInBill = computed(() => {
  const data: string[] = []
  billList.forEach(item => {
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
  billList.forEach(item => {
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

watch(currentYear, (newYear, oldYear) => {
  billListInPage = billList.filter(item => {
    if (item.date.indexOf(newYear.split('年')[0]) !== -1) {
      return item
    }
  })
  allIncome.value = baseAllMoney('income', billListInPage)
  allExpense.value = baseAllMoney('expense', billListInPage)
})

watch(currentMonth, (newMonth, oldMonth) => {
  if (newMonth === '全部') {
    billListInPage = billList.filter(item => {
      if (item.date.indexOf(currentYear.value.split('年')[0]) !== -1) {
        return item
      }
    })
  } else {
    billListInPage = billList.filter(item => {
      const month = item.date.split('-')[1]
      if (month === newMonth.split('月')[0]) {
        return item
      }
    })
  }

  allIncome.value = baseAllMoney('income', billListInPage)
  allExpense.value = baseAllMoney('expense', billListInPage)
})

</script>

<style scoped lang='scss'>
.select-container {
  width: 100%;
  height: 100%;
  padding: 50rpx;
  margin-bottom: 50rpx;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  &-top {
    width: 100%;
    background-color: #CBDBCC;
    box-shadow: 0 7px 5px -5px #D7FFF1;
    box-sizing: border-box;
    margin-bottom: 50rpx;

    .money-detail {
      display: flex;
      justify-content: center;

      & > view {
        padding: 20rpx 10rpx;
        text-align: center;
        background-color: #c8c8a9;
        border-radius: 10rpx;
        box-shadow: 0 0 3px 3px #dedcee;
        flex: 1;

        .money-title {
          margin-bottom: 10rpx;
        }

        .money {
          font-size: 20px;
        }

        &:not(:last-child) {
          margin-right: 30rpx;
        }
      }

      .income {
        .money {
          color: #3ac569;
        }
      }

      .expense {
        .money {
          color: #E71D36;
        }
      }
    }

    .select-type {
      margin-top: 30rpx;
      display: flex;

      .xs-picker {
        padding: 20rpx;
        flex: 1;
        border: 1px solid #ffffff;
        text-align: center;

        &:not(:last-child) {
          margin-right: 20rpx;
        }
      }
    }
  }

  .bill-list {
    border: 1px solid #FFFFF2;
    border-radius: 10rpx;
    padding: 20rpx;
    box-sizing: border-box;
    overflow: hidden;
    flex: 1;
    overflow-y: scroll;
    width: 100%;
  }
}
</style>
