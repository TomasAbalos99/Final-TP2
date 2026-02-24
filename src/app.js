import express from "express";
import cors from "cors";
import { productoRouter } from "./routes/producto.router.js";
import { albumRouter } from "./routes/album.router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/productos", productoRouter);
app.use("/api/v1/albums", albumRouter);
export default app;