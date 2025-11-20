"use client";

export default function Input(props) {
  return (
    <input
      {...props}
      className={
        "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 " +
        "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 " +
        (props.className || "")
      }
    />
  );
}
