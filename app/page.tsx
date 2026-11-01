"use client"

import Timer from "@/components/timer";
import Counter from "@/components/counter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState(false);
  const [started, setStarted] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [count, setCount] = useState(0);

  function startTest() {
    setCount(0);
    setAttempt((previousAttempt) => previousAttempt + 1);
    setStarted(true);
    setActive(true);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8 px-6 py-12 text-center">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase text-muted-foreground">Prueba de velocidad</p>
        <h1 className="text-4xl font-bold">¿Cuántos clics haces?</h1>
        <p className="text-muted-foreground">Haz tantos clics como puedas en 10 segundos.</p>
      </header>

      <div className="grid w-full max-w-xl grid-cols-2 gap-4">
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Tiempo</CardTitle>
          </CardHeader>
          <CardContent>
            <Timer key={attempt} timeProp={10} activeProp={active} setActiveProp={setActive} />
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Clics</CardTitle>
          </CardHeader>
          <CardContent>
            <Counter count={count} />
          </CardContent>
        </Card>
      </div>

      <Button
        variant="secondary"
        disabled={!active}
        onClick={() => setCount((previousCount) => previousCount + 1)}
        className="min-h-56 w-full max-w-xl whitespace-normal border-2 border-dashed border-primary/40 text-2xl font-semibold transition-colors"
      >
        {active ? "¡Haz clic aquí!" : "El área de clic aparecerá al iniciar"}
      </Button>

      <Button disabled={active} onClick={startTest}>
        {started ? "Reintentar" : "Iniciar prueba"}
      </Button>

      {started && !active && (
        <Card className="w-full max-w-xl text-center">
          <CardHeader>
            <CardTitle>Resultado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">
              {(count / 10).toFixed(1)} clics por segundo
            </p>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
