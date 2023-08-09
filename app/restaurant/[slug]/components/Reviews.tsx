import Stars from "@/app/components/Stars"
import { Review } from "@prisma/client"

export default function Reviews({ reviews }: { reviews: Review[] }) {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
        {reviews.length === 0 && "No reviews yet"}

        {reviews.length >= 1 &&
          (reviews.length === 1
            ? "What 1 person is saying"
            : `What ${reviews.length} people are saying`)}
      </h1>
      <div>
        {reviews.length >= 1 &&
          reviews.map((review) => <ReviewCard review={review} key={review.id} />)}
      </div>
    </div>
  )
}

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className="border-b pb-7 mb-7">
      <div className="flex">
        <div className="w-1/6 flex flex-col items-center">
          <div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
            <h2 className="text-white text-2xl uppercase">
              {review.first_name[0] + review.last_name[0]}
            </h2>
          </div>
          <p className="text-center">
            {review.first_name} {review.last_name}
          </p>
        </div>
        <div className="ml-10 w-5/6">
          <Stars reviews={[review]} />
          <div className="mt-5">
            <p className="text-lg font-light">{review.text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
