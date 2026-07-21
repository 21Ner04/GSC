import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Mortgage Broker in Pennsylvania | Green Street Capital",
  description: "Your trusted mortgage broker in Pennsylvania. We help PA residents with home purchases, refinancing, and specialized loan programs across the Keystone State.",
};

export default function PennsylvaniaLocation() {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-foreground mb-6">
            Mortgage Broker in Pennsylvania
          </h1>
          <p className="text-xl text-muted-foreground">
            Helping Pennsylvania residents achieve homeownership with competitive rates and personalized service
          </p>
        </div>
      </div>

      {/* Who We Help */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-montserrat font-bold text-foreground mb-6">
                Who We Help in Pennsylvania
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Pennsylvania's diverse housing market offers opportunities for all types of buyers. We serve clients across the state:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Families in suburban communities across Philadelphia suburbs and Pittsburgh metro</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>First-time buyers finding affordable options in Pennsylvania's diverse markets</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Rural homeowners in Pennsylvania's countryside and small towns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Investors interested in Pennsylvania's affordable investment properties</span>
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
                Pennsylvania Expertise
              </h3>
              <p className="text-muted-foreground mb-6">
                We understand Pennsylvania's unique market, from urban centers to rural communities, and everything in between.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">All PA markets served</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Urban and rural expertise</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Affordable housing specialists</span>
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
            Pennsylvania Mortgage Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Conventional Loans",
                desc: "Traditional financing for Pennsylvania's diverse housing stock, from row homes to single-family properties."
              },
              {
                title: "FHA Loans",
                desc: "Low down payment options perfect for first-time buyers across Pennsylvania."
              },
              {
                title: "VA Loans",
                desc: "Exclusive benefits for Pennsylvania veterans and military personnel."
              },
              {
                title: "PHFA Programs",
                desc: "Pennsylvania Housing Finance Agency programs for first-time buyers and affordable housing."
              },
              {
                title: "Investment Property Loans",
                desc: "Financing for Pennsylvania's investment properties and rental market."
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
            Pennsylvania Market Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-muted/50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Urban vs. Rural Markets</h3>
              <p className="text-muted-foreground leading-relaxed">
                Pennsylvania offers diverse markets from Philadelphia's urban row homes to rural countryside properties. Each market has different property values, appreciation rates, and financing considerations. We understand these differences and help you find the right loan for your specific market.
              </p>
            </div>
            <div className="bg-muted/50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Affordable Housing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Pennsylvania offers some of the most affordable housing in the Northeast. This makes it an attractive market for first-time buyers and investors. We work with PHFA and other programs to maximize affordability for eligible buyers.
              </p>
            </div>
            <div className="bg-muted/50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Property Taxes</h3>
              <p className="text-muted-foreground leading-relaxed">
                Pennsylvania property taxes vary significantly by county and municipality. Some areas have high taxes while others are quite reasonable. We help you understand the tax implications of your purchase and factor them into your affordability calculations.
              </p>
            </div>
            <div className="bg-muted/50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Historic Properties</h3>
              <p className="text-muted-foreground leading-relaxed">
                Pennsylvania has many historic homes and older properties. These properties can present unique financing challenges due to their age and condition. We work with lenders who understand historic properties and can help you navigate the specific requirements for older homes.
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
                q: "What are Pennsylvania's property tax considerations?",
                a: "Pennsylvania property taxes vary significantly by county and municipality. Some areas have high taxes while others are quite reasonable. We help you understand the tax implications of your purchase and factor them into your affordability calculations."
              },
              {
                q: "Do you offer PHFA first-time buyer programs?",
                a: "Yes, we work with Pennsylvania Housing Finance Agency programs that offer down payment assistance and favorable terms for first-time buyers. These programs can make homeownership more affordable for eligible PA residents."
              },
              {
                q: "Can you help with historic property financing?",
                a: "Absolutely. We have experience financing historic and older properties. We work with lenders who understand the unique challenges of older homes and can help you navigate the specific requirements for these properties."
              },
              {
                q: "How long does the Pennsylvania mortgage process take?",
                a: "Pennsylvania closings typically take 30-45 days for conventional purchases. The timeline can vary based on property type, loan program, and seller requirements. We work efficiently to keep your closing on schedule."
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
            Ready to Buy Your Pennsylvania Home?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get pre-approved today and start your Pennsylvania home search with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply">
              <Button size="lg" className="w-full sm:w-auto">
                Apply Now
              </Button>
            </Link>
            <Link href="/team">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-foreground">
                Meet Our Pennsylvania Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-montserrat font-bold text-center text-foreground mb-12">
            Contact Our Pennsylvania Team
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
                    <span className="text-muted-foreground">Serving all Pennsylvania markets</span>
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
              <strong>Licensed in Pennsylvania:</strong> Green Street Capital, LLC is licensed by the PA Department of Banking and Securities to originate mortgage loans in Pennsylvania.
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
