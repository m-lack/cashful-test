import API from "@/api";

export const getAllTransactions = async () => {
  try {
    const response = await API.get("/transaction/all");

    if (!response.data.error) {
      return response.data.transactions;
    }
  } catch (err) {
    return err.response;
  }
};
