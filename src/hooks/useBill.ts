import type { BillType } from '@/types/bill'
import { computed, reactive, ref } from 'vue'
import type { IBillFrom } from '@/types/bill'
import type XSDialog from '@/components/common/XSDialog.vue'
import useBillStore from '@/store/bill'

const useBillHook = () => {
  const store = useBillStore()

  // 账单类型
  const billType = ref<BillType>('expense')

  // 账单列表
  const sortBillList = store.sortBillList

  // 是否显示表单弹框
  const isShowDialog = ref(false)
  const dialogRef = ref<typeof XSDialog | null>(null)

  // 按钮点击事件
  const handlerAddBill = (type: BillType) => {
    billType.value = type
    isShowDialog.value = true
  }

  // 提交账单按钮
  const handlerSubmitBill = (data: IBillFrom) => {
    data['type'] = billType.value
    try {
      store.addBill(data)
      dialogRef.value?.resetFormData()
      isShowDialog.value = false
      uni.showToast({
        title: '提交成功',
        duration: 2000,
        icon: 'success'
      })
    } catch (e) {
      uni.showToast({
        title: '保存失败，请稍后重试',
        duration: 2000,
        icon: 'error'
      })
    }
  }

  // 取消按钮
  const handlerCancelBill = () => {
    dialogRef.value?.resetFormData()
    isShowDialog.value = false
  }

  // 删除账单
  const handlerDeleteBill = (data: IBillFrom) => {
    store.deleteBill(data)
  }

  return {
    sortBillList,
    isShowDialog,
    dialogRef,
    handlerAddBill,
    handlerSubmitBill,
    handlerCancelBill,
    handlerDeleteBill
  }
}

export default useBillHook
