import { MascotLoader } from "@/shared/components/MascotLoader";

export default function Loading() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-cream">
      <MascotLoader />
    </div>
  );
}
