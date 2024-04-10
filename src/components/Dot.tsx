import { useCallback, useEffect, useState } from "react";

const BUTTON_WIDTH = 16;

function findClosestStep(
  value: number,
  steps: number[],
  min: number,
  max: number,
  position: "left" | "right"
): number {
  // The right positioned bullet should never take the first step.
  let closestStep: number | undefined = undefined;

  // Iterate through each step to find the closest one
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    // Left bullet cannot take max value, but it can take the min.
    if (position === "left" && step >= max) continue;
    // Right bullet cannot take min value, but it can take the max.
    if (position === "right" && step <= min) continue;
    if (!closestStep) closestStep = step;

    // Check if the current step is closer to the value than the current closest step
    if (Math.abs(value - step) <= Math.abs(value - closestStep!)) {
      closestStep = step; // Update closest step if the current step is closer
    } else {
      // Break the loop because the current steps is not closer than the previous
      break;
    }
  }

  return closestStep!;
}

interface DotProps {
  rangeRef: React.MutableRefObject<HTMLDivElement | null>;
  maxValue: number;
  minValue: number;
  value: number;
  setValue: (next: number) => void;
  position: "left" | "right";
  steps?: number[];
  range: { maxValue: number; minValue: number };
}
export function Dot({
  rangeRef,
  maxValue,
  minValue,
  value,
  setValue,
  position,
  steps,
  range,
}: DotProps) {
  const rangeValue = range.maxValue - range.minValue;
  const [dragging, setDragging] = useState(false);

  const handlePointerDown = () => {
    setDragging(true);
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  const handleDotDrag = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (dragging && rangeRef.current) {
        const rangeRect = rangeRef.current.getBoundingClientRect();
        const clientX =
          event instanceof MouseEvent
            ? event.clientX
            : event.touches[0]?.clientX;

        const offsetX = clientX - rangeRect.left;
        const percentage = offsetX / rangeRect.width;
        const overlapGap = (BUTTON_WIDTH / rangeRect.width) * rangeValue;

        const percentageToValue = percentage * rangeValue;

        // If the element is right positioned, it can take the max value.
        // If it's the left positioned, it needs to deduct the overlap gap to avoid elements collapsing.
        const maxPossibleValue =
          position === "right" ? maxValue : maxValue - overlapGap;

        // If the element is left positioned, it can take the min value.
        // If the element is right positioned, it needs to deduct the overlap gap to avoid elements collapsing.‹
        const minPossibleValue =
          position === "left" ? minValue : minValue + overlapGap;

        const newValue = Math.min(
          maxPossibleValue,
          Math.max(minPossibleValue, percentageToValue)
        );

        if (steps) {
          setValue(
            findClosestStep(newValue, steps, minValue, maxValue, position)
          );
        } else {
          setValue(parseFloat(newValue.toFixed(0)));
        }
      }
    },
    [dragging, rangeRef.current, maxValue, minValue]
  );

  const cancelDragging = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    if (dragging) {
      // Handles desktop
      window.addEventListener("mousemove", handleDotDrag);
      window.addEventListener("mouseup", cancelDragging);
      // Handles mobile devices
      window.addEventListener("touchmove", handleDotDrag);
      window.addEventListener("touchend", cancelDragging);
    }
    return () => {
      if (dragging) {
        window.removeEventListener("mousemove", handleDotDrag);
        window.removeEventListener("mousemove", cancelDragging);
        window.removeEventListener("touchmove", handleDotDrag);
        window.removeEventListener("touchend", cancelDragging);
      }
    };
  }, [dragging, handleDotDrag, cancelDragging]);

  const percentageMove = ((value - range.minValue) / rangeValue) * 100;

  return (
    <button
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className={`absolute  rounded-full bg-black cursor-grab transition-transform hover:scale-125 h-4 w-4 -top-[7px] ${
        dragging ? "scale-125" : ""
      }`}
      style={{
        left: `calc(${percentageMove}% - ${BUTTON_WIDTH / 2}px)`,
      }}
    />
  );
}
