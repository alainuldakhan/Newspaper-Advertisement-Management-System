import React, { useRef, useEffect, useState, useCallback } from "react";
import { Box, Button, useTheme } from "@mui/material";

import { drawBase, drawTextLines } from "utils/drawHelper";
import { NewspaperAdCard } from "utils/card";

export default function PreviewArea({ rect, ad, onBack }) {
  const theme = useTheme();

  const [pvSize, setPvSize] = useState({ w: 0, h: 0 });
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const updateSize = useCallback(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.clientWidth;
    setPvSize({ w, h: w * 0.75 }); 
  }, []);

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [updateSize]);

  useEffect(() => {
    const { w, h } = pvSize;
    if (!w || !h) return;
    const canvas = canvasRef.current;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    drawBase(ctx, w, h);
    drawTextLines(ctx, w, h);
  }, [pvSize]);

  return (
    <Box ref={containerRef} sx={{ position: "relative", width: "100%", mb: 4 }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: `${pvSize.h}px`,
          borderRadius: 4,
          border: `1px solid ${theme.palette.divider}`,
        }}
      />

      {rect && <NewspaperAdCard rect={rect} ad={ad} pvSize={pvSize} />}

      <Button onClick={onBack} sx={{ mt: 2 }}>
        Back to Edit
      </Button>
    </Box>
  );
}
