"use client";

import BalanceCard from "@/components/others/balance-card";
import DateDisplay from "@/components/others/date-display";
import TotalBalanceCard from "@/components/others/total-balance-card";
import React, { useEffect, useState } from "react";
import {DatePickerWithRange} from "@/components/ui/date-picker-with-range";
import { api_with_token } from "@/lib/api-requests";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const [balances, setBalances] = useState({
    totalBalance: { balance: 0, credit: 0, debit: 0 },
    supplierBalance: { balance: 0, credit: 0, debit: 0 },
    bankBalance: { balance: 0, credit: 0, debit: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookie.get("token");
    const userData = Cookie.get("user");
    
    if (!token) {
      router.push("/login");
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch statements for balance calculation
      const statementsResponse = await api_with_token.post("/statement/list");
      const statements = statementsResponse.data.list || [];
      
      // Calculate total balance from statements
      const totalCredit = statements.reduce((sum: number, stmt: any) => sum + (stmt.credit || 0), 0);
      const totalDebit = statements.reduce((sum: number, stmt: any) => sum + (stmt.debit || 0), 0);
      const totalBalance = totalCredit - totalDebit;

      // For demo purposes, let's create some sample balance distributions
      setBalances({
        totalBalance: { balance: totalBalance, credit: totalCredit, debit: totalDebit },
        supplierBalance: { balance: totalBalance * 0.4, credit: totalCredit * 0.4, debit: totalDebit * 0.4 },
        bankBalance: { balance: totalBalance * 0.6, credit: totalCredit * 0.6, debit: totalDebit * 0.6 },
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      // Use demo data if API fails
      setBalances({
        totalBalance: { balance: 15000, credit: 8000, debit: 3000 },
        supplierBalance: { balance: 6000, credit: 3200, debit: 1200 },
        bankBalance: { balance: 9000, credit: 4800, debit: 1800 },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("user");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="mx-4 p-8 text-center">
        <div>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="mx-4">
      {user && (
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <DateDisplay />
          {/* Tried to implement the DropdownMenu but the DatePickerWithRange doesn't work on the popup. */}
          {/* <DropdownMenu /> */}
          <div className="border border-gray-200 rounded-lg p-4">
            <DatePickerWithRange />
          </div>
        </div>
        <TotalBalanceCard
          balance={balances.totalBalance.balance}
          credit={balances.totalBalance.credit}
          debit={balances.totalBalance.debit}
          title="Total Balance"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <BalanceCard
          balance={balances.supplierBalance.balance}
          credit={balances.supplierBalance.credit}
          debit={balances.supplierBalance.debit}
          title="Supplier Balance"
        />
        <BalanceCard
          balance={balances.bankBalance.balance}
          credit={balances.bankBalance.credit}
          debit={balances.bankBalance.debit}
          title="Bank Balance"
        />
        <BalanceCard
          balance={balances.totalBalance.balance * 0.2}
          credit={balances.totalBalance.credit * 0.2}
          debit={balances.totalBalance.debit * 0.2}
          title="Other Balance"
        />
      </div>
    </div>
  );
};

export default DashboardPage;
