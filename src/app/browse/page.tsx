import { Input } from "@/components/ui/input";
import Recents from "./_components/recent-files";
import Folders from "./_components/folders";

const BrowsePage = () => {
  return (
    <section className="flex flex-col gap-8 pt-24 pb-34 px-4 md:px-8">
      <div className="flex justify-center">
        <Input placeholder="Search" className="w-full max-w-lg" />
      </div>
      <Recents />
      <Folders />
    </section>
  );
};

export default BrowsePage;
