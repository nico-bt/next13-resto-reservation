import RestaurantNavbar from "./components/RestaurantNavbar"
import Title from "./components/Title"
import Rating from "./components/Rating"
import Description from "./components/Description"
import Images from "./components/Images"
import Reviews from "./components/Reviews"
import ReservartionCard from "./components/ReservartionCard"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const fetchRestaurantBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      name: true,
      main_image: true,
      images: true,
      cuisine: true,
      location: true,
      price: true,
      description: true,
      slug: true,
      reviews: true,
    },
  })

  if (!restaurant) throw new Error("Restaurant not found")

  return restaurant
}

async function RestaurantDetails({ params }: { params: { slug: string } }) {
  const restaurant = await fetchRestaurantBySlug(params.slug)

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavbar slug={params.slug} />
        <Title name={restaurant.name} />
        <Rating price={restaurant.price} reviews={restaurant.reviews} />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews reviews={restaurant.reviews} />
      </div>

      <div className="w-[27%] relative text-reg">
        <ReservartionCard />
      </div>
    </>
  )
}

export default RestaurantDetails
