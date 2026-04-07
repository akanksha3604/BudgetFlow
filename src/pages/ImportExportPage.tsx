import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import { mockTransactions } from "@/lib/mock-data";
import { toast } from "sonner";

export default function ImportExportPage() {
  const handleExportCSV = () => {
    const headers = "Date,Category,Type,Amount,Account,Notes\n";
    const rows = mockTransactions.map(t => `${t.date},${t.category},${t.type},${t.amount},${t.account},"${t.notes}"`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported successfully!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Import / Export</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-xl card-shadow p-6 text-center">
          <Download className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="font-semibold text-card-foreground mb-2">Export Data</h3>
          <p className="text-sm text-muted-foreground mb-4">Download your transactions as CSV</p>
          <Button onClick={handleExportCSV} className="bg-primary text-primary-foreground hover:bg-primary/90">Export CSV</Button>
        </div>
        <div className="bg-card rounded-xl card-shadow p-6 text-center">
          <Upload className="w-12 h-12 text-accent mx-auto mb-4" />
          <h3 className="font-semibold text-card-foreground mb-2">Import Data</h3>
          <p className="text-sm text-muted-foreground mb-4">Upload a CSV file to import transactions</p>
          <Button variant="outline">Import CSV</Button>
        </div>
      </div>
    </div>
  );
}
