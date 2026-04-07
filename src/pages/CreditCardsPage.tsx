import { mockCreditCards } from "@/lib/mock-data";
import { CreditCard as CreditCardIcon } from "lucide-react";

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

export default function CreditCardsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Credit Cards</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockCreditCards.map(card => {
          const remaining = card.limit - card.used;
          const pct = Math.round((card.used / card.limit) * 100);
          return (
            <div key={card.id} className="gradient-primary rounded-xl p-6 text-primary-foreground">
              <div className="flex items-center justify-between mb-6">
                <CreditCardIcon className="w-8 h-8 opacity-80" />
                <span className="text-sm opacity-80">{card.name}</span>
              </div>
              <div className="text-3xl font-bold mb-1">{fmt(card.used)}</div>
              <div className="text-sm opacity-80 mb-4">of {fmt(card.limit)} limit</div>
              <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-primary-foreground/80 rounded-full" style={{ width: `${pct}%` }} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-80">Remaining: {fmt(remaining)}</span>
                <span className="opacity-80">Due: {card.dueDate}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
