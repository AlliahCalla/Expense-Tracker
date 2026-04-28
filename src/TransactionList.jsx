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
  const formatMoney = (value) => `$${Number(value).toLocaleString()}`;

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
      <div className="transactions-header">
        <div className="section-heading">
          <p className="eyebrow">Ledger</p>
          <h2>Transactions</h2>
        </div>
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
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="empty-state">No transactions match these filters.</div>
      ) : (
        <div className="table-shell">
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
                  <td className="date-cell">{transaction.date}</td>
                  <td className="description-cell">{transaction.description}</td>
                  <td>
                    <span className="category-pill">{transaction.category}</span>
                  </td>
                  <td
                    className={
                      transaction.type === "income" ? "income-amount" : "expense-amount"
                    }
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {formatMoney(transaction.amount)}
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
      )}
    </div>
  );
}

export default TransactionList;
