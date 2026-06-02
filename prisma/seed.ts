import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Deterministic dates so the seed is reproducible across machines.
// "Tomorrow 6:45 AM" relative to a fixed anchor keeps the demo stable.
const ANCHOR = new Date("2026-06-02T00:00:00Z");
function at(dayOffset: number, hour: number, minute = 0) {
  const d = new Date(ANCHOR);
  d.setUTCDate(d.getUTCDate() + dayOffset);
  d.setUTCHours(hour, minute, 0, 0);
  return d;
}

async function main() {
  // Clean slate (safe for a starter; never do this in prod).
  await prisma.waitlistEntry.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.workout.deleteMany();
  await prisma.gymClass.deleteMany();
  await prisma.member.deleteMany();
  await prisma.instructor.deleteMany();
  await prisma.location.deleteMany();

  // Locations
  const parkWest = await prisma.location.create({
    data: { name: "Park West", city: "Austin" },
  });
  const marina = await prisma.location.create({
    data: { name: "Marina", city: "Austin" },
  });

  // Instructors
  const tasha = await prisma.instructor.create({
    data: { name: "Tasha", bio: "Rhythm Ride. The 6 AM crew's favorite." },
  });
  const leo = await prisma.instructor.create({
    data: { name: "Leo", bio: "Strength and Tabata." },
  });

  // Members
  const priya = await prisma.member.create({
    data: { name: "Priya R.", email: "priya@example.com", locationId: parkWest.id },
  });
  const devon = await prisma.member.create({
    data: { name: "Devon T.", email: "devon@example.com", locationId: marina.id },
  });
  const sarah = await prisma.member.create({
    data: { name: "Sarah K.", email: "sarah@example.com", locationId: parkWest.id },
  });
  // A few filler members so waitlists feel real
  const fillerNames = ["Ava", "Marcus", "Jen", "Owen", "Riya", "Cole", "Nadia", "Sam"];
  const fillers = [];
  for (const n of fillerNames) {
    fillers.push(
      await prisma.member.create({
        data: { name: n, email: `${n.toLowerCase()}@example.com`, locationId: parkWest.id },
      })
    );
  }

  // The popular class: Rhythm Ride, tomorrow 6:45 AM, capacity 20, FULL.
  const rhythmRide = await prisma.gymClass.create({
    data: {
      title: "Rhythm Ride",
      startsAt: at(1, 6, 45),
      durationMin: 45,
      capacity: 20,
      locationId: parkWest.id,
      instructorId: tasha.id,
    },
  });

  // Fill Rhythm Ride to capacity so there's a real waitlist.
  // 20 bookings: use fillers + repeat is not allowed (unique), so create extra members.
  for (let i = 0; i < 20; i++) {
    const m = await prisma.member.create({
      data: { name: `Rider ${i + 1}`, email: `rider${i + 1}@example.com`, locationId: parkWest.id },
    });
    await prisma.booking.create({ data: { memberId: m.id, classId: rhythmRide.id } });
  }

  // Waitlist for Rhythm Ride: Priya is position 3 of 7.
  // This is the transcript-1 truth. The staff view shows it. The customer view does NOT (yet).
  const waitlistOrder = [fillers[0], fillers[1], priya, fillers[2], fillers[3], fillers[4], fillers[5]];
  for (let i = 0; i < waitlistOrder.length; i++) {
    await prisma.waitlistEntry.create({
      data: {
        memberId: waitlistOrder[i].id,
        classId: rhythmRide.id,
        position: i + 1,
      },
    });
  }

  // A few other classes (open, for browsing).
  await prisma.gymClass.create({
    data: {
      title: "Strength 101",
      startsAt: at(1, 7, 0),
      durationMin: 60,
      capacity: 16,
      locationId: parkWest.id,
      instructorId: leo.id,
    },
  });
  await prisma.gymClass.create({
    data: {
      title: "Evening Yoga",
      startsAt: at(1, 18, 0),
      durationMin: 60,
      capacity: 24,
      locationId: marina.id,
      instructorId: leo.id,
    },
  });
  const tabata = await prisma.gymClass.create({
    data: {
      title: "Saturday Tabata",
      startsAt: at(3, 9, 0),
      durationMin: 30,
      capacity: 18,
      locationId: parkWest.id,
      instructorId: tasha.id,
    },
  });

  // Sarah's booking history (transcript 3 pattern: she always books strength).
  // A few past workouts, no heart rate (transcript 2: a wearable slice would fill these).
  for (let i = 1; i <= 3; i++) {
    await prisma.workout.create({
      data: {
        memberId: devon.id,
        classTitle: "Rhythm Ride",
        loggedAt: at(-i * 7, 6, 45),
      },
    });
  }

  // Sarah on the Tabata waitlist too, so personalization has signal.
  await prisma.waitlistEntry.create({
    data: { memberId: sarah.id, classId: tabata.id, position: 1 },
  });

  console.log("Seeded FitForge:");
  console.log("  Locations: 2, Instructors: 2");
  console.log("  Rhythm Ride is FULL (20/20), 7 on the waitlist.");
  console.log("  Priya R. is position 3 of 7 on the Rhythm Ride waitlist.");
  console.log("  Staff view shows position. Customer view does NOT (yet). That's the transcript-1 slice.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
