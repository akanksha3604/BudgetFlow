import { mockBudgets, mockCreditCards, monthlyComparison } from "./mock-data";

/**
 * Calculates a dynamic Financial Health Score (300-850) based on mock data.
 * Factors:
 * 1. Budget Adherence (40%)
 * 2. Credit Card Utilization (40%)
 * 3. Savings Rate (20%)
 */
export function calculateFinancialHealthScore(): { score: number, label: string, color: string } {
  let score = 300;
  
  // 1. Budget Adherence
  const totalBudget = mockBudgets.reduce((acc, b) => acc + b.total, 0);
  const totalSpent = mockBudgets.reduce((acc, b) => acc + b.spent, 0);
  const budgetRatio = totalBudget > 0 ? (totalSpent / totalBudget) : 0;
  
  if (budgetRatio <= 0.8) score += 220; // Great
  else if (budgetRatio <= 1.0) score += 150; // Good
  else score += 50; // Over budget
  
  // 2. Credit Utilization
  const totalLimit = mockCreditCards.reduce((acc, c) => acc + c.limit, 0);
  const totalUsed = mockCreditCards.reduce((acc, c) => acc + c.used, 0);
  const utilization = totalLimit > 0 ? (totalUsed / totalLimit) : 0;
  
  if (utilization <= 0.3) score += 220; // Excellent
  else if (utilization <= 0.5) score += 150; // Good
  else if (utilization <= 0.8) score += 80; // Okay
  
  // 3. Savings Rate (Comparing Income vs Expense in recent month)
  const recentMonth = monthlyComparison[monthlyComparison.length - 1];
  const savingsRate = recentMonth && recentMonth.income > 0 
    ? ((recentMonth.income - recentMonth.expenses) / recentMonth.income)
    : 0;

  if (savingsRate >= 0.2) score += 110; // >20% savings
  else if (savingsRate >= 0.1) score += 70; // >10% savings
  else if (savingsRate > 0) score += 30; // positive

  let label = "Poor";
  let color = "text-destructive";
  
  if (score >= 750) {
    label = "Excellent";
    color = "text-primary";
  } else if (score >= 650) {
    label = "Good";
    color = "text-green-500";
  } else if (score >= 550) {
    label = "Fair";
    color = "text-yellow-500";
  }
  
  return { score, label, color };
}

/**
 * Mocks a 'streak' calculation.
 */
export function calculateStreaks() {
  return {
    budgetStreak: 4, // 4 months under budget
    savingsStreak: 6, // 6 months positive savings
  };
}

/**
 * Calculates "Safe to Spend" per day based on remaining income vs budget.
 * Mocks current day as middle of month for demonstration.
 */
export function calculateSafeToSpend() {
  const recentMonth = monthlyComparison[monthlyComparison.length - 1];
  const income = recentMonth ? recentMonth.income : 5000;
  
  const totalBudget = mockBudgets.reduce((acc, b) => acc + b.total, 0);
  const totalSpent = mockBudgets.reduce((acc, b) => acc + b.spent, 0);
  
  const unbudgetedIncome = income - totalBudget;
  const remainingBudget = totalBudget - totalSpent;
  
  // Assuming 15 days remaining in month for this mock
  const daysRemaining = 15;
  
  // Safe to spend today is remaining budget allowance + a small unbudgeted buffer
  const dailyBudget = remainingBudget > 0 ? (remainingBudget / daysRemaining) : 0;
  const dailyBuffer = unbudgetedIncome > 0 ? (unbudgetedIncome * 0.1) / daysRemaining : 0; // 10% of unbudgeted acting as fun money
  
  return (dailyBudget + dailyBuffer).toFixed(2);
}

/**
 * Mocks an estimated Carbon Footprint based on spending
 */
export function calculateCarbonFootprint() {
  const carbonMap: Record<string, number> = {
    'Gas': 2.3,
    'Transport': 12.5,
    'Utilities': 45.2,
    'Shopping': 18.4,
    'Food & Dining': 8.5,
    'Entertainment': 2.1,
    'Rent': 150.0,
    'Groceries': 14.2
  };
  
  let totalCarbon = 0;
  mockBudgets.forEach(b => {
    const factor = carbonMap[b.category] || 5.0;
    totalCarbon += (b.spent / 10) * factor;
  });
  
  return totalCarbon;
}
