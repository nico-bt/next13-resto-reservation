import Price from "@/app/components/Price"
import { calculateReviewRatingAverage } from "@/utils/calculateReviewsAverage"
import { PRICE, Review } from "@prisma/client"

export default function Rating({ price, reviews }: { price: PRICE; reviews: Review[] }) {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Price price={price} />
        <p className="text-reg ml-3">{Number(calculateReviewRatingAverage(reviews).toFixed(1))}</p>
      </div>
      <div>
        {reviews?.length && (
          <p className="text-reg ml-4">
            {reviews.length} Review{reviews.length > 1 && "s"}
          </p>
        )}
      </div>
    </div>
  )
}
