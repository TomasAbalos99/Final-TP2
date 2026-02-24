
import crypto from "crypto";
import { productoRepository } from "../repository/producto.repository.js";
import {
  createHttpError,
  normalizeProductoCreate,
  normalizeProductoUpdatePatch,
} from "../models/producto.model.js";

const ensureValidId = (id) => {
  if (!id || typeof id !== "string" || id.trim() === "") {
    throw createHttpError(400, "'id' inválido");
  }
  return id;
};

export const productoService = {

  createProducto: async (body) => {
    const data = normalizeProductoCreate(body); 
    const nuevo = { id: crypto.randomUUID(), ...data };
    return productoRepository.create(nuevo);
  },

  getAllProductos: async () => productoRepository.findAll(),

 
  getProductoById: async (id) => {
    const safeId = ensureValidId(id);
    const p = await productoRepository.findById(safeId);
    if (!p) throw createHttpError(404, "Producto no encontrado");
    return p;
  },


  updateProducto: async (id, body) => {
    const safeId = ensureValidId(id);
    const patch = normalizeProductoUpdatePatch(body); 
    const updated = await productoRepository.update(safeId, patch);
    if (!updated) throw createHttpError(404, "Producto no encontrado");
    return updated;
  },

  
  deleteProducto: async (id) => {
    const safeId = ensureValidId(id);
    const ok = await productoRepository.delete(safeId);
    if (!ok) throw createHttpError(404, "Producto no encontrado");
    return { deleted: true };
  },
};