import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/bookings?memberId=...
export async function GET(req: NextRequest) {
  const memberId = req.nextUrl.searchParams.get("memberId");
  if (!memberId) {
    return NextResponse.json({ error: "memberId required" }, { status: 400 });
  }

  const bookings = await prisma.booking.findMany({
    where: { memberId },
    include: { gymClass: true },
  });

  return NextResponse.json({ bookings });
}

// POST /api/bookings  { memberId, classId }
// Books the member if there is capacity, otherwise tells the caller it's full.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { memberId, classId } = body;

  if (!memberId || !classId) {
    return NextResponse.json({ error: "memberId and classId required" }, { status: 400 });
  }

  const gymClass = await prisma.gymClass.findUnique({
    where: { id: classId },
    include: { _count: { select: { bookings: true } } },
  });

  if (!gymClass) {
    return NextResponse.json({ error: "class not found" }, { status: 404 });
  }

  if (gymClass._count.bookings >= gymClass.capacity) {
    return NextResponse.json({ error: "class full", full: true }, { status: 409 });
  }

  const booking = await prisma.booking.create({ data: { memberId, classId } });
  return NextResponse.json({ booking }, { status: 201 });
}
