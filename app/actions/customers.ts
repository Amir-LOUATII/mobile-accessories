"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// ─────────────────────────────────────────────────────────────────────────────
// Get Customer by ID
// ─────────────────────────────────────────────────────────────────────────────
export async function getCustomerById(id: string) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return { error: "Non autorisé" };
    }

    const customer = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!customer) {
      return { error: "Client introuvable" };
    }

    return { customer };
  } catch (error: any) {
    console.error("Error fetching customer:", error);
    return { error: "Erreur lors de la récupération du client" };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Update Customer
// ─────────────────────────────────────────────────────────────────────────────
export async function updateCustomer(
  id: string,
  data: {
    name?: string;
    email?: string;
    company?: string;
    isActive?: boolean;
  }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return { error: "Non autorisé" };
    }

    await db.update(users).set(data).where(eq(users.id, id));
    revalidatePath("/admin/customers");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating customer:", error);
    return { error: "Erreur lors de la mise à jour du client" };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Toggle Customer Status
// ─────────────────────────────────────────────────────────────────────────────
export async function toggleCustomerStatus(id: string, isActive: boolean) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return { error: "Non autorisé" };
    }

    await db.update(users).set({ isActive }).where(eq(users.id, id));
    revalidatePath("/admin/customers");
    return { success: true };
  } catch (error: any) {
    console.error("Error toggling customer status:", error);
    return { error: "Erreur lors de la modification du statut" };
  }
}
