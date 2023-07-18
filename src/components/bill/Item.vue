<template>
  <view class="bill-item">
    <view class="bill-item-type" :class="bill.type === 'income' ? 'success' : 'error'">
      {{ bill.type === 'income' ? '收入' : '支出' }}
    </view>
    <view class="bill-item-money">{{ bill.money }}</view>
    <view class="bill-item-time">{{ bill.date }} {{ handleTime }}</view>
    <view v-if="isShowDelete">
      <button @click="deleteBill">删除</button>
    </view>
  </view>
</template>

<script setup lang='ts'>
import { computed, defineProps } from 'vue'
import type { IBillFrom } from '@/types/bill'

const props = defineProps<{
  bill: IBillFrom,
  index?: number,
  isShowDelete?: boolean
}>()
let bill = props.bill

const handleTime = computed(() => {
  return bill.time.split(':', 2).join(':')
})

const emits = defineEmits(['deleteBill'])

const deleteBill = () => {
  emits('deleteBill', props.index)
}
</script>

<style scoped lang='scss'>
.bill-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  border-radius: 10rpx;
  border-bottom: 1px solid #548687;
  padding: 15rpx 10rpx;

  &-type {
    text-align: center;
  }

  .success {
    color: #548687 !important;
  }

  .error {
    color: #E71D36 !important;
  }

  &-money {
    font-weight: bold;
  }

  &-time {

  }

  button {
    font-size: 28rpx;
    padding: 0 15px;
  }
}
</style>
