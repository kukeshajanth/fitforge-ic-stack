import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const CURRENT_MEMBER_EMAIL = "priya@example.com";

function fmt(d: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

export default async function MyBookingsPage() {
  const me = await prisma.member.findUnique({
    where: { email: CURRENT_MEMBER_EMAIL },
  });

  if (!me) {
    return <p className="text-forge-mist">No member session.</p>;
  }

  const bookings = await prisma.booking.findMany({
    where: { memberId: me.id },
    include: { gymClass: { include: { location: true, instructor: true } } },
  });

  const waitlist = await prisma.waitlistEntry.findMany({
    where: { memberId: me.id },
    include: { gymClass: { include: { location: true, instructor: true } } },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold">Hi, {me.name}</h1>

      <h2 className="mt-8 text-lg font-semibold">Booked</h2>
      {bookings.length === 0 ? (
        <p className="mt-2 text-forge-mist">No bookings yet.</p>
      ) : (
        <div className="mt-3 grid gap-3">
          {bookings.map((b) => (
            <Link
              key={b.id}
              href={`/classes/${b.classId}`}
              className="rounded-xl border border-forge-line bg-forge-slate px-5 py-4"
            >
              <div className="font-semibold">{b.gymClass.title}</div>
              <div className="text-sm text-forge-mist">
                {fmt(b.gymClass.startsAt)} · {b.gymClass.location.name}
              </div>
            </Link>
          ))}
        </div>
      )}

      <h2 className="mt-10 text-lg font-semibold">On the waitlist</h2>
      {waitlist.length === 0 ? (
        <p className="mt-2 text-forge-mist">Not on any waitlists.</p>
      ) : (
        <div className="mt-3 grid gap-3">
          {waitlist.map((w) => (
            <Link
              key={w.id}
              href={`/classes/${w.classId}`}
              className="rounded-xl border border-forge-line bg-forge-slate px-5 py-4"
            >
              <div className="font-semibold">{w.gymClass.title}</div>
              <div className="text-sm text-forge-mist">
                {fmt(w.gymClass.startsAt)} · {w.gymClass.location.name}
              </div>
              {/* TRANSCRIPT 1 GAP: position is in w.position but not shown here either. */}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
