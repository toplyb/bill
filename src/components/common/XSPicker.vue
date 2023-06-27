<template>
  <picker :mode='mode' :range="range" :value="value" @change="selectOption" :range-key="rangeKey">
    <view class="uni-input">{{ currentValue }}</view>
  </picker>
</template>

<script setup lang='ts'>
import { defineProps, PropType } from 'vue'

defineProps({
  mode: {
    type: String as PropType<'selector' | 'multiSelector' | 'time' | 'date' | 'region'>,
    default: 'selector',
    validator(value: string) {
      return [ 'selector', 'multiSelector', 'time', 'date', 'region' ].includes(value)
    }
  },
  range: {
    type: Array as PropType<any[]>,
    default: () => [],
    required: true
  },
  rangeKey: {
    type: String as PropType<string | undefined>
  },
  value: {
    type: [ String, Number ] as PropType<string | number>,
    required: true
  },
  currentValue: {
    type: String as PropType<string>,
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
