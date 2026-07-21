"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

const DEFAULT_NAV_HEIGHT = 96;

export function Navbar({
  logoSrc = process.env.NEXT_PUBLIC_NAVBAR_LOGO_SRC || "/images/logo.png",
  logoAlt = process.env.NEXT_PUBLIC_NAVBAR_LOGO_ALT || "Green Street Capital",
  brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "Green Street Capital",
  navLinks = DEFAULT_NAV_LINKS,
  teamHref = process.env.NEXT_PUBLIC_TEAM_HREF || "/team",
  applyHref = process.env.NEXT_PUBLIC_APPLY_HREF || "/apply",
  logoWidth = 80,
  logoHeight = 80,
}: NavbarProps) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [navHeight, setNavHeight] = useState(DEFAULT_NAV_HEIGHT);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Measure bar height for spacer + drawer offset (always available while scrolling)
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const measure = () => {
      const h = Math.ceil(el.getBoundingClientRect().height);
      if (h > 0) {
        setNavHeight(h);
        document.documentElement.style.setProperty("--navbar-height", `${h}px`);
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isScrolled, mobileMenuOpen]);

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
          "px-2 xl:px-3 py-2 rounded-md text-[15px] xl:text-[16px] font-semibold font-montserrat transition-colors hover:text-primary whitespace-nowrap flex-shrink-0",
          pathname === path ? "text-primary bg-primary/5" : "text-foreground"
        ),
    [pathname]
  );

  return (
    <>
      {/*
        Fixed (not sticky): always stays on screen while scrolling.
        Sticky was broken by overflow-x on ancestors — users lost the menu button.
      */}
      <header
        ref={headerRef}
        className={cn(
          "fixed left-0 right-0 top-0 z-[100] w-full transition-all duration-300",
          // Respect iOS notch / status bar
          "pt-[env(safe-area-inset-top,0px)]",
          isScrolled
            ? "glass-nav py-1 shadow-sm"
            : "border-b border-gray-100 bg-white py-1.5 sm:py-2"
        )}
      >
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <Link
            href="/"
            className="group flex min-w-0 flex-shrink items-center gap-1.5 sm:gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full">
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
                  <span className="px-1 text-[9px] font-semibold uppercase tracking-widest text-foreground sm:text-[10px]">
                    {brandName}
                  </span>
                </div>
              )}
            </div>

            <div className="flex min-w-0 flex-col leading-none">
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

          {/* Desktop nav */}
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

          {/* Mobile menu toggle — always visible while scrolling */}
          <button
            type="button"
            className="relative z-[110] inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-muted active:bg-muted lg:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Holds layout space so content is not hidden under the fixed bar.
          navHeight already includes safe-area padding on the header. */}
      <div
        aria-hidden
        className="w-full shrink-0"
        style={{ height: navHeight }}
      />

      {/* Mobile drawer — full screen under the fixed bar */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-x-0 bottom-0 z-[90] overflow-y-auto overscroll-contain border-t border-gray-100 bg-white lg:hidden"
          style={{ top: navHeight }}
        >
          <div className="flex min-h-full flex-col px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    "rounded-xl border border-transparent px-4 py-3.5 text-base font-semibold font-montserrat transition-colors",
                    pathname === link.path
                      ? "border-primary/20 bg-primary/5 text-primary"
                      : "text-foreground hover:bg-muted active:bg-muted"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto grid grid-cols-1 gap-3 border-t border-gray-100 pt-5">
              <Link href={teamHref} className="block w-full">
                <Button variant="accent" className="h-12 w-full font-montserrat" size="lg">
                  Meet the Team
                </Button>
              </Link>
              <Link href={applyHref} className="block w-full">
                <Button className="h-12 w-full font-montserrat" size="lg">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
