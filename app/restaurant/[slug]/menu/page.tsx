import RestaurantNavbar from "../components/RestaurantNavbar"
import Menu from "../components/Menu"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const fetchMenuItems = async (slug: string) => {
  const resto = await prisma.restaurant.findUnique({ where: { slug }, select: { items: true } })

  if (!resto) {
    throw new Error("No resto")
  }

  return resto.items
}

async function MenuPage({ params }: { params: { slug: string } }) {
  const menuItems = await fetchMenuItems(params.slug)

  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavbar slug={params.slug} />
      <Menu menuItems={menuItems} />
    </div>
  )
}

export default MenuPage
