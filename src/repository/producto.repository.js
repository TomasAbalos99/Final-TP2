import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, "../../database.json");

const ensureDbFile = async () => {
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.writeFile(
      DB_PATH,
      JSON.stringify({ productos: [] }, null, 2),
      "utf-8"
    );
  }
};

const readDb = async () => {
  await ensureDbFile();
  const raw = await fs.readFile(DB_PATH, "utf-8");
  return raw.trim() ? JSON.parse(raw) : { productos: [] };
};

const writeDb = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
};

export const productoRepository = {
  findAll: async () => {
    const db = await readDb();
    return db.productos;
  },

  findById: async (id) => {
    const db = await readDb();
    return db.productos.find((p) => p.id === id) || null;
  },

  create: async (producto) => {
    const db = await readDb();
    db.productos.push(producto);
    await writeDb(db);
    return producto;
  },

  update: async (id, patch) => {
    const db = await readDb();
    const index = db.productos.findIndex((p) => p.id === id);

    if (index === -1) return null;

    db.productos[index] = { ...db.productos[index], ...patch, id };
    await writeDb(db);
    return db.productos[index];
  },

  delete: async (id) => {
    const db = await readDb();
    const index = db.productos.findIndex((p) => p.id === id);

    if (index === -1) return false;

    db.productos.splice(index, 1);
    await writeDb(db);
    return true;
  },
};