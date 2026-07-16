"use client";

import { useEffect, useMemo, useState } from "react";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const TOTAL_COLUMNS = 53;
const ROWS_PER_COLUMN = 7;
const TOTAL_CELLS = TOTAL_COLUMNS * ROWS_PER_COLUMN;

interface Cell {
  level: number;
  date: Date;
  commitCount: number | "No";
}

function buildCells(): Cell[] {
  const cells: Cell[] = [];
  for (let i = 0; i < TOTAL_CELLS; i++) {
    const r = Math.random();
    let level = 0;
    if (r > 0.88) level = 4;
    else if (r > 0.75) level = 3;
    else if (r > 0.55) level = 2;
    else if (r > 0.35) level = 1;

    const date = new Date();
    date.setDate(date.getDate() - (TOTAL_CELLS - 1 - i));
    const commitCount = level === 0 ? "No" : level * 2 + Math.floor(Math.random() * 2);
    cells.push({ level, date, commitCount });
  }
  return cells;
}

export default function GithubHeatmap() {
  const [cells, setCells] = useState<Cell[]>([]);

  useEffect(() => {
    setCells(buildCells());
  }, []);

  const monthLabels = useMemo(() => {
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
  }, [cells]);

  return (
    <div className="github-contrib-card">
      <div className="github-contrib-header">
        <span className="contrib-count">842 contributions in the last year</span>
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
