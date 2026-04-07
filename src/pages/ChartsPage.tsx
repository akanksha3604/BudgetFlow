import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, AreaChart, Area } from "recharts";
import { expenseByCategory, monthlyComparison } from "@/lib/mock-data";

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

export default function ChartsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Charts & Reports</h1>

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
