<template>
  <view class="container">
    <view class="container-header">
      <view class="title">最新变动</view>
      <view class="header-right">
        <DayMoney :bill-list="sortBillList"></DayMoney>
        <WeekMoney :bill-list="sortBillList"></WeekMoney>
      </view>
    </view>
    <view class="bill-list">
      <BillItem v-for="(bill, index) in sortBillList" :key="bill.created_at + index + Math.random()" :bill="bill"></BillItem>
    </view>
    <view class="container-button">
      <button @click="handlerAddBill('expense')">支出</button>
      <button @click="handlerAddBill('income')">收入</button>
      <view>
        <XSDialog ref="dialogRef" :is-show="isShowDialog" @submit="submitBill" @cancel="cancelBill"></XSDialog>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import XSDialog from '@/components/common/XSDialog.vue'
import BillItem from '@/components/bill/Item.vue'
import { computed, reactive, ref } from 'vue'
import type { IBillFrom } from '@/types/bill'
import WeekMoney from '@/components/bill/WeekMoney.vue'
import DayMoney from '@/components/bill/DayMoney.vue'

// 账单类型，expense 支出，income 收入
type BillType = 'expense' | 'income'

// 表单弹框
const isShowDialog = ref(false)
// 账单类型
const billType = ref<BillType>('expense')
// 所有账单
let billList = reactive(uni.getStorageSync('bill_list') as IBillFrom[] || [] as IBillFrom[])
const sortBillList = computed(() => {
  return billList.sort((a, b) => {
    return Date.parse(b.date + ' ' + b.time) - Date.parse(a.date + ' ' + a.time)
  })
})
const dialogRef = ref<typeof XSDialog | null>(null)

// 按钮点击事件
const handlerAddBill = (type: BillType) => {
  billType.value = type
  isShowDialog.value = true
}

// 提交账单按钮
const submitBill = (data: IBillFrom) => {
  data['type'] = billType.value
  billList.unshift(data)
  try {
    uni.setStorageSync('bill_list', billList)
    dialogRef.value?.resetFormData()
    isShowDialog.value = false
    uni.showToast({
      title: '提交成功',
      duration: 2000,
      icon: 'success'
    })
  } catch (e) {
    uni.showToast({
      title: '保存失败，请稍后重试',
      duration: 2000,
      icon: 'error'
    })
  }
}

// 取消按钮
const cancelBill = () => {
  dialogRef.value?.resetFormData()
  isShowDialog.value = false
}

</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  .container-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: #fff;
    padding: 0 20rpx;
    box-sizing: border-box;

    .title {
      line-height: 100rpx;
      font-size: 40rpx;
      font-weight: bold;
    }

    .header-right {
      margin-left: 20rpx;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      font-size: 25rpx;
    }
  }

  .bill-list {
    width: 100%;
    flex: 1;
    overflow-y: scroll;
    padding: 20rpx;
    box-sizing: border-box;
  }

  &-button {
    width: 100%;
    height: 140rpx;
    display: flex;
    align-items: center;
    background-color: #d6ecfa;
  }
}
</style>
