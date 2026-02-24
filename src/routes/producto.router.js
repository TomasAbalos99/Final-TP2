import express from "express";
import { productoController } from "../controllers/producto.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const productoRouter = express.Router();

productoRouter.post("/", productoController.createProducto);
productoRouter.get("/", productoController.getAllProductos);
productoRouter.get("/:id", productoController.getProductoById);

// protegidas
productoRouter.put("/:id", authMiddleware, productoController.updateProducto);
productoRouter.delete("/:id", authMiddleware, productoController.deleteProducto);