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
      <section className="relative h-screen flex items-end justify-center overflow-hidden pb-32">
        <div className="absolute inset-0 z-0">
          <img 
            src="/MAIN PAGE PIC.jpg" 
            alt="Green Street Capital Team" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl text-center ml-0 md:ml-20 lg:ml-36">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-montserrat font-bold text-white leading-tight mb-8">
              Your Path to <span className="text-primary">Homeownership</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl leading-relaxed font-manrope mx-auto">
              Trusted mortgage solutions. Fast approvals. Competitive rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/apply"><Button size="lg" className="w-full sm:w-auto text-lg h-16 px-10 font-montserrat shadow-xl hover:shadow-2xl transition-all">Get Pre-Approved</Button></Link>
              <Link href="/contact"><Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-16 px-10 border-white/40 text-white hover:bg-white hover:text-foreground font-montserrat backdrop-blur-sm transition-all">Talk to Expert</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-muted"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-foreground mb-4">Trusted by Homeowners</h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-manrope">5-star service across NY, NJ, FL, and PA</p>
          </motion.div>
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
      </motion.section>

      {/* Why Work With Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-foreground mb-6">Why Choose Green Street</h2>
              <p className="text-lg text-muted-foreground mb-8 font-manrope">20+ years of trusted mortgage expertise.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { icon: ShieldCheck, title: "20+ Years Experience", desc: "Proven industry expertise." },
                  { icon: TrendingUp, title: "Best Rates", desc: "Competitive wholesale pricing." },
                  { icon: Zap, title: "Fast Closing", desc: "Streamlined approval process." },
                  { icon: Users, title: "Dedicated Support", desc: "Personal advisor from start to finish." },
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
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto mb-6 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-3xl font-montserrat font-bold text-foreground">$1B+</span>
                </div>
                <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-1 font-manrope">Total Funded</p>
                <p className="text-3xl font-montserrat font-bold text-accent">Thousands Trust Us</p>
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
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">Loan Programs</h2>
              <p className="text-gray-400 font-manrope">Right solution for your situation.</p>
            </div>
            <Link href="/loan-programs"><Button variant="accent" className="text-white hover:bg-accent/90">View All Programs</Button></Link>
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
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-foreground mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground mb-16 max-w-xl mx-auto font-manrope">Expert mortgage advisors dedicated to your success.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            {[
              { name: "Ruslan Kushnir", title: "Branch Manager / Sr. Loan Officer", nmls: "71488" },
              { name: "Senior Loan Officer", title: "Loan Officer", nmls: "TBD" },
              { name: "Loan Officer", title: "Loan Officer", nmls: "TBD" },
            ].map((m, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 group">
                <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{m.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground">{m.name}</h3>
                <p className="text-accent font-medium text-sm mt-1">{m.title}</p>
                {m.nmls && <p className="text-xs text-muted-foreground mt-2">NMLS #{m.nmls}</p>}
              </div>
            ))}
          </div>
          <Link href="/team"><Button size="lg" variant="accent" className="px-10">Meet the Full Team</Button></Link>
        </div>
      </section>

      {/* Video & Updates */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-foreground mb-4">Company Updates & Insights</h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-manrope">Expert guidance, market updates, and valuable resources for your home buying journey.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Video Content */}
            <div>
              <h3 className="text-2xl font-montserrat font-bold text-foreground mb-6">Featured Videos</h3>
              <div className="space-y-6">
                {[
                  { 
                    title: "Buying vs Renting in 2024", 
                    desc: "Is it better to buy or rent in today's market?",
                    duration: "8:24",
                    link: "https://www.youtube.com/@GSC.MORTGAGE"
                  },
                  { 
                    title: "Mortgage Rates Explained", 
                    desc: "How mortgage rates work and what affects them",
                    duration: "12:15",
                    link: "https://www.youtube.com/@GSC.MORTGAGE"
                  },
                  { 
                    title: "First-Time Homebuyer Tips", 
                    desc: "Essential tips for first-time home buyers",
                    duration: "15:30",
                    link: "https://www.youtube.com/@GSC.MORTGAGE"
                  }
                ].map((video, i) => (
                  <a key={i} href={video.link} target="_blank" rel="noopener noreferrer" className="flex gap-4 p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors cursor-pointer group no-underline">
                    <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&auto=format&fit=crop&q=60" alt="Video thumbnail" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                        <PlayCircle className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{video.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{video.desc}</p>
                      <p className="text-xs text-primary font-medium">{video.duration}</p>
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-6 text-center">
                <a href="https://www.youtube.com/@GSC.MORTGAGE" target="_blank" rel="noopener noreferrer" className="no-underline">
                  <Button variant="outline" className="w-full">View All Videos</Button>
                </a>
              </div>
            </div>

            {/* Market Updates */}
            <div>
              <h3 className="text-2xl font-montserrat font-bold text-foreground mb-6">Market Updates</h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Fed Rate Decision Impact",
                    date: "2 days ago",
                    category: "Market Analysis",
                    preview: "Latest Federal Reserve decision affects mortgage rates and housing market outlook..."
                  },
                  {
                    title: "Spring Market Preview 2024",
                    date: "1 week ago", 
                    category: "Market Trends",
                    preview: "What to expect in the upcoming spring buying season and how to prepare..."
                  },
                  {
                    title: "New FHA Guidelines Explained",
                    date: "2 weeks ago",
                    category: "Policy Updates", 
                    preview: "Recent changes to FHA loan requirements and how they benefit buyers..."
                  }
                ].map((article, i) => (
                  <div key={i} className="p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">{article.category}</span>
                      <span className="text-xs text-muted-foreground">{article.date}</span>
                    </div>
                    <h4 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{article.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{article.preview}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline" className="w-full">Read All Updates</Button>
              </div>
            </div>
          </div>

          {/* Quick Resources */}
          <div className="bg-muted rounded-2xl p-8">
            <h3 className="text-xl font-montserrat font-bold text-foreground mb-6 text-center">Quick Resources</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Mortgage Calculator",
                "Rate Tracker", 
                "Home Buying Guide",
                "Glossary"
              ].map((resource, i) => (
                <div key={i} className="bg-white p-4 rounded-xl text-center hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                    <span className="text-primary font-bold">{resource.charAt(0)}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{resource}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact + Links */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-foreground mb-6">Get Started</h2>
                <p className="text-muted-foreground text-lg font-manrope">Ready to take the next step? Our team is here to help.</p>
              </div>
              <div className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div>
                  <h4 className="font-montserrat font-bold text-xl text-foreground">Green Street Capital, LLC</h4>
                  <p className="text-sm text-muted-foreground">NMLS #2066586</p>
                </div>
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-start"><MapPin className="w-5 h-5 text-primary mr-3 mt-1 shrink-0" /><p className="text-foreground font-medium">2709 Coney Island Ave, 3rd Floor<br />Brooklyn, NY 11235</p></div>
                  <div className="flex items-center"><Phone className="w-5 h-5 text-primary mr-3 shrink-0" /><p className="text-foreground font-medium">Toll Free: 855-615-4545</p></div>
                  <div className="flex items-center"><Mail className="w-5 h-5 text-primary mr-3 shrink-0" /><p className="text-foreground font-medium">Info@GSCMortgage.com</p></div>
                </div>
                <div className="pt-6 flex flex-col gap-3">
                  <Link href="/team"><Button variant="accent" className="w-full" size="lg">Meet Our Team</Button></Link>
                  <Link href="/apply"><Button className="w-full" size="lg">Apply Now</Button></Link>
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
