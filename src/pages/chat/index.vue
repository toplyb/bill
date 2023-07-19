<template>
  <view class="chart-container">
    <view class="charts-box">
      <qiun-data-charts type="column" :chartData="state.chartData"/>
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

import { reactive, ref } from 'vue'
import type { ButtonType } from '@/types/chart'
import { onShow } from '@dcloudio/uni-app'
import { IChartOption } from '@/types/chart'
import useChatHook from '@/hooks/useChat'

const currentType = ref<ButtonType>('month')

const { getChartData } = useChatHook()

const state: {
  chartData: IChartOption | null
} = reactive({
  chartData: null
})

onShow(() => {
  state.chartData = getChartData('month')
})

const handlerChangeType = (type: ButtonType) => {
  currentType.value = type
  state.chartData = getChartData(type)
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
