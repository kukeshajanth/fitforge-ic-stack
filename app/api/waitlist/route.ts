import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/waitlist?classId=...&memberId=...
// Returns the waitlist for a class. If memberId is passed, also returns that
// member's position. NOTE: the position data is available here. The customer
// UI does not surface it yet. That gap is the transcript-1 slice.
export async function GET(req: NextRequest) {
  const classId = req.nextUrl.searchParams.get("classId");
  const memberId = req.nextUrl.searchParams.get("memberId");

  if (!classId) {
    return NextResponse.json({ error: "classId required" }, { status: 400 });
  }

  const entries = await prisma.waitlistEntry.findMany({
    where: { classId },
    orderBy: { position: "asc" },
    include: { member: true },
  });

  const total = entries.length;
  let myPosition: number | null = null;
  if (memberId) {
    const mine = entries.find((e) => e.memberId === memberId);
    myPosition = mine ? mine.position : null;
  }

  return NextResponse.json({ total, myPosition, entries });
}

// POST /api/waitlist  { memberId, classId }
// Adds the member to the end of the waitlist.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { memberId, classId } = body;

  if (!memberId || !classId) {
    return NextResponse.json({ error: "memberId and classId required" }, { status: 400 });
  }

  const count = await prisma.waitlistEntry.count({ where: { classId } });

  const entry = await prisma.waitlistEntry.create({
    data: { memberId, classId, position: count + 1 },
  });

  return NextResponse.json({ entry }, { status: 201 });
}
