"use client"

import { useRouter } from "next/navigation"
import { MouseEvent, useState } from "react"

function Header() {
  const router = useRouter()
  const [location, setLocation] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // If no text entered, show all restos
    if (location === "") {
      router.push("/search")
    } else {
      router.push(`/search/?city=${location}`)
    }
    setLocation("")
  }

  return (
    <div className="h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2">
      <div className="text-center mt-10">
        <h1 className="text-white text-5xl font-bold mb-2">Find your table for any occasion</h1>

        <form className="text-left text-lg py-3 m-auto flex justify-center" onSubmit={handleSubmit}>
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
    </div>
  )
}

export default Header
