export interface Transaction {
  id: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  account: string;
  date: string;
  notes: string;
}

export interface Account {
  id: string;
  name: string;
  type: "wallet" | "bank" | "savings";
  balance: number;
  active: boolean;
  icon: string;
}

export interface Budget {
  id: string;
  category: string;
  period: "weekly" | "monthly" | "yearly";
  total: number;
  spent: number;
  startDate: string;
  endDate: string;
}

export interface Debt {
  id: string;
  name: string;
  totalAmount: number;
  remainingAmount: number;
  emi: number;
  dueDate: string;
  payments: { date: string; amount: number }[];
}

export interface CreditCard {
  id: string;
  name: string;
  limit: number;
  used: number;
  dueDate: string;
}

export interface ScheduledTransaction {
  id: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  account: string;
  frequency: "daily" | "weekly" | "monthly";
  nextDate: string;
  notes: string;
}

export const mockAccounts: Account[] = [
  { id: "1", name: "Cash Wallet", type: "wallet", balance: 1250.00, active: true, icon: "💰" },
  { id: "2", name: "Chase Checking", type: "bank", balance: 8430.50, active: true, icon: "🏦" },
  { id: "3", name: "Savings Account", type: "savings", balance: 25000.00, active: true, icon: "🐷" },
  { id: "4", name: "Emergency Fund", type: "savings", balance: 10000.00, active: false, icon: "🛡️" },
];

export const mockTransactions: Transaction[] = [
  { id: "1", amount: 4500, type: "income", category: "Salary", account: "Chase Checking", date: "2026-04-07", notes: "Monthly salary" },
  { id: "2", amount: 85.50, type: "expense", category: "Groceries", account: "Cash Wallet", date: "2026-04-06", notes: "Weekly groceries" },
  { id: "3", amount: 1200, type: "expense", category: "Rent", account: "Chase Checking", date: "2026-04-01", notes: "April rent" },
  { id: "4", amount: 45.99, type: "expense", category: "Entertainment", account: "Cash Wallet", date: "2026-04-05", notes: "Netflix + Spotify" },
  { id: "5", amount: 200, type: "expense", category: "Utilities", account: "Chase Checking", date: "2026-04-03", notes: "Electric bill" },
  { id: "6", amount: 150, type: "income", category: "Freelance", account: "Chase Checking", date: "2026-04-04", notes: "Design work" },
  { id: "7", amount: 65, type: "expense", category: "Transport", account: "Cash Wallet", date: "2026-04-02", notes: "Gas" },
  { id: "8", amount: 320, type: "expense", category: "Shopping", account: "Chase Checking", date: "2026-04-01", notes: "New shoes" },
  { id: "9", amount: 42, type: "expense", category: "Food & Dining", account: "Cash Wallet", date: "2026-04-06", notes: "Restaurant" },
  { id: "10", amount: 500, type: "income", category: "Investment", account: "Savings Account", date: "2026-04-01", notes: "Dividend" },
];

export const mockBudgets: Budget[] = [
  { id: "1", category: "Groceries", period: "monthly", total: 400, spent: 285, startDate: "2026-04-01", endDate: "2026-04-30" },
  { id: "2", category: "Entertainment", period: "monthly", total: 150, spent: 145.99, startDate: "2026-04-01", endDate: "2026-04-30" },
  { id: "3", category: "Transport", period: "monthly", total: 200, spent: 65, startDate: "2026-04-01", endDate: "2026-04-30" },
  { id: "4", category: "Shopping", period: "monthly", total: 300, spent: 320, startDate: "2026-04-01", endDate: "2026-04-30" },
  { id: "5", category: "Food & Dining", period: "monthly", total: 250, spent: 142, startDate: "2026-04-01", endDate: "2026-04-30" },
  { id: "6", category: "Utilities", period: "monthly", total: 300, spent: 200, startDate: "2026-04-01", endDate: "2026-04-30" },
];

