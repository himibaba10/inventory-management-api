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

const getShops: RequestHandler = async (req, res) => {
  try {
    const shops = await db.shop.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!shops.length) {
      res.status(404).json({
        error: `There are no shops`,
      });
      return;
    }

    res.status(200).json({ data: shops, error: null });
  } catch (error) {
    res.status(400).json({
      message: (error as any).message,
      stack: error,
    });
  }
};

const getShop: RequestHandler = async (req, res) => {
  try {
    const { shopId } = req.params;
    const shop = await db.shop.findUnique({
      where: {
        id: shopId,
      },
    });

    if (!shop) {
      res.status(404).json({
        error: `Shop not found!`,
      });
      return;
    }

    res.status(200).json({ data: shop, error: null });
  } catch (error) {
    res.status(400).json({
      message: (error as any).message,
      stack: error,
    });
  }
};

const getShopAttendants: RequestHandler = async (req, res) => {
  try {
    const { shopId } = req.params;
    const shop = await db.shop.findUnique({
      where: {
        id: shopId,
      },
    });

    if (!shop) {
      res.status(404).json({
        error: `Shop not found`,
      });
      return;
    }

    const attendants = await db.user.findMany({
      where: {
        id: {
          in: shop.attendantIds,
        },
      },
      omit: {
        password: true,
      },
    });

    if (!attendants.length) {
      res.status(404).json({
        error: `There are no attendants`,
      });
      return;
    }

    res.status(200).json({ data: attendants, error: null });
  } catch (error) {
    res.status(400).json({
      message: (error as any).message,
      stack: error,
    });
  }
};

const addShopAttendant: RequestHandler = async (req, res) => {
  try {
    const { shopId, attendantId } = req.params;
    const shop = await db.shop.findUnique({
      where: {
        id: shopId,
      },
    });

    if (!shop) {
      res.status(404).json({
        error: `Shop not found`,
      });
      return;
    }

    const attendant = await db.user.findUnique({
      where: {
        id: attendantId,
      },
    });

    if (!attendant) {
      res.status(404).json({
        error: `Attendant not found`,
      });
      return;
    }

    const updatedShop = await db.shop.update({
      where: {
        id: shopId,
      },
      data: {
        attendantIds: {
          push: attendantId,
        },
      },
    });

    res.status(200).json({ data: updatedShop, error: null });
  } catch (error) {
    res.status(400).json({
      message: (error as any).message,
      stack: error,
    });
  }
};

export const shopControllers = {
  getShops,
  getShop,
  getShopAttendants,
  createShop,
  addShopAttendant,
};
