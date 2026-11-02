"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { parseApplicationInput, type FormActionState } from "@/lib/application-input";
import { prisma } from "@/lib/prisma";

export async function createApplication(_previous: FormActionState, formData: FormData): Promise<FormActionState> {
  const parsed = parseApplicationInput(formData);
  if (!parsed.ok) return { status: "error", message: parsed.message };

  try {
    const user = await getCurrentUser();
    if (!user) return { status: "error", message: "Sign in again to save this application." };
    await prisma.application.create({ data: { ...parsed.value, userId: user.id } });
    revalidatePath("/workspace");
    return { status: "success", message: "Application saved to your private workspace." };
  } catch {
    return { status: "error", message: "The application could not be saved. Try again." };
  }
}

export async function updateApplication(
  applicationId: string,
  _previous: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  if (!applicationId || applicationId.length > 64) return { status: "error", message: "This application could not be found." };
  const parsed = parseApplicationInput(formData);
  if (!parsed.ok) return { status: "error", message: parsed.message };

  try {
    const user = await getCurrentUser();
    if (!user) return { status: "error", message: "Sign in again to update this application." };
    const result = await prisma.application.updateMany({
      where: { id: applicationId, userId: user.id, archivedAt: null },
      data: parsed.value,
    });
    if (result.count !== 1) return { status: "error", message: "This application is unavailable in your workspace." };
    revalidatePath("/workspace");
    return { status: "success", message: "Application changes saved." };
  } catch {
    return { status: "error", message: "The application could not be updated. Try again." };
  }
}

export async function archiveApplication(
  applicationId: string,
  previous: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  void previous;
  void formData;
  if (!applicationId || applicationId.length > 64) return { status: "error", message: "This application could not be found." };

  try {
    const user = await getCurrentUser();
    if (!user) return { status: "error", message: "Sign in again to archive this application." };
    const result = await prisma.application.updateMany({
      where: { id: applicationId, userId: user.id, archivedAt: null },
      data: { archivedAt: new Date() },
    });
    if (result.count !== 1) return { status: "error", message: "This application is unavailable in your workspace." };
    revalidatePath("/workspace");
    return { status: "success", message: "Application moved to your archive." };
  } catch {
    return { status: "error", message: "The application could not be archived. Try again." };
  }
}
