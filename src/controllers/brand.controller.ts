import { db } from "@/db/db";
import { TError } from "@/interfaces/error";
import { RequestHandler } from "express";

const createBrand: RequestHandler = async (req, res, next) => {
  try {
    const newBrand = await db.brand.create({
      data: req.body,
    });

    res.status(201).json(newBrand);
  } catch (error: TError) {
    console.log(error);
    next(error);
  }
};

const getBrands: RequestHandler = async (req, res, next) => {
  try {
    const brands = await db.brand.findMany();

    res.status(200).json(brands);
  } catch (error: TError) {
    console.log(error);
    next(error);
  }
};

const getBrand: RequestHandler = async (req, res, next) => {
  try {
    const brand = await db.brand.findUnique({
      where: {
        id: req.params.brandId,
      },
    });

    if (!brand) {
      const error: TError = new Error("Brand not found!");
      error.status = 404;
      throw error;
    }

    res.status(200).json(brand);
  } catch (error: TError) {
    console.log(error);
    next(error);
  }
};

const updateBrand: RequestHandler = async (req, res, next) => {
  const { brandId } = req.params;

  try {
    const updatedBrand = await db.brand.update({
      where: { id: brandId },
      data: req.body,
    });

    res.status(200).json(updatedBrand);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteBrand: RequestHandler = async (req, res) => {
  const { brandId } = req.params;

  try {
    await db.brand.delete({
      where: { id: brandId },
    });
    res.status(200).json({
      success: true,
      message: "The brand is deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

export const brandControllers = {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};
