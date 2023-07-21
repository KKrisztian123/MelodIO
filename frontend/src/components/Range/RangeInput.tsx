import styles from "./Range.module.css";
import { ReactNode, useRef, useState } from "react";
import type { MouseEvent, KeyboardEvent } from "react";
import { motion } from "framer-motion";

type Controlled = {
  /** Controlled state value */
  value: number;
  /** Controlled state change callback function */
  setValue: (value: number) => void;
};

export type RangeProps = {
  /** Specifies the minimum allowed integer value in the range. */
  min?: number;
  /** Specifies the maximum allowed integer value in the range. */
  max: number;
  /** Specifies the value granularity. */
  step?: number;
  /** Changes the displayed range sliders orientation. */
  orientation?: "vertical" | "horizontal";
  /** Label of range input for accessibility */
  label?: string;
  /** Start decorator ornament of component. */
  startOrnament?: ReactNode;
  /** End decorator ornament of component. */
  endOrnament?: ReactNode;
  /** Optional size of the range input in pixels */
  size?: number;
  /** Changes the start-end order of the range slider. If `true` the end and start values are swapped. */
  reverse?: boolean;
};

export type ControlledRangeProps = AllOrNothing<Controlled> & RangeProps;

/** Calculates the snapping percentage. */
const calculateSnappedValue = (
  maxValue: number,
  step: number,
  percentageValue: number
) => {
  const snapSize = 1 / (maxValue / step);
  const lowerPercent =
    Math.floor((percentageValue - (percentageValue % snapSize)) * 10000000000) /
    10000000000;
  const higherPercent =
    Math.round((lowerPercent + snapSize) * 10000000000) / 10000000000;
  return percentageValue < lowerPercent + 0.5 * snapSize
    ? lowerPercent
    : higherPercent;
};

/** Calculates the input value from the range percentage. */
const valueCalculation = (
  delta: number,
  currentPercent: number,
  min: number
) => {
  return Math.floor(delta * currentPercent) + min;
};

/** Range input component. This component can be controlled or uncontrolled. */
const RangeInput = ({
  min = 0,
  max,
  step = 1,
  orientation = "horizontal",
  label,
  value: externalValue,
  setValue: setExternalValue,
  startOrnament,
  endOrnament,
  size,
  reverse = false,
}: ControlledRangeProps) => {
  const [internalValue, setInternalValue] = useState(min);
  const value = externalValue !== undefined ? externalValue : internalValue;
  const setValue =
    setExternalValue !== undefined ? setExternalValue : setInternalValue;
  const rangeDelta = max - min;
  const position = reverse
    ? (1 - (-1 * min + value) / rangeDelta) * 100
    : ((-1 * min + value) / rangeDelta) * 100;
  const barRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(position / 100); // progress percentage in decimal
  const [mouseState, setMouseState] = useState(false);
  const translate = orientation === "horizontal" ? {translateX: "-50%"} : {translateY: "-50%"};

  const keyboardMove = (e: KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (orientation === "horizontal") {
      if (e.key === (reverse ? "ArrowLeft" : "ArrowRight")) {
        value + step <= max ? setValue(value + step) : setValue(max);
      }
      if (e.key === (reverse ? "ArrowRight" : "ArrowLeft")) {
        value - step >= min ? setValue(value - step) : setValue(min);
      }
      return;
    }
    if (e.key === (reverse ? "ArrowUp" : "ArrowDown")) {
      value + step <= max ? setValue(value + step) : setValue(max);
    }
    if (e.key === (reverse ? "ArrowDown" : "ArrowUp")) {
      value - step >= min ? setValue(value - step) : setValue(min);
    }
  };

  const mouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (
      !mouseState ||
      !barRef.current ||
      !progressRef.current ||
      !knobRef.current
    ) {
      return;
    }
    const mousePosition =
      orientation === "horizontal" ? e?.clientX : e?.clientY;
    const barData = barRef.current.getBoundingClientRect();
    const start = orientation === "horizontal" ? barData.x : barData.y;
    const end =
      orientation === "horizontal"
        ? barData?.x + barData?.width
        : barData?.y + barData?.height;
    const rangeSize = end - start;
    positionRef.current = calculateSnappedValue(
      rangeDelta,
      step,
      (mousePosition - start) / rangeSize
    );
    if (start > mousePosition) {
      positionRef.current = 0;
    }
    if (end < mousePosition) {
      positionRef.current = 1;
    }
    if (orientation === "horizontal") {
      knobRef.current.style.left = positionRef.current * 100 + "%";
      progressRef.current.style.width = positionRef.current * 100 + "%";
      knobRef.current.style.removeProperty("top");
      progressRef.current.style.removeProperty("height");
      return;
    }
    knobRef.current.style.removeProperty("left");
    progressRef.current.style.removeProperty("width");
    knobRef.current.style.top = positionRef.current * 100 + "%";
    progressRef.current.style.height = positionRef.current * 100 + "%";
  };

  const calculateAndChangeState = (e?: MouseEvent<HTMLDivElement>) => {
    e && mouseMove(e);
    changeState();
  };

  const changeState = () => {
    if (!mouseState) {
      return;
    }
    setMouseState(false);
    setValue(
      reverse
        ? valueCalculation(rangeDelta, 1 - positionRef.current, min)
        : valueCalculation(rangeDelta, positionRef.current, min)
    );
  };

  return (
    <div
      className={
        reverse
          ? `${styles.range} ${styles[orientation]} ${styles.reverse}`
          : `${styles.range} ${styles[orientation]}`
      }
    >
      {startOrnament && (
        <div className={styles.startOrnament}>{startOrnament}</div>
      )}
      <div
        tabIndex={0}
        aria-label={label}
        role="slider"
        aria-orientation={orientation}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        className={styles.rangeBarContainer}
        style={
          orientation === "horizontal"
            ? { width: size + "px" }
            : { height: size + "px" }
        }
        onPointerDown={() => setMouseState(true)}
        onPointerMove={mouseMove}
        onPointerUp={calculateAndChangeState}
        onPointerLeave={calculateAndChangeState}
        onKeyDown={keyboardMove}
      >
        <div className={styles.rangeBar} ref={barRef}>
          <div
            className={`${styles.rangeBar} ${styles.rangeBarActive}`}
            style={
              orientation === "horizontal"
                ? { width: `${position}%` }
                : { height: `${position}%` }
            }
            ref={progressRef}
          ></div>
        </div>
        <motion.div
          className={styles.rangeKnob}
          ref={knobRef}
          animate={{ scale: mouseState ? 1.25 : 1 , ...translate}}
          style={
            orientation === "horizontal"
              ? { left: `${position}%` }
              : { top: `${position}%` }
          }
        ></motion.div>
      </div>
      {endOrnament && <div className={styles.endOrnament}>{endOrnament}</div>}
      <input type={"hidden"} value={value} />
    </div>
  );
};
export default RangeInput;

/*
         onTouchStart={() => setMouseState(true)}
        onTouchEnd={changeState}
        onMouseLeave={calculateAndChangeState}
        onMouseDown={() => setMouseState(true)}
        onMouseUp={calculateAndChangeState}
        onMouseMove={mouseMove}
 */
