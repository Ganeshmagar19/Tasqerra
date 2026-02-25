import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => ({
    folder: "taskflow/attachments",
    resource_type: "auto",
    format: file.mimetype.split("/")[1],
    allowed_formats: [
      "jpg", "jpeg", "png", "webp",
      "mp4", "mov", "avi", "mkv", "webm",
      "pdf", "docx", "xlsx"
    ],
  }),
});

export const upload = multer({ storage });
