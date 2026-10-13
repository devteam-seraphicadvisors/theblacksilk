"use client";

import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Camera, Loader2, Trash2, Upload } from "lucide-react";

interface AvatarUploaderProps {
  image: string | null;
  name: string;
  onChange: (image: string | null) => void;
}

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

const initials = (name: string) =>
  (name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

// Profile picture with upload / replace / remove. Uploads go to
// /api/user/avatar (Cloudinary + database); the session is refreshed so the
// header and sidebar show the new picture straight away.
export function AvatarUploader({ image, name, onChange }: AvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { update } = useSession();
  const [busy, setBusy] = useState<"upload" | "remove" | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const shown = preview ?? image;

  const handleFile = async (file: File) => {
    setError(null);
    if (!ACCEPTED.includes(file.type)) {
      setError("Please choose a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Image must be 5 MB or smaller.");
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    setBusy("upload");
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/user/avatar", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed.");
      onChange(data.image);
      await update();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      URL.revokeObjectURL(localPreview);
      setPreview(null);
      setBusy(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = async () => {
    setError(null);
    setBusy("remove");
    try {
      const res = await fetch("/api/user/avatar", { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not remove the picture.");
      onChange(null);
      await update();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not remove the picture.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
      <div className="relative w-28 h-28 flex-shrink-0 border border-neutral-200 bg-neutral-100 overflow-hidden">
        {shown ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={shown} alt={`${name || "Your"} profile picture`} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-black text-white flex items-center justify-center font-mono text-2xl">
            {initials(name)}
          </div>
        )}
        {busy === "upload" && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-white animate-spin" />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy !== null}
            className="inline-flex items-center gap-2 bg-black !text-white hover:bg-neutral-800 disabled:opacity-60 font-mono text-xs uppercase tracking-wider px-5 py-2.5 transition-colors cursor-pointer"
          >
            {image ? <Camera className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
            {image ? "Change Photo" : "Upload Photo"}
          </button>
          {image && (
            <button
              type="button"
              onClick={handleRemove}
              disabled={busy !== null}
              className="inline-flex items-center gap-2 border border-neutral-300 text-black hover:border-black disabled:opacity-60 font-mono text-xs uppercase tracking-wider px-5 py-2.5 transition-colors cursor-pointer"
            >
              {busy === "remove" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              Remove
            </button>
          )}
        </div>
        <p className="text-xs text-neutral-500">JPG, PNG, or WebP. Max 5 MB. Shown as a square.</p>
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED.join(",")}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
    </div>
  );
}
