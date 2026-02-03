export interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  memo: string;
  type: 'income' | 'expense';
}

export const EXPENSE_CATEGORIES = [
  '食費',
  '日用品',
  '交際費',
  '交通費',
  'その他',
] as const;

export const INCOME_CATEGORIES = ['給与', '副業', 'その他'] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];
export type IncomeCategory = (typeof INCOME_CATEGORIES)[number];
