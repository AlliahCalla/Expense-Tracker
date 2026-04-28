function Summary({ transactions }) {
  const parseAmount = (value) => Number(value) || 0;
  const formatMoney = (value) => `$${value.toLocaleString()}`;

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + parseAmount(transaction.amount), 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + parseAmount(transaction.amount), 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary">
      <div className="summary-card summary-card-income">
        <span className="summary-icon">In</span>
        <div>
          <h3>Income</h3>
          <p className="income-amount">{formatMoney(totalIncome)}</p>
        </div>
      </div>
      <div className="summary-card summary-card-expense">
        <span className="summary-icon">Out</span>
        <div>
          <h3>Expenses</h3>
          <p className="expense-amount">{formatMoney(totalExpenses)}</p>
        </div>
      </div>
      <div className="summary-card summary-card-balance">
        <span className="summary-icon">Net</span>
        <div>
          <h3>Balance</h3>
          <p className="balance-amount">{formatMoney(balance)}</p>
        </div>
      </div>
    </div>
  );
}

export default Summary;
