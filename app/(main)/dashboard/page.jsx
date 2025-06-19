import { getUserAccounts } from "@/actions/dashboard";
import CreateAccountDrawer from "@/components/create-account-drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";

const DashboardPage = async () => {
  const accounts = await getUserAccounts();
  return (
    <div className="px-5">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
            <CardContent className="flex flex-col justify-center items-center text-muted-foreground h-full pt-5">
              <Plus className="h-10 w-10 mb-2" />
              <p>Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
        {accounts.length > 0 &&
          accounts.map((account) => <p key={account.id}>{account.name}</p>)}
      </div>
    </div>
  );
};

export default DashboardPage;
