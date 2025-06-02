import React, { useRef, useEffect, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography, useTheme } from "@mui/material";

/* ---------- helper: превращаем watch/share URL → embed ---------- */
function toEmbed(url) {
  try {
    const u = new URL(url);

    /* YouTube */
    if (u.hostname.includes("youtube.com")) {
      /* https://www.youtube.com/watch?v=ID  →  /embed/ID */
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (u.hostname === "youtu.be") {
      /* https://youtu.be/ID → /embed/ID */
      return `https://www.youtube.com/embed${u.pathname}`;
    }

    /* Vimeo */
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (id) return `https://player.vimeo.com/video/${id}`;
    }

    /* уже embed или другой разрешённый домен */
    return url;
  } catch {
    return url;
  }
}

export default function MediaPreview({ ad, onBack }) {
  const theme = useTheme();
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [failed, setFailed] = useState(false);

  const embedSrc = toEmbed(ad.media_url);

  /* вычисляем 16:9 */
  const updateSize = useCallback(() => {
    if (!containerRef.current) return;
    setHeight((containerRef.current.clientWidth * 9) / 16);
  }, []);

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [updateSize]);

  return (
    <Box ref={containerRef} sx={{ width: "100%", mb: 4 }}>
      {!failed ? (
        <iframe
          title={ad.title || "Media Ad"}
          src={embedSrc}
          width="100%"
          height={height}
          style={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 4,
          }}
          sandbox="allow-same-origin allow-scripts allow-presentation allow-popups"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onError={() => setFailed(true)}
        />
      ) : (
        <Typography color="error" sx={{ mb: 2 }}>
          Не удалось встроить видео. <br />
          <a href={ad.media_url} target="_blank" rel="noopener noreferrer">
            Откройте его по ссылке
          </a>
        </Typography>
      )}

      <Button onClick={onBack}>Back to Edit</Button>
    </Box>
  );
}

MediaPreview.propTypes = {
  ad: PropTypes.shape({
    media_url: PropTypes.string.isRequired,
    title: PropTypes.string,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};