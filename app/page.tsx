import { Suspense } from "react";
import ClickTest from "@/components/click-test";
import Leaderboard from "@/components/leaderboard";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8 px-6 py-12 text-center">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase text-muted-foreground">Prueba de velocidad</p>
        <h1 className="text-4xl font-bold">¿Cuántos clics haces?</h1>
        <p className="text-muted-foreground">Haz tantos clics como puedas en 10 segundos.</p>
      </header>

      <ClickTest />
      <Suspense fallback={<p>Cargando clasificación...</p>}>
        <Leaderboard />
      </Suspense>
    </main>
  );
}
