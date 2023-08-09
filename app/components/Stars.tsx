import fullStar from "../../public/icons/full-star.png"
import halfStar from "../../public/icons/half-star.png"
import emptyStar from "../../public/icons/empty-star.png"
import Image from "next/image"
import { Review } from "@prisma/client"
import { calculateReviewRatingAverage } from "@/utils/calculateReviewsAverage"

export default function Stars({ reviews }: { reviews: Review[] }) {
  const ratingAvg = calculateReviewRatingAverage(reviews)

  const renderStars = () => {
    let stars = []

    // score could be 1 to 5 stars
    // checking diff to fill with star icons
    for (let score = 0; score < 5; score++) {
      const difference = ratingAvg - score

      if (difference >= 1) {
        stars.push(fullStar)
      } else if (difference > 0 && difference < 1) {
        if (difference <= 0.2) {
          stars.push(emptyStar)
        } else if (difference > 0.2 && difference <= 0.6) {
          stars.push(halfStar)
        }
      } else {
        stars.push(emptyStar)
      }
    }
    return stars.map((star) => {
      return <Image src={star} alt="star icon" className="w-4 h-4 mr-1" />
    })
  }

  return <div className="flex items-center">{renderStars()}</div>
}
