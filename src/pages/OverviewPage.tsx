import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, HeartPulse, Flame, ShieldCheck, Leaf } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";
import { mockTransactions, mockAccounts, mockBudgets, balanceTrend, last7DaysSpending, expenseByCategory } from "@/lib/mock-data";
import { calculateFinancialHealthScore, calculateStreaks, calculateSafeToSpend, calculateCarbonFootprint } from "@/lib/scoring";

const totalBalance = mockAccounts.filter(a => a.active).reduce((s, a) => s + a.balance, 0);
const income = mockTransactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
const expenses = mockTransactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);

const summaryCards = [
  { title: "Total Balance", value: totalBalance, icon: Wallet, trend: "+5.2%", up: true, gradient: "gradient-primary" },
  { title: "Income", value: income, icon: TrendingUp, trend: "+12%", up: true, gradient: "gradient-success" },
  { title: "Expenses", value: expenses, icon: TrendingDown, trend: "-3%", up: false, gradient: "gradient-accent" },
];

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function OverviewPage() {
  const healthScore = calculateFinancialHealthScore();
  const streaks = calculateStreaks();
  const safeToSpend = calculateSafeToSpend();
  const carbonFootprint = calculateCarbonFootprint();

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>

      {/* Gamification & Health Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Safe to Spend */}
        <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl border border-primary/20 p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground opacity-90">Safe-to-Spend Today</span>
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">${safeToSpend}</div>
            <div className="text-xs text-muted-foreground mt-1">Based on remaining budget</div>
          </div>
        </div>

        {/* Health Score */}
        <div className="bg-card rounded-xl card-shadow p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-card-foreground">Health Score</span>
            <HeartPulse className={`w-5 h-5 ${healthScore.color}`} />
          </div>
          <div>
            <div className="text-3xl font-bold flex items-baseline gap-2">
              <span>{healthScore.score}</span>
              <span className={`text-sm ${healthScore.color} font-medium`}>{healthScore.label}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">out of 850 potential</div>
          </div>
        </div>

        {/* Streaks */}
        <div className="bg-card rounded-xl card-shadow p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-card-foreground">Active Streaks</span>
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
          <div className="space-y-3 mt-1">
            <div className="flex justify-between items-center text-sm border-b border-border pb-2">
              <span className="text-muted-foreground">Under Budget</span>
              <span className="font-bold flex items-center gap-1 text-card-foreground"><Flame className="w-3 h-3 text-orange-500 fill-orange-500" /> {streaks.budgetStreak} mo</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Positive Savings</span>
              <span className="font-bold flex items-center gap-1 text-card-foreground"><Flame className="w-3 h-3 text-orange-500 fill-orange-500" /> {streaks.savingsStreak} mo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {summaryCards.map(card => (
          <div key={card.title} className={`${card.gradient} rounded-xl p-5 text-primary-foreground`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium opacity-90">{card.title}</span>
              <card.icon className="w-5 h-5 opacity-80" />
            </div>
            <div className="text-2xl font-bold mb-1">{fmt(card.value)}</div>
            <div className="flex items-center gap-1 text-xs opacity-90">
              {card.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {card.trend} from last month
            </div>
          </div>
        ))}
      </div>

      {/* Carbon Tracker Row */}
      <div className="bg-card rounded-xl card-shadow p-5 border border-green-500/20 bg-green-500/5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground">Carbon Footprint Tracker</h3>
              <p className="text-xs text-muted-foreground">Estimated monthly CO₂ emissions based on your spending categories</p>
            </div>
          </div>
          <div className="flex flex-col items-end w-full sm:w-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-green-600 dark:text-green-400">{Math.round(carbonFootprint)}</span>
              <span className="text-sm font-medium text-muted-foreground">kg CO₂e</span>
            </div>
            <div className="w-full sm:w-48 bg-muted rounded-full h-1.5 mt-1 relative overflow-hidden">
              <div className="bg-green-500 h-1.5 rounded-full absolute left-0 top-0 transition-all" style={{ width: '45%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Expense by Category */}
        <div className="bg-card rounded-xl card-shadow p-5">
          <h3 className="font-semibold text-card-foreground mb-4">Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={expenseByCategory} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {expenseByCategory.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip formatter={(v: number) => fmt(v)} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2">
            {expenseByCategory.slice(0, 5).map(e => (
              <div key={e.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: e.fill }} />
                {e.name}
              </div>
            ))}
          </div>
        </div>

        {/* Balance Trend */}
        <div className="bg-card rounded-xl card-shadow p-5">
          <h3 className="font-semibold text-card-foreground mb-4">Balance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={balanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip formatter={(v: number) => fmt(v)} />
              <Line type="monotone" dataKey="balance" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Last 7 Days + Budgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-xl card-shadow p-5">
          <h3 className="font-semibold text-card-foreground mb-4">Last 7 Days Spending</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={last7DaysSpending}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip formatter={(v: number) => fmt(v)} />
              <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl card-shadow p-5">
          <h3 className="font-semibold text-card-foreground mb-4">Budget Overview</h3>
          <div className="space-y-3">
            {mockBudgets.slice(0, 4).map(b => {
              const pct = Math.round((b.spent / b.total) * 100);
              const color = pct >= 100 ? "bg-destructive" : pct >= 80 ? "bg-warning" : "bg-success";
              return (
                <div key={b.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-card-foreground font-medium">{b.category}</span>
                    <span className="text-muted-foreground">{fmt(b.spent)} / {fmt(b.total)}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-card rounded-xl card-shadow p-5">
        <h3 className="font-semibold text-card-foreground mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {mockTransactions.slice(0, 6).map(t => (
            <div key={t.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm ${t.type === "income" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                  {t.type === "income" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                </div>
                <div>
                  <div className="text-sm font-medium text-card-foreground">{t.category}</div>
                  <div className="text-xs text-muted-foreground">{t.account} · {t.date}</div>
                </div>
              </div>
              <span className={`text-sm font-semibold ${t.type === "income" ? "text-success" : "text-destructive"}`}>
                {t.type === "income" ? "+" : "-"}{fmt(t.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Accounts Overview */}
      <div className="bg-card rounded-xl card-shadow p-5">
        <h3 className="font-semibold text-card-foreground mb-4">Accounts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {mockAccounts.map(acc => (
            <div key={acc.id} className={`p-4 rounded-lg border border-border ${!acc.active ? "opacity-50" : ""}`}>
              <div className="text-2xl mb-2">{acc.icon}</div>
              <div className="text-sm font-medium text-card-foreground">{acc.name}</div>
              <div className={`text-lg font-bold ${acc.balance >= 0 ? "text-success" : "text-destructive"}`}>{fmt(acc.balance)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
