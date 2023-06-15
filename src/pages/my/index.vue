<template>
  <view class="select-container">
    <view class="select-container-top">
      <view class="money-detail">
        <view class="income">
          <view class="money-title">收入</view>
          <view class="money">1000000000</view>
        </view>
        <view class="expense">
          <view class="money-title">支出</view>
          <view class="money">100</view>
        </view>
        <view class="expense">
          <view class="money-title">净收入</view>
          <view class="money">100</view>
        </view>
      </view>
      <view class="select-type">
        <picker mode='selector' :range="timeOptions" :value="currentIndex" @change="selectTimeType">
          <view class="uni-input">{{timeOptions[currentIndex]}}</view>
        </picker>
      </view>
    </view>

      <view class="bill-list">
        <BillItem v-for="(bill, index) in billList" :key="bill.created_at + index" :bill="bill"></BillItem>
      </view>
  </view>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { IBillFrom } from '@/types/bill'
import BillItem from '@/components/bill/Item.vue'

const timeOptions = ['全部','按年筛选','按月筛选','按周筛选']
const currentIndex = ref(0)
const selectTimeType = (e: any) => {
  currentIndex.value = e.detail.value
}

// 获取所有的账单
const billList = uni.getStorageSync('bill_list') as IBillFrom[] || [] as IBillFrom[]
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
    position: fixed;
    padding: 50rpx;
    box-sizing: border-box;
    top: 0;
    left: 0;

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

      picker {
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
    margin-top: 180px;
    overflow: hidden;
    flex: 1;
    overflow-y: scroll;
    width: 100%;
  }
}
</style>
