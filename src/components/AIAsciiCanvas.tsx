"use client";

import { useEffect, useRef } from "react";

interface AIAsciiCanvasProps {
  theme?: "light" | "dark";
}

// Authentic AI / Deep Learning code fragments: multi-line blocks and bold one-liners
const CODE_SNIPPETS: string[][] = [
  // Multi-line functional code blocks
  [
    "def forward(x: Tensor) -> Tensor:",
    "    x = x + self.attn(self.ln_1(x))",
    "    return self.mlp(self.ln_2(x))",
  ],
  [
    "q = x @ W_q + b_q;  k = x @ W_k + b_k",
    "attn = softmax(q @ k.T / sqrt(d_k)) @ v",
  ],
  [
    "loss = cross_entropy(logits.view(-1), targets)",
    "scaler.scale(loss).backward()",
    "scaler.step(optimizer)",
  ],
  [
    "[ 0x404_NULL_VECTOR ]",
    "latent_coords: [NAN, NULL, 0x0]",
    "status: unreachable_state",
  ],
  [
    "dim=1536 :: fp16 :: bfloat16",
    "tokens_per_sec: 148.6 // ctx: 8192",
    "perplexity: 8.42 // bpw: 4.12",
  ],
  [
    "rotary_embedding: [cos(theta * m), sin(theta * m)]",
    "rope_freqs_cis // q_embed, k_embed",
  ],
  [
    "torch.cuda.amp.autocast(dtype=torch.bfloat16):",
    "    logits = model(input_ids, attention_mask)",
  ],
  [
    "kv_cache[layer_idx].update(k_states, v_states)",
    "flash_attn_func(q, k, v, causal=True)",
  ],
  [
    "all_gather_into_tensor(output, input, group)",
    "ddp_gradient_reduce_scatter // rank_0",
  ],
  [
    "segmentation_fault: pointer 0x0 at address",
    "[0x00007fff9b20 :: 0x404_NULL_POINTER]",
  ],
  [
    "lr_scheduler.step()",
    "optimizer.zero_grad(set_to_none=True)",
  ],
  [
    "vllm::paged_attention_v2 // block_size: 16",
    "moe_gates = softmax(router(x), dim=-1)",
  ],
  [
    "loss: 0.0018 // grad_norm: 0.042 // step: 104200",
    "metrics: eval_loss: 0.0021 // latency: 14.2ms",
  ],
  // Bold one-liners
  ["0x404_LATENT_SPACE_NOT_CONVERGED"],
  ["gelu(x) = 0.5 * x * (1 + tanh(sqrt(2/pi) * x))"],
  ["attention_mask.masked_fill_(mask == 0, -inf)"],
  ["layer_norm: y = (x - mean) / sqrt(var + eps)"],
  ["torch.compile(model, mode='reduce-overhead')"],
  ["clip_grad_norm_(parameters, max_norm=1.0)"],
  ["bmm(batch1, batch2) // precision: tf32"],
  ["cuda_stream_sync // pinned_memory_transfer"],
  ["tensor([0.4812, -0.1920, 0.8841, -0.0041])"],
  ["optimizer: AdamW(lr=1.25e-4, beta1=0.90)"],
  ["weight_decay=0.01 // scheduler: cosine_decay"],
];

const ASCII_POOL = [
  "0", "1", "4", "Ø", "λ", "∇", "∑", "∂", "π", "∫", "≈", "≠", "■", "□",
  "[", "]", "{", "}", "<", ">", "/", "\\", "|", ":", ";", "=", "+", "-", "*",
  "X", "Y", "Z", "ERR", "NULL", "NAN",
];

const MONO_FONT_FAMILY =
  "'GeistMono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";

interface CodeLine {
  origText: string;
  displayChars: string[];
}

interface FloatingFragment {
  lines: CodeLine[];
  x: number;
  y: number;
  totalWidth: number;
  totalHeight: number;
  lineHeight: number;
  fontSize: number;
  alphaMult: number;
  energy: number;
  lastGlyphChange: number;
}

// Compute overlap ratio between two 2D bounding boxes
function getBoxOverlapRatio(
  x1: number,
  y1: number,
  w1: number,
  h1: number,
  x2: number,
  y2: number,
  w2: number,
  h2: number
): number {
  const overlapX = Math.max(0, Math.min(x1 + w1, x2 + w2) - Math.max(x1, x2));
  const overlapY = Math.max(0, Math.min(y1 + h1, y2 + h2) - Math.max(y1, y2));
  const overlapArea = overlapX * overlapY;
  const minArea = Math.min(w1 * h1, w2 * h2);
  return minArea > 0 ? overlapArea / minArea : 0;
}

