import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const metadata = { title: "About Us | Green Street Capital" };

export default function About() {
  return (
    <div className="w-full">
      <div className="bg-gradient-to-br from-black via-black to-secondary py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">About Green Street Capital</h1>
          <p className="text-xl text-gray-300">Dedicated to transforming the mortgage experience through transparency, speed, and exceptional service.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>Green Street Capital was founded on the belief that every family deserves access to fair, transparent mortgage financing. With over 20 years in the industry, we've helped thousands of clients achieve their homeownership dreams across New York, New Jersey, Florida, Connecticut, and Pennsylvania.</p>
              <p>As an independent mortgage broker, we don't work for a single bank — we work for you. We partner with dozens of the nation's top wholesale lenders to shop for the most competitive rates and terms available in the market today.</p>
              <p>Our mission is simple: to provide a stress-free, fast, and educational mortgage process that puts our clients' financial well-being first.</p>
            </div>
            <div className="mt-10 flex gap-4 flex-wrap">
              <Link href="/team"><Button size="lg">Meet Our Team</Button></Link>
              <Link href="/contact"><Button variant="outline" size="lg">Contact Us</Button></Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-3xl translate-x-4 translate-y-4 -z-10" />
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl shadow-xl w-full h-[500px] flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto mb-8 bg-white/90 rounded-full overflow-hidden shadow-xl">
                  <Image src="/img_2841.png" alt="Green Street Capital" width={128} height={128} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">20+ Years</h3>
                <p className="text-lg text-muted-foreground">Of Trusted Service</p>
                <div className="mt-6 space-y-2">
                  <p className="text-3xl font-bold text-primary">$1B+ Funded</p>
                  <p className="text-lg text-muted-foreground">Thousands of Happy Clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center text-foreground mb-16">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-primary mb-4">Transparency</h3>
              <p className="text-muted-foreground">No hidden fees, no last-minute surprises. We explain every cost and term clearly upfront so you can make informed decisions.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-secondary mb-4">Speed & Efficiency</h3>
              <p className="text-muted-foreground">Our streamlined digital process and in-house expertise mean faster approvals and on-time closings, every time.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-accent mb-4">Client-First Approach</h3>
              <p className="text-muted-foreground">We're relationship-focused. We build long-term partnerships to serve your lifetime real estate needs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
