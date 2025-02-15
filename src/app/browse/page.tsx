import { Input } from "@/components/ui/input";
import Recents from "./_components/recent-files";
import Folders from "./_components/folders";

const BrowsePage = () => {
  return (
    <>
      <div className="space-y-12">
        <Recents />
        <Folders />
      </div>
    </>
  );
};

export default BrowsePage;
