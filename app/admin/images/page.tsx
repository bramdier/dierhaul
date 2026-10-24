import ImagePoolManager from "@/components/admin/ImagePoolManager";
import { listPooledImages } from "@/lib/image-library";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Pooling | Dierhaul",
};

export default async function AdminImagesPage() {
  const images = await listPooledImages();
  return <ImagePoolManager images={images} />;
}