export default function AIAsciiCanvas({ theme = "light" }: AIAsciiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let cssWidth = window.innerWidth;
    let cssHeight = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;

    const mouse = { x: -1000, y: -1000, active: false };

    let fragments: FloatingFragment[] = [];

    const initCanvas = () => {
      cssWidth = window.innerWidth;
      cssHeight = window.innerHeight;
      dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      fragments = [];
      let snippetIndex = Math.floor(Math.random() * CODE_SNIPPETS.length);

      // Balanced density for medium-sized code typography
      const totalCount = Math.min(Math.max(Math.floor((cssWidth * cssHeight) / 22000), 28), 50);

      for (let i = 0; i < totalCount; i++) {
        const rawLines = CODE_SNIPPETS[snippetIndex % CODE_SNIPPETS.length];
        snippetIndex++;

        // Medium display monospace font size: 14px to 18px
        const fontSize = Math.floor(14 + Math.random() * 5);
        const lineHeight = Math.floor(fontSize * 1.36);
        ctx.font = `${fontSize}px ${MONO_FONT_FAMILY}`;

        let maxLineWidth = 0;
        const lines: CodeLine[] = rawLines.map((lineText) => {
          const w = ctx.measureText(lineText).width;
          if (w > maxLineWidth) maxLineWidth = w;
          return {
            origText: lineText,
            displayChars: lineText.split(""),
          };
        });

        const totalHeight = lines.length * lineHeight;

        // Controlled organic placement: sample candidate spots and reject heavy overlaps
        let bestX = Math.random() * (cssWidth + 40) - 20;
        let bestY = Math.random() * (cssHeight + 20) - 10;
        let minMaxOverlap = Infinity;

        const maxAttempts = 30;
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
          const candX = Math.random() * (cssWidth + 60) - 30;
          const candY = Math.random() * (cssHeight + 30) - 15;

          let worstOverlapWithPlaced = 0;
          for (let p = 0; p < fragments.length; p++) {
            const placed = fragments[p];
            const ov = getBoxOverlapRatio(
              candX,
              candY,
              maxLineWidth,
              totalHeight,
              placed.x,
              placed.y,
              placed.totalWidth,
              placed.totalHeight
            );
            if (ov > worstOverlapWithPlaced) {
              worstOverlapWithPlaced = ov;
            }
          }

          // Very little overlap (< 6%): ideal non-colliding spot found
          if (worstOverlapWithPlaced < 0.06) {
            bestX = candX;
            bestY = candY;
            minMaxOverlap = worstOverlapWithPlaced;
            break;
          }

          if (worstOverlapWithPlaced < minMaxOverlap) {
            minMaxOverlap = worstOverlapWithPlaced;
            bestX = candX;
            bestY = candY;
          }
        }

        const alphaMult = 0.8 + Math.random() * 0.45;

        fragments.push({
          lines,
          x: bestX,
          y: bestY,
          totalWidth: maxLineWidth,
          totalHeight,
          lineHeight,
          fontSize,
          alphaMult,
          energy: 0,
          lastGlyphChange: 0,
        });
      }
    };

    initCanvas();

    const handleResize = () => {
      initCanvas();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const render = (now: number) => {
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      const isDark = theme === "dark";
      // Subtle atmospheric opacity: gentle background presence, crisp on hover
      const baseAlpha = isDark ? 0.14 : 0.10;
      const rgb = isDark ? "255, 255, 255" : "0, 0, 0";
      ctx.textBaseline = "top";

      const hoverRadius = 180;

      for (let i = 0; i < fragments.length; i++) {
        const frag = fragments[i];

        // Distance from cursor to fragment bounding box
        const clampedX = Math.max(frag.x, Math.min(mouse.x, frag.x + frag.totalWidth));
        const clampedY = Math.max(frag.y, Math.min(mouse.y, frag.y + frag.totalHeight));
        const dx = clampedX - mouse.x;
        const dy = clampedY - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (mouse.active && dist < hoverRadius) {
          const targetEnergy = Math.pow(1 - dist / hoverRadius, 1.2);
          frag.energy = Math.max(frag.energy, targetEnergy);
        }

        // Slow, gradual decay
        if (frag.energy > 0.005) {
          frag.energy *= 0.978;

          // Glyph transition throttled to 120ms
          if (now - frag.lastGlyphChange > 120) {
            frag.lastGlyphChange = now;
            for (let l = 0; l < frag.lines.length; l++) {
              const line = frag.lines[l];
              for (let c = 0; c < line.displayChars.length; c++) {
                if (Math.random() < frag.energy * 0.45) {
                  line.displayChars[c] =
                    ASCII_POOL[Math.floor(Math.random() * ASCII_POOL.length)];
                } else if (Math.random() < 0.25) {
                  line.displayChars[c] = line.origText[c];
                }
              }
            }
          }
        } else {
          frag.energy = 0;
          for (let l = 0; l < frag.lines.length; l++) {
            const line = frag.lines[l];
            for (let c = 0; c < line.displayChars.length; c++) {
              line.displayChars[c] = line.origText[c];
            }
          }
        }

        // Restrained subtle opacity: low base with soft, gentle lift on hover
        const alpha = baseAlpha * frag.alphaMult + frag.energy * (isDark ? 0.24 : 0.20);
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
        ctx.font = `${frag.fontSize}px ${MONO_FONT_FAMILY}`;

        // Render multi-line block cleanly
        for (let l = 0; l < frag.lines.length; l++) {
          const line = frag.lines[l];
          const lineY = frag.y + l * frag.lineHeight;
          ctx.fillText(line.displayChars.join(""), frag.x, lineY);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="notfound-ascii-canvas"
      aria-hidden="true"
    />
  );
}
