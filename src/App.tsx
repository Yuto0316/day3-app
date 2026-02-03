import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { ExpenseSummaryCard } from './components/ExpenseSummaryCard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { CategoryChart } from './components/CategoryChart';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const { transactions, addTransaction, deleteTransaction, hydrated } = useLocalStorage();
  const { theme, toggleTheme } = useTheme();

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white pb-safe transition-colors">
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">シンプル家計簿</h1>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <ExpenseSummaryCard transactions={transactions} />

        <section>
          <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">カテゴリ別支出</h2>
          <CategoryChart transactions={transactions} />
        </section>

        <section>
          <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">記録を追加</h2>
          <div className="rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 p-4 shadow-sm dark:shadow-none transition-colors">
            <TransactionForm onSubmit={addTransaction} />
          </div>
        </section>

        <section>
          <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">履歴</h2>
          <TransactionList transactions={transactions} onDelete={deleteTransaction} />
        </section>
      </main>
    </div>
  );
}

export default App;
