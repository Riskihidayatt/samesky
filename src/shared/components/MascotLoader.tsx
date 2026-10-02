import { Mascot } from "./Mascot";

export function MascotLoader({ label = "Sebentar ya, awannya sedang datang…" }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-4 text-center">
      <Mascot pose="walk" size={140} float decorative />
      <p className="font-medium text-ink-soft">{label}</p>
      <span aria-hidden className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2 w-2 rounded-full bg-brown animate-twinkle" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}
      </span>
    </div>
  );
}
