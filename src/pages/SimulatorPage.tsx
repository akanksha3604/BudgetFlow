import { useState } from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, AreaChart, Area 
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, PiggyBank, Sparkles } from "lucide-react";
import { mockTransactions } from "@/lib/mock-data";

export default function SimulatorPage() {
  // What-If State
  const [scenarioType, setScenarioType] = useState<"invest" | "loan">("invest");
  const [amount, setAmount] = useState(500);
  const [interest, setInterest] = useState(7);
  const [months, setMonths] = useState(12);
  
  // Calculate What-If Data
  const generateWhatIfData = () => {
    const data = [];
    let baselineNW = 25000;
    let simulatedNW = 25000;
    
    // Monthly rate
    const r = (interest / 100) / 12;

    for (let i = 0; i <= months; i++) {
      data.push({
        month: `Month ${i}`,
        Baseline: Math.round(baselineNW),
        Simulated: Math.round(simulatedNW),
      });

      // Baseline assumption: saving $200 extra per month 
      baselineNW += 200;
      
      if (scenarioType === "invest") {
        // Compound interest on existing amount + add new amount
        simulatedNW = (simulatedNW * (1 + r)) + amount;
      } else if (scenarioType === "loan") {
        // Taking a loan drops net worth if asset depreciates, but let's just model paying it off
        // It's a simplification: lower savings due to EMI
        // Assuming user stops saving $200, and pays $amount EMI. 
        // Loan balance decreases, but cash decreases.
        simulatedNW += 200; // still baselining
        // Substract the interest cost of the loan each month
        simulatedNW -= (amount * r); 
      }
    }
    return data;
  };

  const whatIfData = generateWhatIfData();
  const simulatedFinal = whatIfData[whatIfData.length - 1].Simulated;
  const baselineFinal = whatIfData[whatIfData.length - 1].Baseline;
  const diff = simulatedFinal - baselineFinal;

  // Round-Up Logic
  const calcRoundUps = () => {
    let totalSpareChange = 0;
    mockTransactions.forEach(t => {
      if (t.type === "expense") {
        const ceil = Math.ceil(t.amount);
        const change = ceil - t.amount;
        totalSpareChange += change;
      }
    });
    return totalSpareChange;
  };
  
  const monthlyRoundup = calcRoundUps() * 4; // Mocking a full month based on the few transactions provided
  const generateRoundUpData = () => {
    const data = [];
    let total = 0;
    for (let i = 1; i <= 12; i++) {
      total += monthlyRoundup;
      data.push({
        month: `Month ${i}`,
        Savings: Number(total.toFixed(2)),
      });
    }
    return data;
  };

  const roundUpData = generateRoundUpData();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          AI Simulators
        </h1>
        <p className="text-muted-foreground">
          Project your financial future and explore how different decisions impact your goals.
        </p>
      </div>

      <Tabs defaultValue="what-if" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="what-if">What-If Scenarios</TabsTrigger>
          <TabsTrigger value="round-up">Round-up Savings</TabsTrigger>
        </TabsList>
        
        {/* WHAT IF TAB */}
        <TabsContent value="what-if" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Parameters
                </CardTitle>
                <CardDescription>Adjust the variables to simulate your net worth.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Label>Scenario Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant={scenarioType === "invest" ? "default" : "outline"} 
                      onClick={() => setScenarioType("invest")}
                    >Invest Monthly</Button>
                    <Button 
                      variant={scenarioType === "loan" ? "default" : "outline"} 
                      onClick={() => setScenarioType("loan")}
                    >Take a Loan</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>{scenarioType === "invest" ? "Monthly Investment ($)" : "Loan Amount ($)"}</Label>
                  <Input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(Number(e.target.value))} 
                  />
                </div>

                <div className="space-y-2">
                  <Label>Annual Interest Rate (%)</Label>
                  <Input 
                    type="number" 
                    value={interest} 
                    onChange={(e) => setInterest(Number(e.target.value))} 
                  />
                </div>

                <div className="space-y-2">
                  <Label>Time Horizon (Months): {months}</Label>
                  <Input 
                    type="range" 
                    min="6" max="120" 
                    value={months} 
                    onChange={(e) => setMonths(Number(e.target.value))} 
                    className="w-full cursor-pointer"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 shadow-md">
              <CardHeader>
                <CardTitle>Net Worth Projection</CardTitle>
                <CardDescription>
                  {scenarioType === "invest" 
                    ? `Investing $${amount}/mo at ${interest}% interest will leave you $${diff.toLocaleString()} wealthier than your baseline.`
                    : `Taking a $${amount} loan at ${interest}% interest will cost you $${Math.abs(diff).toLocaleString()} in interest over ${months} months.`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={whatIfData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorSim" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={diff >= 0 ? "hsl(var(--primary))" : "hsl(var(--destructive))"} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={diff >= 0 ? "hsl(var(--primary))" : "hsl(var(--destructive))"} stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorBase" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis dataKey="month" opacity={0.5} tick={{ fontSize: 12 }} />
                      <YAxis tickFormatter={(val) => `$${val / 1000}k`} opacity={0.5} tick={{ fontSize: 12 }} />
                      <RechartsTooltip 
                        formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="Baseline" 
                        stroke="hsl(var(--muted-foreground))" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorBase)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="Simulated" 
                        stroke={diff >= 0 ? "hsl(var(--primary))" : "hsl(var(--destructive))"} 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorSim)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ROUND UP TAB */}
        <TabsContent value="round-up" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="flex flex-col items-center justify-center space-y-4 p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <PiggyBank className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-medium">Estimated Monthly Savings</h3>
                <p className="text-4xl font-bold mt-2 text-primary">${monthlyRoundup.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mt-2">from spare change on everyday purchases</p>
              </div>
            </Card>

            <Card className="md:col-span-2 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  12-Month Round-Up Projection
                </CardTitle>
                <CardDescription>See how small change adds up over a year without you even noticing.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={roundUpData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis dataKey="month" opacity={0.5} tick={{ fontSize: 12 }} />
                      <YAxis tickFormatter={(val) => `$${val}`} opacity={0.5} tick={{ fontSize: 12 }} />
                      <RechartsTooltip 
                        formatter={(value: number) => [`$${value}`, 'Cumulative Savings']}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Savings" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={4} 
                        dot={{ r: 4, strokeWidth: 2, fill: "hsl(var(--background))" }} 
                        activeDot={{ r: 6 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
