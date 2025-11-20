"use client";

export default function Button({ as = "button", variant, className = "", children, ...props }) {
  const Comp = as;
  const base = "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition";
  const colors =
    variant === "outline"
      ? "border border-teal-600 text-teal-700 bg-white hover:bg-teal-50"
      : "bg-teal-600 text-white shadow-soft hover:bg-teal-700";

  return (
    <Comp className={base + " " + colors + " " + className} {...props}>
      {children}
    </Comp>
  );
}
