import { getUserAccounts } from "@/actions/dashboard";
import React from "react";
import AccountTransactionForm from "../_components/transaction-form";
import { defaultCategories } from "@/data/categories";

const AddtransactionPage = () => {
  const accounts = getUserAccounts();
  return (
    <div className="max-w-3xl mx-auto px-5 ">
      <h1 className="text-5xl gradient-title mb-8">Add Transaction</h1>
      <AccountTransactionForm
        accounts={accounts}
        defaultCategories={defaultCategories}
      />
    </div>
  );
};

export default AddtransactionPage;
