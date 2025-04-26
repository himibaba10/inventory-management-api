import { db } from "@/db/db";
import { RequestHandler } from "express";

const createShop: RequestHandler = async (req, res) => {
  try {
    const { name, slug, location, adminId, attendantIds } = req.body;
    const existingShop = await db.shop.findFirst({
      where: {
        slug,
      },
    });

    if (existingShop) {
      res.status(409).json({
        error: `Shop already exists with slug ${slug}`,
      });
      return;
    }

    const newShop = await db.shop.create({
      data: {
        name,
        slug,
        location,
        adminId,
        attendantIds,
      },
    });

    res.status(201).json({ data: newShop, error: null });
  } catch (error) {
    res.status(400).json({
      message: (error as any).message,
      stack: error,
    });
  }
};

export const shopControllers = {
  createShop,
};
