import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { DashboardLayout } from "@/components/DashboardLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OverviewPage from "./pages/OverviewPage";
import TransactionsPage from "./pages/TransactionsPage";
import ScheduledPage from "./pages/ScheduledPage";
import AccountsPage from "./pages/AccountsPage";
import CreditCardsPage from "./pages/CreditCardsPage";
import BudgetsPage from "./pages/BudgetsPage";
import DebtsPage from "./pages/DebtsPage";
import ChartsPage from "./pages/ChartsPage";
import CalendarPage from "./pages/CalendarPage";
import NetWorthPage from "./pages/NetWorthPage";
import ImportExportPage from "./pages/ImportExportPage";
import PreferencesPage from "./pages/PreferencesPage";
import BankSyncPage from "./pages/BankSyncPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<OverviewPage />} />
              <Route path="transactions" element={<TransactionsPage />} />
              <Route path="scheduled" element={<ScheduledPage />} />
              <Route path="accounts" element={<AccountsPage />} />
              <Route path="credit-cards" element={<CreditCardsPage />} />
              <Route path="budgets" element={<BudgetsPage />} />
              <Route path="debts" element={<DebtsPage />} />
              <Route path="charts" element={<ChartsPage />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="net-worth" element={<NetWorthPage />} />
              <Route path="import-export" element={<ImportExportPage />} />
              <Route path="preferences" element={<PreferencesPage />} />
              <Route path="bank-sync" element={<BankSyncPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
