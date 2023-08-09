"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

function Header() {
  const [location, setLocation] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/search/?city=${location}`)
    setLocation("")
  }

  return (
    <div className="bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2">
      <form
        className="text-left text-lg py-3 m-auto flex justify-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          className="rounded  mr-3 p-2 w-[450px]"
          type="text"
          placeholder="State, city or town"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit" className="rounded bg-red-600 px-9 py-2 text-white">
          Let's go
        </button>
      </form>
    </div>
  )
}

export default Header
