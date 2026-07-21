import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "First-Time Homebuyer Programs | Green Street Capital",
  description: "First-time homebuyer mortgage programs with low down payments, down payment assistance, and specialized guidance for new buyers. Start your homeownership journey.",
};

export default function FirstTimeHomebuyersPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-foreground mb-6">
            First-Time Homebuyer Programs
          </h1>
          <p className="text-xl text-muted-foreground">
            Specialized mortgage programs and guidance to make your first home purchase affordable and stress-free
          </p>
        </div>
      </div>

      {/* Who We Help */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-montserrat font-bold text-foreground mb-6">
                Your First Home Journey Starts Here
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Buying your first home is one of life's biggest decisions. We're here to guide you through every step with education, support, and loan programs designed specifically for first-time buyers.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Low down payment options starting at 3%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Down payment assistance programs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Flexible credit requirements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>Personalized guidance from application to closing</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8">
              <h3 className="text-2xl font-montserrat font-bold text-foreground mb-4">
                Why First-Time Buyers Choose Us
              </h3>
              <p className="text-muted-foreground mb-6">
                We understand that buying your first home can feel overwhelming. Our team takes the time to educate you on every aspect of the process.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Clear, jargon-free explanations</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Step-by-step process guidance</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Responsive communication</span>
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
            First-Time Buyer Loan Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "FHA Loans",
                desc: "3.5% down payment, flexible credit requirements, and competitive rates. Perfect for buyers with limited savings."
              },
              {
                title: "Conventional 97",
                desc: "Just 3% down payment for conventional financing. Great option for buyers with good credit who want to avoid FHA mortgage insurance."
              },
              {
                title: "State First-Time Programs",
                desc: "NY, NJ, FL, and PA all offer first-time buyer programs with down payment assistance and favorable terms."
              },
              {
                title: "VA Loans",
                desc: "Zero down payment for eligible veterans and military personnel. No ongoing mortgage insurance required."
              },
              {
                title: "USDA Loans",
                desc: "Zero down payment for homes in eligible rural areas. Great for buyers looking outside major cities."
              },
              {
                title: "HomeReady / Home Possible",
                desc: "Fannie Mae and Freddie Mac programs with 3% down and flexible income sources for first-time buyers."
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

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-montserrat font-bold text-center text-foreground mb-12">
            Your First-Time Buyer Journey
          </h2>
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Pre-Approval",
                desc: "We review your finances, determine your budget, and get you pre-approved so you can shop with confidence."
              },
              {
                step: "2",
                title: "Home Search",
                desc: "With your pre-approval in hand, you can make offers knowing exactly what you can afford."
              },
              {
                step: "3",
                title: "Application & Processing",
                desc: "Once you find your home, we handle the mortgage application, documentation, and processing."
              },
              {
                step: "4",
                title: "Closing",
                desc: "We guide you through closing, explaining every document and ensuring a smooth transition to homeownership."
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
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
                q: "What qualifies as a first-time homebuyer?",
                a: "Generally, you're considered a first-time buyer if you haven't owned a home in the past 3 years. Some programs have additional requirements, but many are more flexible than you might think."
              },
              {
                q: "How much down payment do I need?",
                a: "Down payment requirements vary by program. FHA requires 3.5%, conventional programs can be as low as 3%, and VA/USDA offer zero down options. We'll help you find the program that fits your savings."
              },
              {
                q: "What credit score do I need?",
                a: "FHA loans typically require 580+ for 3.5% down, conventional loans usually need 620-660+. Some programs go lower with compensating factors. We work with all credit situations."
              },
              {
                q: "Are there really down payment assistance programs?",
                a: "Yes! Many states and local governments offer down payment assistance grants and loans. These programs often have income limits and other requirements, but can provide thousands in assistance for eligible buyers."
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
            Ready to Start Your Home Buying Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get pre-approved today and take the first step toward homeownership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply">
              <Button size="lg" className="w-full sm:w-auto">
                Apply Now
              </Button>
            </Link>
            <Link href="/team">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-foreground">
                Speak with a First-Time Buyer Specialist
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
