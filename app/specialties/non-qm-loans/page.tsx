import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Non-QM Loans | Green Street Capital",
  description: "Non-Qualified Mortgage loans for borrowers who don't fit traditional lending criteria. Flexible income documentation, alternative credit, and custom solutions.",
};

export default function NonQMLoansPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-foreground mb-6">
            Non-QM Loans
          </h1>
          <p className="text-xl text-muted-foreground">
            Flexible mortgage solutions for borrowers who don't fit traditional lending criteria. Custom underwriting for unique situations.
          </p>
        </div>
      </div>

      {/* What Are Non-QM Loans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-montserrat font-bold text-foreground mb-6">
                What Are Non-QM Loans?
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Non-QM (Non-Qualified Mortgage) loans are mortgage products that don't meet the Consumer Financial Protection Bureau's Qualified Mortgage rules. This flexibility allows lenders to serve borrowers who don't fit traditional lending criteria.
                </p>
                <p>
                  While these loans don't meet QM standards, they're still fully documented and underwritten. They simply offer more flexibility in income verification, credit requirements, and property types.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Flexible income documentation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Alternative credit consideration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Higher debt-to-income ratios allowed</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8">
              <h3 className="text-2xl font-montserrat font-bold text-foreground mb-4">
                Who Benefits from Non-QM
              </h3>
              <p className="text-muted-foreground mb-6">
                Non-QM loans are designed for borrowers with unique financial situations that don't fit traditional lending boxes.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Self-employed borrowers</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Real estate investors</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Foreign nationals</span>
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
            Non-QM Loan Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Bank Statement Loans",
                desc: "Use bank deposits instead of tax returns to prove income. Perfect for self-employed borrowers."
              },
              {
                title: "DSCR Loans",
                desc: "Qualify based on property rental income instead of personal income. Ideal for real estate investors."
              },
              {
                title: "Asset-Based Loans",
                desc: "Qualify using your liquid assets by calculating a monthly income from your asset base."
              },
              {
                title: "Interest-Only Loans",
                desc: "Lower monthly payments with interest-only periods. Good for cash flow management."
              },
              {
                title: "No Ratio Loans",
                desc: "No income verification required for qualified borrowers with strong credit and substantial down payments."
              },
              {
                title: "Foreign National Loans",
                desc: "For international buyers without U.S. credit or income documentation."
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

      {/* When to Consider */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-montserrat font-bold text-center text-foreground mb-12">
            When to Consider Non-QM Loans
          </h2>
          <div className="space-y-6">
            {[
              {
                title: "Self-Employed with Complex Taxes",
                desc: "Your tax returns show low income due to business expenses, but your actual cash flow is strong."
              },
              {
                title: "Real Estate Investors",
                desc: "You want to qualify based on rental income rather than personal W-2 income."
              },
              {
                title: "Recent Life Changes",
                desc: "You've changed jobs, started a business, or had other recent changes that affect traditional qualification."
              },
              {
                title: "Credit Challenges",
                desc: "You have good reasons for past credit issues and strong compensating factors like large down payment or assets."
              }
            ].map((item, i) => (
              <div key={i} className="bg-muted/50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
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
                q: "Are Non-QM loans safe?",
                a: "Yes, Non-QM loans are fully documented and underwritten loans from legitimate lenders. They simply don't meet the QM definition, which allows for more flexibility. They're not subprime loans from the pre-2008 era."
              },
              {
                q: "What interest rates can I expect?",
                a: "Non-QM loan rates are typically slightly higher than conventional QM loans, reflecting the additional flexibility and risk. Rates vary based on the specific program, your credit, down payment, and overall financial profile."
              },
              {
                q: "What down payment is required?",
                a: "Down payment requirements vary by program but typically range from 20-40%. The exact requirement depends on the specific Non-QM program, your credit score, and the property type."
              },
              {
                q: "Can I refinance a Non-QM loan later?",
                a: "Yes, you can refinance a Non-QM loan into a conventional loan once you qualify. This is common for self-employed borrowers who build their business income over time and later qualify for traditional financing."
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
            Ready to Explore Non-QM Options?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get pre-approved today with flexible Non-QM loan programs designed for your unique situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply">
              <Button size="lg" className="w-full sm:w-auto">
                Apply Now
              </Button>
            </Link>
            <Link href="/team">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-foreground">
                Speak with a Non-QM Specialist
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
