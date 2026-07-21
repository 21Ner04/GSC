import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "DSCR Loans for Investors | Green Street Capital",
  description: "Debt Service Coverage Ratio loans for real estate investors. Qualify based on rental income instead of personal income. Perfect for investment properties.",
};

export default function DSCRLoansPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-foreground mb-6">
            DSCR Loans for Investors
          </h1>
          <p className="text-xl text-muted-foreground">
            Qualify based on rental income instead of personal income. Perfect for real estate investors building their portfolios.
          </p>
        </div>
      </div>

      {/* What Are DSCR Loans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-montserrat font-bold text-foreground mb-6">
                What Are DSCR Loans?
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  DSCR (Debt Service Coverage Ratio) loans allow real estate investors to qualify for financing based on the property's rental income rather than their personal income.
                </p>
                <p>
                  Instead of using your tax returns or W-2s, lenders calculate the property's cash flow and ensure it covers the mortgage payment. This makes it easier for investors to qualify, even if they have complex tax situations.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>No personal income verification required</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Based on property rental income</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Ideal for portfolio investors</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8">
              <h3 className="text-2xl font-montserrat font-bold text-foreground mb-4">
                Perfect For
              </h3>
              <p className="text-muted-foreground mb-6">
                DSCR loans are designed for real estate investors who want to qualify based on their property's performance.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Rental property investors</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Multi-family property owners</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Short-term rental investors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How DSCR Works */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-montserrat font-bold text-center text-foreground mb-12">
            How DSCR Calculation Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-foreground mb-3">The Formula</h3>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-center font-mono text-lg">
                  DSCR = Net Operating Income / Total Debt Service
                </p>
              </div>
              <p className="text-muted-foreground">
                A DSCR of 1.0 means the property's income exactly covers the mortgage. Most lenders prefer a DSCR of 1.25 or higher.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-foreground mb-3">Example</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Rental income: $3,000/month</li>
                <li>• Mortgage payment: $2,000/month</li>
                <li>• Taxes & insurance: $400/month</li>
                <li>• Total debt service: $2,400/month</li>
                <li>• <strong>DSCR: 1.25 (Good)</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-montserrat font-bold text-center text-foreground mb-12">
            Eligible Property Types
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Single-family rentals",
              "Multi-family properties",
              "Condos and townhomes",
              "Short-term rentals (Airbnb)",
              "Mixed-use properties",
              "Small commercial properties"
            ].map((type, i) => (
              <div key={i} className="bg-muted/50 p-6 rounded-2xl text-center">
                <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="font-medium text-foreground">{type}</p>
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
                q: "What DSCR ratio do I need?",
                a: "Most lenders require a minimum DSCR of 1.0-1.25. A DSCR of 1.0 means the property's income exactly covers the mortgage. Higher ratios of 1.25-1.5+ typically get better rates and terms."
              },
              {
                q: "Can I use short-term rental income?",
                a: "Yes, many DSCR programs allow short-term rental income from platforms like Airbnb and VRBO. These programs typically require 12 months of rental history to qualify."
              },
              {
                q: "Do I need to show personal income?",
                a: "No, DSCR loans are based on the property's income, not your personal income. This makes them ideal for investors with complex tax situations or those who want to keep their personal finances separate."
              },
              {
                q: "What down payment is required?",
                a: "DSCR loans typically require 20-30% down payment. The exact requirement depends on the property type, your credit score, and the specific lender's guidelines."
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
            Ready to Grow Your Investment Portfolio?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get pre-approved for a DSCR loan based on your property's rental income.
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
