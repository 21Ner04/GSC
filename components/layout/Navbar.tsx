"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavLink = {
  name: string;
  path: string;
};

type NavbarProps = {
  logoSrc?: string;
  logoAlt?: string;
  brandName?: string;
  navLinks?: NavLink[];
  teamHref?: string;
  applyHref?: string;
  logoWidth?: number;
  logoHeight?: number;
  stickyTopClassName?: string;
};

const DEFAULT_NAV_LINKS: NavLink[] = [
  { name: "Home", path: "/" },
  { name: "Purchase", path: "/purchase" },
  { name: "Refinance", path: "/refinance" },
  { name: "Loan Programs", path: "/loan-programs" },
  { name: "About Us", path: "/about" },
  { name: "Meet Our Team", path: "/team" },
  { name: "Useful Links & Forms", path: "/links" },
  { name: "Contact", path: "/contact" },
];

export function Navbar({
  logoSrc = process.env.NEXT_PUBLIC_NAVBAR_LOGO_SRC || "/images/logo.png",
  logoAlt = process.env.NEXT_PUBLIC_NAVBAR_LOGO_ALT || "Green Street Capital",
  brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "Green Street Capital",
  navLinks = DEFAULT_NAV_LINKS,
  teamHref = process.env.NEXT_PUBLIC_TEAM_HREF || "/team",
  applyHref = process.env.NEXT_PUBLIC_APPLY_HREF || "/apply",
  logoWidth = 80,
  logoHeight = 80,
  stickyTopClassName = "top-0",
}: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (mobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = previousOverflow || "";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  const activeLinkClass = useMemo(
    () =>
      (path: string) =>
        cn(
          "px-2.5 xl:px-3 py-2 rounded-md text-[16px] font-semibold font-montserrat transition-colors hover:text-primary whitespace-nowrap flex-shrink-0",
          pathname === path ? "text-primary bg-primary/5" : "text-foreground"
        ),
    [pathname]
  );

  return (
    <header
      className={cn(
        "sticky z-50 w-full transition-all duration-300",
        stickyTopClassName,
        isScrolled ? "glass-nav py-1" : "bg-white py-2 border-b border-gray-100"
      )}
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex flex-shrink-0 items-center gap-2 group">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full flex items-center justify-center">
            {!logoError ? (
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={logoWidth}
                height={logoHeight}
                className="h-full w-full object-contain"
                onError={() => setLogoError(true)}
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-muted text-center">
                <span className="px-2 text-[10px] font-semibold uppercase tracking-widest text-foreground">
                  {brandName}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col leading-none">
            <span className="font-montserrat text-xl font-bold tracking-tight text-foreground md:text-2xl">
              Green
            </span>
            <span className="pl-3 font-montserrat text-xl font-bold tracking-tight text-foreground md:text-2xl">
              Street
            </span>
            <span className="pl-7 font-manrope text-xs font-bold uppercase tracking-widest text-primary md:text-sm">
              Capital
            </span>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center justify-center lg:flex">
          <div className="flex items-center space-x-0 xl:space-x-1">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path} className={activeLinkClass(link.path)}>
                {link.name}
              </Link>
            ))}
          </div>
        </nav>

        <div className="hidden flex-shrink-0 items-center space-x-2 lg:flex">
          <Link href={teamHref} className="inline-flex">
            <Button variant="accent" size="sm" className="px-4 font-montserrat text-sm">
              Meet the Team
            </Button>
          </Link>
          <Link href={applyHref} className="inline-flex">
            <Button size="sm" className="px-4 font-montserrat text-sm">
              Apply Now
            </Button>
          </Link>
        </div>

        <button
          type="button"
          className="p-2 text-foreground lg:hidden"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-40 overflow-y-auto border-t border-gray-100 bg-white lg:hidden"
          style={{ top: "var(--navbar-height, 5.5rem)" }}
        >
          <div className="flex flex-col p-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "rounded-lg border border-transparent px-4 py-3.5 text-base font-semibold font-montserrat transition-colors",
                  pathname === link.path
                    ? "border-primary/20 bg-primary/5 text-primary"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {link.name}
              </Link>
            ))}

            <div className="grid grid-cols-1 gap-3 border-t border-gray-100 pt-6">
              <Link href={teamHref} className="inline-flex w-full">
                <Button variant="accent" className="w-full font-montserrat" size="lg">
                  Meet the Team
                </Button>
              </Link>
              <Link href={applyHref} className="inline-flex w-full">
                <Button className="w-full font-montserrat" size="lg">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;