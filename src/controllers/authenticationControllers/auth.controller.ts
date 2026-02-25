import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma from "../../config/prisma"

const JWT_SECRET = process.env.JWT_SECRET as string

export const AuthController = {

  // ==========================
  // REGISTER
  // ==========================
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" })
      }

      const existingUser = await prisma.user.findUnique({
        where: { email }
      })

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        }
      })

      return res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      })

    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Internal server error" })
    }
  },

  // ==========================
  // LOGIN
  // ==========================
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" })
      }

      const user = await prisma.user.findUnique({
        where: { email }
      })

      if (!user || !user.password) {
        return res.status(401).json({ message: "Invalid credentials" })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" })
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      )

      return res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      })

    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Internal server error" })
    }
  }

}