import { albumService } from "../services/album.services.js";

const handleError = (res, error) => {
  const statusCode = error?.statusCode ?? 400;
  return res.status(statusCode).json({
    statusCode,
    error: error?.message ?? "Error",
  });
};

export const albumController = {
  getAlbumsCsv: async (_req, res) => {
    try {
      const { csv } = await albumService.getAlbumsCsv();
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      return res.status(200).send(csv);
    } catch (error) {
      return handleError(res, error);
    }
  },
};