"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
      <div className="hidden lg:flex bg-foreground text-white py-2 px-6 items-center justify-between text-sm">
        <div className="flex space-x-6">
          <span className="flex items-center"><Phone className="w-4 h-4 mr-2 text-primary" /> Office: 718-615-4545</span>
          <span>Toll Free: 855-615-4545</span>
        </div>
      </div>

      <header className={cn("sticky top-0 z-50 w-full transition-all duration-300", isScrolled ? "glass-nav py-3" : "bg-white py-5 border-b border-gray-100")}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl md:text-2xl leading-none text-foreground tracking-tight">Green Street</span>
              <span className="font-sans text-[10px] md:text-xs text-primary uppercase tracking-widest font-bold">Capital</span>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center space-x-1 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "px-2 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary whitespace-nowrap",
                  pathname === link.path ? "text-primary bg-primary/5" : "text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/schedule"><Button variant="secondary" size="sm">Book Time with Me</Button></Link>
            <Link href="/apply"><Button size="sm">Apply Now</Button></Link>
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
                  "px-4 py-4 rounded-lg text-lg font-medium border border-transparent",
                  pathname === link.path ? "bg-primary/5 text-primary border-primary/20" : "text-foreground hover:bg-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="grid grid-cols-1 gap-3 pt-6 border-t border-gray-100">
              <Link href="/schedule"><Button variant="secondary" className="w-full" size="lg">Book Time with Me</Button></Link>
              <Link href="/apply"><Button className="w-full" size="lg">Apply Now</Button></Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
