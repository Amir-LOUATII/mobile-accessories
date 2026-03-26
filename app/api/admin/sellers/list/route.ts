import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq, sql, ilike, or, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const search = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "all";
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }

  const conditions = [eq(users.role, "seller")];

  if (search) {
    conditions.push(
      or(
        ilike(users.name, `%${search}%`),
        ilike(users.email, `%${search}%`),
        ilike(users.company, `%${search}%`),
        ilike(users.phone, `%${search}%`)
      )!
    );
  }

  if (statusFilter === "active") {
    conditions.push(eq(users.isActive, true));
  } else if (statusFilter === "inactive") {
    conditions.push(eq(users.isActive, false));
  }

  const whereClause = and(...conditions);

  const totalCountQuery = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(whereClause);
  const totalCount = Number(totalCountQuery[0].count);

  const offset = (page - 1) * limit;

  const sellers = await db.query.users.findMany({
    where: whereClause,
    columns: {
      id: true,
      name: true,
      email: true,
      company: true,
      phone: true,
      isActive: true,
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
