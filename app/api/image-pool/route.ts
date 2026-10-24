import { getSession } from "@/lib/auth/session";
import { ImagePoolError, savePooledImage } from "@/lib/image-library";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload." }, { status: 400 });
  }

  const file = form.get("file");
  const name = form.get("name");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
  }
  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Enter a file name." }, { status: 400 });
  }

  try {
    const saved = await savePooledImage(name, Buffer.from(await file.arrayBuffer()));
    return NextResponse.json(saved);
  } catch (error) {
    if (error instanceof ImagePoolError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }
}
