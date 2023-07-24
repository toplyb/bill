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
                :is-show-delete="true" @handlerDeleteBill="handlerDeleteBill"
                @handlerEditBill="handlerEditBill"></BillItem>
    </view>

    <view class="container-button">
      <button @click="handlerAddBill('expense')">支出</button>
      <button @click="handlerAddBill('income')">收入</button>
      <view>
        <XSShade :is-show="isShowDialog">
          <BillForm ref="dialogRef" @submit="handlerSubmitBill"
                    @cancel="handlerCancelBill"></BillForm>
        </XSShade>
      </view>
    </view>

    <view>
      <XSDialog :is-show="isShowLoginDialog" @handler-cancel-login="handlerCancelLogin" @handler-login="handlerLogin">
        <view>
          是否要登录该小程序？不登录也可以提交账单，但是如果更换手机或删除小程序等操作后数据会丢失，不过也可以选择在这些操作之前登录小程序即可同步数据到远程！
        </view>
      </XSDialog>
    </view>
  </view>
</template>

<script setup lang="ts">
import XSShade from '@/components/common/XSShade.vue'
import XSDialog from '@/components/common/XSDialog.vue'
import BillForm from '@/components/bill/BillForm.vue'
import BillItem from '@/components/bill/Item.vue'
import WeekMoney from '@/components/bill/WeekMoney.vue'
import DayMoney from '@/components/bill/DayMoney.vue'
import useBillHook from '@/hooks/useBill'
import useLoginHook from '@/hooks/useLogin'
import { onMounted } from 'vue'
import useBillStore from '@/store/bill'

const {
  sortBillList,
  dialogRef,
  isShowDialog,
  handlerAddBill,
  handlerSubmitBill,
  handlerDeleteBill,
  handlerCancelBill,
  handlerEditBill,
} = useBillHook()

const {
  isShowLoginDialog,
  handlerLogin,
  handlerCancelLogin
} = useLoginHook()

const store = useBillStore()

onMounted(() => {
  store.billList.map((item, index) => {
    if (!Object.keys(item).includes('id')) {
      item['id'] = index + 1
    }

    return item
  })
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
