import { getUserAccounts } from "@/actions/dashboard";
import CreateAccountDrawer from "@/components/create-account-drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";
import AccountCard from "./_components/account-card";
import { getCurrentBudget } from "@/actions/budget";
import BudgetProgress from "./_components/BudgetProgress";

const DashboardPage = async () => {
  const accounts = await getUserAccounts();
  // console.log("Accounts: ", accounts);
  const defaultAccount = accounts?.find((account) => account.isDefault);
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }
  // console.log("budgetData: ", budgetData);
  return (
    <div className=" space-y-8">
      {/* budget progress */}
      {defaultAccount && (
        <BudgetProgress
          initailBudget={budgetData.budget}
          currentExpenses={budgetData.currentExpenses || 0}
        />
      )}

      {/* account grid  */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
            <CardContent className="flex flex-col justify-center items-center text-muted-foreground h-full pt-5 mb-5">
              <Plus className="h-10 w-10 mb-2" />
              <p>Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
        {accounts.length > 0 &&
          accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
      </div>
    </div>
  );
};

export default DashboardPage;
// 2:20
