"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Timer from "@/components/timer";
import Counter from "@/components/counter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ClickTest() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [started, setStarted] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [count, setCount] = useState(0);
  const savedAttempt = useRef(0);

  function startTest() {
    setCount(0);
    setAttempt((previousAttempt) => previousAttempt + 1);
    setStarted(true);
    setActive(true);
  }

  useEffect(() => {
    if (!started || active || attempt === 0 || savedAttempt.current === attempt) {
      return;
    }

    savedAttempt.current = attempt;

    async function saveScore() {
      await fetch("/api/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clicks: count }),
      });

      router.refresh();
    }

    void saveScore();
  }, [active, attempt, count, router, started]);

  return (
    <div>
      <div className="grid w-full max-w-xl grid-cols-2 gap-4">
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Tiempo</CardTitle>
          </CardHeader>
          <CardContent>
            <Timer
              key={attempt}
              timeProp={10}
              activeProp={active}
              setActiveProp={setActive}
            />
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
    </div>
  );
}
