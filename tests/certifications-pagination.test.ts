import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getCertificationsPage } from "../src/components/designs/certifications-utils.ts";

describe("Certifications In-Place Pagination", () => {
  const dummyItems = Array.from({ length: 17 }, (_, i) => ({
    title: `Cert ${i + 1}`,
    issuer: `Issuer ${i + 1}`,
    date: "2024",
    badge: "Badge",
  }));

  it("calculates total pages correctly based on page size", () => {
    const pageData = getCertificationsPage(dummyItems, 0, 6);
    assert.equal(pageData.totalPages, 3);
    assert.equal(pageData.totalItems, 17);
    assert.equal(pageData.currentPage, 0);
  });

  it("slices items for the first page", () => {
    const pageData = getCertificationsPage(dummyItems, 0, 6);
    assert.equal(pageData.items.length, 6);
    assert.equal(pageData.items[0].title, "Cert 1");
    assert.equal(pageData.items[5].title, "Cert 6");
    assert.equal(pageData.hasPrev, false);
    assert.equal(pageData.hasNext, true);
  });

  it("slices items for the second page", () => {
    const pageData = getCertificationsPage(dummyItems, 1, 6);
    assert.equal(pageData.items.length, 6);
    assert.equal(pageData.items[0].title, "Cert 7");
    assert.equal(pageData.items[5].title, "Cert 12");
    assert.equal(pageData.hasPrev, true);
    assert.equal(pageData.hasNext, true);
  });

  it("slices remaining items for the last page", () => {
    const pageData = getCertificationsPage(dummyItems, 2, 6);
    assert.equal(pageData.items.length, 5);
    assert.equal(pageData.items[0].title, "Cert 13");
    assert.equal(pageData.items[4].title, "Cert 17");
    assert.equal(pageData.hasPrev, true);
    assert.equal(pageData.hasNext, false);
  });

  it("clamps page index within valid range", () => {
    const negativePage = getCertificationsPage(dummyItems, -2, 6);
    assert.equal(negativePage.currentPage, 0);

    const overflowPage = getCertificationsPage(dummyItems, 99, 6);
    assert.equal(overflowPage.currentPage, 2);
  });

  it("formats telemetry page indicator strings", () => {
    const pageData = getCertificationsPage(dummyItems, 0, 6);
    assert.equal(pageData.pageIndicator, "01 / 03");
  });
});
