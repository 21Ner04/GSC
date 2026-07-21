import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Mortgage Broker in Florida | Green Street Capital",
  description: "Your trusted mortgage broker in Florida. We help FL residents with home purchases, refinancing, and specialized loan programs across the Sunshine State.",
};

export default function FloridaLocation() {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-foreground mb-6">
            Mortgage Broker in Florida
          </h1>
          <p className="text-xl text-muted-foreground">
            Helping Florida residents achieve homeownership with competitive rates and expert guidance
          </p>
        </div>
      </div>

      {/* Who We Help */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-montserrat font-bold text-foreground mb-6">
                Who We Help in Florida
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Florida's diverse housing market offers opportunities for all types of buyers. We serve clients across the state:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Retirees purchasing retirement homes in Florida's active adult communities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Families in growing communities across Central and South Florida</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Investors interested in Florida's strong rental market and vacation properties</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Second-home buyers seeking vacation properties in coastal areas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Refinancing homeowners looking to lower rates or access equity</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8">
              <h3 className="text-2xl font-montserrat font-bold text-foreground mb-4">
                Florida Expertise
              </h3>
              <p className="text-muted-foreground mb-6">
                We understand Florida's unique market, from retirement communities to vacation properties, and everything in between.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">All Florida markets served</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Vacation property specialists</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Retirement community knowledge</span>
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
            Florida Mortgage Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Conventional Loans",
                desc: "Traditional financing for Florida's diverse housing market, from single-family homes to condos."
              },
              {
                title: "FHA Loans",
                desc: "Low down payment options perfect for first-time buyers across Florida."
              },
              {
                title: "VA Loans",
                desc: "Exclusive benefits for Florida's large veteran and military population."
              },
              {
                title: "Investment Property Loans",
                desc: "Financing for Florida's strong rental market and vacation rental properties."
              },
              {
                title: "Second Home Financing",
                desc: "Specialized programs for vacation homes and second residences in Florida."
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
            Florida Market Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-muted/50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Insurance Considerations</h3>
              <p className="text-muted-foreground leading-relaxed">
                Florida's insurance market is unique due to hurricane risk. Property insurance and flood insurance significantly affect monthly payments and affordability. We help you understand insurance costs and factor them into your budget, finding loan programs that work with Florida's insurance requirements.
              </p>
            </div>
            <div className="bg-muted/50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Vacation Properties</h3>
              <p className="text-muted-foreground leading-relaxed">
                Florida is a popular market for second homes and vacation properties. These purchases have different financing requirements than primary residences. We offer specialized second-home financing and understand the unique considerations for vacation property purchases.
              </p>
            </div>
            <div className="bg-muted/50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">HOA and Condo Fees</h3>
              <p className="text-muted-foreground leading-relaxed">
                Florida has many condos and communities with HOA fees. These fees significantly affect monthly payments and affordability. We help you understand the total cost of homeownership, including HOA fees, and find loan programs that accommodate these expenses.
              </p>
            </div>
            <div className="bg-muted/50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Retirement Communities</h3>
              <p className="text-muted-foreground leading-relaxed">
                Florida is a top destination for retirees. Active adult communities and 55+ communities have specific financing considerations. We understand these communities' requirements and help retirees find financing that works with their retirement income and goals.
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
                q: "How does Florida insurance affect mortgage affordability?",
                a: "Florida's property insurance and flood insurance costs are significant factors in monthly payments. We factor these costs into your affordability calculations and help you understand the total cost of homeownership. Some loan programs offer higher debt-to-income ratios to accommodate insurance costs."
              },
              {
                q: "Can you help with vacation property financing?",
                a: "Yes, we offer specialized second-home and vacation property financing. These loans typically require higher down payments and have slightly different requirements than primary residence loans. We help you navigate these differences."
              },
              {
                q: "Do you work with Florida's retirement communities?",
                a: "Absolutely. We have experience financing homes in active adult communities and 55+ communities. We understand these communities' specific requirements and help retirees find financing that works with their retirement income."
              },
              {
                q: "How long does the Florida mortgage process take?",
                a: "Florida closings typically take 30-45 days for conventional purchases. The timeline can vary based on property type, loan program, and seller requirements. We work efficiently to keep your closing on schedule."
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
            Ready to Buy Your Florida Home?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get pre-approved today and start your Florida home search with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply">
              <Button size="lg" className="w-full sm:w-auto">
                Apply Now
              </Button>
            </Link>
            <Link href="/team">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-foreground">
                Meet Our Florida Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-montserrat font-bold text-center text-foreground mb-12">
            Contact Our Florida Team
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
                    <span className="text-muted-foreground">Serving all Florida markets</span>
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
              <strong>Licensed in Florida:</strong> Green Street Capital, LLC is licensed by the Florida Office of Financial Regulation to originate mortgage loans in Florida.
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
