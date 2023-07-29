import { PRICE } from "@prisma/client"

export default function Price({ price }: { price: PRICE }) {
  const renderDolarSignsBaseOnPrice = () => {
    if (price === PRICE.CHEAP) {
      return (
        <>
          <span>$$</span>
          <span className="text-gray-400">$$</span>
        </>
      )
    }
    if (price === PRICE.REGULAR) {
      return (
        <>
          <span>$$$</span>
          <span className="text-gray-400">$</span>
        </>
      )
    }
    if (price === PRICE.EXPENSIVE) {
      return <span>$$$$</span>
    }
  }

  return <p className="mr-3">{renderDolarSignsBaseOnPrice()}</p>
}
