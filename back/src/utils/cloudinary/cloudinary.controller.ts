import { Request, Response } from "express";

export const uploadController = (req: Request, res: Response): void => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      res.status(400).json({ message: "No se subió ningún archivo" });
      return;
    }
    // Devuelve el secure_url del primer archivo subido
    res.status(200).json({
      message: "Archivo subido exitosamente",
      secure_url: files[0].path,
    });
  } catch (error) {
    console.error("Error en uploadController:", error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Error interno",
    });
  }
};
