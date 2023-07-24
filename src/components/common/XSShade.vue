<template>
  <view class="dialog-container" v-if="props.isShow">
    <slot></slot>
  </view>
</template>

<script setup lang='ts'>
import { defineProps, PropType } from 'vue'

const props = defineProps({
  isShow: {
    type: Boolean as PropType<boolean>,
    require: true
  },
  type: {
    type: String as PropType<string>,
    require: true
  }
})
</script>

<style scoped lang='scss'>
.dialog-container {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 50rpx;
  box-sizing: border-box;
}
</style>
