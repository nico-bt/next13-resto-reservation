import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import validator from "validator"

export async function POST(req: NextRequest, res: NextResponse) {
  const { firstName, lastName, email, phone, city, password } = await req.json()

  const errors: string[] = []

  const validationSchema = [
    {
      valid: validator.isLength(firstName, {
        min: 1,
        max: 30,
      }),
      errorMessage: "First name is invalid",
    },
    {
      valid: validator.isLength(lastName, {
        min: 1,
        max: 30,
      }),
      errorMessage: "Last name is invalid",
    },
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is invalid",
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMessage: "Phone number is invalid",
    },
    {
      valid: validator.isLength(city, { min: 1 }),
      errorMessage: "City is invalid",
    },
    {
      valid: validator.isLength(password, { min: 1 }),
      errorMessage: "Password required",
    },
  ]

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage)
    }
  })

  if (errors.length) {
    return NextResponse.json({ errorMessage: errors[0] }, { status: 400 })
  }

  const prisma = new PrismaClient()
  const userExists = await prisma.user.findUnique({ where: { email: email } })

  if (userExists) {
    return NextResponse.json({ errorMessage: "User already registered" }, { status: 400 })
  }

  return NextResponse.json({ email })
}
