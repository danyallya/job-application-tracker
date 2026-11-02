import Link from "next/link";
import { redirect } from "next/navigation";
import { ApplicationManager, type SavedApplication } from "@/components/application-manager";
import { signOut } from "@/app/workspace/actions";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function WorkspacePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in?next=%2Fworkspace");

  const records = await prisma.application.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      company: true,
      role: true,
      stage: true,
      source: true,
      postingUrl: true,
      location: true,
      salary: true,
      notes: true,
      appliedAt: true,
      nextAction: true,
      nextActionAt: true,
      archivedAt: true,
      updatedAt: true,
    },
  });
  const applications: SavedApplication[] = records.map(application => ({
    ...application,
    appliedAt: application.appliedAt?.toISOString() ?? null,
    nextActionAt: application.nextActionAt?.toISOString() ?? null,
    archivedAt: application.archivedAt?.toISOString() ?? null,
    updatedAt: application.updatedAt.toISOString(),
  }));

  return (
    <main className="saved-workspace" aria-labelledby="saved-workspace-title">
      <header className="saved-workspace-header">
        <div>
          <Link className="brand auth-brand" href="/" aria-label="Folio preview home">
            <span className="brand-mark">f.</span><span>folio<span className="brand-dot">.</span></span>
          </Link>
          <p className="eyebrow">PRIVATE JOB SEARCH</p>
          <h1 id="saved-workspace-title">Your opportunities, {user.name}.</h1>
          <p className="auth-intro">Add and update job-search records that belong to your signed-in account.</p>
        </div>
        <form action={signOut}><button className="application-sign-out" type="submit">Sign out</button></form>
      </header>
      <ApplicationManager applications={applications} />
      <p className="saved-workspace-footer"><Link href="/">Return to the public preview</Link><span>Your saved records are available only in this account.</span></p>
    </main>
  );
}
