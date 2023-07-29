import Price from "@/app/components/Price"
import { PRICE } from "@prisma/client"

export default function Rating({ price }: { price: PRICE }) {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Price price={price} />
        <p className="text-reg ml-3">4.9</p>
      </div>
      <div>
        <p className="text-reg ml-4">600 Reviews</p>
      </div>
    </div>
  )
}
