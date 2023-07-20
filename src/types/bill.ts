export interface IBillFrom {
  id: number,
  money: string,
  purpose: string,
  comment: string,
  time: string,
  date: string,
  created_at: string,
  type: 'income' | 'expense' | ''
}

export type BillType = 'expense' | 'income'
