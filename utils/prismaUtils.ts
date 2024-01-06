import prisma from "@/prisma/prisma";
import { Issue } from "@prisma/client";
import { NextResponse } from "next/server";

export const findIssueById = async (id: string): Promise<Issue | null> => {
  return prisma.issue.findUnique({
    where: {
      id: +id,
    },
  });
};

export const handleIssueNotFound = (id: string) => {
    return NextResponse.json({ error: `No such issue found ${id}` });
}