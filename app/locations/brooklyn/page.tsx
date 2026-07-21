import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Mortgage Broker in Brooklyn | Green Street Capital",
  description: "Your trusted mortgage broker in Brooklyn, NY. We help Brooklyn residents with home purchases, refinancing, and specialized loan programs. Licensed and experienced.",
};

export default function BrooklynLocation() {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-foreground mb-6">
            Mortgage Broker in Brooklyn
          </h1>
          <p className="text-xl text-muted-foreground">
            Helping Brooklyn residents achieve their homeownership dreams with personalized mortgage solutions
          </p>
        </div>
      </div>

      {/* Who We Help */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-montserrat font-bold text-foreground mb-6">
                Who We Help in Brooklyn
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Brooklyn's diverse housing market presents unique opportunities and challenges. We work with:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>First-time homebuyers navigating competitive neighborhoods like Park Slope, Williamsburg, and Brooklyn Heights</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Families looking to upgrade to larger homes in areas like Bay Ridge, Sheepshead Bay, and Midwood</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Investors interested in Brooklyn's growing rental market and multi-family properties</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Self-employed professionals and business owners with non-traditional income documentation</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8">
              <h3 className="text-2xl font-montserrat font-bold text-foreground mb-4">
                Why Brooklyn Chooses Us
              </h3>
              <p className="text-muted-foreground mb-6">
                Our Brooklyn office is located right here in the community, giving us deep local market knowledge and relationships that benefit our clients.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-medium">Local Brooklyn office on Coney Island Ave</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Knowledge of Brooklyn's diverse neighborhoods</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Experience with Brooklyn co-ops and condos</span>
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
            Mortgage Programs Available in Brooklyn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Conventional Loans",
                desc: "Traditional financing with competitive rates for qualified buyers in Brooklyn's established neighborhoods."
              },
              {
                title: "FHA Loans",
                desc: "Low down payment options perfect for first-time Brooklyn homebuyers with limited cash for down payment."
              },
              {
                title: "VA Loans",
                desc: "Exclusive benefits for Brooklyn veterans and active military personnel, including zero down payment options."
              },
              {
                title: "Bank Statement Loans",
                desc: "Ideal for Brooklyn's self-employed business owners and entrepreneurs who don't fit traditional income documentation."
              },
              {
                title: "DSCR Loans",
                desc: "Investment property financing based on rental income, perfect for Brooklyn's multi-family and investment properties."
              },
              {
                title: "Jumbo Loans",
                desc: "For luxury homes in Brooklyn's premium neighborhoods like Brooklyn Heights and Park Slope."
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
            Brooklyn Market Insights
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-muted/50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Co-op vs. Condo Financing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Brooklyn has a high concentration of cooperative buildings, which have different financing requirements than condos. Our team has extensive experience navigating co-op board requirements, building financials, and the specific documentation needed for co-op purchases. We guide you through the entire process to ensure smooth approval.
              </p>
            </div>
            <div className="bg-muted/50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Neighborhood-Specific Considerations</h3>
              <p className="text-muted-foreground leading-relaxed">
                From brownstones in Bed-Stuy to waterfront properties in Brooklyn Heights, each neighborhood has unique characteristics that affect financing. We understand local property values, building types, and the specific requirements of different Brooklyn areas, helping you make informed decisions about your mortgage options.
              </p>
            </div>
            <div className="bg-muted/50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Competitive Market Strategies</h3>
              <p className="text-muted-foreground leading-relaxed">
                Brooklyn's competitive real estate market requires quick action and strong pre-approvals. We provide rapid pre-approvals that sellers and co-op boards respect, giving you an edge in bidding situations. Our local relationships and understanding of Brooklyn's market dynamics help position you for success.
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
                q: "What makes Brooklyn mortgage financing different?",
                a: "Brooklyn has a high concentration of co-ops, which require board approval and have specific financial requirements. Additionally, property values vary significantly between neighborhoods, affecting loan-to-value ratios and jumbo loan thresholds."
              },
              {
                q: "Do you work with first-time homebuyers in Brooklyn?",
                a: "Absolutely. We specialize in helping first-time buyers navigate Brooklyn's complex market, from understanding co-op requirements to securing FHA and other first-time buyer programs with low down payments."
              },
              {
                q: "Can you help with investment properties in Brooklyn?",
                a: "Yes, we offer DSCR loans and other investment property financing options. Brooklyn's strong rental market makes it attractive for investors, and we have programs specifically designed for multi-family and investment properties."
              },
              {
                q: "How long does the mortgage process take in Brooklyn?",
                a: "Timeline varies by property type. Co-op purchases typically take 60-90 days due to board approval processes, while condos and single-family homes can close in 30-45 days. We work efficiently to keep your timeline on track."
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
            Ready to Start Your Brooklyn Home Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get pre-approved today and gain confidence in your home search.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply">
              <Button size="lg" className="w-full sm:w-auto">
                Apply Now
              </Button>
            </Link>
            <Link href="/team">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-foreground">
                Meet Our Brooklyn Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-montserrat font-bold text-center text-foreground mb-12">
            Contact Our Brooklyn Office
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
              <strong>Licensed in New York:</strong> Green Street Capital, LLC is licensed by the NYS Department of Financial Services to originate mortgage loans in Brooklyn and throughout New York State.
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
