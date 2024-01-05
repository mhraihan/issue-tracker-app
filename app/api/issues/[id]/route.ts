import { issueSchema } from "@/app/validationSchemas";
import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  if (!isLoggedIn) {
    return NextResponse.json(
      { message: "Unauthorize Access" },
      { status: 401 }
    );
  }
  const body = await request.json();
  const validate = issueSchema.safeParse(body);
  if (!validate.success) {
    return NextResponse.json(validate.error.format(), { status: 500 });
  }
  const issue = await prisma.issue.findUnique({
    where: {
      id: +id,
    },
  });
  if (!issue) {
    return NextResponse.json({ error: `No such issue found ${id}` });
  }

  const updateIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updateIssue, { status: 200 });
}
export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  if (!isLoggedIn) {
    return NextResponse.json(
      { message: "Unauthorize Access" },
      { status: 401 }
    );
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: +id,
    },
  });
  if (!issue) {
    return NextResponse.json({ error: `No such issue found ${id}` });
  }
  await prisma.issue.delete({
    where: {
      id: issue.id,
    },
  });
  return NextResponse.json({}, { status: 200 });
}
