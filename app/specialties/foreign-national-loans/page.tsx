import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Foreign National Loans | Green Street Capital",
  description: "Mortgage loans for foreign nationals buying U.S. real estate. Flexible documentation and no U.S. credit required. Perfect for international investors.",
};

export default function ForeignNationalLoansPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-foreground mb-6">
            Foreign National Loans
          </h1>
          <p className="text-xl text-muted-foreground">
            Mortgage financing for international buyers purchasing U.S. real estate. Flexible documentation and no U.S. credit required.
          </p>
        </div>
      </div>

      {/* Who We Help */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-montserrat font-bold text-foreground mb-6">
                International Buyer Solutions
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Foreign national loans are designed for international buyers who want to purchase U.S. real estate but don't have U.S. credit history or traditional U.S. income documentation.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>International investors purchasing U.S. property</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Foreign nationals buying vacation homes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Parents buying homes for children studying in the U.S.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Anyone without U.S. credit or income documentation</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8">
              <h3 className="text-2xl font-montserrat font-bold text-foreground mb-4">
                Why Foreign National Loans
              </h3>
              <p className="text-muted-foreground mb-6">
                Traditional U.S. mortgage lenders require U.S. credit history and income documentation that foreign nationals typically don't have. Foreign national loans solve this.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">No U.S. credit required</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Foreign income accepted</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Flexible documentation</span>
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
            Foreign National Loan Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Foreign National Portfolio Loans",
                desc: "Custom financing from private lenders who understand international buyers. Flexible terms and documentation requirements."
              },
              {
                title: "Asset-Based Loans",
                desc: "Qualify based on your global assets rather than income documentation. Perfect for high-net-worth international buyers."
              },
              {
                title: "ITIN Loans",
                desc: "For foreign nationals with ITIN numbers. Uses alternative credit documentation and foreign income verification."
              },
              {
                title: "Investment Property Loans",
                desc: "Specialized programs for foreign nationals purchasing U.S. investment properties and rental real estate."
              },
              {
                title: "Second Home Financing",
                desc: "For foreign nationals purchasing vacation homes or secondary residences in the U.S."
              },
              {
                title: "Commercial Foreign National",
                desc: "Financing for foreign nationals purchasing commercial real estate in the United States."
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
              <h3 className="text-xl font-bold text-foreground mb-4">Identity & Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Valid passport</li>
                <li>• Visa (if applicable)</li>
                <li>• ITIN number (if available)</li>
                <li>• Proof of foreign address</li>
              </ul>
            </div>
            <div className="bg-muted/50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Financial</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Foreign bank statements</li>
                <li>• Proof of foreign income</li>
                <li>• Asset documentation</li>
                <li>• Credit references from home country</li>
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
                q: "Do I need U.S. credit history?",
                a: "No, foreign national loans don't require U.S. credit history. Lenders use alternative documentation such as foreign credit reports, asset verification, and international bank statements to assess creditworthiness."
              },
              {
                q: "What down payment is required?",
                a: "Foreign national loans typically require 25-40% down payment. The exact requirement depends on the property type, your financial strength, and the specific lender's guidelines."
              },
              {
                q: "Can I use foreign income?",
                a: "Yes, foreign national loans accept income from foreign sources. Lenders will verify foreign income through tax returns, bank statements, or employment verification from your home country."
              },
              {
                q: "What property types can I purchase?",
                a: "Foreign nationals can purchase most property types including single-family homes, condos, multi-family properties, and commercial real estate. Some restrictions may apply to certain property types."
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
            Ready to Purchase U.S. Real Estate?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get pre-approved today with foreign national loan programs designed for international buyers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply">
              <Button size="lg" className="w-full sm:w-auto">
                Apply Now
              </Button>
            </Link>
            <Link href="/team">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-foreground">
                Speak with a Foreign National Specialist
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
