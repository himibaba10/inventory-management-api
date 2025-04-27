import { db } from "@/db/db";
import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { TError } from "@/interfaces/error";

const createUser: RequestHandler = async (req, res) => {
  try {
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
      role,
    } = req.body;
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
        role,
      },
    });

    const { password: ps, ...userRemainingInfo } = newUser;

    res.status(201).json({ data: userRemainingInfo, error: null });
  } catch (error: TError) {
    res.status(400).json({
      message: error.message,
      stack: error,
    });
  }
};

const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!users.length) {
      res.status(404).json({
        error: "User not found",
      });
      return;
    }

    const usersWithoutPassword = users.map(
      ({ password, ...userWithoutPassword }) => userWithoutPassword
    );

    res.status(200).json({ data: usersWithoutPassword, error: null });
  } catch (error: TError) {
    res.status(400).json({
      message: error.message,
      stack: error,
    });
  }
};

const getAttendants: RequestHandler = async (req, res) => {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        role: "ATTENDANT",
      },
    });

    if (!users.length) {
      res.status(404).json({
        error: "User not found",
      });
      return;
    }

    const usersWithoutPassword = users.map(
      ({ password, ...userWithoutPassword }) => userWithoutPassword
    );

    res.status(200).json({ data: usersWithoutPassword, error: null });
  } catch (error: TError) {
    res.status(400).json({
      message: error.message,
      stack: error,
    });
  }
};

const getUser: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.status(404).json({
        data: null,
        error: "User not found",
      });
      return;
    }

    res.status(200).json({ data: user, error: null });
  } catch (error: TError) {
    res.status(400).json({
      message: error.message,
      stack: error,
    });
  }
};

const updateUser: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    if (req.body.password) {
      delete req.body.password;
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { ...req.body },
    });

    if (!updatedUser) {
      res.status(404).json({
        error: "User not found",
      });
      return;
    }

    const { password, ...updatedUserWithoutPassword } = updatedUser;

    res.status(200).json({ data: updatedUserWithoutPassword, error: null });
  } catch (error: TError) {
    let message = (error as any).message;

    if (error?.stack && error?.meta?.target) {
      if (error?.meta?.target === "User_username_key") {
        message = "Username already exists";
      }

      if (error?.meta?.target === "User_email_key") {
        message = "Email already exists";
      }
    }

    res.status(400).json({
      message,
      stack: error,
    });
  }
};

const updateUserPassword: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!req.body.password) {
      res.status(404).json({
        error: "No password is specified",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    if (!updatedUser) {
      res.status(404).json({
        error: "User not found",
      });
      return;
    }

    const { password, ...updatedUserWithoutPassword } = updatedUser;

    res.status(200).json({ data: updatedUserWithoutPassword, error: null });
  } catch (error: TError) {
    res.status(400).json({
      message: error.message,
      stack: error,
    });
  }
};

const deleteUser: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await db.user.delete({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.status(404).json({
        data: null,
        error: "User not found",
      });
      return;
    }

    res.status(200).json({ data: user, success: true, error: null });
  } catch (error: TError) {
    res.status(400).json({
      message: error.message,
      stack: error,
    });
  }
};

export const userControllers = {
  createUser,
  getUsers,
  getAttendants,
  getUser,
  updateUser,
  updateUserPassword,
  deleteUser,
};
