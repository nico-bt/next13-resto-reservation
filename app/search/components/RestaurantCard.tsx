import Price from "@/app/components/Price"
import { Cuisine, Location, PRICE } from "@prisma/client"
import Link from "next/link"

interface restaurantType {
  id: number
  name: string
  slug: string
  price: PRICE
  location: Location
  cuisine: Cuisine
  main_image: string
}

function RestaurantCard({ resto }: { resto: restaurantType }) {
  return (
    <div className="border-b flex pb-5 ml-6">
      <img src={resto.main_image} alt={resto.name + "image"} className="w-44 h-36 rounded mt-1" />
      <div className="pl-5">
        <h2 className="text-3xl">{resto.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">*****</div>
          <p className="ml-2 text-sm">Awesome</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <p className="mr-4">
              <Price price={resto.price} />{" "}
            </p>
            <p className="mr-4 capitalize">{resto.cuisine?.name}</p>
            <p className="mr-4 capitalize">{resto.location?.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={"/restaurant/" + resto.slug}>View more information </Link>
        </div>
      </div>
    </div>
  )
}

export default RestaurantCard
