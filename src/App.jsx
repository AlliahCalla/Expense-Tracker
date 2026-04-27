import { useState } from 'react'
import './App.css'
import Summary from './Summary'
import SpendingChart from './SpendingChart'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: "5000", type: "income", category: "salary", date: "2025-01-01" },
    { id: 2, description: "Rent", amount: "1200", type: "expense", category: "housing", date: "2025-01-02" },
    { id: 3, description: "Groceries", amount: "150", type: "expense", category: "food", date: "2025-01-03" },
    { id: 4, description: "Freelance Work", amount: "800", type: "expense", category: "salary", date: "2025-01-05" },
    { id: 5, description: "Electric Bill", amount: "95", type: "expense", category: "utilities", date: "2025-01-06" },
    { id: 6, description: "Dinner Out", amount: "65", type: "expense", category: "food", date: "2025-01-07" },
    { id: 7, description: "Gas", amount: "45", type: "expense", category: "transport", date: "2025-01-08" },
    { id: 8, description: "Netflix", amount: "15", type: "expense", category: "entertainment", date: "2025-01-10" },
  ]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];
  const parseAmount = (value) => Number(value) || 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newTransaction = {
      id: Date.now(),
      description,
      amount: parseAmount(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    };

    setTransactions([...transactions, newTransaction]);
    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  const handleDeleteTransaction = (id) => {
    const transactionToDelete = transactions.find((transaction) => transaction.id === id);

    if (!transactionToDelete) {
      return;
    }

    const confirmationMessage = `Delete transaction "${transactionToDelete.description}"?`;

    if (!window.confirm(confirmationMessage)) {
      return;
    }

    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };


  return (
    <div className="app">
      <h1>Finance Tracker</h1>
      <p className="subtitle">Track your income and expenses</p>

      <Summary transactions={transactions} />
      <SpendingChart transactions={transactions} />

      <TransactionForm
        description={description}
        amount={amount}
        type={type}
        category={category}
        categories={categories}
        onDescriptionChange={setDescription}
        onAmountChange={setAmount}
        onTypeChange={setType}
        onCategoryChange={setCategory}
        onSubmit={handleSubmit}
      />

      <TransactionList
        transactions={transactions}
        categories={categories}
        filterType={filterType}
        filterCategory={filterCategory}
        onFilterTypeChange={setFilterType}
        onFilterCategoryChange={setFilterCategory}
        onDeleteTransaction={handleDeleteTransaction}
      />
    </div>
  );
}

export default App
