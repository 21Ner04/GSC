"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, TrendingUp, Zap, Users, ArrowRight, CheckCircle2, PlayCircle, Star, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const REVIEWS = [
  { 
    text: "Ruslan and his team were spot on throughout the entire process. He was always prepared with clear answers to any of my questions and stayed on top of every deadline all the way to closing. I never had to reach out more than once for anything—his responsiveness and organization made everything feel seamless. At times, it even felt like he had answers before I asked the questions. I would definitely recommend Ruslan and will gladly use his team again in the future. Thank you so much for everything.", 
    name: "Dee A. Bacchus", 
    location: "Brooklyn" 
  },
  { 
    text: "My experience with Green Street Capital while securing my mortgage has been nothing short of exceptional. From the very beginning, they treated me with a level of empathy and understanding that made me feel like part of their family rather than just another client. Their team took the time to listen to my unique situation, patiently answering all my questions and addressing my concerns with genuine care.", 
    name: "S C", 
    location: "Manhattan" 
  },
  { 
    text: "Maxim was fantastic to work with from start to finish. He moved my application through quickly, got me approved faster than I expected, and kept me updated at every step so I never had to wonder what was going on. His communication was clear, prompt, and friendly, and he was always easy to reach whenever I had a question.", 
    name: "Mihai S", 
    location: "Queens" 
  },
  { 
    text: "I had a great experience getting my mortgage loan. The process was smooth and easy to understand, and the team was always available to answer my questions. They explained everything clearly and helped me get a great rate. I'm very happy with the service and would definitely recommend them.", 
    name: "Nigina", 
    location: "Staten Island" 
  },
  { 
    text: "Cannot say enough great things about the entire team at Green Street Capital. They were always responsive answering all of my questions and concerns. There were no delays throughout the process of getting a mortgage. I would absolutely recommend them to anyone looking for a mortgage.", 
    name: "Aleksey Feygin", 
    location: "New Jersey" 
  },
  { 
    text: "Ruslan and Marina were incredible to work with. They made the whole mortgage process easy and stress free, always taking the time to explain everything and answer my questions. I truly felt supported from start to finish. I am grateful for all their help and highly recommend them.", 
    name: "Eric Ashrafov", 
    location: "Brooklyn" 
  },
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-foreground via-foreground/95 to-secondary/60" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary mb-6">
              <Star className="w-4 h-4 mr-2 fill-primary" />
              <span className="text-sm font-medium">5-Star Rated Mortgage Broker</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
              Your Path to <span className="text-primary">Homeownership</span> Starts Here
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              Trusted mortgage solutions for first-time buyers, refinance clients, and everyone in between.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/apply"><Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8">Get a Quote</Button></Link>
              <Link href="/schedule"><Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg h-14 px-8">Book Time with Me</Button></Link>
              <Link href="/contact"><Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 border-white/30 text-white hover:bg-white hover:text-foreground">Contact Us</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Families across NY, NJ, FL, CT, and PA trust Green Street Capital.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {REVIEWS.map((review, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full hover:shadow-xl transition-shadow">
                <div className="flex text-accent mb-4 space-x-1">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-foreground/80 italic mb-6 flex-grow leading-relaxed">"{review.text}"</p>
                <div className="mt-auto border-t border-gray-100 pt-4">
                  <p className="font-bold text-foreground">{review.name}</p>
                  <p className="text-sm text-primary font-medium">{review.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">Experience the Green Street Difference</h2>
              <p className="text-lg text-muted-foreground mb-8">With over two decades in the industry, we navigate the complexities so you don't have to.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { icon: ShieldCheck, title: "20+ Years Experience", desc: "Decades of proven industry knowledge." },
                  { icon: TrendingUp, title: "Competitive Rates", desc: "Access to the best wholesale rates available." },
                  { icon: Zap, title: "Fast Approvals", desc: "Streamlined process to get you to the closing table." },
                  { icon: Users, title: "Personal Service", desc: "Dedicated advisor from application to funding." },
                ].map((f, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <f.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">{f.title}</h4>
                      <p className="text-sm text-muted-foreground">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto mb-6 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-3xl font-serif font-bold text-foreground">$1B+</span>
                </div>
                <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-1">Total Funded</p>
                <p className="text-3xl font-serif font-bold text-secondary">Trusted by Thousands</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Loan Programs */}
      <section className="py-24 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Comprehensive Loan Programs</h2>
              <p className="text-gray-400">Whatever your situation, we have a customized mortgage solution for you.</p>
            </div>
            <Link href="/loan-programs"><Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-foreground">View All Programs</Button></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Conventional", desc: "Standard loan with great rates for borrowers with good credit." },
              { title: "FHA Loans", desc: "Government-backed, ideal for first-time buyers with lower down payments." },
              { title: "VA Loans", desc: "Exclusive benefits for veterans and active-duty military personnel." },
              { title: "Jumbo Loans", desc: "Financing for luxury properties that exceed standard limits." },
              { title: "Refinance", desc: "Lower your rate or change your term to save money monthly." },
              { title: "Home Equity", desc: "Tap into your home's value for renovations or debt consolidation." },
              { title: "Investment", desc: "Specialized products for real estate investors and landlords." },
              { title: "USDA Loans", desc: "Zero down payment options for eligible rural properties." },
            ].map((prog, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group cursor-pointer">
                <h3 className="text-xl font-bold mb-3 text-white">{prog.title}</h3>
                <p className="text-sm text-gray-400 mb-6">{prog.desc}</p>
                <Link href="/loan-programs" className="inline-flex items-center text-primary font-medium group-hover:text-accent transition-colors">
                  Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Meet Our Leadership</h2>
          <p className="text-muted-foreground mb-16 max-w-2xl mx-auto">Expert advisors committed to your success.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            {[
              { name: "Ruslan Kushnir", title: "Branch Manager / Sr. Loan Officer", nmls: "71488" },
              { name: "Ruslan Kushnir", title: "Branch Manager / Sr. Loan Officer", nmls: "71488" },
              { name: "Ruslan Kushnir", title: "Branch Manager / Sr. Loan Officer", nmls: "71488" },
            ].map((m, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 group">
                <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{m.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground">{m.name}</h3>
                <p className="text-secondary font-medium text-sm mt-1">{m.title}</p>
                {m.nmls && <p className="text-xs text-muted-foreground mt-2">NMLS #{m.nmls}</p>}
              </div>
            ))}
          </div>
          <Link href="/team"><Button size="lg" className="px-10">Meet the Full Team</Button></Link>
        </div>
      </section>

      {/* Video */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Company Updates & Insights</h2>
          <p className="text-muted-foreground mb-16 max-w-2xl mx-auto">Stay informed with the latest mortgage insights, market updates, and company news.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["First-Time Homebuyer Guide 2024", "When Is The Right Time To Refinance?", "Understanding Mortgage Rates"].map((title, i) => (
              <div key={i} className="flex flex-col">
                <div className="aspect-video bg-muted rounded-xl relative overflow-hidden flex items-center justify-center border border-gray-200 group cursor-pointer shadow-md mb-4">
                  <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=60" alt="Video" className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/20 transition-colors" />
                  <PlayCircle className="w-16 h-16 text-white relative z-10 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-bold text-lg text-foreground text-left">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + Links */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">Let's Connect</h2>
                <p className="text-muted-foreground text-lg">Ready to take the next step? Our team is here to guide you home.</p>
              </div>
              <div className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div>
                  <h4 className="font-bold text-xl text-foreground">Green Street Capital, LLC</h4>
                  <p className="text-sm text-muted-foreground">NMLS #2066586</p>
                </div>
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-start"><MapPin className="w-5 h-5 text-primary mr-3 mt-1 shrink-0" /><p className="text-foreground font-medium">2709 Coney Island Ave, 3rd Floor<br />Brooklyn, NY 11235</p></div>
                  <div className="flex items-center"><Phone className="w-5 h-5 text-primary mr-3 shrink-0" /><p className="text-foreground font-medium">Toll Free: 855-615-4545</p></div>
                  <div className="flex items-center"><Mail className="w-5 h-5 text-primary mr-3 shrink-0" /><p className="text-foreground font-medium">RKushnir@GSCMortgage.com</p></div>
                </div>
                <div className="pt-6 flex flex-col gap-3">
                  <Link href="/schedule"><Button className="w-full" size="lg">Book Time with Me</Button></Link>
                  <Link href="/apply"><Button variant="secondary" className="w-full" size="lg">Apply Now</Button></Link>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="w-full h-96 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <iframe src="https://maps.google.com/maps?q=2709+Coney+Island+Ave+Brooklyn+NY+11235&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: "Apply Now", link: "/apply" },
                  { name: "Schedule", link: "/schedule" },
                  { name: "Borrower Portal", link: "/links" },
                  { name: "Calculator", link: "/links" },
                  { name: "Secure Docs", link: "/links" },
                  { name: "Contact", link: "/contact" },
                ].map((item, i) => (
                  <Link key={i} href={item.link}>
                    <div className="bg-white border border-gray-100 hover:border-primary p-4 rounded-xl text-center shadow-sm hover:shadow-md transition-all cursor-pointer">
                      <span className="font-semibold text-foreground">{item.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
