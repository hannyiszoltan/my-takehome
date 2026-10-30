import type { WeatherMode } from "../types/weather";

interface WeatherModeToggleProps {
  mode: WeatherMode;
  onModeChange: (mode: WeatherMode) => void;
}

const modes = [
  { value: "city", label: "Város" },
  { value: "region", label: "Régió" },
] as const;

export function WeatherModeToggle({
  mode,
  onModeChange,
}: WeatherModeToggleProps) {
  return (
    <div
      role="group"
      aria-label="Lekérdezés típusa"
      className="flex gap-2 border-b border-slate-200 p-5"
    >
      {modes.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          aria-pressed={mode === value}
          onClick={() => onModeChange(value)}
          className={`rounded-md px-4 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            mode === value
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
