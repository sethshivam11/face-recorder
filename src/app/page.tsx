import { Video } from "lucide-react";
import Link from "next/link";

export default function Home() {

  return (
    <div className="flex flex-col gap-5 items-center justify-center min-h-screen bg-grid-black/[0.2] dark:bg-grid-white/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <h1 className="lg:text-7xl text-3xl font-bold tracking-tight bg-gradient-to-b bg-clip-text from-stone-500 to-stone-800 dark:from-stone-200 dark:to-stone-400 text-transparent">
        Face Tracker & Recorder
      </h1>
      <p className="text-stone-800 dark:text-stone-200 lg:text-lg">
        You can record your face while tracking it.
      </p>
      <Link href="/video" className="px-4 py-2.5 bg-stone-800 dark:bg-stone-200 text-white dark:text-black rounded-xl hover:opacity-95 flex items-center justify-center gap-2 max-sm:text-sm">
        <Video /> Start Recording
      </Link>
    </div>
  );
}
