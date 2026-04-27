import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = [
  "#0f766e",
  "#dc2626",
  "#2563eb",
  "#d97706",
  "#7c3aed",
  "#059669",
  "#4b5563",
];

function SpendingChart({ transactions }) {
  const spendingByCategory = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((totals, transaction) => {
      const amount = Number(transaction.amount) || 0;
      const existingCategory = totals.get(transaction.category) || 0;

      totals.set(transaction.category, existingCategory + amount);
      return totals;
    }, new Map());

  const chartData = Array.from(spendingByCategory.entries())
    .map(([name, total]) => ({
      name,
      total,
    }))
    .sort((left, right) => right.total - left.total);

  if (chartData.length === 0) {
    return (
      <section className="chart-card">
        <div className="chart-heading">
          <h2>Spending by Category</h2>
          <p>Add an expense to see how your spending is distributed.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="chart-card">
      <div className="chart-heading">
        <h2>Spending by Category</h2>
        <p>Expense totals grouped by category.</p>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `$${value}`} />
            <Tooltip formatter={(value) => [`$${value}`, "Spent"]} />
            <Legend />
            <Bar dataKey="total" name="Spent">
              {chartData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default SpendingChart;
