interface FieldErrorProps {
  id: string;
  message: string | null;
}

export function FieldError({ id, message }: FieldErrorProps) {
  return (
    <div className="mt-2 min-h-12" aria-live="polite" aria-atomic="true">
      {message && (
        <p
          id={id}
          className="rounded-md border-l-2 border-red-400 bg-red-50 px-3 py-2 text-xs font-normal leading-4 text-red-700 wrap-break-word"
        >
          {message}
        </p>
      )}
    </div>
  );
}
