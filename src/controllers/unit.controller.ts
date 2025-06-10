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

const updateUnit: RequestHandler = async (req, res) => {
  const { customerId } = req.params;

  try {
    const updatedCustomer = await db.customer.update({
      where: { id: customerId },
      data: req.body,
    });

    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.log(error);
  }
};

const deleteUnit: RequestHandler = async (req, res) => {
  const { customerId } = req.params;

  try {
    const deletedCustomer = await db.customer.delete({
      where: { id: customerId },
    });

    res.status(204).json(deletedCustomer);
  } catch (error) {
    console.log(error);
  }
};

export const unitControllers = {
  createUnit,
  updateUnit,
  deleteUnit,
};
