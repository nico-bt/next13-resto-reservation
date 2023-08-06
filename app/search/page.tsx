import { PRICE, PrismaClient } from "@prisma/client"
import Header from "./components/Header"
import RestaurantCard from "./components/RestaurantCard"
import SearchSideBar from "./components/SearchSideBar"
import { equal } from "assert"

interface searchParams {
  city?: string
  cuisine?: string
  price?: PRICE
}

const prisma = new PrismaClient()

//Getting data funcs
//--------------------------------------------------------------------------------
const fetchRestaurantsByQueryParams = async (searchParams: searchParams) => {
  const where: any = {}

  if (searchParams?.city) {
    const location = { name: { contains: searchParams.city.toLowerCase() } }
    where.location = location
  }

  if (searchParams?.cuisine) {
    const cuisine = { name: { contains: searchParams.cuisine } }
    where.cuisine = cuisine
  }
  if (searchParams?.price) {
    const price = { equals: searchParams.price }
    where.price = price
  }

  const propsToSelect = {
    id: true,
    name: true,
    slug: true,
    price: true,
    location: true,
    cuisine: true,
    main_image: true,
  }

  const restaurants = await prisma.restaurant.findMany({
    where,
    select: propsToSelect,
  })
  return restaurants
}

const getCuisineTypesForSidebar = async () => {
  const cuisines = await prisma.cuisine.findMany()
  return cuisines
}

const getPossibleLocationsForSidebar = async () => {
  const locations = await prisma.location.findMany()
  return locations
}

// Page Component
//--------------------------------------------------------------------------------
async function SearchPage({ searchParams }: { searchParams: searchParams }) {
  const restaurants = await fetchRestaurantsByQueryParams(searchParams)

  const cuisines = await getCuisineTypesForSidebar()
  const locations = await getPossibleLocationsForSidebar()

  return (
    <>
      <Header />

      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar locations={locations} cuisines={cuisines} searchParams={searchParams} />

        <div className="w-5/6">
          {restaurants?.length ? (
            restaurants.map((resto) => <RestaurantCard resto={resto} key={resto.id} />)
          ) : (
            <p className="text-2xl m-6">No restaurants matching your search</p>
          )}
        </div>
      </div>
    </>
  )
}

export default SearchPage
