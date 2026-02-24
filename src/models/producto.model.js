

export const createHttpError = (statusCode, message) => {
  const e = new Error(message);
  e.statusCode = statusCode;
  return e;
};

const todayYYYYMMDD = () => new Date().toISOString().slice(0, 10);

const isNonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;
const isInt = (v) => Number.isInteger(v);
const isYYYYMMDD = (v) => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v);


export const normalizeProductoCreate = (body) => {
  const { producto, stockAmount, fechaIngreso } = body ?? {};

  if (!isNonEmptyString(producto)) {
    throw createHttpError(400, "'producto' es requerido y no puede estar vacío");
  }
  if (!isInt(stockAmount) || stockAmount < 0) {
    throw createHttpError(400, "'stockAmount' es requerido, entero y >= 0");
  }
  if (fechaIngreso !== undefined && !isYYYYMMDD(fechaIngreso)) {
    throw createHttpError(400, "'fechaIngreso' debe tener formato YYYY-MM-DD");
  }

  return {
    producto: producto.trim(),
    stockAmount,
    fechaIngreso: fechaIngreso ?? todayYYYYMMDD(),
  };
};


export const normalizeProductoUpdatePatch = (body) => {
  const { producto, stockAmount, fechaIngreso } = body ?? {};
  const patch = {};

  if (producto !== undefined) {
    if (!isNonEmptyString(producto)) {
      throw createHttpError(400, "'producto' no puede estar vacío");
    }
    patch.producto = producto.trim();
  }

  if (stockAmount !== undefined) {
    if (!isInt(stockAmount) || stockAmount < 0) {
      throw createHttpError(400, "'stockAmount' debe ser entero y >= 0");
    }
    patch.stockAmount = stockAmount;
  }

  if (fechaIngreso !== undefined) {
    if (!isYYYYMMDD(fechaIngreso)) {
      throw createHttpError(400, "'fechaIngreso' debe tener formato YYYY-MM-DD");
    }
    patch.fechaIngreso = fechaIngreso;
  }

  if (Object.keys(patch).length === 0) {
    throw createHttpError(400, "Body vacío: enviar al menos un campo a modificar");
  }

  return patch;
};