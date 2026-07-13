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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useHasHeraldDomainAccess } from "@/lib/herald/use-has-domain-access";
import { heraldLogout } from "@/lib/herald/logout";

export default function Navbar() {
  const { hasAccess, isPending } = useHasHeraldDomainAccess();

  return (
    <header className="fixed bg-[#F8F8F8] border-b w-full top-0 flex h-20 items-center justify-between gap-4 px-4 md:px-6 z-50">
      <nav className="hidden flex-col gap-6 font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-10">
        <Link href="/">
          <Image
            src="/tc-logo-white.png"
            alt="tc-logo"
            className="max-w-16 max-h-16"
            width={1667}
            height={1667}
          />
        </Link>
        <Link
          href="/browse"
          className="text-black transition-colors hover:text-primary-500 hover:font-bold text-base"
        >
          Browse
        </Link>
        <Dialog>
          <DialogTrigger className="text-black transition-colors hover:text-primary-500 hover:font-bold text-base cursor-pointer">
            Donate
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Support Today&apos;s Carolinian</DialogTitle>
            <DialogDescription></DialogDescription>
            <p>
              Today&apos;s Carolinian has been operating independently since
              2019, without funding from the university. To support the
              publication, please make a donation through our finance officer:
            </p>
            <p className="mt-2">
              <strong>Finance Officer: Mi*****a M.</strong>
              <br />
              <strong>Contact: 09668273480 - GCash</strong>
            </p>
            <Link
              href="/donationQR.jpg"
              target="_blank"
              className="flex justify-center"
            >
              <Image
                src="/donationQR.jpg"
                alt="donationQRCode"
                width={200}
                height={200}
                className="mt-4 rounded-lg hover:scale-110 transition-all duration-300"
              />
            </Link>
          </DialogContent>
        </Dialog>
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
            <Link href="/">
              <Image
                src="/tc-logo-white.png"
                alt="tc-logo"
                className="max-w-16 max-h-16"
                width={1667}
                height={1667}
              />
            </Link>
            <Link href="/browse" className="text-white">
              Browse
            </Link>
            <Dialog>
              <DialogTrigger className="text-white text-left">
                Donate
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Support Today&apos;s Carolinian</DialogTitle>
                <DialogDescription></DialogDescription>
                <p>
                  Today&apos;s Carolinian has been operating independently since
                  2019, without funding from the university. To support the
                  publication, please make a donation through our finance
                  officer:
                </p>
                <p className="mt-2">
                  <strong>Finance Officer: Mi*****a M.</strong>
                  <br />
                  <strong>Contact: 09668273480 - GCash</strong>
                </p>
                <Link
                  href="/donationQR.jpg"
                  target="_blank"
                  className="flex justify-center"
                >
                  <Image
                    src="/donationQR.jpg"
                    alt="donationQRCode"
                    width={200}
                    height={200}
                    className="mt-4 rounded-lg hover:scale-110 transition-all duration-300"
                  />
                </Link>
              </DialogContent>
            </Dialog>
          </nav>
        </SheetContent>
      </Sheet>

      {hasAccess && (
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
              <DropdownMenuItem onClick={() => heraldLogout()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      {!hasAccess && !isPending && process.env.NEXT_PUBLIC_HERALD_LOGIN_URL && (
        <Link
          href={process.env.NEXT_PUBLIC_HERALD_LOGIN_URL}
          className="ml-auto text-black transition-colors hover:text-primary-500 hover:font-bold text-base"
        >
          Sign In
        </Link>
      )}
    </header>
  );
}
