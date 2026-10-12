export const DESIGNS = ['minimalist', 'technical'] as const;
export type Design = (typeof DESIGNS)[number];

// Read at build time: switching the deployed design is an env change plus a redeploy.
export const ACTIVE_DESIGN: Design =
  (DESIGNS as readonly string[]).includes(process.env.PORTFOLIO_DESIGN ?? '')
    ? (process.env.PORTFOLIO_DESIGN as Design)
    : 'minimalist';
