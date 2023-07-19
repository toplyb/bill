<template>
  <view class="select-container">
    <view class="select-container-top">
      <view class="money-detail">
        <view class="income">
          <view class="money-title">收入</view>
          <view class="money">{{ allIncome }}</view>
        </view>
        <view class="expense">
          <view class="money-title">支出</view>
          <view class="money">{{ allExpense }}</view>
        </view>
        <view class="expense">
          <view class="money-title">净收入</view>
          <view class="money">{{ (allIncome - allExpense).toFixed(2) }}</view>
        </view>
      </view>
      <view class="select-type">
        <XSPicker class="xs-picker" mode="selector" :range="selectOptions" range-key="label" :value="currentIndex"
                  :current-value="selectOptions[currentIndex].label"
                  @selectYear="selectOption"
        ></XSPicker>
      </view>
      <view v-if="isShowTimeSelect" class="select-type">

        <XSPicker class="xs-picker" mode="selector" :range="getAllYearInBill" :value="getAllYearInBill[0]"
                  :current-value="currentYear"
                  @selectYear="selectYear"
        ></XSPicker>

        <XSPicker class="xs-picker" mode="selector" :range="getAllMonthByYear" :value="getAllMonthByYear[0]"
                  :current-value="currentMonth"
                  @selectYear="selectMonth"
        ></XSPicker>
      </view>
    </view>

    <view class="bill-list">
      <BillItem v-for="(bill, index) in billListInPage" :key="bill.created_at + index + Math.random()"
                :bill="bill"></BillItem>
    </view>
  </view>
</template>

<script setup lang='ts'>
import BillItem from '@/components/bill/Item.vue'
import XSPicker from '@/components/common/XSPicker.vue'
import useBillSelectHook from '@/hooks/useBillSelect'

const {
  selectOptions,
  selectOption,
  currentIndex,
  isShowTimeSelect,
  getAllYearInBill,
  currentYear,
  selectYear,
  getAllMonthByYear,
  currentMonth,
  selectMonth,
  allIncome,
  allExpense,
  billListInPage
} = useBillSelectHook()
</script>

<style scoped lang='scss'>
.select-container {
  width: 100%;
  height: 100%;
  padding: 50rpx;
  margin-bottom: 50rpx;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  &-top {
    width: 100%;
    background-color: #CBDBCC;
    box-shadow: 0 7px 5px -5px #D7FFF1;
    box-sizing: border-box;
    margin-bottom: 50rpx;

    .money-detail {
      display: flex;
      justify-content: center;

      & > view {
        padding: 20rpx 10rpx;
        text-align: center;
        background-color: #c8c8a9;
        border-radius: 10rpx;
        box-shadow: 0 0 3px 3px #dedcee;
        flex: 1;

        .money-title {
          margin-bottom: 10rpx;
        }

        .money {
          font-size: 20px;
        }

        &:not(:last-child) {
          margin-right: 30rpx;
        }
      }

      .income {
        .money {
          color: #3ac569;
        }
      }

      .expense {
        .money {
          color: #E71D36;
        }
      }
    }

    .select-type {
      margin-top: 30rpx;
      display: flex;

      .xs-picker {
        padding: 20rpx;
        flex: 1;
        border: 1px solid #ffffff;
        text-align: center;

        &:not(:last-child) {
          margin-right: 20rpx;
        }
      }
    }
  }

  .bill-list {
    border: 1px solid #FFFFF2;
    border-radius: 10rpx;
    padding: 20rpx;
    box-sizing: border-box;
    overflow: hidden;
    flex: 1;
    overflow-y: scroll;
    width: 100%;
  }
}
</style>
