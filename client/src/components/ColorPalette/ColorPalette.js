import React, { useState, useRef, useCallback } from "react";
import { ColorPicker, ColorFormats, SetColor } from "react-canvas-color-picker";

export default function ColorPalette({ color, setColor }) {
  // const colorPickerRef = React.useRef<SetColor>();
  // const formats = useRef("rgba");
  const formats = useRef < ColorFormats > ["rgba"];
  // const formats = useRef < ColorFormats["rgba"] >
  console.log(color);

  const handleChange = React.useCallback(({ colors }) => {
    console.log(colors);
    setColor({ ...colors.rgba });
  }, []);

  return (
    <ColorPicker
      spectrum="hsva"
      // formats="rgba"
      formats={formats.current}
      initialColor={color}
      onPanStart={handleChange}
      onPan={handleChange}
      // ref={colorPickerRef}
    />
  );
}
