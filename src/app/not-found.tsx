import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="h-svh flex flex-col justify-center items-center gap-8">
      <div className="flex flex-col items-center gap-4 max-w-sm md:max-w-2xl lg:max-w-4xl">
        <p className="text-7xl text-center font-bold text-primary-500">Oops!</p>
        <p className="text-xl font-bold text-center uppercase">
          404 - Page Not Found
        </p>
        <p className="text-center">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
      </div>
      <Link
        href="/"
        className="bg-primary-500 hover:bg-primary-700 text-white flex cursor-pointer px-4 py-2 rounded-md items-center gap-1 uppercase"
      >
        <ChevronLeft /> Go to Homepage
      </Link>
    </section>
  );
}
