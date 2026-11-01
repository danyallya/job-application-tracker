import { PrismaClient } from '@prisma/client';
import { assertSafeSeedTarget } from './seed-policy.mjs';

assertSafeSeedTarget(process.env.DATABASE_URL);

const prisma = new PrismaClient();
const sampleEmail = 'sample@folio.invalid';
const sampleApplications = [
  {
    id: 'sample_app_juniper',
    company: 'Juniper Studio',
    role: 'Product Designer',
    stage: 'INTERVIEW',
    source: 'Sample careers page',
    location: 'Remote',
    notes: 'Synthetic portfolio review scenario.',
    appliedAt: new Date('2026-09-18T09:00:00.000Z'),
    nextAction: 'Prepare portfolio questions',
    nextActionAt: new Date('2026-11-03T12:00:00.000Z'),
    activity: 'A sample portfolio review is scheduled.',
    occurredAt: new Date('2026-10-28T12:00:00.000Z'),
  },
  {
    id: 'sample_app_northstar',
    company: 'Northstar Labs',
    role: 'Design Engineer',
    stage: 'SCREENING',
    source: 'Sample referral',
    location: 'Hybrid',
    notes: 'Synthetic recruiter conversation.',
    appliedAt: new Date('2026-10-02T09:00:00.000Z'),
    nextAction: 'Send a short follow-up',
    nextActionAt: new Date('2026-11-04T12:00:00.000Z'),
    activity: 'A sample screening conversation was recorded.',
    occurredAt: new Date('2026-10-27T14:00:00.000Z'),
  },
  {
    id: 'sample_app_harbor',
    company: 'Harbor Works',
    role: 'Product Designer',
    stage: 'APPLIED',
    source: 'Sample application',
    location: 'On site',
    notes: 'Synthetic application record.',
    appliedAt: new Date('2026-10-22T09:00:00.000Z'),
    nextAction: 'Wait for a reply',
    nextActionAt: new Date('2026-11-07T12:00:00.000Z'),
    activity: 'A sample application was submitted.',
    occurredAt: new Date('2026-10-22T09:00:00.000Z'),
  },
  {
    id: 'sample_app_fieldnote',
    company: 'Fieldnote Cooperative',
    role: 'UX Researcher',
    stage: 'SAVED',
    source: 'Sample job board',
    location: 'Remote',
    notes: 'Synthetic role to review later.',
    appliedAt: null,
    nextAction: 'Review the role description',
    nextActionAt: new Date('2026-11-05T12:00:00.000Z'),
    activity: 'A sample opportunity was saved for review.',
    occurredAt: new Date('2026-10-26T09:00:00.000Z'),
  },
];

try {
  await prisma.$transaction(async (transaction) => {
    const user = await transaction.user.upsert({
      where: { email: sampleEmail },
      update: { name: 'Folio Sample Workspace' },
      create: { email: sampleEmail, name: 'Folio Sample Workspace' },
    });

    for (const { activity, occurredAt, ...application } of sampleApplications) {
      await transaction.application.upsert({
        where: { id: application.id },
        update: { ...application, userId: user.id },
        create: { ...application, userId: user.id },
      });

      await transaction.activity.upsert({
        where: { id: `sample_activity_${application.id}` },
        update: { kind: 'SAMPLE_NOTE', summary: activity, occurredAt, applicationId: application.id },
        create: { id: `sample_activity_${application.id}`, kind: 'SAMPLE_NOTE', summary: activity, occurredAt, applicationId: application.id },
      });
    }
  });

  console.log(`Seeded ${sampleApplications.length} synthetic applications in local folio_dev.`);
} finally {
  await prisma.$disconnect();
}
