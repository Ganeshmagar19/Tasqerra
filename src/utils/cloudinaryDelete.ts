import cloudinary from "../config/cloudinary";

// export const deleteFromCloudinary = async (url: string) => {
//   try {
//     if (!url) return;

//     const parts = url.split("/");
//     const publicIdWithExt = parts.slice(-2).join("/"); 
//     const publicId = publicIdWithExt.split(".")[0]; 

//     await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
//   } catch (err) {
//     console.error("Cloudinary delete failed:", err);
//   }
// };

export const deleteFromCloudinary = async (publicId: string, type: "image" | "video" | "raw" = "image") => {
  try {
    if (!publicId) return;

    return await cloudinary.uploader.destroy(publicId, {
      resource_type: type,
    });
  } catch (err) {
    console.log("Cloudinary delete failed:", err);
  }
};
