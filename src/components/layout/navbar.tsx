"use client";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const nav_items = [
  {
    href: "/browse",
    name: "Browse",
    protected: false,
  },
  {
    href: "/about",
    name: "About",
    protected: false,
  },
  {
    href: "/donate",
    name: "Donate",
    protected: false,
  },
];

export default function Navbar() {
  return (
    <header className="fixed w-full top-0 flex h-24 items-center justify-between gap-4 px-4 md:px-6">
      <nav className="hidden flex-col gap-6 font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-10">
        <Image
          src="/tc-logo-white.png"
          alt="tc-logo"
          className="max-w-16 max-h-16"
          width={1667}
          height={1667}
        />
        {nav_items.map((n) => (
          <Link
            key={n.name}
            href={n.href}
            className="text-black transition-colors hover:text-primary-500 hover:font-bold text-base"
          >
            {n.name}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" className="shrink-0 bg-primary-500 md:hidden">
            <Menu />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-primary-500">
          <nav className="grid gap-6 text-lg font-medium">
            <Image
              src="/tc-logo-white.png"
              alt="tc-logo"
              className="max-w-16 max-h-16"
              width={1667}
              height={1667}
            />
            {nav_items.map((i) => (
              <Link key={i.href} href={i.href} className="text-white">
                {i.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial"></div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full cursor-pointer"
            >
              <Avatar>
                <AvatarImage src="/default.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
