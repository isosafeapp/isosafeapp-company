"use client";

export function WelcomeBanner({ firstName }: { firstName: string }) {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-5 border border-red-100">
      <h2 className="text-lg font-semibold text-gray-800">
        Welcome back, {firstName}! 🚨
      </h2>
      <p className="text-sm text-gray-600 mt-1">
        {month} {day}, {date.getFullYear()}. Stay alert, stay safe.
      </p>
    </div>
  );
}
