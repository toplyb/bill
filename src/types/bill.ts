export interface IBillFrom {
  money: string,
  purpose: string,
  comment: string,
  time: string,
  date: string,
  created_at: string,
  type: 'income' | 'expense' | ''
}
