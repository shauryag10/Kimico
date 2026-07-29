export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status">
      <div className="flex flex-col items-center gap-5">
        <div className="flex gap-2.5" aria-hidden="true">
          <span className="loader-dot h-3 w-3 rounded-full bg-brand-red" />
          <span className="loader-dot h-3 w-3 rounded-full bg-brand-gold [animation-delay:0.15s]" />
          <span className="loader-dot h-3 w-3 rounded-full bg-cocoa [animation-delay:0.3s]" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
          Unwrapping
        </p>
      </div>
    </div>
  );
}
