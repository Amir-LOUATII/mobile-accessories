import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }

  const totalCountQuery = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(eq(users.role, "seller"));
  const totalCount = Number(totalCountQuery[0].count);

  const offset = (page - 1) * limit;

  const sellers = await db.query.users.findMany({
    where: eq(users.role, "seller"),
    columns: {
      id: true,
      name: true,
      email: true,
      company: true,
      createdAt: true,
    },
    limit,
    offset,
  });

  return NextResponse.json({ 
    sellers,
    pagination: {
      totalItems: totalCount,
      totalPages: Math.ceil(totalCount / limit) || 1,
      currentPage: page,
      limit
    }
  });
}
