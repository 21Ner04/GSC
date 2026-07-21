import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Mortgage Broker in New Jersey | Green Street Capital",
  description: "Your trusted mortgage broker in New Jersey. We help NJ residents with home purchases, refinancing, and specialized loan programs across the Garden State.",
};

export default function NewJerseyLocation() {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-foreground mb-6">
            Mortgage Broker in New Jersey
          </h1>
          <p className="text-xl text-muted-foreground">
            Helping New Jersey residents achieve homeownership with competitive rates and personalized service
          </p>
        </div>
      </div>

      {/* Who We Help */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-montserrat font-bold text-foreground mb-6">
                Who We Help in New Jersey
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  New Jersey's diverse housing market offers opportunities for all types of buyers. We serve clients across the state:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Commuters purchasing homes in NJ suburbs with easy NYC access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Families in suburban communities like Bergen, Morris, and Monmouth counties</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>First-time buyers finding affordable options in South Jersey</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Shore buyers investing in coastal properties at the Jersey Shore</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Refinancing homeowners looking to lower rates or tap equity</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8">
              <h3 className="text-2xl font-montserrat font-bold text-foreground mb-4">
                New Jersey Expertise
              </h3>
              <p className="text-muted-foreground mb-6">
                We understand New Jersey's unique market, from suburban communities to shore properties, and everything in between.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">All NJ counties served</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Shore property specialists</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Suburban market knowledge</span>
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
            New Jersey Mortgage Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Conventional Loans",
                desc: "Traditional financing for New Jersey's diverse housing stock, from suburban homes to shore properties."
              },
              {
                title: "FHA Loans",
                desc: "Low down payment options perfect for first-time buyers across New Jersey."
              },
              {
                title: "VA Loans",
                desc: "Exclusive benefits for New Jersey veterans and military personnel."
              },
              {
                title: "NJHMFA Programs",
                desc: "New Jersey Housing and Mortgage Finance Agency programs for first-time buyers and affordable housing."
              },
              {
                title: "Investment Property Loans",
                desc: "Financing for New Jersey's investment properties and rental market."
              },
              {
                title: "Refinance Options",
                desc: "Rate-and-term and cash-out refinancing to lower payments or access home equity."
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
            New Jersey Market Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-muted/50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Suburban Communities</h3>
              <p className="text-muted-foreground leading-relaxed">
                New Jersey's suburban communities offer excellent schools, low crime rates, and strong property values. Areas like Bergen County, Morris County, and Monmouth County are popular with families. We understand local property values and help you find the right financing for your suburban home.
              </p>
            </div>
            <div className="bg-muted/50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Jersey Shore Properties</h3>
              <p className="text-muted-foreground leading-relaxed">
                The Jersey Shore presents unique financing considerations. Seasonal properties, flood zones, and insurance requirements all affect mortgage options. We have experience with shore properties and understand the specific requirements for coastal homes.
              </p>
            </div>
            <div className="bg-muted/50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Property Taxes</h3>
              <p className="text-muted-foreground leading-relaxed">
                New Jersey has some of the highest property taxes in the country. This affects affordability and monthly payments. We help you understand the total cost of homeownership, including property taxes, and find loan programs that work with your budget.
              </p>
            </div>
            <div className="bg-muted/50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Commuter Considerations</h3>
              <p className="text-muted-foreground leading-relaxed">
                Many New Jersey residents commute to NYC. This affects home location decisions and financing. We understand the trade-offs between commute time, property values, and help you find the right balance for your lifestyle and budget.
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
                q: "What are New Jersey's property tax considerations?",
                a: "New Jersey has high property taxes that significantly impact monthly payments. We factor property taxes into your affordability calculations and help you understand the total cost of homeownership. Some loan programs offer higher debt-to-income ratios to accommodate NJ property taxes."
              },
              {
                q: "Do you offer NJHMFA first-time buyer programs?",
                a: "Yes, we work with New Jersey Housing and Mortgage Finance Agency programs that offer down payment assistance and favorable terms for first-time buyers. These programs can make homeownership more affordable for eligible NJ residents."
              },
              {
                q: "Can you help with Jersey Shore properties?",
                a: "Absolutely. We have experience financing shore properties and understand the unique considerations, including flood insurance requirements, seasonal usage, and coastal property valuations. We help you navigate these specific requirements."
              },
              {
                q: "How long does the NJ mortgage process take?",
                a: "New Jersey closings typically take 30-45 days for conventional purchases. The timeline can vary based on property type, loan program, and seller requirements. We work efficiently to keep your closing on schedule."
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
            Ready to Buy Your New Jersey Home?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get pre-approved today and start your New Jersey home search with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply">
              <Button size="lg" className="w-full sm:w-auto">
                Apply Now
              </Button>
            </Link>
            <Link href="/team">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-foreground">
                Meet Our NJ Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-montserrat font-bold text-center text-foreground mb-12">
            Contact Our New Jersey Team
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
                    <span className="text-muted-foreground">Serving all New Jersey counties</span>
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
              <strong>Licensed in New Jersey:</strong> Green Street Capital, LLC is licensed by the NJ Department of Banking and Insurance to originate mortgage loans in New Jersey.
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
