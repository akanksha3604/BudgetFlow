import {
  LayoutDashboard, ArrowLeftRight, Clock, Landmark, CreditCard,
  PieChart, TrendingDown, BarChart3, Calendar, DollarSign,
  Upload, Settings, Link2, ChevronLeft, ChevronRight, Calculator
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Transactions", url: "/dashboard/transactions", icon: ArrowLeftRight },
  { title: "Scheduled", url: "/dashboard/scheduled", icon: Clock },
  { title: "Accounts", url: "/dashboard/accounts", icon: Landmark },
  { title: "Credit Cards", url: "/dashboard/credit-cards", icon: CreditCard },
  { title: "Budgets", url: "/dashboard/budgets", icon: PieChart },
  { title: "Debts", url: "/dashboard/debts", icon: TrendingDown },
  { title: "Charts", url: "/dashboard/charts", icon: BarChart3 },
  { title: "Calendar", url: "/dashboard/calendar", icon: Calendar },
  { title: "Net Worth", url: "/dashboard/net-worth", icon: DollarSign },
  { title: "Import / Export", url: "/dashboard/import-export", icon: Upload },
  { title: "Preferences", url: "/dashboard/preferences", icon: Settings },
  { title: "Bank Sync", url: "/dashboard/bank-sync", icon: Link2 },
  { title: "AI Simulator", url: "/dashboard/simulator", icon: Calculator },
];

export function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`${collapsed ? "w-16" : "w-64"} min-h-screen bg-sidebar flex flex-col border-r border-sidebar-border transition-all duration-300 shrink-0`}>
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-sidebar-primary-foreground text-lg">BudgetFlow</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <nav className="flex-1 py-3 overflow-y-auto">
        <div className="space-y-0.5 px-2">
          {navItems.map(item => {
            const isActive = location.pathname === item.url ||
              (item.url === "/dashboard" && location.pathname === "/dashboard");
            return (
              <NavLink
                key={item.url}
                to={item.url}
                end={item.url === "/dashboard"}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                activeClassName=""
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
