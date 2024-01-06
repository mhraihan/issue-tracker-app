import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import { handleUnauthorized } from "@/utils/authUtils";
import { NextResponse } from "next/server";
export const GET = auth(async (request) => {
  if (!request.auth) {
    return handleUnauthorized();
  }
  const users = await prisma.user.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(users, { status: 200 });
});
