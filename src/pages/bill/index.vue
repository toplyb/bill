<template>
  <view class="container">
    <view class="container-header">
      <view class="title">最新变动</view>
      <view class="header-right">
        <view>
          今日支出：
          <view class="header-money">{{ dayExpense }}</view>
        </view>
        <view>
          本周支出({{weekStartDate}}:{{weekEndDate}})：
          <view class="header-money">{{ weekExpense }}</view>
        </view>
      </view>
    </view>
    <view class="bill-list">
      <BillItem v-for="(bill, index) in sortBillList" :key="bill.created_at + index" :bill="bill"></BillItem>
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
import { computed, reactive, ref, watch } from 'vue'
import type { IBillFrom } from '@/types/bill'
import { getCurrentDate, getDay, getTimestamp, gleYourDate } from '@/utils/dateTime'

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

const weekExpense = ref(0)
const dayExpense = ref(0)
const weekStartDate = gleYourDate(getDay() - 1, 'before')
const weekEndDate = gleYourDate(getDay() + 1, 'after')

watch(billList, (newValue) => {
  weekExpense.value = 0
  dayExpense.value = 0
  newValue.forEach(item => {
    if (item.date === getCurrentDate() && item.type === 'expense') {
      dayExpense.value += Number(item.money)
    }
    if (getTimestamp(weekStartDate) <= getTimestamp(item.date) && getTimestamp(item.date) <= getTimestamp(weekEndDate) && item.type === 'expense') {
      weekExpense.value += Number(item.money)
    }
  })
}, {
  deep: true,
  immediate: true
})
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

      &>view {
        display: flex;
        align-items: center;

        .header-money {
          font-size: 30rpx;
          font-weight: bold;
        }
      }
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
