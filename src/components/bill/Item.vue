<template>
  <view class="bill-item">
    <view class="bill-item-type" :class="bill.type === 'income' ? 'success' : 'error'">
      {{ bill.type === 'income' ? '收入' : '支出' }}
    </view>
    <view class="bill-item-money">{{ bill.money }}</view>
    <view class="bill-item-time">{{ bill.date }} {{ bill.time }}</view>
  </view>
</template>

<script setup lang='ts'>
import { defineProps } from 'vue'
import type { IBillFrom } from '@/types/bill'

const props = defineProps<{
  bill: IBillFrom
}>()
const bill = props.bill
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
    color: #548687!important;
  }

  .error {
    color: #E71D36!important;
  }

  &-money {
    font-weight: bold;
  }

  &-time {

  }
}
</style>
