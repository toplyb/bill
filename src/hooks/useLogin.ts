import { ref } from 'vue'
import { wxLogin } from '@/utils/isLogin'

const useLoginHook = () => {
  // 是否显示提示登录弹框
  const isShowLoginDialog = ref(true)

  const handlerLogin = () => {
    wxLogin()
  }
  const handlerCancelLogin = () => {
    isShowLoginDialog.value = false
  }

  return {
    isShowLoginDialog,
    handlerLogin,
    handlerCancelLogin
  }
}

export default useLoginHook
