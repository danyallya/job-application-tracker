import { ApplicationStage } from "@prisma/client";

export const applicationStages = Object.values(ApplicationStage);

export type ApplicationInput = {
  company: string;
  role: string;
  stage: ApplicationStage;
  source: string | null;
  postingUrl: string | null;
  location: string | null;
  salary: string | null;
  notes: string | null;
  appliedAt: Date | null;
  nextAction: string | null;
  nextActionAt: Date | null;
};

export type ApplicationInputResult =
  | { ok: true; value: ApplicationInput }
  | { ok: false; message: string };

export type FormActionState = { status: "idle" | "success" | "error"; message: string };

const limits = {
  company: 120,
  role: 120,
  source: 120,
  postingUrl: 2048,
  location: 120,
  salary: 100,
  notes: 4000,
  nextAction: 240,
} as const;

function readText(formData: FormData, key: keyof typeof limits): string | null {
  const value = formData.get(key);
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function readDate(formData: FormData, key: "appliedAt" | "nextActionAt"):
  | { ok: true; value: Date | null }
  | { ok: false } {
  const value = formData.get(key);
  if (value === null) return { ok: true, value: null };
  if (typeof value !== "string") return { ok: false };
  const trimmed = value.trim();
  if (!trimmed) return { ok: true, value: null };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return { ok: false };
  const date = new Date(`${trimmed}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== trimmed) return { ok: false };
  return { ok: true, value: date };
}

export function parseApplicationInput(formData: FormData): ApplicationInputResult {
  const company = readText(formData, "company");
  const role = readText(formData, "role");
  if (!company || !role) return { ok: false, message: "Enter both a company and a role." };
  if (company.length > limits.company || role.length > limits.role) {
    return { ok: false, message: "Company and role must each be 120 characters or fewer." };
  }

  const stageValue = formData.get("stage");
  const stage = typeof stageValue === "string" && applicationStages.includes(stageValue as ApplicationStage)
    ? (stageValue as ApplicationStage)
    : null;
  if (!stage) return { ok: false, message: "Choose a valid application stage." };

  const optional = Object.keys(limits).filter((key) => key !== "company" && key !== "role") as Array<keyof typeof limits>;
  const values = Object.fromEntries(optional.map((key) => [key, readText(formData, key)])) as Record<(typeof optional)[number], string | null>;
  for (const key of optional) {
    if ((values[key]?.length ?? 0) > limits[key]) {
      return { ok: false, message: `${key === "postingUrl" ? "Link" : key} is too long.` };
    }
  }

  if (values.postingUrl) {
    try {
      const url = new URL(values.postingUrl);
      if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("Unsupported URL protocol");
    } catch {
      return { ok: false, message: "Enter a complete http or https job link." };
    }
  }

  const appliedAt = readDate(formData, "appliedAt");
  const nextActionAt = readDate(formData, "nextActionAt");
  if (!appliedAt.ok || !nextActionAt.ok) return { ok: false, message: "Enter valid application and follow-up dates." };

  return {
    ok: true,
    value: {
      company,
      role,
      stage,
      source: values.source,
      postingUrl: values.postingUrl,
      location: values.location,
      salary: values.salary,
      notes: values.notes,
      appliedAt: appliedAt.value,
      nextAction: values.nextAction,
      nextActionAt: nextActionAt.value,
    },
  };
}
