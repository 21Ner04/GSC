import Link from "next/link";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gray-600 rounded p-3 flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-500 rounded"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl leading-none text-white">Green Street</span>
                <span className="text-[10px] text-primary uppercase tracking-widest font-bold">Capital</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">Your trusted partner for home purchases, refinancing, and mortgage solutions.</p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/gsc.mortgage" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/purchase" className="text-gray-400 hover:text-primary transition-colors">Purchase a Home</Link></li>
              <li><Link href="/refinance" className="text-gray-400 hover:text-primary transition-colors">Refinance</Link></li>
              <li><Link href="/loan-programs" className="text-gray-400 hover:text-primary transition-colors">Loan Programs</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/team" className="text-gray-400 hover:text-primary transition-colors">Meet Our Team</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">2709 Coney Island Ave, 3rd Floor, Brooklyn, NY 11235</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary shrink-0" />
                <span className="text-gray-400 text-sm">Direct: 646-261-8023</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary shrink-0" />
                <span className="text-gray-400 text-sm">Office: 718-615-4545</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary shrink-0" />
                <span className="text-gray-400 text-sm">Toll Free: 855-615-4545</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary shrink-0" />
                <span className="text-gray-400 text-sm">Fax: 718-819-1127</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-primary shrink-0" />
                <span className="text-gray-400 text-sm">RKushnir@GSCMortgage.com</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-primary shrink-0" />
                <a href="https://www.GreenStreetCapitalGroup.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  www.GreenStreetCapitalGroup.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">Licensing</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><strong className="text-white">Ruslan Kushnir:</strong> NMLS #71488</li>
              <li><strong className="text-white">Green Street Capital, LLC:</strong> NMLS #2066586</li>
              <li className="pt-2"><strong className="text-white block mb-1">States Served:</strong> NY, NJ, FL, CT, PA</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-xs text-gray-500 text-center leading-relaxed">
          <p className="mb-4">
            Ruslan Kushnir NMLS #71488 | Green Street Capital, LLC NMLS #2066586. Licensed mortgage broker. This is not a commitment to lend. Rates and terms are subject to change without notice. All loans subject to credit approval. Equal Housing Lender.
          </p>
          <p>&copy; {new Date().getFullYear()} Green Street Capital. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
