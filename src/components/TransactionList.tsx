import { History } from 'lucide-react';
import type { Transaction } from '../types/transaction';
import { TransactionItem } from './TransactionItem';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export function TransactionList({ transactions, onDelete }: TransactionListProps) {
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-400 dark:text-slate-500">
        <History className="w-12 h-12 mb-3 opacity-50" aria-hidden />
        <p className="text-sm">まだ履歴がありません</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {sorted.map((t) => (
        <TransactionItem key={t.id} transaction={t} onDelete={onDelete} />
      ))}
    </ul>
  );
}
