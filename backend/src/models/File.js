import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  path: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  userId: { type: String, required: true }, // temporary; will later link to a real User model
  folderId: { type: String, default: "root" }, // supports nested folders later
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("File", fileSchema);
