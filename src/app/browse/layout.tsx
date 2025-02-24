import { Input } from "@/components/ui/input";
import { Metadata } from "next";

type BrowseLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Browse | Digital Archive"
}

const BrowseLayout = ({ children }: BrowseLayoutProps) => {
  return (
    <section className="flex flex-col gap-8 pt-24 pb-34 px-4 md:px-8">
      {/* 
        For the Search feature, we could query and keep hitting the database or 
        cache the data first and do simple filtering in the client side 
      */}
      <div className="flex justify-center">
        <Input placeholder="Search issues..." className="w-full max-w-lg" />
      </div>
      {children}
    </section>
  );
};

export default BrowseLayout;
