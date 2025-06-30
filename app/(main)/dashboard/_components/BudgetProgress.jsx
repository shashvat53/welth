"use client";

import { updateBudget } from "@/actions/budget";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import useFetch from "@/hooks/use-fetch";
import { Check, Pencil, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const BudgetProgress = ({ initailBudget, currentExpenses }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initailBudget?.amount.toString() || ""
  );
  const percentUsed = initailBudget
    ? (currentExpenses / initailBudget?.amount) * 100
    : 0;

  const {
    fn: updateBudgetFn,
    loading: updteBudgetLoading,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    await updateBudgetFn(amount);
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update budget");
    }
  }, [error]);

  const handleCancel = () => {
    setNewBudget(initailBudget?.amount.toString());
    setIsEditing(false);
  };

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex-1">
            <CardTitle>Monthly Budget (Default Account)</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    placeholder="Enter amount"
                    className="w-32"
                    autoFocus
                    disabled={updteBudgetLoading}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleUpdateBudget}
                    disabled={updteBudgetLoading}
                  >
                    <Check className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCancel}
                    disabled={updteBudgetLoading}
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ) : (
                <>
                  <CardDescription>
                    {currentExpenses
                      ? `$${currentExpenses.toFixed(
                          2
                        )} of $${initailBudget?.amount.toFixed(2)} spent`
                      : "No budget set"}
                  </CardDescription>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="w-6 h-6"
                    onClick={() => setIsEditing(true)}
                  >
                    <Pencil className="w-3 h-3" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {initailBudget && (
            <div className="">
              <Progress
                value={percentUsed}
                extraStyles={`${
                  percentUsed >= 90
                    ? "bg-red-500"
                    : percentUsed >= 75
                      ? "bg-yellow-500"
                      : "bg-green-500"
                }`}
              />
              <p className="text-xs text-muted-foreground text-right mt-2">
                {percentUsed.toFixed(1)}% used
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetProgress;
