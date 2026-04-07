import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, AreaChart, Area } from "recharts";
import { expenseByCategory, monthlyComparison } from "@/lib/mock-data";
import { ArrowRight, CornerDownRight } from "lucide-react";

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

export default function ChartsPage() {
  const recentMonth = monthlyComparison[monthlyComparison.length - 1] || { income: 5000, expenses: 3000 };
  
  // Categorize for flow
  const needsCategories = ["Rent", "Utilities", "Groceries", "Transport"];
  const wantsCategories = ["Shopping", "Entertainment", "Food & Dining"];
  
  const needsTotal = expenseByCategory.filter(e => needsCategories.includes(e.name)).reduce((s, e) => s + e.value, 0);
  const wantsTotal = expenseByCategory.filter(e => wantsCategories.includes(e.name)).reduce((s, e) => s + e.value, 0);
  const savings = recentMonth.income - recentMonth.expenses;

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Charts & Reports</h1>

      {/* Income-to-Expense Flow */}
      <div className="bg-card rounded-xl card-shadow p-6 mb-6">
        <h3 className="font-semibold text-card-foreground mb-6">Income-to-Expense Flow</h3>
        
        <div className="flex flex-col lg:flex-row gap-6 p-4 rounded-xl bg-muted/20 items-center justify-between overflow-x-auto">
          {/* Incoming */}
          <div className="flex flex-col items-center min-w-[150px] shrink-0 p-4 bg-success/10 border border-success/20 rounded-lg">
            <span className="text-sm font-medium text-success mb-1">Total Income</span>
            <span className="text-2xl font-bold text-success">{fmt(recentMonth.income)}</span>
          </div>

          <ArrowRight className="text-muted-foreground w-8 h-8 hidden lg:block shrink-0" />
          
          {/* Main Branches */}
          <div className="flex flex-col gap-4 w-full min-w-[250px]">
            {/* Needs Branch */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col p-3 bg-primary/10 border border-primary/20 rounded-lg w-32 shrink-0">
                <span className="text-xs font-semibold text-primary">Needs ({Math.round(needsTotal/recentMonth.income*100)}%)</span>
                <span className="font-bold text-primary">{fmt(needsTotal)}</span>
              </div>
              <div className="flex-1 flex flex-col gap-1 border-l-2 border-border pl-4">
                {expenseByCategory.filter(e => needsCategories.includes(e.name)).map(e => (
                  <div key={e.name} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground break-all">{e.name}</span>
                    <span className="font-medium">{fmt(e.value)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Wants Branch */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col p-3 bg-warning/10 border border-warning/30 rounded-lg w-32 shrink-0">
                <span className="text-xs font-semibold text-warning-foreground">Wants ({Math.round(wantsTotal/recentMonth.income*100)}%)</span>
                <span className="font-bold text-warning-foreground">{fmt(wantsTotal)}</span>
              </div>
              <div className="flex-1 flex flex-col gap-1 border-l-2 border-border pl-4">
                {expenseByCategory.filter(e => wantsCategories.includes(e.name)).map(e => (
                  <div key={e.name} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground break-all">{e.name}</span>
                    <span className="font-medium">{fmt(e.value)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Savings Branch */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col p-3 bg-[hsl(var(--primary))]/10 border border-primary/20 rounded-lg w-32 shrink-0">
                <span className="text-xs font-semibold text-primary">Savings ({Math.round(savings/recentMonth.income*100)}%)</span>
                <span className="font-bold text-primary">{fmt(savings)}</span>
              </div>
              <div className="flex-1 flex items-center justify-between border-l-2 border-border pl-4">
                 <span className="text-xs text-muted-foreground">Retained Cash</span>
                 <span className="text-xs font-medium text-success">+{fmt(savings)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-xl card-shadow p-5">
          <h3 className="font-semibold text-card-foreground mb-4">Expense by Category</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={expenseByCategory} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {expenseByCategory.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Pie>
              <Tooltip formatter={(v: number) => fmt(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl card-shadow p-5">
          <h3 className="font-semibold text-card-foreground mb-4">Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip formatter={(v: number) => fmt(v)} />
              <Legend />
              <Bar dataKey="income" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl card-shadow p-5 lg:col-span-2">
          <h3 className="font-semibold text-card-foreground mb-4">Monthly Spending Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip formatter={(v: number) => fmt(v)} />
              <Area type="monotone" dataKey="expenses" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.15)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
