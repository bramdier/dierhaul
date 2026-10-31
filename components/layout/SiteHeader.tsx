"use client";

import DierhaulLogo from "@/components/brand/DierhaulLogo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { primaryNav, solutions } from "@/lib/cargo-site";
import { cn } from "cn";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MenuLink({
  href,
  children,
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      className="block rounded-lg px-2 py-2 text-sm text-foreground hover:bg-muted"
      onClick={onNavigate}
    >
      {children}
    </Link>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const onHome = pathname === "/";
  const [solid, setSolid] = useState(!onHome);
  const solutionsActive = pathname.startsWith("/solutions");
  const closeMenu = () => setMenuOpen(false);
  const overHero = onHome && !solid;

  useEffect(() => {
    if (!onHome) {
      setSolid(true);
      return;
    }

    const buyers = document.getElementById("buyers");
    const header = headerRef.current;
    if (!buyers || !header) return;

    const update = () => {
      const headerBottom = header.getBoundingClientRect().bottom;
      setSolid(buyers.getBoundingClientRect().top <= headerBottom);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [onHome]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "top-0 z-40 border-b transition-[background-color,border-color,color] duration-200",
        onHome ? "fixed inset-x-0" : "sticky",
        overHero
          ? "border-transparent bg-transparent text-white"
          : "border-border bg-background text-foreground",
      )}
    >
      <div className="mx-auto flex max-w-screen-2xl items-center gap-3 px-4 py-2 sm:px-6">
        <DierhaulLogo
          href="/"
          priority
          className={cn("h-9 w-auto", overHero && "brightness-0 invert")}
        />
        <NavigationMenu className="hidden max-w-none lg:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuLink
                active={isActive(pathname, "/")}
                className={
                  overHero
                    ? "text-white hover:bg-white/15 hover:text-white data-active:bg-white/15 data-active:text-white"
                    : undefined
                }
                render={<Link href="/" />}
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={
                  overHero
                    ? "text-white hover:bg-white/15 hover:text-white data-open:bg-white/15 data-open:text-white data-popup-open:bg-white/15 data-popup-open:text-white"
                    : undefined
                }
                data-active={solutionsActive || undefined}
              >
                Solutions
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-80 gap-1">
                  {solutions.map((solution) => (
                    <li key={solution.slug}>
                      <NavigationMenuLink
                        active={pathname === `/solutions/${solution.slug}`}
                        closeOnClick
                        render={
                          <Link href={`/solutions/${solution.slug}`} />
                        }
                      >
                        <span className="flex flex-col gap-0.5">
                          <span className="font-medium text-foreground">
                            {solution.title}
                          </span>
                          <span className="text-muted-foreground">
                            {solution.summary}
                          </span>
                        </span>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {primaryNav.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  active={isActive(pathname, link.href)}
                  className={
                    overHero
                      ? "text-white hover:bg-white/15 hover:text-white data-active:bg-white/15 data-active:text-white"
                      : undefined
                  }
                  render={<Link href={link.href} />}
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center gap-2">
          <Button
            className={cn(
              "hidden sm:inline-flex",
              overHero && "text-white hover:bg-white/15 hover:text-white",
            )}
            nativeButton={false}
            render={<Link href="/login" />}
            variant="ghost"
          >
            Login
          </Button>
          <Button
            className="hidden sm:inline-flex"
            nativeButton={false}
            render={<Link href="/demo" />}
          >
            Request a demo
          </Button>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  className={cn(
                    "lg:hidden",
                    overHero &&
                      "border-white/40 bg-transparent text-white hover:bg-white/15 hover:text-white",
                  )}
                  size="icon"
                  variant="outline"
                />
              }
            >
              <MenuIcon />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Dierhaul sections
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                <MenuLink href="/" onNavigate={closeMenu}>
                  Home
                </MenuLink>
                <p className="px-2 pt-3 text-xs font-medium text-muted-foreground">
                  Solutions
                </p>
                {solutions.map((solution) => (
                  <MenuLink
                    key={solution.slug}
                    href={`/solutions/${solution.slug}`}
                    onNavigate={closeMenu}
                  >
                    {solution.title}
                  </MenuLink>
                ))}
                {primaryNav.map((link) => (
                  <MenuLink
                    key={link.href}
                    href={link.href}
                    onNavigate={closeMenu}
                  >
                    {link.label}
                  </MenuLink>
                ))}
                <div className="flex flex-col gap-2 px-2 pt-4">
                  <Button
                    nativeButton={false}
                    render={<Link href="/demo" onClick={closeMenu} />}
                  >
                    Request a demo
                  </Button>
                  <Button
                    nativeButton={false}
                    render={<Link href="/login" onClick={closeMenu} />}
                    variant="outline"
                  >
                    Login
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
