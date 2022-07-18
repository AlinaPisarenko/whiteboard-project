import React, { useRef, useCallback } from "react";
import { ColorPicker, ColorFormats, SetColor } from "react-canvas-color-picker";

export default function ColorPalette({ color, setColor }) {
  const formats = useRef < ColorFormats > ["rgba"];

  const handleChange = useCallback(({ colors }) => {
    console.log(colors);
    setColor({ ...colors.rgba });
  }, []);

  return (
    <ColorPicker
      spectrum="hsva"
      formats={formats.current}
      initialColor={color}
      onPanStart={handleChange}
      onPan={handleChange}
    />
  );
}
