import "./globals.css";
import Link from "next/link";
import EmergencyButton from "../components/EmergencyButton";

export const metadata = {
  title: "FairVisit — Know the bill before the visit",
  description:
    "FairVisit helps uninsured and underinsured Americans see realistic self-pay prices for visits, scans, and meds and gives simple cost scripts. It is not medical advice."
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
              <Link href="/pathway" className="hover:text-teal-700">Care Pathway</Link>
              <Link href="/imaging" className="hover:text-teal-700">Scans</Link>
              <Link href="/routine-care" className="hover:text-teal-700">Routine</Link>
              <Link href="/rx" className="hover:text-teal-700">Prescriptions</Link>
              <Link href="/reviews" className="hover:text-teal-700">Reviews</Link>
              <Link href="/emergency" className="text-red-600 hover:text-red-700 font-semibold">Emergency</Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8">
          {children}
        </main>

        <footer className="mt-16 border-t border-slate-200 py-4 text-center text-xs text-slate-500">
          © {year} FairVisit. Not medical advice. For emergencies call 911 or go to the nearest emergency department.
        </footer>

        <EmergencyButton />
      </body>
    </html>
  );
}
