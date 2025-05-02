import { db } from "@/db/db";
import { RequestHandler } from "express";

const getSuppliers: RequestHandler = async (req, res) => {
  try {
    const suppliers = await db.supplier.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(suppliers);
  } catch (error) {
    console.log(error);
  }
};

const getSupplier: RequestHandler = async (req, res) => {
  const { supplierId } = req.params;

  try {
    const supplier = await db.supplier.findUnique({
      where: { id: supplierId },
    });

    res.status(200).json(supplier);
  } catch (error) {
    console.log(error);
  }
};

const createSupplier: RequestHandler = async (req, res) => {
  try {
    const newSupplier = await db.supplier.create({
      data: req.body,
    });

    res.status(201).json(newSupplier);
  } catch (error) {
    console.log(error);
  }
};

const updateSupplier: RequestHandler = async (req, res) => {
  const { supplierId } = req.params;

  try {
    const updatedSupplier = await db.supplier.update({
      where: { id: supplierId },
      data: req.body,
    });

    res.status(200).json(updatedSupplier);
  } catch (error) {
    console.log(error);
  }
};

const deleteSupplier: RequestHandler = async (req, res) => {
  const { supplierId } = req.params;

  try {
    const deletedSupplier = await db.supplier.delete({
      where: { id: supplierId },
    });

    res.status(204).json(deletedSupplier);
  } catch (error) {
    console.log(error);
  }
};

export const supplierControllers = {
  getSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
