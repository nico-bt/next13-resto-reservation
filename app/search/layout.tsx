import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Search Resto",
  description: "Make a reservation for your chosen restaurant",
}

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
