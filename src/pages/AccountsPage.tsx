import { useState } from "react";
import { mockAccounts, Account } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Eye, ArrowLeftRight, MoreHorizontal, Plus } from "lucide-react";

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

export default function AccountsPage() {
  const [accounts] = useState<Account[]>(mockAccounts);
  const total = accounts.filter(a => a.active).reduce((s, a) => s + a.balance, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Accounts</h1>
          <p className="text-muted-foreground text-sm">Total Balance: <span className="font-semibold text-foreground">{fmt(total)}</span></p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="w-4 h-4 mr-2" /> Add Account</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map(acc => (
          <div key={acc.id} className={`bg-card rounded-xl card-shadow p-5 ${!acc.active ? "opacity-60" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{acc.icon}</div>
                <div>
                  <div className="font-semibold text-card-foreground">{acc.name}</div>
                  <div className="text-xs text-muted-foreground capitalize">{acc.type}</div>
                </div>
              </div>
              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${acc.active ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                {acc.active ? "Active" : "Inactive"}
              </span>
            </div>
            <div className={`text-2xl font-bold mb-4 ${acc.balance >= 0 ? "text-success" : "text-destructive"}`}>{fmt(acc.balance)}</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs"><Eye className="w-3.5 h-3.5 mr-1" /> View</Button>
              <Button variant="outline" size="sm" className="text-xs"><ArrowLeftRight className="w-3.5 h-3.5 mr-1" /> Transfer</Button>
              <Button variant="outline" size="sm" className="text-xs"><MoreHorizontal className="w-3.5 h-3.5" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
