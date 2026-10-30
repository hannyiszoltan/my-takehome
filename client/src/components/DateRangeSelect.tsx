import { useId } from "react";
import { FieldError } from "./FieldError";

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
    "h-11 w-full min-w-0 rounded-md border border-slate-300 bg-white px-3 py-2 text-base font-normal text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 aria-invalid:border-red-400 aria-invalid:focus:ring-red-500";

  return (
    <div className="min-w-0">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label
          htmlFor={`${id}-from`}
          className="flex min-w-0 flex-col gap-2 text-sm font-medium leading-5 text-slate-700"
        >
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
        <label
          htmlFor={`${id}-to`}
          className="flex min-w-0 flex-col gap-2 text-sm font-medium leading-5 text-slate-700"
        >
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
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
