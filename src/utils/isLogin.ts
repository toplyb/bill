// 判断是否登录
const isLogin = () => {
  const token = uni.getStorageSync('token')
  return Boolean(token)
}

const wxLogin = () => {
  uni.login({
    provider: 'weixin',
    success: (res) => {
      uni.request({
        method: 'POST',
        url: 'http://127.0.0.1:3333/bill/wxlogin',
        data: {
          code: res.code
        }
      }).then(res => {
        console.log(res, 'res')
      })
    }
  })
}

export {
  isLogin,
  wxLogin
}
