import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Mortgage Broker in Manhattan | Green Street Capital",
  description: "Your trusted mortgage broker in Manhattan, NYC. Expert guidance for luxury condos, co-ops, and high-value properties with competitive jumbo loan rates.",
};

export default function ManhattanLocation() {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-foreground mb-6">
            Mortgage Broker in Manhattan
          </h1>
          <p className="text-xl text-muted-foreground">
            Expert guidance for Manhattan's luxury real estate market and high-value properties
          </p>
        </div>
      </div>

      {/* Who We Help */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-montserrat font-bold text-foreground mb-6">
                Who We Help in Manhattan
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Manhattan's luxury real estate market requires specialized expertise. We work with:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Luxury buyers in prime neighborhoods like Upper East Side, Upper West Side, and Tribeca</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Professionals purchasing pied-à-terres in SoHo, Chelsea, and Greenwich Village</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Investors interested in Manhattan's high-end rental properties</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>International buyers navigating U.S. mortgage requirements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>High-net-worth individuals requiring jumbo and super-jumbo financing</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8">
              <h3 className="text-2xl font-montserrat font-bold text-foreground mb-4">
                Manhattan Expertise
              </h3>
              <p className="text-muted-foreground mb-6">
                Manhattan's luxury market demands sophisticated financing solutions. We have the expertise and lender relationships to handle complex transactions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Jumbo loan specialists</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Co-op board expertise</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Luxury condo financing</span>
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
            Manhattan Mortgage Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Jumbo Loans",
                desc: "For Manhattan's luxury market with loan amounts above conventional limits, featuring competitive rates and flexible terms."
              },
              {
                title: "Super Jumbo Loans",
                desc: "For ultra-high-value properties in prime Manhattan locations, with personalized service and custom solutions."
              },
              {
                title: "Co-op Financing",
                desc: "Expertise in Manhattan's cooperative buildings, understanding board requirements and building financials."
              },
              {
                title: "Luxury Condo Loans",
                desc: "Financing for Manhattan's premier condominium developments with streamlined approval processes."
              },
              {
                title: "Foreign National Loans",
                desc: "For international buyers purchasing Manhattan real estate, with flexible documentation requirements."
              },
              {
                title: "Portfolio Loans",
                desc: "Custom solutions for high-net-worth clients who don't fit traditional lending criteria."
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
            Manhattan Market Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-muted/50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Co-op Board Requirements</h3>
              <p className="text-muted-foreground leading-relaxed">
                Manhattan co-ops have some of the strictest board requirements in the country. Boards typically require significant liquidity after closing, debt-to-income ratios below 25%, and thorough background checks. We prepare comprehensive financial packages that meet even the most demanding board standards.
              </p>
            </div>
            <div className="bg-muted/50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Building Lender Lists</h3>
              <p className="text-muted-foreground leading-relaxed">
                Many Manhattan buildings maintain approved lender lists. We maintain relationships with buildings and understand their preferred lenders. When buildings require specific lenders, we work within their requirements while advocating for our clients' best interests.
              </p>
            </div>
            <div className="bg-muted/50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Appraisal Challenges</h3>
              <p className="text-muted-foreground leading-relaxed">
                Manhattan's unique properties can present appraisal challenges. From pre-war buildings to new luxury developments, we work with appraisers who understand Manhattan's market nuances and can accurately value distinctive properties.
              </p>
            </div>
            <div className="bg-muted/50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Pied-à-Terre Financing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Manhattan is a popular market for secondary homes and pied-à-terres. We offer financing solutions specifically designed for non-primary residences, understanding the unique considerations and requirements for these purchases.
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
                q: "What are typical Manhattan co-op board requirements?",
                a: "Most Manhattan co-ops require 20-50% down payments, post-closing liquidity of 6-24 months of housing costs, debt-to-income ratios below 25%, and thorough financial background checks. We help you prepare comprehensive packages that meet these strict standards."
              },
              {
                q: "Do you offer jumbo loans for Manhattan properties?",
                a: "Yes, we specialize in jumbo and super-jumbo loans for Manhattan's luxury market. We work with lenders who understand Manhattan's unique property values and offer competitive rates for high-value transactions."
              },
              {
                q: "Can you help international buyers purchase in Manhattan?",
                a: "Absolutely. We offer foreign national programs with flexible documentation requirements. We understand the unique challenges international buyers face and guide them through U.S. mortgage requirements."
              },
              {
                q: "How long does Manhattan co-op financing take?",
                a: "Co-op purchases typically take 60-90 days due to board approval processes. The financing itself can be completed in 30-45 days, but board interviews and approval add significant time. We work efficiently to minimize delays."
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
            Ready to Finance Your Manhattan Dream Home?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get pre-approved today and gain confidence in Manhattan's competitive luxury market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply">
              <Button size="lg" className="w-full sm:w-auto">
                Apply Now
              </Button>
            </Link>
            <Link href="/team">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-foreground">
                Meet Our Manhattan Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-montserrat font-bold text-center text-foreground mb-12">
            Contact Our Manhattan Team
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
                    <span className="text-muted-foreground">Serving Manhattan and all NYC boroughs</span>
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
              <strong>Licensed in New York:</strong> Green Street Capital, LLC is licensed by the NYS Department of Financial Services to originate mortgage loans in Manhattan and throughout New York State.
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
