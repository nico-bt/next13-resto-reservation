import { Review } from "@prisma/client"

export const calculateReviewRatingAverage = (reviews: Review[]) => {
  if (!reviews.length) {
    return 0
  }

  const totalSum = reviews.reduce((sum, review) => {
    return sum + review.rating
  }, 0)

  const average = totalSum / reviews.length

  return average
}
