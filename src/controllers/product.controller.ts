import { db } from "@/db/db";
import { TError } from "@/interfaces/error";
import { RequestHandler } from "express";

const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const newProduct = await db.product.create({
      data: req.body,
    });

    res.status(201).json(newProduct);
  } catch (error: TError) {
    console.log(error);
    next(error);
  }
};

const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const products = await db.product.findMany();

    res.status(200).json(products);
  } catch (error: TError) {
    console.log(error);
    next(error);
  }
};

const getProduct: RequestHandler = async (req, res, next) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: req.params.productId,
      },
    });

    if (!product) {
      const error: TError = new Error("Product not found!");
      error.status = 404;
      throw error;
    }

    res.status(200).json(product);
  } catch (error: TError) {
    console.log(error);
    next(error);
  }
};

const updateProduct: RequestHandler = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const updatedProduct = await db.product.update({
      where: { id: productId },
      data: req.body,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteProduct: RequestHandler = async (req, res) => {
  const { productId } = req.params;

  try {
    await db.product.delete({
      where: { id: productId },
    });
    res.status(200).json({
      success: true,
      message: "The product is deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

export const productControllers = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
