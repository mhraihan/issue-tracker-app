import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/prisma";
import { checkAuthorization, handleUnauthorized } from "@/utils/authUtils";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest): Promise<NextResponse> {
  const isLoggedIn = await checkAuthorization();

  if (!isLoggedIn) {
    return handleUnauthorized();
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

  return NextResponse.json(newIssue, { status: 201 });
}
// export const POST = auth(async (request) => {
//   if (!request?.auth) {
//     return NextResponse.json(
//       { message: "Unauthorize Access" },
//       { status: 401 }
//     );
//   }

//   const body = await request.json();
//   const validation = issueSchema.safeParse(body);

//   if (!validation.success) {
//     return NextResponse.json(validation.error.format(), { status: 500 });
//   }

//   const newIssue = await prisma.issue.create({
//     data: {
//       title: body.title,
//       description: body.description,
//     },
//   });

//   return NextResponse.json(newIssue, { status: 201 }) as Response;
// });
