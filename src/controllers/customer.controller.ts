import { db } from "@/db/db";
import { RequestHandler } from "express";

const getCustomers: RequestHandler = async (req, res) => {
  try {
    const customers = await db.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(customers);
  } catch (error) {
    console.log(error);
  }
};

const getCustomer: RequestHandler = async (req, res) => {
  const { customerId } = req.params;

  try {
    const customer = await db.customer.findUnique({
      where: { id: customerId },
    });

    res.status(200).json(customer);
  } catch (error) {
    console.log(error);
  }
};

const createCustomer: RequestHandler = async (req, res) => {
  try {
    const newCustomer = await db.customer.create({
      data: req.body,
    });

    res.status(201).json(newCustomer);
  } catch (error) {
    console.log(error);
  }
};

const updateCustomer: RequestHandler = async (req, res) => {
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

const deleteCustomer: RequestHandler = async (req, res) => {
  const { customerId } = req.params;

  try {
    const deletedCustomer = await db.customer.delete({
      where: { id: customerId },
    });

    res.status(200).json(deletedCustomer);
  } catch (error) {
    console.log(error);
  }
};

export const customerControllers = {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
