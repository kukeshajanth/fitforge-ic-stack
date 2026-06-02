import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function fmt(d: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

// The "current member" is hardcoded for the cohort starter.
// A real app would read this from the session. We use Priya so the
// transcript-1 scenario is live: she is on the Rhythm Ride waitlist.
const CURRENT_MEMBER_EMAIL = "priya@example.com";

export default async function ClassPage({ params }: { params: { id: string } }) {
  const gymClass = await prisma.gymClass.findUnique({
    where: { id: params.id },
    include: {
      instructor: true,
      location: true,
      _count: { select: { bookings: true, waitlist: true } },
    },
  });

  if (!gymClass) notFound();

  const me = await prisma.member.findUnique({
    where: { email: CURRENT_MEMBER_EMAIL },
  });

  const isFull = gymClass._count.bookings >= gymClass.capacity;

  const myWaitlistEntry = me
    ? await prisma.waitlistEntry.findUnique({
        where: { memberId_classId: { memberId: me.id, classId: gymClass.id } },
      })
    : null;

  const myBooking = me
    ? await prisma.booking.findUnique({
        where: { memberId_classId: { memberId: me.id, classId: gymClass.id } },
      })
    : null;

  return (
    <div className="max-w-2xl">
      <Link href="/" className="text-sm text-forge-mist hover:text-forge-chalk">
        ← All classes
      </Link>

      <h1 className="mt-4 text-3xl font-bold">{gymClass.title}</h1>
      <p className="mt-2 text-forge-mist">
        {fmt(gymClass.startsAt)} · {gymClass.location.name} · {gymClass.instructor.name}
      </p>

      <div className="mt-8 rounded-xl border border-forge-line bg-forge-slate p-6">
        {myBooking ? (
          <div className="text-forge-pulse">You are booked into this class.</div>
        ) : myWaitlistEntry ? (
          <div>
            <div className="font-medium text-forge-amber">You are on the waitlist.</div>
            {/*
              TRANSCRIPT 1 GAP:
              The waitlist position is in the database (myWaitlistEntry.position)
              and the total is gymClass._count.waitlist. The staff view at
              /staff/waitlists shows "Position 3 of 7". This customer view does NOT.
              Priya is texting the front desk twice a week because of this blind spot.
              Closing this gap is the transcript-1 slice.
            */}
            <p className="mt-1 text-sm text-forge-mist">
              We will notify you if a spot opens up.
            </p>
          </div>
        ) : isFull ? (
          <div>
            <div className="font-medium text-forge-amber">This class is full.</div>
            <button
              className="mt-3 rounded-lg bg-forge-ember px-4 py-2 text-sm font-medium text-forge-ink"
              // wiring this button is part of building a slice; the API route exists
            >
              Join the waitlist
            </button>
          </div>
        ) : (
          <div>
            <div className="font-medium text-forge-pulse">
              {gymClass.capacity - gymClass._count.bookings} spots left
            </div>
            <button className="mt-3 rounded-lg bg-forge-ember px-4 py-2 text-sm font-medium text-forge-ink">
              Book this class
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
