import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, password } = await req.json()

  // Validate user input
  //----------------------------------------------------------
  if (!email || !password) {
    return NextResponse.json({ errorMessage: "Enter all fields" }, { status: 400 })
  }

  if (!validator.isEmail(email)) {
    return NextResponse.json({ errorMessage: "Enter a valid email" }, { status: 400 })
  }

  // Check if user is already registered
  //----------------------------------------------------------
  const prisma = new PrismaClient()
  const userExists = await prisma.user.findUnique({ where: { email: email } })

  if (!userExists) {
    return NextResponse.json({ errorMessage: "Email not registered" }, { status: 401 })
  }

  // Check credentials
  //----------------------------------------------------------
  const passwordMatch = await bcrypt.compare(password, userExists.password)

  if (!passwordMatch) {
    return NextResponse.json({ errorMessage: "Wrong password" }, { status: 401 })
  }

  // Return token
  const daysInSecs = 1 * 24 * 60 * 60
  const token = jwt.sign({ email: userExists.email }, process.env.JWT_SECRET as string, {
    expiresIn: daysInSecs,
  })

  return NextResponse.json({ token })
}
