"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <div>
      <p>Something went wrong...</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
