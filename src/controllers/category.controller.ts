import { db } from "@/db/db";
import { TError } from "@/interfaces/error";
import { RequestHandler } from "express";

const createCategory: RequestHandler = async (req, res, next) => {
  try {
    const newCategory = await db.category.create({
      data: req.body,
    });

    res.status(201).json(newCategory);
  } catch (error: TError) {
    console.log(error);
    next(error);
  }
};

const getCategories: RequestHandler = async (req, res, next) => {
  try {
    const categories = await db.category.findMany();

    res.status(200).json(categories);
  } catch (error: TError) {
    console.log(error);
    next(error);
  }
};

const getCategory: RequestHandler = async (req, res, next) => {
  try {
    const category = await db.category.findUnique({
      where: {
        id: req.params.categoryId,
      },
    });

    if (!category) {
      const error: TError = new Error("Category not found!");
      error.status = 404;
      throw error;
    }

    res.status(200).json(category);
  } catch (error: TError) {
    console.log(error);
    next(error);
  }
};

const updateCategory: RequestHandler = async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const updatedCategory = await db.category.update({
      where: { id: categoryId },
      data: req.body,
    });

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteCategory: RequestHandler = async (req, res) => {
  const { categoryId } = req.params;

  try {
    await db.category.delete({
      where: { id: categoryId },
    });
    res.status(200).json({
      success: true,
      message: "The Category is deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

export const categoryControllers = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
