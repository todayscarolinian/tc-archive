import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface PageProps {
  params: { year: string };
}

const IssuesPage = async ({ params }: PageProps) => {
  const { year } = await params
  return (
    <div>
      <div className="space-y-6">
        <h1 className="font-bold text-2xl">Index of /browse/{year}</h1>
        <div className="flex items-center justify-between">
          <h1 className="text-lg">All Files</h1>
          <Button className="bg-[#9B2626]">
            <Plus />
            Add Issues
          </Button>
        </div>
      </div>
      {/* TODO: Table for the issues below */}
      <div className="flex justify-center items-center h-64">
        <h1>Table showing the issues here...</h1>
      </div>
    </div>
  )
}

export default IssuesPage;