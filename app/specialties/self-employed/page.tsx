import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Mortgages for Self-Employed Borrowers | Green Street Capital",
  description: "Specialized mortgage solutions for self-employed borrowers. Bank statement loans, 1099 programs, and flexible income documentation for entrepreneurs and business owners.",
};

export default function SelfEmployedPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-foreground mb-6">
            Mortgages for Self-Employed Borrowers
          </h1>
          <p className="text-xl text-muted-foreground">
            Flexible mortgage solutions designed for entrepreneurs, business owners, and self-employed professionals
          </p>
        </div>
      </div>

      {/* Who We Help */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-montserrat font-bold text-foreground mb-6">
                Self-Employed Mortgage Solutions
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Being self-employed shouldn't disqualify you from homeownership. We specialize in helping self-employed borrowers navigate mortgage financing with alternative documentation options.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Business owners with complex tax returns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Freelancers and independent contractors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Consultants and professionals with 1099 income</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Entrepreneurs with significant business expenses</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8">
              <h3 className="text-2xl font-montserrat font-bold text-foreground mb-4">
                Beyond Traditional Lending
              </h3>
              <p className="text-muted-foreground mb-6">
                Traditional lenders focus on tax returns, which often don't tell the full story for self-employed borrowers. We look at the bigger picture.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Bank statement analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Business revenue consideration</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Asset-based qualification</span>
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
            Self-Employed Mortgage Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Bank Statement Loans",
                desc: "Use 12-24 months of bank statements to prove income instead of tax returns. Perfect for business owners whose taxable income doesn't reflect true earnings."
              },
              {
                title: "1099 Income Loans",
                desc: "For independent contractors with 1099 income. We look at your gross 1099 income, not just net taxable income after expenses."
              },
              {
                title: "Profit & Loss Loans",
                desc: "Use your business P&L statements to demonstrate income strength and cash flow."
              },
              {
                title: "Asset Depletion Loans",
                desc: "Qualify using your liquid assets by calculating a monthly income from your asset base."
              },
              {
                title: "Portfolio Loans",
                desc: "Custom solutions from private lenders who understand self-employed income structures and business ownership."
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-muted/50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Bank Statement Loans</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 12-24 months personal bank statements</li>
                <li>• 12-24 months business bank statements</li>
                <li>• Business license (if applicable)</li>
                <li>• Proof of business existence</li>
              </ul>
            </div>
            <div className="bg-muted/50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">1099 Income Loans</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 2 years tax returns</li>
                <li>• 2 years 1099 forms</li>
                <li>• Current year P&L statement</li>
                <li>• Business license or contracts</li>
              </ul>
            </div>
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
                q: "Can self-employed people get mortgages?",
                a: "Absolutely. While traditional lenders may be stricter with self-employed borrowers, we specialize in alternative documentation loans. Bank statement programs, 1099 loans, and other options make homeownership very achievable for self-employed individuals."
              },
              {
                q: "How many months of bank statements do I need?",
                a: "Most bank statement programs require 12-24 months of personal and business bank statements. The exact requirement depends on the specific program and lender. We'll help you determine which option works best with your documentation."
              },
              {
                q: "Do business expenses hurt my approval?",
                a: "Traditional lenders subtract business expenses from your income, which can hurt approval. Bank statement loans look at your gross deposits before expenses, giving you credit for your full business revenue."
              },
              {
                q: "What interest rates can self-employed borrowers expect?",
                a: "Interest rates for alternative documentation loans are typically slightly higher than traditional loans, but still very competitive. The exact rate depends on your credit score, down payment, and the specific program you choose."
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
            Get pre-approved today with lenders who understand self-employed income.
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
