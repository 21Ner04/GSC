"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Instagram, Globe } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="w-full pb-24">
      <div className="bg-gradient-to-br from-foreground via-foreground/95 to-secondary/60 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Contact Us</h1>
        <p className="text-xl text-gray-300">We're here to help. Reach out to our team today.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          <div>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8">Get in Touch</h2>
            <div className="space-y-8 bg-muted p-8 rounded-3xl">
              <div>
                <h3 className="font-bold text-xl text-foreground">Ruslan Kushnir</h3>
                <p className="text-sm text-muted-foreground">NMLS #71488</p>
                <h4 className="font-bold mt-4">Green Street Capital, LLC</h4>
                <p className="text-sm text-muted-foreground">NMLS #2066586</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-primary mr-4 shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Direct: 646-261-8023</p>
                    <p className="text-foreground font-medium">Office: 718-615-4545</p>
                    <p className="text-foreground font-medium">Toll Free: 855-615-4545</p>
                    <p className="text-muted-foreground text-sm mt-1">Fax: 718-819-1127</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-primary mr-4 shrink-0" />
                  <p className="text-foreground font-medium">RKushnir@GSCMortgage.com</p>
                </div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-primary mr-4 shrink-0" />
                  <a href="https://www.GreenStreetCapitalGroup.com" target="_blank" rel="noopener noreferrer" className="text-foreground font-medium hover:text-primary transition-colors">
                    www.GreenStreetCapitalGroup.com
                  </a>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary mr-4 shrink-0 mt-1" />
                  <p className="text-foreground font-medium">2709 Coney Island Ave, 3rd Floor<br />Brooklyn, NY 11235</p>
                </div>
              </div>
              <div className="flex space-x-4 pt-6 border-t border-gray-200">
                <a href="https://www.instagram.com/gsc.mortgage" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-foreground hover:bg-accent hover:text-white transition-colors shadow-sm">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/schedule"><Button className="w-full">Book Time</Button></Link>
              <Link href="/apply"><Button variant="secondary" className="w-full">Secure Docs</Button></Link>
              <Link href="/contact"><Button variant="outline" className="w-full">Live Meeting</Button></Link>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <h3 className="font-serif text-2xl font-bold mb-6">Send a Message</h3>
              {sent ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">Message Sent!</h4>
                  <p className="text-muted-foreground">We'll get back to you as soon as possible.</p>
                  <Button className="mt-6" onClick={() => setSent(false)}>Send Another</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input placeholder="Your Name *" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  <Input type="email" placeholder="Email Address *" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  <Input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                  <Textarea placeholder="How can we help you?" required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>

            <div className="w-full h-64 rounded-3xl overflow-hidden shadow-lg border border-gray-100">
              <iframe src="https://maps.google.com/maps?q=2709+Coney+Island+Ave+Brooklyn+NY+11235&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
