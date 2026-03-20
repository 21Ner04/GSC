import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Meet Our Team | Green Street Capital" };

const TEAM = [
  { name: "Ruslan Kushnir", title: "Branch Manager / Sr. Loan Officer", nmls: "71488", bio: "Over 20 years of experience helping families achieve homeownership across the tri-state area." },
  { name: "Ruslan Kushnir", title: "Branch Manager / Sr. Loan Officer", nmls: "71488", bio: "Over 20 years of experience helping families achieve homeownership across the tri-state area." },
  { name: "Ruslan Kushnir", title: "Branch Manager / Sr. Loan Officer", nmls: "71488", bio: "Over 20 years of experience helping families achieve homeownership across the tri-state area." },
  { name: "Ruslan Kushnir", title: "Branch Manager / Sr. Loan Officer", nmls: "71488", bio: "Over 20 years of experience helping families achieve homeownership across the tri-state area." },
  { name: "Ruslan Kushnir", title: "Branch Manager / Sr. Loan Officer", nmls: "71488", bio: "Over 20 years of experience helping families achieve homeownership across the tri-state area." },
  { name: "Ruslan Kushnir", title: "Branch Manager / Sr. Loan Officer", nmls: "71488", bio: "Over 20 years of experience helping families achieve homeownership across the tri-state area." },
  { name: "Ruslan Kushnir", title: "Branch Manager / Sr. Loan Officer", nmls: "71488", bio: "Over 20 years of experience helping families achieve homeownership across the tri-state area." },
  { name: "Ruslan Kushnir", title: "Branch Manager / Sr. Loan Officer", nmls: "71488", bio: "Over 20 years of experience helping families achieve homeownership across the tri-state area." },
];

export default function Team() {
  return (
    <div className="w-full pb-24">
      <div className="bg-foreground py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Meet Our Team</h1>
          <p className="text-xl text-gray-300">Dedicated mortgage professionals working for you.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((member, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow flex flex-col">
              <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">{member.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div className="flex flex-col flex-grow">
                <h3 className="font-bold text-xl text-foreground">{member.name}</h3>
                <p className="text-primary font-medium text-sm mt-1 mb-3">{member.title}</p>
                {member.nmls && <p className="text-xs text-muted-foreground mb-3">NMLS #{member.nmls}</p>}
                <p className="text-sm text-foreground/80 mb-6 flex-grow">{member.bio}</p>
                <div className="flex flex-col gap-2 mt-auto">
                  <Link href="/contact"><Button variant="outline" className="w-full">Contact</Button></Link>
                  <Link href="/schedule"><Button variant="secondary" className="w-full">Schedule Call</Button></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
