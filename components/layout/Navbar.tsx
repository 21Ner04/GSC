"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Purchase", path: "/purchase" },
  { name: "Refinance", path: "/refinance" },
  { name: "Loan Programs", path: "/loan-programs" },
  { name: "About Us", path: "/about" },
  { name: "Meet Our Team", path: "/team" },
  { name: "Useful Links & Forms", path: "/links" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className={cn("sticky top-0 z-50 w-full transition-all duration-300", isScrolled ? "glass-nav py-2" : "bg-white py-3 border-b border-gray-100")}>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex items-center justify-center relative">
              <Image src="/images/logo.png" alt="Green Street Capital" width={140} height={140} className="w-full h-full object-contain absolute inset-0" onError={(e) => { const target = e.target as HTMLImageElement; target.style.display='none'; console.error('Logo failed to load'); }} />
            </div>
            <div className="flex flex-col">
              <span className="font-montserrat font-bold text-xl md:text-2xl leading-none text-foreground tracking-tight">Green Street</span>
              <span className="font-manrope text-xs md:text-sm text-primary uppercase tracking-widest font-bold">Capital</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1 text-sm overflow-x-auto">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-semibold font-montserrat transition-colors hover:text-primary whitespace-nowrap flex-shrink-0",
                  pathname === link.path ? "text-primary bg-primary/5" : "text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <Link href="/team"><Button variant="accent" size="sm" className="font-montserrat">Meet the Team</Button></Link>
            <Link href="/apply"><Button size="sm" className="font-montserrat">Apply Now</Button></Link>
          </div>

          <button className="lg:hidden p-2 text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[57px] z-40 bg-white lg:hidden overflow-y-auto border-t border-gray-100">
          <div className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "px-4 py-4 rounded-lg text-lg font-semibold font-montserrat border border-transparent",
                  pathname === link.path ? "bg-primary/5 text-primary border-primary/20" : "text-foreground hover:bg-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="grid grid-cols-1 gap-3 pt-6 border-t border-gray-100">
              <Link href="/team"><Button variant="accent" className="w-full font-montserrat" size="lg">Meet the Team</Button></Link>
              <Link href="/apply"><Button className="w-full font-montserrat" size="lg">Apply Now</Button></Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
