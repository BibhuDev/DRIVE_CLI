import File from "../models/File.js";
import fs from "fs";
import path from "path";

export const uploadFile = async (req, res) => {
  try {
    const userId = "test-user"; // mock until we add JWT auth later

    // Create user folder if missing
    const userDir = path.join("uploads", userId);
    if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });

    // Move file into user directory
    const finalPath = path.join(userDir, req.file.filename);
    fs.renameSync(req.file.path, finalPath);

    // Save file metadata to MongoDB
    const file = await File.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: finalPath,
      mimetype: req.file.mimetype,
      size: req.file.size,
      userId,
      folderId: "root",
    });

    res.json({
      message: "File uploaded successfully",
      file,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
};
