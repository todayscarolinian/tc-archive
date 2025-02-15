import { Input } from "@/components/ui/input";

type BrowseLayoutProps = {
  children: React.ReactNode
}

const BrowseLayout = ({ children }: BrowseLayoutProps) => {
  return (
    <section className="flex flex-col gap-8 pt-24 pb-34 px-4 md:px-8">
      <div className="flex justify-center">
        <Input placeholder="Search issues..." className="w-full max-w-lg" />
      </div>
      {children}
    </section>
  )
}

export default BrowseLayout;