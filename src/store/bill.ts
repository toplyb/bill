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
    addOrEditBill(data: IBillFrom) {
      if (data['id'] === 0) {
        data['id'] = this.billList[this.billList.length - 1]['id'] + 1
        this.billList.unshift(data)
      } else {
        const index = this.billList.findIndex(item => {
          return item.id === data.id
        })
        this.billList[index] = data
      }

      uni.setStorageSync('bill_list', this.billList)
    },

    deleteBill(id: number) {
      const index = this.billList.findIndex(bill => {
        return bill.id === id
      })
      this.billList.splice(index, 1)
      uni.setStorageSync('bill_list', this.billList)
    }
  }
})

export default useBillStore
