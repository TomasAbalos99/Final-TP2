export const authMiddleware = (req, res, next) => {
  const apiKey = req.header("x-api-key");

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({
      statusCode: 401,
      error: "No autorizado: API Key invalida o faltante",
    });
  }

  return next();
};