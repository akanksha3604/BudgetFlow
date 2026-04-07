import { Link2, CheckCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const banks = [
  { name: "Chase", status: "connected" },
  { name: "Bank of America", status: "disconnected" },
  { name: "Wells Fargo", status: "disconnected" },
  { name: "Citibank", status: "disconnected" },
];

export default function BankSyncPage() {
  const [bankList, setBankList] = useState(banks);

  const toggleConnect = (name: string) => {
    setBankList(prev => prev.map(b => b.name === name ? { ...b, status: b.status === "connected" ? "disconnected" : "connected" } : b));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Bank Sync</h1>
      <div className="bg-warning/10 border border-warning/30 rounded-xl p-4">
        <p className="text-sm text-warning font-medium">⚡ Mock Feature — This simulates bank connection functionality</p>
      </div>
      <div className="bg-card rounded-xl card-shadow divide-y divide-border">
        {bankList.map(bank => (
          <div key={bank.name} className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Link2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-card-foreground">{bank.name}</div>
                <div className="flex items-center gap-1 text-xs">
                  {bank.status === "connected" ? (
                    <><CheckCircle className="w-3 h-3 text-success" /> <span className="text-success">Connected</span></>
                  ) : (
                    <span className="text-muted-foreground">Not connected</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {bank.status === "connected" && (
                <Button variant="ghost" size="icon" className="text-muted-foreground"><RefreshCw className="w-4 h-4" /></Button>
              )}
              <Button variant={bank.status === "connected" ? "outline" : "default"} size="sm" onClick={() => toggleConnect(bank.name)}
                className={bank.status === "connected" ? "" : "bg-primary text-primary-foreground hover:bg-primary/90"}>
                {bank.status === "connected" ? "Disconnect" : "Connect"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
