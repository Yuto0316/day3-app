import type { Transaction } from '../types/transaction';
import { EXPENSE_CATEGORIES } from '../types/transaction';

function getThisMonthExpenseByCategory(transactions: Transaction[]): Record<string, number> {
  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth();
  const byCategory: Record<string, number> = {};
  for (const c of EXPENSE_CATEGORIES) {
    byCategory[c] = 0;
  }
  for (const t of transactions) {
    if (t.type !== 'expense') continue;
    const [y, m] = t.date.split('-').map(Number);
    if (y !== thisYear || m !== thisMonth + 1) continue;
    byCategory[t.category] = (byCategory[t.category] ?? 0) + t.amount;
  }
  return byCategory;
}

interface CategoryChartProps {
  transactions: Transaction[];
}

const PIE_COLORS = [
  '#ef4444', // 食費
  '#f59e0b', // 日用品
  '#10b981', // 交際費
  '#3b82f6', // 交通費
  '#64748b', // その他
];

export function CategoryChart({ transactions }: CategoryChartProps) {
  const byCategory = getThisMonthExpenseByCategory(transactions);
  const total = Object.values(byCategory).reduce((a, b) => a + b, 0);

  if (total === 0) {
    return (
      <div className="rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 p-5 transition-colors">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">カテゴリ別支出</h3>
        <p className="text-slate-400 dark:text-slate-500 text-sm">今月の支出がまだありません</p>
      </div>
    );
  }

  const entries = EXPENSE_CATEGORIES.map((cat, i) => ({
    category: cat,
    amount: byCategory[cat] ?? 0,
    ratio: total > 0 ? ((byCategory[cat] ?? 0) / total) * 100 : 0,
    color: PIE_COLORS[i],
  })).filter((e) => e.amount > 0);

  // conic-gradient: 12時方向から時計回り（0deg = 上）
  let currentDeg = 0;
  const gradientStops = entries
    .map((e) => {
      const start = currentDeg;
      const end = currentDeg + (e.ratio / 100) * 360;
      currentDeg = end;
      return `${e.color} ${start}deg ${end}deg`;
    })
    .join(', ');

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 p-5 shadow-sm dark:shadow-none transition-colors">
      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">カテゴリ別支出</h3>

      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        {/* 円グラフ（ドーナツ） */}
        <div className="flex justify-center shrink-0">
          <div
            className="w-40 h-40 sm:w-44 sm:h-44 rounded-full"
            style={{
              background: `conic-gradient(${gradientStops})`,
              mask: 'radial-gradient(farthest-side, transparent 58%, black 58%)',
              WebkitMask: 'radial-gradient(farthest-side, transparent 58%, black 58%)',
            }}
            role="img"
            aria-label={`カテゴリ別支出の円グラフ。合計${total.toLocaleString()}円`}
          />
        </div>

        {/* 凡例 */}
        <ul className="flex-1 min-w-0 space-y-2">
          {entries.map(({ category, amount, ratio, color }) => (
            <li key={category} className="flex items-center gap-3 text-sm">
              <span
                className="shrink-0 w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
                aria-hidden
              />
              <span className="text-slate-700 dark:text-slate-300 truncate">{category}</span>
              <span className="shrink-0 text-slate-500 dark:text-slate-400 tabular-nums ml-auto">
                ¥{amount.toLocaleString()}
                <span className="text-slate-400 dark:text-slate-500 font-medium"> ({ratio.toFixed(0)}%)</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
