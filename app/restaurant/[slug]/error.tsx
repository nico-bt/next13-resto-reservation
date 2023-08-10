"use client"

import Image from "next/image"
import errorMascot from "@/public/icons/error.png"

export default function Error({ error }: { error: Error }) {
  return (
    <div className=" bg-gray-200 flex flex-col justify-center items-center absolute top-12 left-0 rigth-0 bottom-0 w-full">
      <Image src={errorMascot} alt="error" className="w-56 mb-4" />
      <div className="bg-white px-12 py-8 shadow rounded">
        <h3 className="text-3xl font-bold">Ups...</h3>
        <p className="text-2xl font-bold mt-2">{error.message}</p>
        <p className="mt-6 text-sm font-light">Error Code: 400</p>
      </div>
    </div>
  )
}
