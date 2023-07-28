import { Metadata } from "next"
import Header from "./[slug]/components/Header"

export const metadata: Metadata = {
  title: "Nombre del Resto",
}

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />

      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">{children}</div>
    </>
  )
}
