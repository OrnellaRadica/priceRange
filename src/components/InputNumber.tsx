import { ChangeEvent } from "react";

interface Props {
  value: number;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  position: "left" | "right";
}

export function InputNumber({ error, value, handleChange, position }: Props) {
  return (
    <input
      type="number"
      value={value}
      onChange={handleChange}
      className={`w-16 px-1 text-center ${
        error && "border-red-500 border rounded-sm"
      }`}
      data-testid={`input-${position}`}
    />
  );
}
