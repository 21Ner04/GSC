import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-36 h-36 rounded-full overflow-hidden flex items-center justify-center">
                <img src="/images/logo.png" alt="Green Street Capital" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-montserrat font-bold text-4xl leading-none text-white">Green Street</span>
                <span className="text-base text-primary uppercase tracking-widest font-bold">Capital</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">Your trusted partner for home purchases, refinancing, and mortgage solutions.</p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/gsc.mortgage" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/greenstreetcapital" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/greenstreetcap" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/green-street-capital" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@GSC.MORTGAGE" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-montserrat text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">Quick Links</h3>
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
            <h3 className="font-montserrat text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">2709 Coney Island Ave, 3rd Floor, Brooklyn, NY 11235</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary shrink-0" />
                <span className="text-gray-400 text-sm">Toll Free: 855-615-4545</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-primary shrink-0" />
                <span className="text-gray-400 text-sm">Info@GSCMortgage.com</span>
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
            <h3 className="font-montserrat text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">Company Info</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><strong className="text-white">Green Street Capital, LLC</strong></li>
              <li>NMLS #2066586</li>
              <li className="pt-2"><strong className="text-white block mb-1">States Served:</strong> NY, NJ, FL, PA</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-xs text-gray-500 text-center leading-relaxed">
          <p className="mb-4">
            Green Street Capital, LLC NMLS #2066586. Licensed mortgage broker. This is not a commitment to lend. Rates and terms are subject to change without notice. All loans subject to credit approval. Equal Housing Lender.
          </p>
          <p>&copy; {new Date().getFullYear()} Green Street Capital. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
