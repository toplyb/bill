<template>
  <XSShade :is-show="isShow">
    <view class="dialog">
      <view class="title">温馨提示</view>
      <view class="content">
        <slot></slot>
      </view>
      <view class="footer">
        <button @click="handlerLogin">登录</button>
        <button @click="handlerCancelLogin">取消</button>
      </view>
    </view>
  </XSShade>
</template>

<script setup lang='ts'>
import XSShade from '@/components/common/XSShade.vue'
import { PropType } from 'vue'

defineProps({
  isShow: {
    type: Boolean as PropType<boolean>,
    require: true
  },
})

const emits = defineEmits(['handlerLogin', 'handlerCancelLogin'])

const handlerLogin = () => {
  emits('handlerLogin')
}

const handlerCancelLogin = () => {
  emits('handlerCancelLogin')
}
</script>

<style scoped lang='scss'>
.dialog {
  background-color: #fff;
  margin: 0 20rpx;
  border-radius: 10rpx;
  padding: 40rpx 30rpx;

  .title {
    text-align: center;
    font-weight: bold;
    font-size: 40rpx;
    border-bottom: 1px solid #CCCCCC;
    padding-bottom: 40rpx;
  }

  .content {
    margin: 40rpx 0;
  }

  .footer {
    display: flex;
  }
}
</style>
