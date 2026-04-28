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
  "#0f8b8d",
  "#f25f5c",
  "#3b6fd8",
  "#f6ae2d",
  "#7d5fff",
  "#2aa876",
  "#5c677d",
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
        <div className="section-heading chart-heading">
          <p className="eyebrow">Analysis</p>
          <h2>Spending by Category</h2>
          <p>Add an expense to see how your spending is distributed.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="chart-card">
      <div className="section-heading chart-heading">
        <p className="eyebrow">Analysis</p>
        <h2>Spending by Category</h2>
        <p>Expense totals grouped by category.</p>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
          >
            <CartesianGrid stroke="#dfe7e2" strokeDasharray="4 6" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickFormatter={(value) => `$${value}`} tickLine={false} axisLine={false} />
            <Tooltip
              formatter={(value) => [`$${value}`, "Spent"]}
              contentStyle={{
                border: "1px solid #d9e2dc",
                borderRadius: "8px",
                boxShadow: "0 16px 35px rgba(36, 45, 38, 0.14)",
              }}
            />
            <Legend iconType="circle" />
            <Bar dataKey="total" name="Spent" radius={[6, 6, 0, 0]}>
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