export const mockDebts: Debt[] = [
  { id: "1", name: "Car Loan", totalAmount: 25000, remainingAmount: 18500, emi: 450, dueDate: "2026-04-15", payments: [{ date: "2026-03-15", amount: 450 }, { date: "2026-02-15", amount: 450 }] },
  { id: "2", name: "Student Loan", totalAmount: 40000, remainingAmount: 32000, emi: 350, dueDate: "2026-04-20", payments: [{ date: "2026-03-20", amount: 350 }] },
];

export const mockCreditCards: CreditCard[] = [
  { id: "1", name: "Visa Platinum", limit: 10000, used: 3200, dueDate: "2026-04-25" },
  { id: "2", name: "Mastercard Gold", limit: 5000, used: 1800, dueDate: "2026-04-20" },
];

export const mockScheduledTransactions: ScheduledTransaction[] = [
  { id: "1", amount: 4500, type: "income", category: "Salary", account: "Chase Checking", frequency: "monthly", nextDate: "2026-05-07", notes: "Monthly salary" },
  { id: "2", amount: 1200, type: "expense", category: "Rent", account: "Chase Checking", frequency: "monthly", nextDate: "2026-05-01", notes: "Monthly rent" },
  { id: "3", amount: 15.99, type: "expense", category: "Entertainment", account: "Cash Wallet", frequency: "monthly", nextDate: "2026-05-05", notes: "Netflix" },
];

export const categoryIcons: Record<string, string> = {
  Salary: "💼",
  Groceries: "🛒",
  Rent: "🏠",
  Entertainment: "🎬",
  Utilities: "⚡",
  Freelance: "💻",
  Transport: "🚗",
  Shopping: "🛍️",
  "Food & Dining": "🍽️",
  Investment: "📈",
  Health: "🏥",
  Education: "📚",
};

export const balanceTrend = [
  { month: "Jan", balance: 32000 },
  { month: "Feb", balance: 34500 },
  { month: "Mar", balance: 33200 },
  { month: "Apr", balance: 36800 },
  { month: "May", balance: 38000 },
  { month: "Jun", balance: 41200 },
];

export const last7DaysSpending = [
  { day: "Mon", amount: 45 },
  { day: "Tue", amount: 120 },
  { day: "Wed", amount: 85 },
  { day: "Thu", amount: 200 },
  { day: "Fri", amount: 65 },
  { day: "Sat", amount: 150 },
  { day: "Sun", amount: 42 },
];

export const expenseByCategory = [
  { name: "Rent", value: 1200, fill: "hsl(210, 79%, 46%)" },
  { name: "Shopping", value: 320, fill: "hsl(37, 100%, 50%)" },
  { name: "Utilities", value: 200, fill: "hsl(142, 71%, 45%)" },
  { name: "Groceries", value: 85.5, fill: "hsl(0, 84%, 60%)" },
  { name: "Transport", value: 65, fill: "hsl(262, 60%, 55%)" },
  { name: "Entertainment", value: 45.99, fill: "hsl(180, 60%, 45%)" },
  { name: "Food & Dining", value: 42, fill: "hsl(30, 80%, 55%)" },
];

export const netWorthData = [
  { month: "Jan", assets: 55000, liabilities: 52000 },
  { month: "Feb", assets: 57000, liabilities: 51500 },
  { month: "Mar", assets: 58500, liabilities: 51000 },
  { month: "Apr", assets: 62000, liabilities: 50500 },
  { month: "May", assets: 65000, liabilities: 50000 },
  { month: "Jun", assets: 68000, liabilities: 49500 },
];

export const monthlyComparison = [
  { month: "Jan", income: 4500, expenses: 3200 },
  { month: "Feb", income: 5000, expenses: 3800 },
  { month: "Mar", income: 4700, expenses: 3500 },
  { month: "Apr", income: 5150, expenses: 2958 },
];
