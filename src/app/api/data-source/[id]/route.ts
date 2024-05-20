export const maxDuration = 60;
import prisma from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const dataSource = await prisma.dataSource.findFirst({
    where: {
      userId: params.id,
    },
  });

  if (!dataSource) {
    return NextResponse.json(
      { error: "Data Source not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(dataSource);
}
