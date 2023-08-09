import Price from "@/app/components/Price"
import Stars from "@/app/components/Stars"
import { calculateReviewRatingAverage } from "@/utils/calculateReviewsAverage"
import { PRICE, Review } from "@prisma/client"

export default function Rating({ price, reviews }: { price: PRICE; reviews: Review[] }) {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Price price={price} />
        <Stars reviews={reviews} />
        <span className="ml-1">
          {reviews.length >= 1 && Number(calculateReviewRatingAverage(reviews).toFixed(1))}
        </span>
      </div>
      <div>
        {reviews.length >= 1 && (
          <p className="text-reg ml-4">
            {reviews.length} Review{reviews.length > 1 && "s"}
          </p>
        )}
      </div>
    </div>
  )
}
