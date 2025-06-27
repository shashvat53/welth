import { getAccountWithTransaction } from "@/actions/account";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import TransactionTable from "../_components/transaction-table";
import { BarLoader } from "react-spinners";
// import AccountChart from "../_components/AccountChart";
import { AccountChart } from "../_components/AccountChart";

const AccountPage = async ({ params }) => {
  const accountData = await getAccountWithTransaction(params?.id);
  // console.log("getAccountWithTransaction: ", accountData);
  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;
  // console.log("transactions: ", transactions);

  const dummyData = [
    { id: 1, date: "2025-06-01", type: "INCOME", amount: 500 },
    { id: 2, date: "2025-06-02", type: "EXPENSE", amount: 200 },
    { id: 3, date: "2025-06-03", type: "INCOME", amount: 300 },
    { id: 4, date: "2025-06-04", type: "EXPENSE", amount: 100 },
    { id: 5, date: "2025-06-05", type: "INCOME", amount: 800 },
    { id: 6, date: "2025-06-06", type: "EXPENSE", amount: 400 },
    { id: 7, date: "2025-06-07", type: "INCOME", amount: 600 },
    { id: 8, date: "2025-06-08", type: "EXPENSE", amount: 300 },
    { id: 9, date: "2025-06-09", type: "INCOME", amount: 700 },
    { id: 10, date: "2025-06-10", type: "EXPENSE", amount: 250 },
  ];
  return (
    <div className="space-y-8 px-5">
      <div className="flex gap-4 items-end justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-title capitalize">
            {account?.name}
          </h1>
          <p className="text-muted-foreground">
            {account?.type.charAt(0) + account?.type.slice(1).toLowerCase()}{" "}
            Account
          </p>
        </div>

        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold">
            ${parseFloat(account?.balance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account?._count?.transactions} Transactions
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <Suspense
        fallback={<BarLoader className="mt-4" width="100%" color="#9333ea" />}
      >
        <AccountChart transactions={transactions} />
        {/* <SimpleBarChart /> */}
      </Suspense>

      {/* transaction Table */}
      <Suspense
        fallback={<BarLoader className="mt-4" width="100%" color="#9333ea" />}
      >
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
};

export default AccountPage;
