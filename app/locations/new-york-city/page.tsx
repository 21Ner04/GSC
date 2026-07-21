import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Mortgage Broker in New York City | Green Street Capital",
  description: "Your trusted mortgage broker in New York City. We help NYC residents with home purchases, refinancing, and specialized loan programs across all five boroughs.",
};

export default function NewYorkCityLocation() {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-foreground mb-6">
            Mortgage Broker in New York City
          </h1>
          <p className="text-xl text-muted-foreground">
            Serving all five boroughs with expert mortgage guidance and competitive rates
          </p>
        </div>
      </div>

      {/* Who We Help */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-montserrat font-bold text-foreground mb-6">
                Who We Help in NYC
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  New York City's real estate market is complex and diverse. We serve clients across all five boroughs:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Manhattan buyers navigating luxury condos and co-ops in prime locations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Brooklyn families seeking homes in established and up-and-coming neighborhoods</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Queens residents looking for single-family homes and multi-family investments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Bronx first-time buyers finding affordable homeownership opportunities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Staten Island homeowners looking to refinance or upgrade</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8">
              <h3 className="text-2xl font-montserrat font-bold text-foreground mb-4">
                NYC Mortgage Expertise
              </h3>
              <p className="text-muted-foreground mb-6">
                With deep experience across all NYC boroughs, we understand the unique challenges of New York real estate financing.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">All five boroughs served</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Co-op and condo specialists</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Jumbo loan expertise</span>
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
            NYC Mortgage Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Conventional Loans",
                desc: "Traditional financing for NYC's diverse property types, from condos to single-family homes."
              },
              {
                title: "Jumbo Loans",
                desc: "For Manhattan's luxury market and high-value properties across all boroughs."
              },
              {
                title: "Co-op Financing",
                desc: "Specialized expertise in NYC's unique cooperative housing market and board requirements."
              },
              {
                title: "FHA Loans",
                desc: "Low down payment options perfect for first-time buyers in NYC's competitive market."
              },
              {
                title: "VA Loans",
                desc: "Zero down options for NYC veterans and military personnel."
              },
              {
                title: "Investment Property Loans",
                desc: "DSCR and other programs for NYC's strong rental market and multi-family investments."
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

      {/* Local Market Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-montserrat font-bold text-center text-foreground mb-12">
            NYC Market Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-muted/50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Co-op vs. Condo</h3>
              <p className="text-muted-foreground leading-relaxed">
                NYC has the nation's highest concentration of cooperative housing. Co-ops require board approval, have strict financial requirements, and often demand higher down payments. Condos offer more flexibility but typically cost more. We guide you through both processes with expertise.
              </p>
            </div>
            <div className="bg-muted/50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Borough Differences</h3>
              <p className="text-muted-foreground leading-relaxed">
                Each borough has distinct characteristics. Manhattan commands premium prices with luxury condos. Brooklyn offers diverse neighborhoods from brownstones to new developments. Queens provides more space for the money. The Bronx offers affordability. Staten Island has suburban-style living. We tailor financing to each borough's market.
              </p>
            </div>
            <div className="bg-muted/50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Building Requirements</h3>
              <p className="text-muted-foreground leading-relaxed">
                NYC buildings often have specific financing requirements. Some buildings only allow cash buyers, others have minimum down payment rules, and many require specific lender approvals. We maintain relationships with buildings and understand their requirements to ensure smooth closings.
              </p>
            </div>
            <div className="bg-muted/50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Competitive Market</h3>
              <p className="text-muted-foreground leading-relaxed">
                NYC's competitive market requires strong pre-approvals and quick action. We provide rapid pre-approvals that sellers and boards respect. Our understanding of local market dynamics helps position you for success in bidding situations.
              </p>
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
                q: "What's the difference between NYC co-ops and condos?",
                a: "Co-ops involve purchasing shares in a corporation that owns the building, requiring board approval and often stricter financial requirements. Condos involve direct property ownership with more flexibility but typically higher prices. We help you navigate both."
              },
              {
                q: "Do you work with first-time buyers in NYC?",
                a: "Yes, we specialize in helping first-time buyers navigate NYC's complex market. We offer FHA loans, first-time buyer programs, and guidance on affordable homeownership opportunities across all boroughs."
              },
              {
                q: "Can you help with jumbo loans in Manhattan?",
                a: "Absolutely. We have extensive experience with Manhattan's luxury market and jumbo loan requirements. We work with lenders who specialize in high-value properties and understand Manhattan's unique building requirements."
              },
              {
                q: "How long does the NYC mortgage process take?",
                a: "Timeline varies by property type. Co-op purchases typically take 60-90 days due to board approval. Condos and single-family homes can close in 30-45 days. We work efficiently to keep your timeline on track."
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
            Ready to Navigate NYC's Mortgage Market?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get pre-approved today and gain confidence in your NYC home search.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply">
              <Button size="lg" className="w-full sm:w-auto">
                Apply Now
              </Button>
            </Link>
            <Link href="/team">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-foreground">
                Meet Our NYC Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-montserrat font-bold text-center text-foreground mb-12">
            Contact Our NYC Office
          </h2>
          <div className="bg-muted/50 p-8 rounded-2xl">
            <div className="space-y-6">
              <div>
                <h3 className="font-montserrat font-bold text-xl text-foreground mb-2">
                  Green Street Capital, LLC
                </h3>
                <p className="text-sm text-muted-foreground">NMLS #2066586</p>
              </div>
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <p className="text-foreground font-medium">
                    2709 Coney Island Ave, 3rd Floor
                    <br />
                    Brooklyn, NY 11235
                    <br />
                    <span className="text-muted-foreground">Serving all NYC boroughs</span>
                  </p>
                </div>
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
        </div>
      </section>

      {/* Licensing */}
      <section className="py-12 bg-muted border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs text-muted-foreground leading-relaxed space-y-2">
            <p>
              <strong>Licensed in New York:</strong> Green Street Capital, LLC is licensed by the NYS Department of Financial Services to originate mortgage loans in New York City and throughout New York State.
            </p>
            <p>
              <strong>Equal Housing Lender:</strong> We do business in accordance with the Federal Fair Housing Law and the Equal Credit Opportunity Act.
            </p>
            <p className="pt-2">
              <strong>Disclaimer:</strong> This is not a commitment to lend. All loan programs subject to credit approval and property appraisal. Terms and conditions apply. Contact us for complete details.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
