import { ChangeEvent } from "react";

interface Props {
  value: number;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
}

export function InputNumber({ error, value, handleChange }: Props) {
  return (
    <input
      type="number"
      value={value}
      onChange={handleChange}
      className={`w-16 px-1 text-center ${
        error && "border-red-500 border rounded-sm"
      }`}
    />
  );
}
