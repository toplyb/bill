<template>
  <view class="dialog-container-content">
    <view class="dialog-container-content-form">
      <view>
        <view class="label">金额：</view>
        <input type="digit" v-model="state.money" focus="true">
      </view>
      <view>
        <view class="label">用途：</view>
        <input type="text" v-model="state.purpose">
      </view>

      <view>
        <view class="label">备注：</view>
        <input type="text" v-model="state.comment" placeholder="">
      </view>
      <view>
        <view class="label">日期：</view>
        <picker @change="changeDate" :value="state.date" mode="date">
          <view class="uni-input">{{ state.date }}</view>
        </picker>
      </view>
      <view>
        <view class="label">时间：</view>
        <picker @change="changeTime" :value="state.time" mode="time" start="09:01" end="21:01">
          <view class="uni-input">{{ state.time }}</view>
        </picker>
      </view>
    </view>
    <view class="dialog-container-content-button">
      <button @click="submit">提交</button>
      <button @click="cancel">取消</button>
    </view>
  </view>
</template>

<script setup lang='ts'>
import { defineEmits, defineProps, PropType, reactive } from 'vue'
import { getCurrentDate, getCurrentTime, getCurrentTimeAndDate } from '@/utils/dateTime'
import type { IBillFrom } from '@/types/bill'

const emits = defineEmits([ 'submit', 'cancel' ])

const initBillForm: IBillFrom = {
  id: 0,
  money: '',
  purpose: '',
  comment: '',
  time: getCurrentTime(),
  date: getCurrentDate(),
  created_at: getCurrentTimeAndDate(),
  type: ''
}

let state = reactive<IBillFrom>({ ...initBillForm })

const submit = () => {
  if (state.money === '') {
    uni.showToast({
      title: '请输入金额',
      duration: 2000,
      icon: 'error'
    })
    return false
  }
  emits('submit', state)
}

const cancel = () => {
  emits('cancel')
}

const changeDate = (e: any) => {
  state.date = e.detail.value
}

const changeTime = (e: any) => {
  state.time = e.detail.value + ':00'
}

const resetFormData = (data?: IBillFrom) => {
  const obj = data ? data : initBillForm
  state = reactive({ ...obj })
}

defineExpose({ resetFormData })
</script>

<style scoped lang='scss'>
.dialog-container-content {
  background-color: #e6e7ee;
  border-radius: 10rpx;
  padding: 50rpx;
  box-sizing: border-box;

  &-form {
    & > view {
      display: flex;
      padding: 20rpx;
    }

    .label {
      display: flex;
      align-items: center;
    }

    input, picker {
      border: 1px solid $uni-color-primary;
      border-radius: 10rpx;
      padding: 20rpx;
      flex: 1;
    }
  }

  &-button {
    margin-top: 20rpx;
    display: flex;
  }
}
</style>
