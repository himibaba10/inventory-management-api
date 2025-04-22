import { db } from "@/db/db";
import { RequestHandler } from "express";
import bcrypt from "bcrypt";

const createUser: RequestHandler = async (req, res) => {
  const {
    email,
    username,
    password,
    firstName,
    lastName,
    phone,
    dob,
    gender,
    image,
  } = req.body;

  try {
    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ email }, { username }, { phone }],
      },
    });

    if (existingUser) {
      res.status(409).json({
        error: "User already exists with email, or username, or phone",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        dob,
        gender,
        image: image || "https://i.ibb.co.com/Trqnb1c/pngwing-com.png",
      },
    });

    const { password: ps, ...userRemainingInfo } = newUser;

    res.status(201).json(userRemainingInfo);
  } catch (error) {
    res.status(400).json({
      message: (error as any).message,
      stack: error,
    });
  }
};

export const userControllers = {
  createUser,
};
