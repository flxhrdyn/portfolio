import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_DESIGN,
  DESIGN_META,
  DESIGN_VERSIONS,
  isValidDesign,
  type DesignVersion,
} from "../src/config/design.ts";

describe("Design Config & Metadata", () => {
  it("defines d1 as the default design", () => {
    assert.equal(DEFAULT_DESIGN, "d1");
  });

  it("contains all 5 expected design versions", () => {
    const expected: DesignVersion[] = ["d1", "d2", "d3", "d4", "d5"];
    assert.deepEqual(DESIGN_VERSIONS, expected);
  });

  it("validates valid and invalid design identifiers", () => {
    assert.equal(isValidDesign("d1"), true);
    assert.equal(isValidDesign("d2"), true);
    assert.equal(isValidDesign("d3"), true);
    assert.equal(isValidDesign("d4"), true);
    assert.equal(isValidDesign("d5"), true);
    assert.equal(isValidDesign("d6"), false);
    assert.equal(isValidDesign(""), false);
    assert.equal(isValidDesign(null), false);
    assert.equal(isValidDesign(undefined), false);
    assert.equal(isValidDesign("v1"), false);
  });

  it("provides complete metadata for every design version", () => {
    for (const v of DESIGN_VERSIONS) {
      const meta = DESIGN_META[v];
      assert.ok(meta, `Missing metadata for ${v}`);
      assert.equal(meta.id, v);
      assert.ok(meta.label.length > 0);
      assert.ok(meta.name.length > 0);
      assert.ok(meta.ref.length > 0);
    }
  });
});
