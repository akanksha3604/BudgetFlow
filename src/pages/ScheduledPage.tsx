import { mockScheduledTransactions } from "@/lib/mock-data";
import { Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

export default function ScheduledPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Scheduled Transactions</h1>
      <div className="bg-card rounded-xl card-shadow divide-y divide-border">
        {mockScheduledTransactions.map(t => (
          <div key={t.id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${t.type === "income" ? "bg-success/10" : "bg-destructive/10"}`}>
                {t.type === "income" ? <ArrowUpRight className="w-5 h-5 text-success" /> : <ArrowDownRight className="w-5 h-5 text-destructive" />}
              </div>
              <div>
                <div className="text-sm font-medium text-card-foreground">{t.category}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {t.frequency} · Next: {t.nextDate}
                </div>
              </div>
            </div>
            <span className={`text-sm font-semibold ${t.type === "income" ? "text-success" : "text-destructive"}`}>
              {t.type === "income" ? "+" : "-"}{fmt(t.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
