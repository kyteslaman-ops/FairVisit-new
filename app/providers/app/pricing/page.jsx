"use client";

import Button from "../../components/ui/Button";

async function startCheckout(tier) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tier })
  });
  const json = await res.json();
  if (res.ok && json.url) {
    window.location.href = json.url;
  } else {
    alert(json.error || "Checkout failed. Try again later.");
  }
}

export default function PricingPage() {
  return (
    <div className="space-y-6">
      <div className="card p-5 space-y-3">
        <h1 className="text-xl font-semibold">FairVisit plans</h1>
        <p className="text-sm text-slate-600">
          Start free, then upgrade if FairVisit saves you money. FairVisit only gives price and script guidance.
          It never gives medical advice or replaces a doctor.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        {/* Free */}
        <div className="card p-5 space-y-2">
          <h2 className="text-sm font-semibold">Free</h2>
          <p className="text-xs text-slate-600">Best for trying the tools.</p>
          <p className="text-2xl font-bold">$0</p>
          <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
            <li>• Price estimates for common services</li>
            <li>• ER Survival Kit PDF</li>
            <li>• Basic provider finder (limited results)</li>
          </ul>
          <p className="mt-2 text-[11px] text-teal-700">
            Great for testing and sharing with a friend.
          </p>
        </div>

        {/* Premium */}
        <div className="card p-5 space-y-2 border-teal-600 shadow-soft">
          <h2 className="text-sm font-semibold">Premium</h2>
          <p className="text-xs text-slate-600">Best for one person or small family.</p>
          <p className="text-2xl font-bold">$4.99<span className="text-xs font-normal text-slate-500">/month</span></p>
          <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
            <li>• Full self-pay price ranges for more services</li>
            <li>• More provider results per search</li>
            <li>• Advanced scripts for bill negotiation</li>
            <li>• Priority updates when new discounts appear</li>
          </ul>
          <Button className="mt-3 w-full" onClick={() => startCheckout("premium")}>
            Upgrade to Premium
          </Button>
          <p className="mt-2 text-[11px] text-slate-500">
            Cancel anytime. If we do not save you at least this much in a year, it is not doing its job.
          </p>
        </div>

        {/* Family */}
        <div className="card p-5 space-y-2">
          <h2 className="text-sm font-semibold">Family / caregiver</h2>
          <p className="text-xs text-slate-600">Cover your household or someone you help.</p>
          <p className="text-2xl font-bold">$9.99<span className="text-xs font-normal text-slate-500">/month</span></p>
          <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
            <li>• Everything in Premium</li>
            <li>• Up to 5 family profiles</li>
            <li>• Extra tools for chronic care and caregiving</li>
          </ul>
          <Button className="mt-3 w-full" onClick={() => startCheckout("family")}>
            Upgrade to Family
          </Button>
        </div>
      </section>
    </div>
  );
}
