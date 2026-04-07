import { mockDebts } from "@/lib/mock-data";

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

export default function DebtsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Debts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockDebts.map(d => {
          const paid = d.totalAmount - d.remainingAmount;
          const pct = Math.round((paid / d.totalAmount) * 100);
          return (
            <div key={d.id} className="bg-card rounded-xl card-shadow p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-card-foreground">{d.name}</h3>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{pct}% paid</span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden mb-4">
                <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Total:</span> <span className="font-medium text-card-foreground">{fmt(d.totalAmount)}</span></div>
                <div><span className="text-muted-foreground">Remaining:</span> <span className="font-medium text-destructive">{fmt(d.remainingAmount)}</span></div>
                <div><span className="text-muted-foreground">EMI:</span> <span className="font-medium text-card-foreground">{fmt(d.emi)}/mo</span></div>
                <div><span className="text-muted-foreground">Due:</span> <span className="font-medium text-card-foreground">{d.dueDate}</span></div>
              </div>
              <div className="mt-4">
                <h4 className="text-xs font-medium text-muted-foreground mb-2">Payment History</h4>
                <div className="space-y-1">
                  {d.payments.map((p, i) => (
                    <div key={i} className="flex justify-between text-xs text-muted-foreground">
                      <span>{p.date}</span><span className="text-success">{fmt(p.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
