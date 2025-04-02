import Facebook from "@/components/layout/icons/Facebook";
import Instagram from "@/components/layout/icons/Instagram";
import Twitter from "@/components/layout/icons/Twitter";
import Mail from "@/components/layout/icons/Mail";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  const socMedIcons = [
    {
      href: "https://www.facebook.com/todayscarolinian",
      icon: <Facebook size={28} />,
    },
    {
      href: "https://www.instagram.com/todaysusc/",
      icon: <Instagram size={28} />,
    },
    {
      href: "https://x.com/todaysusc",
      icon: <Twitter size={28} />,
    },
    {
      href: "mailto:todayscarolinianusc@gmail.com",
      icon: <Mail size={28} />,
    },
  ];

  return (
    <section className="h-svh flex flex-col justify-between">
      <nav className="flex p-8">
        <Image
          src="/tc-logo-red.png"
          alt="tc-logo"
          className="max-w-16"
          width={1667}
          height={1667}
        />
      </nav>
      <main className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-10 max-w-sm md:max-w-2xl lg:max-w-4xl">
          <Image
            src="/tc-banner.png"
            alt="tc-banner"
            className="max-w-sm sm:max-w-lg md:max-w-4xl lg:max-w-4xl"
            width={7369}
            height={1090}
          />
          <p className="text-center">
            Our website is currently{" "}
            <span className="text-primary-500 font-bold">
              under construction
            </span>
            . We&apos;re working hard to create something amazing. Stay tuned!
          </p>
        </div>
        <div className="py-10 flex items-center gap-8">
          {socMedIcons.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </main>
      <footer className="bg-primary-500 flex flex-col items-center py-8 text-white">
        <p>Made with ♥ by TC WebDevs</p>
        <p>
          Completely independent since 2019.{" "}
          <Dialog>
            <DialogTrigger className="transition-colors underline font-bold text-base cursor-pointer">
              Support TC today!
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
        </p>
      </footer>
    </section>
  );
}
