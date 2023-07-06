<template>
  <view class="chart-container">
    <view class="charts-box">
      <qiun-data-charts type="column" :chartData="chartData"/>
    </view>
    <view class="btn-list">
      <button :class="currentType === 'month' ? 'active-button' : ''" @click="handlerChangeType('month')">按月统计
      </button>
      <button :class="currentType === 'year' ? 'active-button' : ''" @click="handlerChangeType('year')">按年统计
      </button>
    </view>
  </view>
</template>

<script setup lang='ts'>

import { ref } from 'vue'
import { getAllBills } from '@/utils/bill'
import type { ButtonType, IChartOption } from '@/types/chart'
import { onShow } from '@dcloudio/uni-app'

const billList = getAllBills()

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

const allMonth: { [key: string]: { [key: string]: number } } = {}
const allYear: { [key: string]: { [key: string]: number } } = {}

const getAllMonthOrAllYear = (type: 'year' | 'month') => {
  billList.forEach(item => {
    const dateString = item.date.split('-')
    const year = dateString[0]
    if (!yearData.categories.includes(year)) {
      yearData.categories.push(year)
    }

    if (year in allYear) {
      if (item.type === 'income') {
        allYear[year]['income'] += Number(item.money)
      } else if (item.type === 'expense') {
        allYear[year]['expense'] += Number(item.money)
      }
    } else {
      allYear[year] = {
        'income': 0,
        'expense': 0
      }
    }

    const month = dateString[1]
    if (!monthData.categories.includes(month)) {
      monthData.categories.push(month)
    }

    if (month in allMonth) {
      if (item.type === 'income') {
        allMonth[month]['income'] += Number(item.money)
      } else if (item.type === 'expense') {
        allMonth[month]['expense'] += Number(item.money)
      }
    } else {
      allMonth[month] = {
        'income': 0,
        'expense': 0
      }
    }
  })
}

yearData.categories = [...Object.keys(allYear)]
monthData.categories = [...Object.keys(allMonth)]

for (let month in allMonth) {
  monthData.series.forEach(item => {
    if (item.name === '收入') {
      item.data.push(allMonth[month]['income'].toFixed(2).toString())
    } else {
      item.data.push(allMonth[month]['expense'].toFixed(2).toString())
    }
  })
}

for (let year in allYear) {
  yearData.series.forEach(item => {
    if (item.name === '收入') {
      item.data.push(allYear[year]['income'].toFixed(2).toString())
    } else {
      item.data.push(allYear[year]['expense'].toFixed(2).toString())
    }
  })
}

const currentType = ref<ButtonType>('month')

let chartData = monthData
const handlerChangeType = (type: ButtonType) => {
  currentType.value = type
  if (type === 'month') {
    chartData = monthData
  } else {
    chartData = yearData
  }
}
</script>

<style scoped lang='scss'>
.chart-container {
  width: 100vw;
  height: 100vh;
  padding: 10rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .btn-list {
    display: flex;
  }

  .charts-box {
    width: 100%;
    height: 300px;
  }
}

.active-button {
  background-color: #fff;
  border: 1px solid #3F4B3B;
  color: #3F4B3B;
}

</style>
