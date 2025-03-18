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
      { userId: user.id, role: user.role },
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
      select: {
        id: true,
        username: true,
        full_name: true,
        email: true,
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
      select: {
        id: true,
        username: true,
        full_name: true,
        email: true,
        role: true,
      },
    });

    await prisma.parent.create({
      data: {
        id: user.id,
      },
    });

    res.json({
      message: "Register successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error register", error });
  }
};

export const getUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    // Lấy thông tin cơ bản của người dùng
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: {
        id: true,
        username: true,
        full_name: true,
        email: true,
        picture: true,
        role: true,
        phone: true,
        walletAmount: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    let additionalData: {} | null = {};
    switch (user.role) {
      case "Parent":
        additionalData = await prisma.parent.findUnique({
          where: { id: Number(userId) },
          select: {
            preferred_language: true,
            notifications_enabled: true,
            childrens: {
              include: {
                profile: {
                  select: {
                    full_name: true,
                    email: true,
                    picture: true,
                    username: true,
                  },
                },
                courseSubscriptions: {
                  include: {
                    course: true,
                  },
                },
              },
            },
          },
        });
        break;

      case "Tutor":
        additionalData = await prisma.tutor.findUnique({
          where: { id: Number(userId) },
          select: {
            bio: true,
            qualifications: true,
            teaching_style: true,
            is_available: true,
            demo_video_url: true,
            image: true,
          },
        });
        break;

      case "Children":
        additionalData = await prisma.children.findUnique({
          where: { id: Number(userId) },
          select: {
            learning_goals: true,
            date_of_birth: true,
            parent_id: true,
            courseSubscriptions: {
              include: {
                course: true,
                teachingSessions: true,
              },
            },
          },
        });
        break;
    }

    res.json({
      message: "Get user data successfully",
      data: {
        ...user,
        ...additionalData,
        walletAmount: Number(user.walletAmount),
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Error fetching user data", error });
  }
};
