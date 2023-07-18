import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { IBillFrom } from '@/types/bill'

const useBillStore = defineStore('bill', {
  state: () => {
    return {
      billList: reactive(uni.getStorageSync('bill_list') as IBillFrom[] || [] as IBillFrom[])
    }
  },

  getters: {
    // 按照时间排序
    sortBillList: (state): IBillFrom[] => {
      return state.billList.sort((a, b) => {
        return Date.parse(b.date + ' ' + b.time) - Date.parse(a.date + ' ' + a.time)
      })
    }
  },

  actions: {
    addBill(data: IBillFrom) {
      this.billList.unshift(data)
      uni.setStorageSync('bill_list', this.billList)
    },

    deleteBill(data: IBillFrom) {
      const index = this.billList.findIndex(bill => {
        return bill === data
      })
      this.billList.splice(index, 1)
      uni.setStorageSync('bill_list', this.billList)
    }
  }
})

export default useBillStore
