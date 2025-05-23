"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMedia } from "react-use";
import { useState } from "react";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { NavButton } from "./nav-button";
import { Button } from "./ui/button";

const routes = [
  {
    href: "/",
    label: "Overview",
  },
  {
    href: "/transactions",
    label: "Transactions",
  },
  {
    href: "/accounts",
    label: "Accounts",
  },
  {
    href: "/categories",
    label: "Categories",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pathName = usePathname();
  const isMobile = useMedia("(max-width: 1024px)", false);

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <div className="p-2 rounded-md cursor-pointer font-normal bg-white/10 houver:bg-white/20  houver:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent focus:bg-white/30 outline-none text-white transition">
            <Menu className="size-4" />
          </div>
        </SheetTrigger>
        <SheetContent>
          <nav className="flex flex-col gap-y-2 pt-12">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.href === pathName ? "secondary" : "ghost"}
                size="sm"
                onClick={() => onClick(route.href)}
                className="w-full justify-start"
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathName === route.href}
        />
      ))}
    </nav>
  );
};
