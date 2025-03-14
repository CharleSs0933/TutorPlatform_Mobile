import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      String(process.env.JWT_SECRET),
      {
        expiresIn: "7d",
      }
    );
    res.json({
      message: "Login successfully",
      data: {
        accessToken: token,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error login", error });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password, full_name, email } = req.body;

  if (!username || !password || !full_name || !email) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    const checkUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    console.log(checkUser);

    if (checkUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        full_name,
        email,
      },
    });

    res.json({
      message: "Register successfully",
      data: { ...user, password: undefined },
    });
  } catch (error) {
    res.status(500).json({ message: "Error register", error });
  }
};
