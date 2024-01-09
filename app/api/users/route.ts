import prisma from "@/prisma/prisma";
import { checkAuthorization, handleUnauthorized } from "@/utils/authUtils";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest): Promise<NextResponse> {
  const isLoggedIn = await checkAuthorization();

  if (!isLoggedIn) {
    return handleUnauthorized();
  }

  const users = await prisma.user.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(users, { status: 200 });
}
