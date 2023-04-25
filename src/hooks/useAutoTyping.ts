import { useEffect, useState } from "react";

export const useAutoTyping = (text: string, speed = 1, ref: any) => {
  const [state, setState] = useState("");

  const typer = (data: any, speed: number) => {
    if (data.length < text.length) {
      const temp =
        data.length + speed >= text.length
          ? text
          : text.slice(0, data.length + speed);
      setState(temp);

      window.requestAnimationFrame(() => typer(temp, speed));
    }
  };
  useEffect(() => {
    if (ref.current) {
      typer("", speed);
    }
  }, [text, ref.current]);
  return [state];
};
