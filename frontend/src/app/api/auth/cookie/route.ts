"use server";

import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const EXPIRES_IN = 3600 * 168;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const cookieStore = cookies();
  try {
    cookieStore.set(process.env.NEXT_PUBLIC_JWT_COOKIE!, body.access_token, {
      maxAge: EXPIRES_IN,
    });
    return Response.json(req.body);
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function GET() {
  const cookieStore = cookies();
  try {
    const tokenCookie = cookieStore.get(process.env.NEXT_PUBLIC_JWT_COOKIE!);
    if (tokenCookie && tokenCookie?.value) {
      const { exp } = jwt.verify(
        tokenCookie.value,
        process.env.NEXT_PUBLIC_JWT_SECRET!
      ) as JwtPayload;
      if (exp && Date.now() <= exp * 1000) {
        return Response.json({ isLogged: true });
      }
    }
    return Response.json({ isLogged: false });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = cookies();
  try {
    cookieStore.delete(process.env.NEXT_PUBLIC_JWT_COOKIE!);
    return new Response("Logged out", { status: 200 });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}
