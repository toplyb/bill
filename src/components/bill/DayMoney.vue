<template>
  <view class="day-container">
    今日支出：
    <view class="header-money">{{ dayExpense.toFixed(2) }}</view>
  </view>
</template>

<script setup lang='ts'>
import { PropType, ref, watch } from 'vue'
import { getCurrentDate } from '@/utils/dateTime'
import { IBillFrom } from '@/types/bill'

const props = defineProps({
  billList: {
    type: Array as PropType<IBillFrom[]>,
    required: true
  }
})

const dayExpense = ref(0)

watch(props.billList, (newValue) => {
  dayExpense.value = 0
  newValue.forEach(item => {
    if (item.date === getCurrentDate() && item.type === 'expense') {
      dayExpense.value += Number(item.money)
    }
  })
}, {
  deep: true,
  immediate: true
})
</script>

<style scoped lang='scss'>
.day-container {
  display: flex;
  align-items: center;

  .header-money {
    font-size: 30rpx;
    font-weight: bold;
  }
}
</style>
