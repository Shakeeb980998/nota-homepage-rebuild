import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get("secret");
    const configuredSecret = process.env.REVALIDATION_SECRET || "surge-secret-token";

    if (secret && secret !== configuredSecret) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // Revalidate the homepage cache tag instantly
    revalidateTag("homepage", "max");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return NextResponse.json({ message: "Error revalidating", error }, { status: 500 });
  }
}
