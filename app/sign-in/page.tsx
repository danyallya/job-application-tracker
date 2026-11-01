import Link from "next/link";
import { SignInForm } from "@/components/sign-in-form";

export default function SignInPage() {
  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="sign-in-title">
        <Link className="brand auth-brand" href="/" aria-label="Folio preview home">
          <span className="brand-mark">f.</span><span>folio<span className="brand-dot">.</span></span>
        </Link>
        <p className="eyebrow">A PRIVATE CAREER WORKSPACE</p>
        <h1 id="sign-in-title">Welcome back.</h1>
        <p className="auth-intro">Sign in to continue to your personal workspace.</p>
        <SignInForm />
        <p className="auth-footer"><Link href="/">Return to the public preview</Link></p>
      </section>
    </main>
  );
}
