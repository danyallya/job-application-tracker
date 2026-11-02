import { describe, expect, it } from "vitest";
import { parseApplicationInput } from "@/lib/application-input";

function form(values: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
}

describe("saved application input", () => {
  it("trims required fields and normalizes optional values and dates", () => {
    const result = parseApplicationInput(form({
      company: "  Acme  ", role: " Staff Engineer ", stage: "INTERVIEW",
      postingUrl: " https://jobs.example/role ", appliedAt: "2026-10-30", nextActionAt: "",
    }));

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.company).toBe("Acme");
    expect(result.value.role).toBe("Staff Engineer");
    expect(result.value.stage).toBe("INTERVIEW");
    expect(result.value.postingUrl).toBe("https://jobs.example/role");
    expect(result.value.appliedAt?.toISOString()).toBe("2026-10-30T00:00:00.000Z");
    expect(result.value.nextActionAt).toBeNull();
    expect(result.value.notes).toBeNull();
  });

  it("requires a company, role and known stage", () => {
    expect(parseApplicationInput(form({ company: "", role: "Engineer", stage: "SAVED" }))).toMatchObject({ ok: false });
    expect(parseApplicationInput(form({ company: "Acme", role: " ", stage: "SAVED" }))).toMatchObject({ ok: false });
    expect(parseApplicationInput(form({ company: "Acme", role: "Engineer", stage: "UNKNOWN" }))).toMatchObject({ ok: false });
  });

  it("rejects overlong values, unsafe links and invalid calendar dates", () => {
    expect(parseApplicationInput(form({ company: "A".repeat(121), role: "Engineer", stage: "SAVED" }))).toMatchObject({ ok: false });
    expect(parseApplicationInput(form({ company: "Acme", role: "Engineer", stage: "SAVED", postingUrl: "javascript:alert(1)" }))).toMatchObject({ ok: false });
    expect(parseApplicationInput(form({ company: "Acme", role: "Engineer", stage: "SAVED", appliedAt: "2026-02-30" }))).toMatchObject({ ok: false });
  });
});
