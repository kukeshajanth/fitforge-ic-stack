import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const classes = await prisma.gymClass.findMany({
    orderBy: { startsAt: "asc" },
    include: {
      instructor: true,
      location: true,
      _count: { select: { bookings: true, waitlist: true } },
    },
  });

  return NextResponse.json({ classes });
}
