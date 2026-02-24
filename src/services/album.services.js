import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// lo guardamos en raíz del proyecto
const CSV_PATH = path.resolve(__dirname, "../../albums_15.csv");

const toCsv = (rows) => {
  const header = ["userId", "id", "title"];
  const escape = (v) => `"${String(v).replaceAll('"', '""')}"`;

  const lines = [
    header.join(","),
    ...rows.map((r) => [r.userId, r.id, r.title].map(escape).join(",")),
  ];

  return lines.join("\n");
};

export const albumService = {
  getAlbumsCsv: async () => {
    const resp = await fetch("https://jsonplaceholder.typicode.com/albums");
    if (!resp.ok) {
      const e = new Error("Error al obtener albums");
      e.statusCode = 502;
      throw e;
    }

    const albums = await resp.json();
    const first15 = albums.slice(0, 15);

    const csv = toCsv(first15);
    await fs.writeFile(CSV_PATH, csv, "utf-8");

    return { csv, filePath: CSV_PATH };
  },
};