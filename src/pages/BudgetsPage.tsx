import { mockBudgets } from "@/lib/mock-data";
import { categoryIcons } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

export default function BudgetsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Budgets</h1>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="w-4 h-4 mr-2" /> New Budget</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockBudgets.map(b => {
          const pct = Math.round((b.spent / b.total) * 100);
          const remaining = b.total - b.spent;
          const status = pct >= 100 ? "exceeded" : pct >= 80 ? "warning" : "safe";
          const barColor = status === "exceeded" ? "bg-destructive" : status === "warning" ? "bg-warning" : "bg-success";
          const statusBadge = status === "exceeded" 
            ? "bg-destructive/10 text-destructive" 
            : status === "warning" 
            ? "bg-warning/10 text-warning" 
            : "bg-success/10 text-success";

          return (
            <div key={b.id} className="bg-card rounded-xl card-shadow p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{categoryIcons[b.category] || "📊"}</span>
                  <div>
                    <div className="font-semibold text-card-foreground">{b.category}</div>
                    <div className="text-xs text-muted-foreground capitalize">{b.period} · {b.startDate} – {b.endDate}</div>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusBadge}`}>
                  {pct}%
                </span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden mb-3">
                <div className={`h-full ${barColor} rounded-full transition-all duration-500`} style={{ width: `${Math.min(pct, 100)}%` }} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Spent: <span className="text-card-foreground font-medium">{fmt(b.spent)}</span></span>
                <span className="text-muted-foreground">
                  {remaining >= 0 ? "Left: " : "Over: "}
                  <span className={`font-medium ${remaining >= 0 ? "text-success" : "text-destructive"}`}>{fmt(Math.abs(remaining))}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
