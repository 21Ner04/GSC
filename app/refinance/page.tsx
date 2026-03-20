import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrendingDown, Coins, CalendarDays, RefreshCw } from "lucide-react";

export const metadata = { title: "Refinance | Green Street Capital" };

export default function Refinance() {
  return (
    <div className="w-full">
      <div className="bg-secondary py-20 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Refinance Your Home</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Lower your payments, shorten your term, or access your home's equity.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-serif font-bold mb-6 text-foreground">Is it the right time to refinance?</h2>
          <p className="text-lg text-muted-foreground">Refinancing replaces your current mortgage with a new one, often with better terms. We can run the numbers to see if it makes sense for you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
              <RefreshCw className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Rate & Term Refinance</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">The most common type of refinance. Secure a lower interest rate, change the loan duration, or switch from an adjustable to a fixed rate.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-sm font-medium"><TrendingDown className="w-5 h-5 mr-3 text-primary" /> Lower monthly payments</li>
              <li className="flex items-center text-sm font-medium"><CalendarDays className="w-5 h-5 mr-3 text-primary" /> Pay off loan faster</li>
            </ul>
            <Link href="/apply"><Button className="w-full">Explore Rate & Term</Button></Link>
          </div>

          <div className="bg-foreground text-white p-10 rounded-3xl shadow-xl">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
              <Coins className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Cash-Out Refinance</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">Tap into the equity you've built in your home. A cash-out refinance replaces your mortgage with a larger loan, giving you the difference in cash.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-sm font-medium text-gray-200"><Coins className="w-5 h-5 mr-3 text-secondary" /> Fund home renovations</li>
              <li className="flex items-center text-sm font-medium text-gray-200"><RefreshCw className="w-5 h-5 mr-3 text-secondary" /> Consolidate high-interest debt</li>
            </ul>
            <Link href="/apply"><Button variant="secondary" className="w-full">Explore Cash-Out</Button></Link>
          </div>
        </div>

        <div className="bg-muted p-12 rounded-3xl text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">Want to see how much you could save?</h2>
          <p className="text-muted-foreground mb-8">Schedule a brief 15-minute call. We'll run a free, no-obligation cost-benefit analysis.</p>
          <Link href="/schedule"><Button size="lg" className="px-12">Schedule a Free Analysis</Button></Link>
        </div>
      </div>
    </div>
  );
}
