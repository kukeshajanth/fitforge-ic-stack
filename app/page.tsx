import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function fmt(d: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

export default async function HomePage() {
  const classes = await prisma.gymClass.findMany({
    orderBy: { startsAt: "asc" },
    include: {
      instructor: true,
      location: true,
      _count: { select: { bookings: true, waitlist: true } },
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold">Upcoming classes</h1>
      <p className="mt-2 text-forge-mist">Book your spot. Popular classes fill fast.</p>

      <div className="mt-8 grid gap-4">
        {classes.map((c) => {
          const isFull = c._count.bookings >= c.capacity;
          return (
            <Link
              key={c.id}
              href={`/classes/${c.id}`}
              className="flex items-center justify-between rounded-xl border border-forge-line bg-forge-slate px-5 py-4 transition hover:border-forge-ember"
            >
              <div>
                <div className="font-semibold">{c.title}</div>
                <div className="text-sm text-forge-mist">
                  {fmt(c.startsAt)} · {c.location.name} · {c.instructor.name}
                </div>
              </div>
              <div className="text-right">
                {isFull ? (
                  <span className="rounded-full bg-forge-amber/15 px-3 py-1 text-xs font-medium text-forge-amber">
                    Waitlist · {c._count.waitlist} waiting
                  </span>
                ) : (
                  <span className="rounded-full bg-forge-pulse/15 px-3 py-1 text-xs font-medium text-forge-pulse">
                    {c.capacity - c._count.bookings} spots left
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
