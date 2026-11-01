"use client"

interface CounterProps {
  count: number;
}

export default function Counter({ count }: CounterProps) {
  return (
    <p className="text-4xl font-bold tabular-nums">{count}</p>
  );
}