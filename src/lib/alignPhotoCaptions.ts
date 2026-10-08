function getHorizontalObjectPosition(position: string) {
  const horizontal = position.trim().split(/\s+/)[0] ?? "50%";

  if (horizontal === "left") return 0;
  if (horizontal === "right") return 1;
  if (horizontal === "center") return 0.5;

  const percentage = Number.parseFloat(horizontal);
  return horizontal.endsWith("%") && Number.isFinite(percentage)
    ? percentage / 100
    : 0.5;
}

export function alignPhotoCaptions(root: HTMLElement) {
  const photos = [...root.querySelectorAll<HTMLElement>("figure")].flatMap((figure) => {
    const frame = figure.querySelector<HTMLElement>(".d1-experience-photo-frame, .photo-study__frame");
    const image = frame?.querySelector<HTMLImageElement>("img");
    const caption = figure.querySelector<HTMLElement>("figcaption");

    return frame && image && caption ? [{ frame, image, caption }] : [];
  });

  const align = () => {
    for (const { frame, image, caption } of photos) {
      if (!image.naturalWidth || !image.naturalHeight) continue;

      const frameWidth = frame.clientWidth;
      const frameHeight = frame.clientHeight;
      if (!frameWidth || !frameHeight) continue;

      const scale = Math.min(frameWidth / image.naturalWidth, frameHeight / image.naturalHeight);
      const imageWidth = image.naturalWidth * scale;
      const leftOffset = (frameWidth - imageWidth) * getHorizontalObjectPosition(
        getComputedStyle(image).objectPosition,
      );

      caption.style.width = `${imageWidth}px`;
      caption.style.marginInlineStart = `${leftOffset}px`;
    }
  };

  const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(align);
  for (const { frame, image } of photos) {
    observer?.observe(frame);
    image.addEventListener("load", align);
  }
  window.addEventListener("resize", align, { passive: true });
  align();

  return () => {
    observer?.disconnect();
    window.removeEventListener("resize", align);
    for (const { image } of photos) image.removeEventListener("load", align);
  };
}
