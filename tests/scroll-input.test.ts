import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { limitWheelDelta } from "../src/lib/scroll-input.ts";

describe("limitWheelDelta", () => {
  it("preserves input below the limit", () => assert.equal(limitWheelDelta(48, 120), 48));
  it("bounds a large positive burst", () => assert.equal(limitWheelDelta(900, 120), 120));
  it("preserves direction for a large reverse burst", () => assert.equal(limitWheelDelta(-900, 120), -120));
  it("keeps zero at zero", () => assert.equal(limitWheelDelta(0, 120), 0));
  it("rejects a non-positive limit", () => assert.throws(() => limitWheelDelta(1, 0), RangeError));
});
