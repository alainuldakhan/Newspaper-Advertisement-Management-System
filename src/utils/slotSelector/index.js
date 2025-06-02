import React, { useEffect, useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Box, Typography, useTheme } from "@mui/material";
import { drawBase, drawTextLines, strokeRoundRect } from "utils/drawHelper";

export function NewspaperSlotSelector({ rect, onChange }) {
  const theme = useTheme();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [size, setSize] = useState({ w: 800, h: 600 });
  const [drag, setDrag] = useState(false);
  const [start, setStart] = useState(null);

  const updateSize = useCallback(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.clientWidth;
    setSize({ w, h: w * 0.75 }); // 4:3 ratio
  }, []);

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [updateSize]);


  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setDrag(false);
        setStart(null);
        onChange(null);           
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onChange]);

  useEffect(() => {
    const { w, h } = size;
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");

    drawBase(ctx, w, h);

    if (rect) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, w, h);
      ctx.rect(rect.xPct * w, rect.yPct * h, rect.wPct * w, rect.hPct * h);
      ctx.clip("evenodd");
      drawTextLines(ctx, w, h);
      ctx.restore();

      ctx.strokeStyle = theme.palette.primary.main;
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      strokeRoundRect(
        ctx,
        rect.xPct * w,
        rect.yPct * h,
        rect.wPct * w,
        rect.hPct * h
      );
      ctx.setLineDash([]);
    } else {
      drawTextLines(ctx, w, h);
    }

    ctx.fillStyle = theme.palette.text.secondary;
    ctx.font = "italic 14px serif";
    ctx.fillText(
      drag ? "Release to set ad area" : "Drag to draw ad area",
      16,
      h - 20
    );
  }, [size, rect, drag, theme.palette]);

  // --- helpers ---------------------------------------------------
  const toCanvas = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * size.w,
      y: ((e.clientY - r.top) / r.height) * size.h,
    };
  };

  const handleMouseDown = (e) => {
    setStart(toCanvas(e));
    setDrag(true);
    onChange(null);
  };

  const handleMouseMove = (e) => {
    if (!drag || !start) return;
    const p = toCanvas(e);
    const x0 = Math.min(start.x, p.x);
    const y0 = Math.min(start.y, p.y);
    const w0 = Math.abs(p.x - start.x);
    const h0 = Math.abs(p.y - start.y);

    onChange({
      xPct: x0 / size.w,
      yPct: y0 / size.h,
      wPct: w0 / size.w,
      hPct: h0 / size.h,
    });
  };

  const handleMouseUp = () => setDrag(false);
  // ---------------------------------------------------------------

  return (
    <Box ref={containerRef} sx={{ mt: 2 }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          cursor: "crosshair",
          borderRadius: 4,
          border: `1px solid ${theme.palette.divider}`,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: 1, textAlign: "center" }}
      >
        {rect
          ? `x=${(rect.xPct * size.w).toFixed(0)}, y=${(
              rect.yPct * size.h
            ).toFixed(0)}, w=${(rect.wPct * size.w).toFixed(0)}, h=${(
              rect.hPct * size.h
            ).toFixed(0)}`
          : "No area selected"}
      </Typography>
    </Box>
  );
}

NewspaperSlotSelector.propTypes = {
  rect: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default NewspaperSlotSelector;