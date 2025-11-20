import Link from "next/link";
import Button from "../components/ui/Button";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="grid gap-8 md:grid-cols-[3fr,2fr] items-center">
        <div className="space-y-4">
          <p className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 border border-teal-100">
            2026 uninsured wave · ER bills · no price transparency
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            The GoodRx for doctor visits, scans, and surprise bills.
          </h1>
          <p
