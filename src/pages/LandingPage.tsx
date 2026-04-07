import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, PieChart, Shield, Zap, ArrowRight, Check, DollarSign, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const features = [
  { icon: BarChart3, title: "Smart Analytics", desc: "Visualize spending patterns with beautiful charts and reports" },
  { icon: PieChart, title: "Budget Tracking", desc: "Set budgets and get alerts when you're close to limits" },
  { icon: Shield, title: "Secure & Private", desc: "Your financial data is encrypted and stays private" },
  { icon: Zap, title: "Real-time Sync", desc: "Instant updates across all your accounts and cards" },
];

const plans = [
  { name: "Free", price: "$0", features: ["5 Accounts", "Basic Charts", "Monthly Budgets", "CSV Export"], highlight: false },
  { name: "Premium", price: "$9.99", features: ["Unlimited Accounts", "Advanced Charts", "AI Insights", "Bank Sync", "Priority Support"], highlight: true },
  { name: "Ultra", price: "$19.99", features: ["Everything in Premium", "Multi-currency", "Custom Reports", "API Access", "Dedicated Support"], highlight: false },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">BudgetFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" onClick={() => navigate("/login")} className="text-muted-foreground">Login</Button>
            <Button onClick={() => navigate("/signup")} className="bg-primary text-primary-foreground hover:bg-primary/90">Sign Up</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" /> Smart Finance Management
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight max-w-3xl mx-auto">
            Take Control of Your <span className="text-primary">Financial Future</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Track expenses, manage budgets, and gain insights into your spending with our powerful yet simple finance app.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" onClick={() => navigate("/signup")} className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 text-base">
              Start Tracking Now <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/dashboard")} className="text-base">
              Live Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">Everything You Need</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-md mx-auto">Powerful tools to manage every aspect of your personal finances</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => (
              <div key={f.title} className="bg-card p-6 rounded-xl card-shadow hover:card-shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">Simple Pricing</h2>
          <p className="text-center text-muted-foreground mb-12">Choose the plan that fits your needs</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map(plan => (
              <div key={plan.name} className={`rounded-xl p-6 ${plan.highlight ? "gradient-primary text-primary-foreground ring-2 ring-primary scale-105" : "bg-card card-shadow text-card-foreground"}`}>
                <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                <div className="text-3xl font-bold mb-1">{plan.price}<span className="text-sm font-normal opacity-70">/mo</span></div>
                <ul className="space-y-2 mt-6 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${plan.highlight ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026 BudgetFlow. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
