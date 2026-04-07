import { Moon, Sun, Bell, LogOut, User, Users } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export function TopNavbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isHousehold, setIsHousehold] = useState(false);

  const toggleHousehold = (checked: boolean) => {
    setIsHousehold(checked);
    toast({
      title: checked ? "Household View Enabled" : "Individual View Enabled",
      description: checked ? "Dashboard data is now scaled for your household." : "Dashboard data is now isolated to your accounts.",
    });
  };

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-6">
        <div>
          <h2 className="text-sm font-medium text-muted-foreground">Welcome back,</h2>
          <h1 className="text-lg font-semibold text-foreground leading-tight flex items-center gap-2">
            {isHousehold ? "Doe Household" : "John Doe"}
          </h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-2 bg-muted/50 p-1.5 rounded-full border border-border/50">
          <User className={`w-4 h-4 ${!isHousehold ? "text-primary" : "text-muted-foreground"}`} />
          <Switch 
            checked={isHousehold} 
            onCheckedChange={toggleHousehold} 
            className="data-[state=checked]:bg-primary"
          />
          <Users className={`w-4 h-4 ${isHousehold ? "text-primary" : "text-muted-foreground"}`} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground hover:text-foreground">
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <User className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
