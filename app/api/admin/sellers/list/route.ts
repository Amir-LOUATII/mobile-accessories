import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }

  const sellers = await db.query.users.findMany({
    where: eq(users.role, "seller"),
    columns: {
      id: true,
      name: true,
      email: true,
      company: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ sellers });
}
