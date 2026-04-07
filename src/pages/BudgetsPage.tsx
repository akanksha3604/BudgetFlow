import { mockBudgets } from "@/lib/mock-data";
import { categoryIcons } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles, TrendingDown, TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

export default function BudgetsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Budgets</h1>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="w-4 h-4 mr-2" /> New Budget</Button>
      </div>

      {/* AI Anomaly & Re-balancer Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Anomaly Alert */}
        <Alert className="bg-destructive/10 border-destructive/20 text-destructive relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-destructive" />
          <TriangleAlert className="h-5 w-5 !text-destructive" />
          <AlertTitle className="font-semibold">Anomaly Detected</AlertTitle>
          <AlertDescription className="text-destructive/90 text-sm mt-1">
            You are spending $45/day in <strong>Food & Dining</strong>. At this velocity, you will overdraw your checking account before your next Paycheck on the 15th.
          </AlertDescription>
        </Alert>

        {/* Re-balancer Suggestion */}
        <Alert className="bg-primary/5 border-primary/20 text-primary relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          <Sparkles className="h-5 w-5 !text-primary" />
          <AlertTitle className="font-semibold text-foreground">Smart Re-balancer</AlertTitle>
          <AlertDescription className="text-muted-foreground text-sm mt-1">
            You consistently underspend your <span className="font-medium text-foreground">Entertainment</span> budget by $60. 
            Want to seamlessly re-allocate this to <span className="font-medium text-foreground">Groceries</span> where you typically overspend?
            <Button variant="outline" size="sm" className="mt-3 w-full bg-background">
              Auto-Rebalance Now
            </Button>
          </AlertDescription>
        </Alert>
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
