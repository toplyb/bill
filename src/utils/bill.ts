import type { IBillFrom } from '@/types/bill'

const getAllBills = () => {
  return uni.getStorageSync('bill_list') as IBillFrom[] || [] as IBillFrom[]
}

export {
  getAllBills
}
