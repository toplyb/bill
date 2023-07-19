import type { IBillFrom } from '@/types/bill'

const allMoneyByType = function (type: 'expense' | 'income', billList: IBillFrom[]) {
  let total = 0
  const billListByType = billList.filter(item => item.type === type)
  billListByType.forEach(item => {
    total += Number(item.money) * 100
  })
  return handleMoney(total)
}

const handleMoney = (money: number | string) => {
  return (Math.round(Number(money)) / 100).toFixed(2)
}

export {
  allMoneyByType,
  handleMoney
}
