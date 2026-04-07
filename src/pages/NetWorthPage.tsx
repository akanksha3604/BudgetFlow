import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { netWorthData } from "@/lib/mock-data";

const fmt = (n: number) => "$" + n.toLocaleString("en-US");

export default function NetWorthPage() {
  const latest = netWorthData[netWorthData.length - 1];
  const netWorth = latest.assets - latest.liabilities;

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Net Worth</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl card-shadow p-5 text-center">
          <div className="text-sm text-muted-foreground mb-1">Total Assets</div>
          <div className="text-2xl font-bold text-success">{fmt(latest.assets)}</div>
        </div>
        <div className="bg-card rounded-xl card-shadow p-5 text-center">
          <div className="text-sm text-muted-foreground mb-1">Total Liabilities</div>
          <div className="text-2xl font-bold text-destructive">{fmt(latest.liabilities)}</div>
        </div>
        <div className="bg-card rounded-xl card-shadow p-5 text-center">
          <div className="text-sm text-muted-foreground mb-1">Net Worth</div>
          <div className={`text-2xl font-bold ${netWorth >= 0 ? "text-success" : "text-destructive"}`}>{fmt(netWorth)}</div>
        </div>
      </div>

      <div className="bg-card rounded-xl card-shadow p-5">
        <h3 className="font-semibold text-card-foreground mb-4">Net Worth Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={netWorthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip formatter={(v: number) => fmt(v)} />
            <Legend />
            <Area type="monotone" dataKey="assets" stroke="hsl(var(--success))" fill="hsl(var(--success) / 0.15)" strokeWidth={2} />
            <Area type="monotone" dataKey="liabilities" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive) / 0.15)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
