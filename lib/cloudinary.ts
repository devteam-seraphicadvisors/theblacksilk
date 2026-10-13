// Server-side only (uses the API secret). Import from API routes only.
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

// All uploads go into this single Cloudinary folder (set in .env.local).
// Nothing is written outside it.
const FOLDER = process.env.CLOUDINARY_FOLDER_NAME?.replace(/^\/+|\/+$/g, "");

export function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET &&
      FOLDER
  );
}

function client() {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary is not configured: set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET and CLOUDINARY_FOLDER_NAME"
    );
  }
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  return cloudinary;
}

// One avatar per user, at a fixed public ID inside the folder, so re-uploads
// replace the previous image instead of piling up new files.
const avatarPublicId = (userId: string) => `${FOLDER}/avatar_${userId}`;

export async function uploadAvatar(userId: string, file: Buffer): Promise<string> {
  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = client().uploader.upload_stream(
      {
        public_id: avatarPublicId(userId),
        overwrite: true,
        invalidate: true,
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        // Store a square, face-centred 512px version
        transformation: [{ width: 512, height: 512, crop: "fill", gravity: "face" }],
      },
      (error, uploaded) => {
        if (error || !uploaded) reject(error ?? new Error("Upload failed"));
        else resolve(uploaded);
      }
    );
    stream.end(file);
  });
  return result.secure_url;
}

export async function deleteAvatar(userId: string) {
  await client().uploader.destroy(avatarPublicId(userId), {
    resource_type: "image",
    invalidate: true,
  });
}
