import type { UnitSystem } from "../types/units";

interface UnitToggleProps {
  unitSystem: UnitSystem;
  onUnitSystemChange: (unitSystem: UnitSystem) => void;
}

const options = [
  { value: "metric", label: "SI (°C, mm)" },
  { value: "imperial", label: "Angolszász (°F, inch)" },
] as const;

export function UnitToggle({
  unitSystem,
  onUnitSystemChange,
}: UnitToggleProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 px-5 py-3">
      <span className="text-sm font-medium text-slate-700">Mértékegység</span>
      <div
        role="group"
        aria-label="Mértékegység"
        className="flex flex-wrap gap-2"
      >
        {options.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={unitSystem === value}
            onClick={() => onUnitSystemChange(value)}
            className={`rounded-md px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              unitSystem === value
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
