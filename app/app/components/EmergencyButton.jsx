"use client";

import Link from "next/link";

export default function EmergencyButton() {
  return (
    <Link href="/emergency" aria-label="I need help now">
      <div className="fixed bottom-5 right-5 z-50">
        <div className="h-16 w-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl animate-pulse ring-4 ring-red-200">
          <span className="text-3xl font-extrabold">!</span>
        </div>
        <span className="block mt-1 text-xs font-bold text-center text-red-700">Help NOW</span>
      </div>
    </Link>
  );
}
