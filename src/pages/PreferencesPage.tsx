import { useTheme } from "@/hooks/use-theme";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function PreferencesPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Preferences</h1>
      <div className="bg-card rounded-xl card-shadow divide-y divide-border">
        <div className="p-5 flex items-center justify-between">
          <div>
            <Label className="text-card-foreground font-medium">Dark Mode</Label>
            <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
          </div>
          <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
        </div>
        <div className="p-5 flex items-center justify-between">
          <div>
            <Label className="text-card-foreground font-medium">Currency</Label>
            <p className="text-sm text-muted-foreground">Select your preferred currency</p>
          </div>
          <Select defaultValue="usd">
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD ($)</SelectItem>
              <SelectItem value="eur">EUR (€)</SelectItem>
              <SelectItem value="gbp">GBP (£)</SelectItem>
              <SelectItem value="inr">INR (₹)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="p-5 flex items-center justify-between">
          <div>
            <Label className="text-card-foreground font-medium">Budget Alerts</Label>
            <p className="text-sm text-muted-foreground">Get notified at 80% budget usage</p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="p-5 flex items-center justify-between">
          <div>
            <Label className="text-card-foreground font-medium">Monthly Report</Label>
            <p className="text-sm text-muted-foreground">Receive monthly summary email</p>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  );
}
