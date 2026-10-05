import { DESIGN_VERSIONS, DESIGN_META, type DesignVersion } from '../../config/design.ts';

export interface SwitcherOption {
  id: DesignVersion;
  label: string;
  name: string;
  ref: string;
  isActive: boolean;
  title: string;
}

export function getSwitcherOptions(activeDesign: DesignVersion): SwitcherOption[] {
  return DESIGN_VERSIONS.map((v) => {
    const meta = DESIGN_META[v];
    return {
      id: v,
      label: meta.label,
      name: meta.name,
      ref: meta.ref,
      isActive: v === activeDesign,
      title: `${meta.label}: ${meta.name} (${meta.ref})`,
    };
  });
}
