import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockTransactions } from "@/lib/mock-data";

const fmt = (n: number) => "$" + n.toFixed(2);
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1));
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const expensesByDay: Record<number, number> = {};
  mockTransactions.filter(t => t.type === "expense").forEach(t => {
    const d = new Date(t.date);
    if (d.getMonth() === month && d.getFullYear() === year) {
      expensesByDay[d.getDate()] = (expensesByDay[d.getDate()] || 0) + t.amount;
    }
  });

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
      <div className="bg-card rounded-xl card-shadow p-5">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" onClick={() => setCurrentDate(new Date(year, month - 1, 1))}><ChevronLeft className="w-5 h-5" /></Button>
          <h2 className="text-lg font-semibold text-card-foreground">{months[month]} {year}</h2>
          <Button variant="ghost" size="icon" onClick={() => setCurrentDate(new Date(year, month + 1, 1))}><ChevronRight className="w-5 h-5" /></Button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
            <div key={d} className="text-xs font-medium text-muted-foreground py-2">{d}</div>
          ))}
          {days.map((day, i) => (
            <div key={i} className={`p-2 min-h-[60px] rounded-lg text-sm ${day ? "border border-border hover:bg-muted/50 transition-colors" : ""}`}>
              {day && (
                <>
                  <div className="font-medium text-card-foreground">{day}</div>
                  {expensesByDay[day] && (
                    <div className="text-xs text-destructive font-medium mt-1">-{fmt(expensesByDay[day])}</div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
