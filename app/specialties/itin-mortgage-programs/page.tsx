import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "ITIN Mortgage Programs | Green Street Capital",
  description: "ITIN mortgage loans for borrowers without Social Security numbers. Home financing for undocumented immigrants using ITIN numbers. Alternative documentation accepted.",
};

export default function ITINMortgageProgramsPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-foreground mb-6">
            ITIN Mortgage Programs
          </h1>
          <p className="text-xl text-muted-foreground">
            Home financing for borrowers without Social Security numbers. Use your ITIN to qualify for a mortgage.
          </p>
        </div>
      </div>

      {/* What Are ITIN Loans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-montserrat font-bold text-foreground mb-6">
                What Are ITIN Mortgage Programs?
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  ITIN (Individual Taxpayer Identification Number) mortgage programs allow borrowers without Social Security numbers to qualify for home financing using their ITIN instead.
                </p>
                <p>
                  These programs are designed for undocumented immigrants, foreign nationals, and anyone who doesn't have a Social Security number but has an ITIN and can demonstrate the ability to repay a mortgage.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>No Social Security number required</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Uses ITIN for identification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Alternative documentation accepted</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8">
              <h3 className="text-2xl font-montserrat font-bold text-foreground mb-4">
                Who Qualifies
              </h3>
              <p className="text-muted-foreground mb-6">
                ITIN mortgage programs are designed for borrowers who have an ITIN but don't have a Social Security number.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Undocumented immigrants</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Foreign nationals with ITIN</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Anyone without SSN</span>
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
            ITIN Mortgage Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "ITIN FHA Loans",
                desc: "FHA-insured loans for ITIN borrowers with 3.5% down payment and competitive rates."
              },
              {
                title: "ITIN Conventional Loans",
                desc: "Conventional financing for ITIN borrowers with good credit and stable income history."
              },
              {
                title: "ITIN Portfolio Loans",
                desc: "Custom financing from private lenders with flexible terms and documentation requirements."
              },
              {
                title: "Bank Statement ITIN Loans",
                desc: "Use bank statements to prove income instead of traditional tax documentation."
              },
              {
                title: "ITIN Investment Property",
                desc: "Financing for ITIN borrowers purchasing rental and investment properties."
              },
              {
                title: "ITIN Cash-Out Refinance",
                desc: "Access your home equity with cash-out refinancing options for ITIN borrowers."
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
                <li>• Valid ITIN number</li>
                <li>• Foreign passport or ID</li>
                <li>• Proof of address</li>
                <li>• Work authorization (if applicable)</li>
              </ul>
            </div>
            <div className="bg-muted/50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Financial</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Tax returns with ITIN</li>
                <li>• Bank statements</li>
                <li>• Proof of income</li>
                <li>• Alternative credit references</li>
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
                q: "Can I get a mortgage without a Social Security number?",
                a: "Yes, ITIN mortgage programs allow you to qualify using your Individual Taxpayer Identification Number instead of a Social Security number. These programs are specifically designed for borrowers without SSNs."
              },
              {
                q: "What credit score do I need for an ITIN loan?",
                a: "Credit score requirements vary by program. Some ITIN programs accept alternative credit documentation like rent payments, utility bills, and other non-traditional credit references. Others may require a minimum credit score of 580-620+."
              },
              {
                q: "What down payment is required?",
                a: "Down payment requirements vary by program. FHA ITIN loans require 3.5% down, while conventional and portfolio programs may require 10-20% down. The exact requirement depends on the program and your financial profile."
              },
              {
                q: "Can I use foreign income for ITIN loans?",
                a: "Yes, many ITIN programs accept foreign income. Lenders will verify foreign income through tax returns, bank statements, or employment verification. This makes ITIN loans accessible to borrowers who earn income outside the U.S."
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
            Ready to Explore ITIN Mortgage Options?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get pre-approved today with ITIN mortgage programs designed for your situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply">
              <Button size="lg" className="w-full sm:w-auto">
                Apply Now
              </Button>
            </Link>
            <Link href="/team">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-foreground">
                Speak with an ITIN Specialist
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
