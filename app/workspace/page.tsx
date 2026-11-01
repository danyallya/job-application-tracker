import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { signOut } from "@/app/workspace/actions";

export default async function WorkspacePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in?next=%2Fworkspace");

  return (
    <main className="auth-page">
      <section className="auth-card workspace-card-page" aria-labelledby="workspace-title">
        <Link className="brand auth-brand" href="/" aria-label="Folio preview home">
          <span className="brand-mark">f.</span><span>folio<span className="brand-dot">.</span></span>
        </Link>
        <p className="eyebrow">PRIVATE WORKSPACE</p>
        <h1 id="workspace-title">Hello, {user.name}.</h1>
        <p className="auth-intro">Your account is signed in. Saved application management is the next product milestone; this page does not display or store career records yet.</p>
        <form action={signOut}>
          <button className="auth-submit" type="submit">Sign out</button>
        </form>
        <p className="auth-footer"><Link href="/">Open the public preview</Link></p>
      </section>
    </main>
  );
}
