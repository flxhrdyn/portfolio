import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { formatSkillCategory, getSkillTelemetry } from "../src/components/designs/skills-utils.ts";

describe("Skills Telemetry Matrix Formatter", () => {
  const dummyGroups = [
    {
      category: "AI & Machine Learning",
      items: ["Advanced RAG", "AI Agents", "Deep Learning"],
    },
    {
      category: "Languages & Backend",
      items: ["Python", "SQL"],
    },
  ];

  it("formats single skill category header and counter", () => {
    const formatted = formatSkillCategory(0, "AI & Machine Learning", 3);
    assert.equal(formatted.indexLabel, "01");
    assert.equal(formatted.title, "AI & MACHINE LEARNING");
    assert.equal(formatted.countLabel, "[03]");
  });

  it("formats multiple skill categories into telemetry rows", () => {
    const telemetry = getSkillTelemetry(dummyGroups);
    assert.equal(telemetry.length, 2);
    assert.equal(telemetry[0].indexLabel, "01");
    assert.equal(telemetry[0].title, "AI & MACHINE LEARNING");
    assert.equal(telemetry[0].countLabel, "[03]");
    assert.equal(telemetry[0].items.length, 3);

    assert.equal(telemetry[1].indexLabel, "02");
    assert.equal(telemetry[1].title, "LANGUAGES & BACKEND");
    assert.equal(telemetry[1].countLabel, "[02]");
    assert.equal(telemetry[1].items.length, 2);
  });
});
