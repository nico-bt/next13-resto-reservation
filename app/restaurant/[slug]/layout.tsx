import { Metadata, ResolvingMetadata } from "next"
import Header from "./components/Header"

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const restoName = params.slug

  return {
    title: restoName,
  }
}

export default function RestaurantLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  return (
    <>
      <Header name={params.slug} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">{children}</div>
    </>
  )
}
