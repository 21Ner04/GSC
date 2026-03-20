import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, UploadCloud, Calculator, Headphones, ExternalLink, Calendar, Send } from "lucide-react";
import { MortgageCalculator } from "@/components/MortgageCalculator";

export const metadata = { title: "Useful Links & Forms | Green Street Capital" };

export default function UsefulLinks() {
  return (
    <div className="w-full pb-24">
      <div className="bg-muted py-20 text-center border-b border-gray-200">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Useful Links & Forms</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Everything you need to manage your mortgage application in one place.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-8 border-b border-gray-200 pb-4">Apply & Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Apply Now", icon: FileText, link: "/apply", primary: true },
              { title: "Schedule Time", icon: Calendar, link: "/schedule" },
              { title: "Contact Us", icon: Headphones, link: "/contact" },
              { title: "Live Meeting", icon: ExternalLink, link: "/contact" },
            ].map((item, i) => (
              <Link key={i} href={item.link}>
                <div className={`p-6 rounded-2xl border flex flex-col items-center justify-center text-center h-full transition-all cursor-pointer min-h-[140px] ${item.primary ? "bg-primary border-primary text-white hover:bg-primary/90" : "bg-white border-gray-100 hover:border-primary text-foreground"}`}>
                  <item.icon className={`w-10 h-10 mb-4 ${item.primary ? "text-white" : "text-primary"}`} />
                  <h3 className="font-bold text-lg">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-8 border-b border-gray-200 pb-4">Forms & Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <UploadCloud className="w-8 h-8 text-secondary mb-4" />
              <h3 className="font-bold text-lg mb-2">Borrower Portal</h3>
              <p className="text-sm text-muted-foreground mb-4">Securely upload your tax returns, bank statements, and ID via our encrypted portal.</p>
              <Button variant="secondary" className="w-full">Access Portal</Button>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <FileText className="w-8 h-8 text-secondary mb-4" />
              <h3 className="font-bold text-lg mb-2">Borrower Authorization</h3>
              <p className="text-sm text-muted-foreground mb-4">Required form to allow us to pull credit and verify employment.</p>
              <Button variant="outline" className="w-full">Download PDF</Button>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <Send className="w-8 h-8 text-secondary mb-4" />
              <h3 className="font-bold text-lg mb-2">Send Secure Docs</h3>
              <p className="text-sm text-muted-foreground mb-4">Alternative secure drop portal for non-registered users.</p>
              <Button variant="outline" className="w-full">Secure Drop</Button>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <FileText className="w-8 h-8 text-secondary mb-4" />
              <h3 className="font-bold text-lg mb-2">Loan Application</h3>
              <p className="text-sm text-muted-foreground mb-4">Complete URLA (Uniform Residential Loan Application).</p>
              <Button variant="outline" className="w-full">Download PDF</Button>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <FileText className="w-8 h-8 text-secondary mb-4" />
              <h3 className="font-bold text-lg mb-2">Privacy Notice</h3>
              <p className="text-sm text-muted-foreground mb-4">Our privacy policy and how we protect your information.</p>
              <Button variant="outline" className="w-full">Download PDF</Button>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <FileText className="w-8 h-8 text-secondary mb-4" />
              <h3 className="font-bold text-lg mb-2">Fair Lending Notice</h3>
              <p className="text-sm text-muted-foreground mb-4">Equal housing opportunity and fair lending practices.</p>
              <Button variant="outline" className="w-full">Download PDF</Button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-8 border-b border-gray-200 pb-4">Useful Resources</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <MortgageCalculator />
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow flex items-start space-x-4">
                <ExternalLink className="w-8 h-8 text-accent shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-1">HUD Resources</h3>
                  <p className="text-sm text-muted-foreground mb-3">Housing and Urban Development official site.</p>
                  <a href="https://www.hud.gov" target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-bold hover:underline">Visit HUD.gov →</a>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow flex items-start space-x-4">
                <ExternalLink className="w-8 h-8 text-accent shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-1">CFPB</h3>
                  <p className="text-sm text-muted-foreground mb-3">Consumer Financial Protection Bureau.</p>
                  <a href="https://www.consumerfinance.gov" target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-bold hover:underline">Visit CFPB →</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
