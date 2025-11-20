"use client";

import { useEffect, useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { estimatePrice, formatRange, SERVICES } from "../../data/priceRules";

const SERVICE_DEFAULT = "adult-physical";

const TYPE_OPTIONS = [
  { id: "clinic", label: "Clinic / primary care" },
  { id: "urgent_care", label: "Urgent care" },
  { id: "hospital", label: "Hospital" },
  { id: "lab", label: "Labs / testing" },
  { id: "imaging", label: "Imaging / MRI / CT" }
];

export default function ProvidersPage() {
  const [permissionStatus, setPermissionStatus] = useState("idle"); // idle | asking | granted | denied
  const [coords, setCoords] = useState(null);
  const [zip, setZip] = useState("");
  const [type, setType] = useState("clinic");
  const [serviceId, setServiceId] = useState(SERVICE_DEFAULT);
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState("");
  const [prices, setPrices] = useState(null);

  useEffect(() => {
    if (!coords && permissionStatus === "idle" && typeof window !== "undefined" && "geolocation" in navigator) {
      setPermissionStatus("asking");
      navigator.geolocation.getCurrentPosition(
        pos => {
          setCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
          setPermissionStatus("granted");
        },
        () => {
          setPermissionStatus("denied");
        },
        { enableHighAccuracy: false, timeout: 8000 }
      );
    }
  }, [coords, permissionStatus]);

  async function searchProviders(e) {
    e && e.preventDefault();
    setError("");
    setProviders([]);
    setPrices(null);
    setLoading(true);

    try {
      let lat = coords?.lat;
      let lng = coords?.lng;

      // Fallback: approximate using ZIP via free geocoding later
      // For now, if no coords, we just show an error.
      if (!lat || !lng) {
        setError("Location is not available. Please allow location access in your browser.");
        setLoading(false);
        return;
      }

      const query = new URLSearchParams({ lat: String(lat), lng: String(lng), type });
      const res = await fetch(`/api/providers?${query.toString()}`);
      const json = await res.json();

      if (res.ok) {
        setProviders(json.providers || []);
      } else {
        setError(json.error || "Search failed");
      }

      const priceEstimate = estimatePrice(serviceId, zip);
      setPrices(priceEstimate);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while searching.");
    } finally {
      setLoading(false);
    }
  }

  const service = SERVICES.find(s => s.id === serviceId);

  return (
    <div className="space-y-6">
      <div className="card p-5 space-y-3">
        <h1 className="text-xl font-semibold">Find low self-pay options near you</h1>
        <p className="text-sm text-slate-600">
          This page helps you find nearby clinics, urgent care, hospitals, labs, and imaging centers
          and shows typical self-pay price ranges. It only offers money information and scripts.
          It never tells you whether to seek care. For emergencies, call 911 or go to the nearest ER.
        </p>

        <form onSubmit={searchProviders} className="grid gap-3 md:grid-cols-4 items-end mt-2">
          <div className="md:col-span-2">
            <label className="text-xs font-medium text-slate-700">Service</label>
            <select
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              value={serviceId}
              onChange={e => setServiceId(e.target.value)}
            >
              {SERVICES.map(s => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700">Place type</label>
            <select
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              value={type}
              onChange={e => setType(e.target.value)}
            >
              {TYPE_OPTIONS.map(t => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700">ZIP (optional)</label>
            <Input
              placeholder="Helps tune price ranges"
              value={zip}
              onChange={e => setZip(e.target.value)}
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-3 mt-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Find options near me"}
            </Button>
            <p className="text-[11px] text-slate-500">
              Location is used only to search nearby providers and is not stored on the server.
            </p>
          </div>
        </form>

        {permissionStatus === "denied" && (
          <p className="text-[11px] text-amber-700 mt-1">
            Location is blocked in your browser. You can enable it in browser settings or enter a ZIP code in a future version.
          </p>
        )}

        {error && (
          <p className="mt-2 text-xs text-red-600">
            {error}
          </p>
        )}
      </div>

      {prices && (
        <section className="grid gap-4 md:grid-cols-3">
          <div className="card p-4 text-xs space-y-1">
            <h2 className="text-sm font-semibold">Typical FQHC / community clinic range</h2>
            <p className="text-lg font-semibold text-teal-700">{formatRange(prices.fqhc)}</p>
            <p className="text-[11px] text-slate-600">
              Ask about sliding scales and financial assistance. Bring proof of income when possible.
            </p>
          </div>
          <div className="card p-4 text-xs space-y-1">
            <h2 className="text-sm font-semibold">Typical self-pay clinic / urgent care</h2>
            <p className="text-lg font-semibold text-slate-900">{formatRange(prices.clinic)}</p>
            <p className="text-[11px] text-slate-600">
              Always ask for the self-pay cash price and if there is a prompt-pay discount if you pay in full today.
            </p>
          </div>
          <div className="card p-4 text-xs space-y-1">
            <h2 className="text-sm font-semibold">Telehealth (if available)</h2>
            <p className="text-lg font-semibold text-slate-900">{formatRange(prices.tele)}</p>
            <p className="text-[11px] text-slate-600">
              Good for many non-emergency issues when safe. Not for chest pain, stroke, severe injury, or trouble breathing.
            </p>
          </div>
        </section>
      )}

      {providers.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900">
            Nearby locations (from Google Places)
          </h2>
          <div className="space-y-2">
            {providers.map(p => (
              <div key={p.id} className="card p-3 text-xs flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <p className="font-semibold text-slate-900">{p.name}</p>
                  <p className="text-slate-600">{p.address}</p>
                  {p.rating && (
                    <p className="text-[11px] text-slate-500">
                      Rating {p.rating} ({p.userRatingsTotal} reviews)
                    </p>
                  )}
                </div>
                <div className="text-right text-[11px] text-slate-600">
                  <p>Type: {p.placeType}</p>
                  <p>Estimated self-pay: {prices ? formatRange(prices.clinic) : "Varies"}</p>
                  {p.website && (
                    <a
                      href={p.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-teal-700 font-semibold block mt-1"
                    >
                      Open in Maps / website →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-500">
            Providers are shown for convenience only. FairVisit does not recommend or endorse any specific provider.
            Always confirm prices and quality yourself.
          </p>
        </section>
      )}
    </div>
  );
}
