import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Commission and Bonus Income Mortgages | Green Street Capital",
  description: "Mortgage loans for borrowers with commission and bonus income. We understand variable income structures and help you qualify using your full compensation.",
};

export default function CommissionBonusIncomePage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-foreground mb-6">
            Commission and Bonus Income Mortgages
          </h1>
          <p className="text-xl text-muted-foreground">
            Mortgage solutions for borrowers with variable income from commissions and bonuses. We understand your compensation structure.
          </p>
        </div>
      </div>

      {/* Who We Help */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-montserrat font-bold text-foreground mb-6">
                Understanding Variable Income
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  If you earn a significant portion of your income from commissions or bonuses, traditional mortgage lenders can make qualification difficult. We understand variable income structures and work with lenders who appreciate your full compensation package.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Sales professionals with commission income</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Real estate agents and brokers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Financial services professionals with bonuses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Anyone with significant variable compensation</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8">
              <h3 className="text-2xl font-montserrat font-bold text-foreground mb-4">
                Why It's Challenging
              </h3>
              <p className="text-muted-foreground mb-6">
                Traditional lenders average your income over 2 years, which can significantly reduce your qualifying amount if you've had a recent increase in commissions or bonuses.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Income averaging issues</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Fluctuating monthly income</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Complex tax returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-montserrat font-bold text-center text-foreground mb-12">
            Commission & Bonus Income Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Income Averaging Programs",
                desc: "Some lenders allow us to use your most recent year's income if it's higher than the 2-year average, helping you qualify for more."
              },
              {
                title: "Bank Statement Loans",
                desc: "Use your bank deposits to prove income when commission income fluctuates significantly month to month."
              },
              {
                title: "Portfolio Loans",
                desc: "Custom solutions from private lenders who understand commission-based compensation structures."
              },
              {
                title: "Conventional with Bonus Income",
                desc: "Traditional programs that properly document and calculate bonus income for qualification."
              },
              {
                title: "Asset-Based Qualification",
                desc: "Qualify using your assets and liquidity in addition to your commission and bonus income."
              },
              {
                title: "No Ratio Loans",
                desc: "No income verification required for qualified borrowers with strong credit, substantial assets, and significant down payments."
              }
            ].map((program, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-foreground mb-3">{program.title}</h3>
                <p className="text-muted-foreground">{program.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-montserrat font-bold text-center text-foreground mb-12">
            Documentation Requirements
          </h2>
          <div className="bg-muted/50 p-8 rounded-2xl">
            <ul className="space-y-3 text-muted-foreground">
              <li>• 2 years of tax returns</li>
              <li>• W-2s showing commission/bonus income</li>
              <li>• Recent pay stubs</li>
              <li>• Employment verification</li>
              <li>• Commission/bonus statements</li>
              <li>• Bank statements (may be required for some programs)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-montserrat font-bold text-center text-foreground mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "How is commission income calculated for mortgages?",
                a: "Traditional lenders average your commission income over 2 years. However, some programs allow us to use your most recent year if it's higher, or use bank statement analysis to better reflect your current earning power."
              },
              {
                q: "How much commission history do I need?",
                a: "Most lenders require 2 years of commission income history. However, if you're in the same line of work but recently started earning commissions, some programs may accept 1 year with compensating factors."
              },
              {
                q: "Do bonus payments count as income?",
                a: "Yes, bonus payments can count as income if they're consistent and documented. Lenders typically look for a 2-year history of bonus payments and may average them for qualification purposes."
              },
              {
                q: "What if my income has increased recently?",
                a: "If your commission or bonus income has increased significantly in the most recent year, some programs allow us to use the higher amount rather than the 2-year average. This can help you qualify for a larger loan."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-foreground mb-3">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-foreground text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
            Ready to Explore Your Options?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get pre-approved today with lenders who understand commission and bonus income.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply">
              <Button size="lg" className="w-full sm:w-auto">
                Apply Now
              </Button>
            </Link>
            <Link href="/team">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-foreground">
                Speak with a Loan Officer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-montserrat font-bold text-center text-foreground mb-12">
            Contact Us
          </h2>
          <div className="bg-muted/50 p-8 rounded-2xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+18556154545" className="text-foreground font-medium hover:text-primary transition-colors">
                  Toll Free: 855-615-4545
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:Info@GSCMortgage.com" className="text-foreground font-medium hover:text-primary transition-colors">
                  Info@GSCMortgage.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
