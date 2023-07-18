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
      <BillItem v-for="(bill, index) in sortBillList" :key="bill.created_at + index + Math.random()" :bill="bill"
                :is-show-delete="true" @handlerDeleteBill="handlerDeleteBill"></BillItem>
    </view>
    <view class="container-button">
      <button @click="handlerAddBill('expense')">支出</button>
      <button @click="handlerAddBill('income')">收入</button>
      <view>
        <XSDialog ref="dialogRef" :is-show="isShowDialog" @submit="handlerSubmitBill"
                  @cancel="handlerCancelBill"></XSDialog>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import XSDialog from '@/components/common/XSDialog.vue'
import BillItem from '@/components/bill/Item.vue'
import WeekMoney from '@/components/bill/WeekMoney.vue'
import DayMoney from '@/components/bill/DayMoney.vue'
import useBillHook from '@/hooks/useBill'

const {
  sortBillList,
  dialogRef,
  isShowDialog,
  handlerAddBill,
  handlerSubmitBill,
  handlerDeleteBill,
  handlerCancelBill
} = useBillHook()
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
