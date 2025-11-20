import "./globals.css";
import Link from "next/link";
import EmergencyButton from "../components/EmergencyButton";

export const metadata = {
  title: "FairVisit — Know the bill before the visit",
  description:
    "FairVisit helps uninsured and underinsured Americans see realistic self-pay prices for visits and meds. Money guidance only, not medical advice."
};

export default function RootLayout({ children }) {
  const year = new Date().getFullYear();

  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
                FV
              </div>
              <span className="text-lg font-semibold tracking-tight">FairVisit</span>
            </Link>

            <nav className="flex gap-4 text-sm font-medium text-slate-700">
              <Link href="/providers" className="hover:text-teal-700">
                Find care
              </Link>
              <Link href="/search" className="hover:text-teal-700">
                Price finder
              </Link>
              <Link href="/pricing" className="hover:text-teal-700">
                Pricing
              </Link>
              <Link href="/emergency" className="text-red-600 hover:text-red-700 font-semibold">
                Emergency
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8">
          {children}
        </main>

        <footer className="mt-16 border-t border-slate-200 py-4 text-center text-xs text-slate-500">
          © {year} FairVisit. Money and script guidance only. Not medical advice.
        </footer>

        <EmergencyButton />
      </body>
    </html>
  );
}
