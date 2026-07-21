import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Bank Statement Loans | Green Street Capital",
  description: "Bank statement mortgage loans for self-employed borrowers. Use bank deposits instead of tax returns to qualify for a mortgage. Flexible income documentation.",
};

export default function BankStatementLoansPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-foreground mb-6">
            Bank Statement Loans
          </h1>
          <p className="text-xl text-muted-foreground">
            Qualify using your bank deposits instead of tax returns. Perfect for self-employed borrowers and business owners.
          </p>
        </div>
      </div>

      {/* What Are Bank Statement Loans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-montserrat font-bold text-foreground mb-6">
                What Are Bank Statement Loans?
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Bank statement loans allow you to qualify for a mortgage using your bank deposits instead of traditional income documentation like W-2s or tax returns.
                </p>
                <p>
                  Instead of looking at your taxable income (which is often reduced by business expenses), lenders analyze your bank statement deposits to determine your true cash flow and ability to repay.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>No tax returns required for qualification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Uses actual bank deposits to prove income</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Ideal for business owners with significant write-offs</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8">
              <h3 className="text-2xl font-montserrat font-bold text-foreground mb-4">
                Who Benefits Most
              </h3>
              <p className="text-muted-foreground mb-6">
                Bank statement loans are designed for borrowers whose tax returns don't reflect their true earning power.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Business owners</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Self-employed professionals</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Independent contractors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-montserrat font-bold text-center text-foreground mb-12">
            How Bank Statement Loans Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Statement Review",
                desc: "Lenders review 12-24 months of personal and business bank statements to analyze your deposit patterns and cash flow."
              },
              {
                title: "Income Calculation",
                desc: "Your average monthly deposits are calculated and used to determine qualifying income, typically at 50-100% of deposits."
              },
              {
                title: "Loan Qualification",
                desc: "Using the calculated income, lenders determine your debt-to-income ratio and loan amount you qualify for."
              }
            ].map((step, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-montserrat font-bold text-center text-foreground mb-12">
            Typical Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-muted/50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Documentation</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 12-24 months bank statements</li>
                <li>• Business license (if applicable)</li>
                <li>• Proof of business existence</li>
                <li>• Valid ID</li>
              </ul>
            </div>
            <div className="bg-muted/50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Qualification</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Minimum credit score: 620+</li>
                <li>• Down payment: 10-20%</li>
                <li>• Debt-to-income ratio: Flexible</li>
                <li>• Reserves: 6-12 months</li>
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
                q: "How many months of bank statements do I need?",
                a: "Most programs require 12-24 months of personal and business bank statements. Some programs offer options with 12 months for a slightly higher rate, while others require 24 months for the best terms."
              },
              {
                q: "What percentage of deposits count as income?",
                a: "This varies by program. Typically, lenders use 50-100% of your average monthly deposits as qualifying income. Personal bank statements usually qualify at 100%, while business statements may qualify at 50%."
              },
              {
                q: "Are bank statement loans more expensive?",
                a: "Interest rates for bank statement loans are typically slightly higher than traditional loans, but still very competitive. The exact rate depends on your credit score, down payment, and the specific program."
              },
              {
                q: "Can I use both personal and business statements?",
                a: "Yes, many programs allow you to use both personal and business bank statements to maximize your qualifying income. This can be especially helpful for business owners who mix personal and business finances."
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
            Ready to Explore Bank Statement Loans?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get pre-approved today using your bank deposits instead of tax returns.
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
