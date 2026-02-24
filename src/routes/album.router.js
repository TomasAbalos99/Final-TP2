import express from "express";
import { albumController } from "../controllers/album.controller.js";

export const albumRouter = express.Router();

albumRouter.get("/csv", albumController.getAlbumsCsv);