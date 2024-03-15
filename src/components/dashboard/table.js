"use client";

export default function TransactionTable({ transactions, filters }) {
  const filterTransactionsByDateRange = (transactions, dateRange) => {
    const currentDate = new Date();
    const lastWeek = new Date(currentDate);
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastMonth = new Date(currentDate);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastThreeMonths = new Date(currentDate);
    lastThreeMonths.setMonth(lastThreeMonths.getMonth() - 3);

    switch (dateRange) {
      case "last7days":
        return transactions.filter(
          (transaction) => new Date(transaction.date) >= lastWeek
        );
      case "lastMonth":
        return transactions.filter(
          (transaction) => new Date(transaction.date) >= lastMonth
        );
      case "last3months":
        return transactions.filter(
          (transaction) => new Date(transaction.date) >= lastThreeMonths
        );
      default:
        return transactions;
    }
  };

  const filteredTransactions = filterTransactionsByDateRange(
    transactions,
    filters.dateRange
  ).filter((item) => {
    const withinMinAmount =
      filters.minAmount === "" || item.amount >= parseFloat(filters.minAmount);
    const withinMaxAmount =
      filters.maxAmount === "" || item.amount <= parseFloat(filters.maxAmount);

    return (
      (filters.status === "all" || item.status === filters.status) &&
      withinMinAmount &&
      withinMaxAmount
    );
  });

  return (
    <div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Amount
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Status
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Description
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((item) => (
            <tr key={item.id}>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {item.id}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {item.amount} {item.currency}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {item.status}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {item.description}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {item.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
