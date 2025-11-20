import Button from "../components/ui/Button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="card p-6 space-y-3">
        <p className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 border border-teal-100">
          2026 uninsured wave · ER bills · no price transparency
        </p>
        <h1 className="text-3xl font-bold tracking-tight">
          FairVisit shows self-pay prices before you walk in.
        </h1>
        <p className="text-sm text-slate-700">
          We focus on money only: typical self-pay prices and plain scripts to ask for discounts and estimates.
          We never tell you whether to seek care. For emergencies, call 911 or go to the nearest ER.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/search">
            <Button>Find self-pay prices</Button>
          </Link>
          <Link href="/pathway">
            <Button variant="outline">Build a care plan (coming to life)</Button>
          </Link>
        </div>
        <p className="text-[11px] text-slate-500">
          Numbers are estimates based on public ranges and user reports. Always confirm the final price with the provider.
        </p>
      </section>
    </div>
  );
}
