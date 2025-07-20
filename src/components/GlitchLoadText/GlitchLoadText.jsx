"use client";
import { useCallback, useEffect, useMemo, useRef } from "react";
import "./GlitchLoadText.css";
/*
    ref
    text (string)
    duration(second)
    speed (char/second) 
    overlap_coefficient (decimal 0-1)
*/
function glitch_animation({ ref, text, duration, speed, coefficient }) {
  const random_char = () => {
    const special_chars = "%$#@&0";
    return special_chars[
      Math.floor(Math.random() * (special_chars.length - 1))
    ];
  };

  let interval_time = 1000 / speed; // interval time in millisecond for each character animation
  let interval_duration = (duration / text.length) * 1000; // total duration of animation for a character in millisecond
  let overlap_coefficient = Math.min(Math.max(coefficient, 0), 1); // set the limit of coffecient between 0-1
  let text_arr = text.split("");

  let clock = 0;

  let interval = setInterval(() => {
    for (let i = 0; i < text.length; i++) {
      let start =
        i * interval_duration - i * interval_duration * overlap_coefficient;
      let end =
        (i + 1) * interval_duration -
        i * interval_duration * overlap_coefficient;
      if (clock >= start && clock < end) {
        let curr_char = random_char();
        text_arr[i] = curr_char;
      }
      if (clock >= end) {
        text_arr[i] = text[i];
      }
    }
    if (ref.current) {
      ref.current.innerText = text_arr.join("");
    }

    clock += interval_time;
  }, interval_time);

  let timeOut = setTimeout(() => {
    clearInterval(interval);
    ref.current.innerText = text;
  }, (text.length - 1 + 1) * interval_duration - (text.length - 1) * interval_duration * overlap_coefficient);

  return {
    destroy: () => {
      clearInterval(interval);
      clearTimeout(timeOut);
      if (ref.current) ref.current.innerText = text;
    },
  };
}

export default function GlitchLoadText({
  text,
  onLoadAnimate,
  onHoverAnimate,
  duration,
  speed,
  coefficient,
}) {
  const ref = useRef(null);
  const props = useMemo(
    () => ({ ref, text, duration, speed, coefficient }),
    [ref, text, duration, speed, coefficient]
  );

  const handleMouseEnter = useCallback(
    ({ ref, text, duration, speed, coefficient }) => {
      const hoverTimeline = glitch_animation({
        ref,
        text,
        duration,
        speed,
        coefficient,
      });
    },
    [ref, text, duration, speed, coefficient]
  );

  useEffect(() => {
    if (!ref.current) return;
    let timeline;
    if (onLoadAnimate) {
      timeline = glitch_animation(props);
    }
    return () => {
      if (timeline) timeline.destroy();
    };
  }, [text, onLoadAnimate, onHoverAnimate, duration, speed, coefficient]);

  useEffect(() => {
    let listener = () => {
      handleMouseEnter(props);
    };
    if (onHoverAnimate) {
      ref.current.addEventListener("mouseenter", listener);
    }

    return () => {
      if (onHoverAnimate && ref.current) {
        ref.current.removeEventListener("mouseenter", listener);
      }
    };
  });

  return (
    <span style={{ display: "inline-block" }} ref={ref}>
      {text}
    </span>
  );
}
