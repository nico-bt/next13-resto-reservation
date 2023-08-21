import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest, res: NextResponse) {
  const { firstName, lastName, email, phone, city, password } = await req.json()

  // Validate user input
  //----------------------------------------------------------
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

  // Check if user is already registered
  //----------------------------------------------------------
  const prisma = new PrismaClient()
  const userExists = await prisma.user.findUnique({ where: { email: email } })

  if (userExists) {
    return NextResponse.json({ errorMessage: "User already registered" }, { status: 400 })
  }

  // Hash password to store in db
  //----------------------------------------------------------
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)

  // Store user in db
  //----------------------------------------------------------
  const user = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      email,
      city,
      password: hashedPassword,
      phone,
    },
  })

  const daysInSecs = 1 * 24 * 60 * 60
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, {
    expiresIn: daysInSecs,
  })

  return NextResponse.json({ token })
}
