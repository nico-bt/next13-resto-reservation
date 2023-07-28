import RestaurantNavbar from "./components/RestaurantNavbar"
import Title from "./components/Title"
import Rating from "./components/Rating"
import Description from "./components/Description"
import Images from "./components/Images"
import Reviews from "./components/Reviews"
import ReservartionCard from "./components/ReservartionCard"

function RestaurantDetails() {
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavbar />
        <Title />
        <Rating />
        <Description />
        <Images />
        <Reviews />
      </div>

      <div className="w-[27%] relative text-reg">
        <ReservartionCard />
      </div>
    </>
  )
}

export default RestaurantDetails