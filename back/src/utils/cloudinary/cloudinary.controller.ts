import { Request, Response } from "express";

export const uploadController = (req: Request, res: Response): void => {
  if (!req.files) {
    res.status(400).json({ message: "No images uploaded" });
    return;
  }

  const urls = (req.files as Express.Multer.File[]).map((file) => file.path);
  res.status(200).json({ message: "Images uploaded successfully", urls });
};
