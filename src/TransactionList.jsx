function TransactionList({
  transactions,
  categories,
  filterType,
  filterCategory,
  onFilterTypeChange,
  onFilterCategoryChange,
  onDeleteTransaction,
}) {
  let filteredTransactions = transactions;

  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.type === filterType
    );
  }

  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.category === filterCategory
    );
  }

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <select value={filterType} onChange={(event) => onFilterTypeChange(event.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          value={filterCategory}
          onChange={(event) => onFilterCategoryChange(event.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td
                className={
                  transaction.type === "income" ? "income-amount" : "expense-amount"
                }
              >
                {transaction.type === "income" ? "+" : "-"}${transaction.amount}
              </td>
              <td>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => onDeleteTransaction(transaction.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
