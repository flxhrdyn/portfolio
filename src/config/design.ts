export type DesignVersion = 'd1' | 'd2' | 'd3' | 'd4' | 'd5';

export const DEFAULT_DESIGN: DesignVersion = 'd1';

export const DESIGN_VERSIONS: readonly DesignVersion[] = ['d1', 'd2', 'd3', 'd4', 'd5'] as const;

export interface DesignMetadata {
  id: DesignVersion;
  label: string;
  name: string;
  ref: string;
  description: string;
}

export const DESIGN_META: Record<DesignVersion, DesignMetadata> = {
  d1: {
    id: 'd1',
    label: '01',
    name: 'Swiss Editorial Ledger',
    ref: 'tacto-inc.com + Hans Sleutelaar',
    description: 'Minimal lightweight ledger with hairline rules, 3-up arrow index, and quiet typography.',
  },
  d2: {
    id: 'd2',
    label: '02',
    name: 'Architectural Frame',
    ref: '2xa.studio + Studio Merge',
    description: 'Inset canvas frame with live clock telemetry, stretched mono caps, and asymmetric grid.',
  },
  d3: {
    id: 'd3',
    label: '03',
    name: 'Scientific Proof Sheet',
    ref: 'typesafe.ai + Grids',
    description: 'Data-first layout with metric bars, benchmark matrix, and technical window headers.',
  },
  d4: {
    id: 'd4',
    label: '04',
    name: 'Swiss Quiet Inline',
    ref: 'matthieugivelet.com + Cristiana Araujo',
    description: 'Inline portrait hero mask, bracketed labels, and generous Swiss proportions.',
  },
  d5: {
    id: 'd5',
    label: '05',
    name: 'Kinetic Minimal Workspace',
    ref: 'rifqisakha.my.id + Avec Anni',
    description: 'UNIX path labels, tactile interactive drawers, and floating bottom workspace dock.',
  },
};

export const DESIGN_STORAGE_KEY = 'flxhrdyn_design_version';
export const DESIGN_QUERY_PARAM = 'v';

export function isValidDesign(value: unknown): value is DesignVersion {
  if (typeof value !== 'string') return false;
  return DESIGN_VERSIONS.includes(value as DesignVersion);
}
