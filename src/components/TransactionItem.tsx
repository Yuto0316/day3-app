import { Trash2 } from 'lucide-react';
import type { Transaction } from '../types/transaction';

interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${y}/${m}/${d}`;
}

export function TransactionItem({ transaction, onDelete }: TransactionItemProps) {
  const isExpense = transaction.type === 'expense';

  return (
    <li className="flex items-center gap-3 py-3 px-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span
            className={`font-semibold tabular-nums ${
              isExpense ? 'text-expense' : 'text-income'
            }`}
          >
            {isExpense ? '-' : '+'}¥{transaction.amount.toLocaleString()}
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-sm">{transaction.category}</span>
        </div>
        <p className="text-slate-400 dark:text-slate-500 text-sm mt-0.5">
          {formatDate(transaction.date)}
          {transaction.memo ? ` · ${transaction.memo}` : ''}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onDelete(transaction.id)}
        className="p-2 rounded-lg text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors touch-manipulation"
        aria-label="削除"
      >
        <Trash2 className="w-5 h-5" aria-hidden />
      </button>
    </li>
  );
}
