export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const GITHUB_USERNAME = "flxhrdyn";

export async function fetchGithubContributions(): Promise<ContributionDay[] | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      { next: { revalidate: 43200 } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { contributions: ContributionDay[] };
    return data.contributions;
  } catch {
    return null;
  }
}
