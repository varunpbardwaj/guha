import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function GET() {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get(process.env.NEXT_PUBLIC_JWT_COOKIE!);
  if (tokenCookie && tokenCookie?.value) {
    const { username } = jwt.verify(
      tokenCookie.value,
      process.env.NEXT_PUBLIC_JWT_SECRET!
    ) as JwtPayload;
    return Response.json({ username });
  } else {
    return new Response("Something went wrong", { status: 500 });
  }
}
