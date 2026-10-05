export interface FormattedSkillCategory {
  indexLabel: string;
  title: string;
  countLabel: string;
}

export interface SkillCategoryGroup {
  category: string;
  items: string[];
}

export interface SkillTelemetryItem extends FormattedSkillCategory {
  category: string;
  items: string[];
}

export function formatSkillCategory(
  index: number,
  category: string,
  itemCount: number
): FormattedSkillCategory {
  const pad = (n: number) => String(n).padStart(2, '0');
  const indexLabel = pad(index + 1);
  const title = category.toUpperCase();
  const countLabel = `[${pad(itemCount)}]`;

  return {
    indexLabel,
    title,
    countLabel,
  };
}

export function getSkillTelemetry(
  groups: SkillCategoryGroup[]
): SkillTelemetryItem[] {
  return groups.map((group, index) => {
    const formatted = formatSkillCategory(index, group.category, group.items.length);
    return {
      ...formatted,
      category: group.category,
      items: group.items,
    };
  });
}
