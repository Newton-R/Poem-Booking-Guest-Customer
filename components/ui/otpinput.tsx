"use client";

import { useRef, useState } from "react";

interface OtpInputProps {
  length?: number;
  onComplete: (code: string) => void;
}

export function OtpInput({ length = 6, onComplete }: OtpInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (raw: string, index: number) => {
    const text = raw.replace(/\D/g, ""); // digits only

    if (text.length > 1) {
      // paste of full code
      const chars = text.slice(0, length - index).split("");
      const next = [...values];
      chars.forEach((c, i) => (next[index + i] = c));
      setValues(next);

      const lastIndex = Math.min(index + chars.length, length - 1);
      inputs.current[lastIndex]?.focus();

      if (next.every((v) => v !== "")) onComplete(next.join(""));
      return;
    }

    const next = [...values];
    next[index] = text;
    setValues(next);

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (next.every((v) => v !== "")) {
      onComplete(next.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputs.current[index - 1]?.focus();
      const next = [...values];
      next[index - 1] = "";
      setValues(next);
    }
  };

  return (
    <div className="flex gap-2 justify-between w-full">
      {values.map((val, i) => (
        <input
          key={i}
          ref={(el) => {
            inputs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={length} // lets browser autofill land on box 0 then propagate via paste handler
          value={val}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={`h-14 w-12 flex-1 rounded-lg border text-center text-xl font-semibold
            outline-none transition-colors
            ${val ? "border-primary text-navy" : "border-border text-navy"}
            focus:border-primary focus:ring-4 focus:ring-primary/30`}
        />
      ))}
    </div>
  );
}
