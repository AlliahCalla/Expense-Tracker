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
      <h2>Add Transaction</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(event) => onAmountChange(event.target.value)}
        />
        <select value={type} onChange={(event) => onTypeChange(event.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TransactionForm;
