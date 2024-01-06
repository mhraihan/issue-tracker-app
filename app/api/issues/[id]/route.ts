import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/prisma";
import { checkAuthorization, handleUnauthorized } from "@/utils/authUtils";
import { findIssueById, handleIssueNotFound } from "@/utils/prismaUtils";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const isLoggedIn = await checkAuthorization();

  if (!isLoggedIn) {
    return handleUnauthorized();
  }
  const body = await request.json();
  const validate = issueSchema.safeParse(body);
  if (!validate.success) {
    return NextResponse.json(validate.error.format(), { status: 500 });
  }
  const issue = await findIssueById(id);
  if (!issue) {
    return handleIssueNotFound(id);
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
  const isLoggedIn = await checkAuthorization();

  if (!isLoggedIn) {
    return handleUnauthorized();
  }
  const issue = await findIssueById(id);
  if (!issue) {
    return handleIssueNotFound(id);
  }
  await prisma.issue.delete({
    where: {
      id: issue.id,
    },
  });
  return NextResponse.json({}, { status: 200 });
}
