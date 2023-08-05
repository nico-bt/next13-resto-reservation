import { PrismaClient } from "@prisma/client"
import Header from "./components/Header"
import RestaurantCard from "./components/RestaurantCard"
import SearchSideBar from "./components/SearchSideBar"

const prisma = new PrismaClient()

const fetchRestaurantsByLocation = async (city: string | undefined) => {
  const propsToSelect = {
    id: true,
    name: true,
    slug: true,
    price: true,
    location: true,
    cuisine: true,
    main_image: true,
  }

  if (!city) {
    const allRestaurants = await prisma.restaurant.findMany({ select: propsToSelect })
    return allRestaurants
  }

  const restaurants = await prisma.restaurant.findMany({
    where: { location: { name: { contains: city.toLocaleLowerCase() } } },
    select: propsToSelect,
  })

  return restaurants
}

async function SearchPage({ searchParams }: { searchParams: { city: string } }) {
  const restaurants = await fetchRestaurantsByLocation(searchParams?.city)

  return (
    <>
      <Header />

      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar />
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
