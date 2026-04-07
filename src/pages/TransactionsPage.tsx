import { useState } from "react";
import { mockTransactions, categoryIcons, Transaction } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Plus, ArrowUpRight, ArrowDownRight, Search, Trash2, ShieldAlert, Lock, Unlock, Eye } from "lucide-react";

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ amount: "", category: "", account: "", date: "", notes: "", type: "expense" as "income" | "expense" });

  // Cooling off drawer state
  const [coolingItems, setCoolingItems] = useState([
    { id: 1, name: "New iPad", amount: 799, timestamp: Date.now() - (40 * 60 * 60 * 1000) }, // 40 hours ago
    { id: 2, name: "Fancy jacket", amount: 150, timestamp: Date.now() - (2 * 60 * 60 * 1000) }, // 2 hours ago
  ]);
  const [coolName, setCoolName] = useState("");
  const [coolAmount, setCoolAmount] = useState("");

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

  const addCoolingItem = () => {
    if (!coolName || !coolAmount) return;
    setCoolingItems(prev => [...prev, { id: Date.now(), name: coolName, amount: parseFloat(coolAmount), timestamp: Date.now() }]);
    setCoolName("");
    setCoolAmount("");
  };

  const removeCoolingItem = (id: number) => setCoolingItems(prev => prev.filter(i => i.id !== id));

  // Sniff subscriptions (mock logic targeting exact repeated amounts or entertainment category)
  const subscriptions = transactions.filter(t => t.type === "expense" && (t.category === "Entertainment" || t.notes.toLowerCase().includes("netflix") || t.notes.toLowerCase().includes("spotify") || t.amount === 45.99));

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

      <Tabs defaultValue="log" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="log">Transaction Log</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="log" className="space-y-6 mt-6">
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
        </TabsContent>

        <TabsContent value="insights" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subscription Sniffer */}
            <div className="bg-card rounded-xl card-shadow p-5">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-card-foreground">Subscription Sniffer</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">We found recurring payments that look like subscriptions. Review them to stop money leaks.</p>
              
              <div className="space-y-3">
                {subscriptions.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-muted/20">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{s.notes || s.category}</span>
                      <span className="text-xs text-muted-foreground">Appears to be bi-weekly or monthly</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-destructive">{fmt(s.amount)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cooling Off Drawer */}
            <div className="bg-card rounded-xl card-shadow p-5 border border-primary/20 bg-primary/5">
              <div className="flex items-center gap-2 mb-4">
                <ShieldAlert className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-card-foreground">Cooling-Off Drawer</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Impulse buy? Put it in the drawer. We lock the 'Purchase' button for 48 hours to help you reconsider.</p>
              
              <div className="flex gap-2 mb-4">
                <Input placeholder="Item Name" value={coolName} onChange={e => setCoolName(e.target.value)} />
                <Input placeholder="Price" type="number" className="w-24" value={coolAmount} onChange={e => setCoolAmount(e.target.value)} />
                <Button onClick={addCoolingItem}>Lock It</Button>
              </div>

              <div className="space-y-3">
                {coolingItems.map(item => {
                  const hoursPassed = (Date.now() - item.timestamp) / (1000 * 60 * 60);
                  const isUnlocked = hoursPassed >= 48;
                  const hoursLeft = Math.max(0, Math.ceil(48 - hoursPassed));
                  return (
                    <div key={item.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-background">
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{item.name} <span className="font-bold text-muted-foreground ml-1">${item.amount}</span></span>
                        <span className="text-xs text-muted-foreground">
                          {isUnlocked ? "Cooling period over. Still want it?" : `Locked: ${hoursLeft} hours remaining`}
                        </span>
                      </div>
                      {isUnlocked ? (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-destructive hover:text-destructive border-destructive" onClick={() => removeCoolingItem(item.id)}>Discard</Button>
                          <Button size="sm" variant="default" className="bg-success text-success-foreground hover:bg-success/90" onClick={() => removeCoolingItem(item.id)}>Buy</Button>
                        </div>
                      ) : (
                        <div className="p-2 bg-muted rounded-md tooltip" title={`Unlocks in ${hoursLeft} hours`}>
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
