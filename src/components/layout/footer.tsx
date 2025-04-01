import Link from "next/link";
import Globe from "./icons/Globe";
import Facebook from "./icons/Facebook";
import Instagram from "./icons/Instagram";
import Twitter from "./icons/Twitter";
import Mail from "./icons/Mail";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function Footer() {
  const socialLinks = [
    { href: "#", icon: <Globe />, label: "Website" },
    {
      href: "https://www.facebook.com/todayscarolinian",
      icon: <Facebook />,
      label: "Facebook",
    },
    {
      href: "https://www.instagram.com/todaysusc/",
      icon: <Instagram />,
      label: "Instagram",
    },
    { href: "https://x.com/todaysusc", icon: <Twitter />, label: "Twitter" },
    {
      href: "mailto:todayscarolinianusc@gmail.com",
      icon: <Mail />,
      label: "Email",
    },
  ];

  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-primary-500 border-t border-gray-200 shadow-xs flex flex-col gap-4 md:gap-0 md:flex-row items-center md:items-center md:justify-between md:p-6">
      <span className="text-sm text-white sm:text-center flex flex-col items-center md:items-start">
        © 2025 Today&apos;s Carolinian. All Rights Reserved.
        <Dialog>
          <DialogTrigger className="text-sm text-white sm:text-center hover:underline cursor-pointer">
            Support Today&apos;s Carolinian!
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
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white sm:mt-0">
        {socialLinks.map(({ href, icon, label }, index) => (
          <li key={index} className="flex items-center">
            <Link
              target="_blank"
              href={href}
              className="hover:underline me-4 md:me-6"
              aria-label={label}
            >
              {icon}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
