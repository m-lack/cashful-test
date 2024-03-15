"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/authContext";
import { getAllTransactions } from "@/services/transactions";
import { Flex, Title } from "@mantine/core";
import Stats from "./stats";
import Filters from "./filters";
import TransactionTable from "./table";
import { redirect } from "next/navigation";
import Loader from "../Loader";

export default function DashboardSection() {
  const { user, status } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTransactions();
      setTransactions(data);
      calculateBalance(data);
    };

    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  const calculateBalance = (data) => {
    let totalBalance = 0;
    data.forEach((transaction) => {
      totalBalance += transaction.amount;
    });
    setBalance(totalBalance);
  };

  const [filters, setFilters] = useState({
    status: "all",
    minAmount: "0",
    maxAmount: "1000",
    dateRange: "all",
  });

  const handleStatusChange = (value) => {
    setFilters({ ...filters, status: value });
  };

  const handleDateRangeChange = (value) => {
    setFilters({ ...filters, dateRange: value });
  };

  const handleMinAmountChange = (value) => {
    setFilters({
      ...filters,
      minAmount: value,
    });
  };

  const handleMaxAmountChange = (value) => {
    setFilters({
      ...filters,
      maxAmount: value,
    });
  };

  if (status === "unauthenticated") return redirect("/signin");
  else if (status === "loading") return <Loader />;

  return (
    <Flex direction="column" mt="5vh" px="10vh" gap="5vh">
      <Flex justify="space-between" align="center">
        <Title order={1}>Dashboard</Title>
      </Flex>
      <Stats
        total={transactions.length}
        balance={balance}
        name={user?.display_name}
      />
      <Filters
        filters={filters}
        onStatusChange={handleStatusChange}
        onDateRangeChange={handleDateRangeChange}
        onMinAmountChange={handleMinAmountChange}
        onMaxAmountChange={handleMaxAmountChange}
      />
      <TransactionTable transactions={transactions} filters={filters} />
    </Flex>
  );
}
