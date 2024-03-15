"use client";
import { Flex, Select, TextInput } from "@mantine/core";

export default function Filters({
  filters,
  onStatusChange,
  onDateRangeChange,
  onMinAmountChange,
  onMaxAmountChange,
}) {
  return (
    <Flex gap="lg">
      <Select
        label="Status"
        placeholder="Pick value"
        data={[
          {
            value: "all",
            label: "All",
          },
          {
            value: "succeded",
            label: "Succeded",
          },
          {
            value: "processing",
            label: "Processing",
          },
          {
            value: "failed",
            label: "Failed",
          },
        ]}
        value={filters.status}
        onChange={onStatusChange}
      />
      <Select
        label="Date"
        placeholder="Pick value"
        data={[
          { value: "all", label: "All" },
          { value: "last7days", label: "Last 7 Days" },
          { value: "lastMonth", label: "Last Month" },
          { value: "last3months", label: "Last 3 Months" },
        ]}
        value={filters.dateRange}
        onChange={onDateRangeChange}
      />
      <TextInput
        label="Min Amount"
        placeholder="Min Amount"
        type="number"
        value={filters.minAmount}
        onChange={(event) => onMinAmountChange(event.target.value)}
      />
      <TextInput
        label="Max Amount"
        placeholder="Max Amount"
        type="number"
        value={filters.maxAmount}
        onChange={(event) => onMaxAmountChange(event.target.value)}
      />
    </Flex>
  );
}
