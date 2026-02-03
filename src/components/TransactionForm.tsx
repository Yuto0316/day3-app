import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Transaction } from '../types/transaction';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../types/transaction';

interface TransactionFormProps {
  onSubmit: (t: Omit<Transaction, 'id'>) => void;
}

const today = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const inputBase =
  'w-full rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-600/50 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 transition-colors';
const selectOption = 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white';

export function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<string>(EXPENSE_CATEGORIES[0]);
  const [date, setDate] = useState(today());
  const [memo, setMemo] = useState('');

  const categories = type === 'expense' ? [...EXPENSE_CATEGORIES] : [...INCOME_CATEGORIES];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(amount.replace(/,/g, ''), 10);
    if (Number.isNaN(num) || num <= 0) return;
    onSubmit({
      type,
      amount: num,
      category,
      date,
      memo: memo.trim(),
    });
    setAmount('');
    setMemo('');
    setDate(today());
    setCategory(categories[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2 p-1 rounded-xl bg-slate-200 dark:bg-slate-800/60 transition-colors">
        <button
          type="button"
          onClick={() => {
            setType('expense');
            setCategory(EXPENSE_CATEGORIES[0]);
          }}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            type === 'expense'
              ? 'bg-expense text-white'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          支出
        </button>
        <button
          type="button"
          onClick={() => {
            setType('income');
            setCategory(INCOME_CATEGORIES[0]);
          }}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            type === 'income'
              ? 'bg-income text-white'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          収入
        </button>
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm text-slate-500 dark:text-slate-400 mb-1">
          金額
        </label>
        <input
          id="amount"
          type="text"
          inputMode="numeric"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
          className={`${inputBase} text-lg`}
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm text-slate-500 dark:text-slate-400 mb-1">
          カテゴリ
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as string)}
          className={inputBase}
        >
          {categories.map((c) => (
            <option key={c} value={c} className={selectOption}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="date" className="block text-sm text-slate-500 dark:text-slate-400 mb-1">
          日付
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={inputBase}
          required
        />
      </div>

      <div>
        <label htmlFor="memo" className="block text-sm text-slate-500 dark:text-slate-400 mb-1">
          メモ（任意）
        </label>
        <input
          id="memo"
          type="text"
          placeholder="メモ"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className={inputBase}
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-600 hover:bg-slate-500 dark:bg-slate-500 dark:hover:bg-slate-400 text-white font-medium py-3.5 transition-colors"
      >
        <Plus className="w-5 h-5" aria-hidden />
        追加する
      </button>
    </form>
  );
}
