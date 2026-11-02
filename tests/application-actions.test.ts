import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getCurrentUser: vi.fn(),
  create: vi.fn(),
  updateMany: vi.fn(),
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({ getCurrentUser: mocks.getCurrentUser }));
vi.mock("@/lib/prisma", () => ({ prisma: { application: { create: mocks.create, updateMany: mocks.updateMany } } }));
vi.mock("next/cache", () => ({ revalidatePath: mocks.revalidatePath }));

import { archiveApplication, createApplication, updateApplication } from "@/app/workspace/application-actions";

function form(company = "Acme") {
  const data = new FormData();
  data.set("company", company);
  data.set("role", "Engineer");
  data.set("stage", "SAVED");
  return data;
}

const idle = { status: "idle" as const, message: "" };

describe("account-scoped application actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getCurrentUser.mockResolvedValue({ id: "account-a", email: "a@folio.invalid", name: "A" });
    mocks.create.mockResolvedValue({ id: "application-1" });
    mocks.updateMany.mockResolvedValue({ count: 1 });
  });

  it("assigns new records to the session account, never a submitted owner", async () => {
    const data = form("  Acme  ");
    data.set("userId", "account-b");

    await expect(createApplication(idle, data)).resolves.toMatchObject({ status: "success" });
    expect(mocks.create).toHaveBeenCalledWith({ data: expect.objectContaining({ company: "Acme", userId: "account-a" }) });
    expect(mocks.revalidatePath).toHaveBeenCalledWith("/workspace");
  });

  it("updates only an active record owned by the signed-in account", async () => {
    await updateApplication("application-2", idle, form());

    expect(mocks.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: "application-2", userId: "account-a", archivedAt: null },
    }));
  });

  it("returns the same unavailable result when a record is missing or belongs to another account", async () => {
    mocks.updateMany.mockResolvedValue({ count: 0 });

    await expect(updateApplication("foreign-record", idle, form())).resolves.toEqual({
      status: "error", message: "This application is unavailable in your workspace.",
    });
    expect(mocks.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: "foreign-record", userId: "account-a", archivedAt: null },
    }));
  });

  it("archives with an owner-scoped update rather than deleting the record", async () => {
    await expect(archiveApplication("application-3", idle, new FormData())).resolves.toMatchObject({ status: "success" });

    const call = mocks.updateMany.mock.calls[0]?.[0];
    expect(call.where).toEqual({ id: "application-3", userId: "account-a", archivedAt: null });
    expect(call.data.archivedAt).toBeInstanceOf(Date);
  });

  it("does not write when the session has expired or disappeared", async () => {
    mocks.getCurrentUser.mockResolvedValue(null);

    await expect(createApplication(idle, form())).resolves.toMatchObject({ status: "error" });
    await expect(archiveApplication("application-3", idle, new FormData())).resolves.toMatchObject({ status: "error" });
    expect(mocks.create).not.toHaveBeenCalled();
    expect(mocks.updateMany).not.toHaveBeenCalled();
  });
});
