import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function fmt(d: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

// The STAFF view. This is the iPad at the front desk.
// It shows waitlist position. The customer app does NOT.
// (transcript 1: "I've seen it on the iPad at the front desk. There's a
//  column that says position.")
export default async function StaffWaitlistsPage() {
  const classesWithWaitlists = await prisma.gymClass.findMany({
    where: { waitlist: { some: {} } },
    orderBy: { startsAt: "asc" },
    include: {
      location: true,
      instructor: true,
      waitlist: {
        orderBy: { position: "asc" },
        include: { member: true },
      },
    },
  });

  return (
    <div>
      <div className="rounded-lg border border-forge-amber/30 bg-forge-amber/10 px-4 py-3 text-sm text-forge-amber">
        Staff view. Customers cannot see this. Waitlist position is visible here
        but not in the member app.
      </div>

      <h1 className="mt-6 text-3xl font-bold">Waitlists</h1>

      <div className="mt-8 grid gap-6">
        {classesWithWaitlists.map((c) => (
          <div key={c.id} className="rounded-xl border border-forge-line bg-forge-slate p-5">
            <div className="font-semibold">{c.title}</div>
            <div className="text-sm text-forge-mist">
              {fmt(c.startsAt)} · {c.location.name} · {c.instructor.name}
            </div>
            <table className="mt-4 w-full text-sm">
              <thead className="text-left text-forge-mist">
                <tr>
                  <th className="py-1 pr-4">Position</th>
                  <th className="py-1">Member</th>
                </tr>
              </thead>
              <tbody>
                {c.waitlist.map((w) => (
                  <tr key={w.id} className="border-t border-forge-line">
                    <td className="py-2 pr-4 font-medium text-forge-chalk">
                      {w.position} of {c.waitlist.length}
                    </td>
                    <td className="py-2">{w.member.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
