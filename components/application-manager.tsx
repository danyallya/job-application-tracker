"use client";

import { useActionState } from "react";
import { ApplicationStage } from "@prisma/client";
import {
  archiveApplication,
  createApplication,
  updateApplication,
} from "@/app/workspace/application-actions";
import type { FormActionState } from "@/lib/application-input";

export type SavedApplication = {
  id: string;
  company: string;
  role: string;
  stage: ApplicationStage;
  source: string | null;
  postingUrl: string | null;
  location: string | null;
  salary: string | null;
  notes: string | null;
  appliedAt: string | null;
  nextAction: string | null;
  nextActionAt: string | null;
  archivedAt: string | null;
  updatedAt: string;
};

const initialFormActionState: FormActionState = { status: "idle", message: "" };

const stageLabels: Record<ApplicationStage, string> = {
  SAVED: "Saved",
  APPLIED: "Applied",
  SCREENING: "Screening",
  INTERVIEW: "Interview",
  OFFER: "Offer",
  DECLINED: "Declined",
  WITHDRAWN: "Withdrawn",
};

function ActionMessage({ state }: { state: FormActionState }) {
  return <p className={`application-feedback ${state.status}`} role="status" aria-live="polite">{state.message}</p>;
}

function ApplicationFields({ application }: { application?: SavedApplication }) {
  return (
    <div className="application-fields">
      <label>Company<input name="company" required maxLength={120} defaultValue={application?.company ?? ""} autoComplete="organization" /></label>
      <label>Role<input name="role" required maxLength={120} defaultValue={application?.role ?? ""} /></label>
      <label>Stage<select name="stage" defaultValue={application?.stage ?? ApplicationStage.SAVED}>{Object.values(ApplicationStage).map(stage => <option key={stage} value={stage}>{stageLabels[stage]}</option>)}</select></label>
      <label>Source<input name="source" maxLength={120} defaultValue={application?.source ?? ""} placeholder="Referral, company site…" /></label>
      <label>Job link<input name="postingUrl" type="url" maxLength={2048} defaultValue={application?.postingUrl ?? ""} placeholder="https://…" /></label>
      <label>Location<input name="location" maxLength={120} defaultValue={application?.location ?? ""} /></label>
      <label>Salary notes<input name="salary" maxLength={100} defaultValue={application?.salary ?? ""} /></label>
      <label>Applied on<input name="appliedAt" type="date" defaultValue={application?.appliedAt?.slice(0, 10) ?? ""} /></label>
      <label>Next action<input name="nextAction" maxLength={240} defaultValue={application?.nextAction ?? ""} placeholder="Send a thank-you note…" /></label>
      <label>Follow up on<input name="nextActionAt" type="date" defaultValue={application?.nextActionAt?.slice(0, 10) ?? ""} /></label>
      <label className="application-notes">Private notes<textarea name="notes" maxLength={4000} rows={3} defaultValue={application?.notes ?? ""} /></label>
    </div>
  );
}

function CreateApplicationForm() {
  const [state, action, pending] = useActionState(createApplication, initialFormActionState);
  return (
    <form className="application-form" action={action}>
      <ApplicationFields />
      <ActionMessage state={state} />
      <button className="auth-submit application-button" type="submit" disabled={pending}>{pending ? "Saving…" : "Save application"}</button>
    </form>
  );
}

function EditApplicationForm({ application }: { application: SavedApplication }) {
  const [state, action, pending] = useActionState(updateApplication.bind(null, application.id), initialFormActionState);
  return (
    <form className="application-form" action={action}>
      <ApplicationFields application={application} />
      <ActionMessage state={state} />
      <button className="auth-submit application-button" type="submit" disabled={pending}>{pending ? "Saving…" : "Save changes"}</button>
    </form>
  );
}

function ArchiveApplicationForm({ applicationId }: { applicationId: string }) {
  const [state, action, pending] = useActionState(archiveApplication.bind(null, applicationId), initialFormActionState);
  return (
    <form action={action}>
      <button className="application-archive" type="submit" disabled={pending}>{pending ? "Archiving…" : "Archive application"}</button>
      {state.message && <ActionMessage state={state} />}
    </form>
  );
}

function ApplicationCard({ application, archived = false }: { application: SavedApplication; archived?: boolean }) {
  return (
    <article className={`saved-application${archived ? " archived" : ""}`}>
      <div className="saved-application-heading">
        <div><span className="application-stage">{stageLabels[application.stage]}</span><h3>{application.role}</h3><p>{application.company}{application.location ? ` · ${application.location}` : ""}</p></div>
        {application.updatedAt && <time dateTime={application.updatedAt}>Updated {application.updatedAt.slice(0, 10)}</time>}
      </div>
      {application.nextAction && <p className="application-next-action"><strong>Next:</strong> {application.nextAction}{application.nextActionAt ? ` · ${application.nextActionAt.slice(0, 10)}` : ""}</p>}
      {application.postingUrl && <a className="application-job-link" href={application.postingUrl} target="_blank" rel="noopener noreferrer">Open job posting</a>}
      {application.notes && <p className="application-note">{application.notes}</p>}
      {archived ? (
        <p className="application-archived-at">Archived {application.archivedAt?.slice(0, 10)}</p>
      ) : (
        <>
          <details className="application-edit"><summary>Edit application</summary><EditApplicationForm application={application} /></details>
          <ArchiveApplicationForm applicationId={application.id} />
        </>
      )}
    </article>
  );
}

export function ApplicationManager({ applications }: { applications: SavedApplication[] }) {
  const active = applications.filter(application => !application.archivedAt);
  const archived = applications.filter(application => application.archivedAt);

  return (
    <div className="application-manager">
      <section className="application-create" aria-labelledby="application-create-title">
        <div className="application-section-heading"><div><p className="eyebrow">YOUR PIPELINE</p><h2 id="application-create-title">Add an opportunity</h2></div><span>{active.length} active</span></div>
        <p className="application-section-intro">Keep each record private to your signed-in account. All fields are optional except company and role.</p>
        <CreateApplicationForm />
      </section>

      <section className="application-list-section" aria-labelledby="application-list-title">
        <div className="application-section-heading"><div><p className="eyebrow">PRIVATE RECORDS</p><h2 id="application-list-title">Saved applications</h2></div><span>{active.length}</span></div>
        {active.length ? <div className="saved-application-list">{active.map(application => <ApplicationCard key={application.id} application={application} />)}</div> : <p className="application-empty">Your saved opportunities will appear here. Add one above to start your private pipeline.</p>}
      </section>

      {archived.length > 0 && <section className="application-list-section" aria-labelledby="application-archive-title">
        <div className="application-section-heading"><div><p className="eyebrow">PAST OPPORTUNITIES</p><h2 id="application-archive-title">Archive</h2></div><span>{archived.length}</span></div>
        <div className="saved-application-list">{archived.map(application => <ApplicationCard key={application.id} application={application} archived />)}</div>
      </section>}
    </div>
  );
}
