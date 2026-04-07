import { useState } from "react";
import { mockTransactions, categoryIcons, Transaction } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, ArrowUpRight, ArrowDownRight, Search, Trash2, Pencil } from "lucide-react";

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ amount: "", category: "", account: "", date: "", notes: "", type: "expense" as "income" | "expense" });

  const categories = [...new Set(transactions.map(t => t.category))];
  const filtered = transactions.filter(t => {
    if (search && !t.category.toLowerCase().includes(search.toLowerCase()) && !t.notes.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCategory !== "all" && t.category !== filterCategory) return false;
    if (filterType !== "all" && t.type !== filterType) return false;
    return true;
  });

  const handleAdd = () => {
    if (!form.amount || !form.category) return;
    setTransactions(prev => [{ id: Date.now().toString(), ...form, amount: parseFloat(form.amount) }, ...prev]);
    setForm({ amount: "", category: "", account: "", date: "", notes: "", type: "expense" });
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => setTransactions(prev => prev.filter(t => t.id !== id));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="w-4 h-4 mr-2" /> Add Transaction</Button>
          </DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader><DialogTitle className="text-card-foreground">New Transaction</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Amount</Label><Input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="0.00" className="mt-1" /></div>
                <div><Label>Type</Label>
                  <Select value={form.type} onValueChange={v => setForm({ ...form, type: v as "income" | "expense" })}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="income">Income</SelectItem><SelectItem value="expense">Expense</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>
              <div><Label>Category</Label><Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="e.g. Groceries" className="mt-1" /></div>
              <div><Label>Account</Label><Input value={form.account} onChange={e => setForm({ ...form, account: e.target.value })} placeholder="e.g. Chase Checking" className="mt-1" /></div>
              <div><Label>Date</Label><Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="mt-1" /></div>
              <div><Label>Notes</Label><Input value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Optional notes" className="mt-1" /></div>
              <Button onClick={handleAdd} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Add Transaction</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search transactions..." className="pl-9" />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent><SelectItem value="all">All Categories</SelectItem>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-32"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="income">Income</SelectItem><SelectItem value="expense">Expense</SelectItem></SelectContent>
        </Select>
      </div>

      {/* List */}
      <div className="bg-card rounded-xl card-shadow divide-y divide-border">
        {filtered.map(t => (
          <div key={t.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${t.type === "income" ? "bg-success/10" : "bg-destructive/10"}`}>
                {categoryIcons[t.category] || (t.type === "income" ? <ArrowUpRight className="w-5 h-5 text-success" /> : <ArrowDownRight className="w-5 h-5 text-destructive" />)}
              </div>
              <div>
                <div className="text-sm font-medium text-card-foreground">{t.category}</div>
                <div className="text-xs text-muted-foreground">{t.account} · {t.date} {t.notes && `· ${t.notes}`}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-semibold ${t.type === "income" ? "text-success" : "text-destructive"}`}>
                {t.type === "income" ? "+" : "-"}{fmt(t.amount)}
              </span>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive h-8 w-8" onClick={() => handleDelete(t.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="p-8 text-center text-muted-foreground">No transactions found</div>}
      </div>
    </div>
  );
}
