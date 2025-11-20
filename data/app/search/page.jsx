"use client";

import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { SERVICES, estimatePrice, formatRange } from "../../data/priceRules";

export const metadata = {
  title: "Price Finder — FairVisit",
  description:
    "See typical self-pay ranges for visits and scans. Money info only – never medical advice."
};

export default function SearchPage() {
  const [serviceId, setServiceId] = useState("adult-physical");
  const [zip, setZip] = useState("");
  const [result, setResult] = useState(null);

  function handleSearch(e) {
    e.preventDefault();
    const prices = estimatePrice(serviceId, zip);
    setResult(prices);
  }

  const service = SERVICES.find(s => s.id === serviceId);

  return (
    <div className="space-y-6">
      <div className="card p-5 space-y-3">
        <h1 className="text-xl font-semibold">Self-pay price finder</h1>
        <p className="text-sm text-slate-600">
          This tool shows typical cash price ranges people report today for common services.
          Real prices vary by clinic and city. Always confirm the exact price with the provider.
          This site does not give medical advice – only money information.
        </p>

        <form onSubmit={handleSearch} className="grid gap-3 md:grid-cols-[2fr,1fr,auto] items-end mt-2">
          <div>
            <label className="text-xs font-medium text-slate-700">Service</label>
            <select
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              value={serviceId}
              onChange={e => setServiceId(e.target.value)}
            >
              {SERVICES.map(s => (
                <option key={s.id} value={s.id}>
                  {s.label} — {s.category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700">ZIP (optional)</label>
            <Input
              placeholder="e.g. 77002"
              value={zip}
              onChange={e => setZip(e.target.value)}
            />
            <p className="mt-1 text-[10px] text-slate-500">
              Used only to adjust for high-cost regions, not to identify you.
            </p>
          </div>

          <Button type="submit" className="mt-1">
            Show price ranges
          </Button>
        </form>
      </div>

      {result && service && (
        <section className="grid gap-4 md:grid-cols-3">
          {/* FQHC / community clinic */}
          <div className="card p-4 space-y-2">
            <h2 className="text-sm font-semibold">Community clinic / FQHC</h2>
            <p className="text-xs text-slate-600">
              Federally qualified health centers and many nonprofit clinics use sliding scales based on income.
            </p>
            <p className="text-lg font-semibold text-teal-700">
              {formatRange(result.fqhc)}<span className="text-xs text-slate-500 ml-1">typical</span>
            </p>
            <ul className="mt-2 text-[11px] text-slate-600 space-y-1">
              <li>• Ask: “Do you have a sliding scale for self-pay patients?”</li>
              <li>• Bring proof of income if possible.</li>
              <li>• Ask for the cash price before the visit when you check in.</li>
            </ul>
            <p className="mt-2 text-[10px] text-slate-500">
              Future upgrade: auto-locate nearby FQHCs using HRSA data and link to their websites.
            </p>
          </div>

          {/* Self-pay clinic / urgent care */}
          <div className="card p-4 space-y-2">
            <h2 className="text-sm font-semibold">Self-pay clinic / urgent care</h2>
            <p className="text-xs text-slate-600">
              These are direct-pay clinics and urgent cares that see self-pay patients.
            </p>
            <p className="text-lg font-semibold text-slate-900">
              {formatRange(result.clinic)}<span className="text-xs text-slate-500 ml-1">typical</span>
            </p>
            <ul className="mt-2 text-[11px] text-slate-600 space-y-1">
              <li>• Ask: “What is your self-pay price for {service.label}?”</li>
              <li>• Ask: “Do you offer a prompt-pay discount if I pay today?”</li>
              <li>• Ask for a written estimate before you are seen when possible.</li>
            </ul>
            <p className="mt-2 text-[10px] text-slate-500">
              Future upgrade: live data from transparency files (Turquoise Health, CMS) and local clinic links.
            </p>
          </div>

          {/* Telehealth */}
          <div className="card p-4 space-y-2">
            <h2 className="text-sm font-semibold">Telehealth (online visit)</h2>
            {result.tele ? (
              <>
                <p className="text-xs text-slate-600">
                  Good for many simple problems and refills when it is safe. Not for serious emergencies.
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  {formatRange(result.tele)}<span className="text-xs text-slate-500 ml-1">typical</span>
                </p>
                <ul className="mt-2 text-[11px] text-slate-600 space-y-1">
                  <li>• Compare several services; many show prices up front.</li>
                  <li>• Make sure you know if labs or meds cost extra.</li>
                </ul>
              </>
            ) : (
              <p className="text-xs text-slate-600">
                For this service, telehealth is usually not enough on its own. Use an in-person clinic or imaging center.
              </p>
            )}
            <p className="mt-2 text-[10px] text-slate-500">
              Future upgrade: affiliate links to low-cost telehealth with clearly posted prices.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
