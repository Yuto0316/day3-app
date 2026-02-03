import { Wallet } from 'lucide-react';
import type { Transaction } from '../types/transaction';

function getThisMonthExpenseTotal(transactions: Transaction[]): number {
  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth();
  return transactions
    .filter((t) => {
      if (t.type !== 'expense') return false;
      const [y, m] = t.date.split('-').map(Number);
      return y === thisYear && m === thisMonth + 1;
    })
    .reduce((sum, t) => sum + t.amount, 0);
}

interface ExpenseSummaryCardProps {
  transactions: Transaction[];
}

export function ExpenseSummaryCard({ transactions }: ExpenseSummaryCardProps) {
  const total = getThisMonthExpenseTotal(transactions);

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800/80 shadow-xl border border-slate-200 dark:border-slate-700/50 p-5 sm:p-6 transition-colors">
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-medium mb-2">
        <Wallet className="w-4 h-4" aria-hidden />
        <span>今月の支出合計</span>
      </div>
      <p className="text-3xl sm:text-4xl font-bold text-expense tabular-nums">
        ¥{total.toLocaleString()}
      </p>
    </div>
  );
}
