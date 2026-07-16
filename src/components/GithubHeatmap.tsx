import type { ContributionDay } from "@/lib/github-contributions";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const TOTAL_COLUMNS = 53;
const ROWS_PER_COLUMN = 7;
const TOTAL_CELLS = TOTAL_COLUMNS * ROWS_PER_COLUMN;

interface Cell {
  level: number;
  date: Date;
  commitCount: number | "No";
}

function buildCells(contributions: ContributionDay[]): Cell[] {
  const recent = contributions.slice(-TOTAL_CELLS);
  const padCount = TOTAL_CELLS - recent.length;
  const earliestDate = recent.length > 0 ? new Date(recent[0].date) : new Date();

  const cells: Cell[] = [];
  for (let i = padCount; i > 0; i--) {
    const date = new Date(earliestDate);
    date.setDate(date.getDate() - i);
    cells.push({ level: 0, date, commitCount: "No" });
  }
  for (const day of recent) {
    cells.push({
      level: day.level,
      date: new Date(day.date),
      commitCount: day.count === 0 ? "No" : day.count,
    });
  }
  return cells;
}

function buildMonthLabels(cells: Cell[]) {
  const labels: { name: string; column: number }[] = [];
  const seen = new Set<string>();
  for (let col = 0; col < TOTAL_COLUMNS; col++) {
    const firstCellIndex = col * ROWS_PER_COLUMN;
    if (firstCellIndex >= cells.length) continue;
    const cellDate = cells[firstCellIndex].date;
    const key = `${cellDate.getMonth()}-${cellDate.getFullYear()}`;
    if (!seen.has(key)) {
      seen.add(key);
      labels.push({ name: MONTH_NAMES[cellDate.getMonth()], column: col + 1 });
    }
  }
  return labels;
}

interface GithubHeatmapProps {
  contributions: ContributionDay[] | null;
}

export default function GithubHeatmap({ contributions }: GithubHeatmapProps) {
  if (!contributions) {
    return (
      <div className="github-contrib-card">
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Contribution data is temporarily unavailable -{" "}
          <a href="https://github.com/flxhrdyn" target="_blank" rel="noreferrer" className="contrib-link">
            view directly on GitHub
          </a>
          .
        </p>
      </div>
    );
  }

  const cells = buildCells(contributions);
  const monthLabels = buildMonthLabels(cells);
  const total = contributions.reduce((sum, day) => sum + day.count, 0);

  return (
    <div className="github-contrib-card">
      <div className="github-contrib-header">
        <span className="contrib-count">{total} contributions in the last year</span>
      </div>

      <div className="github-contrib-body">
        <div className="month-labels-row">
          <div className="month-label-spacer" />
          <div className="month-labels">
            {monthLabels.map((label) => (
              <div key={`${label.name}-${label.column}`} className="month-label" style={{ gridColumnStart: label.column }}>
                {label.name}
              </div>
            ))}
          </div>
        </div>

        <div className="grid-and-days">
          <div className="day-labels">
            <span className="day-label">Mon</span>
            <span className="day-label">Wed</span>
            <span className="day-label">Fri</span>
          </div>
          <div className="heatmap-grid">
            {cells.map((cell, i) => (
              <div key={i} className="heatmap-cell" data-level={cell.level}>
                <span className="tooltip">
                  {cell.commitCount} contributions on{" "}
                  {cell.date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="github-contrib-footer">
          <a href="https://github.com/flxhrdyn" target="_blank" rel="noreferrer" className="contrib-link">
            Learn how we count contributions
          </a>
          <div className="contrib-legend">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div key={level} className="legend-box" data-level={level} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
