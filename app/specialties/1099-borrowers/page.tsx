import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "1099 Borrower Mortgages | Green Street Capital",
  description: "Mortgage loans for 1099 income earners. Qualify using your 1099 income instead of tax returns. Perfect for independent contractors and freelancers.",
};

export default function I099BorrowersPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-foreground mb-6">
            1099 Borrower Mortgages
          </h1>
          <p className="text-xl text-muted-foreground">
            Qualify using your 1099 income instead of tax returns. Perfect for independent contractors and freelancers.
          </p>
        </div>
      </div>

      {/* Who We Help */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-montserrat font-bold text-foreground mb-6">
                Mortgage Solutions for 1099 Earners
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  If you receive 1099 income instead of a W-2, traditional mortgage lenders can make qualification difficult. We specialize in helping 1099 earners get approved with programs designed for your income structure.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Independent contractors and freelancers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Consultants and gig economy workers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Sales professionals with commission income</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Anyone with significant 1099 income</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8">
              <h3 className="text-2xl font-montserrat font-bold text-foreground mb-4">
                Why 1099 Loans Matter
              </h3>
              <p className="text-muted-foreground mb-6">
                Traditional lenders focus on adjusted gross income from tax returns, which often doesn't reflect your true earning power as a 1099 earner.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Uses gross 1099 income</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Flexible expense treatment</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Multiple program options</span>
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
            1099 Mortgage Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "1099 Income Loans",
                desc: "Use your 1099 forms to prove income. We look at your gross 1099 income, not just net taxable income after expenses."
              },
              {
                title: "Bank Statement Loans",
                desc: "Use bank deposits to prove income when 1099s don't tell the full story. Perfect for mixed income sources."
              },
              {
                title: "P&L Statement Loans",
                desc: "Use your business profit and loss statements to demonstrate income strength and cash flow."
              },
              {
                title: "Portfolio Loans",
                desc: "Custom solutions from private lenders who understand 1099 income structures and independent contractor status."
              },
              {
                title: "Conventional with 1099",
                desc: "Some conventional programs allow 1099 income qualification with proper documentation and history."
              },
              {
                title: "FHA with Alternative Credit",
                desc: "For 1099 earners with limited credit history, we can use alternative credit documentation."
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
              <li>• 2 years of 1099 forms</li>
              <li>• 2 years of tax returns</li>
              <li>• Current year profit & loss statement</li>
              <li>• Business license or contracts</li>
              <li>• Proof of ongoing work (contracts, invoices)</li>
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
                q: "How long do I need to have 1099 income?",
                a: "Most lenders require 2 years of 1099 income history. However, some programs may accept 1 year with compensating factors like strong credit, large down payment, or significant assets."
              },
              {
                q: "Do business expenses hurt my qualification?",
                a: "Traditional lenders subtract expenses from your 1099 income, which can hurt. However, bank statement loans and other alternative programs look at your gross deposits, giving you credit for your full revenue."
              },
              {
                q: "Can I combine 1099 and W-2 income?",
                a: "Yes, if you have both 1099 and W-2 income, we can use both to qualify. This can actually strengthen your application by showing diverse income sources."
              },
              {
                q: "What if I'm newly self-employed?",
                a: "If you have less than 2 years of 1099 history, we may still be able to help through bank statement loans, asset-based programs, or portfolio loans that don't require traditional income history."
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
            Ready to Explore Your 1099 Mortgage Options?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get pre-approved today with lenders who understand 1099 income.
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
