<template>
  <view class="week-container">
    本周支出({{ weekStartDate }}:{{ weekEndDate }})：
    <view class="header-money">{{ weekExpense.toFixed(2) }}</view>
  </view>
</template>

<script setup lang='ts'>
import { getDay, getTimestamp, gleYourDate } from '@/utils/dateTime'
import { PropType, ref, watch } from 'vue'
import { IBillFrom } from '@/types/bill'

const props = defineProps({
  billList: {
    type: Array as PropType<IBillFrom[]>,
    required: true
  }
})

const weekExpense = ref(0)
const currentDay = getDay()
const weekStartDate = gleYourDate(currentDay - 1, 'before')
const weekEndDate = gleYourDate(currentDay + (7 - currentDay - 1), 'after')

watch(props.billList, (newValue) => {
  weekExpense.value = 0
  newValue.forEach(item => {
    if (getTimestamp(weekStartDate) <= getTimestamp(item.date) && getTimestamp(item.date) <= getTimestamp(weekEndDate) && item.type === 'expense') {
      weekExpense.value += Number(item.money)
    }
  })
}, {
  deep: true,
  immediate: true
})
</script>

<style scoped lang='scss'>
.week-container {
  display: flex;
  align-items: center;

  .header-money {
    font-size: 30rpx;
    font-weight: bold;
  }
}
</style>
