import { useId } from "react";

interface DateRangeSelectProps {
  from: string;
  to: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  error: string | null;
}

export function DateRangeSelect({
  from,
  to,
  onFromChange,
  onToChange,
  error,
}: DateRangeSelectProps) {
  const id = useId();
  const errorId = error ? `${id}-error` : undefined;
  const inputClassName =
    "rounded-md border border-slate-300 bg-white px-3 py-2 font-normal focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor={`${id}-from`} className="flex items-center gap-2">
          Kezdő dátum
          <input
            id={`${id}-from`}
            name="from"
            type="date"
            value={from}
            min="0001-01-01"
            max={to || "9999-12-31"}
            required
            onChange={(event) => onFromChange(event.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={errorId}
            className={inputClassName}
          />
        </label>
        <label htmlFor={`${id}-to`} className="flex items-center gap-2">
          Végdátum
          <input
            id={`${id}-to`}
            name="to"
            type="date"
            value={to}
            min={from || "0001-01-01"}
            max="9999-12-31"
            required
            onChange={(event) => onToChange(event.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={errorId}
            className={inputClassName}
          />
        </label>
      </div>
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 text-sm font-normal text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}
