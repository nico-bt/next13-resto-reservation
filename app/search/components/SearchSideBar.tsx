import { Cuisine, Location, PRICE } from "@prisma/client"
import Link from "next/link"

function SearchSideBar({
  locations,
  cuisines,
  searchParams,
}: {
  locations: Location[]
  cuisines: Cuisine[]
  searchParams: { city?: string; cuisine?: string; price?: PRICE }
}) {
  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {locations.map((loc) => (
          <Link
            href={{ pathname: "/search", query: { ...searchParams, city: loc.name } }}
            className={`text-reg capitalize  ${
              searchParams.city == loc.name ? "font-bold" : "font-light"
            }`}
            key={loc.id}
          >
            {loc.name}
          </Link>
        ))}
      </div>

      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine) => (
          <Link
            href={{ pathname: "/search", query: { ...searchParams, cuisine: cuisine.name } }}
            key={cuisine.id}
            className={`text-reg capitalize  ${
              searchParams.cuisine == cuisine.name ? "font-bold" : "font-light"
            }`}
          >
            {cuisine.name}
          </Link>
        ))}
      </div>

      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex text-center">
          <Link
            className="border w-full text-reg font-light rounded-l p-2"
            href={{ pathname: "/search", query: { ...searchParams, price: PRICE.CHEAP } }}
            style={searchParams.price === "CHEAP" ? { backgroundColor: "lightgray" } : {}}
          >
            $
          </Link>
          <Link
            className="border-r border-t border-b w-full text-reg font-light p-2"
            href={{ pathname: "/search", query: { ...searchParams, price: PRICE.REGULAR } }}
            style={searchParams.price === "REGULAR" ? { backgroundColor: "lightgray" } : {}}
          >
            $$
          </Link>
          <Link
            className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r"
            href={{ pathname: "/search", query: { ...searchParams, price: PRICE.EXPENSIVE } }}
            style={searchParams.price === "EXPENSIVE" ? { backgroundColor: "lightgray" } : {}}
          >
            $$$
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchSideBar
