import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="h-svh flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col items-center gap-10 max-w-sm md:max-w-2xl lg:max-w-4xl">
        <Image
          src="/tc-banner.png"
          alt="tc-banner"
          className="max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl"
          width={7369}
          height={1090}
        />
        <p className="text-xl text-center">
          Explore historical articles and magazines of Today&apos;s Carolinian
          from past years.
        </p>
      </div>
      <Link
        href="/browse"
        className="bg-primary-500 hover:bg-primary-700 text-white flex cursor-pointer px-4 py-2 rounded-md items-center gap-2"
      >
        Browse <ChevronRight />
      </Link>
    </section>
  );
}
