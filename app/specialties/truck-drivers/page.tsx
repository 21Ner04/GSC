import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Mortgages for Truck Drivers | Green Street Capital",
  description: "Specialized mortgage solutions for truck drivers with non-traditional income. We understand the trucking industry and offer flexible financing options.",
};

export default function TruckDriversPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-foreground mb-6">
            Mortgages for Truck Drivers
          </h1>
          <p className="text-xl text-muted-foreground">
            Specialized mortgage solutions for professional truck drivers with non-traditional income
          </p>
        </div>
      </div>

      {/* Who We Help */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-montserrat font-bold text-foreground mb-6">
                Understanding Truck Driver Income
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Traditional mortgage lenders often struggle with truck driver income structures. We understand the trucking industry and work with lenders who appreciate your unique financial situation.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Owner-operators with variable income based on miles and rates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Company drivers with per diem and bonus structures</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Team drivers with split income arrangements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Drivers with significant business expenses that reduce taxable income</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8">
              <h3 className="text-2xl font-montserrat font-bold text-foreground mb-4">
                Why Traditional Lenders Struggle
              </h3>
              <p className="text-muted-foreground mb-6">
                Traditional lenders look at W-2 income and tax returns, which often don't reflect your true earning power as a truck driver.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Variable income patterns</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Business expense deductions</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Per diem and reimbursements</span>
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
            Mortgage Programs for Truck Drivers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Bank Statement Loans",
                desc: "Use your bank statements to prove income instead of tax returns. Perfect for owner-operators whose taxable income doesn't reflect true earnings."
              },
              {
                title: "1099 Income Loans",
                desc: "For independent contractors and owner-operators with 1099 income. We look at your gross income, not just net taxable income."
              },
              {
                title: "Asset-Based Loans",
                desc: "Qualify based on your assets and liquidity rather than traditional income documentation."
              },
              {
                title: "No Ratio Loans",
                desc: "No income verification required for qualified borrowers with strong credit and substantial down payments."
              },
              {
                title: "Portfolio Loans",
                desc: "Custom solutions from private lenders who understand truck driver income structures."
              },
              {
                title: "FHA with Alternative Credit",
                desc: "For company drivers, we can use alternative credit documentation and non-traditional income verification."
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

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-montserrat font-bold text-center text-foreground mb-12">
            Our Truck Driver Mortgage Process
          </h2>
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Income Analysis",
                desc: "We review your bank statements, 1099s, settlement sheets, and other documentation to understand your true income potential."
              },
              {
                step: "2",
                title: "Program Matching",
                desc: "Based on your income structure and financial profile, we identify the best loan programs for your situation."
              },
              {
                step: "3",
                title: "Pre-Approval",
                desc: "We get you pre-approved with a lender who understands truck driver income, giving you confidence in your home search."
              },
              {
                step: "4",
                title: "Closing Support",
                desc: "We guide you through the entire process, handling documentation requirements and advocating for your approval."
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
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
                q: "Can truck drivers get approved for mortgages?",
                a: "Absolutely. While traditional lenders may struggle with truck driver income, we work with specialized lenders who understand the industry. Bank statement loans, 1099 programs, and other alternative documentation options make homeownership possible for truck drivers."
              },
              {
                q: "What documentation do truck drivers need?",
                a: "Documentation varies by program. Bank statement loans typically require 12-24 months of personal and business bank statements. 1099 loans need tax returns and 1099 forms. We'll guide you on exactly what's needed based on your chosen program."
              },
              {
                q: "Do per diem payments count as income?",
                a: "This depends on the loan program. Some programs count per diem, others don't. We work with lenders who understand truck driver compensation and can properly document all your income sources."
              },
              {
                q: "What if my taxable income is low due to business expenses?",
                a: "This is common for owner-operators and exactly why bank statement loans exist. We look at your gross deposits and business revenue, not just your taxable income after expenses."
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
            Ready to Start Your Home Buying Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get pre-approved today with lenders who understand truck driver income.
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
