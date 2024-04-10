import React, { useState, useRef, ChangeEvent } from "react";
import { Dot } from "./Dot";
import { InputNumber } from "./InputNumber";

type RangeProps =
  | {
      min: number;
      max: number;
      steps?: undefined;
    }
  | {
      steps: number[];
      min?: undefined;
      max?: undefined;
    };

export function Range({ min, max, steps }: RangeProps) {
  const minValue = steps ? steps[0] : min;
  const maxValue = steps ? steps[steps.length - 1] : max;

  const rangeRef = useRef<HTMLDivElement | null>(null);
  const [valueFirstDot, setValueFirstDot] = useState(minValue);
  const [valueSecondDot, setValueSecondDot] = useState(maxValue);

  const errorFirstDot =
    valueFirstDot < minValue || valueFirstDot >= valueSecondDot;
  const errorSecondDot =
    valueSecondDot > maxValue ||
    (valueSecondDot <= valueFirstDot && !errorFirstDot);

  const handleFirstDot = (e: ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseFloat(e.target.value).toFixed(2);
    setValueFirstDot(parseFloat(parsedValue));
  };

  const handleSecondDot = (e: ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseFloat(e.target.value).toFixed(2);
    setValueSecondDot(parseFloat(parsedValue));
  };

  return (
    <>
      <p className="text-xs text-red-500 py-1 min-h-6">
        {errorFirstDot && errorSecondDot
          ? `Price range must be between ${minValue} €  and ${maxValue} € `
          : errorFirstDot
          ? `Min price must be bigger than ${minValue} € and smaller than ${
              errorSecondDot || !valueSecondDot ? maxValue : valueSecondDot
            } €`
          : errorSecondDot &&
            `Max price must be bigger than ${
              errorFirstDot || !valueFirstDot ? minValue : valueFirstDot
            } € and smaller than ${maxValue} €`}
      </p>
      <div className="flex items-center gap-4">
        <div className="flex flex-nowrap font-light">
          {steps ? (
            <p className="w-16">{valueFirstDot}</p>
          ) : (
            <InputNumber
              handleChange={handleFirstDot}
              value={valueFirstDot}
              error={errorFirstDot}
            />
          )}
          <span>€</span>
        </div>
        <div
          className="w-[160px] sm:w-[320px] h-[3px] bg-black relative pl-2 rounded-full"
          ref={rangeRef}
        >
          <Dot
            rangeRef={rangeRef}
            // Use the second dot value so they don't overlap
            maxValue={valueSecondDot}
            minValue={minValue}
            value={errorFirstDot ? minValue : valueFirstDot}
            setValue={setValueFirstDot}
            position="left"
            steps={steps}
            range={{ maxValue, minValue }}
          />
          <Dot
            rangeRef={rangeRef}
            maxValue={maxValue}
            // Use the first dot value so they don't overlap
            minValue={valueFirstDot}
            value={errorSecondDot ? maxValue : valueSecondDot}
            setValue={setValueSecondDot}
            position="right"
            steps={steps}
            range={{ maxValue, minValue }}
          />
        </div>

        <div className="flex flex-nowrap font-light">
          {steps ? (
            <p className="w-16">{valueSecondDot}</p>
          ) : (
            <InputNumber
              handleChange={handleSecondDot}
              value={valueSecondDot}
              error={errorSecondDot}
            />
          )}
          <span>€</span>
        </div>
      </div>
    </>
  );
}
