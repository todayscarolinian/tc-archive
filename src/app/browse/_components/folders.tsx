import { Folder, Dot } from "lucide-react";

const mockData = [
  { year: "1964", numOfIssues: "6 issues", lastModified: "2023-03-31 12:09:14" },
  { year: "1965", numOfIssues: "4 issues", lastModified: "2023-03-31 12:09:14" },
  { year: "1966", numOfIssues: "3 issues", lastModified: "2023-03-31 12:09:14" },
  { year: "1967", numOfIssues: "7 issues", lastModified: "2023-03-31 12:09:14" },
  { year: "1968", numOfIssues: "5 issues", lastModified: "2023-03-31 12:09:14" },
  { year: "1969", numOfIssues: "2 issues", lastModified: "2023-03-31 12:09:14" },
];

const Folders = () => {
  return (
    <section className="space-y-6.5">
      <h1 className="text-2xl font-bold">Folders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockData.map((folder, idx) => (
          <div key={idx} className="flex flex-col p-6 gap-4 rounded-xl bg-gray-200/50 hover:shadow-lg">
            <Folder className="w-8 h-8"/>
            <div>
              <h2 className="font-bold text-lg">{folder.year}</h2>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>{folder.numOfIssues}</span>
                <Dot className="mx-1" />
                <span>{folder.lastModified}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Folders;
