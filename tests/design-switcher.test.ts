import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getSwitcherOptions } from "../src/components/design-switcher/switcher-utils.ts";
import { DESIGN_VERSIONS } from "../src/config/design.ts";

describe("DesignSwitcher Logic & Options", () => {
  it("generates all 5 design options", () => {
    const options = getSwitcherOptions("d1");
    assert.equal(options.length, 5);
    assert.deepEqual(
      options.map((o) => o.id),
      ["d1", "d2", "d3", "d4", "d5"]
    );
  });

  it("labels options from 01 to 05 sequentially", () => {
    const options = getSwitcherOptions("d1");
    assert.deepEqual(
      options.map((o) => o.label),
      ["01", "02", "03", "04", "05"]
    );
  });

  it("marks exactly the active design as isActive", () => {
    for (const v of DESIGN_VERSIONS) {
      const options = getSwitcherOptions(v);
      const activeOptions = options.filter((o) => o.isActive);
      assert.equal(activeOptions.length, 1);
      assert.equal(activeOptions[0].id, v);
    }
  });

  it("populates descriptive titles and references for each option", () => {
    const options = getSwitcherOptions("d2");
    for (const opt of options) {
      assert.ok(opt.title.includes(opt.label));
      assert.ok(opt.title.includes(opt.name));
      assert.ok(opt.title.includes(opt.ref));
    }
  });
});
