function TransactionForm({
  description,
  amount,
  type,
  category,
  categories,
  onDescriptionChange,
  onAmountChange,
  onTypeChange,
  onCategoryChange,
  onSubmit,
}) {
  return (
    <div className="add-transaction">
      <div className="section-heading">
        <p className="eyebrow">Quick entry</p>
        <h2>Add Transaction</h2>
      </div>
      <form onSubmit={onSubmit}>
        <label>
          Description
          <input
            type="text"
            placeholder="e.g. Coffee with client"
            value={description}
            onChange={(event) => onDescriptionChange(event.target.value)}
          />
        </label>
        <label>
          Amount
          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(event) => onAmountChange(event.target.value)}
          />
        </label>
        <label>
          Type
          <select value={type} onChange={(event) => onTypeChange(event.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <label>
          Category
          <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add transaction</button>
      </form>
    </div>
  );
}

export default TransactionForm;
