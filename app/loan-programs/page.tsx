import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export const metadata = { title: "Loan Programs | Green Street Capital" };

const PROGRAMS = [
  { id: "conventional", name: "Conventional Loans", desc: "The most common type of mortgage. Not guaranteed by the government, usually requiring a higher credit score and down payments starting as low as 3%." },
  { id: "fha", name: "FHA Loans", desc: "Backed by the Federal Housing Administration. Popular among first-time buyers due to lower credit score requirements and a 3.5% minimum down payment." },
  { id: "va", name: "VA Loans", desc: "Exclusive to veterans, active-duty service members, and eligible surviving spouses. Offers 0% down payment and no private mortgage insurance (PMI)." },
  { id: "usda", name: "USDA Loans", desc: "Designed for rural and suburban homebuyers. Backed by the US Department of Agriculture, offering 0% down payment options." },
  { id: "jumbo", name: "Jumbo Loans", desc: "For purchasing high-value properties that exceed the conforming loan limits set by the FHFA. Requires stronger credit and larger reserves." },
  { id: "investment", name: "Investment Properties", desc: "Specialized financing for non-owner occupied properties, including DSCR loans that use rental income to qualify instead of personal income." },
];

export default function LoanPrograms() {
  return (
    <div className="w-full pb-24">
      <div className="bg-foreground py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Loan Programs</h1>
          <p className="text-xl text-gray-300 max-w-2xl">Discover the right financing solution for your unique needs.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAMS.map(prog => (
            <div key={prog.id} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all group flex flex-col">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <ChevronRight className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{prog.name}</h3>
              <p className="text-muted-foreground leading-relaxed flex-grow">{prog.desc}</p>
              <div className="mt-8 pt-6 border-t border-gray-100">
                <Link href="/apply">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">Apply for {prog.name.split(" ")[0]}</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-primary/10 border border-primary/20 rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Not sure which program is right for you?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">Contact us to discuss your goals and we'll match you with the perfect loan product.</p>
          <Link href="/contact"><Button size="lg">Contact an Advisor</Button></Link>
        </div>
      </div>
    </div>
  );
}
