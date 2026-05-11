"use client";

const colorPresets = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Red", value: "#ef4444" },
  { name: "Green", value: "#22c55e" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Orange", value: "#f97316" },
  { name: "Pink", value: "#ec4899" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Indigo", value: "#6366f1" },
];

export function ColorPresets({
  onSelectColor,
}: {
  onSelectColor: (color: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-2 block">
        Color Presets
      </label>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {colorPresets.map((color) => (
          <button
            key={color.value}
            onClick={() => onSelectColor(color.value)}
            className="group relative w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white shadow-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            style={{ backgroundColor: color.value }}
            title={color.name}
          >
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
    </div>
  );
}
