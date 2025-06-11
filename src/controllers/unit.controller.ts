import { db } from "@/db/db";
import { TError } from "@/interfaces/error";
import { RequestHandler } from "express";

const createUnit: RequestHandler = async (req, res, next) => {
  try {
    const newUnit = await db.unit.create({
      data: req.body,
    });

    res.status(201).json(newUnit);
  } catch (error: TError) {
    console.log(error);
    next(error);
  }
};

const getUnits: RequestHandler = async (req, res, next) => {
  try {
    const units = await db.unit.findMany();

    res.status(200).json(units);
  } catch (error: TError) {
    console.log(error);
    next(error);
  }
};

const getUnit: RequestHandler = async (req, res, next) => {
  try {
    const unit = await db.unit.findUnique({
      where: {
        id: req.params.unitId,
      },
    });

    if (!unit) {
      const error: TError = new Error("Unit not found!");
      error.status = 404;
      throw error;
    }

    res.status(200).json(unit);
  } catch (error: TError) {
    console.log(error);
    next(error);
  }
};

const updateUnit: RequestHandler = async (req, res) => {
  const { unitId } = req.params;

  try {
    const updatedUnit = await db.unit.update({
      where: { id: unitId },
      data: req.body,
    });

    res.status(200).json(updatedUnit);
  } catch (error) {
    console.log(error);
  }
};

const deleteUnit: RequestHandler = async (req, res) => {
  const { unitId } = req.params;

  try {
    await db.unit.delete({
      where: { id: unitId },
    });

    res.status(204).json({
      success: true,
      message: "The unit is deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

export const unitControllers = {
  getUnits,
  getUnit,
  createUnit,
  updateUnit,
  deleteUnit,
};
