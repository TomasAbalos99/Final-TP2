import { productoService } from "../services/producto.services.js";

const handleError = (res, error) => {
  const statusCode = error?.statusCode ?? 400;
  return res.status(statusCode).json({
    statusCode,
    error: error?.message ?? "Error",
  });
};

export const productoController = {
  createProducto: async (req, res) => {
    try {
      const producto = await productoService.createProducto(req.body);
      return res.status(201).json(producto);
    } catch (error) {
      return handleError(res, error);
    }
  },

  getAllProductos: async (_req, res) => {
    try {
      const productos = await productoService.getAllProductos();
      return res.status(200).json(productos);
    } catch (error) {
      return handleError(res, error);
    }
  },

  getProductoById: async (req, res) => {
    try {
      const producto = await productoService.getProductoById(req.params.id);
      return res.status(200).json(producto);
    } catch (error) {
      return handleError(res, error);
    }
  },

  updateProducto: async (req, res) => {
    try {
      const updated = await productoService.updateProducto(req.params.id, req.body);
      return res.status(200).json(updated);
    } catch (error) {
      return handleError(res, error);
    }
  },

  deleteProducto: async (req, res) => {
    try {
      const result = await productoService.deleteProducto(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return handleError(res, error);
    }
  },
};