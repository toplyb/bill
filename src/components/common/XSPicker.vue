<template>
  <picker :mode='mode' :range="range" :value="value" @change="selectOption" :range-key="rangeKey">
    <view class="uni-input">{{ currentValue }}</view>
  </picker>
</template>

<script setup lang='ts'>
import { defineProps } from 'vue'

defineProps({
  mode: {
    default: 'selector',
    validator(value: string) {
      return ['selector', 'multiSelector', 'time', 'date', 'region'].includes(value)
    }
  },
  range: {
    type: Array,
    default: () => [],
    required: true
  },
  rangeKey: {
    type: String
  },
  value: {
    type: [String, Number],
    required: true
  },
  currentValue: {
    type: String,
    required: true
  }
})

const emits = defineEmits([ 'selectYear' ])
const selectOption = (e: any) => {
  emits('selectYear', e)
}
</script>

<style scoped lang='scss'>

</style>
