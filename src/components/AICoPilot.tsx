import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockTransactions, monthlyComparison, mockBudgets } from "@/lib/mock-data";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
}

// Simple deterministic mock engine to simulate AI responses based on keywords
const getMockAIResponse = (query: string): string => {
  const qStr = query.toLowerCase();
  
  if (qStr.includes("dining") || qStr.includes("food") || qStr.includes("restaurant")) {
    const foodTotal = mockTransactions
      .filter(t => t.category === "Food & Dining" || t.category === "Groceries")
      .reduce((s, t) => s + t.amount, 0);
    return `Based on your recent transactions, you've spent **$${foodTotal.toFixed(2)}** on Food & Dining and Groceries. Want me to adjust your budget?`;
  }
  
  if (qStr.includes("afford") || qStr.includes("buy") || qStr.includes("can i")) {
    const recent = monthlyComparison[monthlyComparison.length - 1];
    const leftOvers = (recent?.income || 0) - (recent?.expenses || 0);
    if (leftOvers > 300) {
      return `Looking at your positive cash flow of $${leftOvers} this month, you seem to be in a safe position to make a purchase, provided it doesn't exceed your remaining flexible budget!`;
    }
    return `Right now, your margin is a bit tight with only $${leftOvers} remaining. I'd recommend holding off to keep your Safe-to-Spend limit healthy.`;
  }

  if (qStr.includes("budget") || qStr.includes("over")) {
    const over = mockBudgets.find(b => b.spent > b.total);
    if (over) {
      return `You are currently over budget in **${over.category}** by $${(over.spent - over.total).toFixed(2)}. I recommend reallocating funds from your Savings branch this month to cover the deficit.`;
    }
    return `All your budgets are currently looking very healthy and under limits! Excellent work.`;
  }

  if (qStr.includes("hello") || qStr.includes("hi")) {
    return "Hello! I am your AI Financial Co-Pilot. You can ask me questions about your spending, if you can afford things, or how your budgets look.";
  }

  return "I'm your prototype AI Assistant. I can only understand queries about 'dining', 'affording purchases', and 'budget statuses' right now. Once connected to a real backend API, I'll be able to answer anything!";
};

export function AICoPilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "ai", text: "Hi there! I'm your AI Financial Co-Pilot. Ask me anything about your finances!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate API delay
    setTimeout(() => {
      const response = getMockAIResponse(userMsg.text);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: "ai", text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-card w-[350px] sm:w-[400px] h-[500px] rounded-2xl shadow-2xl border border-border flex flex-col mb-4 overflow-hidden animate-in slide-in-from-bottom-4 zoom-in-95">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 p-4 text-primary-foreground flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary-foreground/80" />
              <span className="font-semibold">AI Co-Pilot</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:bg-primary/20 rounded-full" onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="flex flex-col gap-4">
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                    m.sender === "user" 
                      ? "bg-primary text-primary-foreground rounded-tr-sm" 
                      : "bg-muted text-foreground rounded-tl-sm border border-border"
                  }`}>
                    {/* Render basic bolding for markdown simulation */}
                    <span dangerouslySetInnerHTML={{__html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}}></span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground rounded-2xl rounded-tl-sm px-4 py-3 border border-border flex gap-1 items-center">
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
          
          {/* Input */}
          <div className="p-3 border-t border-border flex gap-2 items-center bg-muted/30">
            <Input 
              className="flex-1 bg-background border-border placeholder:text-muted-foreground"
              placeholder="Ask about your budget..." 
              value={input} 
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <Button size="icon" onClick={handleSend} disabled={!input.trim() || isTyping} className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 rounded-full w-10 h-10">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Toggle Button */}
      <Button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`w-14 h-14 rounded-full shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center ${isOpen ? 'bg-muted text-muted-foreground border border-border' : 'bg-primary text-primary-foreground'}`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </Button>
    </div>
  );
}
