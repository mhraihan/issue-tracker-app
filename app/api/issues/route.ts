import { issueSchema } from "@/app/validationSchemas";
import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const POST = auth(async (request) => {
  if (!request?.auth) {
    return NextResponse.json(
      { message: "Unauthorize Access" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 500 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 }) as Response;
});
