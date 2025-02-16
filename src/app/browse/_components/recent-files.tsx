import { Dot, FileText } from "lucide-react";

const mockData = [
  { title: "The Carolinian", publisher: "The Carolinian", category: "Magazine", lastModified: "2023-03-31 12:09:14" },
  { title: "The Carolinian", publisher: "The Carolinian", category: "Magazine", lastModified: "2023-03-31 12:09:14" },
  { title: "The Carolinian", publisher: "The Carolinian", category: "Magazine", lastModified: "2023-03-31 12:09:14" },
  { title: "The Carolinian", publisher: "The Carolinian", category: "Magazine", lastModified: "2023-03-31 12:09:14" }
];

const Recents = () => {
  return (
    <section className="space-y-6.5">
      <h1 className="text-lg font-bold">Recent</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockData.map((file, idx) => (
          <div key={idx} className="flex items-center gap-4 border p-4 rounded-xl hover:shadow cursor-pointer">
            <div className="p-3.5 rounded-xl border bg-gray-100/50">
              <FileText />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold">{file.title}</h2>
              <div className="text-sm text-muted-foreground flex items-center">
                <p>{file.publisher}</p>
                <Dot className="mx-1 w-4 h-4" />
                <p>{file.category}</p>
              </div>
              <p className="text-xs text-gray-400">{file.lastModified}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recents;
