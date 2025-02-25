import { Metadata } from "next";
import SearchInput from "./_components/search-input";

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
      <SearchInput />
      {children}
    </section>
  );
};

export default BrowseLayout;
